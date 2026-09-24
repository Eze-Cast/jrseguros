# Verificación de la entrega

## Cotizador y aviso de correo · 24 de septiembre de 2026

Estado vigente para los enlaces de cotización; las secciones siguientes registran verificaciones anteriores.

- Doce enlaces de cotización iniciales verificados: cuatro generales, cuatro tarjetas y cuatro publicaciones. Auto, vida, gastos médicos mayores y hogar apuntan a `https://www.cotizamatico.com.mx/landing/ramon.garciag`; empresarial conserva WhatsApp.
- Los cinco flyers ampliados y los cinco productos en el chatbot dirigen al canal correspondiente. Cotización, requisitos y seguimiento de precio comprobados por producto.
- Aviso sobre `tuseguro@aarco.com.mx`, cancelación y Escape comprobados. Al cancelar desde una publicación ampliada, se conserva el diálogo inferior y se recupera el foco. Escape desde el aviso del chat conserva la conversación abierta.
- Redirección medida a los 6008 ms en Microsoft Edge. Destino interceptado en la prueba, sin enviar una cotización real ni comprobar la entrega del correo externo.
- Aviso comprobado a 320 y 390 píxeles de ancho, además de escritorio y apertura local con `file://`. Sin errores JavaScript.
- Verificador existente aprobado: 51 entradas, 74 preguntas y seis conversaciones. Sintaxis de todos los archivos JavaScript comprobada.

## Pulido integral · 23 de septiembre de 2026

Registro anterior. Los enlaces se actualizaron el 24 de septiembre; las secciones inferiores también pueden describir controles que ya se retiraron.

- Comparación de datos antes/después: contacto, enlaces, cinco productos, catorce preguntas, configuración del asistente y cuatro espacios de ofertas idénticos. Los diez flyers conservan todos sus títulos, descripciones y textos alternativos. Solo se cambió el orden inicial de auto, hogar y empresarial y la ruta de siete imágenes.
- Imágenes servidas: de 15.10 MB a 2.13 MB, aproximadamente 86 % menos. Originales conservados; variantes WebP de calidad 90, sin cambios de composición. Véase `OPTIMIZACION-RECURSOS.md`.
- Microsoft Edge: cero errores JavaScript, solicitudes fallidas o recursos HTTP con errores; portada, logo y diez flyers decodificados completamente. Enlaces a WhatsApp `524774909866` y cotizador `115795` comprobados, con apertura segura en otra pestaña. Anclas internas existentes.
- Anchos 320, 375, 390, 768, 1024, 1440 y 1920 revisados. Sin desbordamiento horizontal. Capturas de portada, seguros, publicaciones, temporada, preguntas y chat en escritorio y móvil.
- Treinta cambios de flyer (cinco recuadros en seis anchos): cada bloque de información mantiene exactamente su altura. Títulos completos, con transición breve y espacio reservado para el más largo.
- Reproducción automática con hover e interacción manual; el foco de teclado en la imagen se conserva durante un intervalo completo. Enter amplía, Escape cierra y devuelve el foco; al salir de la imagen la rotación se reanuda. Sin controles de pausa en publicaciones ni aliados.
- Chat probado a 320 × 800 y 375 × 800 con texto al 200 %, a 667 × 375 normal y a 320 × 568 con texto al 200 %. Cerrar, escribir y enviar permanecen accesibles; el historial y WhatsApp se recorren dentro del panel. Abrir y responder no mueve la página. En el caso más pequeño quedan 183 px de lectura; iconos centrados sin depender del tamaño de fuente.
- Navegación activa comprobada en seguros, publicaciones y preguntas; inicio sin selección incorrecta. Menú móvil operable con teclado y cierre con Escape.
- Movimiento reducido comprobado: aliados estáticos, rotación automática desactivada y navegación manual disponible.
- Ofertas conserva cuatro espacios vacíos y navegación manual. Se comprobó con datos temporales de prueba que, al añadir una imagen, recupera su proporción amplia y el enlace correspondiente; no se guardó ninguna oferta ficticia.
- `node tools/verificar-asistente.cjs`: 51 entradas, 74 preguntas y seis conversaciones aprobadas. Sintaxis de JavaScript válida.

