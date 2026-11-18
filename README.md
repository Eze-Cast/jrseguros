# JR Seguros

Sitio estático de JR Seguros, con catálogo de seguros, publicaciones y asistente de preguntas frecuentes.

- **Dominio configurado:** [jrseguros.com.mx](https://jrseguros.com.mx/).
- **Publicación:** GitHub Pages, rama `main`, carpeta raíz (`/`).
- **Contenido editable:** `js/contenido.js` (contacto, publicaciones, ofertas, preguntas y asistente) y `js/conocimiento.js` (respuestas extra del asistente).
- **Diseño (noviembre 2026):** `index.html` y `cotizar.html` usan `css/estilo.css`, `js/datos.js` y `js/main.js`. En `js/datos.js` están las tarjetas de seguros, el selector de la portada y los logos de aseguradoras (`assets/logos/`). Las páginas legales y la 404 siguen usando `css/legal.css`.
- **Guía del proyecto:** [LEEME.md](LEEME.md).
- **Publicación y dominio:** [docs/PUBLICAR-EN-GITHUB.md](docs/PUBLICAR-EN-GITHUB.md).

## Trabajar en la página

Abre `JRSEGUROS.code-workspace` en Visual Studio Code. La página no necesita compilación. Puedes abrir `index.html` o ejecutar `node tools/preview.mjs` para consultar la vista local en `http://127.0.0.1:4173`.

Los cambios enviados a `main` se publican automáticamente. Conserva `CNAME`, `.nojekyll` y las rutas de las carpetas `css/`, `js/` y `assets/`.

## Cotizaciones

Auto, vida, gastos médicos mayores y hogar usan el cotizador de Ramón García. Al abrir la pestaña nueva aparece el aviso sobre el correo `tuseguro@aarco.com.mx` durante 3 segundos. Empresarial y los accesos de asesoría conservan WhatsApp.
