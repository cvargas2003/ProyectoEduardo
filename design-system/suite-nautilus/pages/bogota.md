# Casa Universitaria (Bogotá) — anexo del sistema de diseño

De `../MASTER.md` hereda **las reglas de movimiento y de accesibilidad** (opacity y no
autoAlpha, `y: 0` en los `fromTo` que parten de un translate del CSS, `[hidden]` con
`!important`, menú sólido al bajar, tira de palabras con pausa, regla global de
"reducir movimiento"). La estética **no** se hereda: Santa Marta es un hotel boutique y
esta es una casa para estudiantes, con la identidad del logo del cliente.

## Dirección: juvenil, llamativa y confiable

Pedido del cliente: "entorno llamativo, juvenil, con los colores del logo, interactivo",
y que se note que el ingreso por **reconocimiento facial** la hace segura y tecnológica.

- **Brutalismo suave**: bordes de 2 px en tinta, sombras sólidas desplazadas (6 × 6 px),
  esquinas redondeadas, stickers girados, fotos tipo polaroid con cinta. Da el tono juvenil.
- **Lo tecnológico en oscuro**: el inicio y la sección de seguridad van sobre `--noche` con
  cuadrícula fina, brillos de color y el escáner facial. El resto, claro.
- **Cada sección es un cuadro del logo**: lleva su color en `--acento` (número, marcador de
  la cursiva del título, iconos) y en `--sobre` el color del texto encima de ese acento.
- Se tutea (público estudiante).

## El logo

Sale del PDF del cliente (`los hector v. (1).pdf`, página 3), que es vectorial: 8 cuadros
redondeados en una cuadrícula de 3 × 3 sin el de arriba a la derecha, la casa en líneas
blancas encima y "Casa Universitaria" en negro. Se convirtió con un script de pypdf.

- `bogota/img/logo.svg`: el logo completo con sus colores originales, para usar suelto.
- En el inicio va armado en HTML: cada cuadro es un cubo 3D (un `<a>` con 6 caras) y la
  casa y las letras son dos SVG encima, con el mismo `viewBox` (`57.5 3 140 165`). Las
  posiciones de los cubos están en % de esa caja; la casa calza con error de menos de 1 px.

| Cuadro (orden de lectura) | Color | Sección |
|---|---|---|
| 0 | `--amarillo` `#F7E500` | 01 Habitaciones |
| 1 | `--morado` `#6A00B7` | 02 Seguridad |
| 2 | `--rojo` `#E80000` | 03 Cena incluida |
| 3 | `--verde` `#21C93A` (el PDF dice `#21E500`; vibraba demasiado) | 04 Todo incluido |
| 4 | `--naranja` `#ED5900` | 05 La casa |
| 5 | `--cafe` `#67281D` | 06 Sedes |
| 6 | `--magenta` `#C221E3` | 07 Vivir aquí (pasos y preguntas) |
| 7 | `--azul` `#33ABFF` | 08 Agenda tu visita |

El orden de las secciones sigue el orden de lectura del logo: si se agrega o mueve una
sección, revisar su cuadro, su color y su `data-cuadro`.

### Texto sobre cada color (contraste)

Blanco sobre morado (9.3:1), café (11:1), rojo (4.7:1) y magenta (4.6:1). Tinta sobre
amarillo, verde, naranja (5:1) y azul (7:1). **Nunca** blanco sobre naranja (3.5:1).
Como color de texto sobre claro, solo morado y café; los demás van de fondo o de marcador.

## Color de base

| Token | Hex | Uso |
|---|---|---|
| `--tinta` | `#1C1233` | Texto, bordes y sombras sólidas |
| `--tinta-suave` | `#4D4566` | Texto secundario sobre claro |
| `--papel` | `#FFF8EE` | Secciones claras alternas |
| `--noche` | `#160C2E` | Inicio, seguridad, menú, pie |
| `--claro` / `--claro-suave` | `#F3EEFF` / `#B9AED6` | Texto sobre `--noche` |
| `--lila` | `#D2B3FF` | Cursiva del título sobre `--noche` |

## Tipografía

- **Bricolage Grotesque** 700–800: títulos, nombres de los cubos, números.
- **Plus Jakarta Sans** 400–700: texto y botones.
- **JetBrains Mono** 500: solo lo "técnico" (estado del escáner, píldora "Por confirmar").

## Movimiento

- **Entrada del logo** (`armarLogo` en `principal.js`): los 8 cubos arrancan juntos como un
  solo cubo de 2 × 2 × 2 que gira; se separan, vuelan a su lugar, se dibuja la casa de
  abajo hacia arriba y aparecen las letras (~4 s). Luego `clearProps` devuelve el control
  al CSS. Sin GSAP o con "reducir movimiento", el logo se ve armado y quieto.
- **Al pasar el cursor** (o con foco del teclado) el cubo se asoma (`translateZ`) por encima
  de las líneas de la casa y muestra su icono y su nombre. Con mouse, el logo se inclina
  hacia el cursor (`gsap.quickTo`).
- **Nada que tenga `preserve-3d` lleva opacity, filter ni clip-path**: lo aplanan. Por eso
  la opacidad de la entrada va en `.logo3d` (que solo tiene `perspective`) y el recorte en
  los SVG de la casa y las letras.
- Las medidas del cubo van en `cqw` (contenedor `.logo3d-caja`): las caras calzan a
  cualquier tamaño sin JavaScript.
- El cuadrito del logo del menú se enciende según la sección que cruza la mitad de la
  pantalla. Al llegar desde un cubo, el número de la sección da una vuelta (`:target`).
- Escáner facial: corre una vez al aparecer y se repite con su botón. Dice "Simulación
  ilustrativa": no es la pantalla del sistema real.

## Componentes propios

- **`Por confirmar`**: píldora punteada amarilla en monoespaciada, para todo dato que falta.
- **Sticker**: círculo amarillo girado con borde y sombra ("Baño privado", "¡Cena incluida!").
- **Polaroid**: foto con marco blanco, cinta de color y pie escrito.
