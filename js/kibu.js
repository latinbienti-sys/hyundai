/* ==========================================================================
   KIBU · Interaccion de la pagina de inicio
   Carrusel hero · Catalogo con filtros · Modulo "Compara tu Hyundai"
   ========================================================================== */

(function () {
  "use strict";

  var D = window.KIBU;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ============================================================ NAVBAR === */
  function initNav() {
    var nav = $('#nav');
    if (!nav) return;

    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = $('.nav__toggle', nav);
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      $$('.nav__links a', nav).forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* ======================================================== CARRUSEL === */
  var SLIDES = [
    { image: 'img/watermarked_img_13367943299367624531.jpg', eyebrow: 'Creta · Pico Bolívar', title: 'Con CRETA', accent: 'concreta', end: 'tus sueños.', sub: 'SUV compacta con techo panorámico, pantalla de 10.25" y consumo eficiente. El Creta llegó para acompañarte en cada etapa de tu vida.', cta: 'Ver detalles', ctaHref: '#catalogo', cta2: 'Cotizar Creta', cta2Href: '#contacto' },
    { image: 'img/watermarked_img_10948222792170652927.jpg', eyebrow: 'Palisade · Sierra Nevada de Mérida', title: 'Manejá tu próximo', accent: 'Hyundai', end: 'en los Andes.', sub: 'Descubre la línea completa Hyundai 0KM con precios en USD, simulador de crédito y atención personalizada en el corazón de Mérida.', cta: 'Ver modelos', ctaHref: '#catalogo', cta2: 'Solicitar cotización', cta2Href: '#contacto' },
    { image: 'img/watermarked_img_5871150173315358561.jpg', eyebrow: 'Tucson · Páramo Merideño', title: 'Aventura sin', accent: 'límites,', end: 'diseñada para los Andes.', sub: 'El nuevo Hyundai Tucson combina tecnología SmartSense, tracción HTRAC y un diseño Parametric Dynamics listo para conquistar el páramo merideño.', cta: 'Conocer Tucson', ctaHref: '#estudio', cta2: 'Solicitar prueba', cta2Href: '#contacto' },
    { image: 'img/watermarked_img_17804480962303296709.jpg', eyebrow: 'Elantra · Laguna de Mucubají', title: 'Elegancia que', accent: 'se siente', end: 'en cada kilómetro.', sub: 'Diseño Parametric, tablero digital y consumo inteligente. El nuevo Elantra te lleva más lejos con el confort de un sedán premium.', cta: 'Conocer Elantra', ctaHref: '#estudio', cta2: 'Agendar cita', cta2Href: '#taller' }
  ];

  function initHero() {
    var track = $('#heroTrack');
    var dots = $('#heroDots');
    if (!track) return;

    SLIDES.forEach(function (s, i) {
      var slide = document.createElement('article');
      slide.className = 'hero__slide' + (i === 0 ? ' is-active' : '');
      slide.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');

      var bg = document.createElement('div');
      bg.className = 'hero__bg';
      bg.style.backgroundImage = "url('" + s.image + "')";

      var scrim = document.createElement('div');
      scrim.className = 'hero__scrim';

      var content = document.createElement('div');
      content.className = 'hero__content';
      /* Solo la primera diapositiva lleva h1: las demas se anuncian como
         parrafo para no repetir el encabezado principal del documento. */
      content.innerHTML =
        '<span class="eyebrow eyebrow--light">' + s.eyebrow + '</span>' +
        (i === 0
          ? '<h1 class="display">' + s.title + ' <span class="accent">' + s.accent + '</span> ' + s.end + '</h1>'
          : '<p class="hero__alt">' + s.title + ' <span class="accent">' + s.accent + '</span> ' + s.end + '</p>') +
        '<p>' + s.sub + '</p>' +
        '<div class="hero__actions">' +
          '<a class="btn btn--lime" href="' + s.ctaHref + '">' + s.cta + '</a>' +
          '<a class="btn btn--ghost" href="' + s.cta2Href + '">' + s.cta2 + '</a>' +
        '</div>';

      slide.appendChild(bg);
      slide.appendChild(scrim);
      slide.appendChild(content);
      track.appendChild(slide);

      if (dots) {
        var dot = document.createElement('button');
        dot.className = 'hero__dot' + (i === 0 ? ' is-active' : '');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Ir a la diapositiva ' + (i + 1));
        dot.addEventListener('click', function () { go(i); restart(); });
        dots.appendChild(dot);
      }
    });

    var slides = $$('.hero__slide', track);
    var dotEls = $$('.hero__dot', dots || document);
    var current = 0;
    var timer = null;

    function go(n) {
      slides[current].classList.remove('is-active');
      slides[current].setAttribute('aria-hidden', 'true');
      if (dotEls[current]) dotEls[current].classList.remove('is-active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      slides[current].setAttribute('aria-hidden', 'false');
      if (dotEls[current]) dotEls[current].classList.add('is-active');
    }
    function next() { go(current + 1); }
    function start() { if (!reduceMotion) timer = setInterval(next, 7000); }
    function restart() { clearInterval(timer); start(); }

    start();

    // Pausa cuando la pestana no esta visible: ahorra CPU y es accesible
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { clearInterval(timer); } else { restart(); }
    });
  }

  /* ========================================================= CATALOGO === */
  var CAT_LABEL = { hatchback: 'Hatchback', sedan: 'Sedán', suv: 'SUV' };

  function specList(m) {
    return '' +
      '<ul class="card__specs">' +
        '<li><span class="k">Motor</span><span class="v">' + m.motor + '</span></li>' +
        '<li><span class="k">Potencia</span><span class="v">' + D.hp(m.potencia) + ' HP</span></li>' +
        '<li><span class="k">Transmisión</span><span class="v">' + m.transmision + '</span></li>' +
        '<li><span class="k">Tanque</span><span class="v">' + m.capacidad_tanque + '</span></li>' +
      '</ul>';
  }
  function initCatalog() {
    var grid = $('#cards');
    var filters = $('#filters');
    if (!grid) return;

    function card(m) {
      var el = document.createElement('article');
      el.className = 'card reveal';
      el.innerHTML =
        '<div class="card__media">' +
          '<span class="card__tag">' + (CAT_LABEL[m.category] || m.category) + '</span>' +
          '<img src="' + m.image + '" alt="Hyundai ' + m.name + '" loading="lazy" width="700" height="492">' +
        '</div>' +
        '<div class="card__body">' +
          '<h3>' + D.family(m) + '</h3>' +
          '<p class="card__variant">' + m.name + ' · ' + m.variant + '</p>' +
          specList(m) +
          '<p class="card__price">' + D.money(m.precio) + '</p>' +
          '<a class="btn btn--outline btn--sm card__cta" href="#cotizador">Ver más</a>' +
        '</div>';
      return el;
    }

    function paint(cat) {
      grid.innerHTML = '';
      D.models.filter(function (m) { return cat === 'all' || m.category === cat; })
        .forEach(function (m) { grid.appendChild(card(m)); });
      observeReveal();
    }

    if (filters) {
      D.categories.forEach(function (c, i) {
        var b = document.createElement('button');
        b.className = 'filter' + (i === 0 ? ' is-active' : '');
        b.type = 'button';
        b.textContent = c.label;
        b.dataset.cat = c.id;
        b.addEventListener('click', function () {
          $$('.filter', filters).forEach(function (x) { x.classList.remove('is-active'); });
          b.classList.add('is-active');
          paint(c.id);
        });
        filters.appendChild(b);
      });
    }

    paint('all');
  }

  /* ====================================================== COMPARADOR === */
  function initCompare() {
    var list = $('#compareList');
    var table = $('#compareTable');
    var clear = $('#compareClear');
    if (!list || !table) return;

    var selected = [];
    var MAX = 3;

    D.models.forEach(function (m, idx) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'compare__opt';
      b.dataset.idx = String(idx);
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML =
        '<img src="' + m.image + '" alt="" loading="lazy" width="58" height="42">' +
        '<span><span class="t">' + D.family(m) + '</span><br><span class="s">' + m.variant + '</span></span>' +
        '<span class="box" aria-hidden="true"></span>';
      b.addEventListener('click', function () { toggle(idx, b); });
      li.appendChild(b);
      list.appendChild(li);
    });

    function toggle(idx, btn) {
      var at = selected.indexOf(idx);
      if (at > -1) {
        selected.splice(at, 1);
        btn.classList.remove('is-on');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        if (selected.length >= MAX) return;
        selected.push(idx);
        btn.classList.add('is-on');
        btn.setAttribute('aria-pressed', 'true');
      }
      render();
    }

    function render() {
      if (clear) clear.disabled = selected.length === 0;

      if (selected.length === 0) {
        table.innerHTML = '<div class="compare__empty">Selecciona al menos un modelo para comparar.</div>';
        return;
      }

      var picks = selected.map(function (i) { return D.models[i]; });

      var html = '<table class="compare__table"><thead><tr><th>Especificación</th>';
      picks.forEach(function (m) { html += '<th>' + m.name + '</th>'; });
      html += '</tr></thead><tbody>';

      var maxHp = Math.max.apply(null, picks.map(function (m) { return D.hp(m.potencia); }));

      D.specRows.forEach(function (row) {
        // marca las filas donde los valores difieren entre los elegidos
        var vals = picks.map(function (m) { return m[row.key]; });
        var distinct = vals.some(function (v) { return v !== vals[0]; });

        html += '<tr><th scope="row">' + row.label + '</th>';
        picks.forEach(function (m) {
          var val = m[row.key];
          var extra = '';
          if (row.key === 'precio' && picks.length > 1) {
            var cheapest = Math.min.apply(null, picks.map(function (x) { return x.precio; }));
            if (m.precio === cheapest) extra = '<span class="compare__best">Mejor precio</span>';
          }
          if (row.key === 'potencia' && D.hp(val) === maxHp && picks.length > 1) {
            extra = '<span class="compare__best">Top</span>';
          }
          if (row.key === 'precio') val = D.money(m.precio);
          if (row.key === 'category') val = CAT_LABEL[val] || val;
          html += '<td class="' + (distinct ? 'is-diff' : '') + '">' + val + extra + '</td>';
        });
        html += '</tr>';
      });

      html += '</tbody></table>';
      table.innerHTML = html;
    }

    if (clear) {
      clear.addEventListener('click', function () {
        selected = [];
        $$('.compare__opt', list).forEach(function (b) {
          b.classList.remove('is-on');
          b.setAttribute('aria-pressed', 'false');
        });
        render();
      });
    }

    render();
  }

  /* ============================================================ REVEAL === */
  var io = null;
  function observeReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    $$('.reveal').forEach(function (el) { io.observe(el); });
  }

  /* ============================================================== INIT === */
  // Las paginas internas reutilizan el navbar y el observador de entrada
  window.KIBU_UI = { reveal: observeReveal };

  function init() {
    initNav();
    initHero();
    initCatalog();
    initCompare();
    observeReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
