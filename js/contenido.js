/* EDITA AQUÍ los datos de contacto, publicaciones y respuestas del asistente.
   Usa rutas relativas, sin una barra / al inicio, para GitHub Pages. */
window.JR_CONTENIDO = {
  contacto: {
    nombre: "Ramón García",
    whatsapp: "524774909866", // Número definitivo confirmado por el propietario.
    mensaje:
      "Hola, Ramón. Vi la página de JR Seguros y me gustaría recibir información para cotizar un seguro.",
    cotizador:
      "https://www.cotizamatico.com.mx/landing/ramon.garciag",
  },
  productos: [
    {
      id: "auto",
      nombre: "Seguro de auto",
      descripcion:
        "Opciones para tu vehículo, los imprevistos del camino y daños a terceros.",
      accion: "Proteger mi auto",
      icono: "auto",
    },
    {
      id: "vida",
      nombre: "Seguro de vida",
      descripcion:
        "Opciones para cuidar el futuro económico de quienes más quieres.",
      accion: "Cuidar su futuro",
      icono: "vida",
    },
    {
      id: "gastos-medicos",
      nombre: "Seguro de gastos médicos mayores",
      descripcion:
        "Opciones para afrontar gastos de atención médica, según la protección contratada.",
      accion: "Cuidar mi salud",
      icono: "medicos",
    },
    {
      id: "hogar",
      nombre: "Seguro de hogar",
      descripcion:
        "Conoce opciones para cuidar tu casa y las cosas que la hacen tuya.",
      accion: "Cuidar mi hogar",
      icono: "hogar",
    },
    {
      id: "empresarial",
      nombre: "Seguro empresarial",
      descripcion:
        "Protección para tu negocio, sus instalaciones, equipo y actividades.",
      accion: "Cuidar mi negocio",
      icono: "empresa",
    },
  ],
  // Para añadir un flyer: coloca la imagen en assets/publicaciones/ y duplica una entrada.
  // El orden aquí es el orden en la página. visible: false oculta una publicación.
  publicaciones: [
    {
      id: "auto",
      categoria: "SEGURO DE AUTO",
      titulo: "Tu camino, con tranquilidad.",
      imagen: "assets/publicaciones/optimized/auto-tranquilidad.webp",
      imagenesAdicionales: [
        {
          imagen: "assets/publicaciones/publicacion-1.jpg",
          alt: "Publicación JR Seguros: protección para tu auto y cotización en línea.",
          titulo: "Tranquilidad en cada kilómetro",
          descripcion:
            "Consulta las opciones y condiciones disponibles para asegurar tu auto.",
        },
      ],
      alt: "Flyer JR Seguros de auto: hombre tranquilo junto a su vehículo, con el logo de JR.",
      descripcion:
        "Consulta opciones para tu auto, sus coberturas, deducibles y asistencias con Ramón.",
      visible: true,
    },
    {
      id: "vida",
      categoria: "SEGURO DE VIDA",
      imagen: "assets/publicaciones/optimized/vida-familia.webp",
      alt: "Flyer JR de seguro de vida: padre y familia compartiendo un momento de armonía en el jardín.",
      titulo: "Para quienes más quieres.",
      descripcion:
        "Conoce opciones de seguro de vida para el futuro económico de tus beneficiarios, según las condiciones del producto.",
      imagenesAdicionales: [
        {
          imagen: "assets/publicaciones/optimized/vida-futuro.webp",
          alt: "Flyer JR de seguro de vida: padre caminando con su hija en un entorno tranquilo.",
          titulo: "Tu tranquilidad, su futuro.",
          descripcion:
            "Consulta con Ramón las sumas aseguradas, beneficiarios y condiciones de una propuesta de vida.",
        },
      ],
      visible: true,
    },
    {
      id: "gastos-medicos",
      categoria: "SEGURO DE GASTOS MÉDICOS MAYORES",
      imagen: "assets/publicaciones/optimized/gmm-tranquilidad.webp",
      alt: "Flyer JR de gastos médicos mayores: hombre conversando con una doctora en un consultorio sereno.",
      titulo: "Tu salud, con tranquilidad.",
      descripcion:
        "Conoce opciones de gastos médicos mayores. Revisa deducible, coaseguro, red hospitalaria y exclusiones con Ramón.",
      imagenesAdicionales: [
        {
          imagen: "assets/publicaciones/optimized/gmm-acompanamiento.webp",
          alt: "Flyer JR de gastos médicos mayores: hombre en un entorno de atención médica tranquilo y acogedor.",
          titulo: "Cuida de ti. Disfruta la vida.",
          descripcion:
            "Consulta una propuesta de gastos médicos mayores para tus necesidades. La aceptación y protección dependen del plan.",
        },
      ],
      visible: true,
    },
    {
      id: "hogar",
      categoria: "SEGURO DE HOGAR",
      titulo: "Tu hogar, tu lugar en calma.",
      imagen: "assets/publicaciones/optimized/hogar-tranquilidad.webp",
      imagenesAdicionales: [
        {
          imagen: "assets/publicaciones/publicacion-2.jpg",
          alt: "Publicación JR Seguros con información sobre protección para el hogar.",
          titulo: "Cuida el lugar al que siempre vuelves",
          descripcion:
            "Pregunta por la protección del inmueble y sus contenidos, según la póliza.",
        },
      ],
      alt: "Flyer JR Seguros de hogar: hombre descansando en la terraza de su casa, con el logo de JR.",
      descripcion:
        "Pregunta por opciones para el inmueble y sus contenidos, según las condiciones del producto.",
      visible: true,
    },
    {
      id: "empresarial",
      categoria: "SEGURO EMPRESARIAL",
      titulo: "Tu esfuerzo, con tranquilidad.",
      imagen: "assets/publicaciones/optimized/empresarial-tranquilidad.webp",
      imagenesAdicionales: [
        {
          imagen: "assets/publicaciones/publicacion-3.jpg",
          alt: "Publicación JR Seguros con información de seguros para negocios.",
          titulo: "Un respaldo para seguir creciendo",
          descripcion:
            "Conoce las opciones de protección para tu actividad y patrimonio empresarial.",
        },
      ],
      alt: "Flyer JR Seguros empresarial: hombre en su taller de diseño y carpintería, con el logo de JR.",
      descripcion:
        "Consulta protección para tu negocio, instalaciones, equipo y actividad, según el producto.",
      visible: true,
    },
  ],
  // Promociones y consejos. Actualiza los flyers al terminar su vigencia.
  ofertas: {
    visible: true,
    titulo: "Ofertas de temporada",
    descripcion: "Promociones y consejos para proteger lo que más importa. Toca una imagen para verla completa.",
    imagenes: [
      { imagen: "assets/ofertas/promociones-aseguradoras.webp", alt: "Promociones de septiembre por aseguradora, con logos de JR Seguros y AARCO", titulo: "Promociones por aseguradora", descripcion: "Válidas del 1 al 30 de septiembre de 2026. Aplican restricciones. Sujetas a cambios sin previo aviso." },
      { imagen: "assets/ofertas/fiestas-patrias.webp", alt: "Promoción de fiestas patrias con hasta 40% de descuento", titulo: "Celebra con protección", descripcion: "Válida del 1 al 30 de septiembre de 2026. Aplican restricciones. Sujeta a cambios sin previo aviso." },
      { imagen: "assets/ofertas/que-hacer-choque.webp", alt: "Cinco pasos si te chocan y la otra persona no tiene seguro", titulo: "¿Qué hacer si te chocan?", descripcion: "Consejos de AARCO para actuar después de un accidente." },
      { imagen: "assets/ofertas/axa-flotillas.webp", alt: "Coberturas de AXA para flotillas", titulo: "Protege tu flotilla con AXA", descripcion: "Aplican restricciones. Consulta términos y condiciones con tu agente." },
      { imagen: "assets/ofertas/sura-auto.webp", alt: "Protección para tu auto con SURA", titulo: "Un rayón duele. Un choque más.", descripcion: "Aplican restricciones. Consulta términos y condiciones con tu agente." },
      { imagen: "assets/ofertas/sura-mercancia.webp", alt: "Protección de mercancía con SURA por cielo, tierra y mar", titulo: "Tu mercancía segura", descripcion: "Aplican restricciones. Consulta términos y condiciones con tu agente." },
    ],
  },
  // Esta misma base alimenta las preguntas visibles y el chatbot local.
  preguntas: [
    {
      id: "productos",
      pregunta: "¿Qué seguros puedo consultar?",
      palabras: [
        "seguros ofrecen",
        "productos",
        "que seguros",
        "tipos de seguro",
        "opciones de seguros",
        "servicios",
      ],
      respuesta:
        "En JR Seguros puedes consultar seguro de auto, seguro de vida, seguro de gastos médicos mayores, seguro de hogar y seguro empresarial. Ramón puede ayudarte a revisar qué opción se ajusta a lo que quieres proteger.",
      visible: true,
    },
    {
      id: "cotizar",
      pregunta: "¿Cómo puedo cotizar?",
      palabras: [
        "cotizar",
        "cotizacion",
        "cotizador",
        "precio",
        "cuanto cuesta",
        "costo",
        "tarifa",
      ],
      respuesta:
        "Puedes cotizar auto, vida, gastos médicos mayores y hogar en nuestro cotizador en línea. Se abrirá otra pestaña con un aviso durante 3 segundos antes del cotizador: si completas la cotización, recibirás un correo de tuseguro@aarco.com.mx. Para seguro empresarial, contacta a Ramón por WhatsApp. El precio depende del producto, tus datos y las coberturas elegidas; el asistente no calcula precios.",
      accion: "cotizar",
      visible: true,
    },
    {
      id: "asesoria",
      pregunta: "¿La asesoría tiene costo?",
      palabras: [
        "asesoria",
        "asesoramiento",
        "sin costo",
        "gratis",
        "gratuita",
      ],
      respuesta:
        "La asesoría y la solicitud de cotización no tienen costo ni compromiso. Contratar un seguro sí implica el pago de la prima indicada en la propuesta de la aseguradora.",
      visible: true,
    },
    {
      id: "elegir",
      pregunta: "¿Y si no sé qué seguro necesito?",
      palabras: [
        "no se que seguro",
        "elegir",
        "recomienda",
        "que seguro necesito",
        "me conviene",
        "mejor seguro",
      ],
      respuesta:
        "Cuéntale a Ramón qué quieres proteger y qué dudas tienes. Puede orientarte para comparar opciones, coberturas y condiciones antes de que decidas.",
      accion: "whatsapp",
      visible: true,
    },
    {
      id: "seguimiento",
      pregunta: "¿Puedo dar seguimiento por WhatsApp?",
      palabras: [
        "whatsapp",
        "seguimiento",
        "contacto",
        "asesor",
        "ramon",
        "hablar con alguien",
        "hablar con ramon",
        "humano",
        "telefono",
      ],
      respuesta:
        "Sí. El botón de WhatsApp abre una conversación directa con Ramón García, con un mensaje preparado para que tú lo envíes. Puedes continuar ahí tus dudas, cotización o seguimiento.",
      accion: "whatsapp",
      visible: true,
    },
    {
      id: "auto",
      pregunta: "¿Qué opciones hay para mi auto?",
      palabras: [
        "auto",
        "autos",
        "coche",
        "carro",
        "vehiculo",
        "automovil",
        "amplia",
        "limitada",
        "responsabilidad civil",
      ],
      respuesta:
        "Puedes consultar opciones de cobertura amplia, limitada o responsabilidad civil para tu auto. La protección incluida, los deducibles y las asistencias dependen de la póliza. Revisa tu propuesta con Ramón para confirmar los detalles.",
      accion: "cotizar",
    },
    {
      id: "hogar",
      pregunta: "¿Qué puedo proteger en mi hogar?",
      palabras: ["hogar", "casa", "departamento", "inmueble", "contenidos"],
      respuesta:
        "El seguro de hogar puede contemplar el inmueble y sus contenidos. Las protecciones ante incendio, robo u otros eventos dependen del plan contratado. Ramón puede revisar las opciones para tu caso.",
      accion: "cotizar",
    },
    {
      id: "empresa",
      pregunta: "¿Tienen seguros para negocios?",
      palabras: [
        "empresa",
        "empresarial",
        "negocio",
        "comercio",
        "mercancia",
        "equipo",
        "local",
      ],
      respuesta:
        "Puedes consultar seguros empresariales para instalaciones, equipo, mercancía y responsabilidad civil, según el producto. Las opciones dependen del giro y las características del negocio.",
      accion: "whatsapp",
    },
    {
      id: "personas",
      pregunta: "¿Qué seguros hay para personas?",
      palabras: [
        "persona",
        "personas",
        "vida",
        "salud",
        "medico",
        "medicos",
        "familia",
        "hospital",
        "gastos medicos",
      ],
      respuesta:
        "Puedes consultar seguro de vida y seguro de gastos médicos mayores como productos separados. La aceptación, las exclusiones, los periodos de espera y los montos dependen de cada producto. Para revisar un caso personal, habla con Ramón.",
      accion: "cotizar",
    },
    {
      id: "aseguradoras",
      pregunta: "¿Con qué aseguradoras trabajan?",
      palabras: [
        "aseguradora",
        "aseguradoras",
        "qualitas",
        "afirme",
        "sura",
        "chubb",
        "mapfre",
        "ana seguros",
        "axa",
        "banorte",
        "hdi",
        "zurich",
        "companias",
      ],
      respuesta:
        "Nuestros aliados presentados en la web son Afirme, SURA, Chubb, MAPFRE, Banorte, HDI, ANA Seguros, AXA, Quálitas y Zurich. La disponibilidad depende del ramo y del producto. Confirma con Ramón las opciones para tu cotización.",
      accion: "whatsapp",
    },
    {
      id: "deducible",
      pregunta: "¿Qué es el deducible?",
      palabras: ["deducible", "deducibles"],
      respuesta:
        "El deducible es la cantidad o porcentaje que queda a tu cargo en ciertos siniestros, conforme a tu póliza. El monto y cuándo aplica se revisan en las condiciones del seguro.",
    },
    {
      id: "documentos",
      pregunta: "¿Qué información necesito para cotizar?",
      palabras: ["documentos", "requisitos", "que datos", "papeles"],
      respuesta:
        "La información necesaria depende del seguro. Para auto, ten a mano marca, modelo, año y uso del vehículo. El cotizador o Ramón te indicarán los datos adicionales. No compartas documentos ni datos sensibles en este chat.",
      accion: "cotizar",
    },
    {
      id: "siniestro",
      pregunta: "¿Cómo reporto un siniestro?",
      palabras: [
        "siniestro",
        "accidente",
        "choque",
        "emergencia",
        "robaron",
        "urgencia",
      ],
      respuesta:
        "Para reportar un siniestro, usa el número de asistencia o siniestros de tu póliza. Este chat no recibe reportes ni envía asistencia. También puedes contactar a Ramón para orientación sobre el seguimiento.",
      accion: "whatsapp",
    },
    {
      id: "asistente",
      pregunta: "¿Cómo funciona este asistente?",
      palabras: [
        "inteligencia artificial",
        "chatbot",
        "robot",
        "bot",
        "asistente",
        "eres ia",
      ],
      respuesta:
        "Soy un asistente automático de preguntas frecuentes. Respondo con la información publicada por JR Seguros; no calculo primas ni confirmo coberturas de una póliza. Si tu pregunta necesita revisión personal, puedes hablar con Ramón.",
      accion: "whatsapp",
    },
  ],
  asistente: {
    bienvenida:
      "¡Hola! Soy el asistente de JR Seguros. Puedo explicarte nuestros seguros, deducibles y coaseguros, qué preparar para cotizar y cómo dar seguimiento con Ramón. ¿Qué te gustaría saber?",
    sugerencias: [
      "¿Qué seguros ofrecen?",
      "Quiero cotizar",
      "Hablar por WhatsApp",
    ],
    sinRespuesta:
      "No tengo información suficiente para responder esa pregunta. Puedo ayudarte con autos, hogar, negocios, vida, gastos médicos y cómo cotizar. Para confirmar detalles de tu caso, habla con Ramón por WhatsApp.",
  },
};
