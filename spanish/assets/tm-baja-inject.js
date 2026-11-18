(function () {
  var VERSION = "18";
  if (window.__tmBajaInjectInit === VERSION) return;
  window.__tmBajaInjectInit = VERSION;

  function isEnglishPage() {
    var path = location.pathname.replace(/\\/g, "/");
    if (/\/en(\/|$)/i.test(path)) return true;
    if (
      document.querySelector(
        '#page-en-welcome, main[data-page-id="page-en"], main[data-page-slug="/en/"]'
      )
    ) {
      return true;
    }
    if (
      document.querySelector(
        '#home-welcome, main[data-page-id="home"], main[data-page-slug="/"]'
      )
    ) {
      return false;
    }
    return /^en\b/i.test(document.documentElement.lang || "");
  }

  var EN = isEnglishPage();
  var prefix = EN ? "../" : "";
  var pageRoot = EN ? "/en/" : "/";

  function mediaSrc(url) {
    if (!url) return url;
    var s = String(url).replace(/^(?:\.\.\/)+(?=https?:)/i, "");
    if (/^(https?:|data:|\/\/)/i.test(s)) return s;
    return prefix + s.replace(/^\/+/, "");
  }

  // All Baja destinations from travelmexicoen.vercel.app destination catalog
  var MEDIA = {
    tijuana: "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/b4c948c2-8d05-4e4d-a5f2-418ddb08289a/tijuana.jpg",
    ensenada: "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/0725d170-b1c6-490f-83bf-3244c572b778/ensenada.jpg",
    "valle-de-guadalupe": "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/25fc2adc-7834-4615-8a49-c2772a313e80/valle-de-guadalupe.jpg",
    mexicali: "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/d206a812-6034-4736-b47a-27560d04691b/mexicali.jpg",
    rosarito: "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/f94825fe-dce4-4496-9690-a773adedca38/rosarito.jpg",
    tecate: "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/4214c4a5-8122-4fa8-bdfe-66aaf4775b5a/tecate.jpg",
    "san-felipe": "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/195bab0c-8796-4b90-9211-bd4c8775f40c/san-felipe.jpg",
    "san-quintin": "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/b1767c70-2eb3-4afe-9299-6f97a3c4dfa8/san-quintin.jpg",
    "bahia-de-los-angeles": "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/9e1e65ee-2dd5-4f88-bbc6-24c539a16178/bahia-de-los-angeles.jpg",
  };

  var copy = EN
    ? {
        id: "page-en-baja-carousel",
        kicker: "Baja California",
        title: "The Baja California Experience",
        blurb:
          "See how it works: start with a destination guide and make the experience your own.",
        cta: "Open your guide",
        prev: "Previous destination",
        next: "Next destination",
        hint: "Drag, swipe, or use arrows to explore the coast",
        cards: [
          [
            "Tijuana",
            "Border creativity, culinary craft and urban energy.",
            MEDIA.tijuana,
            "destino/tijuana/index.htm",
            "Urban culture and vibrant streetscape in Tijuana",
          ],
          [
            "Ensenada",
            "Ocean air, coastal tables and open horizons.",
            MEDIA.ensenada,
            "destino/ensenada/index.htm",
            "Ensenada Pacific coastal cliffs and ocean horizon",
          ],
          [
            "Valle de Guadalupe",
            "Vineyards among granite hills and unhurried afternoons.",
            MEDIA["valle-de-guadalupe"],
            "destino/ensenada/index.htm",
            "Vineyards and sun-drenched hills in Valle de Guadalupe",
          ],
          [
            "Mexicali",
            "Desert horizons, heritage kitchens and warm canyon skies.",
            MEDIA.mexicali,
            "destino/mexicali/index.htm",
            "Dramatic desert peaks and desert sunsets in Mexicali",
          ],
          [
            "Rosarito",
            "Pacific swells, artisan galleries and sunset shores.",
            MEDIA.rosarito,
            "destino/rosarito/index.htm",
            "Pacific surf waves and sweeping sandy beaches in Playas de Rosarito",
          ],
          [
            "Tecate",
            "Sacred mountain trails, stone ovens and tranquil oak foothills.",
            MEDIA.tecate,
            "destino/tecate/index.htm",
            "Mount Cuchumá foothills and tranquil town of Tecate",
          ],
          [
            "San Felipe",
            "Warm tides on the Sea of Cortez and tranquil desert shores.",
            MEDIA["san-felipe"],
            "destino/san-felipe/index.htm",
            "Sea of Cortez azure waters and golden sands in San Felipe",
          ],
          [
            "San Quintín",
            "Volcanic bays, wetlands and berry orchards by the Pacific.",
            MEDIA["san-quintin"],
            "destino/san-quintin/index.htm",
            "San Quintín volcanic bay and coastal wetlands",
          ],
          [
            "Bahía de los Ángeles",
            "Pristine islands, marine sanctuaries and untouched desert coast.",
            MEDIA["bahia-de-los-angeles"],
            "estado/baja-california/index.htm",
            "Untouched island archipelago and turquoise waters in Bahía de los Ángeles",
          ],
        ],
      }
    : {
        id: "home-baja-carousel",
        kicker: "Baja California",
        title: "La experiencia Baja California",
        blurb:
          "Así funciona: empieza con una guía de destino y haz la experiencia a tu manera.",
        cta: "Abre tu guía",
        prev: "Destino anterior",
        next: "Siguiente destino",
        hint: "Arrastra, desliza o usa las flechas para recorrer la costa",
        cards: [
          [
            "Tijuana",
            "Creatividad fronteriza, oficio culinario y energía urbana.",
            MEDIA.tijuana,
            "destino/tijuana/index.htm",
            "Cultura urbana y calles vibrantes en Tijuana",
          ],
          [
            "Ensenada",
            "Brisa del Pacífico, mesas costeras y horizontes abiertos.",
            MEDIA.ensenada,
            "destino/ensenada/index.htm",
            "Acantilados y horizonte del Pacífico en Ensenada",
          ],
          [
            "Valle de Guadalupe",
            "Viñedos entre colinas de granito y tardes sin prisa.",
            MEDIA["valle-de-guadalupe"],
            "destino/ensenada/index.htm",
            "Viñedos y colinas soleadas en Valle de Guadalupe",
          ],
          [
            "Mexicali",
            "Horizontes del desierto, cocinas tradicionales y cañones cálidos.",
            MEDIA.mexicali,
            "destino/mexicali/index.htm",
            "Picos del desierto y atardeceres en Mexicali",
          ],
          [
            "Rosarito",
            "Olas del Pacífico, galerías artesanales y atardeceres en la costa.",
            MEDIA.rosarito,
            "destino/rosarito/index.htm",
            "Olas y playas amplias en Playas de Rosarito",
          ],
          [
            "Tecate",
            "Senderos de montaña sagrada, hornos de leña y sosiego campestre.",
            MEDIA.tecate,
            "destino/tecate/index.htm",
            "Faldas del Cuchumá y pueblo tranquilo de Tecate",
          ],
          [
            "San Felipe",
            "Mareas cálidas en el Mar de Cortés y playas doradas del desierto.",
            MEDIA["san-felipe"],
            "destino/san-felipe/index.htm",
            "Aguas azuladas del Mar de Cortés en San Felipe",
          ],
          [
            "San Quintín",
            "Bahías volcánicas, humedales y huertos frente al Pacífico.",
            MEDIA["san-quintin"],
            "destino/san-quintin/index.htm",
            "Bahía volcánica y humedales de San Quintín",
          ],
          [
            "Bahía de los Ángeles",
            "Islas vírgenes, santuarios marinos y costas desiertas.",
            MEDIA["bahia-de-los-angeles"],
            "estado/baja-california/index.htm",
            "Archipiélago y aguas turquesa en Bahía de los Ángeles",
          ],
        ],
      };

  function ensureAssets() {
    // Carousel CSS/JS are inlined on the page (data-tm-inline). Never fetch /assets/*.
    if (
      document.querySelector(
        '[data-tm-inline="tm-baja-carousel.css"], link[href*="tm-baja-carousel.css"]'
      ) &&
      document.querySelector(
        '[data-tm-inline="tm-baja-carousel.js"], script[src*="tm-baja-carousel.js"]'
      )
    ) {
      return;
    }
    console.warn("[tm-baja] missing inlined carousel assets; skipping external load");
  }

  function cardHtml(card, i) {
    var active = i === 0 ? " is-active" : "";
    return (
      '<article class="tm-baja-card' +
      active +
      '" data-baja-card data-index="' +
      i +
      '" role="group" aria-roledescription="slide" aria-label="' +
      card[0] +
      '">' +
      '<div class="tm-baja-media"><img src="' +
      mediaSrc(card[2]) +
      '" alt="' +
      card[4] +
      '" loading="lazy"></div>' +
      '<div class="tm-baja-copy"><h3>' +
      card[0] +
      "</h3><p>" +
      card[1] +
      '</p><a class="tm-baja-cta" href="' +
      pageRoot +
      card[3] +
      '">' +
      copy.cta +
      ' <span aria-hidden="true">↗</span></a></div></article>'
    );
  }

  function build() {
    var wrap = document.createElement("div");
    wrap.className = "website-section MuiBox-root css-0";
    wrap.id = copy.id;
    wrap.setAttribute("data-section-id", copy.id);
    wrap.setAttribute("data-tm-baja-version", VERSION);
    wrap.innerHTML =
      '<div class="MuiBox-root css-0"><section class="tm-baja" data-tm-baja data-tm-baja-version="' +
      VERSION +
      '" aria-roledescription="carousel" aria-label="' +
      copy.kicker +
      '"><div class="tm-baja-wrap"><div class="tm-baja-head"><span class="tm-baja-kicker">' +
      copy.kicker +
      "</span><h2>" +
      copy.title +
      "</h2><p>" +
      copy.blurb +
      '</p></div><div class="tm-baja-stage" data-baja-stage><div class="tm-baja-track">' +
      copy.cards.map(cardHtml).join("") +
      '</div></div><div class="tm-baja-controls"><button class="tm-baja-btn" type="button" data-baja-prev aria-label="' +
      copy.prev +
      '">‹</button><div class="tm-baja-dots" role="tablist" aria-label="' +
      copy.kicker +
      '">' +
      copy.cards
        .map(function (_, i) {
          return (
            '<button class="tm-baja-dot' +
            (i === 0 ? " is-active" : "") +
            '" type="button" data-baja-dot aria-label="Go to slide ' +
            (i + 1) +
            '"></button>'
          );
        })
        .join("") +
      '</div><button class="tm-baja-btn" type="button" data-baja-next aria-label="' +
      copy.next +
      '">›</button></div><p class="tm-baja-hint">' +
      copy.hint +
      "</p></div></section></div>";
    return wrap;
  }

  function removeStale() {
    var existing = document.getElementById(copy.id);
    var baja = document.querySelector("[data-tm-baja]");
    var section = baja && (baja.closest(".website-section") || baja.parentNode);
    var wrongLocale = section && section.id && section.id !== copy.id;
    var stale =
      wrongLocale ||
      (existing && existing.getAttribute("data-tm-baja-version") !== VERSION) ||
      (baja && baja.getAttribute("data-tm-baja-version") !== VERSION) ||
      (baja && baja.querySelectorAll("[data-baja-card]").length !== copy.cards.length);
    if (stale) {
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
      if (section && section.parentNode && section !== existing) {
        section.parentNode.removeChild(section);
      } else if (!existing && baja) {
        var orphan = baja.closest(".website-section") || baja.parentNode;
        if (orphan && orphan.parentNode) orphan.parentNode.removeChild(orphan);
      }
    }
  }

  function experienceAnchor() {
    return (
      document.getElementById("tm-journey-choices") ||
      document.getElementById("page-en-experience-iframe") ||
      document.getElementById("home-experience-iframe") ||
      null
    );
  }

  function placeAfterAnchor(node) {
    var anchor =
      experienceAnchor() ||
      document.getElementById("home-booking-ticker") ||
      document.getElementById("home-travel-booking") ||
      document.querySelector("#page-en-welcome, #home-welcome");
    if (!anchor || !anchor.parentNode) return false;
    if (anchor.nextElementSibling === node) return true;
    if (anchor.nextSibling) anchor.parentNode.insertBefore(node, anchor.nextSibling);
    else anchor.parentNode.appendChild(node);
    return true;
  }

  function place() {
    ensureAssets();
    removeStale();
    var existing = document.getElementById(copy.id);
    if (existing) {
      placeAfterAnchor(existing);
      return;
    }
    if (document.querySelector("[data-tm-baja]")) return;
    var node = build();
    if (!placeAfterAnchor(node)) return;
    setTimeout(function () {
      if (typeof window.tmBajaBoot === "function") window.tmBajaBoot();
    }, 60);
    setTimeout(function () {
      if (typeof window.tmBajaBoot === "function") window.tmBajaBoot();
    }, 400);
  }

  place();
  var n = 0;
  var t = setInterval(function () {
    place();
    n++;
    if (n > 80) clearInterval(t);
  }, 250);
  document.addEventListener("DOMContentLoaded", place);
  window.addEventListener("load", place);
})();
