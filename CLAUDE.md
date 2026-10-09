# Proyecto Eduardo

Sitios web de reserva directa para dos propiedades de alquiler. Propuesta comercial:
"Plan de Trabajo Web y Redes" (Nicole Cantin, 19 sept 2026).

- `santa-marta/` — **Suite El Ancla** ("Tu lugar frente al mar"), un dúplex en el Edificio
  Nautilus, Playa Salguero (Rodadero Sur). Primera versión construida. **Nautilus es el
  edificio, no el apartamento**: así lo pidió el cliente el 1 de octubre.
- `bogota/` — **Casa Universitaria**, hospedaje universitario con dos sedes (Quinta Mutis y
  Galerías). Primera versión con el logo y las fotos del Instagram (ver abajo). **No se llama
  "La Casona"**: ese era el nombre viejo y todavía aparece en marcas de agua y letreros.

Cada sitio es independiente (la propuesta contempla un dominio por propiedad).

## Levantar

```
python servidor.py 5500 santa-marta
python servidor.py 5501 bogota
```

http://127.0.0.1:5500 y http://127.0.0.1:5501. `servidor.py` es `http.server` con
`Cache-Control: no-cache`: sin eso Chrome guarda los .js y .css por su cuenta y, tras un
cambio, sigue mostrando la versión vieja aunque se recargue. También están en `.claude/launch.json`
(`santa-marta` y `bogota`): la vista previa solo los encuentra si la sesión de Claude Code
arranca en `C:\ProyectoEduardo`. No hay build: HTML, CSS y JS planos; fuentes y GSAP por CDN.
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

- **Fondo del inicio**: la pasarela al atardecer entre palmeras, en alta (la mandó el cliente el
  9 de octubre; original en `fotos-propietario/atardecer-pasarela-palmeras-alta.jpg`, 1745 px):
  `img/atardecer-pasarela-palmeras-{800,1200,1745}.webp`. La foto vieja de la pasarela
  (`atardecer-pasarela-playa-*`) sigue en el marco cuadrado de la bienvenida. Antes
  fue un video en bucle del atardecer, sacado de `videos-originales/promo-atardecer-2026-09-27.mp4`
  (32,9–42,1 s, solo las filas 0–480 porque abajo tiene letreros; `delogo` deja rayas). El
  cliente prefirió la foto y los archivos derivados se borraron; si se vuelve al video, esa
  es la receta.
- **Video del arco de la bienvenida** (`video/edificio-recorrido.mp4`): recorrido por el
  pasillo del edificio hasta la vista al mar, sin letreros
  (`videos-originales/recorrido-edificio-2026-09-27.mp4`). Va **al doble de velocidad**
  (así lo pidió el cliente), recortado en vertical al centro (384×478) y con CRF 30: 2 MB.
  Con CRF 25 pesaba 4,3 MB sin diferencia visible (SSIM 0,947).
- **Foto del marco cuadrado**: `img/atardecer-pasarela-playa-*.webp`, del propietario
  (original en `fotos-propietario/`). Solo hay 480 y 800 px: el original mide 1080.

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
8. **Hay dos videos que corren solos, como un GIF**: el recorrido del edificio en el arco
   de la bienvenida y el de la sección "En video". Sin sonido, en bucle,
   solo mientras se ven (se piden al acercarse, se pausan al salir), quietos con "reducir
   movimiento" o ahorro de datos, y cada uno con botón de pausa. Todos se registran con
   `crearBucle(video, botón, nombre)` en `principal.js` y solo `sincronizarBucles()` llama a
   `play()`/`pause()`: no hacerlo por fuera o corren mientras suena el reproductor modal.
   Para agregar otro: `<video data-src=… data-poster=…>` (y `data-src-movil`/`data-poster-movil`
   si hay versión de celular), su botón, y una línea `crearBucle`.
9. **`python -m http.server` no admite peticiones por rangos**, y Safari no reproduce video
   sin ellas: en local el video solo se prueba en Chrome/Edge/Firefox. Cualquier hosting
   real sí las admite.

## Decisiones del cliente en Santa Marta (no deshacer)

- **Airbnb, solo como alternativa discreta**: una línea en letra pequeña bajo el formulario de
  Reservar y el enlace del pie. Se quitaron el "4,6 · 183 reseñas" del inicio y el enlace de
  la sección de reseñas.
- **Sin carpas**: no mencionar las carpas del edificio en ninguna parte.
- **Reservar va tercera**, justo después de La suite. Las secciones se numeran en el orden en
  que aparecen: al mover una, renumerar todas.
- **Estilo playero (9 de octubre)**: lo "ejecutivo" se acabó. Paleta Caribe (arena, espuma,
  turquesa, coral, sol), títulos en **Fraunces** con SOFT 100 (alternativa libre a PP Pangaia,
  la letra de eaglesnest.sergesyutkin.com que pidió el cliente; esa es de pago), acentos a mano
  en **Kaushan Script** (cejas y marca) y texto en **Outfit**. Fotos como polaroids con borde
  blanco y un leve giro, **sin arcos**. De algunas fotos **cuelgan adornos** (sol, estrella de
  mar, caracol, concha, ancla: `.colgante` + símbolos `#d-*`): **dibujo de línea en latón,
  sobrio** (el cliente vio infantil la versión a color con carita), con un vaivén corto al aparecer. Olas entre secciones (`.ola ola--<color de la sección anterior>`) y hojas de palma
  de fondo en las secciones de arena.
- **Nombre: Suite El Ancla**, slogan "Tu lugar frente al mar". "Nautilus" solo para el edificio.
  (La carpeta `design-system/suite-nautilus` conserva el nombre viejo; `window.NAUTILUS` en
  `js/datos.js`, también.)