Las pruebas son locales con navegadores de escritorio y tamaños de pantalla simulados; no equivalen a una prueba en teléfonos físicos ni a una medición del alojamiento publicado.

## Cinco seguros y galería separada · 23 de septiembre de 2026

- Tarjetas y carruseles verificados en este orden: auto, vida, gastos médicos mayores, hogar y empresarial.
- Cinco carruseles de dos imágenes: diez flyers cargados y rotación automática comprobada en cada recuadro. Sin reproductor de pausa en publicaciones.
- Cuatro flyers nuevos exclusivos de vida y gastos médicos mayores; ampliación y enlace de WhatsApp comprobados para cada uno. Los flyers mixtos de Personas ya no se enlazan en la galería.
- Comprobados los anchos 320, 390, 600, 768, 1024, 1280, 1440 y 1920 píxeles, sin desbordamiento de página o tarjetas. Títulos completos y revisión visual en escritorio y móvil.
- Ofertas conserva sus cuatro rutas vacías. Sin errores de JavaScript ni recursos HTTP fallidos en Microsoft Edge.
- El verificador del chatbot pasó después de actualizar su listado de productos.

## Ajuste de reproducción automática · 23 de septiembre de 2026

- Eliminado el botón de reproducción de los carruseles de publicaciones y la pausa permanente al interactuar. Las flechas, indicadores y gestos reinician el intervalo y permiten que el avance continúe solo.
- Intervalos de 5 a 5,75 segundos; pasar el cursor sobre una publicación ya no detiene la rotación.
- Se conserva la suspensión temporal al ampliar un flyer, ocultar la pestaña o salir de la vista; la preferencia de movimiento reducido sigue respetándose.
- Cinta de aliados acelerada a 40 segundos por vuelta en escritorio y 36 en móvil. Ofertas conserva la navegación manual.

## Aliados y nuevos flyers · 23 de septiembre de 2026

- Diez compañías en una barra de movimiento continuo; la copia visual del bucle está oculta a tecnologías de asistencia.
- Cuatro nuevos flyers con marca JR y escenas de auto, hogar, negocio y bienestar. PNG originales conservados y WebP sin pérdida con igualdad de píxeles verificada.
- Comprobada la rotación automática de los cuatro carruseles y la apertura de la imagen y el título correctos en el diálogo.
- Pausa explícita mantenida durante más de un intervalo completo, reanudación manual y pausa de la barra verificadas. Corregida la actualización del icono para que no interrumpa una pulsación.
- Deslizamiento mediante eventos táctiles comprobado sin apertura accidental del diálogo; controles de flechas e indicadores y navegación por teclado disponibles.
- Preferencia de movimiento reducido: barra estática con las diez compañías, duplicado visual oculto y reproducción automática desactivada.
- Anchos de 320, 390, 768, 1024, 1440 y 1920 píxeles sin desbordamiento horizontal. Revisión visual de la barra y flyers en escritorio y móvil.
- Ofertas conserva exactamente cuatro rutas vacías y navegación manual.
- Sin errores de JavaScript ni recursos HTTP fallidos en la revisión de Microsoft Edge. El verificador del chatbot también pasó tras incorporar los nombres de los aliados.

## Ampliación del conocimiento del chatbot

Revisada el 22 de septiembre de 2026:

- 51 entradas sin identificadores repetidos y referencias válidas dentro de la configuración.
- `node tools/verificar-asistente.cjs`: 74 preguntas y seis secuencias de conversación, incluyendo errores comunes de escritura, conceptos, trámites, preparación por producto y derivaciones.
- El contexto distingue auto, hogar, empresa, vida y gastos médicos; se reinicia cuando se solicita, ante preguntas desconocidas y al recargar.
- Pruebas en Microsoft Edge de preguntas enviadas desde el formulario, enlaces de referencia, cotizador y WhatsApp.
- Texto HTML escrito por el visitante presentado sin ejecutarse.
- Chat sin desbordamiento horizontal y campo de entrada visible a 320, 390, 768 y 1440 píxeles de ancho.
- Revisión visual de respuestas en escritorio y móvil, una vez terminadas las animaciones.
- La base ampliada también funciona al abrir `index.html` directamente mediante `file://`.
- Sin errores de JavaScript ni respuestas HTTP fallidas durante estas pruebas. No se enviaron mensajes externos ni datos de clientes.

