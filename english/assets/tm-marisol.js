(function () {
  var VERSION = '3';
  if (window.__tmMarisolInit === VERSION) return;
  window.__tmMarisolInit = VERSION;

  var VIDEO_EN = 'https://admin.storebox.ai/media/9723fe4a-7dde-46e0-a54b-d1d1edfa62eb/db217dc4-630d-4acd-80a6-44d023715484/marisol-en.mp4';
  var VIDEO_ES = 'https://admin.storebox.ai/media/9723fe4a-7dde-46e0-a54b-d1d1edfa62eb/5175749a-b384-4a5f-a327-b558b3a13558/marisol-es.mp4';
  var AVATAR_CDN = 'https://admin.storebox.ai/media/9723fe4a-7dde-46e0-a54b-d1d1edfa62eb/d6fc4b2a-d60c-41a6-8a94-19fd9a9c0864/marisol.jpg';

  var openState = false;
  var chatLang = null;
  var els = {};

  function pageIsEnglish() {
    if (/\/en(\/|$)/i.test(location.pathname)) return true;
    if (/(^|\/)(index\.htm|index\.html)?$/i.test(location.pathname) || location.pathname === '/') {
      return false;
    }
    return /^en\b/i.test(document.documentElement.lang || '');
  }

  function isEnglish() {
    if (chatLang === 'en') return true;
    if (chatLang === 'es') return false;
    return pageIsEnglish();
  }

  function asset(path) {
    if (/^https?:\/\//i.test(path)) return path;
    if (path.charAt(0) === '/') return path;
    return (/\/en(\/|$)/.test(location.pathname) ? '../' : '') + path.replace(/^\.\//, '');
  }

  function copy() {
    if (isEnglish()) {
      return {
        launchOpen: 'Chat with Marisol',
        launchClose: 'Close chat',
        openAria: 'Open Marisol',
        closeAria: 'Close chat',
        minimizeAria: 'Minimize Marisol',
        mediaEyebrow: 'ON-SITE ASSISTANT',
        mediaBlurb: 'Scripted on-site assistant at TravelMexico.travel — not a connected LLM. Let’s explore Mexico together.',
        title: 'Let’s find your Mexico.',
        body:
          'A beach escape, a taste of local culture, or somewhere unexpected. Tell me what you enjoy, and we’ll explore together.',
        start: 'Where would you like to start?',
        placeholder: 'Message Marisol…',
        suggestions: [
          'Where can I book my trip?',
          'Help me discover a destination',
          'What can you help me with?'
        ],
        linkReserve: 'Reserve a trip',
        linkExplore: 'Explore destinations',
        pause: 'Pause introduction',
        play: 'Play introduction',
        mute: 'Mute introduction',
        unmute: 'Unmute introduction',
        history: 'Conversation history',
        fresh: 'New conversation',
        replies: {
          book:
            'You can book hotels, flights, cars, and more with the live booking engine — open the booking strip on this page, or go to reserve.travelmexico.travel. I am a scripted assistant, not connected AI checkout.',
          discover:
            'Tell me a vibe (beach, culture, Baja, Mexican Caribbean) and I’ll point you to guides and the My México personalizer on this site (demonstration — AI not connected).',
          help:
            'I can help with inspiration and destination ideas. Guide creation and booking are complementary, separate services on TravelMexico.',
          default:
            'Share what you enjoy — beaches, cities, wine country, Mexican Caribbean — and we’ll explore Mexico together.'
        }
      };
    }
    return {
      launchOpen: 'Hablar con Marisol',
      launchClose: 'Cerrar chat',
      openAria: 'Abrir Marisol',
      closeAria: 'Cerrar chat',
      minimizeAria: 'Minimizar Marisol',
      mediaEyebrow: 'ASISTENTE EN EL SITIO',
      mediaBlurb: 'Asistente con respuestas guiadas en TravelMéxico.travel — no es un LLM conectado. Descubramos México juntos.',
      title: 'Descubre tu México.',
      body:
        'Una escapada a la playa, cultura local o un lugar inesperado. Cuéntame qué te gusta y exploremos juntos.',
      start: '¿Por dónde empezamos?',
      placeholder: 'Escribe tu mensaje…',
      suggestions: [
        '¿Dónde puedo reservar mi viaje?',
        'Ayúdame a descubrir un destino',
        '¿En qué puedes ayudarme?'
      ],
      linkReserve: 'Reservar un viaje',
      linkExplore: 'Explorar destinos',
      pause: 'Pausar presentación',
      play: 'Reproducir presentación',
      mute: 'Silenciar',
      unmute: 'Activar sonido',
      history: 'Historial',
      fresh: 'Nueva conversación',
      replies: {
        book:
          'Puedes reservar hoteles, vuelos, autos y más con el motor en vivo — usa la franja de búsqueda de esta página o ve a reserve.travelmexico.travel. Soy un asistente con respuestas guiadas, no un checkout con IA conectada.',
        discover:
          'Dime un ambiente (playa, cultura, Baja, Caribe Mexicano) y te guío a las guías y al personalizador Mi México en este sitio (demostración — la IA no está conectada).',
        help:
          'Puedo ayudarte con inspiración e ideas de destino. La creación de guías y la reserva son servicios complementarios y separados en TravelMexico.',
        default:
          'Cuéntame qué te gusta — playas, ciudades, vino, Caribe Mexicano — y exploremos México juntos.'
      }
    };
  }

  function classify(text) {
    var t = String(text || '').toLowerCase();
    if (/book|reserv|hotel|flight|vuelo/.test(t)) return 'book';
    if (/discover|destino|destination|inspir|explor/.test(t)) return 'discover';
    if (/help|ayud|what can|en qu[eé]/.test(t)) return 'help';
    return 'default';
  }

  function replyFor(kind, c) {
    var body = c.replies[kind] || c.replies.default;
    if (kind === 'book') {
      body +=
        '\n\n<a href="#home-travel-booking">' +
        (isEnglish() ? 'Open booking search' : 'Abrir búsqueda') +
        '</a> · <a href="https://reserve.travelmexico.travel/" target="_blank" rel="noopener noreferrer">reserve.travelmexico.travel</a>';
    } else if (kind === 'discover') {
      var href = isEnglish() ? '#page-en-explore' : '#home-explore';
      body +=
        '\n\n<a href="' +
        href +
        '">' +
        (isEnglish() ? 'Explore destinations' : 'Explorar destinos') +
        '</a>';
    }
    return body;
  }

  function ensureDom() {
    var existing = document.getElementById('tm-marisol-root');
    if (existing) {
      if (existing.getAttribute('data-tm-marisol-v') === VERSION) {
        els.root = existing;
        cacheEls();
        return;
      }
      existing.remove();
      els = {};
    }

    if (!chatLang) chatLang = pageIsEnglish() ? 'en' : 'es';
    var c = copy();
    var avatar = asset('https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/2a6a848b-84d6-4b03-891d-6721ed10480e/marisol.jpg');
    var localVideo = asset(isEnglish() ? 'https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/75282b7f-3b85-4967-98c3-e319d1fb2e84/marisol-en.mp4' : 'https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/73938bf9-1e4a-4976-853f-9fdd5919764e/marisol-es.mp4');
    var cdnVideo = isEnglish() ? VIDEO_EN : VIDEO_ES;

    var root = document.createElement('div');
    root.id = 'tm-marisol-root';
    root.setAttribute('data-tm-marisol-v', VERSION);
    root.innerHTML =
      '<div class="tm-marisol-dock">' +
      '<button type="button" id="tm-marisol-launch" aria-expanded="false" aria-controls="tm-marisol-shell" aria-label="' +
      c.openAria +
      '">' +
      '<img class="tm-marisol-avatar" src="' +
      avatar +
      '" alt="Marisol, TravelMexico virtual assistant" width="48" height="48" decoding="async" onerror="this.src=\'' +
      AVATAR_CDN +
      '\'">' +
      '<span class="tm-marisol-launch-label">' +
      c.launchOpen +
      '</span></button></div>' +
      '<div class="tm-marisol-backdrop" data-tm-marisol-backdrop hidden></div>' +
      '<div id="tm-marisol-shell" class="tm-marisol-shell" role="region" aria-label="Marisol" hidden>' +
      '<div class="tm-marisol-card">' +
      '<div class="tm-marisol-media" data-testid="chatbot-avatar-panel">' +
      '<video playsinline autoplay muted loop preload="metadata" poster="' +
      avatar +
      '">' +
      '<source src="' +
      localVideo +
      '" type="video/mp4">' +
      '<source src="' +
      cdnVideo +
      '" type="video/mp4">' +
      '</video>' +
      '<div class="tm-marisol-media-copy"><small data-tm-eyebrow></small><strong>Marisol</strong><p data-tm-media-blurb></p></div>' +
      '<div class="tm-marisol-media-controls">' +
      '<button type="button" data-tm-video-toggle aria-label="' +
      c.pause +
      '">❚❚</button>' +
      '<button type="button" data-tm-mute-toggle aria-label="' +
      c.mute +
      '">♪</button>' +
      '</div></div>' +
      '<div class="tm-marisol-chat">' +
      '<div class="tm-marisol-head">' +
      '<img class="tm-marisol-head-avatar" src="' +
      avatar +
      '" alt="" width="38" height="38" decoding="async" onerror="this.src=\'' +
      AVATAR_CDN +
      '\'">' +
      '<div class="tm-marisol-head-name">Marisol</div>' +
      '<button type="button" class="tm-marisol-lang" data-tm-lang aria-label="Assistant language / Idioma del asistente"><span data-tm-lang-label>EN</span> ▾</button>' +
      '<button type="button" class="tm-marisol-icon-btn" data-tm-history aria-label="' +
      c.history +
      '" title="' +
      c.history +
      '">◷</button>' +
      '<button type="button" class="tm-marisol-icon-btn" data-tm-new aria-label="' +
      c.fresh +
      '" title="' +
      c.fresh +
      '">＋</button>' +
      '<button type="button" class="tm-marisol-icon-btn" data-tm-close aria-label="' +
      c.closeAria +
      '">×</button>' +
      '</div>' +
      '<div class="tm-marisol-body" data-tm-body>' +
      '<div data-tm-intro>' +
      '<h2 data-tm-title></h2>' +
      '<p data-tm-lead></p>' +
      '<div class="tm-marisol-start" data-tm-start></div>' +
      '<div class="tm-marisol-chips" data-tm-chips></div>' +
      '</div>' +
      '<div class="tm-marisol-messages" data-tm-messages hidden></div>' +
      '</div>' +
      '<div class="tm-marisol-footer">' +
      '<div class="tm-marisol-links">' +
      '<a data-tm-link-reserve href="https://reserve.travelmexico.travel/" target="_blank" rel="noopener noreferrer"></a>' +
      '<a data-tm-link-explore href="#home-explore"></a>' +
      '</div>' +
      '<form class="tm-marisol-composer" data-tm-form>' +
      '<textarea rows="1" name="message" data-tm-input aria-label="Your question"></textarea>' +
      '<button type="submit" class="tm-marisol-send" data-tm-send disabled aria-label="Send">↑</button>' +
      '</form></div></div></div></div>';

    document.body.appendChild(root);
    els.root = root;
    cacheEls();
    bind();
    applyCopy();
  }

  function cacheEls() {
    var root = els.root || document.getElementById('tm-marisol-root');
    els.root = root;
    els.launch = root.querySelector('#tm-marisol-launch');
    els.label = root.querySelector('.tm-marisol-launch-label');
    els.backdrop = root.querySelector('[data-tm-marisol-backdrop]');
    els.shell = root.querySelector('#tm-marisol-shell');
    els.video = root.querySelector('video');
    els.videoToggle = root.querySelector('[data-tm-video-toggle]');
    els.muteToggle = root.querySelector('[data-tm-mute-toggle]');
    els.langBtn = root.querySelector('[data-tm-lang]');
    els.langLabel = root.querySelector('[data-tm-lang-label]');
    els.close = root.querySelector('[data-tm-close]');
    els.fresh = root.querySelector('[data-tm-new]');
    els.intro = root.querySelector('[data-tm-intro]');
    els.messages = root.querySelector('[data-tm-messages]');
    els.chips = root.querySelector('[data-tm-chips]');
    els.form = root.querySelector('[data-tm-form]');
    els.input = root.querySelector('[data-tm-input]');
    els.send = root.querySelector('[data-tm-send]');
    els.linkReserve = root.querySelector('[data-tm-link-reserve]');
    els.linkExplore = root.querySelector('[data-tm-link-explore]');
  }

  function applyCopy() {
    var c = copy();
    els.label.textContent = openState ? c.launchClose : c.launchOpen;
    els.launch.setAttribute('aria-label', openState ? c.minimizeAria : c.openAria);
    rootQuery('[data-tm-eyebrow]').textContent = c.mediaEyebrow;
    rootQuery('[data-tm-media-blurb]').textContent = c.mediaBlurb;
    rootQuery('[data-tm-title]').textContent = c.title;
    rootQuery('[data-tm-lead]').textContent = c.body;
    rootQuery('[data-tm-start]').textContent = c.start;
    els.langLabel.textContent = isEnglish() ? 'EN' : 'ES';
    els.input.placeholder = c.placeholder;
    els.linkReserve.textContent = c.linkReserve + ' ↗';
    els.linkExplore.textContent = c.linkExplore + ' ↗';
    els.linkExplore.href = isEnglish() ? '#page-en-explore' : '#home-explore';
    els.close.setAttribute('aria-label', c.closeAria);
    els.fresh.setAttribute('aria-label', c.fresh);
    els.videoToggle.setAttribute('aria-label', c.pause);
    els.muteToggle.setAttribute('aria-label', c.mute);

    els.chips.innerHTML = '';
    c.suggestions.forEach(function (label) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'tm-marisol-chip';
      b.innerHTML = '<span>' + label + '</span><span aria-hidden="true">↗</span>';
      b.addEventListener('click', function () {
        sendMessage(label);
      });
      els.chips.appendChild(b);
    });

    setVideoSource();
  }

  function rootQuery(sel) {
    return els.root.querySelector(sel);
  }

  function setVideoSource() {
    if (!els.video) return;
    var local = asset(isEnglish() ? 'https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/75282b7f-3b85-4967-98c3-e319d1fb2e84/marisol-en.mp4' : 'https://admin.storebox.ai/media/1093c4f1-ca31-4883-a627-1f0ea88d8d40/73938bf9-1e4a-4976-853f-9fdd5919764e/marisol-es.mp4');
    var cdn = isEnglish() ? VIDEO_EN : VIDEO_ES;
    var sources = els.video.querySelectorAll('source');
    if (sources[0]) sources[0].src = local;
    if (sources[1]) sources[1].src = cdn;
    els.video.load();
    if (openState) {
      els.video.muted = true;
      els.video.play().catch(function () {});
    }
  }

  function bind() {
    if (els.root.getAttribute('data-tm-bound') === '1') return;
    els.root.setAttribute('data-tm-bound', '1');

    els.launch.addEventListener('click', function () {
      setOpen(!openState);
    });
    els.backdrop.addEventListener('click', function () {
      setOpen(false);
    });
    els.close.addEventListener('click', function () {
      setOpen(false);
    });
    els.fresh.addEventListener('click', resetChat);
    els.langBtn.addEventListener('click', function () {
      chatLang = isEnglish() ? 'es' : 'en';
      applyCopy();
      if (!els.intro.hidden) resetChat();
    });
    els.videoToggle.addEventListener('click', function () {
      if (!els.video) return;
      if (els.video.paused) {
        els.video.play();
        els.videoToggle.textContent = '❚❚';
        els.videoToggle.setAttribute('aria-label', copy().pause);
      } else {
        els.video.pause();
        els.videoToggle.textContent = '▶';
        els.videoToggle.setAttribute('aria-label', copy().play);
      }
    });
    els.muteToggle.addEventListener('click', function () {
      if (!els.video) return;
      els.video.muted = !els.video.muted;
      els.muteToggle.textContent = els.video.muted ? '♪' : '🔊';
      els.muteToggle.setAttribute('aria-label', els.video.muted ? copy().mute : copy().unmute);
    });
    els.form.addEventListener('submit', function (e) {
      e.preventDefault();
      sendMessage(els.input.value);
    });
    els.input.addEventListener('input', syncSend);
    els.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(els.input.value);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && openState) setOpen(false);
    });
  }

  function syncSend() {
    var ready = !!(els.input.value || '').trim();
    els.send.disabled = !ready;
    els.send.classList.toggle('is-ready', ready);
  }

  function resetChat() {
    els.messages.innerHTML = '';
    els.messages.hidden = true;
    els.intro.hidden = false;
    applyCopy();
  }

  function addBubble(html, who) {
    els.intro.hidden = true;
    els.messages.hidden = false;
    var div = document.createElement('div');
    div.className = 'tm-marisol-bubble is-' + (who === 'user' ? 'user' : 'bot');
    if (who === 'bot') div.innerHTML = String(html).replace(/\n/g, '<br>');
    else div.textContent = html;
    els.messages.appendChild(div);
    els.messages.scrollTop = els.messages.scrollHeight;
    var body = rootQuery('[data-tm-body]');
    if (body) body.scrollTop = body.scrollHeight;
  }

  function sendMessage(raw) {
    var text = String(raw || '').trim();
    if (!text) return;
    var c = copy();
    addBubble(text, 'user');
    els.input.value = '';
    syncSend();
    window.setTimeout(function () {
      addBubble(replyFor(classify(text), c), 'bot');
    }, 260);
  }

  function setOpen(next) {
    ensureDom();
    openState = !!next;
    var c = copy();
    els.launch.setAttribute('aria-expanded', openState ? 'true' : 'false');
    els.launch.setAttribute('aria-label', openState ? c.minimizeAria : c.openAria);
    els.label.textContent = openState ? c.launchClose : c.launchOpen;
    els.backdrop.hidden = !openState;
    els.shell.hidden = !openState;
    els.backdrop.classList.toggle('is-open', openState);
    els.shell.classList.toggle('is-open', openState);
    document.body.classList.toggle('tm-marisol-open', openState);
    if (openState) {
      if (els.video) {
        els.video.muted = true;
        els.video.play().catch(function () {});
      }
      window.setTimeout(function () {
        try {
          els.input.focus();
        } catch (e) {}
      }, 220);
    } else if (els.video) {
      els.video.pause();
    }
  }

  function openMarisol(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    setOpen(true);
  }

  window.tmOpenMarisol = openMarisol;

  function boot() {
    ensureDom();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
