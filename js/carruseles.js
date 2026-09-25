/* Carrusel reutilizable sin dependencias, con reproducción automática opcional.
   Datos editables en contenido.js; no necesita servidor y funciona en GitHub Pages. */
window.crearCarrusel = function ({
  imagenes,
  titulo,
  temporada = false,
  automatico = false,
  intervalo = 8000,
  onOpen,
  onChange,
}) {
  const entries = imagenes.map((entry) => ({ ...entry }));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;
  let gesture = null;
  let suppressClickUntil = 0;
  const autoplay =
    automatico &&
    entries.filter((entry) => entry.imagen).length > 1;
  let timer = null;
  let inView = false;
  const root = document.createElement("div");
  root.className = `flyer-carousel${temporada ? " flyer-carousel-seasonal" : ""}`;
  root.setAttribute("role", "region");
  root.setAttribute("aria-roledescription", "carrusel");
  root.setAttribute("aria-label", titulo);
  const viewport = document.createElement("div");
  viewport.className = "carousel-viewport";
  viewport.tabIndex = 0;
  viewport.setAttribute(
    "aria-label",
    `${titulo}. Usa las flechas izquierda y derecha para cambiar de imagen.`,
  );
  const track = document.createElement("div");
  track.className = "carousel-track";
  viewport.append(track);
  const controls = document.createElement("div");
  controls.className = "carousel-controls";
  const prev = arrowButton("Imagen anterior", "M14 5l-7 7 7 7");
  const next = arrowButton("Imagen siguiente", "M10 5l7 7-7 7");
  const pagination = document.createElement("div");
  pagination.className = "carousel-pagination";
  pagination.setAttribute("role", "group");
  pagination.setAttribute("aria-label", "Elegir imagen");
  const counter = document.createElement("span");
  counter.className = "carousel-counter";
  counter.setAttribute("aria-hidden", "true");
  const status = document.createElement("p");
  status.className = "sr-only";
  status.setAttribute("role", "status");
  status.setAttribute("aria-atomic", "true");
  function keyboardImageFocused() {
    const focused = document.activeElement;
    return (
      root.contains(focused) &&
      focused.matches(".publication-image-button:focus-visible")
    );
  }
  function syncPlayback() {
    clearTimeout(timer);
    timer = null;
    if (!autoplay) return;
    const running =
      !gesture &&
      inView &&
      !document.hidden &&
      !reduced.matches &&
      !keyboardImageFocused() &&
      !document.body.classList.contains("modal-open");
    root.dataset.autoplay = running ? "running" : "paused";
    if (running)
      timer = setTimeout(
        () => {
          // No rotar a archivos ausentes ni a espacios aún sin contenido.
          let nextIndex = current;
          for (let step = 1; step < entries.length; step++) {
            const candidate = (current + step) % entries.length;
            if (entries[candidate].imagen && !entries[candidate].failed) {
              nextIndex = candidate;
              break;
            }
          }
          select(nextIndex, false);
        },
        Math.max(4000, intervalo),
      );
  }

  function arrowButton(label, path) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "carousel-arrow";
    button.setAttribute("aria-label", label);
    button.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
    return button;
  }
  function emptySlide(failed = false) {
    const empty = document.createElement("div");
    empty.className = "carousel-empty";
    const label = document.createElement("span");
    label.className = "carousel-empty-label";
    label.textContent = temporada ? "JR SEGUROS · TEMPORADA" : "JR SEGUROS";
    const heading = document.createElement("p");
    heading.className = "carousel-empty-title";
    heading.textContent = failed ? "Imagen no disponible" : "Próximamente";
    const description = document.createElement("p");
    description.className = "carousel-empty-description";
    description.textContent = failed
      ? "Puedes seguir explorando las demás publicaciones."
      : temporada
        ? "Aquí encontrarás nuestras ofertas de temporada."
        : "Más información para cuidar lo que más quieres.";
    empty.append(label, heading, description);
    return empty;
  }
  const slides = entries.map((entry, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "diapositiva");
    slide.setAttribute("aria-label", `${index + 1} de ${entries.length}`);
    if (entry.imagen) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "publication-image-button";
      button.setAttribute(
        "aria-label",
        `Ampliar imagen ${index + 1}: ${entry.titulo || titulo}`,
      );
      const image = document.createElement("img");
      image.alt = entry.alt || entry.titulo || titulo;
      image.loading = "lazy";
      image.decoding = "async";
      image.draggable = false;
      image.width = 1200;
      image.height = 655;
      image.addEventListener(
        "error",
        () => {
          entry.failed = true;
          slide.replaceChildren(emptySlide(true));
          if (index === current) onChange?.(entry, index);
        },
        { once: true },
      );
      image.src = entry.imagen;
      const zoom = document.createElement("span");
      zoom.className = "zoom-indicator";
      zoom.setAttribute("aria-hidden", "true");
      zoom.innerHTML =
        '<svg viewBox="0 0 24 24"><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5"/></svg>';
      button.append(image, zoom);
      button.addEventListener("click", () => {
        if (performance.now() < suppressClickUntil || entry.failed) return;
        onOpen?.(entry, index);
      });
      slide.append(button);
    } else slide.append(emptySlide());
    track.append(slide);
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute(
      "aria-label",
      `Mostrar imagen ${index + 1} de ${entries.length}${entry.imagen ? "" : ", próximamente"}`,
    );
    dot.addEventListener("click", () => select(index));
    pagination.append(dot);
    return slide;
  });

  function select(index, announce = true) {
    // Conserva el flyer que se está leyendo o abriendo con el teclado.
    if (!announce && keyboardImageFocused()) {
      syncPlayback();
      return;
    }
    const nextIndex = (index + entries.length) % entries.length;
    if (announce && nextIndex === current) {
      syncPlayback();
      return;
    }
    const moveFocus = slides[current].contains(document.activeElement);
    current = nextIndex;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, i) => {
      slide.inert = i !== current;
      slide.setAttribute("aria-hidden", String(i !== current));
      pagination.children[i].setAttribute(
        "aria-pressed",
        String(i === current),
      );
    });
    counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(entries.length).padStart(2, "0")}`;
    root.dataset.index = String(current);
    if (announce) {
      status.textContent = `Imagen ${current + 1} de ${entries.length}. ${entries[current].imagen ? entries[current].titulo || titulo : "Próximamente"}.`;
    }
    if (moveFocus) viewport.focus({ preventScroll: true });
    onChange?.(entries[current], current);
    syncPlayback();
  }
  prev.addEventListener("click", () => select(current - 1));
  next.addEventListener("click", () => select(current + 1));
  root.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    const destinations = {
      ArrowLeft: current - 1,
      ArrowRight: current + 1,
      Home: 0,
      End: entries.length - 1,
    };
    if (Object.hasOwn(destinations, event.key)) {
      event.preventDefault();
      select(destinations[event.key]);
    }
  });
  // Un gesto horizontal cambia de flyer; el desplazamiento vertical y el zoom siguen siendo nativos.
  viewport.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
    syncPlayback();
  });
  viewport.addEventListener("pointerup", (event) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    gesture = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      suppressClickUntil = performance.now() + 450;
      select(current + (dx < 0 ? 1 : -1));
    } else syncPlayback();
  });
  viewport.addEventListener("pointercancel", () => {
    gesture = null;
    syncPlayback();
  });
  viewport.addEventListener("pointerleave", () => {
    gesture = null;
    syncPlayback();
  });
  reduced.addEventListener("change", () => {
    track.style.transitionDuration = reduced.matches ? "0s" : "";
    syncPlayback();
  });
  if (autoplay) {
    // Las interacciones reinician el intervalo, sin dejar la reproducción detenida.
    root.addEventListener("focusin", syncPlayback);
    root.addEventListener("focusout", () => queueMicrotask(syncPlayback));
    document.addEventListener("visibilitychange", syncPlayback);
    new MutationObserver(syncPlayback).observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    if ("IntersectionObserver" in window)
      new IntersectionObserver(
        (changes) => {
          inView =
            changes[0].isIntersecting && changes[0].intersectionRatio >= 0.35;
          syncPlayback();
        },
        { threshold: [0, 0.35] },
      ).observe(root);
    else inView = true;
  }
  controls.append(prev, pagination, counter, next);
  root.append(viewport, controls, status);
  select(0, false);
  return root;
};
