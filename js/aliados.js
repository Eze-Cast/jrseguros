/* Una copia visual cierra el bucle; la animación continua se controla desde CSS. */
(() => {
  const track = document.querySelector(".allies-track");
  if (!track) return;
  const clone = track.querySelector(".allies-list").cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  clone.inert = true;
  track.append(clone);
  track.classList.add("is-ready");
})();
