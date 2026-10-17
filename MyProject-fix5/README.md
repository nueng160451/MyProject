# How to Learn! — โครงสร้างโปรเจกต์

```
├── backend/    Node.js + Express + SQLite + JWT + Nodemailer
│   ├── server.js
│   ├── routes/auth.js
│   ├── middleware/auth.js
│   ├── db/database.js
│   ├── utils/mailer.js
│   └── .env.example   ← คัดลอกเป็น .env แล้วใส่ค่าจริง
└── frontend/pages/    HTML + CSS + JS (login.html, index.html, courses_pages/ ...)
    ├── css/  (style.css, menu.css, minigame.css)
    └── js/   (api.js, menu.js, theme-canvas.js, md-block.js, minigame.js)
```

## รัน
```bash
cd backend
npm install
cp .env.example .env     # ต้องใส่ JWT_SECRET (ยาว ≥ 32 ตัว) และ SMTP_*
npm start                # http://localhost:4000
```
เปิด Live Server ที่ **โฟลเดอร์รากของโปรเจกต์ (MyProject-team)** พอร์ต 5500 แล้วเข้า
`http://localhost:5500/frontend/pages/login.html`
(ต้องเปิดที่โฟลเดอร์รากเพราะ `js/md-block.js` โหลดโมดูลจาก `backend/node_modules`)

ถ้าใช้พอร์ต/โฟลเดอร์อื่น ให้แก้ `FRONTEND_URL` ใน `.env` และ `API_BASE` ใน `frontend/pages/js/api.js`

**อย่า commit ไฟล์ `.env`** (มี `.gitignore` ให้แล้ว) และตั้งชื่อไฟล์ให้เป็น `.env` เท่านั้น
