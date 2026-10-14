require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// ✅ แก้: แยกข้อความ error ให้ตรงกับสาเหตุ (เดิมถ้าสั้นเกินไปก็ขึ้นว่า "missing")
const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is missing in .env (คัดลอก .env.example เป็น .env ก่อน)");
}
if (secret.length < 32) {
  throw new Error(
    "JWT_SECRET สั้นเกินไป (ต้องยาวอย่างน้อย 32 ตัวอักษร) สร้างได้ด้วย: node -e \"console.log(require('crypto').randomBytes(48).toString('hex'))\""
  );
}

const authRoutes = require("./routes/auth");
const { requireAuth } = require("./middleware/auth");

const app = express();

// ✅ แก้: เดิมมีแค่คอมเมนต์บอกให้เปิด แต่ไม่มีโค้ด ทำให้ rate limit เห็น IP ผิดเมื่ออยู่หลัง proxy
// (ตั้ง TRUST_PROXY=1 ใน .env เฉพาะตอน deploy หลัง reverse proxy)
if (process.env.TRUST_PROXY) {
  app.set("trust proxy", Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY);
}

app.use(helmet());

// ✅ แก้: เดิมอ่าน FRONTEND_ORIGIN แต่ .env ตั้งชื่อ FRONTEND_URL จึงไม่เคยถูกใช้
// origin ต้องไม่มี path (เช่น http://localhost:5500) จึงดึงเฉพาะ origin จาก FRONTEND_URL
function frontendOrigin() {
  if (process.env.FRONTEND_ORIGIN) return process.env.FRONTEND_ORIGIN;
  try {
    return new URL(process.env.FRONTEND_URL).origin;
  } catch {
    return "http://localhost:5500";
  }
}
app.use(cors({ origin: frontendOrigin() }));
app.use(express.json({ limit: "10kb" }));

app.use("/api", authRoutes);

// endpoint ที่ต้อง login ก่อน
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ email: req.user.email });
});

app.get("/", (req, res) => {
  res.send("How to Learn! API is running.");
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "ไม่พบเส้นทางนี้" });
});

// ✅ แก้: เดิมคอมเมนต์บอกว่ามี error handler กลาง แต่ไม่มีโค้ดจริง
// (routes ใช้ wrap() ส่ง error มาที่นี่ ถ้าไม่มี request จะค้าง/ได้หน้า error ดิบ)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "ข้อมูลที่ส่งมาใหญ่เกินไป" });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "รูปแบบข้อมูลไม่ถูกต้อง" });
  }
  res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`How to Learn! backend listening on http://localhost:${PORT}`);
});
