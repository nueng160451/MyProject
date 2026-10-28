/* หน้าเลือกบทเรียน: กดปุ่มกลมของแต่ละบทเพื่อเปิด/ปิดแถบปุ่มด้านใน
   (การเลื่อนซ้าย-ขวาและการดันบทด้านล่างลง ทำด้วย CSS ใน course-styling.css) */
(function () {
  function init() {
    document.querySelectorAll(".chapter").forEach(function (chapter, i) {
      var toggle = chapter.querySelector(".chapter-toggle");
      var panel = chapter.querySelector(".chapter-panel");
      if (!toggle || !panel) return;

      if (!panel.id) panel.id = "chapter-panel-" + (i + 1);
      toggle.setAttribute("aria-controls", panel.id);
      toggle.setAttribute("aria-expanded", "false");

      toggle.addEventListener("click", function () {
        var open = chapter.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
