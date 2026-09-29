/* ==========================================================================
   KIBU · Base de datos ligera del catalogo
   Fuente unica de verdad. Datos tomados del repositorio (modelos.html).
   NO se inventan modelos ni especificaciones que no esten aqui.
   ========================================================================== */

window.KIBU = (function () {
  "use strict";

  /* Catalogo: 10 variantes agrupadas en 6 modelos de Kibu */
  const models = [
    { name: 'Grand i10 1.2L M/T GL', variant: 'M/T 5 vel', category: 'hatchback', motor: '1.2L MPI', potencia: '82 HP @ 6000 rpm', transmision: 'Manual 5 velocidades', traccion: 'Delantera', combustible: 'Gasolina', capacidad_tanque: '40 L', largo: '3,665 mm', ancho: '1,660 mm', alto: '1,530 mm', peso: '1,012 kg', image: 'img/modelos/Grandi10-Hatchback-GL-Azul.png', palette: 'azul', colors: [{label:'Rojo',palette:'rojo',image:'img/modelos/Grandi10-Hatchback-GLS-rojo.png'},{label:'Plata',palette:'plata',image:'img/modelos/Grandi10-Hatchback-GL-Plata.png'},{label:'Azul',palette:'azul',image:'img/modelos/Grandi10-Hatchback-GL-Azul.png'}] },
    { name: 'Grand i10 1.2L A/T GL', variant: 'A/T 4 vel', category: 'hatchback', motor: '1.2L MPI', potencia: '82 HP @ 6000 rpm', transmision: 'Automática 4 velocidades', traccion: 'Delantera', combustible: 'Gasolina', capacidad_tanque: '40 L', largo: '3,665 mm', ancho: '1,660 mm', alto: '1,530 mm', peso: '1,025 kg', image: 'img/modelos/Grandi10-Hatchback-GL-Plata.png', palette: 'plata', colors: [{label:'Rojo',palette:'rojo',image:'img/modelos/Grandi10-Hatchback-GLS-rojo.png'},{label:'Plata',palette:'plata',image:'img/modelos/Grandi10-Hatchback-GL-Plata.png'},{label:'Azul',palette:'azul',image:'img/modelos/Grandi10-Hatchback-GL-Azul.png'}] },
    { name: 'Grand i10 1.2L A/T GLS', variant: 'A/T 4 vel', category: 'hatchback', motor: '1.2L MPI', potencia: '82 HP @ 6000 rpm', transmision: 'Automática 4 velocidades', traccion: 'Delantera', combustible: 'Gasolina', capacidad_tanque: '40 L', largo: '3,665 mm', ancho: '1,660 mm', alto: '1,530 mm', peso: '1,025 kg', image: 'img/modelos/Grandi10-Hatchback-GLS-rojo.png', palette: 'rojo', colors: [{label:'Rojo',palette:'rojo',image:'img/modelos/Grandi10-Hatchback-GLS-rojo.png'},{label:'Plata',palette:'plata',image:'img/modelos/Grandi10-Hatchback-GL-Plata.png'},{label:'Azul',palette:'azul',image:'img/modelos/Grandi10-Hatchback-GL-Azul.png'}] },
    { name: 'Grand i10 1.2L A/T GLS Sedán', variant: 'A/T 4 vel', category: 'sedan', motor: '1.2L MPI', potencia: '82 HP @ 6000 rpm', transmision: 'Automática 4 velocidades', traccion: 'Delantera', combustible: 'Gasolina', capacidad_tanque: '43 L', largo: '4,225 mm', ancho: '1,660 mm', alto: '1,520 mm', peso: '1,068 kg', image: 'img/modelos/Grandi10-sedan-fondo-transparente.png', palette: 'blanco', colors: [{label:'Blanco',palette:'blanco',image:'img/modelos/Grandi10-sedan-fondo-transparente.png'}] },
    { name: 'Accent 1.5L A/T GLS', variant: 'A/T 6 IVT', category: 'sedan', motor: '1.5L MPI', potencia: '113 HP @ 6300 rpm', transmision: 'Automática IVT 6 vel', traccion: 'Delantera', combustible: 'Gasolina', capacidad_tanque: '45 L', largo: '4,500 mm', ancho: '1,760 mm', alto: '1,470 mm', peso: '1,152 kg', image: 'img/modelos/Accent-blanco.png', palette: 'blanco', colors: [{label:'Blanco',palette:'blanco',image:'img/modelos/Accent-blanco.png'}] },
    { name: 'Elantra 2.0L A/T GLS', variant: 'A/T 6 IVT', category: 'sedan', motor: '2.0L MPI', potencia: '156 HP @ 6200 rpm', transmision: 'Automática IVT 6 vel', traccion: 'Delantera', combustible: 'Gasolina', capacidad_tanque: '47 L', largo: '4,640 mm', ancho: '1,820 mm', alto: '1,425 mm', peso: '1,250 kg', image: 'img/modelos/Elantra-rojo.png', palette: 'rojo', colors: [{label:'Rojo',palette:'rojo',image:'img/modelos/Elantra-rojo.png'}] },
    { name: 'Creta 1.5L A/T GLS', variant: 'A/T 6 vel', category: 'suv', motor: '1.5L MPI', potencia: '113 HP @ 6300 rpm', transmision: 'Automática 6 velocidades', traccion: 'Delantera', combustible: 'Gasolina', capacidad_tanque: '50 L', largo: '4,300 mm', ancho: '1,790 mm', alto: '1,635 mm', peso: '1,220 kg', image: 'img/modelos/Creta-Blanco_.png', palette: 'blanco', colors: [{label:'Blanco',palette:'blanco',image:'img/modelos/Creta-Blanco_.png'}] },
    { name: 'Tucson 2.0L A/T 2WD GLS', variant: 'A/T 6 vel', category: 'suv', motor: '2.0L MPI', potencia: '154 HP @ 6200 rpm', transmision: 'Automática 6 velocidades', traccion: 'Delantera', combustible: 'Gasolina', capacidad_tanque: '54 L', largo: '4,630 mm', ancho: '1,865 mm', alto: '1,665 mm', peso: '1,530 kg', image: 'img/modelos/Tucson-premium-Azul-.png', palette: 'azul', colors: [{label:'Azul',palette:'azul',image:'img/modelos/Tucson-premium-Azul-.png'},{label:'Blanco',palette:'blanco',image:'img/modelos/Tucson-blanco.png'}] },
    { name: 'Tucson 2.0L A/T 4WD GLX', variant: 'A/T 6 vel', category: 'suv', motor: '2.0L MPI', potencia: '154 HP @ 6200 rpm', transmision: 'Automática 6 velocidades', traccion: '4x4', combustible: 'Gasolina', capacidad_tanque: '54 L', largo: '4,630 mm', ancho: '1,865 mm', alto: '1,665 mm', peso: '1,612 kg', image: 'img/modelos/Tucson-blanco.png', palette: 'blanco', colors: [{label:'Blanco',palette:'blanco',image:'img/modelos/Tucson-blanco.png'},{label:'Azul',palette:'azul',image:'img/modelos/Tucson-premium-Azul-.png'}] },
    { name: 'Palisade 3.8L A/T 4WD GLS 7P', variant: 'A/T 8 vel', category: 'suv', motor: '3.8L V6 GDI', potencia: '291 HP @ 6000 rpm', transmision: 'Automática 8 velocidades', traccion: '4x4', combustible: 'Gasolina', capacidad_tanque: '71 L', largo: '4,995 mm', ancho: '1,975 mm', alto: '1,750 mm', peso: '1,905 kg', image: 'img/modelos/Palisade-rojo.png', palette: 'rojo', colors: [{label:'Rojo',palette:'rojo',image:'img/modelos/Palisade-rojo.png'}] }
  ];

  /* Ficha de precios. Origen: simulador.html del repositorio. Sin inventar cifras. */
  const precios = {
    'Grand i10 1.2L M/T GL':        { price: 20640.04, pvp: 16107.00, iva: 2577.12,  igtf: 483.21,  tramites: 1472.71 },
    'Grand i10 1.2L A/T GL':        { price: 22681.10, pvp: 17780.00, iva: 2844.80,  igtf: 533.40,  tramites: 1522.90 },
    'Grand i10 1.2L A/T GLS':       { price: 25267.50, pvp: 19900.00, iva: 3184.00,  igtf: 597.00,  tramites: 1586.50 },
    'Grand i10 1.2L A/T GLS Sedán': { price: 26261.80, pvp: 20715.00, iva: 3314.40,  igtf: 621.45,  tramites: 1610.95 },
    'Accent 1.5L A/T GLS':          { price: 32029.50, pvp: 25073.74, iva: 4011.80,  igtf: 752.21,  tramites: 2191.75 },
    'Elantra 2.0L A/T GLS':         { price: 41619.56, pvp: 32923.00, iva: 5267.68,  igtf: 987.69,  tramites: 2441.19 },
    'Creta 1.5L A/T GLS':           { price: 39310.35, pvp: 31030.17, iva: 4964.83,  igtf: 930.91,  tramites: 2384.45 },
    'Tucson 2.0L A/T 2WD GLS':      { price: 50130.00, pvp: 39900.00, iva: 6384.00,  igtf: 1197.00, tramites: 2649.00 },
    'Tucson 2.0L A/T 4WD GLX':      { price: 59525.50, pvp: 47600.00, iva: 7616.00,  igtf: 1428.00, tramites: 2881.50 },
    'Palisade 3.8L A/T 4WD GLS 7P': { price: 124063.50, pvp: 100500.00, iva: 16080.00, igtf: 3015.00, tramites: 4468.50 }
  };

  /* Enriquece cada variante con su precio, para que el comparador pueda mostrarlo */
  models.forEach(function (m) {
    const p = precios[m.name];
    if (p) {
      m.precio = p.price;
      m.pvp = p.pvp;
      m.iva = p.iva;
      m.igtf = p.igtf;
      m.tramites = p.tramites;
    }
  });

  /* Categorias presentes en el catalogo */
  const categories = [
    { id: 'all',      label: 'Todos' },
    { id: 'hatchback',label: 'Hatchback' },
    { id: 'sedan',    label: 'Sedán' },
    { id: 'suv',      label: 'SUV' }
  ];

  /* Etiquetas de las filas del comparador, en este orden */
  const specRows = [
    { key: 'precio',          label: 'Precio total' },
    { key: 'category',        label: 'Categoría' },
    { key: 'motor',           label: 'Motor' },
    { key: 'potencia',        label: 'Potencia' },
    { key: 'transmision',     label: 'Transmisión' },
    { key: 'traccion',        label: 'Tracción' },
    { key: 'combustible',     label: 'Combustible' },
    { key: 'capacidad_tanque', label: 'Tanque' },
    { key: 'largo',           label: 'Largo' },
    { key: 'ancho',           label: 'Ancho' },
    { key: 'alto',            label: 'Alto' },
    { key: 'peso',            label: 'Peso' }
  ];

  /* Formatea un monto con separador de miles: 41619.56 -> $41,619.56 */
  function money(n) {
    if (typeof n !== 'number' || isNaN(n)) return '—';
    return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /* Extrae solo los HP para ordenar/comparar */
  function hp(value) {
    const m = String(value || '').match(/(\d+)\s*HP/i);
    return m ? parseInt(m[1], 10) : 0;
  }

  /* Convierte '3,665 mm' -> 3665 para ordenar */
  function mm(value) {
    const n = parseFloat(String(value || '').replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, ''));
    return isNaN(n) ? 0 : n;
  }

  function kg(value) {
    const n = parseFloat(String(value || '').replace(',', '.').replace(/[^\d.]/g, ''));
    return isNaN(n) ? 0 : n;
  }

  /* Nombre comercial del modelo, sin la parte tecnica (ej. 'Tucson 2.0L A/T 2WD GLS' -> 'Tucson') */
  const FAMILIES = {
    hatchback: 'Grand i10',
    sedan: 'Sedán',
    suv: 'SUV'
  };

  function family(m) {
    if (m.name.indexOf('Grand i10') === 0) return 'Grand i10';
    return m.name.split(' ')[0];
  }

  return { models: models, categories: categories, specRows: specRows, precios: precios, money: money, hp: hp, mm: mm, kg: kg, family: family, FAMILIES: FAMILIES };
})();
