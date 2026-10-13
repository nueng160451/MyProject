const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendVerificationEmail(toEmail, token) {
  const base = process.env.BACKEND_URL || "http://localhost:" + (process.env.PORT || 4000);
  const verifyUrl = `${base}/api/verify?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: toEmail,
    subject: "ยืนยันอีเมลของคุณ - How to Learn!",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2 style="color:#2f9bf5;">ยินดีต้อนรับสู่ How to Learn! 🎓</h2>
        <p>กรุณากดปุ่มด้านล่างเพื่อยืนยันอีเมลและเปิดใช้งานบัญชีของคุณ</p>
        <p style="text-align:center; margin: 28px 0;">
          <a href="${verifyUrl}"
             style="background:#2f9bf5;color:#fff;padding:12px 28px;border-radius:999px;text-decoration:none;font-weight:bold;">
            ยืนยันอีเมล
          </a>
        </p>
        <p style="color:#888;font-size:13px;">
          หากปุ่มด้านบนกดไม่ได้ ให้คัดลอกลิงก์นี้ไปเปิดในเบราว์เซอร์:<br>
          ${verifyUrl}
        </p>
        <p style="color:#888;font-size:13px;">ลิงก์นี้จะหมดอายุใน 24 ชั่วโมง</p>
      </div>
    `,
  });
}

module.exports = { sendVerificationEmail };
