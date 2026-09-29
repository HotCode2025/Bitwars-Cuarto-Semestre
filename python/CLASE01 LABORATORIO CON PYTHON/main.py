import sys
import time
from PyQt6.QtWidgets import QApplication, QMessageBox
from PyQt6.QtCore import Qt

from gui.ventana_principal import VentanaPrincipal
from gui.splash_screen import SplashScreen
from menu_app_usuario import MenuAppUsuario
from logger_base import logger
from conexion import Conexion


def main():
    """
    Punto de entrada principal con splash screen de 12 segundos
    y barra de progreso animada en tiempo real.
    """
    try:
        logger.info('=== Iniciando aplicación GUI de gestión de usuarios ===')

        # 1. Crear aplicación Qt
        app = QApplication(sys.argv)
        app.setStyle('Fusion')

        app.setStyleSheet("""
            QToolTip {
                background-color: #313244;
                color: #cdd6f4;
                border: 1px solid #45475a;
            }
        """)

        # 2. Mostrar splash screen
        splash = SplashScreen("assets/bitwars.png")
        splash.show()
        QApplication.processEvents()

        # =================================================================
        # FASE 1: Inicializando (0s - 2s) → 0% a 15%
        # =================================================================
        splash.animar_progreso(0, 15, 2.0, "🚀 Inicializando BITWARS...")

        # =================================================================
        # FASE 2: Cargando módulos (2s - 4s) → 15% a 35%
        # =================================================================
        splash.animar_progreso(15, 35, 2.0, "📦 Cargando módulos del sistema...")

        # =================================================================
        # FASE 3: Conectando a PostgreSQL (4s - 6s) → 35% a 55%
        # =================================================================
        splash.set_progreso(35, "🔌 Conectando a PostgreSQL...")

        # Verificar conexión a la base de datos en paralelo con la animación
        conexion_ok = False
        error_msg = ""

        # Animación de 35% a 55% mientras intentamos conectar
        pasos = 60
        intervalo = 2.0 / pasos
        for i in range(pasos + 1):
            # Intentar conectar solo en el primer paso
            if i == 0:
                try:
                    conexion = Conexion.obtenerConexion()
                    Conexion.liberarConexion(conexion)
                    conexion_ok = True
                    logger.info('Conexión a PostgreSQL verificada exitosamente')
                except Exception as e:
                    conexion_ok = False
                    error_msg = str(e)
                    logger.critical(f'No se pudo conectar a PostgreSQL: {e}')

            progreso = int(35 + (20 * i / pasos))
            splash.progress.setValue(progreso)
            QApplication.processEvents()
            time.sleep(intervalo)

        if not conexion_ok:
            splash.set_progreso(55, "❌ Error de conexión a la BD")
            time.sleep(1.0)
            splash.close()
            QMessageBox.critical(
                None,
                "Error de Conexión",
                f"❌ No se pudo conectar a PostgreSQL:\n\n{error_msg}\n\n"
                f"Verifique que el servidor esté funcionando."
            )
            return 1

        # =================================================================
        # FASE 4: BD conectada (6s - 8s) → 55% a 75%
        # =================================================================
        splash.animar_progreso(55, 75, 2.0, "✅ Base de datos conectada")

        # =================================================================
        # FASE 5: Construyendo interfaz (8s - 10s) → 75% a 90%
        # =================================================================
        # Crear la ventana principal mientras animamos
        splash.lbl_estado.setText("🎨 Construyendo interfaz gráfica...")
        QApplication.processEvents()

        ventana = VentanaPrincipal()

        splash.animar_progreso(75, 90, 2.0, "🎨 Construyendo interfaz gráfica...")

        # =================================================================
        # FASE 6: Listo (10s - 12s) → 90% a 100%
        # =================================================================
        splash.animar_progreso(90, 100, 2.0, "🎉 ¡Sistema listo!")

        # 3. Mostrar ventana y cerrar splash
        ventana.show()
        splash.finish(ventana)

        logger.info('Aplicación GUI iniciada correctamente')

        sys.exit(app.exec())

    except Exception as e:
        logger.critical(f'Error crítico en la aplicación: {e}')
        print(f'❌ Error crítico: {e}')
        return 1
    finally:
        logger.info('=== Aplicación finalizada ===')


if __name__ == '__main__':
    exit_code = main()
    sys.exit(exit_code)