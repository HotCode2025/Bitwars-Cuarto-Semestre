from PyQt6.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QTableWidget,
    QTableWidgetItem, QLabel, QPushButton, QHeaderView,
    QMessageBox, QProgressBar, QGroupBox
)
from PyQt6.QtCore import QTimer, pyqtSignal, Qt
from PyQt6.QtGui import QColor, QBrush

from usuario_dao import UsuarioDao
from logger_base import logger
from gui.styles import ESTILO_PRINCIPAL


class PanelVisualizacion(QWidget):
    """
    Panel derecho para visualizar usuarios en tiempo real
    """
    # Señal para enviar usuario seleccionado al panel de carga
    usuario_seleccionado = pyqtSignal(object)

    def __init__(self):
        super().__init__()
        self.usuarios_cache = []
        self.init_ui()
        self.setup_actualizacion_automatica()

    def init_ui(self):
        """Inicializa la interfaz del panel de visualización"""
        layout_principal = QVBoxLayout()
        layout_principal.setSpacing(10)

        # Barra superior con título y controles
        barra_superior = QHBoxLayout()

        titulo = QLabel("📊 USUARIOS EN TIEMPO REAL")
        titulo.setObjectName("titulo")
        titulo.setAlignment(Qt.AlignmentFlag.AlignLeft | Qt.AlignmentFlag.AlignVCenter)

        # Contador de usuarios
        self.lbl_contador = QLabel("Total: 0 usuarios")
        self.lbl_contador.setStyleSheet("color: #a6adc8; font-size: 14px; font-weight: bold;")

        # Botón de actualizar manual
        self.btn_refrescar = QPushButton("🔄 Actualizar")
        self.btn_refrescar.setFixedWidth(120)
        self.btn_refrescar.clicked.connect(self.actualizar_datos)

        barra_superior.addWidget(titulo)
        barra_superior.addStretch()
        barra_superior.addWidget(self.lbl_contador)
        barra_superior.addWidget(self.btn_refrescar)

        layout_principal.addLayout(barra_superior)

        # Tabla de usuarios
        self.tabla = QTableWidget()
        self.tabla.setColumnCount(3)
        self.tabla.setHorizontalHeaderLabels(["ID", "Username", "Password"])
        self.tabla.horizontalHeader().setSectionResizeMode(0, QHeaderView.ResizeMode.ResizeToContents)
        self.tabla.horizontalHeader().setSectionResizeMode(1, QHeaderView.ResizeMode.Stretch)
        self.tabla.horizontalHeader().setSectionResizeMode(2, QHeaderView.ResizeMode.Stretch)
        self.tabla.setAlternatingRowColors(True)
        self.tabla.setSelectionBehavior(QTableWidget.SelectionBehavior.SelectRows)
        self.tabla.setSelectionMode(QTableWidget.SelectionMode.SingleSelection)
        self.tabla.setSortingEnabled(True)

        # Conectar selección de fila
        self.tabla.itemSelectionChanged.connect(self.on_seleccion_fila)

        layout_principal.addWidget(self.tabla)

        # Barra de estado con progreso
        barra_estado = QHBoxLayout()

        self.lbl_estado = QLabel("Listo")
        self.lbl_estado.setStyleSheet("color: #a6adc8; font-size: 11px;")

        self.progress = QProgressBar()
        self.progress.setMaximumWidth(150)
        self.progress.setMaximumHeight(15)
        self.progress.setVisible(False)

        # Botón de limpiar selección
        self.btn_limpiar_seleccion = QPushButton("🧹 Limpiar Selección")
        self.btn_limpiar_seleccion.setFixedWidth(130)
        self.btn_limpiar_seleccion.clicked.connect(self.limpiar_seleccion)

        barra_estado.addWidget(self.lbl_estado)
        barra_estado.addStretch()
        barra_estado.addWidget(self.progress)
        barra_estado.addWidget(self.btn_limpiar_seleccion)

        layout_principal.addLayout(barra_estado)

        self.setLayout(layout_principal)
        self.setStyleSheet(ESTILO_PRINCIPAL)

        # Cargar datos iniciales
        self.actualizar_datos()

    def setup_actualizacion_automatica(self):
        """Configura la actualización automática de la tabla"""
        self.timer = QTimer()
        self.timer.timeout.connect(self.actualizar_datos_en_segundo_plano)
        self.timer.start(5000)  # Actualizar cada 5 segundos

        self.actualizando = False

    def actualizar_datos_en_segundo_plano(self):
        """Actualiza los datos sin bloquear la interfaz"""
        if not self.actualizando:
            self.actualizando = True
            try:
                self.actualizar_datos()
            except Exception as e:
                logger.error(f'Error en actualización automática: {e}')
            finally:
                self.actualizando = False

    def actualizar_datos(self):
        """Actualiza los datos de la tabla"""
        try:
            self.lbl_estado.setText("Cargando datos...")
            self.progress.setVisible(True)
            self.progress.setValue(30)

            # Obtener usuarios
            usuarios = UsuarioDao.seleccionar()
            self.progress.setValue(60)

            # Detectar cambios (para resaltar en verde)
            usuarios_nuevos = [u for u in usuarios if u.id_usuario not in 
                             [u_old.id_usuario for u_old in self.usuarios_cache]]
            
            usuarios_eliminados = [u for u in self.usuarios_cache if u.id_usuario not in 
                                 [u_new.id_usuario for u_new in usuarios]]

            self.progress.setValue(80)

            # Actualizar la tabla
            self.actualizar_tabla(usuarios, usuarios_nuevos)

            # Actualizar contador
            self.lbl_contador.setText(f"Total: {len(usuarios)} usuarios")

            # Preparar mensaje de estado
            mensaje = f"Datos actualizados: {len(usuarios)} usuarios"
            if usuarios_nuevos:
                mensaje += f" (+{len(usuarios_nuevos)} nuevos)"
            if usuarios_eliminados:
                mensaje += f" (-{len(usuarios_eliminados)} eliminados)"
            self.lbl_estado.setText(mensaje)

            self.progress.setValue(100)
            self.progress.setVisible(False)

            # Guardar cache
            self.usuarios_cache = usuarios

            logger.debug(f'Datos actualizados: {len(usuarios)} usuarios')

        except Exception as e:
            logger.error(f'Error al actualizar datos: {e}')
            self.lbl_estado.setText(f"❌ Error: {str(e)[:50]}...")
            self.progress.setVisible(False)
            QMessageBox.critical(self, "Error", f"❌ Error al actualizar datos:\n{str(e)}")

    def actualizar_tabla(self, usuarios, usuarios_nuevos):
        """Actualiza la tabla con la lista de usuarios"""
        self.tabla.setRowCount(0)

        # Obtener IDs de usuarios nuevos para resaltar
        ids_nuevos = [u.id_usuario for u in usuarios_nuevos]

        for fila, usuario in enumerate(usuarios):
            self.tabla.insertRow(fila)

            # ID
            item_id = QTableWidgetItem(str(usuario.id_usuario))
            item_id.setTextAlignment(Qt.AlignmentFlag.AlignCenter)
            self.tabla.setItem(fila, 0, item_id)

            # Username
            item_username = QTableWidgetItem(usuario.username)
            self.tabla.setItem(fila, 1, item_username)

            # Password
            item_password = QTableWidgetItem(usuario.password)
            self.tabla.setItem(fila, 2, item_password)

            # Resaltar nuevos usuarios en verde
            if usuario.id_usuario in ids_nuevos:
                brush = QBrush(QColor(166, 227, 161, 100))  # Verde claro
                for col in range(3):
                    self.tabla.item(fila, col).setBackground(brush)

    def on_seleccion_fila(self):
        """Maneja la selección de una fila en la tabla"""
        fila_seleccionada = self.tabla.currentRow()
        if fila_seleccionada >= 0:
            # Obtener el ID del usuario seleccionado
            id_item = self.tabla.item(fila_seleccionada, 0)
            if id_item:
                id_usuario = int(id_item.text())
                # Buscar el usuario en la cache
                for usuario in self.usuarios_cache:
                    if usuario.id_usuario == id_usuario:
                        self.usuario_seleccionado.emit(usuario)
                        self.lbl_estado.setText(f"Usuario seleccionado: {usuario.username}")
                        break

    def limpiar_seleccion(self):
        """Limpia la selección de la tabla"""
        self.tabla.clearSelection()
        self.lbl_estado.setText("Selección limpiada")

    def refrescar_ahora(self):
        """Refresca los datos inmediatamente"""
        self.actualizar_datos()
        self.lbl_estado.setText("Datos actualizados manualmente")

    def detener_actualizacion(self):
        """Detiene la actualización automática"""
        self.timer.stop()
        self.lbl_estado.setText("Actualización automática detenida")

    def reanudar_actualizacion(self):
        """Reanuda la actualización automática"""
        self.timer.start(5000)
        self.lbl_estado.setText("Actualización automática reanudada")