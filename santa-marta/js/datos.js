/*
 * Contenido editable de la página de Santa Marta.
 * Todo lo que cambia con frecuencia vive aquí: número de WhatsApp, fotos y videos.
 * Los textos de las secciones están en index.html para que los buscadores los lean.
 */
window.NAUTILUS = {

  // Número del propietario, en formato internacional sin "+" ni espacios.
  whatsapp: '573162511432',

  // Teléfono para llamar (ícono del menú y botón fijo encima del de WhatsApp): +57 316 251 1432,
  // el que dio el cliente el 22 de octubre.
  telefono: '573162511432',

  anuncioAirbnb: 'https://www.airbnb.mx/rooms/32046242',

  // PENDIENTE: los perfiles reales. Por ahora llevan a la página de inicio de cada red.
  redes: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    tiktok: 'https://www.tiktok.com/'
  },

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
  // Fotos del cliente (Pictures/Photos-1-001, 22 de octubre), en WebP de 480, 800, 1200 y 1600 px
  // (las más chicas no llegan a 1600). Reemplazan a las del anuncio de Airbnb.
  fotos: [
    { cat: 'atardecer', alt: 'El sol se pone sobre el mar, visto desde un muelle de madera', f: 'mar-sol-poniendose-muelle' },
    { cat: 'piscina',   alt: 'Playa Salguero, con El Rodadero al fondo', f: 'playa-salguero-rodadero-fondo' },
    { cat: 'interior',  alt: 'Sala, comedor y cocina del nivel social', f: 'suite-sala-comedor-cocina' },
    { cat: 'edificio',  alt: 'Fachada del Edificio Nautilus con la piscina', f: 'edificio-fachada-piscina' },
    { cat: 'atardecer', alt: 'Sol de la tarde sobre la orilla de Playa Salguero', f: 'mar-sol-tarde-orilla-salguero' },
    { cat: 'piscina',   alt: 'Piscinas del edificio frente a la playa', f: 'piscinas-edificio-frente-playa' },
    { cat: 'interior',  alt: 'Sala con sofá cama y comedor', f: 'suite-sala-sofa-comedor' },
    { cat: 'edificio',  alt: 'Pasillo del edificio con vista al mar', f: 'edificio-pasillo-vista-mar' },
    { cat: 'atardecer', alt: 'Atardecer con una lancha en el horizonte', f: 'mar-atardecer-lancha-horizonte' },
    { cat: 'piscina',   alt: 'Piscina entre palmeras, con salida a la playa', f: 'piscina-palmeras-salida-playa' },
    { cat: 'interior',  alt: 'Comedor y mueble del televisor', f: 'suite-comedor-televisor' },
    { cat: 'edificio',  alt: 'Corredor del edificio con pérgola y jardineras', f: 'edificio-corredor-pergola' },
    { cat: 'atardecer', alt: 'Veleros en la marina de Santa Marta al caer la tarde', f: 'mar-veleros-marina-tarde' },
    { cat: 'piscina',   alt: 'Piscina con vista al mar', f: 'piscina-vista-mar' },
    { cat: 'interior',  alt: 'Cocina con nevera, microondas y estufa', f: 'suite-cocina-nevera' },
    { cat: 'edificio',  alt: 'Pasillo del edificio hacia el mar', f: 'edificio-pasillo-hacia-mar' },
    { cat: 'atardecer', alt: 'Atardecer frente al morro, con gente en la orilla', f: 'mar-atardecer-morro-orilla' },
    { cat: 'piscina',   alt: 'Piscina para adultos y niños', f: 'piscina-curva-adultos-ninos' },
    { cat: 'interior',  alt: 'Cocina tipo americana junto a la escalera', f: 'suite-cocina-escalera' },
    { cat: 'edificio',  alt: 'Terrazas del edificio con jardín', f: 'edificio-terrazas-jardin' },
    { cat: 'atardecer', alt: 'Atardecer desde el edificio, entre palmeras', f: 'mar-atardecer-desde-edificio' },
    { cat: 'piscina',   alt: 'Las piscinas y el mar vistos desde el edificio', f: 'piscinas-mar-desde-edificio' },
    { cat: 'interior',  alt: 'Balcón con mesa y sillas', f: 'suite-balcon-mesa-sillas' },
    { cat: 'edificio',  alt: 'Terraza con vista a la playa', f: 'edificio-terraza-playa' },
    { cat: 'atardecer', alt: 'El sol cae sobre el mar entre los árboles', f: 'mar-atardecer-entre-arboles' },
    { cat: 'piscina',   alt: 'Piscina, palmeras y la playa', f: 'piscina-palmeras-playa' },
    { cat: 'interior',  alt: 'Habitación principal con cama Queen', f: 'suite-habitacion-principal-queen' },
    { cat: 'edificio',  alt: 'Zona BBQ del edificio', f: 'edificio-zona-bbq' },
    { cat: 'atardecer', alt: 'Atardecer sobre la piscina y la playa, entre palmeras', f: 'mar-atardecer-piscina-palmeras' },
    { cat: 'piscina',   alt: 'Vista al mar desde una terraza del edificio', f: 'terraza-vista-mar' },
    { cat: 'interior',  alt: 'Habitación principal con aire acondicionado', f: 'suite-habitacion-principal-aire' },
    { cat: 'edificio',  alt: 'Escalera del edificio con vista al mar', f: 'edificio-escalera-vista-mar' },
    { cat: 'interior',  alt: 'Habitación principal y la escalera del dúplex', f: 'suite-habitacion-escalera' },
    { cat: 'interior',  alt: 'Camarote con cama doble y sencilla', f: 'suite-camarote' },
    { cat: 'interior',  alt: 'Escalera del dúplex', f: 'suite-escalera-duplex' },
    { cat: 'interior',  alt: 'Baño con ducha de vidrio', f: 'suite-bano-ducha' },
    { cat: 'interior',  alt: 'Segundo baño', f: 'suite-segundo-bano' }
  ]
};
