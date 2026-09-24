/* Motor local: respuestas revisadas, coincidencia de frases y contexto de producto.
   No consulta modelos externos ni aprende o almacena las conversaciones. */
window.crearAsistenteJR = function (data, conocimiento = [], preparacion = {}) {
  const normalizar = (value) =>
    String(value)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  // Solo variantes conocidas: evitamos aproximar nombres, montos o condiciones.
  const variantes = {
    q: "que",
    k: "que",
    xfa: "por favor",
    info: "informacion",
    cotisacion: "cotizacion",
    cotisacionn: "cotizacion",
    cotizacionn: "cotizacion",
    cotisar: "cotizar",
    cotisaar: "cotizar",
    dedusible: "deducible",
    dedusibles: "deducibles",
    coasegro: "coaseguro",
    wasap: "whatsapp",
    whats: "whatsapp",
    wassap: "whatsapp",
    watsap: "whatsapp",
  };
  const limpiar = (value) =>
    normalizar(value)
      .split(" ")
      .map((word) => variantes[word] || word)
      .join(" ");
  const tiene = (text, phrase) => ` ${text} `.includes(` ${phrase} `);
  const generales = new Set([
    "productos",
    "auto",
    "hogar",
    "empresa",
    "personas",
    "elegir",
  ]);
  const entradas = [...data.preguntas, ...conocimiento].map((item) => ({
    ...item,
    frases: item.palabras.map(limpiar),
    exacta: limpiar(item.pregunta),
    prioridad: item.prioridad ?? (generales.has(item.id) ? 0 : 8),
  }));
  const porId = new Map(entradas.map((item) => [item.id, item]));
  const temas = {
    auto: ["auto", "autos", "coche", "carro", "vehiculo", "automovil"],
    hogar: ["hogar", "casa", "vivienda", "departamento", "inmueble"],
    empresa: ["negocio", "empresa", "empresarial", "comercio"],
    vida: ["vida"],
    medicos: ["gastos medicos", "gmm", "salud", "seguro medico"],
  };
  const nombres = {
    auto: "tu auto",
    hogar: "tu hogar",
    empresa: "tu negocio",
    vida: "vida",
    medicos: "gastos médicos",
  };
  let temaAnterior = null;
  const derivar = (respuesta, id = "revision-personal") => ({
    id,
    respuesta,
    accion: "whatsapp",
  });
  const obtener = (id) => porId.get(id);
  function responder(question) {
    const clean = limpiar(String(question).slice(0, 500));
    if (!clean)
      return { id: "bienvenida", respuesta: data.asistente.bienvenida };
    if (
      /^(hola|hola buenas|buenos dias|buenas tardes|buenas noches|buenas|hey)( jr)?$/.test(
        clean,
      )
    )
      return { id: "bienvenida", respuesta: data.asistente.bienvenida };
    if (
      /^(gracias|muchas gracias|ok|perfecto|listo|adios|hasta luego)$/.test(
        clean,
      )
    )
      return {
        id: "despedida",
        respuesta:
          "¡Con gusto! Puedes seguir preguntando o continuar con Ramón por WhatsApp.",
        accion: "whatsapp",
      };
    if (/\b(otro tema|empezar de nuevo|reiniciar)\b/.test(clean)) {
      temaAnterior = null;
      return { id: "reinicio", respuesta: data.asistente.bienvenida };
    }
    const presentes = Object.keys(temas).filter((tema) =>
      temas[tema].some((frase) => tiene(clean, frase)),
    );
    const seguimiento =
      /^(y\b|entonces\b|para (ese|esa|eso)\b)/.test(clean) ||
      /^(que (documentos|requisitos|datos) necesito|cuanto cuesta|que cubre|mas informacion|cuentame mas|dime mas)$/.test(
        clean,
      );
    const tema =
      presentes.length === 1
        ? presentes[0]
        : presentes.length > 1
          ? null
          : seguimiento
            ? temaAnterior
            : null;
    if (presentes.length)
      temaAnterior = presentes.length === 1 ? presentes[0] : null;

    // Las peticiones operativas y los casos personales tienen precedencia sobre palabras de producto.
    if (
      /\b(emergencia|urgencia|herid[oa]s?|lesionad[oa]s?|choque|choque mi|me chocaron|robaron|acabo de tener un accidente|tuve un accidente|tuve un siniestro)\b/.test(
        clean,
      )
    )
      return derivar(
        "Si hay una emergencia o personas en peligro, contacta a los servicios de emergencia de tu localidad. Para asistencia o reporte, usa el número de siniestros de tu póliza. Este chat no envía ayuda ni levanta reportes; Ramón puede orientarte con el seguimiento.",
        "emergencia",
      );
    if (
      /\b(mi (poliza|seguro) (esta|sigue) (activo|activa|vigente)|ya estoy (asegurado|protegido))\b/.test(
        clean,
      )
    )
      return obtener("vigencia");
    if (
      /\b(estatus|estado de mi|seguimiento de (mi )?siniestro|mi folio)\b/.test(
        clean,
      )
    )
      return obtener("estatus");
    if (
      /\b(telefono|numero|llamar|reportar)\b/.test(clean) &&
      /\b(siniestro|siniestros|asistencia|accidente)\b/.test(clean)
    )
      return obtener("siniestro");
    if (
      /\b(cancer|diabetes|embarazo|embarazada|preexistencia|preexistencias|enfermedad preexistente|ya estoy enfermo|ya estoy enferma)\b/.test(
        clean,
      )
    )
      return derivar(
        "La aceptación y protección de una condición médica requieren revisar el producto, la solicitud y sus exclusiones con la aseguradora. No puedo confirmar cobertura, costos ni aceptación de tu caso. Ramón puede orientarte por un canal de atención personal.",
      );
    if (
      /\b(cuanto|porcentaje|monto)\b/.test(clean) &&
      /\b(deducible|coaseguro|indemnizacion|me pagan|me pagaran|me reembolsan)\b/.test(
        clean,
      )
    )
      return derivar(
        "El importe depende de la póliza, la cobertura y el evento. Puedo explicar los conceptos, pero no calcular cuánto te corresponde pagar o recibir. Ramón puede revisar los montos y condiciones contigo.",
      );
    if (/\b(eres humano|eres una persona|eres ramon)\b/.test(clean))
      return obtener("asistente");

    const privacidad = obtener("privacidad-chat");
    if (privacidad.frases.some((frase) => tiene(clean, frase)))
      return privacidad;
    if (
      /\b(documentos|requisitos|papeles|informacion necesito|datos necesito|necesito para cotizar)\b/.test(
        clean,
      )
    ) {
      return tema && preparacion[tema]
        ? {
            id: `documentos-${tema}`,
            respuesta:
              preparacion[tema] +
              " No compartas documentos ni datos sensibles aquí.",
            accion: tema === "empresa" ? "whatsapp" : "cotizar",
          }
        : obtener("documentos");
    }
    const ayuda = obtener("cotizador-ayuda");
    if (ayuda.frases.some((frase) => tiene(clean, frase))) return ayuda;
    if (
      /\b(cotizar|cotizacion|cotizador|cuanto cuesta|cuanto sale|precio|costo|tarifa|presupuesto)\b/.test(
        clean,
      ) &&
      !/\b(asesoria|asesoramiento|gratis|gratuita|sin costo|prima|deducible|coaseguro|despues de cotizar)\b/.test(
        clean,
      )
    ) {
      const result = obtener("cotizar");
      if (tema === "empresa")
        return derivar(
          "Para cotizar tu seguro empresarial, continúa con Ramón por WhatsApp. Él revisará el giro y las características de tu negocio para preparar una propuesta.",
          "cotizar-empresa",
        );
      return {
        ...result,
        respuesta: tema
          ? `Para ${nombres[tema]}, puedes solicitar una cotización personalizada. ${result.respuesta}`
          : result.respuesta,
      };
    }
    if (
      tema &&
      /^(y )?(que cubre|que incluye|mas informacion|cuentame mas|dime mas)( por favor)?$/.test(
        clean,
      )
    )
      return obtener(tema === "medicos" ? "gastos-medicos" : tema);

    const ranked = entradas
      .map((item) => {
        const matches = item.frases.filter((frase) => tiene(clean, frase));
        const longest = Math.max(
          0,
          ...matches.map((frase) => frase.split(" ").length),
        );
        return {
          item,
          score: matches.length
            ? longest * 5 +
              Math.min(matches.length, 3) +
              item.prioridad +
              (clean === item.exacta ? 100 : 0)
            : 0,
        };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score);

    // Una pregunta sobre una cobertura personal no se resuelve solo porque mencione "auto" o "hogar".
    if (
      /\b(cubre|cubren|incluye|incluyen|cobertura)\b/.test(clean) &&
      (!ranked.length ||
        generales.has(ranked[0].item.id) ||
        [
          "deducible",
          "coaseguro",
          "prima",
          "poliza",
          "asesoria",
          "suma-asegurada",
        ].includes(ranked[0].item.id))
    ) {
      if (
        tema &&
        /^(hola )?(que (cubre|incluye)|coberturas? (de|del|para)) (el |un |seguro de |seguro del |seguro |de |mi )*(auto|coche|carro|hogar|casa|negocio|empresa|vida|gastos medicos)( por favor)?$/.test(
          clean,
        )
      )
        return obtener(tema === "medicos" ? "gastos-medicos" : tema);
      return derivar(
        "Para saber si ese riesgo está incluido hay que revisar las coberturas, límites y exclusiones del producto. Puedo explicarte conceptos generales; Ramón puede confirmar las condiciones de tu propuesta o póliza.",
      );
    }
    if (ranked.length) return ranked[0].item;
    temaAnterior = null;
    return {
      id: "sin-respuesta",
      respuesta: data.asistente.sinRespuesta,
      accion: "whatsapp",
    };
  }
  return { responder };
};
