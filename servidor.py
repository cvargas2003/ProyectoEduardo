"""Servidor local para ver los sitios mientras se trabaja en ellos.

Igual a `python -m http.server`, pero le pide al navegador que revalide cada archivo:
sin eso, Chrome guarda por su cuenta los .js y .css y, después de un cambio, sigue
mostrando la versión vieja aunque se recargue la página.

Uso: python servidor.py <puerto> <carpeta>
"""
import functools
import http.server
import sys


class SinCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()


puerto, carpeta = int(sys.argv[1]), sys.argv[2]
servidor = http.server.ThreadingHTTPServer(('127.0.0.1', puerto), functools.partial(SinCache, directory=carpeta))
print(f'Sirviendo {carpeta} en http://127.0.0.1:{puerto}', flush=True)
servidor.serve_forever()
