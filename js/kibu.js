/* ============================================================
   KIBÚN · JavaScript compartido
   Extraído del <script> inline de index.html.
   ============================================================ */



    // --- helpers tolerantes: cada landing llama solo a lo que tiene ---
    const $ = (id) => document.getElementById(id);
    const on = (id, ev, fn) => { const el = $(id); if (el) el.addEventListener(ev, fn); };
    const txt = (id, v) => { const el = $(id); if (el) el.innerText = v; };
    const hide = (id, yes) => { const el = $(id); if (el) el.classList.toggle('hidden', yes); };

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
            <a href="contacto.html" class="block w-full py-2.5 rounded-xl bg-[#002c5f] hover:bg-[#345fa8] text-white text-xs font-bold tracking-wide text-center transition-colors">Consultar por WhatsApp</a>
          </div>
        </div>
      `).join('');
    }

    function filterCategory(cat) {
      document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        btn.classList.remove('bg-[#002c5f]', 'text-white', 'border-[#c89d7c]/50');
        btn.classList.add('text-slate-400', 'border-transparent');
      });
      event.target.classList.add('bg-[#002c5f]', 'text-white', 'border-[#c89d7c]/50');
      event.target.classList.remove('text-slate-400', 'border-transparent');
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
      document.getElementById('heroBg').style.backgroundImage = `url('${s.bg}')`;
      document.getElementById('heroCar').src = s.car;
      document.getElementById('heroEyebrow').innerText = s.eyebrow;
      document.getElementById('heroTitle').innerHTML = s.title;
      document.getElementById('heroSub').innerText = s.sub;
      document.querySelectorAll('.hero-dot').forEach((d, i) => {
        d.className = i === idx ? 'hero-dot px-3.5 py-1.5 text-xs rounded-lg bg-[#002c5f] text-white border border-[#c89d7c]/60 font-bold' : 'hero-dot px-3.5 py-1.5 text-xs rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800';
      });
    }

    // Parallax mouse move in hero
    const hero = document.getElementById('inicio');
    const heroBg = document.getElementById('heroBg');
    const heroCar = document.getElementById('heroCar');
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      if (heroBg) heroBg.style.transform = 'scale(1.06) translate3d(' + (-x * 0.4) + 'px, ' + (-y * 0.4) + 'px, 0)';
      if (heroCar) heroCar.style.transform = 'translate3d(' + (x * 0.8) + 'px, ' + (y * 0.6) + 'px, 0) rotateY(' + (x * 0.5) + 'deg)';
    });

    // --- Studio 360 Features ---
    let currentStudioModel = MODELS[0];
    let studioHeadlights = true;

    function renderStudioColors() {
      const container = document.getElementById('studioColorDots');
      container.innerHTML = currentStudioModel.colors.map((c, i) => `
        <button onclick="setStudioColor(${i})" class="w-6 h-6 rounded-full border border-slate-600 transition-transform hover:scale-110" style="background-color:${c.c}" title="${c.l}"></button>
      `).join('');
      setStudioColor(0);
    }

    function setStudioColor(idx) {
      const c = currentStudioModel.colors[idx];
      document.getElementById('studioCarImg').src = c.img;
      document.getElementById('studioCarReflection').src = c.img;
      document.getElementById('studioColorLabel').innerText = c.l;
    }

    function switchStudioModel(id) {
      currentStudioModel = MODELS.find(m => m.id === id) || MODELS[0];
      document.getElementById('studioName').innerText = currentStudioModel.name;
      document.getElementById('studioCat').innerText = currentStudioModel.catLabel;
      document.getElementById('studioPrice').innerText = '';
      renderStudioColors();
    }

    function toggleHeadlights() {
      studioHeadlights = !studioHeadlights;
      const glow = document.getElementById('headlightGlow');
      const btn = document.getElementById('headlightToggleBtn');
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

    function setDriveMode(mode) {
      simMode = mode;
      document.querySelectorAll('.mode-btn').forEach(b => {
        b.className = 'mode-btn px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white';
      });
      document.getElementById('modeBtn' + mode).className = 'mode-btn px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#002c5f] text-white border border-[#c89d7c]/60';
      document.getElementById('simRoadLine').style.animationDuration = SIM_CONFIGS[mode].dur;
    }

    const throttleBtn = document.getElementById('throttleBtn');
    ['mousedown', 'touchstart'].forEach(e => throttleBtn.addEventListener(e, () => { isAccelerating = true; throttleBtn.innerText = '¡Acelerando en pendiente!'; }));
    ['mouseup', 'mouseleave', 'touchend'].forEach(e => throttleBtn.addEventListener(e, () => { isAccelerating = false; throttleBtn.innerText = 'Mantener Acelerador'; }));

    setInterval(() => {
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
      const serv = document.getElementById('apptService').value;
      const model = document.getElementById('apptModel').value;
      const day = document.getElementById('apptDay').value;
      const msg = `Hola Automotores Kibun Mérida! 🔧 Deseo agendar cita en su taller oficial:\n- Servicio: ${serv}\n- Vehículo: ${model}\n- Día preferido: ${day}\nPor favor confirmar disponibilidad.`;
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
    document.getElementById('menuToggleBtn').addEventListener('click', () => {
      document.getElementById('mobileDrawer').classList.toggle('hidden');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(l => {
      l.addEventListener('click', () => document.getElementById('mobileDrawer').classList.add('hidden'));
    });

    // Init: cada landing solo ejecuta la parte que le toca
    if (document.getElementById('modelsGridContainer')) renderModels('all');
    if (document.getElementById('studioSwatches')) renderStudioColors();
    if (document.getElementById('reelCardDeck')) switchReel(0);
  
