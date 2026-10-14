const jwt = require("jsonwebtoken");
const db = require("../db/database"); // ใช้ DB เช็คว่า user ยังมีอยู่และยืนยันอีเมลแล้ว

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "ไม่ได้เข้าสู่ระบบ" });
  }

  try {
    // ✅ แก้: เดิมไม่มี jwt.verify เลย ทำให้ตัวแปร payload ไม่ถูกประกาศ (ReferenceError → 401 ทุกครั้ง)
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // เช็คกับ DB ทุกครั้ง ถ้าบัญชีถูกลบ/ยังไม่ verify โทเคนเก่าจะใช้ไม่ได้
    const user = db
      .prepare("SELECT id, email, is_verified FROM users WHERE id = ?")
      .get(payload.userId);

    if (!user || !user.is_verified) {
      return res.status(401).json({ error: "เซสชันไม่ถูกต้อง กรุณาเข้าสู่ระบบใหม่" });
    }

    req.user = { userId: user.id, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: "เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่" });
  }
}

module.exports = { requireAuth };
