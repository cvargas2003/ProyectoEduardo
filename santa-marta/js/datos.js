/*
 * Contenido editable de la página de Santa Marta.
 * Todo lo que cambia con frecuencia vive aquí: número de WhatsApp, fotos y videos.
 * Los textos de las secciones están en index.html para que los buscadores los lean.
 */
window.NAUTILUS = {

  // Número del propietario, en formato internacional sin "+" ni espacios.
  whatsapp: '573203193258',

  anuncioAirbnb: 'https://www.airbnb.mx/rooms/32046242',

  // Videos que abre el reproductor con sonido. El primero es también el que corre en bucle
  // en la sección "En video" (ver index.html).
  // tipo: 'mp4' (ruta del archivo) | 'drive' (id del archivo de Google Drive) | 'youtube' (id).
  videos: [
    {
      // Descargado del Drive del propietario (el mismo del código QR del anuncio,
      // id 1zCyCDLzQtBraj2iKNF1q1SDBxfeCVjI_): 960×544, 62 s, pasó por WhatsApp.
      titulo: 'Recorrido por la suite y la vista',
      tipo: 'mp4',
      id: 'video/recorrido.mp4'
    }
  ],

  // Fotos del anuncio de Airbnb, bajadas a img/ en WebP de 480, 800, 1200 y 1600 px
  // (f es el nombre sin el ancho: img/<f>-<ancho>.webp). Las descargas completas están en
  // C:\ProyectoEduardo\fotos-airbnb. Cuando lleguen los originales del propietario se
  // regeneran los cuatro tamaños con el mismo nombre y no hay que tocar nada más.
  // cat: atardecer | piscina | interior | edificio
  fotos: [
    { cat: 'atardecer', alt: 'El sol se pone sobre el mar frente a Playa Salguero', f: 'atardecer-sol-se-pone-mar-playa' },
    { cat: 'piscina',   alt: 'Piscina del edificio al anochecer, entre palmeras', f: 'piscina-edificio-anochecer-palmeras' },
    { cat: 'piscina',   alt: 'Piscina, palmeras y las carpas del edificio sobre la playa', f: 'piscina-palmeras-carpas-edificio-playa' },
    { cat: 'interior',  alt: 'Sala y cocina del nivel social', f: 'interior-sala-cocina-nivel-social' },
    { cat: 'atardecer', alt: 'Atardecer con rocas sobre el agua', f: 'atardecer-rocas-agua' },
    { cat: 'interior',  alt: 'Habitación principal con cama Queen', f: 'interior-habitacion-principal-cama-queen' },
    { cat: 'piscina',   alt: 'Piscina con vista a la bahía', f: 'piscina-vista-bahia' },
    { cat: 'interior',  alt: 'Balcón con vista lateral al mar', f: 'interior-balcon-vista-lateral-mar' },
    { cat: 'atardecer', alt: 'Sol bajo junto a los acantilados', f: 'atardecer-sol-bajo-acantilados' },
    { cat: 'edificio',  alt: 'Fachada del Edificio Nautilus entre palmeras', f: 'edificio-fachada-edificio-nautilus-palmeras' },
    { cat: 'interior',  alt: 'Escalera del dúplex y sala', f: 'interior-escalera-duplex-sala' },
    { cat: 'piscina',   alt: 'Playa Salguero al caer la tarde', f: 'piscina-playa-salguero-caer-tarde' },
    { cat: 'atardecer', alt: 'Cielo naranja con una lancha en el horizonte', f: 'atardecer-cielo-naranja-una-lancha-horizonte' },
    { cat: 'interior',  alt: 'Cocina tipo americana con barra', f: 'interior-cocina-tipo-americana-barra' },
    { cat: 'piscina',   alt: 'Piscina para adultos y niños frente al mar', f: 'piscina-para-adultos-ninos-mar' },
    { cat: 'interior',  alt: 'Camarote con cama doble y sencilla', f: 'interior-camarote-cama-doble-sencilla' },
    { cat: 'piscina',   alt: 'Palmeras de la playa frente al edificio', f: 'piscina-palmeras-playa-edificio' },
    { cat: 'atardecer', alt: 'Atardecer entre nubes sobre el Caribe', f: 'atardecer-nubes-caribe' },
    { cat: 'interior',  alt: 'Sala con televisor y escritorio', f: 'interior-sala-televisor-escritorio' },
    { cat: 'piscina',   alt: 'Piscina y palmeras', f: 'piscina-palmeras' },
    { cat: 'interior',  alt: 'Comedor y cocina', f: 'interior-comedor-cocina' },
    { cat: 'atardecer', alt: 'Reflejo del sol sobre la arena mojada', f: 'atardecer-reflejo-sol-arena-mojada' },
    { cat: 'edificio',  alt: 'Balcones del Edificio Nautilus', f: 'edificio-balcones-edificio-nautilus' },
    { cat: 'piscina',   alt: 'Playa con El Rodadero al fondo', f: 'piscina-playa-rodadero-fondo' },
    { cat: 'interior',  alt: 'Escalera y camarote', f: 'interior-escalera-camarote' },
    { cat: 'piscina',   alt: 'Piscina al sol del mediodía', f: 'piscina-sol-mediodia' },
    { cat: 'atardecer', alt: 'La bahía al anochecer', f: 'atardecer-bahia-anochecer' },
    { cat: 'edificio',  alt: 'Terrazas y jardines del edificio', f: 'edificio-terrazas-jardines-edificio' },
    { cat: 'interior',  alt: 'Baño', f: 'interior-bano' },
    { cat: 'piscina',   alt: 'Piscina junto al mar', f: 'piscina-mar' },
    { cat: 'atardecer', alt: 'Horizonte dorado sobre el mar', f: 'atardecer-horizonte-dorado-mar' },
    { cat: 'interior',  alt: 'Cocina equipada', f: 'interior-cocina-equipada' },
    { cat: 'edificio',  alt: 'Zona BBQ del edificio', f: 'edificio-zona-bbq-edificio' },
    { cat: 'piscina',   alt: 'Piscina rodeada de palmeras', f: 'piscina-rodeada-palmeras' },
    { cat: 'atardecer', alt: 'Nubes encendidas al final de la tarde', f: 'atardecer-nubes-encendidas-final-tarde' },
    { cat: 'edificio',  alt: 'Entrada del edificio', f: 'edificio-entrada-edificio' },
    { cat: 'piscina',   alt: 'Piscina y vista abierta al mar', f: 'piscina-vista-abierta-mar' },
    { cat: 'interior',  alt: 'Detalle de la sala', f: 'interior-detalle-sala' },
    { cat: 'atardecer', alt: 'Último sol sobre Playa Salguero', f: 'atardecer-ultimo-sol-playa-salguero' },
    { cat: 'edificio',  alt: 'Jardines y palmeras del edificio', f: 'edificio-jardines-palmeras-edificio' },
    { cat: 'piscina',   alt: 'Piscina con palmeras frente a la playa', f: 'piscina-palmeras-playa' },
    { cat: 'interior',  alt: 'Pasillo hacia la cocina', f: 'interior-pasillo-hacia-cocina' }
  ]
};
