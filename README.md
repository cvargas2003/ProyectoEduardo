# Proyecto Eduardo

Sitios web de reserva directa para dos propiedades de alquiler en Colombia.

| Sitio | Propiedad | Estado |
|---|---|---|
| [`santa-marta/`](santa-marta/) | Suite Dúplex Nautilus · Playa Salguero, Santa Marta | Primera versión |
| `bogota/` | La Casona · residencia universitaria en Bogotá | Pendiente |

HTML, CSS y JavaScript sin build: fuentes y animaciones (GSAP) llegan por CDN. La reserva
arma el mensaje y abre WhatsApp, sin servidor.

## Ver en local

```
python -m http.server 5500 --bind 127.0.0.1 --directory santa-marta
```

Y abrir http://127.0.0.1:5500.

## Estructura

```
santa-marta/          sitio publicable (index.html, css/, js/, img/, video/)
design-system/        sistema de diseño y reglas aprendidas (leer antes de tocar estilos)
fotos-airbnb/         descargas completas de las fotos del anuncio (fuente de img/)
CLAUDE.md             contexto del proyecto, decisiones y pendientes con el propietario
```
