const jwt = require("jsonwebtoken");
const db = require("../db/database");// ✅ แก้: ต้องใช้ DB เช็คว่า user ยังมีอยู่

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "ไม่ได้เข้าสู่ระบบ" });
  }

  // ✅ แก้: เช็คกับ DB ทุกครั้ง ถ้าบัญชีถูกลบ/ยังไม่ verify โทเคนเก่าจะใช้ไม่ได้
  try {
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
