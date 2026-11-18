/* Datos del diseño 2026-11.
   La mayor parte se lee de js/contenido.js (contacto, publicaciones, ofertas,
   preguntas y asistente) y de js/conocimiento.js (respuestas extra del asistente),
   así que esos archivos se siguen editando igual que antes.
   Aquí solo vive lo propio del diseño: tarjetas de seguros, selector de la portada
   y logos de aseguradoras. */
(() => {
  const C = window.JR_CONTENIDO || {};
  const K = Array.isArray(window.JR_CONOCIMIENTO) ? window.JR_CONOCIMIENTO : [];
  const contacto = Object.assign(
    {
      nombre: "Ramón García",
      whatsapp: "524774909866",
      mensaje: "Hola, Ramón. Vi la página de JR Seguros y me gustaría recibir información para cotizar un seguro.",
      cotizador: "https://www.cotizamatico.com.mx/landing/ramon.garciag",
    },
    C.contacto || {}
  );
  contacto.whatsapp = String(contacto.whatsapp).replace(/\D/g, "");

  const publicaciones = (C.publicaciones || [])
    .filter((p) => p.visible !== false)
    .map((p) => ({
      id: p.id,
      categoria: p.categoria,
      titulo: p.titulo,
      descripcion: p.descripcion,
      imagenes: [{ src: p.imagen, alt: p.alt }].concat(
        (p.imagenesAdicionales || []).map((i) => ({ src: i.imagen, alt: i.alt }))
      ),
    }));

  const of = C.ofertas || {};
  const ofImgs = (of.imagenes || []).map((i) => ({ src: i.imagen, titulo: i.titulo, desc: i.descripcion }));
  const ofertas = {
    visible: of.visible !== false && ofImgs.length > 0,
    descripcion: of.descripcion || "",
    nota: (ofImgs[0] && ofImgs[0].desc) || "",
    imagenes: ofImgs,
  };

  // Preguntas visibles de contenido.js + base ampliada de conocimiento.js (sin repetir).
  const preguntas = (C.preguntas || []).slice();
  const ids = new Set(preguntas.map((q) => q.id));
  K.forEach((q) => { if (!ids.has(q.id)) { ids.add(q.id); preguntas.push(Object.assign({}, q, { visible: false })); } });

  const pub = "assets/publicaciones/optimized/";
  window.JR = {
    contacto,
    publicaciones,
    ofertas,
    preguntas,
    asistente: C.asistente || { bienvenida: "¡Hola! ¿En qué te ayudo?", sugerencias: [], sinRespuesta: "Para confirmar detalles de tu caso, habla con Ramón por WhatsApp." },

    productos: [
      { id: "auto", nombre: "Auto", titulo: "Seguro de auto", descripcion: "Opciones para tu vehículo, los imprevistos del camino y daños a terceros.", detalles: ["Cobertura amplia", "Limitada", "Responsabilidad civil"], accion: "Proteger mi auto", imagen: pub + "auto-tranquilidad.webp", cotizable: true },
      { id: "vida", nombre: "Vida", titulo: "Seguro de vida", descripcion: "Opciones para cuidar el futuro económico de quienes más quieres.", detalles: ["Suma asegurada", "Beneficiarios", "Futuro familiar"], accion: "Cuidar su futuro", imagen: pub + "vida-familia.webp", cotizable: true },
      { id: "gastos-medicos", nombre: "Gastos médicos", titulo: "Gastos médicos mayores", descripcion: "Opciones para afrontar gastos de atención médica, según la protección contratada.", detalles: ["Deducible", "Coaseguro", "Red hospitalaria"], accion: "Cuidar mi salud", imagen: pub + "gmm-tranquilidad.webp", cotizable: true },
      { id: "hogar", nombre: "Hogar", titulo: "Seguro de hogar", descripcion: "Conoce opciones para cuidar tu casa y las cosas que la hacen tuya.", detalles: ["Inmueble", "Contenidos", "Imprevistos"], accion: "Cuidar mi hogar", imagen: pub + "hogar-tranquilidad.webp", cotizable: true },
      // Empresarial se atiende por WhatsApp (no está en el cotizador en línea).
      { id: "empresarial", nombre: "Empresa", titulo: "Seguro empresarial", descripcion: "Protección para tu negocio, sus instalaciones, equipo y actividades.", detalles: ["Instalaciones", "Equipo y mercancía", "Responsabilidad civil"], accion: "Cuidar mi negocio", imagen: pub + "empresarial-tranquilidad.webp", cotizable: false },
    ],

    // Selector de la portada. "pos" encuadra la foto (horizontal vertical).
    hero: [
      { id: "todo", chip: "Todo", titulo: "Tu patrimonio", texto: "Auto, vida, salud, hogar y negocio", imagen: "assets/images/optimized/portada-patrimonio.webp", pos: "30% center", producto: null },
      { id: "auto", chip: "Auto", titulo: "Seguro de auto", texto: "Amplia, limitada o responsabilidad civil", imagen: pub + "auto-tranquilidad.webp", pos: "80% center", producto: "seguro de auto" },
      { id: "vida", chip: "Vida", titulo: "Seguro de vida", texto: "El futuro de quienes más quieres", imagen: pub + "vida-familia.webp", pos: "72% center", producto: "seguro de vida" },
      { id: "gmm", chip: "Salud", titulo: "Gastos médicos mayores", texto: "Deducible, coaseguro y red hospitalaria", imagen: pub + "gmm-tranquilidad.webp", pos: "74% center", producto: "seguro de gastos médicos mayores" },
      { id: "hogar", chip: "Hogar", titulo: "Seguro de hogar", texto: "Tu casa y lo que la hace tuya", imagen: pub + "hogar-tranquilidad.webp", pos: "84% center", producto: "seguro de hogar" },
      { id: "empresa", chip: "Negocio", titulo: "Seguro empresarial", texto: "Instalaciones, equipo y actividad", imagen: pub + "empresarial-tranquilidad.webp", pos: "84% center", producto: "seguro empresarial", soloWhatsapp: true },
    ],

    // Logos: Wikimedia Commons (SVG); Quálitas y ANA recortados del flyer AARCO.
    // "h" = altura en px para que todos tengan el mismo peso visual.
    aliados: [
      { nombre: "Afirme Seguros", logo: "assets/logos/afirme.svg", h: 30 },
      { nombre: "SURA", logo: "assets/logos/sura.svg", h: 40 },
      { nombre: "Chubb", logo: "assets/logos/chubb.svg", h: 26 },
      { nombre: "MAPFRE", logo: "assets/logos/mapfre.svg", h: 28 },
      { nombre: "Banorte", logo: "assets/logos/banorte.svg", h: 24 },
      { nombre: "HDI Seguros", logo: "assets/logos/hdi.svg", h: 38 },
      { nombre: "ANA Seguros", logo: "assets/logos/ana.png", h: 46 },
      { nombre: "AXA", logo: "assets/logos/axa.svg", h: 52 },
      { nombre: "Quálitas", logo: "assets/logos/qualitas.png", h: 40 },
      { nombre: "Zurich", logo: "assets/logos/zurich.svg", h: 36 },
    ],
  };
})();
