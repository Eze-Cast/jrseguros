/* Base ampliable del asistente. Información general, no condiciones de una póliza.
   Agrega entradas siguiendo docs/CONOCIMIENTO-CHATBOT.md. No pegues datos de clientes.
   Referencias y fecha de revisión: docs/CONOCIMIENTO-CHATBOT.md. */
window.JR_CONOCIMIENTO = [
  {
    id: "poliza",
    pregunta: "¿Qué es una póliza?",
    palabras: ["poliza", "polizas", "contrato de seguro", "caratula"],
    respuesta:
      "La póliza documenta tu seguro. En la carátula y las condiciones puedes revisar quién está asegurado, qué riesgos se cubren, vigencia, montos y exclusiones. Conserva también los endosos o modificaciones.",
    fuente: "conceptos",
  },
  {
    id: "prima",
    pregunta: "¿Qué es la prima?",
    palabras: ["prima", "primas", "prima del seguro"],
    respuesta:
      "La prima es el precio del seguro. Es distinta del deducible, que puede quedar a tu cargo al ocurrir un siniestro cubierto. La propuesta indica el importe y la forma de pago.",
    fuente: "conceptos",
  },
  {
    id: "suma-asegurada",
    pregunta: "¿Qué significa suma asegurada?",
    palabras: ["suma asegurada", "sumas aseguradas", "limite de indemnizacion"],
    respuesta:
      "Es el límite de protección económica establecido para una cobertura. No significa que siempre se pague esa cantidad: la indemnización depende del evento y de lo pactado en la póliza.",
    fuente: "conceptos",
  },
  {
    id: "exclusiones",
    pregunta: "¿Qué son las exclusiones?",
    palabras: [
      "exclusion",
      "exclusiones",
      "excluye",
      "excluyen",
      "que no cubre",
    ],
    respuesta:
      "Son situaciones o riesgos que el contrato deja fuera de la protección. Pide revisar las exclusiones antes de contratar; no hay una lista única que aplique a todos los seguros.",
    fuente: "conceptos",
    accion: "whatsapp",
  },
  {
    id: "vigencia",
    pregunta: "¿Desde cuándo estoy protegido?",
    palabras: [
      "vigencia",
      "cuando empieza",
      "cuando inicia",
      "desde cuando",
      "ya estoy asegurado",
      "ya estoy protegido",
      "activacion",
      "se activa",
    ],
    respuesta:
      "Solicitar una cotización no activa un seguro. Confirma con Ramón la emisión, la fecha y hora de inicio de tu póliza y las condiciones de pago. Desde este chat no puedo verificar si una póliza está vigente.",
    accion: "whatsapp",
  },
  {
    id: "coaseguro",
    pregunta: "¿Qué es el coaseguro?",
    palabras: ["coaseguro", "coaseguros", "co seguro"],
    respuesta:
      "En gastos médicos, es el porcentaje de los gastos cubiertos que pagas después de aplicar el deducible. Revisa el porcentaje y si existe un tope en tu plan; el asistente no calcula el importe de un caso real.",
    fuente: "medicos",
  },
  {
    id: "deducible-coaseguro",
    pregunta: "¿En qué se diferencian deducible y coaseguro?",
    palabras: [
      "deducible y coaseguro",
      "coaseguro y deducible",
      "diferencia entre deducible",
    ],
    respuesta:
      "En gastos médicos, primero se aplica el deducible indicado en la póliza. El coaseguro es tu porcentaje de participación en los gastos cubiertos restantes. Son conceptos diferentes y ambos pueden aplicar al mismo evento.",
    fuente: "medicos",
  },
  {
    id: "reembolso",
    pregunta: "¿Qué es pago directo y reembolso?",
    palabras: ["reembolso", "reembolsos", "pago directo"],
    respuesta:
      "En pago directo, la aseguradora paga al prestador conforme a las condiciones del seguro. En reembolso, primero pagas tú y luego solicitas la revisión de gastos. Ramón puede ayudarte a identificar el procedimiento y los documentos de tu aseguradora; el pago no se autoriza desde aquí.",
    fuente: "medicos",
    accion: "whatsapp",
  },
  {
    id: "espera",
    pregunta: "¿Qué es un periodo de espera?",
    palabras: [
      "periodo de espera",
      "periodos de espera",
      "tiempo de espera",
      "carencia",
    ],
    respuesta:
      "Es el tiempo que debe transcurrir para ciertas coberturas, cuando el contrato lo establece. El plazo depende del producto y de la cobertura; confirma el aplicable antes de contratar.",
    fuente: "medicos",
    accion: "whatsapp",
  },
  {
    id: "beneficiarios",
    pregunta: "¿Qué es un beneficiario?",
    palabras: [
      "beneficiario",
      "beneficiarios",
      "quien cobra el seguro de vida",
    ],
    respuesta:
      "Es la persona designada para recibir el beneficio previsto en el seguro cuando procede. En vida, revisa que los nombres y la distribución estén correctos. Para cambiar beneficiarios, solicita el trámite a Ramón; escribirlo aquí no modifica la póliza.",
    fuente: "educacion",
    accion: "whatsapp",
  },
  {
    id: "vida",
    pregunta: "¿Para qué sirve un seguro de vida?",
    palabras: ["seguro de vida", "vida", "fallecimiento", "fallecer"],
    respuesta:
      "El seguro de vida puede proporcionar apoyo económico a los beneficiarios ante el fallecimiento cubierto del asegurado. Otros beneficios dependen del plan. Ramón puede explicarte las opciones y sus condiciones.",
    fuente: "educacion",
    accion: "cotizar",
  },
  {
    id: "gastos-medicos",
    pregunta: "¿Para qué sirve gastos médicos mayores?",
    palabras: [
      "gastos medicos",
      "gmm",
      "seguro medico",
      "seguro de salud",
      "hospitalizacion",
    ],
    respuesta:
      "Ayuda a afrontar gastos de atención médica cubiertos por la póliza. Al comparar, revisa deducible, coaseguro, red hospitalaria y exclusiones. No todas las consultas o tratamientos están incluidos; Ramón puede revisar el plan contigo.",
    fuente: "contratar",
    accion: "cotizar",
  },
  {
    id: "vida-medicos",
    pregunta: "¿Vida y gastos médicos son lo mismo?",
    palabras: [
      "vida y gastos medicos",
      "gastos medicos y vida",
      "vida o gastos medicos",
      "vida y salud",
    ],
    respuesta:
      "Tienen objetivos distintos: vida puede dar apoyo económico a los beneficiarios ante un fallecimiento cubierto; gastos médicos ayuda con la atención médica cubierta del asegurado. Las condiciones y beneficios se revisan por separado.",
    fuente: "educacion",
    accion: "cotizar",
  },
  {
    id: "hospitales",
    pregunta: "¿Puedo elegir cualquier hospital?",
    palabras: [
      "hospital",
      "hospitales",
      "red hospitalaria",
      "medico de mi eleccion",
      "cualquier medico",
    ],
    respuesta:
      "No tengo el directorio ni las reglas de tu plan. Antes de programar atención, confirma con tu aseguradora qué hospital, médico y nivel están contemplados y si se necesita autorización. Ramón puede orientarte para revisarlo.",
    accion: "whatsapp",
  },
  {
    id: "amplia-limitada",
    pregunta: "¿Qué diferencia hay entre amplia y limitada?",
    palabras: [
      "amplia y limitada",
      "limitada y amplia",
      "amplia o limitada",
      "tipos de cobertura",
    ],
    respuesta:
      "Como referencia, responsabilidad civil protege frente a daños a terceros; limitada suele añadir robo total, y amplia suele añadir daños al propio auto. Los paquetes cambian entre aseguradoras: confirma coberturas, límites y deducibles en la propuesta.",
    fuente: "auto",
    accion: "cotizar",
  },
  {
    id: "responsabilidad-civil",
    pregunta: "¿Qué es responsabilidad civil?",
    palabras: ["responsabilidad civil", "rc", "danos a terceros", "terceros"],
    respuesta:
      "Es protección frente a daños que puedas causar a otras personas o sus bienes, dentro de lo pactado. En auto, esa cobertura por sí sola no equivale a asegurar los daños de tu propio vehículo.",
    fuente: "auto",
  },
  {
    id: "robo-auto",
    pregunta: "¿Robo total y robo de autopartes son lo mismo?",
    palabras: [
      "robo total",
      "robo parcial",
      "autopartes",
      "robo de piezas",
      "robo de auto",
    ],
    respuesta:
      "Son riesgos distintos. La protección de robo total no implica automáticamente cobertura de autopartes o accesorios. Pide a Ramón revisar qué está contratado y qué deducible aplica antes de darlo por incluido.",
    fuente: "auto",
    accion: "whatsapp",
  },
  {
    id: "asistencia-vial",
    pregunta: "¿El seguro tiene grúa o asistencia vial?",
    palabras: [
      "grua",
      "asistencia vial",
      "ponchadura",
      "paso de corriente",
      "quede varado",
      "quede tirado",
    ],
    respuesta:
      "Las asistencias y sus límites dependen del plan. Si necesitas ayuda ahora, llama al servicio de asistencia indicado en tu póliza. Este chat no solicita grúas, no conoce tu ubicación ni puede confirmar tiempos de llegada.",
    accion: "whatsapp",
  },
  {
    id: "uso-vehiculo",
    pregunta: "¿Puedo asegurar un auto de plataforma o reparto?",
    palabras: [
      "uber",
      "didi",
      "plataforma",
      "reparto",
      "taxi",
      "uso comercial",
      "uso particular",
    ],
    respuesta:
      "Indica a Ramón el uso real del vehículo: particular, plataforma, reparto o trabajo. No tengo confirmada la disponibilidad para cada uso. Es necesario revisar que el producto propuesto corresponda a tu actividad.",
    accion: "whatsapp",
  },
  {
    id: "otros-vehiculos",
    pregunta: "¿Aseguran motos o flotillas?",
    palabras: [
      "moto",
      "motos",
      "motocicleta",
      "flotilla",
      "flotillas",
      "camion",
      "camiones",
    ],
    respuesta:
      "La web presenta el ramo de autos, pero no tengo confirmados productos para motos, camiones o flotillas. Comparte con Ramón el tipo de vehículo y uso para consultar disponibilidad.",
    accion: "whatsapp",
  },
  {
    id: "hogar-renta",
    pregunta: "¿Qué pasa si rento mi vivienda?",
    palabras: [
      "rento",
      "rentada",
      "inquilino",
      "arrendatario",
      "casa rentada",
      "departamento rentado",
    ],
    respuesta:
      "Dile a Ramón si eres propietario o inquilino y si quieres proteger el inmueble, tus pertenencias o ambos. Así podrá consultar una propuesta adecuada a lo que deseas asegurar; la disponibilidad se confirma con la aseguradora.",
    accion: "whatsapp",
  },
  {
    id: "inmueble-contenidos",
    pregunta: "¿Qué son inmueble y contenidos?",
    palabras: [
      "inmueble y contenidos",
      "contenidos",
      "muebles",
      "electrodomesticos",
      "pertenencias",
    ],
    respuesta:
      "El inmueble es la construcción; los contenidos son bienes dentro de ella, como muebles. Una propuesta de hogar puede contemplarlos de forma distinta. Revisa qué bienes se incluyen y los límites de cada cobertura.",
    fuente: "educacion",
    accion: "whatsapp",
  },
  {
    id: "riesgos-hogar",
    pregunta: "¿Puedo consultar protección ante inundación o sismo?",
    palabras: [
      "inundacion",
      "inundaciones",
      "sismo",
      "terremoto",
      "huracan",
      "fenomenos naturales",
      "incendio",
    ],
    respuesta:
      "Esos riesgos deben revisarse en las coberturas y exclusiones de la propuesta. Indica si quieres proteger una vivienda, negocio o vehículo y Ramón podrá consultar las opciones. No puedo confirmar que estén incluidos en una póliza concreta.",
    accion: "whatsapp",
  },
  {
    id: "comparar",
    pregunta: "¿Cómo comparo dos propuestas?",
    palabras: [
      "comparar",
      "comparacion",
      "dos propuestas",
      "mas barato",
      "mas economico",
      "mejor precio",
    ],
    respuesta:
      "Compara el mismo tipo de protección: precio total, suma asegurada, deducibles, exclusiones, asistencias y forma de pago. Una prima menor puede corresponder a condiciones diferentes. Ramón puede ayudarte a leer ambas propuestas.",
    fuente: "contratar",
    accion: "whatsapp",
  },
  {
    id: "contratar",
    pregunta: "¿Cómo contrato después de cotizar?",
    palabras: [
      "contratar",
      "contratacion",
      "comprar seguro",
      "despues de cotizar",
      "aceptar cotizacion",
    ],
    respuesta:
      "Primero revisa la propuesta y aclara tus dudas con Ramón. Él te indicará los pasos, documentos y medios de pago correspondientes. Este chat no emite pólizas, recibe pagos ni confirma contrataciones.",
    accion: "whatsapp",
  },
  {
    id: "renovacion",
    pregunta: "¿Cómo renuevo mi seguro?",
    palabras: ["renovar", "renovacion", "vence", "vencer", "vencimiento"],
    respuesta:
      "Contacta a Ramón antes del vencimiento para revisar la propuesta de renovación, el precio y posibles cambios. No asumas que la renovación es automática: confirma las nuevas fechas y el pago con tu aseguradora.",
    accion: "whatsapp",
  },
  {
    id: "cambios",
    pregunta: "¿Cómo corrijo o actualizo mi póliza?",
    palabras: [
      "endoso",
      "endosos",
      "corregir",
      "actualizar poliza",
      "cambiar datos",
      "cambio de domicilio",
      "vendi mi auto",
      "cambie de auto",
      "error en mi poliza",
    ],
    respuesta:
      "Solicita a Ramón la revisión del cambio o corrección. La aseguradora debe confirmar cómo se formaliza y si modifica el precio o las condiciones. El chat no cambia datos de pólizas ni recibe documentos.",
    accion: "whatsapp",
  },
  {
    id: "cancelacion",
    pregunta: "¿Cómo cancelo un seguro?",
    palabras: ["cancelar", "cancelacion", "dar de baja", "devolucion"],
    respuesta:
      "Ramón puede orientarte sobre el procedimiento de tu aseguradora. Plazos, cargos o posibles devoluciones requieren revisar tu contrato. Escribir aquí no cancela la póliza ni inicia una solicitud formal.",
    accion: "whatsapp",
  },
  {
    id: "pagos",
    pregunta: "¿Puedo pagar a meses o con tarjeta?",
    palabras: [
      "pagar",
      "pagos",
      "tarjeta",
      "transferencia",
      "mensualidades",
      "meses sin intereses",
      "pago mensual",
      "forma de pago",
      "formas de pago",
      "pago anual",
    ],
    respuesta:
      "Las formas de pago, parcialidades y posibles recargos se confirman en la propuesta. No tengo acuerdos de meses sin intereses ni cuentas bancarias publicados. Solicita a Ramón el medio de pago autorizado; este chat no cobra.",
    accion: "whatsapp",
  },
  {
    id: "pago-atrasado",
    pregunta: "¿Qué hago si me atrasé con un pago?",
    palabras: [
      "pago atrasado",
      "me atrase",
      "no pague",
      "deje de pagar",
      "recibo vencido",
      "periodo de gracia",
    ],
    respuesta:
      "Comunícate con Ramón o tu aseguradora para revisar el estado de la póliza y cómo regularizarla. No puedo asegurar que siga activa ni que un pago tardío restablezca la cobertura; eso requiere confirmación de la compañía.",
    accion: "whatsapp",
  },
  {
    id: "factura",
    pregunta: "¿Cómo solicito mi factura o recibo?",
    palabras: [
      "factura",
      "facturacion",
      "cfdi",
      "recibo",
      "comprobante de pago",
    ],
    respuesta:
      "Solicita a Ramón orientación para obtener tu factura, recibo o comprobante con la aseguradora. No tengo acceso a pagos ni documentos fiscales. Comparte los datos necesarios únicamente por el canal que te indique el asesor.",
    accion: "whatsapp",
  },
  {
    id: "estatus",
    pregunta: "¿Pueden revisar el estado de mi trámite?",
    palabras: [
      "estatus",
      "estado de mi",
      "numero de poliza",
      "copia de mi poliza",
      "seguimiento de siniestro",
      "seguimiento de mi siniestro",
      "mi folio",
    ],
    respuesta:
      "No tengo acceso a expedientes, pólizas o folios. Para consultar un trámite, continúa con Ramón por WhatsApp o con tu aseguradora. El asistente no puede confirmar autorizaciones ni fechas de pago.",
    accion: "whatsapp",
  },
  {
    id: "ofertas",
    pregunta: "¿Qué promociones tienen?",
    palabras: [
      "promocion",
      "promociones",
      "oferta",
      "ofertas",
      "descuento",
      "descuentos",
      "buen fin",
      "temporada",
    ],
    respuesta:
      "Consulta el apartado Ofertas de temporada. Un espacio que dice «Próximamente» todavía no anuncia una promoción. Si ves un flyer, confirma con Ramón su vigencia, disponibilidad y condiciones antes de contratar.",
    accion: "whatsapp",
  },
  {
    id: "horarios",
    pregunta: "¿Cuál es el horario y dónde están?",
    palabras: [
      "horario",
      "horarios",
      "direccion",
      "ubicacion",
      "oficina",
      "oficinas",
      "donde estan",
      "donde se encuentran",
      "atienden hoy",
      "abren",
      "cierran",
    ],
    respuesta:
      "No tenemos un horario ni domicilio de atención publicados en esta web. Puedes escribir a Ramón por WhatsApp para coordinar la atención. No puedo confirmar disponibilidad inmediata ni tiempos de respuesta.",
    accion: "whatsapp",
  },
  {
    id: "privacidad-chat",
    pregunta: "¿Puedo enviar mis documentos aquí?",
    palabras: [
      "privacidad",
      "datos personales",
      "guardan",
      "conversaciones",
      "enviar documentos",
      "adjuntar",
      "ine",
      "curp",
      "rfc",
      "historial medico",
    ],
    respuesta:
      "Este asistente responde dentro de tu navegador y no guarda ni envía la conversación. No adjuntes documentos, datos bancarios o información médica aquí. WhatsApp y el cotizador son servicios externos; Ramón te indicará el canal apropiado para los datos de tu trámite.",
  },
  {
    id: "publicaciones",
    pregunta: "¿Cómo veo los flyers?",
    palabras: [
      "flyer",
      "flyers",
      "publicaciones",
      "carrusel",
      "ver imagenes",
      "ampliar imagen",
    ],
    respuesta:
      "En Publicaciones puedes cambiar de imagen con las flechas, los puntos o deslizando en el celular. Toca un flyer para ampliarlo y usa su enlace de WhatsApp para pedir información. Los espacios «Próximamente» están reservados para contenido futuro.",
  },
  {
    id: "cotizador-ayuda",
    pregunta: "¿Qué hago si el cotizador no abre?",
    palabras: [
      "cotizador no abre",
      "no abre el cotizador",
      "no puedo cotizar",
      "no funciona el cotizador",
      "error al cotizar",
    ],
    respuesta:
      "El cotizador se abre en un servicio externo. Puedes intentar abrirlo de nuevo desde el botón o continuar con Ramón por WhatsApp para recibir ayuda. Este chat no puede consultar errores ni resultados de ese servicio.",
    accion: "whatsapp",
  },
];

