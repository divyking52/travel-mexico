(function () {
  function bootSection(section) {
    if (!section || section.dataset.tmCancunBooted === "1") return;
    section.dataset.tmCancunBooted = "1";

    var rail = section.querySelector(".tm-cancun-rail");
    var prev = section.querySelectorAll(".tm-cancun-nav-prev");
    var next = section.querySelectorAll(".tm-cancun-nav-next");

    function scrollRail(dir) {
      if (!rail) return;
      var amount = Math.max(180, rail.clientWidth * 0.72) * dir;
      rail.scrollBy({ left: amount, behavior: "smooth" });
    }

    prev.forEach(function (btn) {
      btn.addEventListener("click", function () {
        scrollRail(-1);
      });
    });
    next.forEach(function (btn) {
      btn.addEventListener("click", function () {
        scrollRail(1);
      });
    });

    var done = false;
    function reveal() {
      if (done) return;
      done = true;
      section.classList.add("is-visible");
      window.removeEventListener("scroll", onScroll, true);
      if (observer) observer.disconnect();
    }

    function inView() {
      var r = section.getBoundingClientRect();
      return r.top < window.innerHeight * 0.95 && r.bottom > 24;
    }

    function onScroll() {
      if (inView()) reveal();
    }

    if (
      !("IntersectionObserver" in window) ||
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      reveal();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) reveal();
        });
      },
      { threshold: [0, 0.08, 0.2], rootMargin: "40px 0px 40px 0px" }
    );
    observer.observe(section);
    window.addEventListener("scroll", onScroll, true);
    if (inView()) reveal();
    setTimeout(function () {
      if (inView()) reveal();
    }, 700);
    // Hard fallback so copy never stays invisible after hydration.
    setTimeout(reveal, 2400);
  }

  window.tmCancunBoot = function () {
    document.querySelectorAll("[data-tm-cancun]").forEach(bootSection);
  };

  window.tmCancunBoot();
})();
