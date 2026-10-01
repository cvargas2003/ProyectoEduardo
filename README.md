# Proyecto Eduardo

Sitios web de reserva directa para dos propiedades de alquiler en Colombia.

| Sitio | Propiedad | Estado |
|---|---|---|
| [`santa-marta/`](santa-marta/) | Suite Dúplex Nautilus · Playa Salguero, Santa Marta | Primera versión |
| [`bogota/`](bogota/) | Casa Universitaria · hospedaje universitario en Bogotá | Primera versión, con datos por confirmar |

HTML, CSS y JavaScript sin build: fuentes y animaciones (GSAP) llegan por CDN. La reserva
arma el mensaje y abre WhatsApp, sin servidor.

## Ver en local

```
python servidor.py 5500 santa-marta
python servidor.py 5501 bogota
```

Y abrir http://127.0.0.1:5500 (Santa Marta) o http://127.0.0.1:5501 (Bogotá).

## Estructura

```
santa-marta/          sitio de la Suite Nautilus (index.html, css/, js/, img/, video/)
bogota/               sitio de Casa Universitaria (index.html, css/, js/, img/)
design-system/        sistema de diseño y reglas aprendidas (leer antes de tocar estilos)
fotos-airbnb/         descargas completas de las fotos del anuncio (fuente de img/)
fotos-propietario/    fotos que mandó el propietario, tal como llegaron
fotos-casa-universitaria/  fotos del Instagram de Casa Universitaria (fuente de bogota/img/)
videos-originales/    videos del propietario tal como llegaron (fuente de los bucles)
servidor.py           servidor local sin caché para ver los sitios
CLAUDE.md             contexto del proyecto, decisiones y pendientes con el propietario
```
