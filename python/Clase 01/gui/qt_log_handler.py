import logging
from PyQt6.QtCore import QObject, pyqtSignal


class QtLogHandler(QObject, logging.Handler):
    """
    Handler personalizado que emite cada mensaje del logger
    como una señal Qt para poder mostrarlo en la GUI en tiempo real.
    """
    # Señal que emite: (nivel, mensaje, color)
    nuevo_log = pyqtSignal(str, str, str)

    # Colores por nivel de log
    COLORES = {
        'DEBUG':    '#6c7086',  # Gris
        'INFO':     '#89b4fa',  # Azul
        'WARNING':  '#f9e2af',  # Amarillo
        'ERROR':    '#f38ba8',  # Rojo
        'CRITICAL': '#eba0ac',  # Rojo intenso
    }

    def __init__(self):
        # Inicializar QObject y logging.Handler
        QObject.__init__(self)
        logging.Handler.__init__(self)

    def emit(self, record):
        """
        Método que logging llama automáticamente cada vez que se genera un log.
        """
        try:
            mensaje = self.format(record)
            color = self.COLORES.get(record.levelname, '#cdd6f4')
            self.nuevo_log.emit(record.levelname, mensaje, color)
        except Exception:
            self.handleError(record)