(function () {
  if (window.__tmWellnessBannerInit) return;
  window.__tmWellnessBannerInit = true;

  var EN =
    location.pathname.indexOf("/en/") >= 0 ||
    /(^|\/)en\/(index\.htm)?$/i.test(location.pathname);

  var copy = EN
    ? {
        kicker: "Tulum · Wellness & Longevity",
        title: "Your journey, at a different pace.",
        body:
          "Beach time, yoga, spa rituals, nature and Maya heritage — travel and lifestyle inspiration for a slower Mexican Caribbean stay.",
        cta: "Explore Tulum wellness →",
        note:
          "Editorial inspiration only — not medical care or a promise of longevity. Images from the TravelMexico media library.",
        alt: "Caribbean beach viewed from a thatched cabana by the sea",
      }
    : {
        kicker: "Tulum · Bienestar y Longevidad",
        title: "Tu viaje, a otro ritmo.",
        body:
          "Playa, yoga, rituales de spa, naturaleza y herencia maya — inspiración de viaje y estilo de vida para un Caribe Mexicano más pausado.",
        cta: "Explorar bienestar en Tulum →",
        note:
          "Solo inspiración editorial — no es atención médica ni una promesa de longevidad. Imágenes de la biblioteca de TravelMexico.",
        alt: "Playa del Caribe vista desde una cabaña junto al mar",
      };

  var IMG =
    "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/457c7692-d08f-44f4-ab1f-abd3e1f01c8b/mexico-cabana-hero-v1.png";
  var HREF = EN
    ? "/en/destino/tulum-wellness/index.htm"
    : "/destino/tulum-wellness/index.htm";
  var CSS = "/assets/tm-tulum-wellness-banner.css?v=5";

  function ensureCss() {
    if (
      document.querySelector(
        '[data-tm-inline="tm-tulum-wellness-banner.css"], style[data-tm-wellness-banner-css], link[data-tm-wellness-banner-css]'
      )
    ) {
      return;
    }
    console.warn("[tm-wellness-banner] missing inlined CSS; skipping external load");
  }

  function html() {
    return (
      '<aside class="tm-wellness-banner" data-tm-wellness-banner-v1="1" aria-label="' +
      copy.kicker +
      '">' +
      '<a class="tm-wellness-banner-link" href="' +
      HREF +
      '">' +
      '<div class="tm-wellness-banner-media">' +
      '<img src="' +
      IMG +
      '" alt="' +
      copy.alt +
      '" loading="lazy" decoding="async" width="1200" height="800">' +
      "</div>" +
      '<div class="tm-wellness-banner-copy">' +
      '<p class="tm-wellness-banner-kicker">' +
      copy.kicker +
      "</p>" +
      "<h3>" +
      copy.title +
      "</h3>" +
      "<p>" +
      copy.body +
      "</p>" +
      '<span class="tm-wellness-banner-cta">' +
      copy.cta +
      "</span>" +
      "</div></a></aside>"
    );
  }

  function repair(existing) {
    var link = existing.querySelector(".tm-wellness-banner-link");
    var img = existing.querySelector(".tm-wellness-banner-media img");
    if (link) link.setAttribute("href", HREF);
    if (img) {
      img.setAttribute("src", IMG);
      img.setAttribute("alt", copy.alt);
    }
    existing.querySelectorAll(".tm-wellness-banner-note").forEach(function (n) {
      n.remove();
    });
  }

  function place() {
    ensureCss();
    var existing = document.querySelector(".tm-wellness-banner[data-tm-wellness-banner-v1]");
    if (existing) {
      repair(existing);
      return true;
    }

    var explore =
      document.querySelector(".tmx-state .tmx-explore") ||
      document.querySelector('[id$="quintana-roo-collection"]') ||
      document.querySelector(".tmx-explore");
    if (!explore || !explore.parentNode) return false;

    explore.insertAdjacentHTML("beforebegin", html());
    return true;
  }

  function boot() {
    if (place()) return;
    var n = 0;
    var t = setInterval(function () {
      n++;
      if (place() || n > 60) clearInterval(t);
    }, 250);
  }

  boot();
  document.addEventListener("DOMContentLoaded", boot);
  window.addEventListener("load", boot);
})();