- **La suite**: los dos niveles van como dos experiencias (foto en arco, número grande,
  título y lista con íconos), con la escalera entre los dos. El del nivel social, "Para
  vivir hacia el mar", lo dio el cliente; su texto llegó cortado (ver `PEDIDOS-SANTA-MARTA.md`).
- Dos textos que dio el cliente van **tuteados** ("Desde que llegas…" en En video y "Un plan
  de 3 días…" en Experiencias); el resto de la página trata de usted.

## Casa Universitaria (`bogota/`)

- **Diseño**: juvenil y con los colores del logo, en `design-system/suite-nautilus/pages/bogota.md`
  (no hereda la estética de Santa Marta, solo sus reglas de movimiento). Leerlo antes de tocarlo.
- **El logo es el menú**: en el inicio, 8 cubos 3D que primero giran como un solo cubo y luego
  forman el logo; cada cuadro lleva a la sección de su color, en orden de lectura del logo.
  Viene del PDF vectorial del cliente (`los hector v. (1).pdf`, página 3); `img/logo.svg` es
  el logo completo.
- **Lo que pidió el cliente y debe verse**: cena incluida y **obligatoria** (hace parte del
  plan), **baño privado en todas** las habitaciones, ingreso por **reconocimiento facial**
  (seguro, tecnológico, confiable). Sedes: Quinta Mutis, Calle 63C Bis # 27-04, y Galerías,
  Transversal 25 # 60-54 (del Instagram @hospedajeuniversitariobogota).
- **Orden (lo pidió el cliente)**: 01 Sedes, 02 Habitaciones, y luego Seguridad, Cena, Todo
  incluido, La casa, Vivir aquí y Agenda tu visita. Cada sección conserva el color de su cuadro.
- **Ajustes del 9 de octubre (no deshacer)**: sin fondos morados ni oscuros (todo en claro,
  tono miel: amarillo tirando a naranja como la fachada). **No hay cena**: hay *alimentación
  completa* y **solo en la sede Quinta Mutis** (en la otra no). Baño **exclusivo y privado**
  (en una sede queda afuera de la habitación: no insistir en eso). Ingreso con **rostro o
  huella**, **sin restricción de horario**. Incluye agua caliente, dos redes de wifi,
  lavandería y aseo diario de lunes a sábado ("Aplican restricciones", en chiquito).
  **No decir que incluye seguridad** (no tiene); la sección se llama "Acceso". Nada de "cuarto"
  (habitación o "tu espacio"), ni "tu cara" (tu rostro), ni sala y comedor (no hay). Énfasis en
  que es para universitarios y primíparos; la Universidad del Rosario (sede de Ciencias de la
  Salud) se menciona solo de pasada, en la sede Quinta Mutis. La sección naranja ahora es
  "Para ti". WhatsApp = chatbot 300 529 6434; teléfono del pie = 320 319 3258 (de César, por ahora).
- **Las casas no tienen zona ni centro de estudio**: no mencionarla en ninguna parte. La foto
  del escritorio con computador del Instagram (`ig-06`) no se usa.
- **Fotos**: 4 reales del Instagram (la de sala y comedor se quitó), en `img/` a 480 y 800 px (el original mide 900; no
  hay más). Originales en `fotos-casa-universitaria/` (fuera del sitio). Todas traían la
  marca de agua "La Casona" arriba a la derecha: se recortó la franja de arriba. El letrero
  de la fachada (dice "La Casona Quinta Mutis") va difuminado. Las demás del Instagram son de
  banco o gráficos: no usarlas. Al llegar originales, regenerar con el mismo nombre.
- **Contenido**: tipos de habitación, valores, horario y menú de la cena, aseo, lavandería,
  requisitos, horarios de visita y universidades cercanas no se saben: llevan la píldora
  `.pendiente` ("Por confirmar"). No inventar precios ni distancias. La sede Galerías no
  tiene foto todavía.
- El dominio casauniversitaria.com.co (del Instagram) no existe todavía.
- **Se tutea** (público estudiante); Santa Marta trata de usted.
- **`js/principal.js` es una copia adaptada del de Santa Marta**, a propósito: cada sitio se
  publica solo. Si se corrige un error en uno, revisar el otro.
- WhatsApp, teléfono, Instagram y horarios de visita viven en `bogota/js/datos.js` (`window.CASA_U`).

## Pendientes con el propietario

- Capacidad: resuelta, **máximo 5 huéspedes** (lo confirmó el cliente; coincide con el video).
- **Estadía mínima**: el video dice 3 noches. El formulario todavía no lo exige.
- **Número de WhatsApp**: la página usa 320 319 3258, pero el video del propietario da
  316 251 1432 y 300 529 5434. Confirmar cuál recibe las reservas.
- Cama principal: Queen (carta de tips y Airbnb) o King (descripción de Airbnb). Dice Queen.
- Nombre: resuelto, **Suite El Ancla** (el edificio es Nautilus, sin tilde).
- Fotos originales en alta resolución y, si hay, más videos. La del inicio (pasarela al
  atardecer) mide 1080 px y en pantallas grandes se ve algo suave: si hay una más grande, cambiarla.
- **Redes sociales**: los enlaces del pie van a la página de inicio de cada red; poner los
  perfiles reales en `js/datos.js` (`redes`).
- **Videos en calidad original y sin textos**: los dos que hay pasaron por WhatsApp y traen
  letreros encima. Pedir los archivos directo del celular (Drive o Google Fotos, "calidad
  original"). Con la toma del atardecer sin letreros, el fondo del inicio puede ocupar la
  pantalla completa en vez de la franja de arriba.
- Tiempos a las escapadas (Tayrona, Minca, Palomino…): son aproximados, confirmarlos.
