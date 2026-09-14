from conexion import Conexion
from logger_base import logger


def crear_tabla():
    try:
        conexion = Conexion.obtenerConexion()
        cursor = conexion.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS usuario (
                id_usuario SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL
            );
        """)

        conexion.commit()
        logger.info('Tabla usuario creada/verificada exitosamente')
        print('✅ Tabla usuario creada exitosamente')

        cursor.close()
        Conexion.liberarConexion(conexion)

    except Exception as e:
        logger.error(f'Error al crear tabla: {e}')
        print(f'❌ Error al crear tabla: {e}')


if __name__ == '__main__':
    crear_tabla()