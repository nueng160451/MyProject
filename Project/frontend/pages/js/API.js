// ✅ แก้: ไฟล์นี้ต้องชื่อ js/api.js (ตัวเล็กทั้งหมด) เพราะเดิม index.html เรียก api.js แต่ login.html เรียก API.js
//พอ deploy บน Linux/Netlify/Vercel ชื่อตัวพิมพ์เล็ก-ใหญ่ต่างกันจะหาไฟล์ไม่เจอ

// ตั้งค่า URL ของ backend ตรงนี้ (แก้เป็น URL จริงตอน deploy)
const API_BASE = "http://localhost:4000/api";
 
const KEY_TOKEN = "htl_token";
const KEY_EMAIL = "htl_email";
 
const Auth = {
  // ✅ แก้: รองรับ "Remember me" จริง ๆ (เดิมกล่องติ๊กไม่มีผลอะไร)
  // ติ๊ก = localStorage (อยู่ข้ามการปิดเบราว์เซอร์), ไม่ติ๊ก = sessionStorage (หายเมื่อปิดแท็บ)
  saveSession(token, email, remember = true) {
    this.clear();
    const store = remember ? localStorage : sessionStorage;
    store.setItem(KEY_TOKEN, token);
    store.setItem(KEY_EMAIL, email);
  },
  getToken() {
    return localStorage.getItem(KEY_TOKEN) || sessionStorage.getItem(KEY_TOKEN);
  },
  getEmail() {
    return localStorage.getItem(KEY_EMAIL) || sessionStorage.getItem(KEY_EMAIL);
  },
  clear() {
    localStorage.removeItem(KEY_TOKEN);
    localStorage.removeItem(KEY_EMAIL);
    sessionStorage.removeItem(KEY_TOKEN);
    sessionStorage.removeItem(KEY_EMAIL);
  },
  logout() {
    this.clear();
    window.location.href = "login.html";
  },
  // เรียกในทุกหน้าที่ต้อง login ก่อนถึงจะเข้าได้
  requireLogin() {
    if (!this.getToken()) {
      window.location.replace("login.html");
      return false;
    }
    return true;
  },
  // ✅ แก้: เพิ่มการเช็คกับ backend (/api/me) ว่า token ยังใช้ได้ไหม
  // เดิมเช็คแค่ว่ามี token ในเครื่อง ต่อให้หมดอายุหรือบัญชีถูกลบก็ยังเข้าหน้าได้
  async verify() {
    const r = await apiMe();
    if (r.status === 401) {
      this.logout();
      return false;
    }
    return r.ok;
  },
};
 
// ✅ แก้: เดิมประกาศ apiSignup / apiLogin / apiResendVerification ซ้ำ 2 รอบ
// (ทั้ง async function และ const) ทำให้เกิด SyntaxError "already been declared"
// ไฟล์ทั้งไฟล์จึงไม่ทำงานเลย → เหลือชุดเดียวด้านล่างนี้
async function apiRequest(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const t = Auth.getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    // ✅ แก้: backend ส่งข้อความผิดพลาดมาในคีย์ "error" แต่หน้าเว็บอ่าน "message"
    // จึงรวมให้เป็น data.message เสมอ
    data.message = data.message || data.error || data.warning || "";
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: { message: "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ ลองใหม่อีกครั้ง" },
    };
  }
}
 
const apiSignup = (email, password) =>
  apiRequest("/signup", { method: "POST", body: { email, password } });
const apiLogin = (email, password) =>
  apiRequest("/login", { method: "POST", body: { email, password } });
const apiResendVerification = (email) =>
  apiRequest("/resend-verification", { method: "POST", body: { email } });
// ✅ แก้: เพิ่มตัวเรียก endpoint ที่ต้องล็อกอิน (ส่ง Bearer token)
const apiMe = () => apiRequest("/me", { auth: true });