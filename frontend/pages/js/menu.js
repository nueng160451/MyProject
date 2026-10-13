/* =========================================================
   menu.js — ปุ่มเมนูขวาบน + แถบเมนู + เลือกธีมสี
   ใส่ <script src="js/menu.js"></script> ใน <head> ของทุกหน้า
   (ใส่ใน head เพื่อให้ธีมถูกใช้ทันที หน้าจะไม่กะพริบสีเดิมก่อน)
   ========================================================= */
(function () {
  const THEME_KEY = "htl_theme";

  // เพิ่มธีมใหม่ได้ที่นี่ แล้วไปเพิ่มสีใน menu.css (html[data-theme="id"])
  const THEMES = [
    { id: "default", name: "ค่าเริ่มต้น", swatch: "#b88fd0" },
    { id: "light",   name: "ธีมสว่าง",   swatch: "#f6f3ea" },
    { id: "dark",    name: "ธีมมืด",     swatch: "#8a8688" },
    { id: "forest",  name: "ป่าพงไพร",   swatch: "linear-gradient(180deg,#cdeeff 0%,#a6dc7a 60%,#7fae24 100%)" },
    { id: "desert",  name: "ทะเลทราย",   swatch: "linear-gradient(180deg,#ffe6b0 0%,#e8a04f 100%)" },
    { id: "galaxy",  name: "กาแรซี่",    swatch: "#506ab0" },
    { id: "soon",    name: "เพิ่มภายหลัง", swatch: "radial-gradient(circle at 30% 30%,#6b7aa8,#0b0d1a 70%)", disabled: true },
  ];

  function loadTheme() {
    try { return localStorage.getItem(THEME_KEY) || "default"; }
    catch (e) { return "default"; }
  }

  function applyTheme(id) {
    const t = THEMES.find((x) => x.id === id && !x.disabled) || THEMES[0];
    document.documentElement.setAttribute("data-theme", t.id);
    try { localStorage.setItem(THEME_KEY, t.id); } catch (e) {}
    return t;
  }

  // ใช้ธีมทันที (ก่อนหน้าเว็บวาดเสร็จ)
  let current = applyTheme(loadTheme());

  function el(tag, props, html) {
    const node = document.createElement(tag);
    Object.assign(node, props || {});
    if (html) node.innerHTML = html;
    return node;
  }

  function build() {
    const nav = document.querySelector("nav");
    if (!nav) return;

    /* ----- ปุ่มเมนูใน header ----- */
    let holder = nav.querySelector(":scope > div");
    if (!holder) holder = nav.appendChild(el("div"));

    const toggle = el("button", {
      id: "menuToggle",
      type: "button",
      ariaLabel: "เปิดเมนู",
    }, "<span></span><span></span><span></span>");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "sideMenu");
    holder.appendChild(toggle);

    /* ----- ฉากหลัง + แถบเมนู ----- */
    const overlay = el("div", { className: "menu-overlay" });
    const panel = el("aside", { className: "side-menu", id: "sideMenu" });
    panel.setAttribute("aria-label", "เมนู");
    panel.innerHTML = `
      <h2 class="sm-title">เมนู</h2>
      <button class="sm-row" id="accountBtn" type="button">บัญชีของฉัน</button>
      <div class="sm-account" id="accountBox"></div>
      <div class="sm-row sm-theme">
        <span>ธีม</span>
        <button class="swatch-btn" id="themeBtn" type="button" aria-label="เลือกธีมสี" aria-expanded="false"></button>
      </div>
      <button class="sm-back" id="backBtn" type="button">↩ ย้อนกลับ</button>
    `;

    /* ----- ป็อปอัพเลือกธีม ----- */
    const pop = el("div", { className: "theme-pop", id: "themePop" });
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", "เลือกธีมสี");
    THEMES.forEach((t) => {
      const b = el("button", { type: "button", className: "theme-opt" });
      b.dataset.theme = t.id;
      b.disabled = !!t.disabled;
      b.innerHTML = `<div class="dot" style="background:${t.swatch}"></div><span>${t.name}</span>`;
      pop.appendChild(b);
    });

    document.body.append(overlay, panel, pop);

    const themeBtn = panel.querySelector("#themeBtn");
    const accountBtn = panel.querySelector("#accountBtn");
    const accountBox = panel.querySelector("#accountBox");

    /* ----- บัญชี ----- */
    function renderAccount() {
      let email = null;
      try { email = localStorage.getItem("matheo_email"); } catch (e) {}
      if (email) {
        accountBox.innerHTML = `<p>เข้าสู่ระบบอยู่ในชื่อ<br><strong></strong></p><button type="button" id="logoutBtn">ออกจากระบบ</button>`;
        accountBox.querySelector("strong").textContent = email;
        accountBox.querySelector("#logoutBtn").onclick = () => {
          try {
            localStorage.removeItem("matheo_token");
            localStorage.removeItem("matheo_email");
          } catch (e) {}
          location.href = "login.html";
        };
      } else {
        accountBox.innerHTML = `<p>ยังไม่ได้เข้าสู่ระบบ</p><button type="button" id="goLoginBtn">เข้าสู่ระบบ</button>`;
        accountBox.querySelector("#goLoginBtn").onclick = () => { location.href = "login.html"; };
      }
    }

    /* ----- เปิด/ปิด ----- */
    function markActive() {
      pop.querySelectorAll(".theme-opt").forEach((b) =>
        b.classList.toggle("active", b.dataset.theme === current.id)
      );
      const t = THEMES.find((x) => x.id === current.id);
      themeBtn.style.background = t.swatch;
    }

    function openPop(open) {
      pop.classList.toggle("open", open);
      themeBtn.setAttribute("aria-expanded", String(open));
    }

    function openMenu(open) {
      panel.classList.toggle("open", open);
      overlay.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (!open) {
        openPop(false);
        accountBox.classList.remove("open");
      } else {
        renderAccount();
        panel.querySelector("#backBtn").focus({ preventScroll: true });
      }
    }

    toggle.addEventListener("click", () => openMenu(!panel.classList.contains("open")));
    overlay.addEventListener("click", () => openMenu(false));
    panel.querySelector("#backBtn").addEventListener("click", () => openMenu(false));
    accountBtn.addEventListener("click", () => accountBox.classList.toggle("open"));
    themeBtn.addEventListener("click", () => openPop(!pop.classList.contains("open")));

    pop.addEventListener("click", (e) => {
      const b = e.target.closest(".theme-opt");
      if (!b || b.disabled) return;
      current = applyTheme(b.dataset.theme);
      markActive();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (pop.classList.contains("open")) openPop(false);
      else if (panel.classList.contains("open")) openMenu(false);
    });

    markActive();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();