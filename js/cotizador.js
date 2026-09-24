/* El aviso vive en su propia pestaña; la página y el chat originales se conservan. */
(() => {
  "use strict";
  const countdown = document.querySelector("#quote-countdown");
  const seconds = document.querySelector("#quote-seconds");
  const destination = window.JR_CONTENIDO?.contacto.cotizador;
  const delay = 3000;
  let timer;
  let interval;
  function stop() {
    clearTimeout(timer);
    clearInterval(interval);
  }
  function cancel() {
    stop();
    countdown.textContent = "Cotización cancelada. Puedes regresar a la pestaña de JR Seguros.";
    window.close();
    // Si se abrió esta dirección directamente, el navegador puede impedir cerrarla.
    if (!window.closed) window.location.replace("index.html");
  }
  document.querySelector("#quote-cancel").addEventListener("click", cancel);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") cancel();
  });
  window.addEventListener("pagehide", stop);
  // Al volver con Atrás desde el cotizador no se inicia otra redirección.
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      stop();
      countdown.textContent = "Puedes regresar a la pestaña de JR Seguros.";
    }
  });
  if (!destination) {
    countdown.textContent = "No se pudo cargar el cotizador. Regresa a JR Seguros e inténtalo de nuevo.";
    return;
  }
  const started = performance.now();
  interval = setInterval(() => {
    seconds.textContent = String(Math.max(0, Math.ceil((delay - (performance.now() - started)) / 1000)));
  }, 200);
  timer = setTimeout(() => {
    stop();
    window.location.replace(destination);
  }, delay);
})();
