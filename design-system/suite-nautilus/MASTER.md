# Sistema de diseño — Suite Nautilus (Santa Marta)

Fuente de verdad visual del sitio de Santa Marta. La página de Bogotá hereda la
estructura y las reglas de movimiento, pero lleva su propia paleta en
`pages/bogota.md` cuando se construya.

Generado con la skill **ui-ux-pro-max** y verificado a mano: de la salida
automática se conservó lo que encajaba y se descartó lo que no (ver al final).

## Dirección

**Gourmet / hotel boutique editorial.** Revista de viajes impresa, no plantilla
de SaaS. Mucho aire, fotografía protagonista, serif con cursivas, líneas finas
doradas, secciones numeradas. La guía gastronómica se presenta como una carta
de restaurante.

- Estilo verificado (base de la skill): **Editorial Grid / Magazine** — rejilla
  asimétrica, citas destacadas, imágenes grandes, revelado al hacer scroll,
  parallax en imágenes.
- Patrón verificado: **prueba social antes del botón de reserva** (reseñas justo
  antes de "Reservar").

## Color — azul marino + oro (perfil Hotel/Hospitalidad), cálido caribeño

| Token | Hex | Uso | Contraste verificado |
|---|---|---|---|
| `--tinta` | `#1B2430` | Texto principal sobre marfil | 14:1 sobre `--marfil` |
| `--tinta-suave` | `#5B6470` | Texto secundario | 5.4:1 sobre `--marfil` |
| `--oceano` | `#0F2A3A` | Secciones oscuras, botón primario | — |
| `--oceano-profundo` | `#0A1E2A` | Pie, capas del hero | — |
| `--marfil` | `#F7F2EA` | Fondo general | — |
| `--marfil-2` | `#EFE6D8` | Fondo alterno, tarjetas | — |
| `--oro` | `#B08A3E` | Detalles, líneas, texto sobre `--oceano` | 4.6:1 sobre `--oceano` |
| `--oro-texto` | `#7E5A14` | Texto dorado pequeño sobre marfil | 5.6:1 sobre `--marfil` |
| `--atardecer` | `#C2663A` | Acento mínimo (marcadores del itinerario) | solo decorativo |

Regla: `--oro` **nunca** para texto pequeño sobre marfil (4.4:1, no pasa); para
eso está `--oro-texto`.

## Tipografía — par "Restaurant Menu" + "Classic Elegant" (base de la skill)

- Títulos: **Playfair Display** 400–600, con palabras en *cursiva* como acento.
- Etiquetas / cejas: **Playfair Display SC**, espaciado `.22em`, entre filetes.
- Cuerpo: **Karla** 300–600, base 17px, interlineado 1.65.

## Movimiento (presets GSAP verificados, sin rebote)

- Revelado: opacidad + `y` 16–20px, 0.9s, `power3.out`, escalonado 0.08s.
- Imágenes: máscara `clip-path` de abajo hacia arriba + escala 1.12→1.
- Parallax: `yPercent` entre 5 y 12, `scrub`. **Nunca** en texto de lectura.
- La tira de destinos corre sola, despacio y en bucle (dos copias del texto, se
  desplaza la mitad). Para cumplir WCAG 2.2.2 se detiene al pasar el cursor, tiene
  botón de pausa y queda quieta con "reducir movimiento".
- `prefers-reduced-motion: reduce` → todo aparece en su estado final.
- Sin JavaScript el contenido se ve completo: los estados ocultos los pone GSAP.
- Nada de `back.out` (el rebote se ve juguetón, no lujoso).

### Aprendido al construir Santa Marta (no repetir en Bogotá)

- **Ocultar con `opacity`, nunca con `autoAlpha`.** `autoAlpha` pone
  `visibility: hidden` y eso saca del tabulador todo lo que aún no se reveló:
  con teclado se saltaba el formulario de reserva entero.
- **Si el CSS oculta con `transform`, pasar `y: 0` en el `fromTo`.** GSAP lee el
  `translateY(105%)` del CSS como un desplazamiento en px y, sin eso, el título
  del hero terminaba corrido 63px hacia abajo.
- **Menú transparente solo en los primeros 60px de scroll.** Si espera a que
  termine el hero, en celular el texto pasa por debajo del logo.
- **`[hidden] { display: none !important }` en la base del CSS.** Sin esa regla,
  un `display: grid` del autor gana y las pestañas "ocultas" se ven igual. Al
  probar, medir `getComputedStyle().display`, no el atributo `hidden`.
- **Mosaico de fotos:** el patrón de tamaños tiene que llenar filas completas
  (bloques de 10: 1.ª alta, 5.ª ancha → 3 filas en 4 columnas, 6 en 2).

## Componentes y reglas UX (verificadas)

- **Video**: solo al hacer clic, en ventana modal; nada de reproducción
  automática con sonido.
- **Visor de fotos**: `role="dialog"`, foco atrapado, Escape cierra, flechas
  navegan, el foco vuelve al disparador.
- **Reseñas**: sin carrusel automático.
- **Foco**: anillo de 2px visible en todo control, también dentro de modales.
- **Táctil**: objetivos de 44×44px mínimo.
- **Reserva**: simple (la base marca "reserva compleja" como antipatrón):
  fechas + huéspedes + nombre → mensaje armado a WhatsApp.

## Descartado de la salida automática

- Estilo "Liquid Glass": pensado para la interfaz de sistemas Apple, no para un
  hotel boutique.
- Azules `#1E40AF` / `#3B82F6` / `#BFDBFE`: fríos y corporativos. Se conservó
  la idea (marino + oro) con tonos cálidos.
- Movimiento con `back.out(1.4)`: la propia skill lo desaconseja en contenido
  informativo.
- La búsqueda de estructura de landing no tuvo coincidencias (2 intentos): las
  secciones salen de la propuesta aprobada del cliente (Frente 1).
