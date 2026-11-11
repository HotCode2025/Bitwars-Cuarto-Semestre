import os

# Dimensiones de la pantalla (resolución de tu monitor)
SCREEN_WIDTH = 1440
SCREEN_HEIGHT = 900

# Colores
COLOR_LASER = (0, 0, 255)
COLOR_PERSONAJE = (0, 255, 0)
COLOR_ENEMIGO = (255, 0, 0)
COLOR_FONDO = (0, 0, 50)
COLOR_EXPLOSION = (255, 165, 0)

ASSETS_PATH = os.path.join(os.path.dirname(__file__), 'assets_1')

VELOCIDAD_ROTACION = 2

# 🖥️ Modo pantalla completa
PANTALLA_COMPLETA = True