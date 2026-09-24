/* Interfaz del sitio. El contenido editable está en contenido.js. */
(() => {
  "use strict";
  const data = window.JR_CONTENIDO;
  if (!data) return;
  const $ = (selector) => document.querySelector(selector);
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  function animatePanel(element, opening) {
    element.getAnimations().forEach((animation) => animation.cancel());
    if (reducedMotion.matches || !element.animate) return Promise.resolve();
    const frames = [
      { opacity: 0, transform: "translateY(12px) scale(.985)" },
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ];
    return element
      .animate(opening ? frames : frames.slice().reverse(), {
        duration: opening ? 320 : 180,
        easing: "cubic-bezier(.22, 1, .36, 1)",
      })
      .finished.catch(() => {});
  }
  const waLink = (mensaje = data.contacto.mensaje) =>
    `https://wa.me/${data.contacto.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(mensaje)}`;
  const interestLink = (tema) =>
    waLink(
      `Hola, Ramón. Vi en JR Seguros la información de ${tema} y me interesa conocer las opciones. ¿Me ayudas a dar seguimiento?`,
    );
  const onlineProducts = new Set(["auto", "vida", "gastos-medicos", "hogar"]);
  const productLink = (id, title) =>
    onlineProducts.has(id) ? data.contacto.cotizador : interestLink(title);
  const externalLink = (a, url) => {
    a.href = url;
    a.target = url === data.contacto.cotizador ? "_self" : "_blank";
    a.rel = "noopener noreferrer";
    a.toggleAttribute("data-cotizar", url === data.contacto.cotizador);
  };
  document
    .querySelectorAll("[data-whatsapp]")
    .forEach((a) => externalLink(a, waLink()));
  document
    .querySelectorAll("[data-cotizar]")
    .forEach((a) => externalLink(a, data.contacto.cotizador));
  $("#year").textContent = new Date().getFullYear();
  const icons = {
    auto: '<path d="m4 10 2-6h12l2 6M4 10h16v8H4zM7 18v2M17 18v2M7 14h2M15 14h2"/>',
    hogar: '<path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7"/>',
    empresa:
      '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12l9 3 9-3M12 12v5"/>',
    vida: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    medicos:
      '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM12 8v7M8.5 11.5h7"/>',
  };
  data.productos.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card reveal";
    const top = document.createElement("div");
    top.className = "product-top";
    top.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[product.icono] || icons.vida}</svg><span>0${index + 1}</span>`;
    const title = document.createElement("h3");
    title.textContent = product.nombre;
    const description = document.createElement("p");
    description.textContent = product.descripcion;
    const link = document.createElement("a");
    link.className = "text-link";
    link.textContent = product.accion;
    externalLink(
      link,
      productLink(product.id, product.nombre),
    );
    const arrow = document.createElement("span");
    arrow.textContent = "↗";
    arrow.setAttribute("aria-hidden", "true");
    link.append(arrow);
    card.append(top, title, description, link);
    $("#product-grid").append(card);
  });
  const publicationDialog = $("#publication-dialog");
  const dialogFocus = new WeakMap();
  let quoteTimer;
  let quoteCountdown;
  function stopQuoteTimer() {
    clearTimeout(quoteTimer);
    clearInterval(quoteCountdown);
  }
  function openDialog(dialog) {
    dialogFocus.set(dialog, document.activeElement);
    dialog.classList.remove("is-closing");
    dialog.showModal();
    document.body.classList.add("modal-open");
    animatePanel(dialog, true);
  }
  async function closeDialog(dialog) {
    if (dialog.classList.contains("is-closing")) return;
    if (dialog.id === "quote-dialog") stopQuoteTimer();
    dialog.classList.add("is-closing");
    await animatePanel(dialog, false);
    dialog.close();
    dialog.classList.remove("is-closing");
  }
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog
      .querySelector("[data-close-dialog]")
      .addEventListener("click", () => closeDialog(dialog));
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeDialog(dialog);
    });
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom
      )
        closeDialog(dialog);
    });
    dialog.addEventListener("close", () => {
      if (dialog.id === "quote-dialog") stopQuoteTimer();
      document.body.classList.toggle("modal-open", Boolean($("dialog[open]")));
      dialogFocus.get(dialog)?.focus({ preventScroll: true });
    });
  });
  const quoteDialog = $("#quote-dialog");
  function showQuoteNotice(event) {
    const link = event.target.closest("a[data-cotizar]");
    if (!link || (event.type === "auxclick" && event.button !== 1)) return;
    event.preventDefault();
    if (quoteDialog.open) return;
    stopQuoteTimer();
    const seconds = $("#quote-seconds");
    seconds.textContent = "6";
    openDialog(quoteDialog);
    const started = performance.now();
    quoteCountdown = setInterval(() => {
      seconds.textContent = String(Math.max(0, 6 - Math.floor((performance.now() - started) / 1000)));
    }, 200);
    quoteTimer = setTimeout(() => {
      stopQuoteTimer();
      quoteDialog.close();
      window.location.assign(data.contacto.cotizador);
    }, 6000);
  }
  document.addEventListener("click", showQuoteNotice);
  document.addEventListener("auxclick", showQuoteNotice);
  window.addEventListener("pagehide", () => {
    stopQuoteTimer();
    if (quoteDialog.open) quoteDialog.close();
  });
  $("#privacy-open").addEventListener("click", () =>
    openDialog($("#privacy-dialog")),
  );
  function showPublication(entry, fallbackTitle, fallbackDescription = "", productId) {
    $("#publication-title").textContent = entry.titulo || fallbackTitle;
    $("#publication-image").src = entry.imagen;
    $("#publication-image").alt = entry.alt || entry.titulo || fallbackTitle;
    $("#publication-description").textContent =
      entry.descripcion || fallbackDescription;
    externalLink(
      $("#publication-contact"),
      productLink(productId, entry.titulo || fallbackTitle),
    );
    openDialog(publicationDialog);
  }
  data.publicaciones
    .filter((item) => item.visible !== false)
    .forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "publication-card reveal";
      const info = document.createElement("div");
      info.className = "publication-info";
      const text = document.createElement("div");
      const label = document.createElement("p");
      label.textContent = item.categoria;
      const title = document.createElement("h3");
      const activeTitle = document.createElement("span");
      title.append(activeTitle);
      const link = document.createElement("a");
      link.textContent = "Me interesa ↗";
      const entries = [item, ...(item.imagenesAdicionales || [])];
      while (entries.length < 2) entries.push({ imagen: "" });
      // Reserva la altura del título más largo sin cortar texto al ampliar la fuente.
      [...new Set(entries.map((entry) => entry.titulo || item.titulo))].forEach(
        (text) => {
          const reserve = document.createElement("span");
          reserve.className = "publication-title-reserve";
          reserve.setAttribute("aria-hidden", "true");
          reserve.textContent = text;
          title.append(reserve);
        },
      );
      const carousel = window.crearCarrusel({
        imagenes: entries,
        titulo: item.titulo,
        automatico: true,
        intervalo: 5000 + index * 250,
        onOpen: (entry) =>
          showPublication(entry, item.titulo, item.descripcion, item.id),
        onChange: (entry) => {
          const selectedTitle = entry.titulo || item.titulo;
          const changed =
            activeTitle.textContent &&
            activeTitle.textContent !== selectedTitle;
          activeTitle.textContent = selectedTitle;
          if (changed && !reducedMotion.matches && activeTitle.animate) {
            activeTitle
              .getAnimations()
              .forEach((animation) => animation.cancel());
            activeTitle.animate(
              [
                { opacity: 0.2, transform: "translateY(3px)" },
                { opacity: 1, transform: "none" },
              ],
              { duration: 380, easing: "cubic-bezier(.22, 1, .36, 1)" },
            );
          }
          link.setAttribute(
            "aria-label",
            `Pedir información: ${selectedTitle}`,
          );
          externalLink(link, productLink(item.id, selectedTitle));
        },
      });
      text.append(label, title);
      info.append(text, link);
      card.append(carousel, info);
      $("#publication-grid").append(card);
    });
  const offers = data.ofertas;
  if (!offers || offers.visible === false) $("#ofertas").hidden = true;
  else {
    $("#seasonal-title").textContent = offers.titulo;
    $("#seasonal-description").textContent = offers.descripcion;
    const card = document.createElement("div");
    card.className = "seasonal-card reveal";
    const info = document.createElement("div");
    info.className = "seasonal-info";
    const entries = [...offers.imagenes];
    while (entries.length < 4) entries.push({ imagen: "" });
    $("#ofertas").dataset.empty = String(
      entries.every((entry) => !entry.imagen),
    );
    const carousel = window.crearCarrusel({
      imagenes: entries,
      titulo: offers.titulo,
      temporada: true,
      onOpen: (entry) => showPublication(entry, offers.titulo),
      onChange: (entry) => {
        info.replaceChildren();
        if (!entry.imagen || entry.failed) return;
        const title = document.createElement("span");
        title.textContent = entry.titulo || offers.titulo;
        const link = document.createElement("a");
        link.textContent = "Me interesa ↗";
        externalLink(link, interestLink(entry.titulo || offers.titulo));
        info.append(title, link);
      },
    });
    card.append(carousel, info);
    $("#seasonal-carousel").append(card);
  }
  data.preguntas
    .filter((item) => item.visible)
    .forEach((item) => {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = item.pregunta;
      const answer = document.createElement("p");
      answer.textContent = item.respuesta;
      details.append(summary, answer);
      $("#faq-list").append(details);
      let expanded = false;
      let animation;
      summary.addEventListener("click", (event) => {
        event.preventDefault();
        expanded = !expanded;
        const from = details.getBoundingClientRect().height;
        animation?.cancel();
        if (reducedMotion.matches || !details.animate) {
          details.open = expanded;
          details.style.overflow = "";
          return;
        }
        details.open = expanded;
        const to = details.getBoundingClientRect().height;
        // Mantiene la respuesta visible durante la animación de salida.
        details.open = true;
        details.style.overflow = "hidden";
        animation = details.animate(
          [{ height: `${from}px` }, { height: `${to}px` }],
          {
            duration: 300,
            easing: "cubic-bezier(.22, 1, .36, 1)",
          },
        );
        animation.onfinish = () => {
          details.open = expanded;
          details.style.overflow = "";
          animation = null;
        };
      });
    });
  const menu = $("#nav");
  const menuToggle = $("#menu-toggle");
  function closeMenu() {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }
  menuToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  menu
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".header")) closeMenu();
  });
  matchMedia("(min-width:851px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
  const header = $(".header");
  const sectionLinks = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = sectionLinks.map((link) => $(link.getAttribute("href")));
  let navigationFrame = 0;
  const updateHeader = () => {
    navigationFrame = 0;
    header.classList.toggle("scrolled", window.scrollY > 16);
    const marker =
      header.getBoundingClientRect().bottom + Math.min(innerHeight * 0.3, 180);
    const active = sections.findIndex((section) => {
      const box = section.getBoundingClientRect();
      return box.top <= marker && box.bottom > marker;
    });
    sectionLinks.forEach((link, index) => {
      if (index === active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  const scheduleNavigation = () => {
    if (!navigationFrame) navigationFrame = requestAnimationFrame(updateHeader);
  };
  updateHeader();
  window.addEventListener("scroll", scheduleNavigation, { passive: true });
  window.addEventListener("resize", scheduleNavigation);
  // Animación por observación: sin dependencias y respetando movimiento reducido.
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
            // El retraso de entrada no debe retrasar el hover de las tarjetas.
            entry.target.addEventListener(
              "transitionend",
              () => {
                entry.target.style.removeProperty("--reveal-delay");
              },
              { once: true },
            );
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".insurer-row, .footer-main, .faq-list details")
      .forEach((el) => el.classList.add("reveal"));
    document
      .querySelectorAll(".product-grid, .publication-grid, .steps, .faq-list")
      .forEach((group) => {
        [...group.children].forEach((el, index) =>
          el.style.setProperty(
            "--reveal-delay",
            `${Math.min(index, 3) * 70}ms`,
          ),
        );
      });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    document.body.classList.add("motion-ready");
  }
  const panel = $("#chat-panel");
  const launcher = $("#chat-launcher");
  const input = $("#chat-input");
  const chatContent = $("#chat-content");
  let chatTrigger = launcher;
  let chatChange = 0;
  async function setChat(open, trigger) {
    const change = ++chatChange;
    launcher.setAttribute("aria-expanded", String(open));
    if (open) {
      chatTrigger = trigger || launcher;
      closeMenu();
      panel.hidden = false;
      panel.inert = false;
      input.focus({ preventScroll: true });
      chatContent.scrollTop = chatContent.scrollHeight;
      await animatePanel(panel, true);
    } else {
      chatTrigger.focus({ preventScroll: true });
      panel.inert = true;
      await animatePanel(panel, false);
      if (change === chatChange) panel.hidden = true;
    }
  }
  launcher.addEventListener("click", () =>
    setChat(launcher.getAttribute("aria-expanded") !== "true", launcher),
  );
  $("#chat-close").addEventListener("click", () => setChat(false));
  document
    .querySelectorAll("[data-open-chat]")
    .forEach((button) =>
      button.addEventListener("click", () => setChat(true, button)),
    );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if ($("dialog[open]")) return;
      if (!panel.hidden) setChat(false);
      if (menu.classList.contains("open")) {
        closeMenu();
        menuToggle.focus();
      }
    }
  });
  function addMessage(text, role = "bot", action, source) {
    const message = document.createElement("div");
    message.className = `chat-message ${role}`;
    message.textContent = text;
    if (action) {
      const a = document.createElement("a");
      a.textContent =
        action === "cotizar"
          ? "Abrir cotizador ↗"
          : "Continuar por WhatsApp ↗";
      externalLink(
        a,
        action === "cotizar" ? data.contacto.cotizador : waLink(),
      );
      message.append(a);
    }
    const reference = window.JR_FUENTES_CHAT?.[source];
    if (reference) {
      const link = document.createElement("a");
      link.className = "chat-source";
      link.textContent = reference.nombre + " ↗";
      externalLink(link, reference.url);
      message.append(link);
    }
    $("#chat-messages").append(message);
    if (!panel.hidden) {
      const top =
        message.getBoundingClientRect().top -
        chatContent.getBoundingClientRect().top +
        chatContent.scrollTop -
        16;
      chatContent.scrollTo({
        top,
        behavior: reducedMotion.matches ? "instant" : "smooth",
      });
    }
  }
  const asistente = window.crearAsistenteJR(
    data,
    window.JR_CONOCIMIENTO,
    window.JR_PREPARAR_COTIZACION,
  );
  function respond(question) {
    const q = question.trim().slice(0, 500);
    if (!q) return;
    addMessage(q, "user");
    const result = asistente.responder(q);
    addMessage(result.respuesta, "bot", result.accion, result.fuente);
  }
  addMessage(data.asistente.bienvenida);
  data.asistente.sugerencias.forEach((text) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.type = "button";
    button.addEventListener("click", () => respond(text));
    $("#chat-suggestions").append(button);
  });
  $("#chat-form").addEventListener("submit", (event) => {
    event.preventDefault();
    respond(input.value);
    input.value = "";
    input.focus({ preventScroll: true });
  });
})();
