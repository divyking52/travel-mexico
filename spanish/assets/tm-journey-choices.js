(function () {
  var VERSION = '8';
  if (window.__tmJourneyChoicesInit === VERSION) return;
  window.__tmJourneyChoicesInit = VERSION;

  var RESERVE = 'https://reserve.travelmexico.travel/';
  var XENI = 'https://xeni.plexe.ai/';

  function isEnglish() {
    var path = location.pathname.replace(/\\/g, '/');
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
    return /^en\b/i.test(document.documentElement.lang || '');
  }

  function openMarisol(e) {
    if (e) e.preventDefault();
    if (typeof window.tmOpenMarisol === 'function') {
      window.tmOpenMarisol(e);
      return;
    }
    var selectors = [
      '#tm-marisol-launch',
      '[aria-label*="Marisol" i]',
      'button[aria-label*="chat" i]',
      '[data-layout-id="chrome.website-chatbot"] button',
      '.website-chatbot button',
      '[class*="chatbot"] button',
      'button[aria-label*="Assist" i]'
    ];
    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i]);
      if (el && typeof el.click === 'function') {
        el.click();
        return;
      }
    }
    var fallback = document.querySelector('#home-travel-booking, .tm-journey');
    if (fallback) fallback.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function copy(en) {
    if (en) {
      return {
        kicker: 'Discover → Personalize → Book',
        title: 'A clear path from inspiration to booking.',
        pathHtml:
          'Discover México here, create or personalize a guide with <strong>My México. My Way.</strong>, then check availability and book with the live engine at <a href="' +
          RESERVE +
          '" target="_blank" rel="noopener noreferrer">reserve.travelmexico.travel</a>. Guide creator and booking are complementary, separate services.',
        cards: [
          {
            kind: 'inspire',
            eyebrow: '01 · Discover & personalize',
            title: 'My México. My Way',
            body: 'Demonstration guide creator with sourced Baja suggestions. AI is not connected yet.',
            action: 'Open personalizer',
            href: '#page-en-experience-iframe'
          },
          {
            kind: 'plan',
            eyebrow: '02 · On-site assistant',
            title: 'Marisol',
            body: 'Scripted on-site assistant for ideas before you book — not a connected LLM.',
            action: 'Chat with Marisol',
            href: '#tm-open-marisol'
          },
          {
            kind: 'book',
            eyebrow: '03 · Check availability',
            title: 'Book with TravelMexico',
            body: 'Live booking search for hotels, flights, cars, and more. Opens the existing engine.',
            action: 'Check availability & rates',
            href: '#home-travel-booking'
          }
        ],
        note:
          'Live: classic booking → reserve.travelmexico.travel. Demonstration: My México. My Way. (AI not connected). Optional external tool: Xeni AI search at xeni.plexe.ai — not integrated with TravelMexico checkout.'
      };
    }
    return {
      kicker: 'Descubre → Personaliza → Reserva',
      title: 'Un camino claro de la inspiración a la reserva.',
      pathHtml:
        'Descubre México aquí, crea o personaliza una guía con <strong>Mi México. A mi manera</strong> y luego consulta disponibilidad y reserva con el motor en vivo en <a href="' +
        RESERVE +
        '" target="_blank" rel="noopener noreferrer">reserve.travelmexico.travel</a>. El creador de guías y el motor de reservas son servicios complementarios y separados.',
      cards: [
        {
          kind: 'inspire',
          eyebrow: '01 · Descubre y personaliza',
          title: 'Mi México. A mi manera',
          body: 'Creador de guías en demostración con sugerencias verificadas de Baja. La IA no está conectada.',
          action: 'Abrir personalizador',
          href: '#home-experience-iframe'
        },
        {
          kind: 'plan',
          eyebrow: '02 · Asistente en el sitio',
          title: 'Marisol',
          body: 'Asistente con respuestas guiadas para ideas antes de reservar — no es un LLM conectado.',
          action: 'Hablar con Marisol',
          href: '#tm-open-marisol'
        },
        {
          kind: 'book',
          eyebrow: '03 · Consultar disponibilidad',
          title: 'Reserva con TravelMexico',
          body: 'Búsqueda de reservas en vivo para hoteles, vuelos, autos y más. Abre el motor existente.',
          action: 'Consultar disponibilidad y tarifas',
          href: '#home-travel-booking'
        }
      ],
      note:
        'En vivo: reserva clásica → reserve.travelmexico.travel. Demostración: Mi México. A mi manera (IA no conectada). Herramienta externa opcional: búsqueda Xeni AI en xeni.plexe.ai — sin integración verificada con el checkout de TravelMexico.'
    };
  }

  function buildCard(card, index) {
    var isXeni = card.kind === 'xeni';
    var isBook = card.kind === 'book';
    var isMarisol = card.kind === 'plan';
    var tag = isMarisol ? 'button' : 'a';
    var el = document.createElement(tag);
    el.className =
      'tm-journey-card' +
      (isXeni ? ' tm-journey-card--xeni' : '') +
      (isBook ? ' tm-journey-card--book' : '');
    if (isMarisol) {
      el.type = 'button';
      el.setAttribute('data-tm-open-marisol', '1');
    } else {
      el.href = card.href;
      if (isXeni || (isBook && /^https?:/i.test(card.href))) {
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      }
    }
    var step = String(index + 1).padStart(2, '0');
    el.innerHTML =
      '<span class="tm-journey-index" aria-hidden="true">' +
      step +
      ' /</span>' +
      '<span class="tm-journey-eyebrow">' +
      card.eyebrow +
      '</span>' +
      '<h3>' +
      card.title +
      '</h3>' +
      '<p>' +
      card.body +
      '</p>' +
      '<span class="tm-journey-action"><span>' +
      card.action +
      '</span><span aria-hidden="true">' +
      (isXeni || (isBook && /^https?:/i.test(card.href)) ? '↗' : '→') +
      '</span></span>';
    return el;
  }

  function syncXeniHrefs(root) {
    var scope = root || document;
    scope.querySelectorAll('a.tm-journey-card--xeni, a.tm-reserve-cta--xeni').forEach(function (a) {
      a.href = XENI;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
  }

  function iframeSection() {
    return (
      document.getElementById('page-en-experience-iframe') ||
      document.getElementById('home-experience-iframe') ||
      null
    );
  }

  function placeAfterIframe(wrap) {
    // Never sit between booking and ticker — that leaves a beach strip under the panel.
    var iframe = iframeSection();
    var ticker = document.getElementById('home-booking-ticker');
    var booking = document.getElementById('home-travel-booking');
    var editorial =
      document.getElementById('home-editorial') ||
      document.getElementById('page-en-editorial') ||
      null;
    var anchor = iframe || editorial || ticker || booking;
    if (!anchor || !anchor.parentNode) return false;
    if (anchor.nextElementSibling === wrap) return true;
    anchor.parentNode.insertBefore(wrap, anchor.nextSibling);
    return true;
  }

  function ensureJourney() {
    var booking = document.getElementById('home-travel-booking');
    if (!booking || !booking.parentNode) return;

    var existing = document.getElementById('tm-journey-choices');
    if (existing && existing.getAttribute('data-tm-journey-v') === VERSION) {
      placeAfterIframe(existing);
      syncXeniHrefs(existing);
      return;
    }
    if (existing) existing.remove();

    var en = isEnglish();
    var c = copy(en);
    var wrap = document.createElement('section');
    wrap.id = 'tm-journey-choices';
    wrap.className = 'tm-journey';
    wrap.setAttribute('aria-label', c.kicker);
    wrap.setAttribute('data-tm-journey-v', VERSION);

    var shell = document.createElement('div');
    shell.className = 'tm-journey-shell';

    var head = document.createElement('div');
    head.className = 'tm-journey-head';
    head.innerHTML =
      '<div><span class="tm-journey-kicker">' +
      c.kicker +
      '</span><h2 class="tm-journey-title">' +
      c.title +
      '</h2></div><p class="tm-journey-path">' +
      c.pathHtml +
      '</p>';

    var grid = document.createElement('div');
    grid.className = 'tm-journey-grid';
    c.cards.forEach(function (card, i) {
      grid.appendChild(buildCard(card, i));
    });

    var note = document.createElement('p');
    note.className = 'tm-journey-note';
    note.textContent = c.note;

    shell.appendChild(head);
    shell.appendChild(grid);
    shell.appendChild(note);
    wrap.appendChild(shell);
    placeAfterIframe(wrap);
  }

  function enhanceReserve() {
    var panel = document.querySelector('.tm-reserve-panel');
    if (!panel) return;
    if (panel.querySelector('.tm-reserve-choices')) {
      syncXeniHrefs(panel);
      return;
    }
    var en = isEnglish();
    var cta = panel.querySelector('a.tm-reserve-cta');
    if (!cta) return;

    var choices = document.createElement('div');
    choices.className = 'tm-reserve-choices';
    cta.classList.add('tm-reserve-cta--classic');
    cta.innerHTML =
      (en ? 'Check availability & book' : 'Consultar disponibilidad y reservar') +
      '<span aria-hidden="true">↗</span>';

    var xeni = document.createElement('a');
    xeni.className = 'tm-reserve-cta tm-reserve-cta--xeni';
    xeni.href = XENI;
    xeni.target = '_blank';
    xeni.rel = 'noopener noreferrer';
    xeni.innerHTML =
      (en ? 'Optional: Xeni AI (external)' : 'Opcional: Xeni AI (externo)') +
      '<span aria-hidden="true">↗</span>';

    cta.parentNode.insertBefore(choices, cta);
    choices.appendChild(cta);
    choices.appendChild(xeni);

    var note = panel.querySelector('.tm-reserve-note');
    if (note) {
      note.textContent = en
        ? 'Live booking opens reserve.travelmexico.travel. Xeni is an optional external AI search (xeni.plexe.ai).'
        : 'La reserva en vivo abre reserve.travelmexico.travel. Xeni es una búsqueda con IA externa opcional (xeni.plexe.ai).';
    }

    var left = document.querySelector('.tm-reserve-inner > div:first-child');
    if (left) {
      var p = left.querySelector('p');
      if (p) {
        p.textContent = en
          ? 'Use the booking engine above or continue at reserve.travelmexico.travel to check availability and rates. My México. My Way. remains a separate guide experience.'
          : 'Usa el motor de reservas de arriba o continúa en reserve.travelmexico.travel para consultar disponibilidad y tarifas. Mi México. A mi manera sigue siendo una experiencia de guía separada.';
      }
      left.querySelectorAll('.tm-reserve-inspire').forEach(function (el) {
        el.remove();
      });
    }
  }

  function bind() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-tm-open-marisol]');
      if (t) openMarisol(e);
    });
  }

  function run() {
    ensureJourney();
    enhanceReserve();
  }

  bind();
  run();
  var n = 0;
  var timer = setInterval(function () {
    run();
    n++;
    if (n > 50) clearInterval(timer);
  }, 250);
  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
})();
