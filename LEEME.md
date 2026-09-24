# JR Seguros

Web estática, editable y preparada para GitHub Pages y un dominio propio. No necesita compilación, base de datos ni paquetes para funcionar. La carpeta `LOGO/` conserva tus originales.

## Abrir y editar

Abre `JRSEGUROS.code-workspace` con Visual Studio Code. Puedes abrir `index.html` directamente en el navegador. Para trabajar con recarga automática, instala la extensión recomendada **Live Server**, abre `index.html` y pulsa **Go Live**.

Si tienes Node.js, también puedes ejecutar `node tools/preview.mjs` desde la carpeta del proyecto y visitar `http://127.0.0.1:4173`.

## Archivos principales

| Archivo o carpeta | Contenido |
| --- | --- |
| `index.html` | Secciones, textos de portada, navegación y estructura |
| `css/styles.css` | Colores, tipografía, móvil y animaciones |
| `css/intro.css` | Portada minimalista y adaptación a móvil |
| `css/motion.css` | Transiciones, entradas y movimiento reducido |
| `css/carruseles.css` | Presentación de carruseles y ofertas de temporada |
| `css/aliados.css` | Barra minimalista de aliados en movimiento continuo |
| `css/productos.css` | Distribución adaptable de los cinco seguros |
| `css/pulido.css` | Legibilidad, navegación activa, chat adaptable y tamaños estables |
| `css/cotizador.css` | Aviso de correo y cuenta regresiva antes de cotizar |
| `js/contenido.js` | WhatsApp, cotizador, productos, flyers y respuestas |
| `js/conocimiento.js` | Conocimiento ampliado del chat y preparación por producto |
| `js/asistente.js` | Reconocimiento de preguntas y contexto de conversación |
| `js/carruseles.js` | Flechas, indicadores, teclado y deslizamiento de los flyers |
| `js/aliados.js` | Bucle continuo de la barra de aliados, sin control de pausa |
| `js/app.js` | Galería, menú, preguntas frecuentes y chatbot |
| `assets/publicaciones/` | Imágenes de las publicaciones |
| `assets/images/` | Logo utilizado y foto de portada |
| `assets/fonts/` | Fuentes locales y licencias |
| `docs/EDITAR-CONTENIDO.md` | Cómo cambiar flyers, contacto y chatbot |
| `docs/CONOCIMIENTO-CHATBOT.md` | Temas, fuentes y cómo ampliar el conocimiento |
| `docs/PUBLICAR-EN-GITHUB.md` | Qué subir y cómo conectar el dominio |
| `docs/ORIGEN-Y-ALCANCE.md` | Procedencia de contenido y límites del asistente |
| `docs/OPTIMIZACION-RECURSOS.md` | Versiones ligeras de imágenes y originales conservados |

## Contacto configurado

La galería presenta auto, vida, gastos médicos mayores, hogar y empresarial en ese orden. Tiene cinco carruseles automáticos con dos flyers cada uno y un carrusel de temporada manual con cuatro espacios pendientes. Los nuevos flyers muestran escenas masculinas acordes a cada seguro con la marca JR. La barra «NUESTROS ALIADOS» incluye diez compañías. Consulta `docs/EDITAR-CONTENIDO.md` para editar contenido y movimiento, y `docs/PROMPTS-FLYERS.md` para los archivos y prompts de las imágenes nuevas.

- Cotizador: https://www.cotizamatico.com.mx/landing/ramon.garciag
- Auto, vida, gastos médicos mayores y hogar usan este enlace en tarjetas, publicaciones y chatbot. Antes de salir, un aviso informa del correo **tuseguro@aarco.com.mx** y espera **6 segundos**; después abre el cotizador en la misma pestaña. Se puede cancelar el aviso.
- El seguro empresarial continúa por WhatsApp.
- WhatsApp: **+52 477 490 9866**, confirmado por el propietario como número definitivo.
- Los botones preparan un mensaje; el visitante confirma el envío dentro de WhatsApp.

## El chatbot

Funciona con 51 entradas editables y preparación por producto. Reconoce frases, algunas variantes comunes y preguntas de seguimiento sobre el último producto. No es un modelo generativo, no aprende de las conversaciones y no guarda mensajes. Las preguntas visibles están en `js/contenido.js`; el conocimiento adicional, en `js/conocimiento.js`. Consulta `docs/CONOCIMIENTO-CHATBOT.md` para seguir ampliándolo.

Para conectar más adelante un modelo de IA, será necesario un servicio externo seguro que guarde las credenciales. GitHub Pages solo aloja archivos estáticos. No pongas claves de API en HTML, JavaScript ni en el repositorio público. Consulta el plan de ampliación en `docs/EDITAR-CONTENIDO.md`.

## Estado de entrega

El pulido mantiene los cinco seguros y todos los enlaces. Las imágenes servidas pesan en conjunto alrededor de un 86 % menos; los originales permanecen disponibles. Los flyers de estilo minimalista aparecen primero y la segunda imagen conserva el material anterior. Las publicaciones reservan espacio para el título más largo, y el chat mantiene accesible su campo de escritura en pantallas pequeñas. Consulta `docs/VERIFICACION.md` para las comprobaciones.

El proyecto está guardado localmente. La publicación en GitHub y la conexión del dominio se harán cuando tengas el repositorio y el dominio. No se creó un archivo `CNAME` con un dominio inventado.
