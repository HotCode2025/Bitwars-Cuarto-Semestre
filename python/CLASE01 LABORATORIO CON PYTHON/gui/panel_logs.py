from PyQt6.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QTextEdit,
    QLabel, QPushButton, QComboBox, QCheckBox
)
from PyQt6.QtGui import QTextCursor, QFont
from PyQt6.QtCore import Qt

from gui.styles import ESTILO_PRINCIPAL


class PanelLogs(QWidget):
    """
    Panel compacto para mostrar los logs de la aplicación en tiempo real.
    Diseñado para colocarse como columna en la ventana principal.
    """

    def __init__(self):
        super().__init__()
        self.mensajes_buffer = []   # Guarda todos los logs
        self.init_ui()

    def init_ui(self):
        """Inicializa la interfaz del panel de logs"""
        layout = QVBoxLayout()
        layout.setSpacing(8)

        # Título
        titulo = QLabel("📋 LOGS EN TIEMPO REAL")
        titulo.setObjectName("titulo")
        titulo.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(titulo)

        # === Barra de controles (compacta) ===
        controles = QHBoxLayout()
        controles.setSpacing(5)

        # Combo de nivel
        self.combo_nivel = QComboBox()
        self.combo_nivel.addItems(["TODOS", "DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"])
        self.combo_nivel.setToolTip("Filtrar por nivel de log")
        self.combo_nivel.currentTextChanged.connect(self.aplicar_filtro)
        controles.addWidget(self.combo_nivel, 1)

        # Autoscroll
        self.chk_autoscroll = QCheckBox("⬇️")
        self.chk_autoscroll.setChecked(True)
        self.chk_autoscroll.setToolTip("Auto-scroll al último mensaje")
        controles.addWidget(self.chk_autoscroll)

        # Botón limpiar
        self.btn_limpiar = QPushButton("🧹")
        self.btn_limpiar.setFixedWidth(40)
        self.btn_limpiar.setToolTip("Limpiar logs")
        self.btn_limpiar.clicked.connect(self.limpiar)
        controles.addWidget(self.btn_limpiar)

        layout.addLayout(controles)

        # === Área de texto para los logs ===
        self.texto_logs = QTextEdit()
        self.texto_logs.setReadOnly(True)
        self.texto_logs.setFont(QFont("Consolas", 9))
        self.texto_logs.setLineWrapMode(QTextEdit.LineWrapMode.WidgetWidth)
        self.texto_logs.setStyleSheet("""
            QTextEdit {
                background-color: #181825;
                border: 2px solid #313244;
                border-radius: 8px;
                padding: 8px;
                color: #cdd6f4;
            }
        """)

        layout.addWidget(self.texto_logs, 1)  # Que ocupe el espacio disponible

        # === Contador de logs por nivel (pie) ===
        self.lbl_contador = QLabel("INFO: 0 | WARN: 0 | ERROR: 0")
        self.lbl_contador.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.lbl_contador.setStyleSheet(
            "color: #a6adc8; font-size: 10px; "
            "background-color: #313244; padding: 4px; border-radius: 4px;"
        )
        layout.addWidget(self.lbl_contador)

        self.setLayout(layout)
        self.setStyleSheet(ESTILO_PRINCIPAL)

        # Contadores internos
        self.contadores = {"INFO": 0, "WARNING": 0, "ERROR": 0, "CRITICAL": 0}

    def agregar_log(self, nivel, mensaje, color):
        """
        Agrega un mensaje al panel de logs.
        Se conecta a la señal del QtLogHandler.
        """
        # Actualizar contadores
        if nivel in self.contadores:
            self.contadores[nivel] += 1
        elif nivel == "CRITICAL":
            self.contadores["ERROR"] += 1
        self._actualizar_contador()

        # Guardar en buffer
        self.mensajes_buffer.append((nivel, mensaje, color))

        # Límite del buffer (evitar consumir mucha memoria)
        if len(self.mensajes_buffer) > 1000:
            self.mensajes_buffer.pop(0)

        # Verificar filtro
        filtro = self.combo_nivel.currentText()
        if filtro != "TODOS" and nivel != filtro:
            return

        # Insertar en el QTextEdit
        self._insertar_texto(mensaje, color)

    def _insertar_texto(self, mensaje, color):
        """Inserta texto con formato en el QTextEdit"""
        cursor = self.texto_logs.textCursor()
        cursor.movePosition(QTextCursor.MoveOperation.End)

        # HTML con color y fuente monoespaciada
        html = f'<span style="color:{color}; white-space:pre-wrap;">{self._escape_html(mensaje)}</span><br>'
        cursor.insertHtml(html)

        if self.chk_autoscroll.isChecked():
            self.texto_logs.setTextCursor(cursor)
            self.texto_logs.ensureCursorVisible()

    def _escape_html(self, texto):
        """Escapa caracteres HTML"""
        return (texto
                .replace('&', '&amp;')
                .replace('<', '&lt;')
                .replace('>', '&gt;'))

    def _actualizar_contador(self):
        """Actualiza el contador del pie"""
        self.lbl_contador.setText(
            f"INFO: {self.contadores['INFO']} | "
            f"WARN: {self.contadores['WARNING']} | "
            f"ERROR: {self.contadores['ERROR']}"
        )

    def aplicar_filtro(self, nivel):
        """Re-aplica el filtro y recarga los logs del buffer"""
        self.texto_logs.clear()
        filtro = self.combo_nivel.currentText()

        for nivel_log, mensaje, color in self.mensajes_buffer:
            if filtro == "TODOS" or nivel_log == filtro:
                self._insertar_texto(mensaje, color)

    def limpiar(self):
        """Limpia el panel de logs"""
        self.texto_logs.clear()
        self.mensajes_buffer.clear()
        self.contadores = {"INFO": 0, "WARNING": 0, "ERROR": 0, "CRITICAL": 0}
        self._actualizar_contador()