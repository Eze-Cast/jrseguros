/* Aviso informativo: no habilita rastreadores ni representa consentimiento. */
(() => {
  const key = "jr-cookie-notice-v1";
  const notice = document.querySelector("#cookie-notice");
  if (!notice) return;
  try { if (sessionStorage.getItem(key) === "dismissed") return; } catch {}
  notice.hidden = false;
  document.querySelector("#cookie-dismiss").addEventListener("click", () => {
    try { sessionStorage.setItem(key, "dismissed"); } catch {}
    notice.hidden = true;
  });
})();
