# Origen de los recursos y alcance

Fecha de preparación: 22 de septiembre de 2026.

- **Identidad visual:** `LOGO/LOGO_PROPUESTA_MINIMALISTA.jfif`, proporcionado en la carpeta del usuario. Se conserva sin alteraciones y se utiliza una copia en `assets/images/logo-minimalista.jpg`. Paleta azul marino, blanco y cian.
- **Página de referencia:** https://playful-froyo-0db499.netlify.app/ . Se recuperaron sus cuatro flyers, los ramos ofrecidos, el nombre Ramón García y el número +52 477 490 9866. No se reutilizó su formulario de cotización.
- **Flyers:** extraídos de las imágenes incrustadas en la página anterior. Las menciones comerciales que contienen son parte del material original; deben actualizarse si cambian las condiciones.
- **Imagen de portada actual:** `assets/images/optimized/portada-patrimonio.webp`, copia ligera del original `assets/images/portada-patrimonio.png`, generado con la herramienta integrada de imágenes a petición del propietario para sustituir la foto de familia. Escena ilustrativa de una casa contemporánea con auto azul; no representa un inmueble o cliente real. Prompt completo en `docs/PROMPT-PORTADA.md`.
- **Fotografía anterior:** `assets/images/familia.jpg`, conservada sin utilizar en portada. Procedía de https://images.pexels.com/photos/4975543/pexels-photo-4975543.jpeg .
- **Aliados:** Quálitas, Banorte, HDI y Zurich procedían de la web anterior. El 23 de septiembre de 2026 se incorporaron Afirme, SURA, Chubb, MAPFRE, ANA Seguros y AXA a petición del propietario, a partir de su captura del cotizador. «Amplia» es un nombre de cobertura y no se agregó como compañía. Son nombres tipográficos con colores de referencia, no archivos de logotipos oficiales.
- **Flyers nuevos:** cuatro piezas generadas con la herramienta integrada de imágenes, con referencia al logo minimalista y escenas masculinas para auto, hogar, empresarial y personas. Originales PNG en `assets/publicaciones/originales/`; versiones WebP sin pérdida en `assets/publicaciones/`. La web utiliza variantes ligeras WebP de calidad 90 desde `assets/publicaciones/optimized/`, conservando las anteriores. Prompts completos en `PROMPTS-FLYERS.md`. No representan a Ramón ni a clientes reales.
- **Tipografía:** DM Sans y Manrope distribuidas por Google Fonts, alojadas localmente. Las licencias SIL Open Font License están en `assets/fonts/`.
- **Cotizador proporcionado:** https://www.cotizamatico.com.mx/landing/ramon.garciag . Se enlaza como servicio externo. No se modificó ni se enviaron cotizaciones reales durante las pruebas.

## Datos que no se supusieron

No se añadieron ubicación, domicilio, horario, números de cédula, testimonios, cifras de clientes ni promesas de tiempos de respuesta. La ciudad aparecía como inferida en el código antiguo y no se trasladó al nuevo sitio.

## Funcionalidad real

- Catálogo actual: seguro de auto, seguro de vida, seguro de gastos médicos mayores, seguro de hogar y seguro empresarial, en ese orden. Cinco carruseles con dos flyers cada uno. Los dos flyers mixtos de Personas se retiraron de la galería y se conservaron sus archivos; cuatro imágenes nuevas de vida y gastos médicos mayores los sustituyen. Prompts y rutas en `PROMPTS-VIDA-Y-GMM.md`.
- HTML, CSS y JavaScript estáticos, sin compilación.
- Publicaciones que se amplían en un diálogo: auto, vida, gastos médicos mayores y hogar enlazan al cotizador; empresarial enlaza a WhatsApp.
- Cotizador externo y mensajes de contacto preparados.
- Chatbot local de preguntas frecuentes. No es IA generativa ni aprende automáticamente.
- Conocimiento ampliado con explicaciones generales y referencias de CONDUSEF, descritas en `CONOCIMIENTO-CHATBOT.md`. Contexto temporal del último producto, sin almacenamiento ni envío de la conversación.
- Sin analítica, cookies publicitarias, formularios de registro ni almacenamiento de conversaciones.
- Diseño adaptable, manejo de teclado, cierre de diálogos con Escape y respeto al movimiento reducido.

La sección de privacidad describe únicamente el comportamiento de esta web. Los datos enviados al asesor, WhatsApp o al cotizador requieren los avisos y procesos correspondientes de esos servicios.
