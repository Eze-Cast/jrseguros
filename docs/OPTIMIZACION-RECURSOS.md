# Optimización de recursos

Se generaron copias optimizadas locales. Los originales se conservan y no se modificaron escenas, textos, composiciones ni dimensiones de los flyers o la portada.

La portada y los siete flyers usan WebP con calidad 90. El logo usa WebP de 124 × 124 px (para cubrir el tamaño visual de 62 px al doble de densidad) y el favicon usa PNG de 128 × 128 px.

Las referencias de `index.html` y `js/contenido.js` ya utilizan estas variantes. Al reemplazar imágenes, sigue la ruta configurada en esos archivos: modificar únicamente el original no cambia la copia visible. Las fuentes locales se precargan desde el HTML.

| Original | Variante | Antes (bytes) | Después (bytes) | Ahorro | Dimensiones de variante |
| --- | --- | ---: | ---: | ---: | --- |
| assets/images/portada-patrimonio.png | assets/images/optimized/portada-patrimonio.webp | 2,555,852 | 344,046 | 86.54% | 1448×1086 |
| assets/images/logo-minimalista.jpg | assets/images/optimized/logo-minimalista.webp | 2,343,516 | 2,696 | 99.88% | 124×124 |
| assets/images/logo-minimalista.jpg | assets/images/optimized/favicon.png | 2,343,516 | 24,799 | 98.94% | 128×128 |
| assets/publicaciones/auto-tranquilidad.webp | assets/publicaciones/optimized/auto-tranquilidad.webp | 1,458,086 | 205,888 | 85.88% | 1691×930 |
| assets/publicaciones/vida-familia.webp | assets/publicaciones/optimized/vida-familia.webp | 1,493,228 | 218,210 | 85.39% | 1695×928 |
| assets/publicaciones/vida-futuro.webp | assets/publicaciones/optimized/vida-futuro.webp | 1,441,510 | 196,902 | 86.34% | 1696×927 |
| assets/publicaciones/gmm-tranquilidad.webp | assets/publicaciones/optimized/gmm-tranquilidad.webp | 1,277,070 | 153,554 | 87.98% | 1695×928 |
| assets/publicaciones/gmm-acompanamiento.webp | assets/publicaciones/optimized/gmm-acompanamiento.webp | 1,322,758 | 161,418 | 87.8% | 1695×928 |
| assets/publicaciones/hogar-tranquilidad.webp | assets/publicaciones/optimized/hogar-tranquilidad.webp | 1,412,676 | 185,662 | 86.86% | 1697×927 |
| assets/publicaciones/empresarial-tranquilidad.webp | assets/publicaciones/optimized/empresarial-tranquilidad.webp | 1,333,056 | 169,932 | 87.25% | 1696×927 |

## Verificación

- Se comprobó que las diez variantes se pueden decodificar por completo y que conservan las dimensiones previstas.
- Las imágenes informativas y la portada conservan todos sus píxeles de resolución; WebP aplica compresión con pérdida.
- Los tres flyers JPEG de 1200 × 654 px se mantienen: ya ocupan entre 127 y 171 KB y una conversión indiscriminada puede aumentar su peso.
- Los originales de edición y los recursos no utilizados no se solicitan durante la navegación. Mantenerlos en disco no afecta el peso descargado de la página.
- Estas cifras comparan bytes de archivos. No son una medición de velocidad de un sitio publicado.
- El servidor local de vista previa devuelve Cache-Control: no-store; sus resultados de caché no representan los de un alojamiento futuro.
- Carga comprobada tras recorrer toda la galería: 2,126,534 bytes de imágenes, incluidos los tres JPEG sin modificar. Frente a 15,101,179 bytes antes del pulido, el ahorro de archivos es 85.92 %.
