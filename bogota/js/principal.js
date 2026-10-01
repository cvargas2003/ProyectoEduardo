/*
 * Comportamiento de la página de La Casona.
 * Misma base que santa-marta/js/principal.js (cada sitio se publica aparte, por eso va
 * duplicada). GSAP y ScrollTrigger llegan por CDN y, si no cargan, la página funciona
 * igual, solo que sin animaciones.
 */
(function () {
  'use strict';

  var D = window.CASONA || { whatsapp: '', horarios: [] };
  var raiz = document.documentElement;
  var movimiento = window.matchMedia('(prefers-reduced-motion: no-preference)');

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------- WhatsApp ---------- */
  function enlaceWhatsapp(texto) {
    return 'https://wa.me/' + D.whatsapp + '?text=' + encodeURIComponent(texto);
  }
  $$('[data-whatsapp]').forEach(function (a) {
    a.href = enlaceWhatsapp('Hola, quiero información sobre las habitaciones de La Casona.');
    a.target = '_blank';
    a.rel = 'noopener';
  });

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

  /* ---------- Tira de palabras ----------
   * Corre sola con una animación CSS en bucle. Se detiene al pasar el cursor y con su botón:
   * WCAG 2.2.2 pide poder parar todo lo que se mueve solo más de cinco segundos. */
  var tira = $('.marquesina');
  var botonTira = $('.marquesina__pausa');
  botonTira.addEventListener('click', function () {
    var pausada = tira.classList.toggle('marquesina--pausada');
    botonTira.setAttribute('aria-label', pausada ? 'Mover la tira de palabras' : 'Pausar la tira de palabras');
    botonTira.querySelector('use').setAttribute('href', pausada ? '#i-play' : '#i-pausa');
  });

  /* ---------- Horarios de visita (una sola fuente: datos.js) ---------- */
  var listaHorarios = $('#horarios');
  var selectHora = $('#hora');
  D.horarios.forEach(function (h, i) {
    var li = document.createElement('li');
    li.textContent = h;
    listaHorarios.appendChild(li);
    var op = document.createElement('option');
    op.textContent = h;
    if (i === 1) op.selected = true;
    selectHora.appendChild(op);
  });

  /* ---------- Formulario de visita ---------- */
  var form = $('#formulario');
  var dia = $('#dia');
  var nombre = $('#nombre');
  var formatoFecha = new Intl.DateTimeFormat('es-CO', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  var formatoMes = new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric' });

  // Fechas en hora local: toISOString() usa UTC y en Colombia correría el día después de las 7 p. m.
  function aIso(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function deIso(s) { var p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2] || 1); }

  var hoy = aIso(new Date());
  dia.min = hoy;
  // En Safari y Firefox de escritorio "month" cae a texto libre: la pista ayuda y abajo se respeta lo escrito.
  $('#mudanza').placeholder = 'Ej.: enero 2027';

  function error(campo, texto) {
    var p = document.getElementById('error-' + campo.id);
    p.textContent = texto || '';
    if (texto) campo.setAttribute('aria-invalid', 'true');
    else campo.removeAttribute('aria-invalid');
  }
  dia.addEventListener('change', function () { error(dia); });
  nombre.addEventListener('input', function () { if (nombre.value.trim()) error(nombre); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var invalidos = [];

    if (!dia.value) { error(dia, 'Elige el día de la visita.'); invalidos.push(dia); }
    else if (dia.value < hoy) { error(dia, 'El día no puede ser una fecha pasada.'); invalidos.push(dia); }
    else if (deIso(dia.value).getDay() === 0) { error(dia, 'Las visitas son de lunes a sábado.'); invalidos.push(dia); }
    else error(dia);

    if (!nombre.value.trim()) { error(nombre, 'Escribe tu nombre para saber a quién responder.'); invalidos.push(nombre); }
    else error(nombre);

    if (invalidos.length) { invalidos[0].focus(); return; }

    var universidad = $('#universidad').value.trim();
    var mudanza = $('#mudanza').value.trim();
    if (/^\d{4}-\d{2}$/.test(mudanza)) mudanza = formatoMes.format(deIso(mudanza));
    var mensaje = $('#mensaje').value.trim();

    var texto =
      'Hola, quiero agendar una visita a La Casona.\n\n' +
      '• Día: ' + formatoFecha.format(deIso(dia.value)) + '\n' +
      '• Hora: ' + selectHora.value + '\n' +
      '• Nombre: ' + nombre.value.trim() +
      (universidad ? '\n• Universidad: ' + universidad : '') +
      '\n• Habitación: ' + $('#habitacion').value +
      (mudanza ? '\n• Me quiero mudar: ' + mudanza : '') +
      (mensaje ? '\n• Mensaje: ' + mensaje : '') +
      '\n\n¿Me confirman la visita?';

    window.open(enlaceWhatsapp(texto), '_blank', 'noopener');
  });

  /* ---------- Animaciones ----------
   * Todo se oculta con opacity, nunca con autoAlpha: autoAlpha pone visibility: hidden, y lo
   * que está oculto así sale del orden del tabulador (en Santa Marta se saltaba el formulario). */
  function iniciarAnimaciones() {
    if (!window.gsap || !window.ScrollTrigger) { raiz.classList.add('listo'); return; }
    gsap.registerPlugin(ScrollTrigger);

    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', function () {
      // Entrada: cae la noche. Estrellas y luna aparecen, el filo de los cerros se dibuja en oro
      // y la ciudad se enciende. y: 0 es necesario en las líneas del título: GSAP leería el
      // translateY(105%) del CSS como px y las dejaría corridas.
      var filo = $('.hero__cerros .filo');
      var largo = filo.getTotalLength();
      var entrada = gsap.timeline({ defaults: { ease: 'power3.out' } });
      entrada
        .fromTo('.hero__cielo .estrellas', { opacity: 0 }, { opacity: 1, duration: 2.4 }, 0)
        .fromTo('.hero__cielo .luna-halo', { opacity: 0, scale: .6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 2.4, ease: 'power2.out' }, .1)
        .fromTo('.hero__cielo .luna', { opacity: 0 }, { opacity: 1, duration: 1.8 }, .2)
        .fromTo(filo, { strokeDasharray: largo, strokeDashoffset: largo }, { strokeDashoffset: 0, duration: 2.8, ease: 'power2.inOut' }, .3)
        .fromTo('.hero__cerros .ciudad circle', { opacity: 0 }, { opacity: 1, duration: .6, stagger: { each: .04, from: 'random' } }, 1.3)
        .fromTo('.hero__cerros .cimas', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 2.4)
        .fromTo('.hero__titulo .linea > span', { yPercent: 105, y: 0 }, { yPercent: 0, y: 0, duration: 1.3, stagger: .12, ease: 'power4.out' }, .2)
        .fromTo('.hero-anim', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, stagger: .1 }, .65);
      raiz.classList.add('listo');

      // Profundidad al bajar: el cielo y los cerros de atrás se quedan un poco rezagados.
      var alBajar = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero__cielo', { yPercent: 14, ease: 'none', scrollTrigger: alBajar });
      gsap.to('.hero__cerros .capa-atras', { y: 26, ease: 'none', scrollTrigger: alBajar });
      gsap.to('.hero__cerros .capa-frente', { y: 8, ease: 'none', scrollTrigger: alBajar });

      gsap.utils.toArray('[data-revelar]').forEach(function (el) {
        gsap.from(el, {
          opacity: 0, y: 20, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });

      gsap.utils.toArray('[data-revelar-grupo]').forEach(function (grupo) {
        gsap.from(grupo.children, {
          opacity: 0, y: 24, duration: .8, stagger: .08, ease: 'power3.out',
          scrollTrigger: { trigger: grupo, start: 'top 85%', once: true },
          // Los huecos de foto dentro del grupo (las tarjetas de habitación) también destellan.
          onComplete: function () { $$('.hueco', grupo).forEach(function (h) { h.classList.add('destello'); }); }
        });
      });

      // Los huecos de foto se descubren de abajo hacia arriba y luego cruza el destello dorado.
      gsap.utils.toArray('[data-mascara]').forEach(function (el) {
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut', clearProps: 'clipPath',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onComplete: function () { el.classList.add('destello'); }
        });
      });

      // La línea que une los pasos del proceso se dibuja mientras se baja.
      gsap.fromTo('.proceso', { '--trazo': 0 }, {
        '--trazo': 1, ease: 'none',
        scrollTrigger: { trigger: '.proceso', start: 'top 80%', end: 'bottom 55%', scrub: .5 }
      });
    });

    // Sin movimiento: se muestra todo en su estado final.
    if (!movimiento.matches) raiz.classList.add('listo');

    // Las fuentes cambian las alturas: recalcular los disparadores.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  iniciarAnimaciones();
})();
