from PyQt6.QtWidgets import QSplashScreen, QProgressBar, QLabel, QApplication
from PyQt6.QtGui import QPixmap, QPainter, QColor
from PyQt6.QtCore import Qt
import time


class SplashScreen(QSplashScreen):
    """
    Pantalla de bienvenida personalizada para BITWARS.
    Muestra el logo, un mensaje de estado y una barra de progreso animada.
    """

    def __init__(self, logo_path="assets/bitwars.png"):
        # Cargar el logo
        pixmap = QPixmap(logo_path)

        # Si el logo no existe o falla, crear uno de respaldo
        if pixmap.isNull():
            pixmap = QPixmap(500, 400)
            pixmap.fill(QColor("#1e1e2e"))

        # Redimensionar proporcionalmente (máximo 500x500)
        pixmap = pixmap.scaled(
            500, 500,
            Qt.AspectRatioMode.KeepAspectRatio,
            Qt.TransformationMode.SmoothTransformation
        )

        # Lienzo con margen extra para mensajes
        self.ancho = max(pixmap.width() + 80, 480)
        self.alto = pixmap.height() + 140
        canvas = QPixmap(self.ancho, self.alto)
        canvas.fill(QColor("#0f0f1a"))  # Fondo oscuro BITWARS

        super().__init__(canvas)

        # Dibujar el logo centrado
        painter = QPainter(canvas)
        x_logo = (self.ancho - pixmap.width()) // 2
        y_logo = 50
        painter.drawPixmap(x_logo, y_logo, pixmap)
        painter.end()

        self.setPixmap(canvas)
        self.setWindowFlag(Qt.WindowType.FramelessWindowHint)
        self.setWindowFlag(Qt.WindowType.WindowStaysOnTopHint)

        # === Subtítulo BITWARS (arriba) ===
        self.lbl_marca = QLabel("BITWARS", self)
        self.lbl_marca.setGeometry(0, 10, self.ancho, 30)
        self.lbl_marca.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.lbl_marca.setStyleSheet("""
            color: #ffffff;
            font-family: 'Segoe UI', Arial;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 8px;
            background: transparent;
        """)

        # === Barra de progreso (estilo BITWARS) ===
        self.progress = QProgressBar(self)
        self.progress.setGeometry(
            40,
            self.alto - 75,
            self.ancho - 80,
            22
        )
        self.progress.setRange(0, 100)
        self.progress.setValue(0)
        self.progress.setTextVisible(True)
        self.progress.setFormat("%p%")
        self.progress.setStyleSheet("""
            QProgressBar {
                background-color: #1a1a2e;
                border: 1px solid #2a2a4e;
                border-radius: 11px;
                height: 22px;
                color: #ffffff;
                font-family: 'Segoe UI', Arial;
                font-size: 10px;
                font-weight: bold;
                text-align: center;
            }
            QProgressBar::chunk {
                border-radius: 10px;
                background-color: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 #00b4ff,
                    stop:0.5 #7c3aed,
                    stop:1 #d946ef
                );
            }
        """)

        # === Mensaje de estado ===
        self.lbl_estado = QLabel("Inicializando sistema...", self)
        self.lbl_estado.setGeometry(
            40,
            self.alto - 45,
            self.ancho - 80,
            25
        )
        self.lbl_estado.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.lbl_estado.setStyleSheet("""
            color: #a6adc8;
            font-family: 'Segoe UI', Arial;
            font-size: 11px;
            background: transparent;
        """)

    def set_progreso(self, valor, mensaje=None):
        """
        Establece un valor puntual en la barra de progreso.
        Útil para asignar valores iniciales o finales.
        """
        self.progress.setValue(valor)
        if mensaje:
            self.lbl_estado.setText(mensaje)
        QApplication.processEvents()

    def animar_progreso(self, desde, hasta, duracion_seg, mensaje):
        """
        Anima la barra de progreso de forma FLUIDA desde un valor 'desde'
        hasta un valor 'hasta' durante 'duracion_seg' segundos.
        Esto hace que la barra se cargue real, paso a paso.
        """
        self.lbl_estado.setText(mensaje)
        QApplication.processEvents()

        pasos = 60  # 60 fps aproximadamente (para que sea fluido)
        intervalo = duracion_seg / pasos
        rango = hasta - desde

        for i in range(pasos + 1):
            progreso_actual = int(desde + (rango * i / pasos))
            self.progress.setValue(progreso_actual)
            QApplication.processEvents()
            time.sleep(intervalo)