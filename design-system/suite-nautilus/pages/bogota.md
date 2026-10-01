# La Casona (Bogotá) — anexo del sistema de diseño

Hereda de `../MASTER.md` la tipografía, la estructura editorial (secciones numeradas,
cejas en versalitas, filetes dorados) y **todas** las reglas de movimiento, incluidas las
aprendidas en Santa Marta. Aquí solo va lo que cambia.

## Dirección: noche bogotana

La misma familia que Nautilus, en su versión nocturna. Nautilus es marfil y sol de
Caribe; La Casona es azul noche con oro, como la ciudad de noche vista desde los cerros.

- Estilo verificado en la skill: **Dark Mode** (azul medianoche, brillo mínimo solo como
  acento, `color-scheme: dark`). Sin negro puro: el lujo aquí es azul profundo.
- Regla `color-dark-mode`: tonos más claros y desaturados de la marca, no invertidos.
- Regla `dark-mode-pairing`: misma tipografía y estructura que Santa Marta, para que se
  lean como hermanas.
- Público: estudiantes → se tutea (Santa Marta trata de usted).

## Color

| Token | Hex | Uso | Contraste sobre `--noche` |
|---|---|---|---|
| `--noche` | `#0B1622` | Fondo general | — |
| `--noche-2` | `#101E2E` | Secciones alternas | — |
| `--noche-3` | `#15263A` | Tarjetas, huecos de foto | — |
| `--marfil` | `#EDE6DA` | Texto principal | 14.6:1 |
| `--texto-suave` | `#A9B4C2` | Texto secundario | 8.7:1 |
| `--oro` | `#C9A45C` | Acento, cursivas, líneas | 7.8:1 |
| `--ladrillo` | `#C4654A` | Acento mínimo (el ladrillo de Bogotá) | 4.6:1, solo decorativo o grande |

## Diferencias de componentes

- **Hero sin foto**: los cerros orientales (Monserrate y Guadalupe) en línea dorada que
  se dibuja al cargar, con luna y estrellas. Da el glamour sin depender de fotos.
- **Huecos de foto**: mientras llegan las fotos, cada espacio es un marco vacío con su
  nombre ("Fachada", "Zona de estudio"…) y la marca *Foto pendiente*. Al revelarse pasa un
  destello dorado **una sola vez** (nada infinito).
- **`Por confirmar`**: píldora punteada dorada para todo dato que falta de La Casona
  (precios, requisitos, horarios, distancias). Nunca inventar el dato.
