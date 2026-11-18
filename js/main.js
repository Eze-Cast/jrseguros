(() => {
  "use strict";
  const D = window.JR;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ\s]/g, " ").replace(/\s+/g, " ").trim();
  const onView = (el, fn, opts = { threshold: 0.2 }) => {
    const o = new IntersectionObserver((es) => es.forEach((e) => fn(e.isIntersecting, e)), opts);
    o.observe(el);
    return o;
  };

  /* ================= WhatsApp ================= */
  const wa = (msg = D.contacto.mensaje) => `https://wa.me/${D.contacto.whatsapp}?text=${encodeURIComponent(msg)}`;
  const seguro = (n) => { n = n.toLowerCase(); return n.startsWith("seguro") ? n : "seguro de " + n; };
  const waProducto = (n) => `Hola, Ramón. Vi la página de JR Seguros y me interesa el ${seguro(n)}. ¿Me puedes dar información?`;
  $$("[data-whatsapp]").forEach((a) => (a.href = wa()));
  // Sin promociones vigentes (ofertas.visible: false en contenido.js): se oculta la sección.
  if (!D.ofertas.visible) {
    $("#ofertas").hidden = true;
    $$('a[href="#ofertas"]').forEach((a) => a.remove());
    D.ofertas.imagenes = [{ src: "data:image/gif;base64,R0lGODlhAQABAAAAACw=", titulo: "" }];
  }

  /* ================= Entrada ================= */
  // El progreso avanza solo hasta ~90 % y se completa cuando la portada y las
  // fuentes están listas. El valor mostrado persigue al objetivo con suavizado.
  const loader = $("#loader"), count = $("#loader-count"), ldProg = $("#ld-prog"), ldSpin = $("#ld-spin"), ldBar = $("#ld-bar");
  const RING = 339.29, MIN_MS = 1500, MAX_MS = 4500;
  // Siempre empezar arriba para que la entrada descubra la portada (salvo enlaces con #).
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) window.scrollTo(0, 0);
  let pageLoaded = false, started = false, ldShown = 0;
  const t0 = performance.now();
  const start = () => {
    if (started) return; started = true;
    loader.classList.add("done");
    setTimeout(() => {
      document.body.classList.add("loaded");
      setTimeout(() => document.body.classList.add("ready"), reduce ? 0 : 380);
      setTimeout(() => loader.remove(), 1700);
    }, reduce ? 0 : 420);
  };
  const ldLoop = (t) => {
    const el = t - t0;
    const auto = 90 * (1 - Math.exp(-el / 700));                   // avance natural
    const target = pageLoaded && el > MIN_MS ? 100 : Math.min(auto, pageLoaded ? 99 : 90);
    ldShown += (target - ldShown) * (target === 100 ? 0.12 : 0.08);
    if (target === 100 && ldShown > 99.6) ldShown = 100;
    const p = ldShown / 100;
    count.textContent = Math.round(ldShown);
    ldProg.style.strokeDashoffset = RING * (1 - p);
    ldSpin.style.transform = `rotate(${p * 360}deg)`;
    ldBar.style.transform = `scaleX(${p})`;
    if (ldShown >= 100 || el > MAX_MS) start();
    else requestAnimationFrame(ldLoop);
  };
  if (reduce) { start(); } else requestAnimationFrame(ldLoop);
  // No esperamos a todas las imágenes: basta con la portada y las fuentes.
  const heroImg = $(".hero-img");
  Promise.all([
    heroImg.decode ? heroImg.decode().catch(() => {}) : Promise.resolve(),
    document.fonts ? document.fonts.ready : Promise.resolve(),
  ]).then(() => { pageLoaded = true; });
  setTimeout(start, MAX_MS + 500);

  /* ================= Texto dividido ================= */
  $$("[data-split]").forEach((el) => {
    let i = 0;
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType !== 3) return walk(n);
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.append(" ");
        const w = document.createElement("span");
        w.className = "w";
        w.innerHTML = `<span style="--i:${i++}">${esc(part)}</span>`;
        frag.append(w);
      });
      n.replaceWith(frag);
    });
    walk(el);
  });

  /* ================= Scroll suave (escritorio) ================= */
  const root = document.documentElement;
  const smooth = fine && !reduce;
  let sTarget = scrollY, sCur = scrollY, sRun = false;
  const maxY = () => root.scrollHeight - innerHeight;
  const sLoop = () => {
    sCur += (sTarget - sCur) * 0.095;
    if (Math.abs(sTarget - sCur) < 0.4) { sCur = sTarget; sRun = false; }
    window.scrollTo(0, sCur);
    if (sRun) requestAnimationFrame(sLoop);
  };
  const sGo = () => { if (!sRun) { sRun = true; requestAnimationFrame(sLoop); } };
  const scrollToY = (y) => {
    y = clamp(y, 0, maxY());
    if (smooth) { if (!sRun) sCur = scrollY; sTarget = y; sGo(); }
    else window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  };
  if (smooth) {
    root.classList.add("smooth");
    window.addEventListener("wheel", (e) => {
      if (e.ctrlKey || document.body.classList.contains("lock")) return;
      if (e.target.closest("[data-native-scroll]")) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      const d = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? innerHeight : 1);
      if (!sRun) sCur = sTarget = scrollY;
      sTarget = clamp(sTarget + d, 0, maxY());
      sGo();
    }, { passive: false });
    window.addEventListener("scroll", () => { if (!sRun) sCur = sTarget = scrollY; }, { passive: true });
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const el = id === "#inicio" ? null : $(id);
    if (id !== "#inicio" && !el) return;
    e.preventDefault();
    scrollToY(el ? el.getBoundingClientRect().top + scrollY - 90 : 0);
  });

  /* ================= Header y menú ================= */
  const header = $("#header"), menu = $("#menu"), burger = $("#burger"), pill = $("#menu-pill");
  const links = $$(".menu > a");
  const sections = links.map((a) => $(a.getAttribute("href")));
  let activeLink = null;
  const movePill = (a) => {
    if (!a || innerWidth <= 1080) { pill.style.opacity = 0; return; }
    pill.style.opacity = 1;
    pill.style.width = a.offsetWidth + "px";
    pill.style.transform = `translateX(${a.offsetLeft}px)`;
  };
  links.forEach((a) => a.addEventListener("mouseenter", () => movePill(a)));
  menu.addEventListener("mouseleave", () => movePill(activeLink));
  const toggleMenu = (open) => {
    if (open) header.classList.remove("hide");
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.classList.toggle("open", open);
    document.body.classList.toggle("lock", open);
  };
  burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("open")));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  /* ================= Hero: selector ================= */
  const icons = { todo: "i-shield", auto: "i-auto", vida: "i-vida", gmm: "i-gastos-medicos", hogar: "i-hogar", empresa: "i-empresarial" };
  const ctaText = { todo: "Cotizar mi seguro", auto: "Cotizar mi auto", vida: "Cotizar seguro de vida", gmm: "Cotizar gastos médicos", hogar: "Cotizar mi hogar", empresa: "Cotizar por WhatsApp" };
  const picker = $("#picker");
  picker.innerHTML = D.hero.map((s, i) => `<button class="pchip" role="tab" aria-selected="${i === 0}" data-i="${i}" tabindex="${i === 0 ? 0 : -1}"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#${icons[s.id]}"/></svg>${esc(s.chip)}<span class="tick"></span></button>`).join("");
  const chips = $$(".pchip", picker);
  const photoInner = $(".hero-photo-inner"), cap = $("#hero-caption");
  const heroCta = $("#hero-cta"), heroWa = $("#hero-wa");
  D.hero.forEach((s) => { const im = new Image(); im.src = s.imagen; }); // precarga
  let slide = 0, autoHero = !reduce, heroTimer = null, heroVisible = true;
  const setSlide = (i, focus) => {
    if (i === slide && !focus) return;
    slide = (i + D.hero.length) % D.hero.length;
    const s = D.hero[slide];
    chips.forEach((c, k) => { c.setAttribute("aria-selected", k === slide); c.tabIndex = k === slide ? 0 : -1; c.classList.remove("auto"); });
    if (focus) chips[slide].focus();
    // imagen con barrido
    const old = $$(".hero-img", photoInner);
    const img = document.createElement("img");
    img.className = "hero-img"; img.alt = s.titulo; img.src = s.imagen; img.style.objectPosition = s.pos;
    photoInner.append(img);
    const show = () => requestAnimationFrame(() => requestAnimationFrame(() => img.classList.add("is-on")));
    img.decode ? img.decode().then(show, show) : show();
    setTimeout(() => old.forEach((o) => o.remove()), 1400);
    // texto
    cap.classList.remove("swap"); void cap.offsetWidth;
    $("#hero-cap-title").textContent = s.titulo; $("#hero-cap-text").textContent = s.texto;
    cap.classList.add("swap");
    // botones
    $("#hero-cta-text").textContent = ctaText[s.id];
    if (s.soloWhatsapp) heroCta.href = wa(waProducto(s.producto));
    else heroCta.href = "cotizar.html";
    heroWa.href = s.producto ? wa(waProducto(s.producto)) : wa();
    if (autoHero) queueHero();
  };
  const queueHero = () => {
    clearTimeout(heroTimer);
    if (!autoHero || !heroVisible) return;
    const c = chips[slide];
    c.classList.remove("auto"); void c.offsetWidth; c.style.setProperty("--t", "5.5s"); c.classList.add("auto");
    heroTimer = setTimeout(() => setSlide(slide + 1), 5500);
  };
  const stopAuto = () => { autoHero = false; clearTimeout(heroTimer); chips.forEach((c) => c.classList.remove("auto")); };
  chips.forEach((c) => c.addEventListener("click", () => { stopAuto(); setSlide(+c.dataset.i); }));
  picker.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault(); stopAuto(); setSlide(slide + (e.key === "ArrowRight" ? 1 : -1), true);
  });
  onView($("#hero"), (v) => { heroVisible = v; if (v && autoHero) queueHero(); else clearTimeout(heroTimer); }, { threshold: 0.3 });
  setTimeout(() => autoHero && queueHero(), 2400);

  // Profundidad con el mouse
  const hero = $("#hero"), depthEls = $$("[data-depth]");
  if (fine && !reduce) {
    hero.addEventListener("pointermove", (e) => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      depthEls.forEach((el) => { const d = +el.dataset.depth; el.style.transform = `translate(${x * d}px, ${y * d}px)`; });
    });
    hero.addEventListener("pointerleave", () => depthEls.forEach((el) => (el.style.transform = "")));
  }

  /* ================= Aliados (marquesina con logos) ================= */
  const track = $("#allies-track");
  const item = (a, hidden) => `<li${hidden ? ' aria-hidden="true"' : ""}><span class="logo-card"><img src="${a.logo}" alt="${hidden ? "" : esc(a.nombre)}" style="--h:${a.h}" loading="lazy" draggable="false" /></span></li>`;
  const once = D.aliados.map((a) => item(a)).join("");
  track.innerHTML = once + D.aliados.map((a) => item(a, true)).join("");
  let mx = 0, mDir = 1, mHover = false, mVisible = false, lastSY = scrollY, mRun = false;
  const marquee = $("#marquee");
  marquee.addEventListener("mouseenter", () => (mHover = true));
  marquee.addEventListener("mouseleave", () => (mHover = false));
  const mLoop = () => {
    const vel = scrollY - lastSY; lastSY = scrollY;
    if (Math.abs(vel) > 1) mDir = vel > 0 ? 1 : -1;
    const speed = (mHover ? 0.15 : 0.7) + Math.min(Math.abs(vel) * 0.25, 12);
    const half = track.scrollWidth / 2;
    mx -= speed * mDir;
    if (mx <= -half) mx += half;
    if (mx > 0) mx -= half;
    track.style.transform = `translate3d(${mx}px,0,0)`;
    if (mVisible) requestAnimationFrame(mLoop); else mRun = false;
  };
  if (!reduce) onView(marquee, (v) => { mVisible = v; if (v && !mRun) { mRun = true; lastSY = scrollY; requestAnimationFrame(mLoop); } }, { threshold: 0 });

  /* ================= Cifras ================= */
  $$("[data-count]").forEach((el) => {
    const to = +el.dataset.count;
    el.textContent = to === 0 ? "0" : "0";
    const io = onView(el, (v) => {
      if (!v) return; io.disconnect();
      if (reduce || to === 0) { el.textContent = to; return; }
      const t0 = performance.now();
      const step = (t) => { const p = clamp((t - t0) / 1600, 0, 1); el.textContent = Math.round((1 - Math.pow(1 - p, 4)) * to); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
  });

  /* ================= Seguros (paneles) ================= */
  const panels = $("#panels");
  panels.innerHTML = D.productos.map((p, i) => {
    const cot = p.cotizable ? `<a class="btn btn-sm btn-primary" data-cotizar href="cotizar.html" target="_blank" rel="noopener noreferrer">${esc(p.accion)} <span class="arrow">↗</span></a>` : "";
    return `<article class="panel${i === 0 ? " open" : ""}" role="listitem" tabindex="0" style="--i:${i}" aria-label="${esc(p.titulo)}" data-cursor="${i === 0 ? "" : "Abrir"}">
      <img src="${p.imagen}" alt="" loading="lazy" />
      <span class="panel-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${p.id}"/></svg></span>
      <span class="panel-num">0${i + 1}</span>
      <span class="panel-name">${esc(p.nombre)}</span>
      <div class="panel-body">
        <h3>${esc(p.titulo)}</h3><p>${esc(p.descripcion)}</p>
        <div class="tags">${p.detalles.map((d) => `<span>${esc(d)}</span>`).join("")}</div>
        <div class="panel-actions">${cot}
          <a class="btn btn-sm btn-wa" href="${wa(waProducto(p.titulo))}" target="_blank" rel="noopener noreferrer"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-wa"/></svg>${p.cotizable ? "Preguntar a Ramón" : esc(p.accion)}</a>
        </div>
      </div>
      <span class="panel-progress"></span>
    </article>`;
  }).join("");
  const pEls = $$(".panel", panels);
  let pHoverT = null;
  const openPanel = (el) => pEls.forEach((p) => { const o = p === el; p.classList.toggle("open", o); p.dataset.cursor = o ? "" : "Abrir"; });
  pEls.forEach((p) => {
    if (fine) {
      p.addEventListener("mouseenter", () => { clearTimeout(pHoverT); pHoverT = setTimeout(() => openPanel(p), 90); });
      p.addEventListener("mouseleave", () => clearTimeout(pHoverT));
    }
    p.addEventListener("click", (e) => { if (!e.target.closest("a")) openPanel(p); });
    p.addEventListener("focus", () => openPanel(p));
  });

  /* ================= Visor ================= */
  const lb = $("#lightbox"), lbImg = $("#lb-img");
  let lbSet = [], lbIdx = 0, lastFocus = null;
  const lbShow = (i) => {
    lbIdx = (i + lbSet.length) % lbSet.length;
    const it = lbSet[lbIdx];
    lbImg.classList.add("swap");
    setTimeout(() => { lbImg.onload = () => lbImg.classList.remove("swap"); lbImg.src = it.src; lbImg.alt = it.alt || it.titulo || ""; }, lbImg.getAttribute("src") ? 200 : 0);
    $("#lb-cat").textContent = it.cat || "";
    $("#lb-title").textContent = it.titulo || "";
    $("#lb-desc").textContent = it.desc || "";
    $("#lb-wa").href = wa(it.msg);
    const multi = lbSet.length > 1;
    $("#lb-prev").hidden = $("#lb-next").hidden = !multi;
    $("#lb-count").textContent = multi ? `${lbIdx + 1} / ${lbSet.length}` : "";
  };
  const lbOpen = (set, i = 0) => {
    lbSet = set; lastFocus = document.activeElement;
    lbImg.removeAttribute("src");
    lbShow(i);
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
    setTimeout(() => $("#lb-close").focus(), 50);
  };
  const lbClose = () => {
    lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lock");
    lastFocus && lastFocus.focus({ preventScroll: true });
  };
  $("#lb-close").addEventListener("click", lbClose);
  $("#lb-prev").addEventListener("click", () => lbShow(lbIdx - 1));
  $("#lb-next").addEventListener("click", () => lbShow(lbIdx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lbClose(); });
  let lbTx = null;
  lb.addEventListener("touchstart", (e) => (lbTx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => { if (lbTx === null || lbSet.length < 2) return; const dx = e.changedTouches[0].clientX - lbTx; lbTx = null; if (Math.abs(dx) > 50) lbShow(lbIdx + (dx < 0 ? 1 : -1)); });

  /* ================= Publicaciones ================= */
  const rail = $("#pubs");
  rail.innerHTML = D.publicaciones.map((p, i) => `<button class="pub" style="--i:${i}" data-i="${i}" data-cursor="Ver" aria-label="Ver publicación: ${esc(p.titulo)}">
    <div class="pub-img"><img src="${p.imagenes[0].src}" alt="${esc(p.imagenes[0].alt)}" loading="lazy" draggable="false" />
      <span class="count">${p.imagenes.length} imágenes</span><span class="shine"></span></div>
    <small>${esc(p.categoria)}</small><h3>${esc(p.titulo)}</h3><p>${esc(p.descripcion)}</p>
  </button>`).join("");
  let dragged = false;
  $$(".pub", rail).forEach((b) => {
    b.addEventListener("click", () => {
      if (dragged) return;
      const p = D.publicaciones[b.dataset.i];
      lbOpen(p.imagenes.map((im) => ({ ...im, cat: p.categoria, titulo: p.titulo, desc: p.descripcion, msg: waProducto(p.categoria) })));
    });
    if (fine && !reduce) {
      const card = $(".pub-img", b);
      b.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.transform = `rotateY(${(x - 0.5) * 8}deg) rotateX(${(0.5 - y) * 8}deg) translateY(-6px)`;
        card.style.setProperty("--mx", x * 100 + "%"); card.style.setProperty("--my", y * 100 + "%");
      });
      b.addEventListener("pointerleave", () => (card.style.transform = ""));
    }
  });
  // arrastrar con el mouse, con inercia
  let rDown = false, rSx = 0, rSl = 0, rV = 0, rLastX = 0;
  rail.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" || e.button !== 0) return; rDown = true; dragged = false; rSx = rLastX = e.clientX; rSl = rail.scrollLeft; rV = 0; });
  window.addEventListener("pointermove", (e) => {
    if (!rDown) return;
    const dx = e.clientX - rSx;
    if (Math.abs(dx) > 6 && !dragged) { dragged = true; rail.classList.add("dragging"); }
    if (dragged) { rail.scrollLeft = rSl - dx; rV = e.clientX - rLastX; rLastX = e.clientX; }
  });
  window.addEventListener("pointerup", () => {
    if (!rDown) return; rDown = false;
    if (!dragged) return;
    const glide = () => { rail.scrollLeft -= rV; rV *= 0.92; if (Math.abs(rV) > 0.5) requestAnimationFrame(glide); else { rail.classList.remove("dragging"); setTimeout(() => (dragged = false), 0); } };
    requestAnimationFrame(glide);
  });
  $$("[data-rail]").forEach((b) => b.addEventListener("click", () => {
    const step = ($(".pub", rail)?.offsetWidth || 400) + 28;
    rail.scrollBy({ left: step * b.dataset.dir, behavior: "smooth" });
  }));
  const pubProg = $("#pubs-progress");
  const railProg = () => {
    const max = rail.scrollWidth - rail.clientWidth, vis = rail.clientWidth / rail.scrollWidth;
    pubProg.style.transform = `scaleX(${Math.min(1, vis + (max > 0 ? rail.scrollLeft / max : 1) * (1 - vis))})`;
  };
  rail.addEventListener("scroll", railProg, { passive: true });
  window.addEventListener("resize", railProg);
  railProg();

  /* ================= Ofertas (mazo) ================= */
  const of = D.ofertas;
  $("#offers-desc").textContent = of.descripcion;
  $("#offers-note").textContent = of.nota;
  $("#off-n").textContent = String(of.imagenes.length).padStart(2, "0");
  const deck = $("#deck");
  deck.innerHTML = of.imagenes.map((o, i) => `<button class="card" data-i="${i}" data-cursor="Ver" aria-label="Ver ${esc(o.titulo)}"><img src="${o.src}" alt="${esc(o.titulo)}" loading="lazy" draggable="false" /></button>`).join("");
  const cards = $$(".card", deck);
  const offTitle = $("#off-title"), timerBar = $("#off-timer");
  let cur = 0, elapsed = 0, paused = false, deckVisible = false, lastT = 0, deckRun = false;
  const DUR = 5000;
  const layout = () => {
    const n = cards.length;
    cards.forEach((c, i) => {
      const rel = (i - cur + n) % n;
      c.dataset.pos = rel <= 2 ? rel : rel === n - 1 ? "-1" : "hide";
      c.tabIndex = rel === 0 ? 0 : -1;
      c.style.removeProperty("--drag");
    });
    $("#off-i").textContent = String(cur + 1).padStart(2, "0");
    offTitle.classList.remove("swap"); void offTitle.offsetWidth;
    offTitle.textContent = of.imagenes[cur].titulo; offTitle.classList.add("swap");
  };
  const go = (d) => { cur = (cur + d + cards.length) % cards.length; elapsed = 0; layout(); };
  const deckLoop = (t) => {
    const dt = lastT ? t - lastT : 16; lastT = t;
    if (!paused && !reduce) { elapsed += dt; if (elapsed >= DUR) go(1); }
    timerBar.style.transform = `scaleX(${elapsed / DUR})`;
    if (deckVisible) requestAnimationFrame(deckLoop); else { deckRun = false; lastT = 0; }
  };
  onView(deck, (v) => { deckVisible = v; if (v && !deckRun) { deckRun = true; requestAnimationFrame(deckLoop); } }, { threshold: 0.3 });
  $("#off-next").addEventListener("click", () => go(1));
  $("#off-prev").addEventListener("click", () => go(-1));
  deck.addEventListener("mouseenter", () => (paused = true));
  deck.addEventListener("mouseleave", () => (paused = false));
  let dDown = false, dSx = 0, dDx = 0, dMoved = false;
  deck.addEventListener("pointerdown", (e) => {
    const c = e.target.closest(".card");
    if (!c || c.dataset.pos !== "0") return;
    dDown = true; dMoved = false; dSx = e.clientX; dDx = 0; paused = true;
    deck.classList.add("grabbing");
  });
  window.addEventListener("pointermove", (e) => {
    if (!dDown) return;
    dDx = e.clientX - dSx;
    if (Math.abs(dDx) > 6) dMoved = true;
    cards[cur].style.setProperty("--drag", dDx + "px");
  });
  window.addEventListener("pointerup", (e) => {
    if (!dDown) return; dDown = false;
    deck.classList.remove("grabbing");
    paused = fine && deck.matches(":hover");
    if (Math.abs(dDx) > 90) go(dDx < 0 ? 1 : -1);
    else cards[cur].style.removeProperty("--drag");
  });
  deck.addEventListener("pointercancel", () => { dDown = false; deck.classList.remove("grabbing"); cards[cur].style.removeProperty("--drag"); });
  cards.forEach((c) => c.addEventListener("click", () => {
    if (dMoved) { dMoved = false; return; }
    const i = +c.dataset.i;
    if (i !== cur) { cur = i; elapsed = 0; layout(); return; }
    lbOpen(of.imagenes.map((o) => ({ src: o.src, alt: o.titulo, titulo: o.titulo, cat: "Oferta de temporada", desc: o.desc || of.nota, msg: `Hola, Ramón. Vi en la página de JR Seguros la ${o.titulo.toLowerCase()} y me gustaría más información.` })), i);
  }));
  layout();

  /* ================= Preguntas frecuentes ================= */
  const faq = $("#faq-list"), faqEmpty = $("#faq-empty"), faqQ = $("#faq-q");
  const action = (a) =>
    a === "cotizar" ? `<a class="act" href="cotizar.html" target="_blank" rel="noopener noreferrer">Abrir cotizador ↗</a>`
    : a === "whatsapp" ? `<a class="act" href="${wa()}" target="_blank" rel="noopener noreferrer">Escribir a Ramón por WhatsApp ↗</a>` : "";
  const mark = (text, q) => {
    if (!q) return esc(text);
    const words = q.split(" ").filter((w) => w.length > 2);
    let out = esc(text);
    words.forEach((w) => {
      const re = new RegExp(`(${w.split("").map((ch) => { const map = { a: "[aá]", e: "[eé]", i: "[ií]", o: "[oó]", u: "[uúü]", n: "[nñ]" }; return map[ch] || ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("")})`, "gi");
      out = out.replace(re, "<mark>$1</mark>");
    });
    return out;
  };
  const renderFaq = (q = "") => {
    const nq = norm(q);
    const list = nq
      ? D.preguntas.filter((p) => nq.split(" ").every((w) => norm(p.pregunta + " " + p.respuesta + " " + p.palabras.join(" ")).includes(w)))
      : D.preguntas.filter((p) => p.visible);
    faq.innerHTML = list.map((p, i) => `<div class="qa${nq && i === 0 ? " open" : ""}" data-anim="up" style="--d:${Math.min(i, 6) * 0.06}s">
      <button aria-expanded="${!!(nq && i === 0)}" aria-controls="qa-${p.id}"><span>${mark(p.pregunta, nq)}</span><span class="plus" aria-hidden="true"></span></button>
      <div class="qa-a" id="qa-${p.id}" role="region"><div><p>${esc(p.respuesta)}</p>${action(p.accion)}</div></div></div>`).join("");
    faqEmpty.hidden = list.length > 0;
    $$(".qa", faq).forEach((el) => { if (nq) el.classList.add("in"); else revealIO.observe(el); });
    $$(".qa button", faq).forEach((b) => b.addEventListener("click", () => {
      const item = b.parentElement, open = !item.classList.contains("open");
      $$(".qa", faq).forEach((x) => { x.classList.remove("open"); $("button", x).setAttribute("aria-expanded", "false"); });
      item.classList.toggle("open", open); b.setAttribute("aria-expanded", open);
    }));
  };
  let faqT = null;
  faqQ.addEventListener("input", () => { clearTimeout(faqT); faqT = setTimeout(() => renderFaq(faqQ.value), 140); });

  /* ================= Asistente ================= */
  const chat = $("#chat"), chatBtn = $("#chat-btn"), body = $("#chat-body");
  let greeted = false;
  const addMsg = (html, who = "bot") => { const m = document.createElement("div"); m.className = `msg ${who}`; m.innerHTML = html; body.append(m); body.scrollTop = body.scrollHeight; };
  const answer = (text) => {
    const t = " " + norm(text) + " ";
    let best = null, score = 0;
    D.preguntas.forEach((q) => {
      let s = 0;
      q.palabras.forEach((p) => { const k = norm(p); if (t.includes(" " + k + " ") || (k.length > 4 && t.includes(k))) s += k.split(" ").length + 1; });
      if (norm(q.pregunta) === norm(text)) s += 10;
      if (s > score) { score = s; best = q; }
    });
    if (/hablar por whatsapp/.test(t)) best = D.preguntas.find((q) => q.id === "seguimiento");
    if (/quiero cotizar/.test(t)) best = D.preguntas.find((q) => q.id === "cotizar");
    return best ? esc(best.respuesta) + (best.accion ? "<br>" + action(best.accion) : "") : esc(D.asistente.sinRespuesta) + "<br>" + action("whatsapp");
  };
  const ask = (text) => {
    addMsg(esc(text), "me");
    const typing = document.createElement("div");
    typing.className = "msg bot typing"; typing.innerHTML = "<i></i><i></i><i></i>";
    body.append(typing); body.scrollTop = body.scrollHeight;
    setTimeout(() => { typing.remove(); addMsg(answer(text)); }, reduce ? 0 : 700);
  };
  $("#chat-sugs").innerHTML = D.asistente.sugerencias.map((s) => `<button type="button">${esc(s)}</button>`).join("");
  $$("#chat-sugs button").forEach((b) => b.addEventListener("click", () => ask(b.textContent)));
  $("#chat-form").addEventListener("submit", (e) => { e.preventDefault(); const inp = $("#chat-input"), v = inp.value.trim(); if (v) { ask(v); inp.value = ""; } });
  const toggleChat = (open) => {
    chat.classList.toggle("open", open);
    chat.setAttribute("aria-hidden", !open);
    chatBtn.setAttribute("aria-expanded", open);
    if (open) {
      if (!greeted) { greeted = true; setTimeout(() => addMsg(esc(D.asistente.bienvenida)), 280); }
      if (fine) setTimeout(() => $("#chat-input").focus({ preventScroll: true }), 320);
    }
  };
  chatBtn.addEventListener("click", () => toggleChat(!chat.classList.contains("open")));
  $("#chat-close").addEventListener("click", () => toggleChat(false));
  document.addEventListener("click", (e) => { if (e.target.closest("[data-open-chat]")) toggleChat(true); });

  document.addEventListener("keydown", (e) => {
    if (lb.classList.contains("open")) {
      if (e.key === "Escape") lbClose();
      if (e.key === "ArrowRight") lbShow(lbIdx + 1);
      if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
    } else if (e.key === "Escape") { toggleChat(false); toggleMenu(false); }
  });

  /* ================= Arma tu mensaje ================= */
  const builder = $("#builder"), bWa = $("#builder-wa"), bText = $("#bubble-text");
  builder.innerHTML = D.productos.map((p) => `<button class="bchip" type="button" aria-pressed="false" data-id="${p.id}"><span class="box"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-check"/></svg></span>${esc(p.nombre)}</button>`).join("");
  const picked = new Set();
  const buildMsg = () => {
    if (!picked.size) return D.contacto.mensaje;
    const names = D.productos.filter((p) => picked.has(p.id)).map((p) => seguro(p.titulo));
    const list = names.length > 1 ? names.slice(0, -1).join(", ") + " y " + names.at(-1) : names[0];
    return `Hola, Ramón. Vi la página de JR Seguros y me gustaría cotizar: ${list}. ¿Me ayudas?`;
  };
  let typeT = null, shown = "";
  const typeTo = (msg) => {
    clearTimeout(typeT);
    if (reduce) { bText.textContent = shown = msg; return; }
    let common = 0;
    while (common < shown.length && shown[common] === msg[common]) common++;
    const back = () => {
      if (shown.length > common) { shown = shown.slice(0, -1); bText.textContent = shown; typeT = setTimeout(back, 6); }
      else fwd();
    };
    const fwd = () => {
      if (shown.length < msg.length) { shown = msg.slice(0, shown.length + 1); bText.textContent = shown; typeT = setTimeout(fwd, 14); }
    };
    back();
  };
  const updateBuilder = () => { const m = buildMsg(); bWa.href = wa(m); typeTo(m); };
  $$(".bchip", builder).forEach((b) => b.addEventListener("click", () => {
    const id = b.dataset.id;
    picked.has(id) ? picked.delete(id) : picked.add(id);
    b.setAttribute("aria-pressed", picked.has(id));
    updateBuilder();
  }));
  bWa.href = wa(buildMsg());
  const contact = $("#contacto"), floating = $("#floating");
  let typedOnce = false;
  onView(contact, (v) => {
    floating.classList.toggle("away", v && !chat.classList.contains("open"));
    if (v && !typedOnce) { typedOnce = true; setTimeout(updateBuilder, 500); }
  }, { threshold: 0.35 });

  /* ================= Revelado al hacer scroll ================= */
  const revealIO = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); }
  }), { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  renderFaq();
  $$("[data-anim], .panel, .pub, [data-split]:not(.hero-title), #foot-word").forEach((el) => revealIO.observe(el));

  /* ================= Botones magnéticos ================= */
  if (fine && !reduce) $$(".magnetic").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });

  /* ================= Cursor ================= */
  const cursor = $("#cursor"), cLabel = $("#cursor-label");
  if (fine && !reduce) {
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    window.addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; cursor.classList.add("on"); }, { passive: true });
    document.addEventListener("pointerleave", () => cursor.classList.remove("on"));
    document.addEventListener("pointerover", (e) => {
      const lab = e.target.closest("[data-cursor]");
      const txt = lab && lab.dataset.cursor;
      const inter = e.target.closest("a, button, input, label, [tabindex]");
      const useLabel = !!txt && (!inter || inter === lab || !lab.contains(inter));
      if (useLabel) cLabel.textContent = txt;
      cursor.classList.toggle("label", useLabel);
      cursor.classList.toggle("hover", !!inter && !useLabel);
    });
    const cLoop = () => { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; requestAnimationFrame(cLoop); };
    requestAnimationFrame(cLoop);
  } else cursor.remove();

  /* ================= Bucle de scroll ================= */
  const bar = $("#scroll-bar"), photo = $(".hero-photo-inner");
  const stepsEl = $("#steps"), stepsLine = $("#steps-line"), stepLis = $$("#steps li");
  let lastY = scrollY, ticking = false;
  const onScroll = () => {
    const y = scrollY, h = innerHeight, max = maxY();
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    header.classList.toggle("scrolled", y > 30);
    if (!menu.classList.contains("open")) header.classList.toggle("hide", y > lastY + 2 && y > 600 ? true : y < lastY - 2 ? false : header.classList.contains("hide"));
    lastY = y;
    if (!reduce && y < h * 1.2) photo.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
    const r = stepsEl.getBoundingClientRect();
    const p = clamp((h * 0.65 - r.top) / r.height, 0, 1);
    stepsLine.style.transform = `scaleY(${p})`;
    stepLis.forEach((li) => li.classList.toggle("lit", li.getBoundingClientRect().top + 50 < h * 0.65));
    let act = null;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < h * 0.4) act = i; });
    const a = act === null ? null : links[act];
    if (a !== activeLink) { links.forEach((l) => l.classList.toggle("active", l === a)); activeLink = a; if (!menu.matches(":hover")) movePill(a); }
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", () => movePill(activeLink));
  onScroll();

  /* ================= Varios ================= */
  $("#year").textContent = new Date().getFullYear();
  $("#to-top").addEventListener("click", () => scrollToY(0));
  const waBtn = $(".wa-btn");
  setTimeout(() => { waBtn.classList.add("nudge"); setTimeout(() => waBtn.classList.remove("nudge"), 3500); }, 9000);
  const cookie = $("#cookie");
  try { if (!sessionStorage.getItem("jr-cookie")) cookie.hidden = false; } catch { cookie.hidden = false; }
  $("#cookie-ok").addEventListener("click", () => { cookie.hidden = true; try { sessionStorage.setItem("jr-cookie", "1"); } catch {} });
})();
