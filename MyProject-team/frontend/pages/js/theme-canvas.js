/* =========================================================
   theme-canvas.js — พื้นหลังแอนิเมชันของธีม (ท้องฟ้า / ป่า / ทะเลทราย / กาแลคซี่)
   ใช้งาน: โหลดไฟล์นี้ "ก่อน" menu.js ใน <head>
   menu.js จะเรียก ThemeCanvas.set("forest") เองเมื่อเปลี่ยนธีม
   ธีมที่ไม่มีแอนิเมชัน (default, light, dark) จะซ่อน canvas
   ========================================================= */
(function () {
  const ANIMATED = ["sky", "forest", "desert", "galaxy"];
  const reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let canvas = null;
  let ctx = null;
  let width = 0;
  let height = 0;
  let theme = null; // ธีมที่ขอไว้ล่าสุด (เก็บไว้ได้แม้ body ยังไม่พร้อม)
  let raf = 0;

  /* ---------- สถานะของอนุภาคแต่ละธีม ---------- */
  let clouds = [];
  let streamParticles = [];
  let sandParticles = [];
  let stars = [];
  let galaxyAngle = 0;

  function initEntities() {
    clouds = Array.from({ length: 7 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.5,
      speed: 0.4 + Math.random() * 0.8,
      scale: 0.6 + Math.random() * 0.8,
      type: Math.floor(Math.random() * 3),
    }));
    streamParticles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: height * 0.55 + Math.random() * height * 0.45,
      speedX: 1 + Math.random() * 1.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    sandParticles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speedX: 0.8 + Math.random() * 1.2,
      speedY: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      twinkleSpeed: 0.02 + Math.random() * 0.05,
      alpha: Math.random(),
      maxAlpha: 0.5 + Math.random() * 0.5,
    }));
  }

  function resize() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initEntities();
    if (theme && reduceMotion) drawFrame(); // โหมดลดการเคลื่อนไหว: วาดภาพนิ่งใหม่
  }

  /* ---------- วาดแต่ละธีม ---------- */
  // ท้องฟ้า
  function renderSky() {
    const g = ctx.createLinearGradient(0, 0, 0, height);
    g.addColorStop(0, "#38bdf8");
    g.addColorStop(0.5, "#0ea5e9");
    g.addColorStop(1, "#bae6fd");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    const sx = width * 0.85, sy = height * 0.22;
    const glow = ctx.createRadialGradient(sx, sy, 10, sx, sy, 120);
    glow.addColorStop(0, "rgba(254,240,138,.9)");
    glow.addColorStop(0.5, "rgba(250,204,21,.3)");
    glow.addColorStop(1, "rgba(250,204,21,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sx, sy, 120, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.arc(sx, sy, 45, 0, Math.PI * 2);
    ctx.fill();

    clouds.forEach((c) => {
      if (!reduceMotion) c.x += c.speed;
      if (c.x > width + 200) {
        c.x = -250;
        c.y = Math.random() * height * 0.5;
      }
      drawCloud(c.x, c.y, c.scale, c.type);
    });
  }

  function drawCloud(x, y, scale, type) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(255,255,255,.88)";
    ctx.beginPath();
    if (type === 0) {
      ctx.arc(0, 0, 35, 0, Math.PI * 2);
      ctx.arc(30, -15, 40, 0, Math.PI * 2);
      ctx.arc(70, 0, 32, 0, Math.PI * 2);
      ctx.arc(45, 15, 28, 0, Math.PI * 2);
    } else if (type === 1) {
      ctx.arc(20, 0, 30, 0, Math.PI * 2);
      ctx.arc(65, -10, 45, 0, Math.PI * 2);
      ctx.arc(110, 0, 35, 0, Math.PI * 2);
      ctx.arc(80, 15, 30, 0, Math.PI * 2);
    } else {
      ctx.arc(15, 5, 25, 0, Math.PI * 2);
      ctx.arc(50, -5, 38, 0, Math.PI * 2);
      ctx.arc(90, 5, 32, 0, Math.PI * 2);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawPineLayer(baseY, scale, color) {
    ctx.fillStyle = color;
    const spacing = 90 * scale;
    for (let x = -50; x < width + 100; x += spacing) {
      const top = baseY - 180 * scale;
      ctx.beginPath();
      ctx.moveTo(x, baseY);
      ctx.lineTo(x + 40 * scale, baseY);
      ctx.lineTo(x + 20 * scale, top);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x - 10 * scale, baseY - 50 * scale);
      ctx.lineTo(x + 50 * scale, baseY - 50 * scale);
      ctx.lineTo(x + 20 * scale, top - 30 * scale);
      ctx.closePath();
      ctx.fill();
    }
  }
// ป่าพงไพร
  function renderForest() {
    const g = ctx.createLinearGradient(0, 0, 0, height);
    g.addColorStop(0, "#065f46");
    g.addColorStop(0.6, "#047857");
    g.addColorStop(1, "#022c22");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(254,240,138,.12)";
    ctx.beginPath();
    ctx.moveTo(width * 0.2, 0);
    ctx.lineTo(width * 0.1, height);
    ctx.lineTo(width * 0.4, height);
    ctx.lineTo(width * 0.5, 0);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(width * 0.6, 0);
    ctx.lineTo(width * 0.5, height);
    ctx.lineTo(width * 0.8, height);
    ctx.lineTo(width * 0.9, 0);
    ctx.fill();

    drawPineLayer(height * 0.45, 0.6, "#064e3b");
    drawPineLayer(height * 0.52, 0.85, "#065f46");

    const river = ctx.createLinearGradient(0, height * 0.6, width, height);
    river.addColorStop(0, "#0284c7");
    river.addColorStop(0.5, "#38bdf8");
    river.addColorStop(1, "#0369a1");
    ctx.fillStyle = river;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.65);
    ctx.bezierCurveTo(width * 0.3, height * 0.6, width * 0.7, height * 0.75, width, height * 0.68);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    streamParticles.forEach((p) => {
      if (!reduceMotion) p.x += p.speedX;
      if (p.x > width) p.x = 0;
      ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y + Math.sin(p.x * 0.02) * 10, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    drawPineLayer(height * 0.62, 1.2, "#047857");
  }
// ทะเลทราย
  function renderDesert() {
    const g = ctx.createLinearGradient(0, 0, 0, height);
    g.addColorStop(0, "#f97316");
    g.addColorStop(0.4, "#fb923c");
    g.addColorStop(1, "#d97706");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    const sx = width * 0.5, sy = height * 0.25;
    const glow = ctx.createRadialGradient(sx, sy, 15, sx, sy, 180);
    glow.addColorStop(0, "rgba(254,243,199,.95)");
    glow.addColorStop(0.5, "rgba(251,191,36,.4)");
    glow.addColorStop(1, "rgba(245,158,11,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sx, sy, 180, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#b45309";
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.bezierCurveTo(width * 0.3, height * 0.55, width * 0.7, height * 0.8, width, height * 0.65);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.moveTo(0, height * 0.8);
    ctx.bezierCurveTo(width * 0.4, height * 0.7, width * 0.65, height * 0.85, width, height * 0.75);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    sandParticles.forEach((p) => {
      if (!reduceMotion) {
        p.x += p.speedX;
        p.y += p.speedY;
      }
      if (p.x > width) p.x = 0;
      if (p.y > height) p.y = 0;
      if (p.y < 0) p.y = height;
      ctx.fillStyle = `rgba(254,243,199,${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }
// กาแรคซี่
  function renderGalaxy() {
    const g = ctx.createLinearGradient(0, 0, 0, height);
    g.addColorStop(0, "#170d3d");
    g.addColorStop(0.5, "#2e1065");
    g.addColorStop(1, "#09031a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    stars.forEach((s) => {
      if (!reduceMotion) s.alpha += s.twinkleSpeed;
      if (s.alpha > s.maxAlpha || s.alpha < 0.1) s.twinkleSpeed = -s.twinkleSpeed;
      ctx.fillStyle = `rgba(255,255,255,${Math.abs(s.alpha)})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!reduceMotion) galaxyAngle += 0.003;
    ctx.save();
    ctx.translate(width * 0.5, height * 0.5);
    ctx.rotate(galaxyAngle);

    const neb = ctx.createRadialGradient(0, 0, 10, 0, 0, 300);
    neb.addColorStop(0, "rgba(216,180,254,.45)");
    neb.addColorStop(0.4, "rgba(147,51,234,.25)");
    neb.addColorStop(0.8, "rgba(76,29,149,.1)");
    neb.addColorStop(1, "rgba(15,5,30,0)");
    ctx.fillStyle = neb;
    ctx.beginPath();
    ctx.arc(0, 0, 300, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < 300; i++) {
      const a = i * 0.1, r = i * 1.2;
      ctx.fillStyle = i % 2 === 0 ? "rgba(233,213,255,.8)" : "rgba(125,211,252,.8)";
      ctx.beginPath();
      ctx.arc(Math.cos(a) * r, Math.sin(a) * r * 0.5, i % 3 === 0 ? 2 : 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  const RENDERERS = { sky: renderSky, forest: renderForest, desert: renderDesert, galaxy: renderGalaxy };

  function drawFrame() {
    ctx.clearRect(0, 0, width, height);
    const fn = RENDERERS[theme];
    if (fn) fn();
  }

  function loop() {
    drawFrame();
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  function ensureCanvas() {
    if (canvas || !document.body) return;
    canvas = document.createElement("canvas");
    canvas.id = "themeCanvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    ctx = canvas.getContext("2d");
    window.addEventListener("resize", resize);
    resize();
  }

  /* ---------- API ที่ menu.js เรียกใช้ ---------- */
  function set(id) {
    theme = ANIMATED.indexOf(id) >= 0 ? id : null;
    if (!document.body) return; // body ยังไม่พร้อม — จะถูกเรียกซ้ำตอน DOMContentLoaded
    ensureCanvas();
    stop();
    if (!theme) {
      canvas.style.display = "none";
      return;
    }
    canvas.style.display = "block";
    if (reduceMotion) drawFrame();
    else loop();
  }

  window.ThemeCanvas = { set: set };

  document.addEventListener("DOMContentLoaded", function () {
    set(theme);
  });
})();
