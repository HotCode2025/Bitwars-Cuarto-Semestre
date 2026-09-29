from PyQt6.QtWidgets import (
    QMainWindow, QWidget, QSplitter, QVBoxLayout,
    QStatusBar, QMessageBox, QLabel
)
from PyQt6.QtCore import Qt
import logging

from gui.panel_carga import PanelCarga
from gui.panel_visualizacion import PanelVisualizacion
from gui.panel_logs import PanelLogs
from gui.qt_log_handler import QtLogHandler
from gui.styles import ESTILO_PRINCIPAL
from logger_base import logger
from conexion import Conexion


class VentanaPrincipal(QMainWindow):
    """
    Ventana principal con 3 paneles:
    - Izquierda: Formulario de carga
    - Centro: Tabla de visualización
    - Derecha: Logs del sistema en tiempo real
    """
    def __init__(self):
        super().__init__()
        self.init_ui()
        self.conectar_senales()
        self.configurar_handler_logs()

    def init_ui(self):
        """Inicializa la interfaz de la ventana principal"""
        self.setWindowTitle("Sistema de Gestión de Usuarios - BITWARS")
        self.setGeometry(50, 50, 1500, 800)
        self.setStyleSheet(ESTILO_PRINCIPAL)

        # Widget central
        widget_central = QWidget()
        self.setCentralWidget(widget_central)

        # Layout principal
        layout_principal = QVBoxLayout()
        layout_principal.setContentsMargins(10, 10, 10, 10)
        layout_principal.setSpacing(10)

        # Splitter horizontal con 3 paneles
        self.splitter = QSplitter(Qt.Orientation.Horizontal)

        # Instanciar los 3 paneles
        self.panel_carga = PanelCarga()
        self.panel_visualizacion = PanelVisualizacion()
        self.panel_logs = PanelLogs()

        # Agregar al splitter en orden: izquierda → centro → derecha
        self.splitter.addWidget(self.panel_carga)
        self.splitter.addWidget(self.panel_visualizacion)
        self.splitter.addWidget(self.panel_logs)

        # Configurar proporciones iniciales (20% - 45% - 35%)
        self.splitter.setSizes([320, 700, 480])

        # Permitir que se redimensionen libremente
        self.splitter.setStretchFactor(0, 0)  # Form no crece demasiado
        self.splitter.setStretchFactor(1, 1)  # Tabla crece
        self.splitter.setStretchFactor(2, 1)  # Logs crecen

        # Tamaños mínimos para evitar que se colapsen
        self.panel_carga.setMinimumWidth(280)
        self.panel_visualizacion.setMinimumWidth(400)
        self.panel_logs.setMinimumWidth(300)

        layout_principal.addWidget(self.splitter)
        widget_central.setLayout(layout_principal)

        # === BARRA DE ESTADO CON INFO DE LA BD ===
        self.configurar_barra_estado()

        logger.info('Ventana principal inicializada')

    def configurar_barra_estado(self):
        """Configura la barra de estado con información de la BD"""
        self.status_bar = QStatusBar()
        self.setStatusBar(self.status_bar)

        # Obtener info de la conexión
        info = Conexion.obtener_info()

        # Emoji según el tipo de conexión
        emoji_tipo = {
            'Neon (Cloud)': '☁️',
            'Docker local': '🐳',
            'Red local': '🏠',
            'Remoto': '🌐'
        }.get(info['tipo'], '🗄️')

        # Color según el tipo
        colores = {
            'Neon (Cloud)': '#89b4fa',   # Azul
            'Docker local': '#a6e3a1',   # Verde
            'Red local': '#f9e2af',      # Amarillo
            'Remoto': '#cba6f7'          # Morado
        }
        color = colores.get(info['tipo'], '#cdd6f4')

        # Mensaje principal
        mensaje_estado = (
            f"{emoji_tipo} {info['tipo']}  |  "
            f"🗄️ BD: {info['base_datos']}  |  "
            f"👤 {info['usuario']}@{info['host']}  |  "
            f"🔒 SSL: {info['ssl']}"
        )

        self.status_bar.showMessage(mensaje_estado)

        # Estilo de la barra
        self.status_bar.setStyleSheet(f"""
            QStatusBar {{
                background-color: #313244;
                color: {color};
                padding: 5px;
                font-weight: bold;
                font-size: 11px;
            }}
        """)

        # Tooltip con info completa
        self.status_bar.setToolTip(
            f"<b>Información de la Base de Datos</b><br><br>"
            f"<b>Tipo:</b> {info['tipo']}<br>"
            f"<b>Host:</b> {info['host']}<br>"
            f"<b>Puerto:</b> {info['puerto']}<br>"
            f"<b>Base de datos:</b> {info['base_datos']}<br>"
            f"<b>Usuario:</b> {info['usuario']}<br>"
            f"<b>SSL:</b> {info['ssl']}<br>"
            f"<b>Estado:</b> ✅ Conectado"
        )

        # Indicador de conexión (esquina derecha)
        self.lbl_conexion = QLabel("● CONECTADO")
        self.lbl_conexion.setStyleSheet(
            "color: #a6e3a1; font-weight: bold; padding-right: 10px; font-size: 11px;"
        )
        self.status_bar.addPermanentWidget(self.lbl_conexion)

        # Loguear la info
        logger.info(f"📡 Conectado a: {info['tipo']}")
        logger.info(f"🗄️ Base de datos: {info['base_datos']}")
        logger.info(f"👤 Usuario: {info['usuario']}@{info['host']}:{info['puerto']}")
        logger.info(f"🔒 SSL: {info['ssl']}")

    def configurar_handler_logs(self):
        """
        Configura un handler de logging que emite señales Qt
        para mostrar los logs en tiempo real en el panel derecho.
        """
        self.qt_handler = QtLogHandler()
        self.qt_handler.setLevel(logging.DEBUG)

        # Formato compacto para la GUI
        formatter = logging.Formatter(
            '%(asctime)s [%(levelname)s] %(message)s',
            datefmt='%H:%M:%S'
        )
        self.qt_handler.setFormatter(formatter)

        # Conectar la señal del handler con el panel de logs
        self.qt_handler.nuevo_log.connect(self.panel_logs.agregar_log)

        # Agregar el handler al logger raíz
        logging.getLogger().addHandler(self.qt_handler)

        logger.info('Panel de logs en tiempo real activado')

    def conectar_senales(self):
        """Conecta las señales entre los paneles"""
        # Cuando se selecciona un usuario en la tabla, cargarlo en el panel de carga
        self.panel_visualizacion.usuario_seleccionado.connect(
            self.panel_carga.cargar_usuario_para_editar
        )

        # Cuando se actualizan los datos en el panel de carga, refrescar la tabla
        self.panel_carga.datos_actualizados.connect(
            self.panel_visualizacion.refrescar_ahora
        )

        logger.debug('Señales conectadas')

    def closeEvent(self, event):
        """Maneja el evento de cierre de la ventana"""
        try:
            # Detener la actualización automática
            self.panel_visualizacion.detener_actualizacion()

            # Cerrar conexiones del pool
            Conexion.cerrarConexiones()

            logger.info('Aplicación cerrada correctamente')

            # Confirmar cierre
            respuesta = QMessageBox.question(
                self,
                "Salir",
                "¿Está seguro de que desea salir de la aplicación?",
                QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No,
                QMessageBox.StandardButton.No
            )

            if respuesta == QMessageBox.StandardButton.Yes:
                # Remover el handler antes de cerrar
                logging.getLogger().removeHandler(self.qt_handler)
                event.accept()
            else:
                event.ignore()
                # Reanudar actualización si se cancela el cierre
                self.panel_visualizacion.reanudar_actualizacion()

        except Exception as e:
            logger.error(f'Error al cerrar la aplicación: {e}')
            event.accept()