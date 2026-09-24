# Cambiar el contenido

## Carruseles: dos imágenes por recuadro

Los cinco recuadros siguen el mismo orden que las tarjetas: **seguro de auto, seguro de vida, seguro de gastos médicos mayores, seguro de hogar y seguro empresarial**. Cada uno tiene **dos imágenes**. Vida y gastos médicos mayores sustituyen al antiguo recuadro combinado de Personas.

Auto, hogar y empresarial muestran primero su versión masculina minimalista y después el flyer original. Vida usa `vida-familia.webp` y `vida-futuro.webp`; gastos médicos mayores usa `gmm-tranquilidad.webp` y `gmm-acompanamiento.webp`. Las versiones WebP utilizadas están en `assets/publicaciones/optimized/`; los JPG originales siguen en `assets/publicaciones/`. Los flyers mixtos anteriores están conservados, pero ya no aparecen en la galería.

Los nombres, descripciones y enlaces de las tarjetas se editan en `productos` de `js/contenido.js`. El orden de `publicaciones` determina el de los carruseles. `css/productos.css` adapta la distribución de cinco productos y centra el último flyer en escritorio.

En `js/contenido.js`, cada publicación tiene `imagen` para su primer flyer e `imagenesAdicionales` para el segundo:

```js
imagen: 'assets/publicaciones/publicacion-1.jpg',
imagenesAdicionales: [
  {
    imagen: 'assets/publicaciones/auto-segunda-imagen.jpg',
    alt: 'Descripción del nuevo flyer para lectores de pantalla.',
    titulo: 'El título de esta publicación',
    descripcion: 'Información que se muestra al ampliar este flyer.'
  }
],
```

Guarda la imagen en esa carpeta y completa la ruta. Si dejas `imagen: ''`, el espacio seguirá mostrando “Próximamente”, sin imágenes rotas. Si omites el título o la descripción de una imagen adicional, se utiliza el texto principal del recuadro. Puedes agregar más entradas a `imagenesAdicionales` si en el futuro necesitas más de dos imágenes.

Los controles permiten avanzar, retroceder o elegir una imagen. También funcionan las flechas del teclado y el deslizamiento horizontal en móvil. **Avanzan automáticamente** cada 5–6 segundos, con tiempos ligeramente distintos para cada recuadro. El movimiento continúa con el cursor encima. Usar las flechas, los indicadores o deslizar reinicia el intervalo y después continúa automáticamente; no hay botón de reproducción o pausa. Al ocultar la pestaña, abrir un diálogo o salir el carrusel de la vista, el avance se detiene temporalmente y se reanuda automáticamente al volver. Mientras una imagen recibe foco visible del teclado, se conserva para que pueda ampliarse sin perder la selección; al salir de ella el avance continúa. La ampliación muestra la imagen seleccionada. Su botón abre el cotizador para auto, vida, gastos médicos mayores y hogar; para empresarial prepara un mensaje de WhatsApp con el título correspondiente. Los títulos cambian suavemente y reservan altura para el texto más largo, evitando saltos al rotar.

La preferencia del dispositivo de reducir movimiento desactiva la rotación automática. Se omiten espacios vacíos o imágenes que no cargan. Para ajustar los tiempos, cambia `intervalo` en la llamada a `crearCarrusel` de publicaciones en `js/app.js`; para desactivar el avance cambia `automatico` a `false`.

## Barra de aliados

La franja «NUESTROS ALIADOS» muestra diez nombres: Afirme, SURA, Chubb, MAPFRE, Banorte, HDI, ANA Seguros, AXA, Quálitas y Zurich. Se editan en la lista `.allies-list` de `index.html`. Son nombres tipográficos con acentos de color, no archivos de logotipos oficiales.

`css/aliados.css` controla el diseño y la velocidad del movimiento; `js/aliados.js` crea una copia visual para cerrar el bucle sin saltos. Edita únicamente la lista original. La cinta gira continuamente, sin botón de pausa ni detención al pasar el cursor. Al reducir movimiento, los nombres se muestran estáticos, distribuidos en varias filas.

## Ofertas de temporada: un recuadro con cuatro imágenes

Debajo de las publicaciones está el nuevo apartado `Ofertas de temporada`. Sus cuatro espacios se editan en `ofertas.imagenes` dentro de `js/contenido.js`:

