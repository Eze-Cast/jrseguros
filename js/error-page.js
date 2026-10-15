(() => {
  if (/^\/flotillas\.php\/?$/i.test(location.pathname)) {
    location.replace("https://jrseguros.com.mx/");
    return;
  }
  const button = document.querySelector("#motion-toggle");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  if (!button) return;
  function sync() {
    document.body.classList.toggle("lost-motion", !reduced.matches);
    button.hidden = reduced.matches;
    button.textContent = "Pausar animación";
    button.setAttribute("aria-pressed", "false");
  }
  sync();
  reduced.addEventListener("change", sync);
  button.addEventListener("click", () => {
    const playing = document.body.classList.toggle("lost-motion");
    button.textContent = playing ? "Pausar animación" : "Reanudar animación";
    button.setAttribute("aria-pressed", String(!playing));
  });
})();
