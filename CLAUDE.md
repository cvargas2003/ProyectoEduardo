# Proyecto Eduardo

Sitios web de reserva directa para dos propiedades de alquiler. Propuesta comercial:
"Plan de Trabajo Web y Redes" (Nicole Cantin, 19 sept 2026).

- `santa-marta/` — **Suite Dúplex Nautilus**, Edificio Nautilus, Playa Salguero (Rodadero Sur).
  Primera versión construida.
- `bogota/` — **La Casona**, residencia universitaria. Pendiente.

Cada sitio es independiente (la propuesta contempla un dominio por propiedad).

## Levantar

```
python -m http.server 5500 --bind 127.0.0.1 --directory santa-marta
```

http://127.0.0.1:5500. No hay build: HTML, CSS y JS planos; fuentes y GSAP por CDN.
Todo el código, los nombres y los comentarios van **en español**.

## Por qué estático y no C#

Es una vitrina: lo que importa es velocidad, animaciones y SEO, y el hosting presupuestado
(~$150.000/año por propiedad) sirve estático en cualquier plan. La reserva no necesita
servidor: el formulario arma el mensaje y abre WhatsApp. Si más adelante se pide el panel
de administración (bloquear fechas, precios), se monta un ASP.NET Core y estos archivos
van tal cual a su `wwwroot`: no se pierde nada.

## Fuentes del contenido

- **Carta de tips del propietario** ("tps dic 2026.pdf"): restaurantes, transporte,
  normas, preguntas frecuentes. Es la fuente principal y la más reciente.
- **Anuncio de Airbnb** 32046242: fotos, reseñas, calificaciones, RNT.
- **Video del recorrido**: el QR de una de las fotos del anuncio lleva a un archivo de
  Google Drive (id en `js/datos.js`). Está descargado en `video/recorrido.mp4`: es el
  original tal cual (960×544, 62 s, H.264 + AAC, 17 MB), comprimido por WhatsApp. Trae
  textos del propietario incrustados, incluidos "Estadía mínima de 3 noches", "Aforo
  máximo de 5 personas" y sus datos de contacto al final.
- **`video/recorrido-bucle.mp4`** (8,5 s, sin audio, 2,2 MB) es el que corre en bucle: tres
  tramos del original **sin ningún texto** (5,7–8,7 s piscina, 22,7–25,2 s fachada,
  34,1–38,3 s sala y cocina) unidos con fundidos. `video/recorrido-poster.jpg` es su
  primer cuadro. Al rehacerlo con un video nuevo, revisar cuadro a cuadro que no entre texto.

## ffmpeg

Instalado con winget (`Gyan.FFmpeg`). Si el PATH no lo encuentra, está en
`%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin`.
El filtro `drawtext` falla aquí (no hay configuración de fuentes): no usarlo.

## Cosas que no son evidentes

1. **`js/datos.js` es la única fuente** del número de WhatsApp, las fotos y los videos.
   Los textos de las secciones viven en `index.html` a propósito, para que los buscadores
   los lean sin ejecutar JavaScript.
2. **Las fotos son locales**: `img/<nombre>-<ancho>.webp` en 480, 800, 1200 y 1600 px,
   bajadas del anuncio de Airbnb (las descargas completas están en `fotos-airbnb/`, fuera
   del sitio). Cuando lleguen los originales del propietario, se regeneran los cuatro
   tamaños con el mismo nombre. Solo `og:image` y la imagen del schema siguen apuntando
   a Airbnb, porque necesitan URL absoluta: cambiarlas al tener dominio.
3. **La distribución se describe con honestidad**: los dos "cuartos" del nivel de descanso
   están separados por una puerta plegable. Una reseña de 1★ nació de venderlos como dos
   habitaciones. No volver a presentarlos así.
4. **Nunca publicar** el número del apartamento, la clave del wifi ni el contacto de quien
   entrega las llaves (están en la carta de tips): se envían al confirmar la reserva.
5. **El RNT 139433 debe verse en el pie**: en Colombia es obligatorio para alquiler turístico.
6. **Reseñas**: citas textuales y cortas, con nombre y ciudad. El `schema.org` no lleva
   `aggregateRating`: Google no admite calificaciones copiadas de otra plataforma.
7. **Animaciones**: reglas y errores ya resueltos en `design-system/suite-nautilus/MASTER.md`.
   Leerlo antes de tocar GSAP.
8. **El video de la sección "En video" corre solo, como un GIF**: sin sonido, en bucle, y
   solo mientras se ve (se pide al acercarse, se pausa al salir). Con "reducir movimiento"
   o ahorro de datos no arranca solo. Todo pasa por `sincronizarBucle()` en `principal.js`:
   no tocar `play()`/`pause()` por fuera de ahí o se desincroniza con el reproductor modal.
9. **`python -m http.server` no admite peticiones por rangos**, y Safari no reproduce video
   sin ellas: en local el video solo se prueba en Chrome/Edge/Firefox. Cualquier hosting
   real sí las admite.

## Pendientes con el propietario

- **Capacidad**: tres fuentes, tres cifras. Carta de tips: 6; video: 5; Airbnb: 2. La
  página dice 6.
- **Estadía mínima**: el video dice 3 noches. El formulario todavía no lo exige.
- **Número de WhatsApp**: la página usa 320 319 3258, pero el video del propietario da
  316 251 1432 y 300 529 5434. Confirmar cuál recibe las reservas.
- Cama principal: Queen (carta de tips y Airbnb) o King (descripción de Airbnb). Dice Queen.
- Nombre: resuelto, "Nautilus" sin tilde (carta de tips y video: "Nautilus Suite").
- Fotos originales en alta resolución y, si hay, más videos.
- **Video en calidad original**: el actual pasó por WhatsApp (960×544). Pedir el archivo
  directo del celular por Drive o Google Fotos en "calidad original", idealmente una versión
  sin los textos promocionales incrustados.
- Tiempos a las escapadas (Tayrona, Minca, Palomino…): son aproximados, confirmarlos.
