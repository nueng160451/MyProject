const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("./database");
const session = require("express-session");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "pages")));
app.use(express.urlencoded({ extended: false }));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-only-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 // 1 ชั่วโมง
    }
  })
);

// Route สมัครสมาชิก
app.post("/register.html", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length < 8 ||
      password.length > 72
    ) {
      return res.status(400).send("ข้อมูลไม่ถูกต้อง");
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(normalizedEmail);

    if (existingUser) {
      return res.status(409).send("อีเมลนี้ถูกใช้แล้ว");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    db.prepare(`
      INSERT INTO users (name, email, password_hash)
      VALUES (?, ?, ?)
    `).run(name.trim(), normalizedEmail, passwordHash);

    res.status(201).send("สมัครสมาชิกสำเร็จ! <a href='/login.html'>เข้าสู่ระบบ</a>");
  } catch (error) {
    console.error(error);
    res.status(500).send("เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์");
  }
});

// Route เข้าสู่ระบบ (Login)
app.post("/login.html", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password ||
      password.length > 72
    ) {
      return res.status(400).send("ข้อมูลไม่ถูกต้อง");
    }

    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email.trim().toLowerCase());

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).send("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }

    req.session.regenerate((error) => {
      if (error) {
        return res.status(500).send("เกิดข้อผิดพลาด");
      }

      req.session.userId = user.id;

      res.redirect("/index.html");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์");
  }
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[char];
  });
}

app.get("/dashboard", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login.html");
  }

  const user = db
    .prepare("SELECT id, name, email FROM users WHERE id = ?")
    .get(req.session.userId);

  if (!user) {
    return res.redirect("/login.html");
  }

  res.send(`ยินดีต้อนรับ ${escapeHtml(user.name)} <a href="/logout">ออกจากระบบ</a>`);
});

app.get("/logout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }

    res.clearCookie("connect.sid");
    res.redirect("/login.html");
  });
});

function requireLogin(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.redirect("/login.html");
  }

  next();
}


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});