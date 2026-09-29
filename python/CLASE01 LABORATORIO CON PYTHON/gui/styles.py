# Estilos modernos para la aplicación

ESTILO_PRINCIPAL = """
QMainWindow {
    background-color: #1e1e2e;
}

QWidget {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 12px;
    color: #cdd6f4;
}

QGroupBox {
    font-weight: bold;
    border: 2px solid #313244;
    border-radius: 8px;
    margin-top: 10px;
    padding-top: 10px;
    background-color: #2a2a3e;
}

QGroupBox::title {
    subcontrol-origin: margin;
    left: 10px;
    padding: 0 5px 0 5px;
    color: #89b4fa;
    font-size: 13px;
}

QLabel {
    color: #cdd6f4;
}

QLabel#titulo {
    font-size: 20px;
    font-weight: bold;
    color: #89b4fa;
    padding: 10px;
}

QLineEdit {
    background-color: #313244;
    border: 2px solid #45475a;
    border-radius: 6px;
    padding: 8px;
    color: #cdd6f4;
    selection-background-color: #89b4fa;
}

QLineEdit:focus {
    border: 2px solid #89b4fa;
}

QPushButton {
    background-color: #45475a;
    border: none;
    border-radius: 6px;
    padding: 10px 20px;
    font-weight: bold;
    color: #cdd6f4;
}

QPushButton:hover {
    background-color: #585b70;
}

QPushButton:pressed {
    background-color: #313244;
}

QPushButton#btn_agregar {
    background-color: #a6e3a1;
    color: #1e1e2e;
}

QPushButton#btn_agregar:hover {
    background-color: #89d48a;
}

QPushButton#btn_actualizar {
    background-color: #89b4fa;
    color: #1e1e2e;
}

QPushButton#btn_actualizar:hover {
    background-color: #6c9bd4;
}

QPushButton#btn_eliminar {
    background-color: #f38ba8;
    color: #1e1e2e;
}

QPushButton#btn_eliminar:hover {
    background-color: #e06b87;
}

QPushButton#btn_limpiar {
    background-color: #f9e2af;
    color: #1e1e2e;
}

QPushButton#btn_limpiar:hover {
    background-color: #f5d48e;
}

QTableWidget {
    background-color: #1e1e2e;
    alternate-background-color: #313244;
    gridline-color: #45475a;
    border: 2px solid #313244;
    border-radius: 8px;
    selection-background-color: #45475a;
}

QHeaderView::section {
    background-color: #313244;
    padding: 8px;
    border: 1px solid #45475a;
    font-weight: bold;
    color: #89b4fa;
}

QScrollBar:vertical {
    background-color: #1e1e2e;
    width: 12px;
    border-radius: 6px;
}

QScrollBar::handle:vertical {
    background-color: #45475a;
    border-radius: 6px;
    min-height: 20px;
}

QScrollBar::handle:vertical:hover {
    background-color: #585b70;
}

QScrollBar:horizontal {
    background-color: #1e1e2e;
    height: 12px;
    border-radius: 6px;
}

QScrollBar::handle:horizontal {
    background-color: #45475a;
    border-radius: 6px;
    min-width: 20px;
}

QScrollBar::handle:horizontal:hover {
    background-color: #585b70;
}

QStatusBar {
    background-color: #313244;
    color: #a6adc8;
    padding: 5px;
}

QMessageBox {
    background-color: #1e1e2e;
    color: #cdd6f4;
}

QMessageBox QPushButton {
    min-width: 80px;
    padding: 8px 16px;
}

QTabWidget::pane {
    border: 2px solid #313244;
    border-radius: 8px;
    background-color: #1e1e2e;
}

QTabBar::tab {
    background-color: #313244;
    border: 1px solid #45475a;
    border-bottom: none;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    padding: 8px 16px;
    color: #a6adc8;
}

QTabBar::tab:selected {
    background-color: #45475a;
    color: #89b4fa;
}

QTabBar::tab:hover:!selected {
    background-color: #3a3a4e;
}
"""

ESTILO_SCROLL_AREA = """
QScrollArea {
    border: none;
    background-color: transparent;
}

QScrollBar:vertical {
    background-color: #1e1e2e;
    width: 10px;
    border-radius: 5px;
}

QScrollBar::handle:vertical {
    background-color: #45475a;
    border-radius: 5px;
    min-height: 20px;
}

QScrollBar::handle:vertical:hover {
    background-color: #585b70;
}
"""