```js
ofertas: {
  visible: true,
  titulo: 'Ofertas de temporada',
  descripcion: 'Conoce las promociones de esta temporada.',
  imagenes: [
    { imagen: 'assets/publicaciones/oferta-1.jpg', alt: 'Describe la oferta.', titulo: 'Nombre de la oferta', descripcion: 'Condiciones y vigencia de la promoción.' },
    { imagen: '', alt: '', titulo: '', descripcion: '' },
    { imagen: '', alt: '', titulo: '', descripcion: '' },
    { imagen: '', alt: '', titulo: '', descripcion: '' }
  ]
},
```

Los cuatro espacios de ofertas continúan vacíos de forma intencional y mantienen navegación manual. No hay descuentos inventados ni ofertas activas. Cuando completes uno, aparecerá su imagen y podrás ampliarla o pedir información por WhatsApp. Para retirar una promoción vencida, deja vacía su ruta `imagen`. Para ocultar toda la sección usa `ofertas.visible: false`.

Mientras todos los espacios estén vacíos, el recuadro usa una altura compacta. Al añadir la primera imagen, recupera automáticamente la proporción amplia para mostrar los flyers completos.

Al actualizar GitHub, sube también las carpetas `css/` y `js/` completas: esta versión utiliza los nuevos archivos `css/carruseles.css` y `js/carruseles.js`.

## Reemplazar una publicación

La forma más sencilla es sustituir la imagen que figure en la ruta `imagen` de `js/contenido.js`, conservando su nombre. En los flyers WebP actuales esa ruta apunta a `assets/publicaciones/optimized/`; sustituir únicamente el original fuera de esa carpeta no cambia la imagen visible. También puedes guardar una imagen nueva y actualizar su ruta. Después sube los archivos modificados a GitHub. Si el navegador muestra la imagen anterior, actualiza con Ctrl + F5.

Las cuatro publicaciones iniciales se llaman `publicacion-1.jpg` a `publicacion-4.jpg`. Se recuperaron de la página anterior. El sitio muestra la imagen completa, sin cortar el contenido del flyer.

## Añadir otro recuadro de publicaciones

1. Guarda tu nueva imagen en `assets/publicaciones/`. Usa nombres sin espacios ni acentos, como `seguro-auto-octubre.jpg`.
2. Abre `js/contenido.js`.
3. En la lista `publicaciones`, duplica una entrada y cambia sus valores:

```js
{
  id: 'auto-octubre',
  categoria: 'SEGURO DE AUTO',
  titulo: 'Un título para tu publicación',
  imagen: 'assets/publicaciones/seguro-auto-octubre.jpg',
  alt: 'Describe brevemente la información importante de la imagen.',
  descripcion: 'Texto que aparecerá cuando se amplíe la publicación.',
  visible: true
},
```

4. Mantén una coma entre entradas. Guarda y recarga la página.
5. Sube la nueva imagen y el archivo `js/contenido.js` a GitHub.

El orden en la lista determina el orden visible. Para ocultar un flyer cambia `visible: true` a `visible: false`. No hace falta borrar el archivo. Si una promoción venció, ocúltala o sustitúyela.

Se admiten JPG, PNG y WebP. Usa imágenes legibles, preferentemente de 1200–1800 píxeles de ancho y con un peso moderado. Se mantiene la imagen completa; también puedes usar flyers verticales. En la galería se adaptan al espacio y al abrirlos conservan sus proporciones.

## Cambiar WhatsApp y mensaje inicial

En `js/contenido.js`, cambia:

```js
whatsapp: '524774909866',
mensaje: 'Hola, me gustaría recibir información sobre un seguro.',
```

El número va con código de país, sin `+`, espacios ni guiones. Para México es `52` seguido de los 10 dígitos del número. El número actual, **+52 477 490 9866**, fue confirmado por el propietario como definitivo.

Los mensajes de “Me interesa” incluyen el título del flyer. Así puedes reconocer qué publicación llamó la atención del visitante y continuar el seguimiento. El sitio no crea un CRM ni registra automáticamente contactos.

Los enlaces en `index.html` sirven como respaldo cuando JavaScript está desactivado. Si cambias de número, actualiza también esas direcciones `https://wa.me/524774909866` en el HTML. En uso normal, `contenido.js` configura todos los botones.

