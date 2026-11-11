from conexion import Conexion
from logger_base import logger


class CursorDelPool:
    """
    Context Manager para manejar conexiones y cursores automáticamente
    Usa 'with' para garantizar la liberación de recursos
    """
    def __init__(self):
        self._conn = None
        self._cursor = None

    def __enter__(self):
        """
        Al entrar al bloque with, obtiene conexión y cursor
        """
        try:
            logger.debug('Iniciando bloque with')
            self._conn = Conexion.obtenerConexion()
            self._cursor = self._conn.cursor()
            logger.debug(f'Cursor creado: {self._cursor}')
            return self._cursor
        except Exception as e:
            logger.error(f'Error al obtener conexión/cursor: {e}')
            raise

    def __exit__(self, exc_type, exc_val, exc_tb):
        """
        Al salir del bloque with, maneja transacciones y libera recursos
        """
        try:
            if exc_type is not None:
                # Hubo una excepción, hacemos rollback
                self._conn.rollback()
                logger.error(f'Rollback realizado por excepción: {exc_type}, {exc_val}')
            else:
                # Todo bien, hacemos commit
                self._conn.commit()
                logger.debug('Commit realizado exitosamente')

            # Cerramos el cursor
            if self._cursor is not None:
                self._cursor.close()
                logger.debug('Cursor cerrado')

            # Liberamos la conexión al pool
            if self._conn is not None:
                Conexion.liberarConexion(self._conn)
                logger.debug('Conexión liberada al pool')

        except Exception as e:
            logger.error(f'Error al salir del bloque with: {e}')
            raise