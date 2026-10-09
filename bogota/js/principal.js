/*
 * Comportamiento de la página de Casa Universitaria.
 * Misma base que santa-marta/js/principal.js (cada sitio se publica aparte, por eso va
 * duplicada). GSAP y ScrollTrigger llegan por CDN y, si no cargan, la página funciona
 * igual, solo que sin animaciones: el logo se ve armado y sus cuadros siguen siendo enlaces.
 */
(function () {
  'use strict';

  var D = window.CASA_U || { whatsapp: '', instagram: '', horarios: [] };
  var raiz = document.documentElement;
  var movimiento = window.matchMedia('(prefers-reduced-motion: no-preference)');

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------- WhatsApp e Instagram ---------- */
  function enlaceWhatsapp(texto) {
    return 'https://wa.me/' + D.whatsapp + '?text=' + encodeURIComponent(texto);
  }
  $$('[data-whatsapp]').forEach(function (a) {
    a.href = enlaceWhatsapp('Hola, quiero información sobre las habitaciones de Casa Universitaria.');
    a.target = '_blank';
    a.rel = 'noopener';
  });
  if (D.instagram) $$('[data-instagram]').forEach(function (a) { a.href = D.instagram; });
  if (D.telefono) $$('[data-telefono]').forEach(function (a) { a.href = 'tel:+' + D.telefono; });

  var anio = $('#anio');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- Navegación ---------- */
  var nav = $('#nav');
  var botonMenu = $('.nav__menu');
  var iconoMenu = botonMenu.querySelector('use');

  // Transparente solo arriba del todo: al bajar, el texto pasaría por debajo del menú.
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

  /* ---------- Logo pequeño del menú ----------
   * Cada sección tiene data-cuadro con el número de su cuadro del logo (0 a 7, en orden de
   * lectura). Al pasar por la mitad de la pantalla, ese cuadro se queda encendido. */
  var marca = $('.marca');
  var enlacesNav = $$('#menu a:not(.boton)');
  function marcar(cuadro) {
    if (cuadro === null) marca.removeAttribute('data-actual');
    else marca.setAttribute('data-actual', cuadro);
    enlacesNav.forEach(function (a) {
      var seccion = document.getElementById(a.getAttribute('href').slice(1));
      if (cuadro !== null && seccion && seccion.getAttribute('data-cuadro') === cuadro) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }
  var mitad = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) marcar(e.target.getAttribute('data-cuadro'));
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  $$('[data-cuadro], .hero').forEach(function (s) { mitad.observe(s); });

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

  /* ---------- Simulación del ingreso por reconocimiento facial ----------
   * listo → escaneando (la barra baja y los puntos se encienden de arriba abajo) → verificado.
   * Corre una vez al aparecer en pantalla y el botón la repite. */
  var escaner = $('#escaner');
  var botonEscaner = $('#probar-escaner');
  var textoEscaner = $('.escaner__texto', escaner);
  var mensajesEscaner = {
    listo: 'Listo para escanear',
    escaneando: 'Escaneando rostro…',
    verificado: 'Rostro verificado · Acceso concedido'
  };
  var esperaEscaner;
  $$('.escaner__puntos circle', escaner).forEach(function (p) {
    p.style.setProperty('--retraso', ((p.getAttribute('cy') - 40) / 165 * 1.3).toFixed(2) + 's');
  });
  function estadoEscaner(estado) {
    escaner.setAttribute('data-estado', estado);
    textoEscaner.textContent = mensajesEscaner[estado];
  }
  function escanear() {
    clearTimeout(esperaEscaner);
    $('span', botonEscaner).textContent = 'Probar otra vez';
    if (!movimiento.matches) { estadoEscaner('verificado'); return; }
    estadoEscaner('listo');
    void escaner.offsetWidth; // reinicia transiciones y la barra antes de volver a escanear
    estadoEscaner('escaneando');
    esperaEscaner = setTimeout(function () { estadoEscaner('verificado'); }, 1900);
  }
  botonEscaner.addEventListener('click', escanear);
  if (movimiento.matches) {
    var verEscaner = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { verEscaner.disconnect(); setTimeout(escanear, 400); }
    }, { threshold: .6 });
    verEscaner.observe(escaner);
  }

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

  // "Visitar esta sede" deja la sede ya escogida en el formulario.
  $$('[data-sede]').forEach(function (a) {
    a.addEventListener('click', function () {
      $$('input[name="sede"]', form).forEach(function (r) { r.checked = r.value === a.getAttribute('data-sede'); });
    });
  });

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

    var sede = $('input[name="sede"]:checked', form);
    var universidad = $('#universidad').value.trim();
    var mudanza = $('#mudanza').value.trim();
    if (/^\d{4}-\d{2}$/.test(mudanza)) mudanza = formatoMes.format(deIso(mudanza));
    var mensaje = $('#mensaje').value.trim();

    var texto =
      'Hola, quiero agendar una visita a Casa Universitaria.\n\n' +
      '• Sede: ' + (sede ? sede.value : 'Cualquiera de las dos') + '\n' +
      '• Día: ' + formatoFecha.format(deIso(dia.value)) + '\n' +
      '• Hora: ' + selectHora.value + '\n' +
      '• Nombre: ' + nombre.value.trim() +
      (universidad ? '\n• Universidad: ' + universidad : '') +
      (mudanza ? '\n• Me quiero mudar: ' + mudanza : '') +
      (mensaje ? '\n• Mensaje: ' + mensaje : '') +
      '\n\n¿Me confirman la visita?';

    window.open(enlaceWhatsapp(texto), '_blank', 'noopener');
  });

  /* ---------- El logo en cubos ----------
   * Los 8 cubos arrancan juntos formando un solo cubo de 2 × 2 × 2 que gira; luego cada uno
   * vuela a su lugar y queda el logo. Después se dibuja la casa (de abajo hacia arriba) y
   * aparecen las letras. data-esquina dice qué rincón del cubo grande ocupa cada uno. */
  var logo = $('#logo3d');

  function armarLogo(linea) {
    var escena = $('.logo3d__escena', logo);
    var cubos = $$('.cubo', logo);
    var lado = cubos[0].offsetWidth;
    // Centro del bloque de cuadros, en unidades del logo (x 59,5–197,1; y 3,1–139,5) pasadas a px.
    var px = logo.offsetWidth / 140;
    var cx = (128.3 - 57.5) * px;
    var cy = (71.3 - 3) * px;

    logo.classList.add('logo3d--armando');
    cubos.forEach(function (cubo) {
      var e = cubo.getAttribute('data-esquina').split(',').map(Number);
      gsap.set(cubo, {
        transformOrigin: '50% 50% ' + (-lado / 2) + 'px',
        x: cx + e[0] * lado / 2 - (cubo.offsetLeft + lado / 2),
        y: cy + e[1] * lado / 2 - (cubo.offsetTop + lado / 2),
        z: (e[2] - 1) / 2 * lado
      });
    });
    gsap.set(escena, { transformOrigin: cx + 'px ' + cy + 'px ' + (-lado) + 'px', rotationX: -26, rotationY: -250, scale: .6 });

    linea
      .fromTo(logo, { opacity: 0 }, { opacity: 1, duration: .5, ease: 'power1.out' }, 0)
      .to(escena, { rotationY: -20, duration: 1.5, ease: 'power2.inOut' }, 0)
      .to(escena, { rotationX: 0, rotationY: 0, scale: 1, duration: 1.2, ease: 'power3.inOut' }, 1.5)
      .to(cubos, { x: 0, y: 0, z: 0, duration: 1.1, ease: 'power3.inOut', stagger: { each: .05, from: 'random' } }, 1.5)
      // La casa ocupa del 21 % al 80 % del alto: de 82 % a 20 % se ve crecer desde el piso.
      .fromTo('.logo3d__casa', { clipPath: 'inset(82% 0% 0% 0%)' }, { clipPath: 'inset(20% 0% 0% 0%)', duration: 1.1, ease: 'power2.inOut' }, 2.6)
      .fromTo('.logo3d__letras', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: .9, ease: 'power2.out' }, 2.9)
      .add(function () {
        // Sin restos de la entrada: el CSS vuelve a mandar y el cubo se asoma al pasar el cursor.
        gsap.set(cubos, { clearProps: 'transform,transformOrigin' });
        gsap.set(escena, { clearProps: 'transform,transformOrigin' });
        gsap.set('.logo3d__casa, .logo3d__letras', { clearProps: 'clipPath' });
        logo.classList.remove('logo3d--armando');
      });
  }

  // Con mouse, el logo se inclina un poco hacia el cursor y se ven los lados de los cubos.
  function inclinarLogo() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var mundo = $('.logo3d__mundo', logo);
    var girarX = gsap.quickTo(mundo, 'rotationX', { duration: .9, ease: 'power3.out' });
    var girarY = gsap.quickTo(mundo, 'rotationY', { duration: .9, ease: 'power3.out' });
    var hero = $('.hero');
    hero.addEventListener('pointermove', function (e) {
      var r = logo.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      var dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      girarY(gsap.utils.clamp(-1, 1, dx) * 16);
      girarX(gsap.utils.clamp(-1, 1, dy) * -12);
    });
    hero.addEventListener('pointerleave', function () { girarX(0); girarY(0); });
  }

  /* ---------- Animaciones ----------
   * Todo se oculta con opacity, nunca con autoAlpha: autoAlpha pone visibility: hidden, y lo
   * que está oculto así sale del orden del tabulador (en Santa Marta se saltaba el formulario). */
  function iniciarAnimaciones() {
    if (!window.gsap || !window.ScrollTrigger) { raiz.classList.add('listo'); return; }
    gsap.registerPlugin(ScrollTrigger);

    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', function () {
      // y: 0 es necesario en las líneas del título: GSAP leería el translateY(105%) del CSS
      // como px y las dejaría corridas.
      var entrada = gsap.timeline({ defaults: { ease: 'power3.out' } });
      armarLogo(entrada);
      entrada
        .fromTo('.hero__titulo .linea > span', { yPercent: 105, y: 0 }, { yPercent: 0, y: 0, duration: 1.3, stagger: .12, ease: 'power4.out' }, .2)
        .fromTo('.hero-anim', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, stagger: .1, clearProps: 'transform' }, .65);
      raiz.classList.add('listo');
      inclinarLogo();

      gsap.utils.toArray('[data-revelar]').forEach(function (el) {
        gsap.from(el, {
          opacity: 0, y: 20, duration: .9, ease: 'power3.out', clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });

      // clearProps: las tarjetas tienen su propio transform en el CSS (giro de las fotos,
      // salto al pasar el cursor) y el que deja GSAP en línea lo taparía.
      gsap.utils.toArray('[data-revelar-grupo]').forEach(function (grupo) {
        gsap.from(grupo.children, {
          opacity: 0, y: 26, duration: .8, stagger: .08, ease: 'power3.out', clearProps: 'transform',
          scrollTrigger: { trigger: grupo, start: 'top 85%', once: true }
        });
      });

      // Las fotos se descubren de abajo hacia arriba.
      gsap.utils.toArray('[data-mascara]').forEach(function (el) {
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut', clearProps: 'clipPath',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
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