// Respuestas de preparación, adaptadas al producto mencionado en la conversación.
window.JR_PREPARAR_COTIZACION = {
  auto: "Para empezar con tu auto, prepara marca, modelo, año, versión y uso del vehículo. Ramón o el cotizador te indicarán los datos adicionales para tu propuesta.",
  hogar:
    "Para empezar con hogar, prepara el tipo de vivienda, ubicación general, si eres propietario o inquilino y si quieres proteger construcción, contenidos o ambos. Ramón confirmará los requisitos del producto.",
  empresa:
    "Para empezar con tu negocio, prepara el giro, ubicación general y qué instalaciones, equipo o mercancía deseas proteger. Ramón te indicará los datos y documentos que requiera la aseguradora.",
  vida: "Para consultar vida, piensa a quién quieres proteger y el objetivo del seguro. Ramón te indicará qué datos y solicitud requiere el producto. No envíes datos de beneficiarios ni información médica por este chat.",
  medicos:
    "Para consultar gastos médicos, indica a Ramón si buscas protección individual o familiar. Él te explicará qué datos y solicitud necesita la aseguradora. No escribas diagnósticos ni documentos médicos en este chat.",
};

window.JR_FUENTES_CHAT = {
  conceptos: {
    nombre: "CONDUSEF · Conceptos del seguro",
    url: "https://www.condusef.gob.mx/documentos/275535_Seguros.pdf",
  },
  medicos: {
    nombre: "CONDUSEF · Gastos médicos",
    url: "https://www.condusef.gob.mx/?idc=1434&idcat=1&p=contenido",
  },
  auto: {
    nombre: "CONDUSEF · Coberturas de auto",
    url: "https://webappsos.condusef.gob.mx/SimuladorSeguroAutomovil/coberturas.jsp",
  },
  educacion: {
    nombre: "CONDUSEF · Educación sobre seguros",
    url: "https://webappsos.condusef.gob.mx/EducaTuCartera/seguros.html",
  },
  contratar: {
    nombre: "CONDUSEF · Antes de contratar",
    url: "https://www.condusef.gob.mx/?idc=1722&idcat=3&p=contenido",
  },
};
