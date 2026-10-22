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
    // Los sábados se atiende solo medio día.
    else if (deIso(dia.value).getDay() === 6 && /p\. m\./.test(selectHora.value)) { error(dia, 'Los sábados las visitas son solo en la mañana.'); invalidos.push(dia); }
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

  /* ---------- Videos del recorrido ----------
   * Cargan al darles play (preload="none"). Suena uno solo; se pausan al salir de pantalla y
   * al abrir el panel de una sede, para que no sigan sonando detrás. */
  var videosPagina = $$('.pantalla video');
  function pausarVideosPagina() { videosPagina.forEach(function (v) { v.pause(); }); }
  videosPagina.forEach(function (v) {
    v.addEventListener('play', function () { videosPagina.forEach(function (otro) { if (otro !== v) otro.pause(); }); });
  });
  if (window.IntersectionObserver) {
    var fueraDePantalla = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { if (!e.isIntersecting) e.target.pause(); });
    });
    videosPagina.forEach(function (v) { fueraDePantalla.observe(v); });
  }

  /* ---------- Detalle de la sede: cómo llegar y galería ----------
   * Un solo <dialog> que se llena con los datos de la sede (datos.js, "sedes"). Dos pestañas:
   * "Cómo llegar" (mapa con el trayecto) y "Galería" (carrusel que rota solo y cambia la
   * descripción de cada foto). El carrusel se detiene al pasar el cursor o con el foco, cuando
   * no se ve y con su botón (WCAG 2.2.2); con "reducir movimiento" arranca detenido.
   * Solo se cargan la foto actual y sus vecinas: son 12 y pesan ~100 KB cada una. */
  var detalle = $('#detalle');
  if (detalle && D.sedes) {
    var tituloDetalle = $('#detalle-titulo');
    var NOMBRES = ['llegar', 'galeria'];
    var pestanas = { llegar: $('#pest-llegar'), galeria: $('#pest-galeria') };
    var paneles = { llegar: $('#panel-llegar'), galeria: $('#panel-galeria') };
    var marcoMapa = $('.detalle__mapa iframe', detalle);
    var enlaceMapa = $('[data-mapa-abrir]', detalle);
    var enlaceVisita = $('[data-detalle-visita]', detalle);
    var carrusel = $('.slider', detalle);
    var pista = $('.slider__pista', detalle);
    var cuenta = $('.slider__cuenta', detalle);
    var textoFoto = $('.slider__texto', detalle);
    var puntos = $('.slider__puntos', detalle);
    var botonPausa = $('.slider__pausa', detalle);
    var sede = null, laminas = [], indice = 0, reloj = null;
    var encima = false, enPausa = !movimiento.matches, pestanaActiva = 'llegar', abridor = null, urlMapa = '';

    function prepararMapa() {
      var q = encodeURIComponent;
      if (sede.trayecto) {
        urlMapa = 'https://maps.google.com/maps?saddr=' + q(sede.consulta) + '&daddr=' + q(sede.trayecto.hasta) + '&dirflg=w&hl=es&output=embed';
        enlaceMapa.href = 'https://www.google.com/maps/dir/?api=1&origin=' + q(sede.consulta) + '&destination=' + q(sede.trayecto.hasta) + '&travelmode=walking';
      } else {
        urlMapa = 'https://maps.google.com/maps?q=' + q(sede.consulta) + '&hl=es&z=16&output=embed';
        enlaceMapa.href = 'https://www.google.com/maps/search/?api=1&query=' + q(sede.consulta);
      }
    }

    function construirCarrusel() {
      pista.innerHTML = '';
      puntos.innerHTML = '';
      laminas = [];
      sede.fotos.forEach(function (f, i) {
        var fig = document.createElement('figure');
        fig.className = 'slider__lamina';
        fig.setAttribute('aria-hidden', 'true');
        // El fondo es la misma foto desenfocada: las verticales no quedan con barras vacías.
        var fondo = document.createElement('div');
        fondo.className = 'slider__fondo';
        var img = document.createElement('img');
        img.alt = f.desc;
        img.decoding = 'async';
        img.setAttribute('data-src', 'img/' + f.f + '.webp');
        fig.appendChild(fondo);
        fig.appendChild(img);
        pista.appendChild(fig);
        laminas.push(fig);
        var punto = document.createElement('button');
        punto.type = 'button';
        punto.className = 'slider__punto';
        punto.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
        punto.addEventListener('click', function () { mostrar(i); sincronizar(); });
        puntos.appendChild(punto);
      });
      indice = 0;
    }

    function cargar(i) {
      var n = laminas.length;
      if (!n) return;
      var fig = laminas[((i % n) + n) % n];
      var img = fig.querySelector('img');
      if (!img.getAttribute('src')) {
        var ruta = img.getAttribute('data-src');
        img.src = ruta;
        fig.firstChild.style.backgroundImage = 'url("' + ruta + '")';
      }
    }

    function mostrar(i) {
      var n = laminas.length;
      if (!n) return;
      indice = ((i % n) + n) % n;
      laminas.forEach(function (fig, k) {
        fig.classList.toggle('es-activa', k === indice);
        fig.setAttribute('aria-hidden', String(k !== indice));
      });
      $$('.slider__punto', puntos).forEach(function (p, k) {
        if (k === indice) p.setAttribute('aria-current', 'true'); else p.removeAttribute('aria-current');
      });
      cargar(indice); cargar(indice + 1); cargar(indice - 1);
      cuenta.textContent = (indice + 1) + ' / ' + n;
      textoFoto.textContent = sede.fotos[indice].desc;
      textoFoto.classList.remove('cambia');
      void textoFoto.offsetWidth; // reinicia el fundido de la descripción
      textoFoto.classList.add('cambia');
    }

    // Una sola función decide si el carrusel debe estar rotando.
    function sincronizar() {
      clearInterval(reloj);
      reloj = null;
      var quiere = detalle.open && pestanaActiva === 'galeria' && laminas.length > 1 && !enPausa && !encima && !document.hidden;
      if (quiere) reloj = setInterval(function () { mostrar(indice + 1); }, 5500);
      botonPausa.setAttribute('aria-label', enPausa ? 'Reproducir la rotación de fotos' : 'Pausar la rotación de fotos');
      botonPausa.querySelector('use').setAttribute('href', enPausa ? '#i-play' : '#i-pausa');
    }

    function pestana(nombre) {
      pestanaActiva = nombre;
      NOMBRES.forEach(function (n) {
        var activa = n === nombre;
        pestanas[n].setAttribute('aria-selected', String(activa));
        pestanas[n].tabIndex = activa ? 0 : -1;
        paneles[n].hidden = !activa;
      });
      if (nombre === 'llegar' && marcoMapa.getAttribute('src') !== urlMapa) marcoMapa.src = urlMapa;
      if (nombre === 'galeria') mostrar(indice);
      sincronizar();
    }

    function abrir(clave, nombrePestana, boton) {
      var s = D.sedes[clave];
      if (!s) return;
      sede = s;
      abridor = boton;
      var hayFotos = !!(s.fotos && s.fotos.length);
      tituloDetalle.textContent = s.nombre;
      $('.detalle__direccion', detalle).textContent = s.direccion;
      $('.detalle__trayecto', detalle).textContent = s.trayecto ? s.trayecto.texto : (s.llegar || '');
      enlaceVisita.setAttribute('data-sede', s.valorFormulario || '');
      pestanas.galeria.hidden = !hayFotos;
      pestanas.galeria.textContent = 'Galería' + (hayFotos ? ' (' + s.fotos.length + ')' : '');
      prepararMapa();
      construirCarrusel();
      encima = false;
      enPausa = !movimiento.matches;
      pausarVideosPagina();
      detalle.showModal();
      raiz.style.overflow = 'hidden';
      pestana(hayFotos && nombrePestana === 'galeria' ? 'galeria' : 'llegar');
    }

    // La limpieza es sincrónica: en Chromium el evento "close" llega un cuadro después.
    function limpiar() {
      clearInterval(reloj);
      reloj = null;
      raiz.style.overflow = '';
      marcoMapa.removeAttribute('src');
    }
    function cerrar(devolverFoco) {
      if (detalle.open) detalle.close();
      limpiar();
      if (devolverFoco !== false && abridor) abridor.focus();
      abridor = null;
    }

    $$('[data-detalle]').forEach(function (b) {
      b.addEventListener('click', function () { abrir(b.getAttribute('data-detalle'), b.getAttribute('data-pestana'), b); });
    });
    $$('[data-conteo]').forEach(function (e) {
      var s = D.sedes[e.getAttribute('data-conteo')];
      if (s && s.fotos && s.fotos.length) e.textContent = 'Ver galería · ' + s.fotos.length + ' fotos';
    });
    $('.detalle__cerrar', detalle).addEventListener('click', function () { cerrar(); });
    detalle.addEventListener('click', function (e) { if (e.target === detalle) cerrar(); });   // clic en el fondo
    detalle.addEventListener('cancel', limpiar);                                              // Esc
    // El "close" llega un cuadro tarde: si ya se abrió otra sede, no hay que borrarle el mapa.
    detalle.addEventListener('close', function () { if (!detalle.open) limpiar(); });
    enlaceVisita.addEventListener('click', function () { cerrar(false); });                    // sigue al formulario

    pestanas.llegar.addEventListener('click', function () { pestana('llegar'); });
    pestanas.galeria.addEventListener('click', function () { pestana('galeria'); });
    $('.detalle__pestanas', detalle).addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var visibles = NOMBRES.filter(function (n) { return !pestanas[n].hidden; });
      if (visibles.length < 2) return;
      var paso = e.key === 'ArrowRight' ? 1 : -1;
      var otra = visibles[(visibles.indexOf(pestanaActiva) + paso + visibles.length) % visibles.length];
      pestana(otra);
      pestanas[otra].focus();
    });

    $('.slider__flecha--ant', detalle).addEventListener('click', function () { mostrar(indice - 1); sincronizar(); });
    $('.slider__flecha--sig', detalle).addEventListener('click', function () { mostrar(indice + 1); sincronizar(); });
    botonPausa.addEventListener('click', function () { enPausa = !enPausa; sincronizar(); });
    carrusel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { mostrar(indice - 1); sincronizar(); }
      if (e.key === 'ArrowRight') { mostrar(indice + 1); sincronizar(); }
    });
    // Se detiene mientras el cursor está encima o el foco está dentro.
    carrusel.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { encima = true; sincronizar(); } });
    carrusel.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { encima = false; sincronizar(); } });
    carrusel.addEventListener('focusin', function () { encima = true; sincronizar(); });
    carrusel.addEventListener('focusout', function () { encima = false; sincronizar(); });
    document.addEventListener('visibilitychange', sincronizar);
    // Deslizar con el dedo
    var inicioX = null;
    $('.slider__marco', detalle).addEventListener('pointerdown', function (e) { inicioX = e.clientX; });
    $('.slider__marco', detalle).addEventListener('pointerup', function (e) {
      if (inicioX === null) return;
      var dx = e.clientX - inicioX;
      inicioX = null;
      if (Math.abs(dx) > 45) { mostrar(indice + (dx < 0 ? 1 : -1)); sincronizar(); }
    });
  }

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
        mecerLogo();
      });
  }

  // Después de armarse, el logo se mece despacio de lado a lado, también en el celular. Se mece
  // el "mundo" entero (cubos + casa + letras): si solo giraran los cubos, las líneas de la casa
  // quedarían corridas. Se detiene fuera de pantalla y con su botón (WCAG 2.2.2).
  function mecerLogo() {
    var mundo = $('.logo3d__mundo', logo);
    var boton = $('.logo3d__pausa');
    var pausadoAMano = false;
    var vaiven = gsap.timeline()
      .to(mundo, { rotationY: -14, rotationX: 4, duration: 1.6, ease: 'sine.inOut' })
      .add(gsap.to(mundo, { rotationY: 14, rotationX: -4, duration: 3.4, ease: 'sine.inOut', repeat: -1, yoyo: true }));
    boton.hidden = false;
    boton.addEventListener('click', function () {
      pausadoAMano = !vaiven.paused();
      if (pausadoAMano) vaiven.pause(); else vaiven.play();
      boton.setAttribute('aria-label', pausadoAMano ? 'Mover el logo' : 'Pausar el movimiento del logo');
      boton.querySelector('use').setAttribute('href', pausadoAMano ? '#i-play' : '#i-pausa');
    });
    new IntersectionObserver(function (e) {
      if (pausadoAMano) return;
      if (e[0].isIntersecting) vaiven.play(); else vaiven.pause();
    }).observe(logo);
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
