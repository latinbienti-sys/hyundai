/* ============================================================
   KIBÚN · JavaScript compartido
   Extraído del <script> inline de index.html.
   ============================================================ */



    // --- helpers tolerantes: cada landing llama solo a lo que tiene ---
    const $ = (id) => document.getElementById(id);
    const on = (id, ev, fn) => { const el = $(id); if (el) el.addEventListener(ev, fn); };
    const txt = (id, v) => { const el = $(id); if (el) el.innerText = v; };
    const hide = (id, yes) => { const el = $(id); if (el) el.classList.toggle('hidden', yes); };

    // Marca el filtro de categoria activo
    function markActiveCategory(cat) {
      document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        const on_ = btn.dataset.cat === cat;
        btn.className = 'cat-filter-btn px-4 py-2 text-xs font-bold rounded-lg border ' +
          (on_ ? 'bg-[#002c5f] text-white border-[#c89d7c]/50'
               : 'text-slate-400 hover:text-white border-transparent');
      });
    }

    // --- Modelos Data ---
    const MODELS = [
      { id: 'tucson', name: 'Hyundai Tucson GLX 4WD', cat: 'suv', catLabel: 'SUV All-Terrain', price: 44900, motor: '2.0L MPI Smartstream (154 HP)', image: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/69651ebc37abd4c7b56c5c58_Tucson-premium-Azul%20.png', colors: [{l:'Azul Océano', img:'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/69651ebc37abd4c7b56c5c58_Tucson-premium-Azul%20.png', c:'#1E3A8A'},{l:'Blanco Atlas', img:'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/69823c97ec17a7e03309284f_Tucson-blanco.png', c:'#F8FAFC'}] },
      { id: 'creta', name: 'Hyundai Creta GLS', cat: 'suv', catLabel: 'SUV Compacta', price: 33500, motor: '1.5L Gamma II (113 HP)', image: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/699dc30fedebb4b0d6d72a19_Creta%20Blanco_.png', colors: [{l:'Blanco Polar', img:'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/699dc30fedebb4b0d6d72a19_Creta%20Blanco_.png', c:'#FFFFFF'}] },
      { id: 'palisade', name: 'Hyundai Palisade V6 4WD', cat: 'suv', catLabel: 'SUV 7 Pasajeros', price: 78900, motor: '3.8L V6 Atkinson (291 HP)', image: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/695f0af617714685f4d6adc9_Palisade-rojo.png', colors: [{l:'Rojo Borgogna', img:'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/695f0af617714685f4d6adc9_Palisade-rojo.png', c:'#8B1E2B'}] },
      { id: 'staria', name: 'Hyundai Staria Wagon 11P', cat: 'van', catLabel: 'Van / Pasajeros', price: 54900, motor: '3.5L V6 MPI (272 HP)', image: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/696538854f30d525b5e71656_Staria-WAGON.png', colors: [{l:'Negro Abismo', img:'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/696538854f30d525b5e71656_Staria-WAGON.png', c:'#111827'}] },
      { id: 'elantra', name: 'Hyundai Elantra GLS IVT', cat: 'sedan', catLabel: 'Sedán Premium', price: 36800, motor: '2.0L Smartstream (156 HP)', image: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/698561c627e39b93b4031662_Elantra-rojo.png', colors: [{l:'Rojo Fiery', img:'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/698561c627e39b93b4031662_Elantra-rojo.png', c:'#B91C1C'}] },
      { id: 'accent', name: 'Hyundai Accent GLS IVT', cat: 'sedan', catLabel: 'Sedán Compacto', price: 28900, motor: '1.5L MPI (113 HP)', image: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/69d444234c01074f6c41678a_Accent-blanco.png', colors: [{l:'Blanco Atlas', img:'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/69d444234c01074f6c41678a_Accent-blanco.png', c:'#F8FAFC'}] },
      { id: 'i10sedan', name: 'Hyundai Grand i10 Sedán', cat: 'sedan', catLabel: 'Sedán Subcompacto', price: 23500, motor: '1.2L Kappa MPI (82 HP)', image: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/695d6ee0057d4f637c28595b_Grandi10%20sedan%20fondo%20transparente.png', colors: [{l:'Blanco Puro', img:'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/695d6ee0057d4f637c28595b_Grandi10%20sedan%20fondo%20transparente.png', c:'#FFFFFF'}] },
      { id: 'i10hatch', name: 'Hyundai Grand i10 Hatchback', cat: 'hatchback', catLabel: 'Hatchback Urbano', price: 21900, motor: '1.2L Kappa MPI (82 HP)', image: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/696544b630bc623e59fcb862_Grandi10-Hatchback-GLS-rojo.png', colors: [{l:'Rojo Pasión', img:'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/696544b630bc623e59fcb862_Grandi10-Hatchback-GLS-rojo.png', c:'#DC2626'},{l:'Plata', img:'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/69823fe186892428b7a8fab3_Grandi10-Hatchback-GL-Plata.png', c:'#CBD5E1'},{l:'Azul', img:'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/69856148203811e31988110b_Grandi10-Hatchback-GL-Azul.png', c:'#2563EB'}] }
    ];


    /* --- Datos técnicos por vehículo: los usa el comparador y la Ruta Andina --- */
    const VEHICLE_DATA = {
      'tucson': { transmision: 'IVT 8 vel', eje: '4x4', delante: 40, detras: 60, smartsense: true, radar: 'Cámara frontal de alta definición + Radar milimétrico', aviso: 'Alerta sonora en habitáculo y vibración háptica en volante', adas: ['FCA · Frenado Autónomo de Emergencia', 'LKA · Asistente de Mantenimiento de Carril', 'BCA · Monitoreo de Punto Ciego'] },
      'creta': { transmision: 'IVT / DCT', eje: 'FWD', delante: 100, detras: 0, smartsense: true, radar: 'Cámara frontal de alta definición + Radar milimétrico', aviso: 'Alerta sonora en habitáculo y vibración háptica en volante', adas: ['FCA · Frenado Autónomo de Emergencia', 'LKA · Asistente de Mantenimiento de Carril', 'BCA · Monitoreo de Punto Ciego'] },
      'palisade': { transmision: 'Auto 8 vel', eje: '4x4', delante: 40, detras: 60, smartsense: true, radar: 'Cámara frontal de alta definición + Radar milimétrico', aviso: 'Alerta sonora en habitáculo y vibración háptica en volante', adas: ['FCA · Frenado Autónomo de Emergencia', 'LKA · Asistente de Mantenimiento de Carril', 'BCA · Monitoreo de Punto Ciego'] },
      'staria': { transmision: 'Auto 8 vel', eje: 'FWD', delante: 100, detras: 0, smartsense: true, radar: 'Cámara frontal de alta definición + Radar frontal', aviso: 'Alerta sonora en habitáculo y aviso visual', adas: ['FCA · Frenado Autónomo de Emergencia', 'LKA · Asistente de Mantenimiento de Carril'] },
      'elantra': { transmision: 'IVT', eje: 'FWD', delante: 100, detras: 0, smartsense: false, radar: 'Cámara frontal + sensores de asistente', aviso: 'Alerta sonora en habitáculo', adas: ['FCA · Frenado Autónomo de Emergencia', 'LDW · Aviso de Salida de Carril'] },
      'accent': { transmision: 'IVT', eje: 'FWD', delante: 100, detras: 0, smartsense: false, radar: 'Sensores de asistente de carril', aviso: 'Alerta sonora en habitáculo', adas: ['FCA · Frenado Autónomo de Emergencia'] },
      'i10sedan': { transmision: 'M/T 5 vel', eje: 'FWD', delante: 100, detras: 0, smartsense: false, radar: '—', aviso: '—', adas: ['FCW · Aviso de colisión frontal'] },
      'i10hatch': { transmision: 'M/T 5 vel', eje: 'FWD', delante: 100, detras: 0, smartsense: false, radar: '—', aviso: '—', adas: ['FCW · Aviso de colisión frontal'] }
    };

    function getVehicle(id) {
      const m = MODELS.find(x => x.id === id);
      const d = VEHICLE_DATA[id] || {};
      return Object.assign({}, m || {}, d, { id: id });
    }


    // --- Render Models Grid ---
    function renderModels(category) {
      const container = document.getElementById('modelsGridContainer');
      const filtered = category === 'all' ? MODELS : MODELS.filter(m => m.cat === category);
      container.innerHTML = filtered.map(m => `
        <div class="rounded-3xl bg-[#0b111a] border border-slate-800 hover:border-[#c89d7c]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl">
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#c89d7c] font-heading">${m.catLabel}</span>
              <span class="precio hidden">$${m.price.toLocaleString()} USD</span>
            </div>
            <h3 class="text-xl font-bold text-white font-heading">${m.name}</h3>
            <p class="text-xs text-slate-400 mt-1">${m.motor}</p>
          </div>
          <div class="my-6 py-4 flex items-center justify-center min-h-[160px]">
            <img src="${m.image}" alt="${m.name}" class="w-full max-h-[150px] object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-300">
          </div>
          <div class="flex items-center gap-2 pt-2 border-t border-slate-800">
            <button onclick="toggleCompare('${m.id}')" data-compare="${m.id}"
              class="compare-btn mb-2 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold tracking-wide transition-colors">
              + Comparar
            </button>
            <a href="contacto.html" class="block w-full py-2.5 rounded-xl bg-[#002c5f] hover:bg-[#345fa8] text-white text-xs font-bold tracking-wide text-center transition-colors">Consultar por WhatsApp</a>
          </div>
        </div>
      `).join('');
    }

    function filterCategory(cat) {
      markActiveCategory(cat);
      renderModels(cat);
    }


    // --- Hero Slides ---
    const HERO_SLIDES = [
      { bg: 'https://latinbienti-sys.github.io/hyundai/img/watermarked_img_5871150173315358561.jpg', car: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/69651ebc37abd4c7b56c5c58_Tucson-premium-Azul%20.png', eyebrow: 'Tucson · Páramo Merideño', title: 'Aventura sin límites, <span class="text-[#c89d7c] italic">diseñada para los Andes.</span>', sub: 'El nuevo Hyundai Tucson combina tecnología SmartSense™, tracción HTRAC™ 4WD y lenguaje Parametric Dynamics listo para subir a más de 3,500 metros.' },
      { bg: 'https://latinbienti-sys.github.io/hyundai/img/watermarked_img_13367943299367624531.jpg', car: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/699dc30fedebb4b0d6d72a19_Creta%20Blanco_.png', eyebrow: 'Creta · Pico Bolívar', title: 'Con CRETA <span class="text-[#c89d7c] italic">concreta</span> tus sueños.', sub: 'SUV compacta con techo panorámico, pantalla de 10.25" y consumo eficiente. Diseñada para conquistar la geografía andina con estilo.' },
      { bg: 'https://latinbienti-sys.github.io/hyundai/img/watermarked_img_17804480962303296709.jpg', car: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/698561c627e39b93b4031662_Elantra-rojo.png', eyebrow: 'Elantra · Laguna de Mucubají', title: 'Elegancia que <span class="text-[#c89d7c] italic">se siente</span> en cada kilómetro.', sub: 'Silueta aerodinámica Parametric Jewel, clúster digital de 10.25 pulgadas y transmisión IVT. Confort premium para recorrer Venezuela.' },
      { bg: 'https://latinbienti-sys.github.io/hyundai/img/watermarked_img_10948222792170652927.jpg', car: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/695f0af617714685f4d6adc9_Palisade-rojo.png', eyebrow: 'Palisade · Sierra Nevada de Mérida', title: 'Manejá tu próximo <span class="text-[#c89d7c] italic">Hyundai</span> en los Andes.', sub: 'El buque insignia de 3 filas y 7 pasajeros. Motor 3.8L V6 GDI con 291 HP, tracción integral 4WD y seguridad Hyundai SmartSense™.' }
    ];

    function setSlide(idx) {
      const s = HERO_SLIDES[idx];
      if (!s || !document.getElementById('heroBg')) return;
      document.getElementById('heroBg').style.backgroundImage = `url('${s.bg}')`;
      document.getElementById('heroCar').src = s.car;
      txt('heroEyebrow', s.eyebrow);
      document.getElementById('heroTitle').innerHTML = s.title;
      txt('heroSub', s.sub);
      document.querySelectorAll('.hero-dot').forEach((d, i) => {
        d.className = i === idx ? 'hero-dot px-3.5 py-1.5 text-xs rounded-lg bg-[#002c5f] text-white border border-[#c89d7c]/60 font-bold' : 'hero-dot px-3.5 py-1.5 text-xs rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800';
      });
    }

    // Parallax mouse move in hero (solo en la portada)
    const hero = document.getElementById('inicio');
    const heroBg = document.getElementById('heroBg');
    const heroCar = document.getElementById('heroCar');
    if (hero) hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      if (heroBg) heroBg.style.transform = 'scale(1.06) translate3d(' + (-x * 0.4) + 'px, ' + (-y * 0.4) + 'px, 0)';
      if (heroCar) heroCar.style.transform = 'translate3d(' + (x * 0.8) + 'px, ' + (y * 0.6) + 'px, 0) rotateY(' + (x * 0.5) + 'deg)';
    });

    // --- Estudio: selector de los 8 modelos ---
    function buildStudioModelPicker() {
      const box = document.getElementById('studioModelPicker');
      if (!box) return;
      box.innerHTML = MODELS.map(m => `
        <button onclick="switchStudioModel('${m.id}')" data-model="${m.id}"
          class="studio-model-btn px-3 py-2 rounded-lg text-xs font-bold border transition-colors">
          ${m.name.replace('Hyundai ', '')}
        </button>
      `).join('');
      markStudioModel(currentStudioModel.id);
    }

    function markStudioModel(id) {
      document.querySelectorAll('.studio-model-btn').forEach(b => {
        const on_ = b.dataset.model === id;
        b.className = 'studio-model-btn px-3 py-2 rounded-lg text-xs font-bold border transition-colors ' +
          (on_ ? 'bg-[#002c5f] text-white border-[#c89d7c]/60'
               : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800');
      });
    }

    // --- Studio 360 Features ---
    let currentStudioModel = MODELS[0];
    let studioHeadlights = true;

    function renderStudioColors() {
      const container = document.getElementById('studioColorDots');
      if (!container) return;
      container.innerHTML = currentStudioModel.colors.map((c, i) => `
        <button onclick="setStudioColor(${i})" class="w-6 h-6 rounded-full border border-slate-600 transition-transform hover:scale-110" style="background-color:${c.c}" title="${c.l}"></button>
      `).join('');
      setStudioColor(0);
    }

    function setStudioColor(idx) {
      const c = currentStudioModel.colors[idx];
      if (!c) return;
      const img = document.getElementById('studioCarImg');
      const refl = document.getElementById('studioCarReflection');
      if (img) img.src = c.img;
      if (refl) refl.src = c.img;
      txt('studioColorLabel', c.l);
    }

    function switchStudioModel(id) {
      currentStudioModel = MODELS.find(m => m.id === id) || MODELS[0];
      txt('studioName', currentStudioModel.name);
      txt('studioCat', currentStudioModel.catLabel);
      renderStudioColors();
      markStudioModel(currentStudioModel.id);
    }

    function toggleHeadlights() {
      studioHeadlights = !studioHeadlights;
      const glow = document.getElementById('headlightGlow');
      const btn = document.getElementById('headlightToggleBtn');
      if (!glow || !btn) return;
      if (studioHeadlights) {
        glow.classList.remove('hidden');
        btn.innerText = 'Faros LED: ON';
        btn.className = 'px-4 py-2 rounded-xl text-xs font-bold border border-amber-400/50 bg-amber-400/15 text-amber-200';
      } else {
        glow.classList.add('hidden');
        btn.innerText = 'Faros LED: OFF';
        btn.className = 'px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 bg-slate-800 text-slate-400';
      }
    }

    // --- Simulator Features ---
    let simMode = 'COMFORT';
    let isAccelerating = false;
    let simSpeed = 75;
    let simRpm = 2300;
    let simAlt = 2450;

    const SIM_CONFIGS = {
      ECO: { speed: 50, rpm: 1800, dur: '1.2s' },
      COMFORT: { speed: 75, rpm: 2300, dur: '0.8s' },
      SPORT: { speed: 110, rpm: 4200, dur: '0.35s' },
      HTRAC: { speed: 65, rpm: 2800, dur: '0.6s' }
    };

    // Cada modo reparte el torque de forma distinta. En un 4x4 el reparto
    // cambia de verdad; en un FWD el eje trasero sigue en cero.
    const MODE_SPLIT = {
      ECO: { delante: 60, detras: 40, nota: 'consumo eficiente' },
      COMFORT: { delante: 50, detras: 50, nota: 'reparto equilibrado' },
      SPORT: { delante: 35, detras: 65, nota: 'bias trasero' },
      HTRAC: { delante: 25, detras: 75, nota: '4WD bajo demanda' }
    };

    function applyDriveSplit() {
      const v = getVehicle(currentRutaModel);
      const m = MODE_SPLIT[simMode] || MODE_SPLIT.COMFORT;
      if (v.detras === 0) txt('simTraction', '100% Delantero | 0% Trasero');
      else txt('simTraction', m.delante + '% Delantero | ' + m.detras + '% Trasero');
      txt('simModeTag', (simMode === 'HTRAC' ? 'HTRAC 4WD' : simMode) + ' · ' + m.nota);
    }

    // Aviso visible al cambiar de modo: asi se nota la diferencia de ritmo
    let modeFlashTimer = null;
    function flashMode() {
      const f = document.getElementById('modeFlash');
      if (!f) return;
      const cfg = SIM_CONFIGS[simMode];
      const delta = cfg.speed - SIM_CONFIGS.COMFORT.speed;
      f.innerHTML = `<span class="text-white font-heading font-extrabold">${simMode === 'HTRAC' ? 'HTRAC 4WD' : simMode}</span>`
        + `<span class="block text-[11px] font-mono text-[#c89d7c] mt-1">${cfg.speed} km/h · ${cfg.rpm.toLocaleString()} rpm`
        + (delta ? ` · ${delta > 0 ? '+' : ''}${delta} km/h` : '') + '</span>';
      f.classList.remove('mode-flash-off');
      clearTimeout(modeFlashTimer);
      modeFlashTimer = setTimeout(() => f.classList.add('mode-flash-off'), 2200);
    }

    function setDriveMode(mode) {
      if (!SIM_CONFIGS[mode]) return;
      simMode = mode;
      document.querySelectorAll('.mode-btn').forEach(b => {
        b.className = 'mode-btn px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white';
      });
      const active = document.getElementById('modeBtn' + mode);
      const road = document.getElementById('simRoadLine');
      if (active) active.className = 'mode-btn px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#002c5f] text-white border border-[#c89d7c]/60';
      if (road) road.style.animationDuration = SIM_CONFIGS[mode].dur;
      applyDriveSplit();
      flashMode();
    }

    const throttleBtn = document.getElementById('throttleBtn');
    if (throttleBtn) {
      ['mousedown', 'touchstart'].forEach(e => throttleBtn.addEventListener(e, () => { isAccelerating = true; throttleBtn.innerText = '¡Acelerando en pendiente!'; }));
      ['mouseup', 'mouseleave', 'touchend'].forEach(e => throttleBtn.addEventListener(e, () => { isAccelerating = false; throttleBtn.innerText = 'Mantener Acelerador'; }));
    }

    // el simulador solo late en la landing de ruta andina
    if (document.getElementById('simSpeedNum')) setInterval(() => {
      const cfg = SIM_CONFIGS[simMode];
      const targetSpeed = isAccelerating ? cfg.speed + 30 : cfg.speed;
      const targetRpm = isAccelerating ? cfg.rpm + 1800 : cfg.rpm;
      simSpeed += (targetSpeed - simSpeed) * 0.1;
      simRpm += (targetRpm - simRpm) * 0.15;
      simAlt = simAlt > 4118 ? 1630 : simAlt + (isAccelerating ? 2.5 : 0.8);

      document.getElementById('simSpeedNum').innerText = Math.round(simSpeed);
      document.getElementById('simRpmNum').innerText = Math.round(simRpm).toLocaleString();
      document.getElementById('simAltNum').innerText = Math.round(simAlt).toLocaleString();

      if (simAlt < 2000) document.getElementById('simLandmark').innerText = 'Mérida Centro (1,630 msnm)';
      else if (simAlt < 3000) document.getElementById('simLandmark').innerText = 'Tabay y El Valle (2,100 msnm)';
      else if (simAlt < 3700) document.getElementById('simLandmark').innerText = 'Laguna de Mucubají (3,550 msnm)';
      else document.getElementById('simLandmark').innerText = 'Pico El Águila (4,118 msnm)';
    }, 100);

    function sendAppointmentWhatsApp() {
      const serv = document.getElementById('apptService');
      const model = document.getElementById('apptModel');
      const day = document.getElementById('apptDay');
      if (!serv || !model || !day) return;
      const msg = `Hola Automotores Kibun Mérida! 🔧 Deseo agendar cita en su taller oficial:\n- Servicio: ${serv.value}\n- Vehículo: ${model.value}\n- Día preferido: ${day.value}\nPor favor confirmar disponibilidad.`;
      window.open(`https://wa.me/584147482282?text=${encodeURIComponent(msg)}`, '_blank');
    }

    // --- Video Reels Logic ---
    const REELS = [
      {
        badge: 'Reel Oficial 01',
        title: 'Grand i10 GL M/T · Edición Dinámica',
        desc: 'Ágil en el tráfico merideño y económico en consumo. Transmisión manual de 5 velocidades para máximo control en ascensos.',
        video: 'videos/grand-i10.mp4',
        poster: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/696544b630bc623e59fcb862_Grandi10-Hatchback-GLS-rojo.png',
        trans: 'Sincrónica 5 vel',
        consumo: '5.0 L/100km',
        cards: [
          { title: 'Grand i10 GL', sub: 'Edición M/T · Blanco Polar', price: '$21,900 USD', img: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/695d6ee0057d4f637c28595b_Grandi10%20sedan%20fondo%20transparente.png' },
          { title: 'Grand i10 GL', sub: 'Transmisión M/T | A/T · Rojo Pasión', price: '$21,900 USD', img: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/696544b630bc623e59fcb862_Grandi10-Hatchback-GLS-rojo.png' },
          { title: 'Grand i10 GLS', sub: 'Full Equipo · Azul Celeste', price: '$23,500 USD', img: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/69856148203811e31988110b_Grandi10-Hatchback-GL-Azul.png' }
        ]
      },
      {
        badge: 'Reel Oficial 02',
        title: 'Grand i10 GLS A/T · Sedán & Hatchback',
        desc: 'La combinación perfecta entre maletero espacioso de 402 litros, transmisión automática confortable y faros LED de iluminación nítida.',
        video: 'videos/creta.mp4',
        poster: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/695d6ee0057d4f637c28595b_Grandi10%20sedan%20fondo%20transparente.png',
        trans: 'Automática 4 vel',
        consumo: '5.2 L/100km',
        cards: [
          { title: 'Grand i10 GLS', sub: 'Sedán Familiar · Blanco Atlas', price: '$23,500 USD', img: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/695d6ee0057d4f637c28595b_Grandi10%20sedan%20fondo%20transparente.png' },
          { title: 'Grand i10 GLS', sub: 'Hatchback Deportivo · Plata Estelar', price: '$23,500 USD', img: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/69823fe186892428b7a8fab3_Grandi10-Hatchback-GL-Plata.png' },
          { title: 'Grand i10 GL', sub: 'Rojo Carmesí Metalizado', price: '$21,900 USD', img: 'https://cdn.prod.website-files.com/695d3a709b2e0524dd305631/696544b630bc623e59fcb862_Grandi10-Hatchback-GLS-rojo.png' }
        ]
      }
    ];

    let currentReelIdx = 0;
    let currentCardIdx = 0;

    function switchReel(idx) {
      currentReelIdx = idx;
      currentCardIdx = 0;
      const r = REELS[idx];
      document.getElementById('reelDetailBadge').innerText = r.badge;
      document.getElementById('reelDetailTitle').innerText = r.title;
      document.getElementById('reelDetailDesc').innerText = r.desc;
      document.getElementById('reelBottomTitle').innerText = r.title;
      document.getElementById('reelSpecTrans').innerText = r.trans;
      document.getElementById('reelSpecConsumo').innerText = r.consumo;
      if (!document.getElementById('reelCardDeck')) return;
      const v = document.getElementById('reelVideoPlayer');
      v.src = r.video;
      v.poster = r.poster;
      v.play().catch(() => {});
      updateDeckCard();

      document.getElementById('reelBtn0').className = idx === 0 ? 'px-4 py-2 rounded-xl text-xs font-bold bg-[#002c5f] text-white border border-[#c89d7c]/60 shadow-lg font-heading' : 'px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-slate-400 hover:text-white border border-slate-800 font-heading';
      document.getElementById('reelBtn1').className = idx === 1 ? 'px-4 py-2 rounded-xl text-xs font-bold bg-[#002c5f] text-white border border-[#c89d7c]/60 shadow-lg font-heading' : 'px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-slate-400 hover:text-white border border-slate-800 font-heading';
    }

    function toggleReelPlay() {
      const v = document.getElementById('reelVideoPlayer');
      const btn = document.getElementById('reelPlayBtn');
      if (v.paused) {
        v.play();
        btn.innerText = '⏸';
      } else {
        v.pause();
        btn.innerText = '▶';
      }
    }

    function toggleReelMute() {
      const v = document.getElementById('reelVideoPlayer');
      v.muted = !v.muted;
      document.getElementById('reelMuteIcon').innerText = v.muted ? '🔇' : '🔊';
    }

    function rotateReelCard() {
      const r = REELS[currentReelIdx];
      currentCardIdx = (currentCardIdx + 1) % r.cards.length;
      updateDeckCard();
    }

    function updateDeckCard() {
      const card = REELS[currentReelIdx].cards[currentCardIdx];
      document.getElementById('deckCardTitle').innerText = card.title;
      document.getElementById('deckCardSub').innerText = card.sub;
      document.getElementById('deckCardPrice').innerText = '';
      document.getElementById('deckCardImg').src = card.img;
    }

    function loadLocalVideo(event) {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        const v = document.getElementById('reelVideoPlayer');
        v.src = url;
        v.muted = true;
        v.play().catch(() => {});
        document.getElementById('reelCardDeck').classList.add('hidden');
        document.getElementById('localVideoStatus').innerText = '✓ Video cargado: ' + file.name;
      }
    }

    // Mobile Menu Toggle
    on('menuToggleBtn', 'click', () => {
      const d = document.getElementById('mobileDrawer');
      if (d) d.classList.toggle('hidden');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(l => {
      l.addEventListener('click', () => hide('mobileDrawer', true));
    });


    // ================= COMPARADOR DE MODELOS =================
    const COMPARE_MAX = 3;
    let compareList = [];

    function toggleCompare(id) {
      const i = compareList.indexOf(id);
      if (i > -1) compareList.splice(i, 1);
      else {
        if (compareList.length >= COMPARE_MAX) {
          alert('Puedes comparar hasta ' + COMPARE_MAX + ' vehículos a la vez.');
          return;
        }
        compareList.push(id);
      }
      markCompareButtons();
      renderCompareBar();
    }

    function markCompareButtons() {
      document.querySelectorAll('[data-compare]').forEach(b => {
        const on_ = compareList.includes(b.dataset.compare);
        b.className = 'compare-btn mb-2 w-full py-2.5 rounded-xl text-xs font-bold tracking-wide transition-colors ' +
          (on_ ? 'bg-[#c89d7c] text-[#0b111a] border border-[#c89d7c]'
               : 'bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200');
        b.textContent = on_ ? '✓ En la comparativa' : '+ Comparar';
      });
    }

    function clearCompare() {
      compareList = [];
      markCompareButtons();
      renderCompareBar();
    }

    function renderCompareBar() {
      const bar = document.getElementById('compareBar');
      const tabla = document.getElementById('compareTable');
      if (!bar) return;
      if (!compareList.length) {
        bar.classList.add('hidden');
        document.body.classList.remove('compare-open');
        if (tabla) tabla.classList.add('hidden');
        return;
      }
      bar.classList.remove('hidden');
      document.body.classList.add('compare-open');
      const slots = compareList.map(id => {
        const v = getVehicle(id);
        return `<div class="flex items-center gap-2 bg-[#0e1522] border border-slate-800 rounded-xl px-3 py-2">
          <span class="text-xs font-bold text-white truncate max-w-[130px]">${v.name.replace('Hyundai ', '')}</span>
          <button onclick="toggleCompare('${id}')" class="text-slate-500 hover:text-white text-xs" aria-label="Quitar">✕</button>
        </div>`;
      }).join('');
      const huecos = COMPARE_MAX - compareList.length;
      const placeholders = Array.from({ length: huecos }).map(() =>
        `<div class="flex items-center justify-center bg-[#0e1522]/50 border border-dashed border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-600">+ elige un modelo</div>`).join('');
      bar.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div class="flex flex-wrap items-center gap-3">
            <span class="text-xs font-bold uppercase tracking-widest text-[#c89d7c] font-heading shrink-0">Comparativa</span>
            ${slots}${placeholders}
            <button onclick="clearCompare()" class="ml-auto text-xs text-slate-500 hover:text-white underline">Vaciar</button>
            <button onclick="openCompareTable()" ${compareList.length < 2 ? 'disabled' : ''}
              class="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                compareList.length < 2
                  ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                  : 'bg-[#002c5f] hover:bg-[#345fa8] text-white border border-[#c89d7c]/50'}">
              Ver tabla
            </button>
          </div>
        </div>`;
      if (tabla) tabla.classList.add('hidden');
    }

    function openCompareTable() {
      const tabla = document.getElementById('compareTable');
      if (!tabla || compareList.length < 2) return;
      const vs = compareList.map(getVehicle);
      const F = (label, fn) => `<tr class="border-t border-slate-800">
        <th class="text-left align-top py-3 pr-4 text-xs font-bold text-slate-400 whitespace-nowrap">${label}</th>
        ${vs.map(v => `<td class="py-3 pr-4 align-top text-xs text-slate-200">${fn(v)}</td>`).join('')}
      </tr>`;
      tabla.innerHTML = `
        <div class="fixed inset-0 z-50 bg-[#0b111a]/95 backdrop-blur-sm overflow-y-auto p-4 sm:p-8">
          <div class="max-w-5xl mx-auto">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl sm:text-3xl font-extrabold text-white font-heading">Comparativa de Modelos</h3>
              <button onclick="closeCompareTable()" class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-bold">Cerrar ✕</button>
            </div>
            <div class="overflow-x-auto rounded-2xl border border-slate-800 bg-[#0e1522] p-5">
              <table class="w-full min-w-[540px]">
                <thead><tr>
                  <th class="pb-4"></th>
                  ${vs.map(v => `<th class="pb-4 pr-4 align-bottom">
                    <img src="${v.image}" alt="${v.name}" class="w-full max-h-28 object-contain mb-2">
                    <span class="block text-sm font-bold text-white font-heading">${v.name}</span>
                    <span class="block text-[10px] uppercase tracking-wider text-[#c89d7c] mt-0.5">${v.catLabel}</span>
                  </th>`).join('')}
                </tr></thead>
                <tbody>
                  ${F('Motor', v => v.motor)}
                  ${F('Transmisión', v => v.transmision)}
                  ${F('Tracción', v => `${v.eje} <span class="text-slate-500">(${v.delante}% delante / ${v.detras}% detrás)</span>`)}
                  ${F('ADAS SmartSense™', v => v.smartsense
                      ? `<span class="text-[#c89d7c] font-bold">Disponible</span>
                         <ul class="mt-1.5 space-y-0.5 text-slate-300">${v.adas.map(a => `<li>· ${a}</li>`).join('')}</ul>`
                      : `<span class="text-slate-500">No disponible</span>
                         <ul class="mt-1.5 space-y-0.5 text-slate-300">${v.adas.map(a => `<li>· ${a}</li>`).join('')}</ul>`)}
                  ${F('Radares', v => v.radar)}
                  ${F('Aviso al conductor', v => v.aviso)}
                  ${F('Colores de fábrica', v => v.colors.length + ' acabado' + (v.colors.length > 1 ? 's' : '') + ': ' + v.colors.map(c => c.l).join(', '))}
                  ${F('Garantía', () => '<span class="text-[#c89d7c] font-bold">5 años o 100.000 km</span>')}
                  <tr class="border-t border-slate-800">
                    <td></td>
                    ${vs.map(v => `<td class="py-4 pr-4">
                      <a href="contacto.html" class="block text-center px-4 py-2.5 rounded-xl bg-[#002c5f] hover:bg-[#345fa8] text-white text-xs font-bold transition-colors">Consultar</a>
                    </td>`).join('')}
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="text-[10px] text-slate-500 text-center mt-5">Los precios se muestran en showroom. Especificaciones sujetas a cambio por Hyundai Venezuela.</p>
          </div>
        </div>`;
      tabla.classList.remove('hidden');
      tabla.scrollTop = 0;
    }

    function closeCompareTable() {
      hide('compareTable', true);
    }

    // ================= FICHA DE RUTA POR VEHICULO =================
    let currentRutaModel = 'tucson';
    let adasAlertTimer = null;

    function renderRutaPicker() {
      const box = document.getElementById('rutaModelPicker');
      if (!box) return;
      box.innerHTML = MODELS.map(m => `
        <button onclick="switchRutaModel('${m.id}')" data-ruta="${m.id}"
          class="ruta-model-btn px-3 py-2 rounded-lg text-xs font-bold border transition-colors">
          ${m.name.replace('Hyundai ', '')}
        </button>`).join('');
    }

    function markRutaModel(id) {
      document.querySelectorAll('.ruta-model-btn').forEach(b => {
        const on_ = b.dataset.ruta === id;
        b.className = 'ruta-model-btn px-3 py-2 rounded-lg text-xs font-bold border transition-colors ' +
          (on_ ? 'bg-[#002c5f] text-white border-[#c89d7c]/60'
               : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800');
      });
    }

    function switchRutaModel(id) {
      const v = getVehicle(id);
      if (!v.name) return;
      currentRutaModel = id;
      txt('rutaName', v.name);

      const img = document.getElementById('simCarImg');
      if (img) { img.src = v.image; img.alt = v.name; }
      applyDriveSplit();

      // ficha ADAS
      const list = document.getElementById('adasList');
      if (list) list.innerHTML = v.adas.map(a => `
        <div class="flex items-center gap-3 rounded-xl bg-slate-950/70 border border-slate-800 px-4 py-3.5">
          <span class="w-8 h-8 shrink-0 rounded-lg bg-[#002c5f] border border-[#c89d7c]/40 flex items-center justify-center text-[#c89d7c]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </span>
          <span class="text-xs font-semibold text-slate-200">${a}</span>
        </div>`).join('');

      txt('adasRadar', v.radar);
      txt('adasAviso', v.aviso);
      txt('adasDisponible', v.smartsense
        ? 'Disponible de serie en ' + v.name.replace('Hyundai ', '') + ' y en el resto de la gama con paquete Hyundai SmartSense™'
        : 'Sensorización básica en ' + v.name.replace('Hyundai ', '') + '. SmartSense™ disponible en Tucson, Palisade y Creta GLS');

      // el radar se enciende o se apaga segun el equipo
      const icon = document.getElementById('radarIcon');
      const status = document.getElementById('radarStatus');
      const svg = icon ? icon.querySelector('svg') : null;
      const btn = document.getElementById('obstacleBtn');
      if (icon) icon.style.borderColor = v.smartsense ? '#c89d7c' : '#334155';
      if (svg) svg.style.color = v.smartsense ? '#c89d7c' : '#475569';
      if (status) {
        status.innerText = v.smartsense ? 'LISTO' : 'SIN EQUIPO';
        status.className = 'text-sm font-extrabold font-mono tracking-wider ' +
          (v.smartsense ? 'text-[#c89d7c]' : 'text-slate-500');
      }
      if (btn) {
        btn.disabled = !v.smartsense;
        btn.className = 'mt-5 w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ' +
          (v.smartsense
            ? 'bg-[#002c5f] hover:bg-[#345fa8] border border-[#c89d7c]/50 text-white cursor-pointer'
            : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed');
      }
      hide('adasAlert', true);
      markRutaModel(id);
    }

    function simulateObstacle() {
      const v = getVehicle(currentRutaModel);
      if (!v.smartsense) return;
      const icon = document.getElementById('radarIcon');
      const status = document.getElementById('radarStatus');
      const alert_ = document.getElementById('adasAlert');
      const btn = document.getElementById('obstacleBtn');
      if (icon) { icon.style.borderColor = '#f59e0b'; icon.style.transform = 'scale(1.12)'; }
      if (status) { status.innerText = 'DETECTANDO'; status.className = 'text-sm font-extrabold font-mono tracking-wider text-amber-400'; }
      if (alert_) alert_.classList.remove('hidden');
      txt('adasAlertTitle', '⚠ ' + v.adas[0].split('·')[0].trim() + ' ACTIVADO');
      txt('adasAlertText', v.adas[0].split('·').slice(1).join('').trim()
        + ' · ' + v.aviso
        + ' Se aplicó una frenada automática y aviso al conductor.');
      if (btn) btn.innerText = 'Obstáculo detectado';

      clearTimeout(adasAlertTimer);
      adasAlertTimer = setTimeout(() => {
        if (icon) { icon.style.borderColor = '#c89d7c'; icon.style.transform = 'scale(1)'; }
        if (status) { status.innerText = 'LISTO'; status.className = 'text-sm font-extrabold font-mono tracking-wider text-[#c89d7c]'; }
        hide('adasAlert', true);
        if (btn) btn.innerText = 'Simular Obstáculo Imprevisto';
      }, 6000);
    }

    // Init: cada landing solo ejecuta la parte que le toca
    // el grid arranca SIEMPRE con todos los modelos
    if (document.getElementById('modelsGridContainer')) {
      renderModels('all');
      markActiveCategory('all');
      markCompareButtons();
      renderCompareBar();
    }
    if (document.getElementById('studioColorDots')) {
      switchStudioModel(currentStudioModel.id);
      buildStudioModelPicker();
    }
    if (document.getElementById('reelCardDeck')) switchReel(0);
    if (document.getElementById('rutaModelPicker')) {
      renderRutaPicker();
      switchRutaModel('tucson');
      flashMode();
    }
  
