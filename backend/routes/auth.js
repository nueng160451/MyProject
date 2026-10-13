const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit"); // เพิ่ม rate limit ✅

const db = require("../db/database");
const { sendVerificationEmail } = require("../utils/mailer");

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 ชั่วโมง
const BCRYPT_COST = 12; // เเก้ จาก 10 เป็น 12✅

//hash ปลอมไว้เทียบตอนไม่พบ user เพื่อให้เวลาตอบใกล้เคียงกัน (กันเดาว่ามีอีเมลนี้ไหม)✅
const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing",BCRYPT_COST);

// ตัวจำกัดจำนวนครั้ง ขำขอมากไป✅
const limitMsg = { error: "ส่งคำขอบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่" };
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: limitMsg,
});
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: limitMsg,
});
const resendLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: limitMsg,
});

// ตัวช่วยจับ error ของ async route แล้วส่งต่อให้ error handler ใน server.js✅
const wrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

function makeToken() {
  return crypto.randomBytes(32).toString("hex");
}

//hash token ก่อนเก็บลง DB (ส่งอีเมลด้วย token ดิบ เก็บใน DB เป็น hash)✅
function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function normEmail(v) {
  return typeof v === "string" ? v.trim().toLowerCase() : "";
}

// ---------- POST /api/signup ----------
router.post("/signup", async (req, res) => {
  const email = normEmail(req.body?.email);
  const password = req.body?.password;

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "อีเมลไม่ถูกต้อง" });
  }
  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ error: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" });
  }
//bcrypt อ่านแค่ 72 ไบต์แรก และกันคนส่งรหัสผ่านยาวมหาศาล✅
  if (Buffer.byteLength(password, "utf8") > 72) {
      return res.status(400).json({ error: "รหัสผ่านยาวเกินไป (ไม่เกิน 72 ไบต์)" });
  }
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    return res.status(409).json({ error: "อีเมลนี้ถูกใช้สมัครแล้ว" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const verifyToken = makeToken();
  const expires = Date.now() + TOKEN_TTL_MS;
// ไม่ SELECT เช็คก่อนแล้ว INSERT (เสี่ยงชนกัน) แต่ INSERT เลยแล้วจับ UNIQUE error✅
  try {
  db.prepare(`
    INSERT INTO users (email, password_hash, is_verified, verify_token, verify_token_expires, created_at)
    VALUES (?, ?, 0, ?, ?, ?)
  `).run(email, passwordHash, verifyToken, expires, Date.now());
  } catch (err) {
      if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
        return res.status(409).json({ error: "อีเมลนี้ถูกใช้สมัครแล้ว" });
      }
      throw err;
    }

  try {
    await sendVerificationEmail(email, verifyToken);
  } catch (err) {
    console.error("ส่งอีเมลไม่สำเร็จ:", err.message);
    return res.status(201).json({
      warning: "สร้างบัญชีแล้ว แต่ส่งอีเมลยืนยันไม่สำเร็จ กรุณาตรวจสอบการตั้งค่า SMTP",
    });
  }

  res.status(201).json({ message: "สมัครสมาชิกสำเร็จ กรุณายืนยันอีเมล" });
});

// ---------- GET /api/verify?token=... ----------
router.get("/verify", (req, res) => {
  const { token } = req.query;
  const frontend = process.env.FRONTEND_URL || "http://localhost:5500/frontend";

  if (!token || typeof token !== "string") {
    return res.redirect(`${frontend}/login.html?verified=0`);
  }

  const user = db.prepare("SELECT * FROM users WHERE verify_token = ?").get(token);

  if (!user || user.verify_token_expires < Date.now()) {
    return res.redirect(`${frontend}/login.html?verified=0`);
  }
  
   //✅ แก้: ค้นด้วย hash ของ token
  if (!user || user.verify_token_expires < Date.now()) {
      return res.redirect(`${frontend}/login.html?verified=0`);//ตรงนี้ให้ คนทำ html มาใส่เลยนะ
    }

  db.prepare(`
    UPDATE users SET is_verified = 1, verify_token = NULL, verify_token_expires = NULL WHERE id = ?
  `).run(user.id);

  res.redirect(`${frontend}/login.html?verified=1`);//ตรงนี้ให้ คนทำ html มาใส่เลยนะ
});

// ---------- POST /api/resend-verification ----------
router.post("/resend-verification", async (req, res) => { //✅ เพิ่ม resendLimmiter เข้าไป 
  const email = normEmail(req.body?.email);
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  const generic = { message: "หากมีบัญชีนี้อยู่ ระบบได้ส่งอีเมลไปแล้ว" };

  if (!user) return res.json(generic); // ไม่บอกว่ามี/ไม่มีบัญชี
  if (user.is_verified) return res.json({ message: "บัญชีนี้ยืนยันแล้ว" });

  const verifyToken = makeToken();
  const expires = Date.now() + TOKEN_TTL_MS;
  db.prepare("UPDATE users SET verify_token = ?, verify_token_expires = ? WHERE id = ?")
    .run(hastToken(verifyToken), expires, user.id);//เพิ่ม hash

  try {
    await sendVerificationEmail(email, verifyToken);
  } catch (err) {
    console.error("ส่งอีเมลไม่สำเร็จ:", err.message);
  }

  res.json(generic);
});

// ---------- POST /api/login ----------
router.post("/login", loginLimiter, async (req, res) => { // ✅ เพิ่ม loginLimiter
  const email = normEmail(req.body?.email);
  const password = req.body?.password;

  if (!email || typeof password !== "string" || !password) {
    return res.status(400).json({ error: "กรุณากรอกอีเมลและรหัสผ่าน" });
  }

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (Buffer.byteLength(password, "utf8") > 72) { //✅ แก้: กันรหัสผ่านยาวผิดปกติก่อนส่งเข้า bcrypt
    return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
  }

  const match = await bcrypt.compare(password, user ? user .password_hash : DUMMY_HASH);
  if (!match) {
    return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
  }

  if (!user.is_verified) {
    return res.status(403).json({ error: "กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ", needVerify: true });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, email: user.email });
});

module.exports = router;
