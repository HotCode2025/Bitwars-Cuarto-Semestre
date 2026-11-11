import logging
import os

# Crear directorio de logs si no existe
if not os.path.exists('logs'):
    os.makedirs('logs')

# Configuración del logger
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/app.log'),
        logging.StreamHandler()  # También muestra en consola
    ]
)

logger = logging.getLogger(__name__)
