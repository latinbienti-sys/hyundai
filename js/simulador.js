/* ==========================================================================
   KIBU · Simulador de crédito
   La formula de amortizacion y la tasa (12% anual) son las originales del
   repositorio: no se modifican los calculos, solo se re-presenta el resultado.
   ========================================================================== */

(function () {
  "use strict";

  var D = window.KIBU;
  if (!D) return;

  var simModel = document.getElementById('simModel');
  if (!simModel) return;

  var simDown = document.getElementById('simDown');
  var simTerm = document.getElementById('simTerm');
  var downLabel = document.getElementById('downLabel');
  var termLabel = document.getElementById('termLabel');

  var resPrice = document.getElementById('resPrice');
  var resDownPct = document.getElementById('resDownPct');
  var resDown = document.getElementById('resDown');
  var resFinance = document.getElementById('resFinance');
  var resTerm = document.getElementById('resTerm');
  var resMonthly = document.getElementById('resMonthly');
  var simPrice = document.getElementById('simPrice');

  /* Tasa fija anual, igual que en el simulador original */
  var ANNUAL_RATE = 0.12;

  function update() {
    var model = D.models[parseInt(simModel.value, 10)];
    if (!model) return;

    var price = model.precio;
    var downPct = parseInt(simDown.value, 10);
    var termMonths = parseInt(simTerm.value, 10);

    var downAmount = price * (downPct / 100);
    var financeAmount = price - downAmount;

    var monthlyRate = ANNUAL_RATE / 12;
    var growth = Math.pow(1 + monthlyRate, termMonths);
    var monthlyPayment = financeAmount * (monthlyRate * growth) / (growth - 1);

    if (simPrice) simPrice.textContent = D.money(price);
    downLabel.textContent = downPct + '%';
    termLabel.textContent = termMonths + ' meses';

    resPrice.textContent = D.money(price);
    resDownPct.textContent = downPct;
    resDown.textContent = D.money(downAmount);
    resFinance.textContent = D.money(financeAmount);
    resTerm.textContent = termMonths + ' meses';
    resMonthly.textContent = '$' + Math.round(monthlyPayment).toLocaleString('es-VE') + '/mes';
  }

  D.models.forEach(function (m, i) {
    var opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = m.name + ' — ' + D.money(m.precio);
    simModel.appendChild(opt);
  });

  simModel.addEventListener('change', update);
  simDown.addEventListener('input', update);
  simTerm.addEventListener('input', update);

  update();
})();
