/* ==========================================================================
   KIBU · Reproductor de Reels
   Mini player con forma de celular que se abre al hacer clic en "Reels" de la
   barra de secciones. Los videos vienen de videos/manifest.json y el nombre y
   el precio salen de KIBU (js/data.js), asi que no se repite ningun dato.

   Todo el CSS se inyecta la primera vez que se abre, y todas las clases llevan
   el prefijo "rl-", de modo que el resto de la pagina no se ve afectado.
   ========================================================================== */

(function () {
  "use strict";

  var D = window.KIBU;
  var open = document.getElementById('reels-open');
  if (!D || !open) return;

  var WA = '584147482282';
  var reels = null;
  var box = null;
  var current = 0;
  var cssInyectado = false;

  function findModel(name) {
    for (var i = 0; i < D.models.length; i++) {
      if (D.models[i].name === name) return D.models[i];
    }
    return null;
  }

  /* ------------------------------------------------------------ CSS ------- */
  function injectCss() {
    if (cssInyectado) return;
    cssInyectado = true;

    var css =
'.rl-back{position:fixed;inset:0;z-index:9000;background:rgba(10,12,16,.82);backdrop-filter:blur(6px);' +
'display:flex;align-items:center;justify-content:center;padding:1.25rem;opacity:0;transition:opacity .25s ease}' +
'.rl-back.is-on{opacity:1}' +
'.rl-phone{position:relative;width:min(21rem,86vw);background:#0c0d10;border-radius:2.4rem;padding:.5rem;' +
'box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.12);' +
'transform:translateY(14px) scale(.97);transition:transform .3s cubic-bezier(.2,.8,.2,1);' +
'max-height:92vh;display:flex;flex-direction:column}' +
'.rl-back.is-on .rl-phone{transform:none}' +
'.rl-notch{position:absolute;top:.5rem;left:50%;transform:translateX(-50%);width:5.5rem;height:1.1rem;' +
'background:#0c0d10;border-radius:0 0 .8rem .8rem;z-index:3}' +
'.rl-screen{position:relative;background:#000;border-radius:2rem;overflow:hidden;aspect-ratio:9/16;' +
'max-height:calc(92vh - 5.5rem)}' +
'.rl-screen video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;background:#000}' +
'.rl-fade{position:absolute;left:0;right:0;bottom:0;padding:2.5rem 1rem .9rem;pointer-events:none;' +
'background:linear-gradient(to top,rgba(0,0,0,.82),rgba(0,0,0,0))}' +
'.rl-fade h3{margin:0;color:#fff;font-size:1.0625rem;line-height:1.3}' +
'.rl-fade p{margin:.2rem 0 0;color:rgba(255,255,255,.78);font-size:.8125rem}' +
'.rl-price{display:inline-block;margin-top:.5rem;padding:.2rem .55rem;border-radius:100px;' +
'background:var(--lime,#d7e800);color:#1f1d1e;font-size:.8125rem;font-weight:700}' +
'.rl-tag{position:absolute;top:1.5rem;left:.85rem;z-index:2;padding:.25rem .6rem;border-radius:100px;' +
'background:rgba(14,43,92,.88);color:#fff;font-size:.6875rem;font-weight:600;letter-spacing:.08em;' +
'text-transform:uppercase;pointer-events:none}' +
'.rl-nav{position:absolute;top:0;bottom:0;width:34%;z-index:4;border:0;background:transparent;cursor:pointer}' +
'.rl-nav--prev{left:0}.rl-nav--next{right:0;width:66%}' +
'.rl-bar{display:flex;align-items:center;gap:.75rem;padding:.85rem .25rem .15rem}' +
'.rl-dots{display:flex;gap:.35rem;flex:1}' +
'.rl-dots i{width:.45rem;height:.45rem;border-radius:100px;background:rgba(14,43,92,.25);transition:background .2s}' +
'.rl-dots i.is-on{background:var(--brand-500,#0e2b5c)}' +
'.rl-x{position:absolute;top:-2.6rem;right:0;width:2.1rem;height:2.1rem;border-radius:100px;border:0;' +
'background:rgba(255,255,255,.14);color:#fff;font-size:1.1rem;line-height:1;cursor:pointer}' +
'.rl-x:hover{background:rgba(255,255,255,.26)}' +
'.rl-wa{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:.55rem .8rem;' +
'border-radius:100px;background:var(--brand-500,#0e2b5c);color:#fff;text-decoration:none;font-size:.8125rem;font-weight:600}' +
'.rl-hint{position:absolute;bottom:-1.9rem;left:0;right:0;text-align:center;color:rgba(255,255,255,.6);font-size:.75rem}' +
'@media (max-width:520px){.rl-back{padding:.5rem}.rl-x{top:-2.4rem}}';

    var s = document.createElement('style');
    s.id = 'rl-style';
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ------------------------------------------------------- estructura ---- */
  function build() {
    if (box) return box;

    var back = document.createElement('div');
    back.className = 'rl-back';
    back.setAttribute('role', 'dialog');
    back.setAttribute('aria-modal', 'true');
    back.setAttribute('aria-label', 'Videos de los vehiculos');
    back.innerHTML =
      '<div class="rl-phone">' +
        '<button class="rl-x" type="button" aria-label="Cerrar">&times;</button>' +
        '<div class="rl-notch"></div>' +
        '<div class="rl-screen">' +
          '<video playsinline preload="metadata"></video>' +
          '<span class="rl-tag"></span>' +
          '<div class="rl-fade"><h3></h3><p></p><span class="rl-price"></span></div>' +
          '<button class="rl-nav rl-nav--prev" type="button" aria-label="Video anterior"></button>' +
          '<button class="rl-nav rl-nav--next" type="button" aria-label="Siguiente video"></button>' +
        '</div>' +
        '<div class="rl-bar">' +
          '<div class="rl-dots"></div>' +
          '<a class="rl-wa" target="_blank" rel="noopener">WhatsApp</a>' +
        '</div>' +
        '<p class="rl-hint">Toca la mitad derecha para el siguiente</p>' +
      '</div>';

    document.body.appendChild(back);
    box = back;

    back.querySelector('.rl-x').addEventListener('click', close);
    back.addEventListener('click', function (e) { if (e.target === back) close(); });
    back.querySelector('.rl-nav--next').addEventListener('click', function (e) { e.stopPropagation(); move(1); });
    back.querySelector('.rl-nav--prev').addEventListener('click', function (e) { e.stopPropagation(); move(-1); });

    document.addEventListener('keydown', function (e) {
      if (!box || !box.classList.contains('is-on')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    });

    return back;
  }

  /* ----------------------------------------------------------- pintado --- */
  function paint() {
    var r = reels[current];
    var m = findModel(r.modelo);
    var v = box.querySelector('video');

    v.pause();
    v.poster = m ? m.image : '';
    v.innerHTML = '<source src="' + r.archivo + '" type="video/mp4">';
    v.load();

    box.querySelector('.rl-tag').textContent = m ? (D.family(m)) : '0KM';
    box.querySelector('.rl-fade h3').textContent = m ? m.name : (r.modelo || '');
    box.querySelector('.rl-fade p').textContent = m ? (r.bajada || m.variant) : '';
    box.querySelector('.rl-price').textContent = m ? D.money(m.precio) : '';

    var wa = box.querySelector('.rl-wa');
    wa.href = 'https://wa.me/' + WA + '?text=' +
      encodeURIComponent('Hola Kibu Merida, quiero cotizar el ' + (m ? m.name : r.modelo) + ' que vi en el reel.');

    var dots = box.querySelector('.rl-dots');
    dots.innerHTML = reels.map(function (_, i) {
      return '<i class="' + (i === current ? 'is-on' : '') + '"></i>';
    }).join('');

    var multi = reels.length > 1;
    box.querySelector('.rl-nav--prev').style.display = multi ? '' : 'none';
    box.querySelector('.rl-nav--next').style.display = multi ? '' : 'none';
    box.querySelector('.rl-hint').style.display = multi ? '' : 'none';

    var prom = v.play();
    if (prom && prom.catch) prom.catch(function () { /* el navegador exige un gesto: los controles quedan disponibles */ });
  }

  function move(step) {
    current = (current + step + reels.length) % reels.length;
    paint();
  }

  /* ----------------------------------------------------------- abrir ----- */
  function show() {
    injectCss();
    if (!reels) return;
    build();
    current = 0;
    paint();
    box.classList.add('is-on');
    document.body.style.overflow = 'hidden';
    box.querySelector('.rl-x').focus();
  }

  function close() {
    if (!box) return;
    var v = box.querySelector('video');
    v.pause();
    box.classList.remove('is-on');
    document.body.style.overflow = '';
    open.focus();
  }

  open.addEventListener('click', function (e) {
    e.preventDefault();
    if (reels) { show(); return; }
    fetch('videos/manifest.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (data) {
        reels = (data && data.reels) || [];
        if (!reels.length) { alert('Proximamente nuevos videos.'); return; }
        show();
      })
      .catch(function () { alert('No pudimos cargar los videos. Intenta de nuevo.'); });
  });
})();
