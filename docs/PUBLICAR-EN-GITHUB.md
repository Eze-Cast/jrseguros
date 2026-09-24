# Publicar en GitHub Pages y conectar tu dominio

## 1. Qué subir

Crea un repositorio para JR Seguros. En **Add file → Upload files**, sube estos archivos y carpetas conservando exactamente su estructura:

```text
index.html
.nojekyll
css/
js/
assets/
```

`index.html` debe quedar directamente en la raíz del repositorio, no dentro de otra carpeta JRSEGUROS. Sube archivos y carpetas, no un ZIP. Si subes toda la carpeta del proyecto, comprueba igualmente que `index.html` quede en la raíz.

Puedes incluir también la guía, `docs/`, `tools/`, `.vscode/` y el archivo de espacio de trabajo si quieres conservarlos para editar. `LOGO/` conserva los originales y no es necesario para mostrar la web; la copia usada por la página ya está dentro de `assets/images/`.

## 2. Activar la web

1. Guarda los archivos con **Commit changes** en la rama `main`.
2. En el repositorio abre **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**.
4. Selecciona **main** y **/(root)**. Pulsa **Save**.
5. Espera a que GitHub complete la publicación. Usa **Visit site** para abrirla.

La web utiliza rutas relativas, por lo que funciona también con la dirección `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

Consulta la [guía oficial sobre la fuente de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## 3. Cuando compres el dominio

1. En **Settings → Pages → Custom domain**, escribe tu dominio y guarda. Configura primero el dominio en GitHub y después los registros DNS en el proveedor.
2. En la cuenta donde compraste el dominio, configura los registros que indica la guía oficial de GitHub para tu caso: dominio raíz o subdominio `www`.
3. Espera a que la comprobación DNS y el certificado estén listos. Activa **Enforce HTTPS** cuando esté disponible.
4. Visita el dominio desde móvil y computadora. Prueba los enlaces a WhatsApp y al cotizador.

No hay un `CNAME` de ejemplo en este proyecto: GitHub lo creará con el dominio real al guardar la configuración desde una rama. No borres ese archivo en las siguientes actualizaciones.

[Documentación oficial para configurar el dominio y los DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## 4. Actualizaciones posteriores

En GitHub puedes reemplazar imágenes mediante **Add file → Upload files** dentro de la carpeta indicada en `js/contenido.js`. Los siete WebP actuales están en `assets/publicaciones/optimized/`; los tres JPEG originales, en `assets/publicaciones/`. También puedes guardar una imagen con otro nombre y actualizar su ruta. Para añadir o cambiar títulos, edita ese mismo archivo. Guarda los cambios y espera a que termine la publicación. Al subir esta versión, incluye las subcarpetas `optimized/` y todos los archivos de `css/` y `js/`.

Antes de publicar, revisa que el WhatsApp sea el correcto y que las publicaciones, aseguradoras y promociones sigan vigentes. La vista local no publica nada por sí sola.
