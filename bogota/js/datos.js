/*
 * Contenido editable de la página de Casa Universitaria.
 * Los textos de las secciones están en index.html para que los buscadores los lean.
 * Todo lo marcado "Por confirmar" en la página espera la información de Eduardo.
 */
window.CASA_U = {

  // WhatsApp del chatbot (lo dio el cliente el 9 de octubre). Formato internacional sin "+".
  whatsapp: '573005296434',

  // Teléfono para llamar (menú, inicio y Contáctanos): en el celular, al tocarlo, llama.
  // El cliente dio el 300 529 6434 (13 de octubre), el mismo del chatbot.
  telefono: '573005296434',

  // Panel que se abre al tocar una sede: la galería (carrusel de fotos).
  //   fotos: archivos de img/ (sin extensión); desc es la descripción que cambia con cada foto.
  //   valorFormulario: el valor de la sede en el formulario de visita.
  sedes: {
    'quinta-mutis': {
      nombre: 'Sede Quinta Mutis',
      direccion: 'Calle 63C Bis # 27-04, Bogotá',
      valorFormulario: 'Quinta Mutis',
      fotos: [
      { f: 'quinta-mutis-01-habitacion-cama-repisas', desc: 'Habitación amoblada, con cama, repisas y espejo.' },
      { f: 'quinta-mutis-02-habitacion-cama-closet-tv', desc: 'Habitación con cama, clóset, escritorio y TV.' },
      { f: 'quinta-mutis-03-bano-ducha', desc: 'Baño con ducha de vidrio y lavamanos.' },
      { f: 'quinta-mutis-04-habitacion-closet-escritorio', desc: 'Clóset amplio, escritorio y TV.' },
      { f: 'quinta-mutis-06-habitacion-cama-closet-ventana', desc: 'Habitación con cama, escritorio, clóset y TV.' },
      { f: 'quinta-mutis-07-habitacion-escritorio-silla', desc: 'Escritorio con silla y repisa.' },
      { f: 'quinta-mutis-08-comedor', desc: 'Comedor con mesas y sillas.' },
      { f: 'quinta-mutis-09-nevera-expendedora', desc: 'Nevera de bebidas y máquina expendedora.' },
      { f: 'quinta-mutis-10-casilleros', desc: 'Casilleros numerados.' },
      { f: 'quinta-mutis-11-vista-ventana-edificio', desc: 'Vista desde la ventana hacia la Universidad del Rosario.' },
      { f: 'quinta-mutis-12-vista-edificio', desc: 'La Universidad del Rosario, vista desde la sede.' }
      ]
    },
    'rosario': {
      nombre: 'Sede del Rosario',
      direccion: 'Transversal 25 # 60-54, Bogotá (Galerías)',
      valorFormulario: 'Del Rosario (Galerías)',
      fotos: [
      { f: 'rosario-01-fachada', desc: 'Fachada de la sede del Rosario.' },
      { f: 'rosario-02-entrada-escalera', desc: 'Entrada y escalera de la casa.' },
      { f: 'rosario-03-pasillo-habitaciones', desc: 'Pasillo con las habitaciones numeradas.' },
      { f: 'rosario-04-habitacion-cama-escritorio-tv', desc: 'Habitación con cama, escritorio con silla y TV.' },
      { f: 'rosario-05-habitacion-cama-comoda-espejo', desc: 'Habitación con cama, escritorio, cómoda y espejo.' },
      { f: 'rosario-06-habitacion-escritorio-tv', desc: 'Habitación con cama, escritorio y TV.' },
      { f: 'rosario-07-habitacion-cama-escritorio-repisa', desc: 'Habitación con cama, escritorio, repisa y espejo.' },
      { f: 'rosario-08-habitacion-comoda-tv', desc: 'Habitación con cama, cómoda, escritorio y TV.' },
      { f: 'rosario-09-bano-ducha', desc: 'Baño con ducha de vidrio y lavamanos.' },
      { f: 'rosario-10-cocina', desc: 'Cocina con mesón y alacenas.' },
      { f: 'rosario-11-comedor', desc: 'Comedor con mesa y sillas de madera.' }
      ]
    }
  },

  instagram: 'https://www.instagram.com/hospedajeuniversitariobogota',

  // Horarios de visita que ofrece el formulario: lunes a viernes y sábado medio día (los
  // sábados solo valen las horas de la mañana). PENDIENTE: las horas exactas.
  horarios: ['9:00 a. m.', '11:00 a. m.', '4:00 p. m.', '5:30 p. m.']
};
