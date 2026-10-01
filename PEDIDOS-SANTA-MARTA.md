# Cambios pedidos para Santa Marta — 1 de octubre de 2026

Llegaron con tres capturas tomadas en el iPhone, sobre la versión publicada
(https://cvargas2003.github.io/ProyectoEduardo/santa-marta/). **Ninguno está hecho todavía.**
Para retomar: "sigamos con los cambios de Santa Marta".

## 0. Fondo del inicio con la foto nueva, y todo más vivo

> El fondo de la portada cámbialo por esta imagen, que tiene muy buena calidad, y haz todo
> más vivo.

La imagen: la pasarela de madera hacia la playa al atardecer, con palmeras, el sol sobre el
mar y las piscinas a los lados (1746 × 901 px o más). **Falta tenerla como archivo**: llegó
pegada en el chat y no quedó guardada. Ponerla en `fotos-propietario/` y generar
`santa-marta/img/` en WebP (800, 1200, 1600 y el ancho original). Con esa calidad el
inicio puede ir a pantalla completa y con un velo más suave, para que se vean los colores.
Si la imagen es una versión mejorada con IA de la foto del propietario, revisar que no
muestre nada que el lugar no tenga (ver la nota de honestidad en CLAUDE.md).

## 1. Nombre nuevo: Suite El Ancla

> El nombre que se le va a dar ya no será Nautilus, ya que ese es el nombre del edificio.
> Pero el apartamento como tal se llamará **Suite El Ancla**.
> Slogan: **Tu lugar frente al mar**

- "Nautilus" sigue siendo el **edificio** (Edificio Nautilus): esas menciones se quedan.
- Lo que nombra al **apartamento** pasa a "Suite El Ancla". En `santa-marta/index.html`:
  `<title>`, `description`, `og:title`, `name` del schema, la marca del menú
  ("Nautilus · Suite dúplex · Playa Salguero"), la ceja "Bienvenidos al Nautilus", la marca
  del pie y el "© Suite Dúplex Nautilus". Revisar también los textos de WhatsApp en
  `js/principal.js`.
- Usar el slogan "Tu lugar frente al mar" (por ejemplo bajo la marca o en el inicio).
- Fuera de la página: el pie de Bogotá dice "De la misma familia: Suite Nautilus";
  CLAUDE.md (nombre "resuelto, Nautilus sin tilde"), README y AVANCE.
- Ojo: el título de la bienvenida ya habla de un edificio "anclado" frente al mar, así que
  el nombre nuevo encaja.

## 2. Sello del premio (bienvenida)

> Incorporar ícono de premio, y esa insignia quitarla o que quede dentro del círculo.

En el iPhone, la medalla sale arriba a la izquierda, por fuera del círculo dorado, y el
círculo queda vacío. Poner un ícono de premio bien centrado **dentro** del círculo (o
quitar la medalla). CSS en `.premio__sello` (`santa-marta/css/estilos.css`, ~línea 281).

## 3. Foto cuadrada de la bienvenida

> Quitar el recuadro blanco o hacerlo más delgado, o distribuirlo diferente.

Es `.intro__secundaria` (la foto de la pasarela al atardecer, sobre el arco del video):
hoy tiene un borde marfil de 10 px. Quitarlo, adelgazarlo o recomponer las dos imágenes.

## 4. Cifras bajo la bienvenida

> Aclarar que es 15 metros, no 15 m.
> Mejorar el ícono de niveles, que sea más claro: puede ser un piso, una escalera, otro piso.
> Y mencionar acceso a piscina.

- "15 m" → "15 metros" (hasta la playa).
- Ícono de "2 niveles": hoy son capas apiladas. Dibujar uno propio: piso, escalera, piso.
- Agregar el acceso a la piscina (una cifra o línea más, con su ícono).

## 5. Rediseño de la sección "La suite" (los dos niveles)

Texto del cliente, tal como llegó:

> Quiero que rediseñes únicamente la sección de la landing page donde se presentan las
> características del apartamento, actualmente dividida en:
>
> "NIVEL SOCIAL – Para la vida en común"
> y
> "NIVEL DE DESCANSO – Para dormir fresco".
>
> Quiero conservar la estética actual de la página: elegante, cálida, minimalista y tipo
> hotel boutique, con fondo marfil/crema, azul oscuro para los títulos y detalles dorados.
>
> IMPORTANTE:
> - No cambies el header, menú, tipografías generales, colores principales ni las demás
>   secciones de la landing.
> - No cambies la información ni inventes características nuevas.
> - Solo mejora la composición visual y jerarquía de esta sección.
> - El resultado debe verse premium, moderno y atractivo para una landing de alojamiento,
>   no como una ficha técnica.
>
> ### NUEVA ESTRUCTURA
>
> Quiero presentar el apartamento como un DÚPLEX dividido en dos experiencias:
>
> DOS NIVELES · UNA SOLA EXPERIENCIA
>
> 01 — NIVEL SOCIAL
> Título principal:
> "Para vivir hacia el mar"

**El mensaje llegó cortado** después de "Para vivir hacia el mar". Falta lo que venía
después: el título del nivel de descanso (hoy "Para dormir fresco") y, si había, más
indicaciones. Pedirle a Eduardo (o a quien lo escribió) el texto completo antes de cerrar
esta parte; mientras tanto se puede avanzar con el nivel de descanso manteniendo su título.

Contenido actual de los niveles (no cambiar la información):

- **Nivel social**: sala-comedor con sofá cama y Smart TV; cocina tipo americana con barra
  desayunadora; baño completo y cuarto de lavandería; balcón con vista lateral al mar;
  ventiladores de techo y de pie.
- **Nivel de descanso**: dos ambientes separados por una puerta plegable (no presentarlos
  como dos habitaciones, ver CLAUDE.md); cama Queen en el ambiente principal; camarote con
  cama doble y sencilla; segundo baño completo; aire acondicionado y Smart TV.
