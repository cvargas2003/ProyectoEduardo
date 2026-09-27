/*
 * Comportamiento de la página de Santa Marta.
 * Sin dependencias propias: GSAP y ScrollTrigger llegan por CDN y, si no cargan,
 * la página funciona igual, solo que sin animaciones.
 */
(function () {
  'use strict';

  var D = window.NAUTILUS || { fotos: [], videos: [], whatsapp: '' };
  var raiz = document.documentElement;
  var movimiento = window.matchMedia('(prefers-reduced-motion: no-preference)');

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  // Anchos disponibles en img/: 480, 800, 1200 y 1600.
  function foto(nombre, ancho) { return 'img/' + nombre + '-' + ancho + '.webp'; }
  function hayAnimacion() { return !!window.gsap && movimiento.matches; }

  /* ---------- WhatsApp ---------- */
  function enlaceWhatsapp(texto) {
    return 'https://wa.me/' + D.whatsapp + '?text=' + encodeURIComponent(texto);
  }
  $$('[data-whatsapp]').forEach(function (a) {
    a.href = enlaceWhatsapp('Hola, quisiera información sobre la Suite Dúplex Nautilus en Playa Salguero.');
    a.target = '_blank';
    a.rel = 'noopener';
  });
  $$('[data-airbnb]').forEach(function (a) { if (D.anuncioAirbnb) a.href = D.anuncioAirbnb; });

  var anio = $('#anio');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- Navegación ---------- */
  var nav = $('#nav');
  var botonMenu = $('.nav__menu');
  var iconoMenu = botonMenu.querySelector('use');

  // Transparente solo arriba del todo: al bajar, el texto del hero pasaría por debajo del logo.
  function navSegunScroll() { nav.classList.toggle('nav--solida', window.scrollY > 60); }
  window.addEventListener('scroll', navSegunScroll, { passive: true });
  navSegunScroll();

  function menu(abrir) {
    nav.classList.toggle('nav--abierta', abrir);
    botonMenu.setAttribute('aria-expanded', String(abrir));
    botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    iconoMenu.setAttribute('href', abrir ? '#i-cerrar' : '#i-menu');
    document.body.style.overflow = abrir ? 'hidden' : '';
  }
  botonMenu.addEventListener('click', function () {
    menu(!nav.classList.contains('nav--abierta'));
  });
  $$('#menu a').forEach(function (a) { a.addEventListener('click', function () { menu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('nav--abierta')) { menu(false); botonMenu.focus(); }
  });

  /* ---------- Galería ---------- */
  var mosaico = $('#mosaico');
  var verMas = $('#ver-mas');
  // Cada bloque de 10 fotos llena justo 3 filas en 4 columnas y 6 filas en 2: la 1.ª es alta,
  // la 5.ª ancha. Si el patrón no cuadra, la rejilla deja huecos en medio del mosaico.
  var FORMAS = ['alto', '', '', '', 'ancho', '', '', '', '', ''];
  var INICIALES = 10;
  var filtro = 'todas';
  var expandida = false;
  var lista = [];

  function pintarGaleria(animar) {
    lista = D.fotos.filter(function (f) { return filtro === 'todas' || f.cat === filtro; });
    var visibles = expandida ? lista : lista.slice(0, INICIALES);

    // El último bloque incompleto va sin tamaños especiales: así el único hueco posible
    // queda al final de la última fila, no en medio.
    var conForma = visibles.length - (visibles.length % FORMAS.length);

    mosaico.replaceChildren();
    visibles.forEach(function (f, i) {
      var boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'mosaico__item';
      var forma = i < conForma ? FORMAS[i % FORMAS.length] : '';
      if (forma) boton.classList.add('mosaico__item--' + forma);
      boton.setAttribute('aria-label', 'Ampliar foto: ' + f.alt);

      var img = document.createElement('img');
      img.src = foto(f.f, 800);
      img.srcset = foto(f.f, 480) + ' 480w, ' + foto(f.f, 800) + ' 800w, ' + foto(f.f, 1200) + ' 1200w';
      img.sizes = '(min-width: 760px) 25vw, 50vw';
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';

      boton.appendChild(img);
      boton.addEventListener('click', function () { abrirVisor(i); });
      mosaico.appendChild(boton);
    });

    verMas.hidden = expandida || lista.length <= INICIALES;
    verMas.textContent = 'Ver las ' + lista.length + ' fotos';

    if (animar && hayAnimacion()) {
      gsap.from(mosaico.children, { opacity: 0, y: 24, duration: .7, stagger: .04, ease: 'power3.out' });
    }
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  $$('.filtro').forEach(function (b) {
    b.addEventListener('click', function () {
      filtro = b.dataset.filtro;
      expandida = false;
      $$('.filtro').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      pintarGaleria(true);
    });
  });
  verMas.addEventListener('click', function () {
    var primeraNueva = INICIALES;
    expandida = true;
    pintarGaleria(false);
    // Lleva el foco a la primera foto que acaba de aparecer, para no perder el lugar.
    var nueva = mosaico.children[primeraNueva];
    if (nueva) nueva.focus();
    if (hayAnimacion()) {
      gsap.from(Array.prototype.slice.call(mosaico.children, primeraNueva), { opacity: 0, y: 24, duration: .7, stagger: .04, ease: 'power3.out' });
    }
  });

  /* ---------- Visor de fotos ---------- */
  var visor = $('#visor');
  var visorImg = $('#visor-img');
  var visorTexto = $('#visor-texto');
  var visorContador = $('#visor-contador');
  var actual = 0;
  var disparador = null;

  function mostrarFoto(i) {
    actual = (i + lista.length) % lista.length;
    var f = lista[actual];
    visorImg.style.opacity = '0';
    visorImg.onload = function () { visorImg.style.transition = 'opacity .35s ease'; visorImg.style.opacity = '1'; };
    visorImg.src = foto(f.f, 1600);
    visorImg.alt = f.alt;
    visorTexto.textContent = f.alt;
    visorContador.textContent = (actual + 1) + ' / ' + lista.length;
    // Precarga las vecinas para que pasar de foto sea instantáneo.
    [actual + 1, actual - 1].forEach(function (j) {
      new Image().src = foto(lista[(j + lista.length) % lista.length].f, 1600);
    });
  }
  function abrirVisor(i) {
    disparador = document.activeElement;
    mostrarFoto(i);
    visor.showModal();
  }
  $('#visor-ant').addEventListener('click', function () { mostrarFoto(actual - 1); });
  $('#visor-sig').addEventListener('click', function () { mostrarFoto(actual + 1); });
  visor.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') mostrarFoto(actual - 1);
    if (e.key === 'ArrowRight') mostrarFoto(actual + 1);
  });
  visor.addEventListener('click', function (e) { if (e.target === visor) visor.close(); });
  visor.addEventListener('close', function () { if (disparador) disparador.focus(); });

  var toqueX = null;
  visor.addEventListener('touchstart', function (e) { toqueX = e.touches[0].clientX; }, { passive: true });
  visor.addEventListener('touchend', function (e) {
    if (toqueX === null) return;
    var dx = e.changedTouches[0].clientX - toqueX;
    if (Math.abs(dx) > 50) mostrarFoto(actual + (dx < 0 ? 1 : -1));
    toqueX = null;
  });

  $$('[data-cerrar]').forEach(function (b) {
    b.addEventListener('click', function () { b.closest('dialog').close(); });
  });

  /* ---------- Video ---------- */
  var reproductor = $('#reproductor');
  var marco = $('#reproductor-marco');
  var disparadorVideo = null;

  function abrirVideo(i) {
    var v = D.videos[i];
    if (!v) return;
    disparadorVideo = document.activeElement;
    $('#reproductor-titulo').textContent = v.titulo;

    var el;
    if (v.tipo === 'mp4') {
      el = document.createElement('video');
      el.src = v.id;
      el.controls = true;
      el.autoplay = true;
      el.playsInline = true;
    } else {
      el = document.createElement('iframe');
      el.src = v.tipo === 'youtube'
        ? 'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&rel=0'
        : 'https://drive.google.com/file/d/' + v.id + '/preview';
      el.title = v.titulo;
      el.allow = 'autoplay; fullscreen; picture-in-picture';
    }
    // El video solo se carga al abrir, y se destruye al cerrar para que deje de sonar.
    marco.replaceChildren(el);
    reproductor.showModal();
    sincronizarBucle();
  }
  $$('[data-abrir-video]').forEach(function (b) {
    b.addEventListener('click', function () { abrirVideo(Number(b.dataset.abrirVideo)); });
  });
  // Chromium dispara el evento "close" en el siguiente cuadro de pintado, así que el video
  // se destruye en el acto en cada forma de cerrar (botón, clic afuera, Escape) y no un cuadro después.
  function cerrarVideo() {
    marco.replaceChildren();
    if (reproductor.open) reproductor.close();
    sincronizarBucle();
  }
  reproductor.querySelector('[data-cerrar]').addEventListener('click', cerrarVideo);
  reproductor.addEventListener('click', function (e) { if (e.target === reproductor) cerrarVideo(); });
  reproductor.addEventListener('cancel', function () { marco.replaceChildren(); });
  reproductor.addEventListener('close', function () {
    marco.replaceChildren();
    sincronizarBucle();
    if (disparadorVideo) disparadorVideo.focus();
  });

  /* ---------- Video en bucle, como un GIF ----------
   * Corre sin sonido y solo mientras se ve: el archivo no se pide hasta que la sección se
   * acerca, y se pausa al salir de pantalla. Con "reducir movimiento" o
   * ahorro de datos no arranca solo, y el botón de pausa sirve también para arrancarlo. */
  var bucle = $('.video__bucle');
  var botonPausa = $('.video__pausa');
  var iconoPausa = botonPausa.querySelector('use');
  var bucleVisible = false;
  var ahorroDatos = !!(navigator.connection && navigator.connection.saveData);
  var quiereReproducir = movimiento.matches && !ahorroDatos;

  // Única fuente de verdad: corre si se ve, si el usuario no lo pausó y si no está abierto
  // el reproductor con sonido (nunca dos videos a la vez).
  function sincronizarBucle() {
    if (bucleVisible && quiereReproducir && !reproductor.open) {
      if (!bucle.getAttribute('src')) bucle.src = bucle.dataset.src;
      var intento = bucle.play();
      if (intento) intento.catch(function () {}); // si el navegador se niega, queda el póster
    } else {
      bucle.pause();
    }
  }
  function pintarBotonPausa() {
    var corriendo = !bucle.paused;
    botonPausa.setAttribute('aria-label', corriendo ? 'Pausar video' : 'Reproducir video');
    iconoPausa.setAttribute('href', corriendo ? '#i-pausa' : '#i-play');
  }
  new IntersectionObserver(function (entradas) {
    bucleVisible = entradas[0].isIntersecting;
    sincronizarBucle();
  }, { rootMargin: '200px 0px' }).observe(bucle);
  botonPausa.addEventListener('click', function () {
    quiereReproducir = bucle.paused;
    sincronizarBucle();
  });
  bucle.addEventListener('play', pintarBotonPausa);
  bucle.addEventListener('pause', pintarBotonPausa);
  pintarBotonPausa();

  /* ---------- Tira de destinos ----------
   * Corre sola con una animación CSS en bucle. Se detiene al pasar el cursor y con su botón:
   * WCAG 2.2.2 pide poder parar todo lo que se mueve solo más de cinco segundos. */
  var tira = $('.marquesina');
  var botonTira = $('.marquesina__pausa');

  botonTira.addEventListener('click', function () {
    var pausada = tira.classList.toggle('marquesina--pausada');
    botonTira.setAttribute('aria-label', pausada ? 'Mover la tira de destinos' : 'Pausar la tira de destinos');
    botonTira.querySelector('use').setAttribute('href', pausada ? '#i-play' : '#i-pausa');
  });

  /* ---------- Pestañas del itinerario ---------- */
  var pestanas = $$('[role="tab"]');
  function activarPestana(t, enfocar) {
    pestanas.forEach(function (x) {
      var activa = x === t;
      x.setAttribute('aria-selected', String(activa));
      x.tabIndex = activa ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !activa;
    });
    if (enfocar) t.focus();
    var panel = document.getElementById(t.getAttribute('aria-controls'));
    if (hayAnimacion()) {
      gsap.from(panel.querySelectorAll('.agenda li, .escapadas li, .panel__foto'), { opacity: 0, y: 16, duration: .6, stagger: .06, ease: 'power3.out' });
    }
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  pestanas.forEach(function (t, i) {
    t.addEventListener('click', function () { activarPestana(t, false); });
    t.addEventListener('keydown', function (e) {
      var j = null;
      if (e.key === 'ArrowRight') j = (i + 1) % pestanas.length;
      if (e.key === 'ArrowLeft') j = (i - 1 + pestanas.length) % pestanas.length;
      if (e.key === 'Home') j = 0;
      if (e.key === 'End') j = pestanas.length - 1;
      if (j !== null) { e.preventDefault(); activarPestana(pestanas[j], true); }
    });
  });

  /* ---------- Formulario de reserva ---------- */
  var form = $('#formulario');
  var llegada = $('#llegada');
  var salida = $('#salida');
  var nombre = $('#nombre');
  var textoNoches = $('#noches');
  var formatoFecha = new Intl.DateTimeFormat('es-CO', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  // Fechas en hora local: toISOString() usa UTC y en Colombia correría el día después de las 7 p. m.
  function aIso(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function deIso(s) { var p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function noches() { return Math.round((deIso(salida.value) - deIso(llegada.value)) / 864e5); }

  var hoy = aIso(new Date());
  llegada.min = hoy;
  salida.min = hoy;

  function error(campo, texto) {
    var p = document.getElementById('error-' + campo.id);
    p.textContent = texto || '';
    if (texto) campo.setAttribute('aria-invalid', 'true');
    else campo.removeAttribute('aria-invalid');
  }
  function actualizarNoches() {
    if (llegada.value && salida.value && salida.value > llegada.value) {
      var n = noches();
      textoNoches.textContent = n + (n === 1 ? ' noche' : ' noches') + ' frente al mar';
    } else {
      textoNoches.textContent = '';
    }
  }
  llegada.addEventListener('change', function () {
    if (llegada.value) {
      var siguiente = deIso(llegada.value);
      siguiente.setDate(siguiente.getDate() + 1);
      salida.min = aIso(siguiente);
      if (salida.value && salida.value <= llegada.value) salida.value = '';
    }
    error(llegada);
    actualizarNoches();
  });
  salida.addEventListener('change', function () { error(salida); actualizarNoches(); });
  nombre.addEventListener('input', function () { if (nombre.value.trim()) error(nombre); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var invalidos = [];

    if (!llegada.value) { error(llegada, 'Elija la fecha de llegada.'); invalidos.push(llegada); }
    else if (llegada.value < hoy) { error(llegada, 'La llegada no puede ser una fecha pasada.'); invalidos.push(llegada); }
    else error(llegada);

    if (!salida.value) { error(salida, 'Elija la fecha de salida.'); invalidos.push(salida); }
    else if (llegada.value && salida.value <= llegada.value) { error(salida, 'La salida debe ser después de la llegada.'); invalidos.push(salida); }
    else error(salida);

    if (!nombre.value.trim()) { error(nombre, 'Escriba su nombre para saber a quién responder.'); invalidos.push(nombre); }
    else error(nombre);

    if (invalidos.length) { invalidos[0].focus(); return; }

    var n = noches();
    var huespedes = $('#huespedes').value;
    var mensaje = $('#mensaje').value.trim();
    var texto =
      'Hola, quisiera reservar la Suite Dúplex Nautilus.\n\n' +
      '• Llegada: ' + formatoFecha.format(deIso(llegada.value)) + '\n' +
      '• Salida: ' + formatoFecha.format(deIso(salida.value)) + ' (' + n + (n === 1 ? ' noche' : ' noches') + ')\n' +
      '• Huéspedes: ' + huespedes + '\n' +
      '• Nombre: ' + nombre.value.trim() +
      (mensaje ? '\n• Mensaje: ' + mensaje : '') +
      '\n\n¿Me confirma disponibilidad y tarifa?';

    window.open(enlaceWhatsapp(texto), '_blank', 'noopener');
  });

  /* ---------- Animaciones ----------
   * Todo se oculta con opacity, nunca con autoAlpha: autoAlpha pone visibility: hidden, y lo
   * que está oculto así sale del orden del tabulador. Quien navega con teclado se saltaría
   * enlaces, botones y el formulario de reserva hasta haberlos visto con el scroll. */
  pintarGaleria(false);

  function iniciarAnimaciones() {
    if (!window.gsap || !window.ScrollTrigger) { raiz.classList.add('listo'); return; }
    gsap.registerPlugin(ScrollTrigger);

    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', function () {
      // Entrada del hero. Los estados iniciales los fija fromTo antes de quitar el ocultamiento del CSS.
      // y: 0 es necesario: GSAP lee el translateY(105%) del CSS como un desplazamiento en px
      // y, sin esto, las líneas del título se quedan corridas hacia abajo al terminar.
      var entrada = gsap.timeline({ defaults: { ease: 'power3.out' } });
      entrada
        .fromTo('.hero__img', { scale: 1.14 }, { scale: 1, duration: 2.8, ease: 'power2.out' }, 0)
        .fromTo('.hero__titulo .linea > span', { yPercent: 105, y: 0 }, { yPercent: 0, y: 0, duration: 1.3, stagger: .12, ease: 'power4.out' }, .2)
        .fromTo('.hero-anim', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, stagger: .1 }, .65);
      raiz.classList.add('listo');

      // El mar del hero se queda un poco atrás al bajar (nunca el texto).
      gsap.to('.hero__media', {
        yPercent: 14, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });

      gsap.utils.toArray('[data-revelar]').forEach(function (el) {
        gsap.from(el, {
          opacity: 0, y: 20, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });

      gsap.utils.toArray('[data-revelar-grupo]').forEach(function (grupo) {
        gsap.from(grupo.children, {
          opacity: 0, y: 20, duration: .8, stagger: .07, ease: 'power3.out',
          scrollTrigger: { trigger: grupo, start: 'top 85%', once: true }
        });
      });

      // Las fotos se descubren de abajo hacia arriba mientras se asientan.
      gsap.utils.toArray('[data-mascara]').forEach(function (el) {
        var media = el.querySelector('img, video');
        var tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
        tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut', clearProps: 'clipPath' });
        // clearProps: sin él, el transform en línea que deja GSAP anula el zoom del :hover del CSS.
        if (media) tl.from(media, { scale: 1.18, duration: 1.8, ease: 'power3.out', clearProps: 'transform' }, 0);
      });

      gsap.utils.toArray('[data-parallax]').forEach(function (el) {
        gsap.fromTo(el, { yPercent: -6 }, {
          yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });

      // Galería: entra escalonada la primera vez que se ve.
      ScrollTrigger.create({
        trigger: mosaico, start: 'top 85%', once: true,
        onEnter: function () {
          gsap.from(mosaico.children, { opacity: 0, y: 28, duration: .8, stagger: .05, ease: 'power3.out' });
        }
      });

      gsap.utils.toArray('[data-contar]').forEach(function (el) {
        var fin = parseFloat(el.dataset.contar);
        var decimales = Number(el.dataset.decimales || 0);
        var valor = { v: 0 };
        gsap.to(valor, {
          v: fin, duration: 1.6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: function () { el.textContent = valor.v.toFixed(decimales).replace('.', ','); }
        });
      });

      gsap.utils.toArray('.barra i').forEach(function (i) {
        gsap.from(i, { scaleX: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: i, start: 'top 92%', once: true } });
      });
    });

    // Sin movimiento: se muestra todo en su estado final.
    if (!movimiento.matches) raiz.classList.add('listo');

    // Las fuentes y las fotos cambian las alturas: recalcular los disparadores.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  iniciarAnimaciones();
})();
