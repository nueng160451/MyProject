const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "howtolearn.db"));

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    is_verified INTEGER NOT NULL DEFAULT 0,
    verify_token TEXT,
    verify_token_expires INTEGER,
    created_at INTEGER NOT NULL
  );
  -- ✅ แก้: เพิ่ม index ให้ค้นหาด้วย verify_token เร็วขึ้น
  CREATE INDEX IF NOT EXISTS idx_users_verify_token ON users(verify_token);
`);

module.exports = db;
