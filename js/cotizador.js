/* ============================================================
   KIBÚN · cotizador — GUARDADO, NO CONECTADO
   Decision tomada: el cotizador queda oculto "por ahora" y se
   conserva su codigo para reactivarlo mas adelante.
   Ninguna landing carga este archivo.
   Para reactivarlo: crear cotizador.html con la seccion #cotizador
   del index.html original y anadir <script src="js/cotizador.js"></script>
   ============================================================ */

// --- Calculator Features ---
    // --- Calculator Features ---
    let calcTerm = 36;
    function setCalcTerm(term) {
      calcTerm = term;
      document.querySelectorAll('.calc-term-btn').forEach(b => {
        b.className = 'calc-term-btn py-2 text-xs font-bold rounded-xl bg-slate-950 text-slate-400 border border-slate-800';
      });
      event.target.className = 'calc-term-btn py-2 text-xs font-bold rounded-xl bg-[#002c5f] text-white border border-[#c89d7c]/60';
      calculateQuote();
    }

    function calculateQuote() {
      const select = document.getElementById('calcModelSelect');
      const price = Number(select.value);
      const percent = Number(document.getElementById('calcDownPaymentSlider').value);
      const initial = Math.round(price * (percent / 100));
      const loan = price - initial;
      const monthlyRate = 0.095 / 12;
      const monthly = Math.round((loan * monthlyRate * Math.pow(1 + monthlyRate, calcTerm)) / (Math.pow(1 + monthlyRate, calcTerm) - 1));

      document.getElementById('calcPercentLabel').innerText = percent;
      document.getElementById('calcDownPaymentLabel').innerText = '$' + initial.toLocaleString() + ' USD';
      document.getElementById('calcMonthlyPayment').innerText = '$' + monthly.toLocaleString();
      document.getElementById('calcSummaryPrice').innerText = '$' + price.toLocaleString() + ' USD';
      document.getElementById('calcSummaryInitial').innerText = '$' + initial.toLocaleString() + ' USD';
      document.getElementById('calcSummaryTerm').innerText = calcTerm + ' cuotas';
    }

    function sendQuoteWhatsApp() {
      const select = document.getElementById('calcModelSelect');
      const name = select.options[select.selectedIndex].getAttribute('data-name');
      const price = select.value;
      const percent = document.getElementById('calcPercentLabel').innerText;
      const initial = document.getElementById('calcDownPaymentLabel').innerText;
      const monthly = document.getElementById('calcMonthlyPayment').innerText;
      const msg = `Hola Automotores Kibun Mérida! 👋 Deseo cotización oficial para el *${name}* (Precio: $${Number(price).toLocaleString()} USD). Propongo una inicial de ${initial} (${percent}%) y el saldo en ${calcTerm} cuotas de aprox ${monthly}/mes. Agradezco su atención.`;
      window.open(`https://wa.me/584147482282?text=${encodeURIComponent(msg)}`, '_blank');
    }

/*
function goToQuote(name, price) {
  const select = document.getElementById('calcModelSelect');
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].getAttribute('data-name') === name) {
      select.selectedIndex = i;
      break;
    }
  }
  document.getElementById('cotizador').scrollIntoView({ behavior: 'smooth' });
  calculateQuote();
}
*/
