# Conocimiento del asistente JR

Ampliación revisada el 22 de septiembre de 2026. El chat combina **51 entradas** con respuestas de preparación para cinco productos: auto, hogar, negocio, vida y gastos médicos.

## Qué puede explicar

- Los productos presentados por JR Seguros, cotización, contacto y funcionamiento de la web.
- Póliza, prima, suma asegurada, deducible, exclusiones, vigencia y beneficiarios.
- Coaseguro, diferencias con el deducible, pago directo, reembolso y periodo de espera.
- Diferencias generales entre vida y gastos médicos, amplia y limitada, responsabilidad civil, robo total y autopartes, inmueble y contenidos.
- Cómo consultar hospitales, asistencia vial, uso del vehículo, inmuebles rentados y riesgos particulares.
- Preparación de una cotización por producto, comparación de propuestas, contratación, renovación, cambios, cancelación, pagos, facturación y seguimiento.
- Ofertas de temporada, flyers, privacidad y problemas para abrir el cotizador.

Explica conceptos generales. No conoce expedientes, resultados del cotizador, primas particulares ni condiciones específicas de las pólizas. No afirma disponibilidad de productos adicionales, promociones o coberturas no confirmadas.

## Archivos editables

- `js/contenido.js`: contacto, respuestas originales y preguntas visibles en la página.
- `js/conocimiento.js`: nuevas respuestas, preparación por producto y referencias. Es el archivo principal para ampliar el conocimiento sin agregar bloques a la página.
- `js/asistente.js`: reconocimiento de preguntas, variantes conocidas, contexto de producto y derivaciones.
- `js/app.js`: presentación del chat. Muestra respuestas con `textContent`, sin ejecutar HTML del usuario o de las respuestas.

Para agregar información en `JR_CONOCIMIENTO`, usa una entrada como esta:

```js
{
  id: "tema-unico",
  pregunta: "¿Cómo formula el cliente esta duda?",
  palabras: ["frase especifica", "otra forma de preguntar"],
  respuesta: "Texto confirmado para publicar, con sus límites cuando correspondan.",
  accion: "whatsapp",
},
```

`accion` es opcional; acepta `whatsapp` o `cotizar`. `fuente` es opcional y debe coincidir con una clave de `JR_FUENTES_CHAT`; muestra un enlace a esa referencia. Usa identificadores únicos. Las frases se normalizan sin acentos ni signos. Prefiere expresiones específicas: una palabra genérica como «información» puede causar coincidencias incorrectas.

El motor da más peso a frases largas y temas específicos que a los nombres de productos. `prioridad` permite ajustar una entrada si hay un conflicto comprobado; normalmente no hace falta. Las reglas de atención urgente y casos personales se revisan antes de la búsqueda.

## Preguntas de seguimiento

El asistente recuerda únicamente el último producto reconocido durante la visita. Por ejemplo:

1. «Quiero información de mi auto».
2. «¿Y qué documentos necesito?» → preparación para auto.
3. «¿Y cuánto cuesta?» → cotización personalizada, sin inventar precio.

Si se mencionan varios productos, no elige uno arbitrariamente. «Empezar de nuevo» borra el contexto. También se borra cuando la pregunta no se reconoce y al recargar la página. No existe memoria permanente ni se guardan las conversaciones.

## Información que puedes proporcionar después

Para cada producto, comparte el nombre de la aseguradora y del plan, coberturas, exclusiones, requisitos, deducibles, asistencias y documento de referencia. Para una promoción, incluye fechas de inicio y fin, productos participantes y restricciones. Los horarios y datos de atención deben ser los reales.

Agregar una imagen a un carrusel **no incorpora su texto al conocimiento**. Su información debe transcribirse y revisarse en esta base. Tampoco aprende de las preguntas de los visitantes. La integración de IA generativa es una ampliación diferente, descrita en `EDITAR-CONTENIDO.md`.

Todo lo escrito en estos archivos se publica junto con la web. Incluye solamente información pública del negocio y de sus productos.

## Referencias de información general

Las explicaciones son resúmenes educativos; las referencias no acreditan la disponibilidad ni las condiciones comerciales de JR Seguros. Se consultaron los extractos indexados de estas fuentes oficiales; la lectura directa de algunas páginas devolvió errores de acceso durante la consulta.

- [CONDUSEF: conceptos que debes saber antes de contratar un seguro](https://www.condusef.gob.mx/documentos/275535_Seguros.pdf): vocabulario básico del contrato.
- [CONDUSEF: gastos médicos](https://www.condusef.gob.mx/?idc=1434&idcat=1&p=contenido): participación en gastos y modalidades de pago.
- [CONDUSEF: coberturas de auto](https://webappsos.condusef.gob.mx/SimuladorSeguroAutomovil/coberturas.jsp): diferencias generales entre paquetes y riesgos.
- [CONDUSEF: educación sobre seguros](https://webappsos.condusef.gob.mx/EducaTuCartera/seguros.html): finalidad de los seguros y ramos.
- [CONDUSEF: antes de contratar](https://www.condusef.gob.mx/?idc=1722&idcat=3&p=contenido): revisión de condiciones de una propuesta.

Los datos de contacto, ramos y publicaciones proceden del contenido local confirmado. No se añadieron teléfonos de siniestros, horarios, cuentas de pago ni promesas de aceptación.

## Verificación después de editar

Ejecuta `node tools/verificar-asistente.cjs`. Comprueba además en el navegador una pregunta normal, una pregunta con otra redacción y una duda que el asistente deba derivar. Si agregas una condición específica, incluye ejemplos que eviten confundirla con otros productos.

Para GitHub Pages, sube también los nuevos archivos JavaScript y conserva su orden de carga en `index.html`.