## Cambiar el cotizador

Cambia `contacto.cotizador` en `js/contenido.js`. Actualiza también los enlaces de respaldo del HTML. El cotizador se abre en la misma pestaña después de un aviso de 6 segundos sobre el correo tuseguro@aarco.com.mx. El aviso se puede cancelar con el botón, Escape o un clic fuera del cuadro. El precio y la cotización se gestionan en ese servicio externo.

Los botones generales de cotización y los accesos de auto, vida, gastos médicos mayores y hogar usan ese enlace, también desde publicaciones ampliadas y el chatbot. Empresarial permanece en WhatsApp. Los botones de asesoría, contacto y seguimiento conservan WhatsApp. El texto del aviso está en index.html, sus estilos en css/cotizador.css y la espera de 6000 milisegundos en js/app.js.

## Alimentar el chatbot

Para ampliar solo el chat, añade entradas a `JR_CONOCIMIENTO` en `js/conocimiento.js`. Para una pregunta que también deba aparecer en la página, usa `preguntas` en `js/contenido.js`:

```js
{
  id: 'identificador-unico',
  pregunta: '¿Cuál es la pregunta?',
  palabras: ['frase que usará el visitante', 'sinonimo'],
  respuesta: 'Respuesta revisada y aprobada para publicar.',
  accion: 'whatsapp',
  visible: true
},
```

- `palabras`: frases o términos que activan la respuesta; el asistente normaliza mayúsculas y acentos.
- `accion: 'whatsapp'`: incluye un botón de contacto.
- `accion: 'cotizar'`: incluye un botón al cotizador.
- Sin `accion`: solo muestra la respuesta.
- `visible: true`: la pregunta aparece también en la sección de preguntas frecuentes. Omite ese campo para que solo se use en el chat.

La base ampliada explica conceptos y conserva el producto para preguntas de seguimiento. Las reglas están en `js/asistente.js`: los casos médicos particulares, montos de una póliza y reportes requieren atención personal. Una explicación general no confirma cobertura. Consulta [CONOCIMIENTO-CHATBOT.md](CONOCIMIENTO-CHATBOT.md) para ver los temas, referencias y ejemplos de ampliación. Después de editar, ejecuta `node tools/verificar-asistente.cjs` y prueba el chat en el navegador.

## Ampliación futura con IA

1. Preparar documentos y preguntas aprobadas, con producto, aseguradora y fecha de vigencia.
2. Crear un servicio externo que reciba la pregunta y consulte esa documentación. Guardar las claves únicamente en el servidor.
3. Sustituir la función local de respuesta por una llamada a ese servicio, manteniendo respuestas de respaldo y derivación a WhatsApp.
4. Añadir control de abuso, límites de consumo y revisar los avisos de privacidad antes de enviar conversaciones a terceros.
5. Verificar que las respuestas distingan información general de las condiciones de una póliza concreta.

Esto no está conectado en la versión actual: no hay suscripciones, claves ni costos de IA asociados al chatbot local.

## Colores y animaciones

La paleta está al inicio de `css/styles.css`: `--navy`, `--cyan`, `--ink` y `--pale`. La portada está en `css/intro.css`: fotografía de fondo a todo el ancho, degradado azul para la legibilidad y encuadre adaptable. La imagen se cambia en `.intro-background` dentro de `index.html`; el encuadre se ajusta con `object-position` en el CSS. La regla `.container` de `css/styles.css` controla los márgenes generales y permite hasta 1760 píxeles de contenido en pantallas grandes. Las transiciones están en `css/motion.css`; `js/app.js` coordina la apertura y el cierre del chat, los diálogos y las preguntas frecuentes. Hay entrada escalonada de textos y tarjetas, transiciones en botones y menú móvil. Se desactivan cuando el dispositivo indica preferencia por movimiento reducido.

`css/pulido.css` reúne los ajustes de lectura, navegación activa y chat adaptable. El menú indica la sección visible. En móvil, el asistente y WhatsApp usan accesos circulares discretos. El contenido del chat se desplaza dentro del panel, manteniendo el campo de escritura fuera de esa zona. La portada y el logo utilizan las variantes de `assets/images/optimized/`; consulta `OPTIMIZACION-RECURSOS.md` antes de reemplazarlas.