## Carruseles y ofertas de temporada

Comprobados el 22 de septiembre de 2026 en Microsoft Edge:

- Cuatro carruseles de publicaciones con dos espacios cada uno y un carrusel de temporada con cuatro espacios.
- Los espacios sin archivo muestran «Próximamente», sin solicitudes de imágenes vacías ni promociones inventadas.
- Flechas, indicadores, navegación circular y teclas de dirección, Inicio y Fin funcionando.
- Deslizamiento horizontal con eventos táctiles en una vista móvil emulada, sin abrir accidentalmente el diálogo.
- Ampliación de flyers, cierre con Escape y diapositivas fuera de vista excluidas del foco.
- Imágenes futuras verificadas mediante datos temporales en memoria: título, descripción y enlace de WhatsApp corresponden a la imagen seleccionada.
- Sin desbordamiento horizontal a 320, 390, 600, 768, 1024, 1440 y 1920 píxeles; comprobación adicional con texto al 200 %.
- Transiciones desactivadas al solicitar movimiento reducido. Sin errores de JavaScript ni recursos fallidos durante la revisión.
- Galería y ofertas revisadas visualmente en escritorio y móvil. Los datos de prueba no se guardaron en el contenido del sitio.

## Revisión de portada y animaciones

- Portada panorámica con fotografía de fondo y degradado azul detrás del texto, según la última revisión solicitada.
- Márgenes generales reducidos: 80 píxeles por lado a 1920 píxeles de ancho. Revisado sin desplazamiento horizontal a 320, 390, 768, 1024, 1440 y 1920 píxeles.
- Vista comprobada a 320, 375, 390, 600, 768, 850, 851, 1024, 1280 y 1440 píxeles, sin desbordamiento horizontal.
- Verificados menú móvil, diálogos, devolución del foco con Escape, acordeones y chatbot con apertura y cierre animados.
- Comprobadas pulsaciones rápidas sobre preguntas y reapertura del chat durante su cierre.
- Probadas preferencias de movimiento reducido y texto al 200 %.
- WhatsApp y cotizador conservan sus destinos. Sin errores de JavaScript observados.

Comprobaciones realizadas el 22 de septiembre de 2026 en Microsoft Edge con automatización del navegador:

- Vista de escritorio y móvil revisada visualmente, incluida la galería y el chatbot.
- Anchos de 320, 375, 390, 600, 768, 1024 y 1440 píxeles sin desbordamiento horizontal.
- Cuatro publicaciones y recursos visuales cargados correctamente.
- Enlaces generales de cotización con la dirección proporcionada por el usuario.
- Botones de WhatsApp con número y mensaje codificado.
- Apertura y cierre de flyers, tecla Escape y devolución del foco al botón de origen.
- Apertura del menú móvil y cierre al seleccionar una sección.
- Respuestas del chatbot sobre productos, cotización y deducibles; derivación de preguntas particulares y no reconocidas.
- Las entradas de chat se muestran como texto, sin ejecutar HTML introducido por el visitante.
- Preferencia de movimiento reducido desactiva animaciones.
- Aumento de texto al 200 % sin desbordamiento horizontal en la comprobación de escritorio.
- Apertura directa de `index.html` sin servidor: productos y publicaciones disponibles.
- JavaScript sin errores de sintaxis y sin errores de ejecución observados durante las pruebas.

No se enviaron mensajes reales de WhatsApp ni solicitudes de cotización. Se verificaron los enlaces, no la recepción de mensajes por el destinatario. Tampoco se publicó en GitHub ni se conectó un dominio, ya que no se proporcionaron esos destinos. Las pruebas con tamaños de pantalla no sustituyen la revisión en todos los modelos de teléfono o navegadores existentes.
