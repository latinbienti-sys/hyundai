/* ==========================================================================
   Automotores Kibun · Secciones de experiencia de la portada
   Estudio 360, Ruta Andina y cotizador rapido.
   Los datos salen siempre de KIBU (js/data.js): no se inventan modelos,
   precios ni especificaciones. La tasa del credito es la misma que usa el
   simulador completo (js/simulador.js).
   ========================================================================== */

(function () {
  "use strict";

  var D = window.KIBU;
  var TEL = "584147482282"; // +58 414-7482282
  var ANNUAL_RATE = 0.12; // misma tasa anual que el simulador original
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function fmt(n) { return Math.round(n).toLocaleString("es-VE"); }

  /* ======================================================== ESTUDIO 360 == */
  /* Color de muestra de cada boton. Las fotos son recortes con canal alfa,
     por eso el reflejo inferior se ve bien sobre ellas. */
  var SWATCH = { azul: "#1e3a8a", plata: "#c0c4c8", blanco: "#eef1f5", rojo: "#8b1e2b" };

  function initStudio() {
    var root = $("#studio");
    if (!root || !D) return;

    var trimEl = $("#studioTrim", root);
    var nameEl = $("#studioName", root);
    var priceEl = $("#studioPrice", root);
    var imgEl = $("#studioImg", root);
    var reflEl = $("#studioRefl", root);
    var swatchWrap = $("#studioSwatches", root);
    var colorLabel = $("#studioColorLabel", root);
    var modelWrap = $("#studioModels", root);
    var lightsBtn = $("#studioLights", root);
    var glow = $("#studioGlow", root);

    /* Un modelo por familia, para no repetir diez botones */
    var picks = [];
    D.models.forEach(function (m) {
      var fam = D.family(m);
      var seen = picks.some(function (p) { return D.family(p) === fam; });
      if (!seen) picks.push(m);
    });

    var current = picks[0];

    function applyColor(idx) {
      var c = current.colors[idx] || current.colors[0];
      imgEl.src = c.image;
      imgEl.alt = current.name + " en color " + c.label;
      reflEl.src = c.image;
      colorLabel.textContent = c.label;
      $$(".studio__swatch", swatchWrap).forEach(function (b, i) {
        b.setAttribute("aria-pressed", i === idx ? "true" : "false");
      });
    }

    function renderSwatches() {
      swatchWrap.innerHTML = "";
      current.colors.forEach(function (c, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "studio__swatch";
        b.style.backgroundColor = SWATCH[c.palette] || "#c8ccd2";
        b.title = c.label;
        b.setAttribute("aria-label", "Color " + c.label);
        b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
        b.addEventListener("click", function () { applyColor(i); });
        swatchWrap.appendChild(b);
      });
    }

    function select(idx) {
      current = picks[idx];
      trimEl.textContent = current.variant;
      nameEl.textContent = current.name;
      priceEl.textContent = D.money(current.precio);
      $$("button", modelWrap).forEach(function (b, i) {
        b.setAttribute("aria-pressed", i === idx ? "true" : "false");
      });
      renderSwatches();
      applyColor(0);
    }

    picks.forEach(function (m, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = D.family(m);
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", function () { select(i); });
      modelWrap.appendChild(b);
    });

    lightsBtn.addEventListener("click", function () {
      var on = lightsBtn.getAttribute("aria-pressed") !== "true";
      lightsBtn.setAttribute("aria-pressed", on ? "true" : "false");
      lightsBtn.textContent = on ? "Faros LED: encendidos" : "Faros LED: apagados";
      glow.hidden = !on;
    });

    select(0);
  }
  /* ======================================================== RUTA ANDINA == */
  /* Recorrido de la cordillera de Merida. Es una simulacion visual: los
     modos cambian la respuesta del vehiculo, no cifras de venta. */
  var MODES = {
    ECO:     { speed: 50,  rpm: 1800, lane: "1.4s" },
    COMFORT: { speed: 75,  rpm: 2300, lane: "0.9s" },
    SPORT:   { speed: 110, rpm: 4200, lane: "0.45s" },
    HTRAC:   { speed: 62,  rpm: 2900, lane: "0.7s" }
  };

  var PEAK = 4118; // Pico El Aguila

  var STOPS = [
    { at: 0,    name: "Merida Centro",      alt: 1630 },
    { at: 2000, name: "Tabay · El Valle",   alt: 2100 },
    { at: 3000, name: "Laguna de Mucubaji", alt: 3550 },
    { at: 3700, name: "Pico El Aguila",     alt: PEAK }
  ];

  function initAndina() {
    var root = $("#andina");
    if (!root) return;

    var whereEl = $("#andinaWhere", root);
    var carEl = $("#andinaCar", root);
    var laneEl = $("#andinaLane", root);
    var speedEl = $("#gSpeed", root);
    var rpmEl = $("#gRpm", root);
    var altEl = $("#gAlt", root);
    var modeWrap = $("#andinaModes", root);
    var throttle = $("#andinaThrottle", root);

    var mode = "COMFORT";
    var boosting = false;
    var speed = 75, rpm = 2300, alt = 1630;
    var raf = null, prev = 0, running = false;

    function paint() {
      speedEl.innerHTML = fmt(speed) + " <i>km/h</i>";
      rpmEl.innerHTML = fmt(rpm) + " <i>rpm</i>";
      altEl.innerHTML = fmt(alt) + " <i>msnm</i>";
      var stop = STOPS[0];
      for (var i = 0; i < STOPS.length; i++) {
        if (alt >= STOPS[i].at) stop = STOPS[i];
      }
      whereEl.textContent = stop.name + " · " + fmt(stop.alt) + " msnm";
    }

    function step(now) {
      if (!prev) prev = now;
      var dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;

      var cfg = MODES[mode];
      var tSpeed = cfg.speed + (boosting ? 28 : 0);
      var tRpm = cfg.rpm + (boosting ? 1700 : 0);
      speed += (tSpeed - speed) * Math.min(1, dt * 4);
      rpm += (tRpm - rpm) * Math.min(1, dt * 6);
      alt = alt > PEAK ? 1630 : alt + (boosting ? 26 : 8) * dt;

      paint();
      raf = window.requestAnimationFrame(step);
    }

    function start() {
      if (running) return;
      running = true;
      prev = 0;
      raf = window.requestAnimationFrame(step);
    }

    function stop() {
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = null;
    }

    Object.keys(MODES).forEach(function (key) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = key === "HTRAC" ? "HTRAC 4x4" : key;
      b.setAttribute("aria-pressed", key === mode ? "true" : "false");
      b.addEventListener("click", function () {
        mode = key;
        $$("button", modeWrap).forEach(function (x) {
          x.setAttribute("aria-pressed", "false");
        });
        b.setAttribute("aria-pressed", "true");
        if (!reduceMotion) laneEl.style.animationDuration = MODES[key].lane;
      });
      modeWrap.appendChild(b);
    });

    function boostOn() {
      if (boosting) return;
      boosting = true;
      carEl.classList.add("is-boost");
      throttle.classList.add("is-on");
      throttle.textContent = "Acelerando";
    }

    function boostOff() {
      if (!boosting) return;
      boosting = false;
      carEl.classList.remove("is-boost");
      throttle.classList.remove("is-on");
      throttle.textContent = "Mantener acelerador";
    }

    throttle.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      boostOn();
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
      throttle.addEventListener(ev, boostOff);
    });
    throttle.addEventListener("keydown", function (e) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); boostOn(); }
    });
    throttle.addEventListener("keyup", function (e) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); boostOff(); }
    });
    throttle.addEventListener("blur", boostOff);

    /* El bucle solo corre con la seccion a la vista */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) start(); else stop();
      }, { threshold: 0.05 }).observe(root);
    } else {
      start();
    }

    paint();
  }

  /* =========================================================== COTIZADOR == */
  function initQuote() {
    var root = $("#cotizador");
    if (!root || !D) return;

    var modelSel = $("#qModel", root);
    var downRange = $("#qDown", root);
    var downPct = $("#qDownPct", root);
    var termWrap = $("#qTerms", root);
    var outPrice = $("#qOutPrice", root);
    var outDown = $("#qOutDown", root);
    var outFinance = $("#qOutFinance", root);
    var outTerm = $("#qOutTerm", root);
    var outMonthly = $("#qOutMonthly", root);
    var sendBtn = $("#qSend", root);

    var term = 36;
    var last = null;

    D.models.forEach(function (m, i) {
      var o = document.createElement("option");
      o.value = String(i);
      o.textContent = m.name + " — " + D.money(m.precio);
      modelSel.appendChild(o);
    });

    [12, 24, 36, 48].forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = t + " m";
      b.setAttribute("aria-pressed", t === term ? "true" : "false");
      b.addEventListener("click", function () {
        term = t;
        $$("button", termWrap).forEach(function (x) {
          x.setAttribute("aria-pressed", "false");
        });
        b.setAttribute("aria-pressed", "true");
        update();
      });
      termWrap.appendChild(b);
    });

    function update() {
      var m = D.models[parseInt(modelSel.value, 10)];
      if (!m) return;

      var pct = parseInt(downRange.value, 10);
      var price = m.precio;
      var down = price * (pct / 100);
      var financed = price - down;

      var r = ANNUAL_RATE / 12;
      var g = Math.pow(1 + r, term);
      var monthly = financed * (r * g) / (g - 1);

      downPct.textContent = pct + "%";
      outPrice.textContent = D.money(price);
      outDown.textContent = D.money(down);
      outFinance.textContent = D.money(financed);
      outTerm.textContent = term + " cuotas";
      outMonthly.textContent = D.money(Math.round(monthly)) + "/mes";

      last = { m: m, pct: pct, term: term, down: down, financed: financed, monthly: Math.round(monthly) };
    }

    modelSel.addEventListener("change", update);
    downRange.addEventListener("input", update);

    sendBtn.addEventListener("click", function () {
      if (!last) return;
      var msg =
        "Hola Automotores Kibun, deseo cotizacion del " + last.m.name + " (" + D.money(last.m.precio) + ").\n" +
        "Inicial: " + D.money(last.down) + " (" + last.pct + "%)\n" +
        "Saldo financiado: " + D.money(last.financed) + "\n" +
        "Plazo: " + last.term + " cuotas\n" +
        "Cuota estimada: " + D.money(last.monthly) + "/mes";
      window.open("https://wa.me/" + TEL + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });

    update();
  }

  /* ============================================ BARRA DE SECCIONES (spy) == */
  function initSecNav() {
    var bar = $(".secnav");
    if (!bar || !("IntersectionObserver" in window)) return;

    var links = $$("a[href^='#']", bar);
    var map = {};
    var targets = [];

    links.forEach(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      if (!el) return;
      map[el.id] = a;
      targets.push(el);
    });
    if (!targets.length) return;

    var seen = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        seen[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0;
      });
      var bestId = null, best = 0;
      Object.keys(seen).forEach(function (id) {
        if (seen[id] > best) { best = seen[id]; bestId = id; }
      });
      if (!bestId) return;
      links.forEach(function (a) { a.classList.remove("is-active"); });
      map[bestId].classList.add("is-active");
    }, { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ================================================================ INIT == */
  function init() {
    initSecNav();
    initStudio();
    initAndina();
    initQuote();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
