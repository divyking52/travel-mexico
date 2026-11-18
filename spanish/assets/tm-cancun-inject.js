(function () {
  if (window.__tmCancunInjectInit) return;
  window.__tmCancunInjectInit = true;

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
  var MARK = "tm-cancun-v6";

  var copy = EN
    ? {
        eyebrow: "Featured airport",
        title: '<em>Cancún</em> <span>is the gateway.</span>',
        subtitle: "The Mexican Caribbean is yours to discover.",
        description:
          "Cancún welcomes you to 12 destinations in Quintana Roo: beaches, islands, jungles, Mayan culture, and lagoons — including Tulum for wellness and nature. Check live availability and rates when you are ready to book.",
        dealTitle: "Check availability & rates",
        dealBody: "Browse hotels and dates for the Mexican Caribbean — no special offer claimed here.",
        book: "Check availability & book",
        magazine: "Download the magazine",
        destLabel: "Mexican Caribbean destinations",
        railLabel: "Mexican Caribbean destinations",
        prev: "Previous destinations",
        next: "Next destinations",
        cozumel: "Cozumel Island",
        wellnessKicker: "Tulum · Wellness & Longevity",
        wellnessTitle: "Your journey, at a different pace.",
        wellnessBody:
          "Beach time, yoga, spa rituals, nature and Maya heritage — travel and lifestyle inspiration for a slower Mexican Caribbean stay.",
        wellnessCta: "Explore Tulum wellness →",
        wellnessNote:
          "Editorial inspiration only — not medical care or a promise of longevity. Images from the TravelMexico media library.",
        wellnessAlt: "Caribbean beach viewed from a thatched cabana by the sea",
      }
    : {
        eyebrow: "Aeropuerto destacado",
        title: '<em>Cancún</em> <span>es la puerta de entrada.</span>',
        subtitle: "El Caribe Mexicano es tuyo para descubrir.",
        description:
          "Cancún te da la bienvenida a 12 destinos en Quintana Roo: playas, islas, selva, cultura maya y lagunas — incluido Tulum para bienestar y naturaleza. Consulta disponibilidad y tarifas cuando quieras reservar.",
        dealTitle: "Consulta disponibilidad y tarifas",
        dealBody: "Explora hoteles y fechas en el Caribe Mexicano — sin promociones especiales anunciadas aquí.",
        book: "Consultar disponibilidad y reservar",
        magazine: "Descarga la revista",
        destLabel: "Destinos del Caribe Mexicano",
        railLabel: "Destinos del Caribe Mexicano",
        prev: "Destinos anteriores",
        next: "Siguientes destinos",
        cozumel: "Isla Cozumel",
        wellnessKicker: "Tulum · Bienestar y Longevidad",
        wellnessTitle: "Tu viaje, a otro ritmo.",
        wellnessBody:
          "Playa, yoga, rituales de spa, naturaleza y herencia maya — inspiración de viaje y estilo de vida para un Caribe Mexicano más pausado.",
        wellnessCta: "Explorar bienestar en Tulum →",
        wellnessNote:
          "Solo inspiración editorial — no es atención médica ni una promesa de longevidad. Imágenes de la biblioteca de TravelMexico.",
        wellnessAlt: "Playa del Caribe vista desde una cabaña junto al mar",
      };

  var destinations = [
    [
      "Cancún",
      "destino/cancun/index.htm",
      "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/24be8bca-cc1c-4b4b-a0ef-6f707ffc04eb/tm-f6b77eeff880-Cancun-playa-aerea_1080X1080-e1666030662572.png",
    ],
    [
      "Costa Mujeres",
      "destino/costa-mujeres/index.htm",
      "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/412c0079-397e-4d2a-a5ce-6271a217183c/tm-2b5581be4719-Costa-Mujeres2-scaled.jpg",
    ],
    [
      "Isla Mujeres",
      "destino/isla-mujeres/index.htm",
      "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/540b1f1d-6a76-4dee-83db-b45bf8399a1e/tm-2ec8f2dfa0b3-Islamujeres-musa1080X1080-e1666034784478-1024x609.png",
    ],
    [
      "Puerto Morelos",
      "destino/puerto-morelos/index.htm",
      "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/7bb7d970-bc5e-4932-91ea-15ee12e6450e/tm-835ee8e95983-Muelle-Puerto-morelos-683x1024.jpg",
    ],
    [
      "Playa del Carmen",
      "destino/playa-del-carmen/index.htm",
      "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/2662b9e1-d62c-4eef-9fda-8bc57f753bec/tm-1e676256966b-Quinta-avenida-playa-del-carmen-1024x683.jpg",
    ],
    [
      "Tulum",
      "destino/tulum/index.htm",
      "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/a859abda-0728-441b-aa46-5a6b6e67e6af/tm-3ed0ec4c9b00-Zona-arqueologica-tulum1080X1080-1024x1024.jpg",
    ],
    [
      null,
      "destino/isla-cozumel/index.htm",
      "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/0daef053-fcd0-42a1-ae10-92075160f96b/tm-4a121a1f7cb5-Cozumel-mar1080X1080-1024x1024.png",
    ],
    [
      "Holbox",
      "destino/holbox/index.htm",
      "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/26df3b49-f296-4587-b2be-49a69e407047/tm-9e813b1d93fb-Holbox-flamencos1080X1080-1024x1024.png",
    ],
    [
      "Maya Ka’an",
      "destino/maya-ka-an/index.htm",
      "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/f7f00b0c-2c7a-455d-bd5d-c52a426b50f4/tm-87f7923f5610-Maya-Ka-AN-1024x505.jpg",
    ],
    [
      "Mahahual",
      "destino/mahahual/index.htm",
      "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/9932525d-d77e-4f02-b260-a45ef42382f5/tm-dab77c3295d7-Mahahual-lancha1080X1080-1024x1024.png",
    ],
    [
      "Bacalar",
      "destino/bacalar/index.htm",
      "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/7f89bf1d-c248-49bd-b27d-b1bc27ad49c7/tm-284f2747d873-Bacalar-laguna_1200X628-1024x536.png",
    ],
    [
      "Chetumal",
      "destino/chetumal/index.htm",
      "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/b1d7061b-459a-4b84-b45c-7992af419820/tm-a9e262c80ed8-Oxtankah-1024x683.jpg",
    ],
  ];

  var BG =
    "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/92be9188-c877-4149-b28b-1ea954d82590/cancun-gateway-coast-v2.webp";
  var WELLNESS_IMG =
    "https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/457c7692-d08f-44f4-ab1f-abd3e1f01c8b/mexico-cabana-hero-v1.png";
  var WELLNESS_HREF = EN
    ? "/en/destino/tulum-wellness/index.htm"
    : "/destino/tulum-wellness/index.htm";
  var MARK_WELLNESS = "tm-wellness-banner-v1";

  /* Always prefer Storebox CDN for media; never leave page-relative media paths. */
  function storeboxMediaUrl(rel) {
    if (!rel) return rel;
    if (/^https?:\/\/(?:admin|media)\.storebox\.ai\//i.test(rel)) return rel;
    if (/^(https?:|data:)/i.test(rel)) return rel;
    var path = String(rel).replace(/^\/+/, "");
    if (path.indexOf("media/") === 0) return "https://admin.storebox.ai/" + path;
    var m = path.match(/(?:^|\/)(media\/1093c4f1[^?#]*)/);
    if (m) return "https://admin.storebox.ai/" + m[1];
    return null;
  }

  function absUrl(rel) {
    if (!rel) return rel;
    var media = storeboxMediaUrl(rel);
    if (media) return media;
    if (/^(https?:|data:)/i.test(rel)) return rel;
    var path = String(rel).replace(/^\/+/, "");
    return "/" + path;
  }

  function ensureAssets() {
    // Pages ship CSS/JS inline (data-tm-inline). Do not fetch /assets/*.css|js.
    if (
      document.querySelector(
        '[data-tm-inline="tm-cancun.css"], style[data-tm-cancun-css], link[data-tm-cancun-css]'
      ) &&
      document.querySelector(
        '[data-tm-inline="tm-tulum-wellness-banner.css"], style[data-tm-wellness-banner-css], link[data-tm-wellness-banner-css]'
      ) &&
      document.querySelector(
        '[data-tm-inline="tm-cancun.js"], script[data-tm-cancun-js], script[src*="tm-cancun.js"]'
      )
    ) {
      return;
    }
    // Fallback only if a page somehow omitted the inlined tags.
    console.warn("[tm-cancun] missing inlined assets; skipping external load");
  }

  function wellnessBannerHtml() {
    return (
      '<aside class="tm-wellness-banner" data-' +
      MARK_WELLNESS +
      '="1" aria-label="' +
      copy.wellnessKicker +
      '">' +
      '<a class="tm-wellness-banner-link" href="' +
      WELLNESS_HREF +
      '">' +
      '<div class="tm-wellness-banner-media">' +
      '<img src="' +
      WELLNESS_IMG +
      '" alt="' +
      copy.wellnessAlt +
      '" loading="lazy" decoding="async" width="1200" height="800" data-tm-storebox-src="1" referrerpolicy="no-referrer">' +
      "</div>" +
      '<div class="tm-wellness-banner-copy">' +
      '<p class="tm-wellness-banner-kicker">' +
      copy.wellnessKicker +
      "</p>" +
      "<h3>" +
      copy.wellnessTitle +
      "</h3>" +
      "<p>" +
      copy.wellnessBody +
      "</p>" +
      '<span class="tm-wellness-banner-cta">' +
      copy.wellnessCta +
      "</span>" +
      "</div></a></aside>"
    );
  }

  function cardHtml(card) {
    var name = card[0] || copy.cozumel;
    var href = absUrl((EN ? "en/" : "") + card[1]);
    var src = storeboxMediaUrl(card[2]) || absUrl(card[2]);
    return (
      '<a class="tm-cancun-card" href="' +
      href +
      '"><img src="' +
      src +
      '" alt="' +
      name +
      '" loading="eager" decoding="async" data-tm-cancun-thumb="1" data-tm-storebox-src="1" referrerpolicy="no-referrer"><strong>' +
      name +
      "</strong></a>"
    );
  }

  function kickRailImages(section) {
    if (!section) return;
    section.querySelectorAll(".tm-cancun-card img, .tm-cancun-media-img").forEach(function (img) {
      var raw =
        img.getAttribute("data-tm-original-src") ||
        img.getAttribute("src") ||
        img.currentSrc;
      var src = storeboxMediaUrl(raw) || raw;
      if (!src) return;
      img.setAttribute("data-tm-storebox-src", "1");
      img.setAttribute("data-tm-cancun-thumb", "1");
      img.removeAttribute("loading");
      img.setAttribute("loading", "eager");
      img.setAttribute("referrerpolicy", "no-referrer");
      if (img.getAttribute("src") !== src || !(img.complete && img.naturalWidth > 0)) {
        img.src = "";
        img.src = src;
      }
    });
  }

  function sectionHtml() {
    var magIcon =
      '<span class="tm-cancun-button-book"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5c2.7-.9 5.3-.6 8 1.1v12c-2.7-1.7-5.3-2-8-1.1v-12Zm16 0c-2.7-.9-5.3-.6-8 1.1v12c2.7-1.7 5.3-2 8-1.1v-12Z"></path></svg></span>';
    return (
      '<div class="tm-cancun-stage">' +
      '<div class="tm-cancun-media" aria-hidden="true">' +
      '<img class="tm-cancun-media-img" src="' +
      (storeboxMediaUrl(BG) || absUrl(BG)) +
      '" alt="" decoding="async" fetchpriority="low" data-tm-storebox-src="1" referrerpolicy="no-referrer">' +
      "</div>" +
      '<div class="tm-cancun-panel">' +
      '<div class="tm-cancun-copy">' +
      '<p class="tm-cancun-eyebrow">' +
      copy.eyebrow +
      "</p>" +
      "<h2>" +
      copy.title +
      "</h2>" +
      '<p class="tm-cancun-subtitle">' +
      copy.subtitle +
      "</p>" +
      '<p class="tm-cancun-description">' +
      copy.description +
      "</p>" +
      '<div class="tm-cancun-deal">' +
      "<strong>" +
      copy.dealTitle +
      "</strong>" +
      "<p>" +
      copy.dealBody +
      "</p></div></div>" +
      '<div class="tm-cancun-actions">' +
      '<div class="tm-cancun-booking-wrap">' +
      '<a class="tm-cancun-button tm-cancun-button--primary" href="https://reserve.travelmexico.travel">' +
      copy.book +
      '<span class="tm-cancun-button-arrow" aria-hidden="true">→</span></a>' +
      '<span class="tm-cancun-booking-note">reserve.travelmexico.travel</span>' +
      "</div>" +
      '<a class="tm-cancun-button tm-cancun-button--ghost" href="https://indd.adobe.com/view/91b51156-66e2-4c85-85e7-2ddbd66d6910" target="_blank" rel="noopener noreferrer">' +
      magIcon +
      copy.magazine +
      "</a>" +
      "</div></div>" +
      '<div class="tm-cancun-destinations">' +
      '<div class="tm-cancun-dest-bar">' +
      '<p class="tm-cancun-dest-label">' +
      copy.destLabel +
      "</p>" +
      '<div class="tm-cancun-nav-group">' +
      '<button class="tm-cancun-nav tm-cancun-nav-prev" type="button" aria-label="' +
      copy.prev +
      '">‹</button>' +
      '<button class="tm-cancun-nav tm-cancun-nav-next" type="button" aria-label="' +
      copy.next +
      '">›</button>' +
      "</div></div>" +
      '<div class="tm-cancun-rail" role="region" aria-label="' +
      copy.railLabel +
      '" tabindex="0">' +
      destinations.map(cardHtml).join("") +
      "</div></div></div>"
    );
  }

  function ensureWellnessBanner(section) {
    if (!section) return;
    var existing = section.querySelector(".tm-wellness-banner");
    if (existing && existing.getAttribute("data-" + MARK_WELLNESS) === "1") {
      var link = existing.querySelector(".tm-wellness-banner-link");
      var img = existing.querySelector(".tm-wellness-banner-media img");
      if (link) link.setAttribute("href", WELLNESS_HREF);
      if (img) {
        img.setAttribute("src", WELLNESS_IMG);
        img.setAttribute("alt", copy.wellnessAlt);
      }
      existing.querySelectorAll(".tm-wellness-banner-note").forEach(function (n) {
        n.remove();
      });
      return;
    }
    if (existing) existing.remove();
    section.insertAdjacentHTML("beforeend", wellnessBannerHtml());
  }

  function applyBg(section) {
    if (!section) return;
    var src = storeboxMediaUrl(BG) || absUrl(BG);
    section.style.setProperty("--tm-cancun-bg", "url('" + src + "')");
    var media = section.querySelector(".tm-cancun-media");
    if (media) media.style.backgroundImage = "url('" + src + "')";
    var img = section.querySelector(".tm-cancun-media-img");
    if (!img && media) {
      img = document.createElement("img");
      img.className = "tm-cancun-media-img";
      img.alt = "";
      img.decoding = "async";
      media.insertBefore(img, media.firstChild);
    }
    if (img) {
      img.setAttribute("data-tm-storebox-src", "1");
      img.setAttribute("referrerpolicy", "no-referrer");
      if (img.getAttribute("src") !== src) img.src = src;
    }
  }

  function applySection(section) {
    if (!section) return false;
    if (
      section.getAttribute("data-" + MARK) === "1" &&
      section.querySelector(".tm-cancun-deal") &&
      section.querySelector(".tm-cancun-panel")
    ) {
      applyBg(section);
      ensureWellnessBanner(section);
      kickRailImages(section);
      if (!section.classList.contains("is-visible")) {
        delete section.dataset.tmCancunBooted;
      }
      return true;
    }

    section.setAttribute("data-tm-cancun", "");
    section.setAttribute("data-" + MARK, "1");
    section.classList.add("tm-cancun");
    section.setAttribute("aria-label", copy.eyebrow + " — Cancún");
    section.innerHTML = sectionHtml();
    applyBg(section);
    ensureWellnessBanner(section);
    kickRailImages(section);
    // After site-localizer rewrites media URLs, kick again so thumbs actually paint.
    setTimeout(function () {
      kickRailImages(section);
    }, 50);
    setTimeout(function () {
      kickRailImages(section);
    }, 400);
    section.dataset.tmCancunBooted = "";
    delete section.dataset.tmCancunBooted;
    return true;
  }

  function findHost() {
    return (
      document.querySelector("#page-en-editorial .MuiBox-root.css-0") ||
      document.querySelector("#home-editorial .MuiBox-root.css-0") ||
      document.querySelector('[data-section-id="page-en-editorial"] .MuiContainer-root > .MuiBox-root') ||
      document.querySelector('[data-section-id="home-editorial"] .MuiContainer-root > .MuiBox-root') ||
      document.getElementById(EN ? "page-en-editorial" : "home-editorial")
    );
  }

  function place() {
    ensureAssets();
    var existing = document.querySelector(".tm-cancun, [data-tm-cancun]");
    if (existing) {
      applySection(existing);
    } else {
      var host = findHost();
      if (!host) return;
      var section = document.createElement("section");
      section.className = "tm-cancun";
      applySection(section);
      host.appendChild(section);
    }
    if (typeof window.tmCancunBoot === "function") window.tmCancunBoot();
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
