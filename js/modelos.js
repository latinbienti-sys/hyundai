/* ==========================================================================
   Automotores Kibun · Catálogo de modelos
   Reutiliza window.KIBU (misma fuente de datos que el inicio) y añade la
   ficha técnica en modal que tenía la página original.
   ========================================================================== */

(function () {
  "use strict";

  var D = window.KIBU;
  // id propio: kibu.js tambien pinta "#cards" y ambas librerias se cargan aqui
  var grid = document.getElementById("grid");
  if (!D || !grid) return;

  var filters = document.getElementById("filters");
  var countEl = document.getElementById("modelCount");
  var CAT_LABEL = { hatchback: "Hatchback", sedan: "Sedán", suv: "SUV" };

  var modal = document.getElementById("modal");
  var mTitle = document.getElementById("modalTitle");
  var mSub = document.getElementById("modalSub");
  var mImg = document.getElementById("modalImg");
  var mSpecs = document.getElementById("modalSpecs");
  var mWa = document.getElementById("modalWa");
  var mClose = document.getElementById("modalClose");
  var lastFocus = null;

  function specList(m) {
    return (
      '<ul class="card__specs">' +
      '<li><span class="k">Motor</span><span class="v">' + m.motor + "</span></li>" +
      '<li><span class="k">Potencia</span><span class="v">' + D.hp(m.potencia) + " HP</span></li>" +
      '<li><span class="k">Transmisión</span><span class="v">' + m.transmision + "</span></li>" +
      '<li><span class="k">Tracción</span><span class="v">' + m.traccion + "</span></li>" +
      "</ul>"
    );
  }

  function openModal(m) {
    mTitle.textContent = m.name;
    mSub.textContent = m.variant + (m.ano ? " · " + m.ano : "");
    mImg.src = m.image;
    mImg.alt = "Hyundai " + m.name;

    mSpecs.innerHTML = D.specRows
      .map(function (row) {
        var v = m[row.key];
        if (row.key === "precio") v = D.money(m.precio);
        if (row.key === "category") v = CAT_LABEL[v] || v;
        if (row.key === "potencia") v = D.hp(v) + " HP";
        return '<li><span class="k">' + row.label + '</span><span class="v">' + v + "</span></li>";
      })
      .join("");

    mWa.href =
      "https://wa.me/584147482282?text=" +
      encodeURIComponent(
        "Hola Automotores Kibun, me interesa el " + m.name + " " + m.variant + "."
      );

    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    mClose.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  }

  function card(m, i) {
    var el = document.createElement("article");
    el.className = "card reveal";
    el.innerHTML =
      '<div class="card__media">' +
      '<span class="card__tag">' + (CAT_LABEL[m.category] || m.category) + "</span>" +
      '<img src="' + m.image + '" alt="Hyundai ' + m.name + '" loading="lazy" width="700" height="492">' +
      "</div>" +
      '<div class="card__body">' +
      "<h3>" + D.family(m) + "</h3>" +
      '<p class="card__variant">' + m.name + " · " + m.variant + "</p>" +
      specList(m) +
      '<p class="card__price">' + D.money(m.precio) + "</p>" +
      '<div class="card__actions">' +
      '<button class="btn btn--outline btn--sm" type="button" data-ficha="' + i + '">Ficha técnica</button>' +
      '<a class="btn btn--primary btn--sm" href="simulador.html">Simular</a>' +
      "</div>" +
      "</div>";
    return el;
  }

  function paint(cat) {
    var list = D.models.filter(function (m) {
      return cat === "all" || m.category === cat;
    });

    grid.innerHTML = "";
    list.forEach(function (m) {
      grid.appendChild(card(m, D.models.indexOf(m)));
    });

    if (countEl) {
      countEl.textContent =
        list.length + (list.length === 1 ? " modelo" : " modelos");
    }

    if (window.KIBU_UI && window.KIBU_UI.reveal) window.KIBU_UI.reveal();
  }

  if (filters) {
    D.categories.forEach(function (c, i) {
      var b = document.createElement("button");
      b.className = "filter" + (i === 0 ? " is-active" : "");
      b.type = "button";
      b.textContent = c.label;
      b.dataset.cat = c.id;
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(filters.querySelectorAll(".filter"), function (x) {
          x.classList.remove("is-active");
          x.setAttribute("aria-pressed", "false");
        });
        b.classList.add("is-active");
        b.setAttribute("aria-pressed", "true");
        paint(c.id);
      });
      filters.appendChild(b);
    });
  }

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-ficha]");
    if (!btn) return;
    openModal(D.models[parseInt(btn.dataset.ficha, 10)]);
  });

  mClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.classList.contains("modal__backdrop")) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  paint("all");
})();
