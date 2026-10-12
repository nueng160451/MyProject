require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet"); //✅  เพิ่ม helmet (security headers)

//ช็คความยาว JWT_SECRET ด้วย ไม่ใช่แค่ว่ามีหรือไม่
if (!process.env.JWT_SECRET|| process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET is missing in .env (คัดลอก .env.example เป็น .env ก่อน)");
}

const authRoutes = require("./routes/auth");
const { requireAuth } = require("./middleware/auth");

const app = express();

app.use(helmet());// ✅ ให้เปิดบรรทัดนี้ เพื่อให้ rate limit เห็น IP จริง

// ✅ จำกัด CORS ให้เฉพาะ frontend ของเรา (เดิม cors() เปิดให้ทุกเว็บ)
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5500",
  })
);  
app.use(express.json({limit:"10kb"}));// ✅ เพิ่ม จำกัดขนาด body กันคนส่งก้อนใหญ่ ๆ


app.use("/api", authRoutes);

// endpoint ที่ต้อง login ก่อน
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ email: req.user.email });
});

app.get("/", (req, res) => {
  res.send("How to Learn! API is running.");
});

// ✅ แก้: 404 + error handler กลาง (เดิมไม่มี ถ้า async พังจะค้าง/ได้หน้า error ดิบ)
app.use((req, res) => {
  res.status(404).json({ error: "ไม่พบเส้นทางนี้" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`How to Learn! backend listening on http://localhost:${PORT}`);
});
