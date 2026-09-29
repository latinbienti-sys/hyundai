/* ==========================================================================
   Automotores Kibun · Envío de formularios por WhatsApp
   No requiere servidor: arma el mensaje y abre wa.me con los datos escritos.
   ========================================================================== */

(function () {
  "use strict";

  var TEL = "584147482282"; // +58 414-7482282

  function labelOf(el, form) {
    if (el.dataset.label) return el.dataset.label;
    if (el.id) {
      var lbl = form.querySelector('label[for="' + el.id + '"]');
      if (lbl) return lbl.textContent.replace("*", "").trim();
    }
    var wrap = el.closest(".field");
    var l = wrap && wrap.querySelector("label, .field__label");
    if (l) return l.textContent.replace("*", "").trim();
    return el.name;
  }

  function valueOf(el) {
    if (el.type === "checkbox" || el.type === "radio") return el.checked ? el.value : "";
    return el.value.trim();
  }

  function buildMessage(form) {
    var lines = ["Hola Automotores Kibun, " + (form.dataset.waTitle || "me gustaría recibir más información.")];
    var fields = form.querySelectorAll("input[name], select[name], textarea[name]");

    for (var i = 0; i < fields.length; i++) {
      var el = fields[i];
      if (el.type === "submit" || el.type === "button" || el.type === "hidden") continue;
      var v = valueOf(el);
      if (!v) continue;
      lines.push(labelOf(el, form) + ": " + v);
    }
    return lines.join("\n");
  }

  function send(form) {
    var phone = form.dataset.waPhone || TEL;
    var url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(buildMessage(form));

    var a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    var note = form.querySelector("[data-wa-done]");
    if (note) {
      note.hidden = false;
      note.focus();
    }
  }

  function fillModels() {
    var data = window.KIBU;
    if (!data) return;
    var selects = document.querySelectorAll("select[data-models]");
    for (var i = 0; i < selects.length; i++) {
      var sel = selects[i];
      if (sel.dataset.filled) continue;
      var first = sel.querySelector("option");
      for (var j = 0; j < data.models.length; j++) {
        var m = data.models[j];
        var o = document.createElement("option");
        o.value = m.name;
        o.textContent = m.name;
        sel.appendChild(o);
      }
      if (first && first.value) sel.value = first.value;
      sel.dataset.filled = "1";
    }
  }

  function fillYears() {
    var selects = document.querySelectorAll("select[data-years]");
    var current = new Date().getFullYear();
    for (var i = 0; i < selects.length; i++) {
      var sel = selects[i];
      if (sel.dataset.filled) continue;
      var back = parseInt(sel.dataset.years, 10) || 15;
      for (var y = current; y >= current - back; y--) {
        var o = document.createElement("option");
        o.value = String(y);
        o.textContent = String(y);
        sel.appendChild(o);
      }
      sel.dataset.filled = "1";
    }
  }

  function init() {
    fillModels();
    fillYears();
    var forms = document.querySelectorAll("form[data-wa]");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", function (e) {
        e.preventDefault();
        if (!this.reportValidity()) return;
        send(this);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
