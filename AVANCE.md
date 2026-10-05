# Avance — Proyecto Eduardo

Última actualización: 1 de octubre de 2026.
Para retomar: leer esto y `CLAUDE.md` (contexto técnico, decisiones y pendientes al detalle).

## Dónde estamos

| | Estado |
|---|---|
| **Santa Marta** (`santa-marta/`) | Página completa, con la primera ronda de ajustes del cliente aplicada |
| **Bogotá** (`bogota/`) | Rehecha como **Casa Universitaria**: logo interactivo en cubos, fotos del Instagram, datos faltantes marcados "Por confirmar" |
| **GitHub** | https://github.com/cvargas2003/ProyectoEduardo — **público** (para GitHub Pages), rama `main`, todo subido |
| **Copia de seguridad** | `C:\ProyectoEduardo-copia-2026-09-27` (foto del proyecto antes de empezar Bogotá) |
| **Remote Control** | Activado, también para las sesiones nuevas de este equipo |
| **Siguiente** | Cambios pedidos para Santa Marta: ver [`PEDIDOS-SANTA-MARTA.md`](PEDIDOS-SANTA-MARTA.md) (nombre nuevo **Suite El Ancla**, sello del premio, cifras, rediseño de los niveles) |
| **Publicación** | Vista previa en GitHub Pages: [Santa Marta](https://cvargas2003.github.io/ProyectoEduardo/santa-marta/) · [Bogotá](https://cvargas2003.github.io/ProyectoEduardo/bogota/) (tarda 1 o 2 minutos en actualizarse tras cada push) |

## Cómo retomar

- Pedir **"inicia proyecto y ábrelo"**, o correr:
  ```
  python servidor.py 5500 santa-marta
  python servidor.py 5501 bogota
  ```
  Santa Marta en http://localhost:5500 y Bogotá en http://localhost:5501.
- Los servidores se apagan al cerrar la sesión de Claude Code.
- Para subir cambios: pedir **"súbelo"** (commit y push a `main`).

## Lo que se hizo

**27 de septiembre**
- Instaladas las skills de diseño (ui-ux-pro-max y compañía) en este proyecto y en Transportes Tobón.
- Santa Marta construida con contenido real: anuncio de Airbnb (fotos, reseñas, RNT), la carta de tips
  del propietario (restaurantes, transporte, preguntas frecuentes) y su video del recorrido (sacado del QR
  de una foto del anuncio).
- Video en bucle tipo GIF en la sección "En video", fotos bajadas a WebP locales, ffmpeg instalado.
- Mensaje para Eduardo con todo lo que falta: `mensaje-para-eduardo.txt`.
- Repositorio privado en GitHub.

**27–28 de septiembre**
- Bogotá (La Casona): versión nocturna en azul y oro, cerros de Monserrate y Guadalupe en el inicio,
  huecos elegantes donde irán las fotos.

**30 de septiembre — ajustes del cliente en Santa Marta**
- Inicio: título "El mar, a quince metros de su balcón." y foto de la pasarela al atardecer de fondo.
- Bienvenida: sello del premio nacional de arquitectura, énfasis en "frente al mar" y video del
  pasillo del edificio en bucle al doble de velocidad.
- Capacidad: **máximo 5 huéspedes** en toda la página. Cifras con iconos.
- Sin carpas en ninguna parte; "Cocina dotada para cinco".
- Reservar pasó a ser la sección 03, con una línea discreta para reservar por Airbnb.
- Sin el "4,6 · 183 reseñas en Airbnb" del inicio ni el enlace de reseñas a Airbnb.
- Textos nuevos en "En video" y Experiencias; títulos "Dos niveles, una sola experiencia" y
  "Dónde comer, a sugerencia del anfitrión".
- Redes sociales en el pie (genéricas por ahora).
- `servidor.py`: servidor local sin caché (antes Chrome mostraba versiones viejas).

**1 de octubre — Bogotá pasa a ser Casa Universitaria**
- El nombre es **Casa Universitaria** (no La Casona). Diseño nuevo, juvenil y con los 8 colores
  del logo del cliente; estructura inspirada en cityu.com.co.
- Inicio: el logo es el menú. 8 cubos 3D giran como un solo cubo, se separan y forman el
  logo; cada cuadro lleva a la sección de su color. El logo pequeño del menú se enciende
  según la sección.
- Lo que pidió el cliente: cena incluida y obligatoria, baño privado en todas las
  habitaciones e ingreso por reconocimiento facial (con un simulador del escáner).
- Las dos sedes con dirección y "Cómo llegar": Quinta Mutis y Galerías.
- 6 fotos reales del Instagram, sin la marca de agua "La Casona"; el letrero viejo de la
  fachada va difuminado.

**2 de octubre — Casa Universitaria, ajustes del cliente**
- Las casas no tienen zona de estudio: se quitó de Todo incluido, de La casa y su foto.
- Sedes pasó a ser la sección 01 y Habitaciones la 02; el resto, igual.

## Por decidir (con el usuario)

1. **Publicación.** El repositorio se hizo público para tener GitHub Pages: sirve como vista
   previa para Eduardo. Ojo: así quedan públicos sus datos de contacto
   (`mensaje-para-eduardo.txt`), las notas internas y los videos originales, también en el
   historial. Para el lanzamiento real:
   - **Recomendada:** un segundo repositorio público solo con `santa-marta/` y `bogota/`, y Pages ahí.
   - Cloudflare Pages o Netlify: gratis y funcionan con el repositorio privado.
   - Ojo: las reglas de GitHub Pages no permiten sitios cuyo fin principal sea comercial; sirve
     para mostrar una vista previa, no como hosting definitivo del negocio.
2. **Foto repetida:** la pasarela al atardecer está en el inicio y en el marco pequeño de la
   bienvenida. Cambiar la del marco por otra (por ejemplo un atardecer de la galería).
3. **"Tú" y "usted":** los dos textos nuevos del cliente van tuteados; el resto de la página trata
   de usted. ¿Unificar?
4. **Airbnb que queda:** el enlace del pie y el texto "183 reseñas en Airbnb" de la sección de reseñas.
5. **"Sin comisiones":** sigue en el título de Reservar ("Reserve directo, sin comisiones") y en
   "Sin comisión de plataforma"; el inicio ya dice "Reserve directo y seguro".

## Pendiente del propietario (Eduardo)

Todo está pedido en `mensaje-para-eduardo.txt` (confirmar si ya se envió):

- Número de WhatsApp que recibe las reservas (la página usa 320 319 3258; su video da otros dos).
- Tarifas por temporada, fechas de temporada alta, anticipo y costo por mascota.
- Enlace para exportar el calendario de Airbnb (para mostrar fechas ocupadas).
- Fotos originales en alta resolución y videos sin los letreros encima.
- Cama principal: ¿Queen o King?
- Casa Universitaria: tipos de habitación y valores, horario y menú de la cena, aseo y
  lavandería, requisitos, horarios de visita, universidades cercanas, foto de la sede
  Galerías, fotos en mejor resolución (las del Instagram miden 900 px) y el WhatsApp de las
  visitas (el letrero de la fachada dice 316 251 1432).
- Dominios, número del chatbot, ficha en Google Maps y perfiles de redes sociales.

## Próximos pasos sugeridos

1. Hacer los cambios de Santa Marta de `PEDIDOS-SANTA-MARTA.md` (pedir el texto completo del
   rediseño de los niveles: llegó cortado).
2. Resolver los puntos de "Por decidir".
3. Cuando Eduardo responda: completar Casa Universitaria, agregar precios y el calendario de Airbnb.
4. Definir el chatbot de WhatsApp (respuestas automáticas de WhatsApp Business o API de Meta).
