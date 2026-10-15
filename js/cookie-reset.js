(() => {
  const button = document.querySelector("#reset-notice");
  if (!button) return;
  button.hidden = false;
  button.addEventListener("click", () => {
    try { sessionStorage.removeItem("jr-cookie-notice-v1"); } catch {}
    const notice = document.querySelector("#cookie-notice");
    if (notice) notice.hidden = false;
    document.querySelector("#reset-status").textContent = "El aviso vuelve a estar visible. No se ha activado ninguna herramienta de seguimiento.";
  });
})();
