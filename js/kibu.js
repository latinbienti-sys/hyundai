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
      { id: 'tucson', name: 'Hyundai Tucson', cat: 'suv', catLabel: 'SUV', price: 44900, motor: '2.0L MPI Smartstream (156 HP)', image: 'img/modelos/tucson-azul.png', colors: [{l:'Blanco Atlas', img:'img/modelos/tucson-blanco-atlas.png', c:'#F8FAFC'},{l:'Plata Estelar', img:'img/modelos/tucson-plata-estelar.png', c:'#CBD5E1'},{l:'Negro Abismo', img:'img/modelos/tucson-negro-abismo.png', c:'#111827'},{l:'Azul', img:'img/modelos/tucson-azul.png', c:'#1E3A8A'},{l:'Rojo Passion', img:'img/modelos/tucson-rojo-passion.png', c:'#B91C1C'}] },
      { id: 'creta', name: 'Hyundai Creta', cat: 'suv', catLabel: 'SUV Compacta', price: 33500, motor: '2.0L MPI (156 HP)', image: 'img/modelos/creta-blanco-atlas.png', colors: [{l:'Blanco Atlas', img:'img/modelos/creta-blanco-atlas.png', c:'#F8FAFC'},{l:'Plata Estelar', img:'img/modelos/creta-plata-estelar.png', c:'#CBD5E1'},{l:'Negro Abismo', img:'img/modelos/creta-negro-abismo.png', c:'#111827'},{l:'Azul', img:'img/modelos/creta-azul.png', c:'#1E3A8A'},{l:'Rojo Passion', img:'img/modelos/creta-rojo-passion.png', c:'#B91C1C'}] },
      { id: 'palisade', name: 'Hyundai Palisade', cat: 'suv', catLabel: 'SUV 7 Pasajeros', price: 78900, motor: '3.8L V6 GDI (291 HP)', image: 'img/modelos/palisade-rojo-passion.png', colors: [{l:'Blanco Atlas', img:'img/modelos/palisade-blanco-atlas.webp', c:'#F8FAFC'},{l:'Rojo Passion', img:'img/modelos/palisade-rojo-passion.png', c:'#B91C1C'},{l:'Gris Platino', img:'img/modelos/palisade-gris-platino.webp', c:'#6B7280'}] },
      { id: 'stariavan', name: 'Hyundai Staria VAN', cat: 'van', catLabel: 'Van Carga', price: 51380, motor: '3.5L V6 MPI (268 HP)', image: 'img/modelos/stariavan-blanco.png', colors: [{l:'Blanco', img:'img/modelos/stariavan-blanco.png', c:'#F8FAFC'}] },
      { id: 'staria11p', name: 'Hyundai Staria Wagon 11P', cat: 'van', catLabel: 'Van 11 Pasajeros', price: 75160, motor: '3.5L V6 MPI (268 HP)', image: 'img/modelos/staria11p-negro.png', colors: [{l:'Blanco', img:'img/modelos/staria11p-blanco.png', c:'#F8FAFC'},{l:'Negro', img:'img/modelos/staria11p-negro.png', c:'#111827'}] },
      { id: 'staria7p', name: 'Hyundai Staria Wagon 7P', cat: 'van', catLabel: 'Van 7 Pasajeros', price: 75160, motor: '3.5L V6 MPI (268 HP)', image: 'img/modelos/staria7p-negro.png', colors: [{l:'Blanco', img:'img/modelos/staria7p-blanco.png', c:'#F8FAFC'},{l:'Negro', img:'img/modelos/staria7p-negro.png', c:'#111827'}] },
      { id: 'elantra', name: 'Hyundai Elantra', cat: 'sedan', catLabel: 'Sedán', price: 36800, motor: '2.0L MPI IVT (156 HP)', image: 'img/modelos/elantra-azul.png', colors: [{l:'Blanco Atlas', img:'img/modelos/elantra-blanco-atlas.png', c:'#F8FAFC'},{l:'Plata Estelar', img:'img/modelos/elantra-plata-estelar.png', c:'#CBD5E1'},{l:'Negro Abismo', img:'img/modelos/elantra-negro-abismo.png', c:'#111827'},{l:'Azul', img:'img/modelos/elantra-azul.png', c:'#1E3A8A'},{l:'Rojo Passion', img:'img/modelos/elantra-rojo-passion.png', c:'#B91C1C'}] },
      { id: 'accent', name: 'Hyundai Accent', cat: 'sedan', catLabel: 'Sedán Compacto', price: 28900, motor: '1.5L MPI IVT (113 HP)', image: 'img/modelos/accent-azul.png', colors: [{l:'Blanco Atlas', img:'img/modelos/accent-blanco-atlas.png', c:'#F8FAFC'},{l:'Plata Estelar', img:'img/modelos/accent-plata-estelar.png', c:'#CBD5E1'},{l:'Azul', img:'img/modelos/accent-azul.png', c:'#1E3A8A'},{l:'Rojo Passion', img:'img/modelos/accent-rojo-passion.png', c:'#B91C1C'}] },
      { id: 'i10sedan', name: 'Hyundai Grand i10 Sedán', cat: 'sedan', catLabel: 'Sedán Subcompacto', price: 23500, motor: '1.2L Kappa MPI (82 HP)', image: 'img/modelos/i10sedan-azul.webp', colors: [{l:'Blanco Atlas', img:'img/modelos/i10sedan-blanco-atlas.webp', c:'#F8FAFC'},{l:'Plata Estelar', img:'img/modelos/i10sedan-plata-estelar.webp', c:'#CBD5E1'},{l:'Negro Abismo', img:'img/modelos/i10sedan-negro-abismo.webp', c:'#111827'},{l:'Azul', img:'img/modelos/i10sedan-azul.webp', c:'#1E3A8A'},{l:'Rojo Passion', img:'img/modelos/i10sedan-rojo-passion.webp', c:'#B91C1C'}] },
      { id: 'i10hatchgls', name: 'Hyundai Grand i10 Hatchback GLS', cat: 'hatchback', catLabel: 'Hatchback GLS', price: 21900, motor: '1.2L Kappa MPI (82 HP)', image: 'img/modelos/i10hatchgls-azul.png', colors: [{l:'Blanco', img:'img/modelos/i10hatchgls-blanco.png', c:'#F8FAFC'},{l:'Plata', img:'img/modelos/i10hatchgls-plata.png', c:'#CBD5E1'},{l:'Negro', img:'img/modelos/i10hatchgls-negro.png', c:'#111827'},{l:'Azul', img:'img/modelos/i10hatchgls-azul.png', c:'#1E3A8A'},{l:'Rojo', img:'img/modelos/i10hatchgls-rojo.png', c:'#B91C1C'}] },
      { id: 'i10hatchglat', name: 'Hyundai Grand i10 Hatchback GL A/T', cat: 'hatchback', catLabel: 'Hatchback GL A/T', price: 21900, motor: '1.2L Kappa MPI (82 HP)', image: 'img/modelos/i10hatchglat-azul.png', colors: [{l:'Blanco', img:'img/modelos/i10hatchglat-blanco.png', c:'#F8FAFC'},{l:'Plata', img:'img/modelos/i10hatchglat-plata.png', c:'#CBD5E1'},{l:'Negro', img:'img/modelos/i10hatchglat-negro.png', c:'#111827'},{l:'Azul', img:'img/modelos/i10hatchglat-azul.png', c:'#1E3A8A'},{l:'Rojo', img:'img/modelos/i10hatchglat-rojo.png', c:'#B91C1C'},{l:'Verde Menta', img:'img/modelos/i10hatchglat-verde.png', c:'#16A34A'}] },
      { id: 'i10hatchglmt', name: 'Hyundai Grand i10 Hatchback GL M/T', cat: 'hatchback', catLabel: 'Hatchback GL M/T', price: 20900, motor: '1.2L Kappa MPI (82 HP)', image: 'img/modelos/i10hatchglmt-azul.png', colors: [{l:'Blanco', img:'img/modelos/i10hatchglmt-blanco.png', c:'#F8FAFC'},{l:'Plata', img:'img/modelos/i10hatchglmt-plata.png', c:'#CBD5E1'},{l:'Negro', img:'img/modelos/i10hatchglmt-negro.png', c:'#111827'},{l:'Azul', img:'img/modelos/i10hatchglmt-azul.png', c:'#1E3A8A'},{l:'Rojo', img:'img/modelos/i10hatchglmt-rojo.png', c:'#B91C1C'},{l:'Verde Menta', img:'img/modelos/i10hatchglmt-verde.png', c:'#16A34A'}] }
    ];


    /* --- Datos técnicos por vehículo: los usa el comparador y la Ruta Andina --- */
    const VEHICLE_DATA = {
      'tucson': { transmision: 'A/T 6 vel', eje: '4x4', delante: 40, detras: 60, smartsense: true, radar: 'Cámara frontal de alta definición + Radar milimétrico', aviso: 'Alerta sonora en habitáculo y vibración háptica en volante', adas: ['FCA · Frenado Autónomo de Emergencia', 'LKA · Asistente de Mantenimiento de Carril', 'BCA · Monitoreo de Punto Ciego'] },
      'creta': { transmision: 'A/T 6 vel', eje: 'FWD', delante: 100, detras: 0, smartsense: true, radar: 'Cámara frontal de alta definición + Radar milimétrico', aviso: 'Alerta sonora en habitáculo y vibración háptica en volante', adas: ['FCA · Frenado Autónomo de Emergencia', 'LKA · Asistente de Mantenimiento de Carril', 'BCA · Monitoreo de Punto Ciego'] },
      'palisade': { transmision: 'Automática de 8 vel', eje: '4x4', delante: 40, detras: 60, smartsense: true, radar: 'Cámara frontal de alta definición + Radar milimétrico', aviso: 'Alerta sonora en habitáculo y vibración háptica en volante', adas: ['FCA · Frenado Autónomo de Emergencia', 'LKA · Asistente de Mantenimiento de Carril', 'BCA · Monitoreo de Punto Ciego'] },
      'stariavan': { transmision: 'A/T 8 vel', eje: 'FWD', delante: 100, detras: 0, smartsense: true, radar: 'Cámara frontal de alta definición + Radar frontal', aviso: 'Alerta sonora en habitáculo y aviso visual', adas: ['FCA · Frenado Autónomo de Emergencia', 'LKA · Asistente de Mantenimiento de Carril'] },
      'staria11p': { transmision: 'A/T 8 vel', eje: 'FWD', delante: 100, detras: 0, smartsense: true, radar: 'Cámara frontal de alta definición + Radar frontal', aviso: 'Alerta sonora en habitáculo y aviso visual', adas: ['FCA · Frenado Autónomo de Emergencia', 'LKA · Asistente de Mantenimiento de Carril'] },
      'staria7p': { transmision: 'A/T 8 vel', eje: 'FWD', delante: 100, detras: 0, smartsense: true, radar: 'Cámara frontal de alta definición + Radar frontal', aviso: 'Alerta sonora en habitáculo y aviso visual', adas: ['FCA · Frenado Autónomo de Emergencia', 'LKA · Asistente de Mantenimiento de Carril'] },
      'elantra': { transmision: 'A/T 6 IVT', eje: 'FWD', delante: 100, detras: 0, smartsense: false, radar: 'Cámara frontal + sensores de asistente', aviso: 'Alerta sonora en habitáculo', adas: ['FCA · Frenado Autónomo de Emergencia', 'LDW · Aviso de Salida de Carril'] },
      'accent': { transmision: 'A/T 6 IVT', eje: 'FWD', delante: 100, detras: 0, smartsense: false, radar: 'Sensores de asistente de carril', aviso: 'Alerta sonora en habitáculo', adas: ['FCA · Frenado Autónomo de Emergencia'] },
      'i10sedan': { transmision: 'Automática de 4 vel', eje: 'FWD', delante: 100, detras: 0, smartsense: false, radar: '—', aviso: '—', adas: ['FCW · Aviso de colisión frontal'] },
      'i10hatchgls': { transmision: 'A/T 4 vel', eje: 'FWD', delante: 100, detras: 0, smartsense: false, radar: '—', aviso: '—', adas: ['FCW · Aviso de colisión frontal'] },
      'i10hatchglat': { transmision: 'A/T 4 vel', eje: 'FWD', delante: 100, detras: 0, smartsense: false, radar: '—', aviso: '—', adas: ['FCW · Aviso de colisión frontal'] },
      'i10hatchglmt': { transmision: 'M/T 5 vel', eje: 'FWD', delante: 100, detras: 0, smartsense: false, radar: '—', aviso: '—', adas: ['FCW · Aviso de colisión frontal'] }
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
      markRutaModel(id);
    }

    // ================= PAGINA TECNOLOGIA ADAS / SMARTSENSE =================
    // Cada sistema tiene: ficha, sensor, zona sobre la camioneta y what it does.
    const ADAS_SISTEMAS = {
      FCA: {
        zona: 'FCA',
        nombre: 'Frenado Autónomo de Emergencia',
        sensor: 'Radar milimétrico frontal + cámara de alta definición',
        que: 'Vigila la calle por delante. Si detecta un vehículo más lento o un obstáculo y tú no reaccionas, avisa primero y frena de forma automática para evitar el impacto.',
        evita: 'Choque frontal por exceso de velocidad o distracción'
      },
      LKA: {
        zona: 'LKA',
        nombre: 'Asistente de Mantenimiento de Carril',
        sensor: 'Cámara frontal sobre el parabrisas',
        que: 'Lee las líneas del carril y mantiene el vehículo centrado con correcciones suaves de dirección. Antes de corregir te avisa con un sonido y vibración en el volante.',
        evita: 'Salidas involuntarias del carril por curvas o distracción'
      },
      BCA: {
        zona: 'BCA',
        nombre: 'Monitoreo de Punto Ciego',
        sensor: 'Dos radares en los quarters traseros',
        que: 'Detecta vehículos que se acercan por tu punto ciego. Enciende un aviso en el espejo y, si intentas cambiar de carril, frena solo el lado donde viene el auto.',
        evita: 'Colisiones al cambiar de carril por no ver el espejo interior'
      },
      LDW: {
        zona: 'LKA',
        nombre: 'Aviso de Salida de Carril',
        sensor: 'Cámara frontal sobre el parabrisas',
        que: 'Avisa con sonido cuando las líneas del carril se desvían del trajectory previsto. Es un sistema de aviso: corrige la dirección, no el coche.',
        evita: 'Salidas del carril en ruta o highway'
      },
      FCW: {
        zona: 'FCA',
        nombre: 'Aviso de Colisión Frontal',
        sensor: 'Cámara frontal',
        que: 'Avisa con sonido y un mensaje en el tablero cuando detecta un riesgo de impacto frontal. No frena de forma automática: la frenada queda a tu mando.',
        evita: 'Reacciones tardías ante frenadasinasas de emergencia'
      }
    };

    let currentAdasModel = 'tucson';

    function renderAdasModelPicker() {
      const box = document.getElementById('adasModelPicker');
      if (!box) return;
      box.innerHTML = MODELS.map(m => `
        <button onclick="switchAdasModel('${m.id}')" data-adas="${m.id}"
          class="adas-model-btn px-3 py-2 rounded-lg text-xs font-bold border transition-colors">
          ${m.name.replace('Hyundai ', '')}
        </button>`).join('');
    }

    function markAdasModel(id) {
      document.querySelectorAll('.adas-model-btn').forEach(b => {
        const on_ = b.dataset.adas === id;
        b.className = 'adas-model-btn px-3 py-2 rounded-lg text-xs font-bold border transition-colors ' +
          (on_ ? 'bg-[#002c5f] text-white border-[#c89d7c]/60'
               : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800');
      });
    }

    // normaliza 'FCA · Frenado...' -> 'FCA'
    function adasCode(s) {
      return String(s).split('·')[0].trim().toUpperCase();
    }

    function switchAdasModel(id) {
      const v = getVehicle(id);
      if (!v.name) return;
      currentAdasModel = id;
      txt('adasVehicleName', v.name);
      txt('adasSpecBox', v.transmision + ' · ' + v.eje + ' · ' + v.colors.length + ' colores de fábrica');

      const img = document.getElementById('adasCarImg');
      if (img) { img.src = v.image; img.alt = v.name + ' con sensores SmartSense'; }

      const status = document.getElementById('adasOverallStatus');
      if (status) {
        const n = v.adas.length;
        status.innerText = v.smartsense
          ? 'ACTIVO · ' + n + ' sistema' + (n > 1 ? 's' : '')
          : 'SENSORIZACIÓN BÁSICA';
        status.className = 'text-sm font-extrabold font-mono tracking-wider ' +
          (v.smartsense ? 'text-[#c89d7c]' : 'text-slate-500');
      }

      // tarjetas de cada sistema
      const list = document.getElementById('adasCards');
      if (list) {
        list.innerHTML = v.adas.map(a => {
          const code = adasCode(a);
          const s = ADAS_SISTEMAS[code];
          return `
          <button onclick="highlightAdas('${code}')" data-adas-code="${code}"
            class="adas-card w-full text-left rounded-2xl bg-slate-950/70 border border-slate-800 p-5 transition-all hover:border-[#c89d7c]/60 cursor-pointer">
            <div class="flex items-start gap-3">
              <span class="shrink-0 w-10 h-10 rounded-xl bg-[#002c5f] border border-[#c89d7c]/40 flex items-center justify-center text-[#c89d7c] font-heading font-extrabold text-xs">
                ${code}
              </span>
              <span class="min-w-0">
                <span class="block text-sm font-bold text-white font-heading">${s ? s.nombre : a.split('·').slice(1).join('').trim()}</span>
                <span class="block text-[10px] uppercase tracking-wider text-slate-500 mt-1">${s ? s.sensor : '—'}</span>
              </span>
            </div>
          </button>`;
        }).join('');
      }

      highlightAdas(null);
      markAdasModel(id);
    }

    // Al pasar el cursor por una tarjeta se enciende la zona del sensor
    // que zona de la camioneta ilumina cada sistema
    const ADAS_ZONA = { FCA: 'FCA', FCW: 'FCA', LKA: 'LKA', BCA: 'BCA' };

    function highlightAdas(code) {
      const zona = ADAS_ZONA[code] || code;
      document.querySelectorAll('.adas-card').forEach(c => {
        c.classList.toggle('adas-activa', c.dataset.adasCode === code);
      });
      document.querySelectorAll('.sensor-zona').forEach(z => {
        z.classList.toggle('sensor-on', z.dataset.zona === zona);
      });

      const panel = document.getElementById('adasReadout');
      const v = getVehicle(currentAdasModel);
      if (!panel) return;

      if (!code) {
        panel.innerHTML = '<p class="text-xs text-slate-500 leading-relaxed">'
          + 'Pasa el cursor o toca una tarjeta para ver dónde está el sensor y qué previene.</p>';
        return;
      }
      const s = ADAS_SISTEMAS[code];
      if (!s) return;
      panel.innerHTML = `
        <span class="text-[10px] font-bold uppercase tracking-widest text-[#c89d7c] block mb-1.5">${code} · ${s.nombre}</span>
        <p class="text-xs text-slate-300 leading-relaxed">${s.que}</p>
        <p class="text-[11px] text-slate-500 mt-3 leading-relaxed"><span class="text-slate-400 font-bold">Sensor:</span> ${s.sensor}</p>
        <p class="text-[11px] text-slate-500 mt-1.5 leading-relaxed"><span class="text-slate-400 font-bold">Previene:</span> ${s.evita}</p>
        <p class="text-[10px] text-slate-600 mt-3">${v.name}</p>`;
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
    if (document.getElementById('adasModelPicker')) {
      renderAdasModelPicker();
      switchAdasModel('tucson');
    }
  
