# How to Learn! — โครงสร้างโปรเจกต์ (แก้บัคแล้ว)

```
├── backend/    Node.js + Express + SQLite + JWT + Nodemailer
│   ├── server.js
│   ├── routes/auth.js
│   ├── middleware/auth.js
│   ├── db/database.js
│   ├── utils/mailer.js
│   └── .env.example   ← คัดลอกเป็น .env แล้วใส่ค่าจริง
└── frontend/   HTML + CSS + JS
    ├── index.html, login.html, course-select.html, Ch1-Lesson1.html
    ├── course-path-en-p1 / en-p4 / en-m1 / math-p1 .html
    ├── css/style.css
    └── js/api.js
```

## รัน
```bash
cd backend
npm install
cp .env.example .env     # แก้ JWT_SECRET และ SMTP_*
npm start                # http://localhost:4000
```
เปิด `frontend/login.html` ด้วย Live Server (พอร์ต 5500) — ถ้าเปิดจากพอร์ต/โฟลเดอร์อื่น ให้แก้ `FRONTEND_URL` ใน `.env`
และ `API_BASE` ใน `frontend/js/api.js`

**อย่า commit ไฟล์ `.env`** (มี `.gitignore` ให้แล้ว)
