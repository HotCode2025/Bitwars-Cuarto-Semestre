from PyQt6.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QGroupBox,
    QLabel, QLineEdit, QPushButton, QMessageBox,
    QFormLayout
)
from PyQt6.QtCore import pyqtSignal, Qt
from PyQt6.QtGui import QFont

from usuario import Usuario
from usuario_dao import UsuarioDao
from logger_base import logger
from gui.styles import ESTILO_PRINCIPAL


class PanelCarga(QWidget):
    """
    Panel izquierdo para la carga de datos (Agregar/Actualizar/Eliminar)
    """
    # Señal para notificar cambios en la base de datos
    datos_actualizados = pyqtSignal()

    def __init__(self):
        super().__init__()
        self.usuario_seleccionado = None
        self.init_ui()

    def init_ui(self):
        """Inicializa la interfaz del panel de carga"""
        layout_principal = QVBoxLayout()
        layout_principal.setSpacing(15)

        # Título
        titulo = QLabel("📝 GESTIÓN DE USUARIOS")
        titulo.setObjectName("titulo")
        titulo.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout_principal.addWidget(titulo)

        # Grupo de datos del usuario
        grupo_datos = QGroupBox("Datos del Usuario")
        layout_datos = QFormLayout()
        layout_datos.setSpacing(10)
        layout_datos.setLabelAlignment(Qt.AlignmentFlag.AlignRight)

        # Campos de entrada
        self.txt_id = QLineEdit()
        self.txt_id.setPlaceholderText("Auto-generado")
        self.txt_id.setEnabled(False)
        self.txt_id.setStyleSheet("background-color: #2a2a3e; color: #6c7086;")
        layout_datos.addRow("ID:", self.txt_id)

        self.txt_username = QLineEdit()
        self.txt_username.setPlaceholderText("Ingrese username")
        self.txt_username.setMaxLength(50)
        layout_datos.addRow("Username:", self.txt_username)

        self.txt_password = QLineEdit()
        self.txt_password.setPlaceholderText("Ingrese password")
        self.txt_password.setMaxLength(100)
        self.txt_password.setEchoMode(QLineEdit.EchoMode.Password)
        layout_datos.addRow("Password:", self.txt_password)

        # Botón para mostrar/ocultar password (opcional)
        self.btn_mostrar_pass = QPushButton("👁️")
        self.btn_mostrar_pass.setFixedWidth(35)
        self.btn_mostrar_pass.setCheckable(True)
        self.btn_mostrar_pass.toggled.connect(self.toggle_password_visibility)

        # Layout para password con botón de mostrar
        layout_pass = QHBoxLayout()
        layout_pass.addWidget(self.txt_password)
        layout_pass.addWidget(self.btn_mostrar_pass)
        layout_datos.addRow("Password:", layout_pass)

        grupo_datos.setLayout(layout_datos)
        layout_principal.addWidget(grupo_datos)

        # Grupo de botones de acción
        grupo_acciones = QGroupBox("Acciones")
        layout_acciones = QVBoxLayout()
        layout_acciones.setSpacing(8)

        # Botones principales
        self.btn_agregar = QPushButton("➕ Agregar Usuario")
        self.btn_agregar.setObjectName("btn_agregar")
        self.btn_agregar.clicked.connect(self.agregar_usuario)

        self.btn_actualizar = QPushButton("✏️ Actualizar Usuario")
        self.btn_actualizar.setObjectName("btn_actualizar")
        self.btn_actualizar.clicked.connect(self.actualizar_usuario)
        self.btn_actualizar.setEnabled(False)

        self.btn_eliminar = QPushButton("🗑️ Eliminar Usuario")
        self.btn_eliminar.setObjectName("btn_eliminar")
        self.btn_eliminar.clicked.connect(self.eliminar_usuario)
        self.btn_eliminar.setEnabled(False)

        self.btn_limpiar = QPushButton("🧹 Limpiar Campos")
        self.btn_limpiar.setObjectName("btn_limpiar")
        self.btn_limpiar.clicked.connect(self.limpiar_campos)

        layout_acciones.addWidget(self.btn_agregar)
        layout_acciones.addWidget(self.btn_actualizar)
        layout_acciones.addWidget(self.btn_eliminar)
        layout_acciones.addWidget(self.btn_limpiar)

        grupo_acciones.setLayout(layout_acciones)
        layout_principal.addWidget(grupo_acciones)

        # Espacio flexible
        layout_principal.addStretch()

        self.setLayout(layout_principal)
        self.setStyleSheet(ESTILO_PRINCIPAL)

    def toggle_password_visibility(self, checked):
        """Muestra u oculta la contraseña"""
        if checked:
            self.txt_password.setEchoMode(QLineEdit.EchoMode.Normal)
            self.btn_mostrar_pass.setText("🙈")
        else:
            self.txt_password.setEchoMode(QLineEdit.EchoMode.Password)
            self.btn_mostrar_pass.setText("👁️")

    def cargar_usuario_para_editar(self, usuario):
        """Carga un usuario seleccionado de la tabla para editar"""
        self.usuario_seleccionado = usuario
        self.txt_id.setText(str(usuario.id_usuario))
        self.txt_username.setText(usuario.username)
        self.txt_password.setText(usuario.password)

        # Habilitar botones de actualizar y eliminar
        self.btn_actualizar.setEnabled(True)
        self.btn_eliminar.setEnabled(True)
        self.btn_agregar.setEnabled(False)

        logger.debug(f'Usuario cargado para editar: {usuario}')

    def agregar_usuario(self):
        """Agrega un nuevo usuario"""
        try:
            username = self.txt_username.text().strip()
            password = self.txt_password.text().strip()

            # Validaciones
            if not username:
                QMessageBox.warning(self, "Validación", "El username no puede estar vacío.")
                return

            if not password:
                QMessageBox.warning(self, "Validación", "El password no puede estar vacío.")
                return

            # Crear y guardar usuario
            usuario = Usuario(username=username, password=password)
            usuario_insertado = UsuarioDao.insertar(usuario)

            QMessageBox.information(
                self,
                "Éxito",
                f"✅ Usuario '{username}' agregado exitosamente con ID: {usuario_insertado.id_usuario}"
            )

            # Limpiar campos y notificar actualización
            self.limpiar_campos()
            self.datos_actualizados.emit()

        except Exception as e:
            logger.error(f'Error al agregar usuario: {e}')
            QMessageBox.critical(self, "Error", f"❌ Error al agregar usuario:\n{str(e)}")

    def actualizar_usuario(self):
        """Actualiza un usuario existente"""
        try:
            if not self.usuario_seleccionado:
                QMessageBox.warning(self, "Advertencia", "No hay usuario seleccionado para actualizar.")
                return

            nuevo_username = self.txt_username.text().strip()
            nuevo_password = self.txt_password.text().strip()

            # Validaciones
            if not nuevo_username:
                QMessageBox.warning(self, "Validación", "El username no puede estar vacío.")
                return

            if not nuevo_password:
                QMessageBox.warning(self, "Validación", "El password no puede estar vacío.")
                return

            # Confirmar actualización
            respuesta = QMessageBox.question(
                self,
                "Confirmar",
                f"¿Está seguro de actualizar el usuario '{self.usuario_seleccionado.username}'?",
                QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No
            )

            if respuesta == QMessageBox.StandardButton.No:
                return

            # Actualizar usuario
            self.usuario_seleccionado.username = nuevo_username
            self.usuario_seleccionado.password = nuevo_password
            filas_afectadas = UsuarioDao.actualizar(self.usuario_seleccionado)

            if filas_afectadas > 0:
                QMessageBox.information(
                    self,
                    "Éxito",
                    f"✅ Usuario '{nuevo_username}' actualizado exitosamente"
                )
                self.limpiar_campos()
                self.datos_actualizados.emit()
            else:
                QMessageBox.warning(self, "Advertencia", "No se realizaron cambios en el usuario.")

        except Exception as e:
            logger.error(f'Error al actualizar usuario: {e}')
            QMessageBox.critical(self, "Error", f"❌ Error al actualizar usuario:\n{str(e)}")

    def eliminar_usuario(self):
        """Elimina un usuario"""
        try:
            if not self.usuario_seleccionado:
                QMessageBox.warning(self, "Advertencia", "No hay usuario seleccionado para eliminar.")
                return

            # Confirmar eliminación
            respuesta = QMessageBox.question(
                self,
                "Confirmar",
                f"⚠️ ¿Está seguro de eliminar al usuario '{self.usuario_seleccionado.username}'?\nEsta acción no se puede deshacer.",
                QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No,
                QMessageBox.StandardButton.No
            )

            if respuesta == QMessageBox.StandardButton.No:
                return

            # Eliminar usuario
            filas_afectadas = UsuarioDao.eliminar(self.usuario_seleccionado)

            if filas_afectadas > 0:
                QMessageBox.information(
                    self,
                    "Éxito",
                    f"✅ Usuario '{self.usuario_seleccionado.username}' eliminado exitosamente"
                )
                self.limpiar_campos()
                self.datos_actualizados.emit()
            else:
                QMessageBox.warning(self, "Advertencia", "No se pudo eliminar el usuario.")

        except Exception as e:
            logger.error(f'Error al eliminar usuario: {e}')
            QMessageBox.critical(self, "Error", f"❌ Error al eliminar usuario:\n{str(e)}")

    def limpiar_campos(self):
        """Limpia todos los campos y resetea el estado"""
        self.txt_id.clear()
        self.txt_username.clear()
        self.txt_password.clear()
        self.usuario_seleccionado = None

        self.btn_actualizar.setEnabled(False)
        self.btn_eliminar.setEnabled(False)
        self.btn_agregar.setEnabled(True)

        # Focus al primer campo
        self.txt_username.setFocus()

        logger.debug('Campos limpiados')