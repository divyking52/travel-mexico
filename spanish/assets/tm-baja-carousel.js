(function () {
  function isInteractive(el) {
    return !!(
      el &&
      el.closest &&
      el.closest("a, button, [data-baja-prev], [data-baja-next], [data-baja-dot]")
    );
  }

  function init(root) {
    if (!root || root.dataset.tmBajaReady === "1") return;
    root.dataset.tmBajaReady = "1";

    var cards = Array.prototype.slice.call(root.querySelectorAll("[data-baja-card]"));
    var dots = Array.prototype.slice.call(root.querySelectorAll("[data-baja-dot]"));
    var prev = root.querySelector("[data-baja-prev]");
    var next = root.querySelector("[data-baja-next]");
    var stage = root.querySelector("[data-baja-stage]");
    if (!cards.length || !stage) return;

    var index = cards.findIndex(function (c) {
      return c.classList.contains("is-active");
    });
    if (index < 0) index = 0;

    var reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function layout() {
      var n = cards.length;
      cards.forEach(function (card, i) {
        var offset = i - index;
        // wrap shortest direction for continuous feel
        if (offset > n / 2) offset -= n;
        if (offset < -n / 2) offset += n;

        var abs = Math.abs(offset);
        var step = window.innerWidth < 700 ? 56 : n > 6 ? 68 : 78;
        var x = offset * step;
        var z = -Math.min(abs, 3) * 140;
        var rot = offset * (n > 6 ? -32 : -38);
        var scale = abs === 0 ? 1 : Math.max(0.7, 1 - abs * 0.11);
        var opacity =
          abs > 3 ? 0 : abs === 3 ? 0.28 : abs === 2 ? 0.5 : abs === 1 ? 0.85 : 1;

        card.style.opacity = String(opacity);
        card.style.zIndex = String(10 - abs);
        card.style.pointerEvents = abs > 1 ? "none" : "auto";
        card.classList.toggle("is-active", offset === 0);
        card.classList.toggle("is-side", abs === 1);
        card.classList.toggle("is-far", abs >= 2);
        card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");

        var transform =
          "translate(-50%, -50%) translateX(" +
          x +
          "%) translateZ(" +
          z +
          "px) rotateY(" +
          rot +
          "deg) scale(" +
          scale +
          ")";
        card.style.transform = transform;
      });

      dots.forEach(function (dot, i) {
        var on = i === index;
        dot.classList.toggle("is-active", on);
        if (on) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }

    function go(to) {
      var n = cards.length;
      index = ((to % n) + n) % n;
      layout();
    }

    cards.forEach(function (card, i) {
      card.addEventListener("click", function (e) {
        // let guide links navigate; don't steal the click for slide changes
        if (isInteractive(e.target)) return;
        if (i !== index) go(i);
      });
    });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        go(i);
      });
    });
    if (prev)
      prev.addEventListener("click", function () {
        go(index - 1);
      });
    if (next)
      next.addEventListener("click", function () {
        go(index + 1);
      });

    // drag / swipe — skip when pressing links/controls so CTAs still work
    var startX = 0;
    var dragging = false;
    stage.addEventListener(
      "pointerdown",
      function (e) {
        if (isInteractive(e.target)) return;
        dragging = true;
        startX = e.clientX;
        stage.setPointerCapture(e.pointerId);
      },
      { passive: true }
    );
    stage.addEventListener("pointerup", function (e) {
      if (!dragging) return;
      dragging = false;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    });
    stage.addEventListener("pointercancel", function () {
      dragging = false;
    });

    // keyboard when focused in section
    root.tabIndex = 0;
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1);
      }
    });

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, reduced ? 0 : 80);
    });

    layout();
  }

  function boot() {
    document.querySelectorAll("[data-tm-baja]").forEach(function (root) {
      // allow re-init when inject replaces an older carousel
      if (
        root.dataset.tmBajaReady === "1" &&
        root.querySelectorAll("[data-baja-card]").length &&
        !root.querySelector("[data-baja-card].is-active")
      ) {
        delete root.dataset.tmBajaReady;
      }
      init(root);
    });
  }

  window.tmBajaBoot = boot;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("load", boot);
  setTimeout(boot, 400);
  setTimeout(boot, 1200);
  setTimeout(boot, 2500);

  if (window.MutationObserver) {
    var mo = new MutationObserver(function () {
      boot();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
