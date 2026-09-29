import os
from psycopg2 import pool, DatabaseError, OperationalError
from logger_base import logger
import sys

# Cargar variables de entorno desde el archivo .env
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    logger.warning('python-dotenv no instalado. Usando valores por defecto.')


class Conexion:
    """
    Clase singleton para manejar el pool de conexiones a PostgreSQL.
    Las credenciales se leen desde el archivo .env
    """
    _DATABASE = os.getenv('DB_NAME', 'persona')
    _USERNAME = os.getenv('DB_USER', 'postgres')
    _PASSWORD = os.getenv('DB_PASSWORD', 'admin123')
    _DB_PORT = os.getenv('DB_PORT', '5432')
    _HOST = os.getenv('DB_HOST', 'localhost')
    _SSLMODE = os.getenv('DB_SSLMODE', 'prefer')
    _MIN_CON = 1
    _MAX_CON = 5
    _pool = None

    @classmethod
    def obtenerPool(cls):
        """
        Obtiene o crea el pool de conexiones (Singleton)
        """
        if cls._pool is None:
            try:
                cls._pool = pool.SimpleConnectionPool(
                    cls._MIN_CON,
                    cls._MAX_CON,
                    host=cls._HOST,
                    port=cls._DB_PORT,
                    database=cls._DATABASE,
                    user=cls._USERNAME,
                    password=cls._PASSWORD,
                    sslmode=cls._SSLMODE,
                    connect_timeout=10
                )
                logger.info(f'Pool de conexiones creado exitosamente. Host: {cls._HOST}')
                return cls._pool
            except Exception as e:
                logger.error(f'Error al crear el pool de conexiones: {e}')
                sys.exit(1)
        else:
            return cls._pool

    @classmethod
    def obtenerConexion(cls):
        """
        Obtiene una conexión del pool
        """
        try:
            pool_conn = cls.obtenerPool()
            conexion = pool_conn.getconn()
            logger.debug(f'Conexión obtenida del pool: {conexion}')
            return conexion
        except OperationalError as e:
            logger.error(f'Error operacional al obtener conexión: {e}')
            raise
        except DatabaseError as e:
            logger.error(f'Error de base de datos al obtener conexión: {e}')
            raise
        except Exception as e:
            logger.error(f'Error inesperado al obtener conexión: {e}')
            raise

    @classmethod
    def liberarConexion(cls, conexion):
        """
        Libera una conexión devolviéndola al pool
        """
        try:
            pool_conn = cls.obtenerPool()
            pool_conn.putconn(conexion)
            logger.debug(f'Conexión liberada al pool: {conexion}')
        except Exception as e:
            logger.error(f'Error al liberar conexión: {e}')
            raise

    @classmethod
    def cerrarConexiones(cls):
        """
        Cierra todas las conexiones del pool
        """
        try:
            pool_conn = cls.obtenerPool()
            pool_conn.closeall()
            logger.info('Todas las conexiones del pool fueron cerradas')
        except Exception as e:
            logger.error(f'Error al cerrar conexiones: {e}')
            raise

    @classmethod
    def obtener_info(cls):
        """
        Devuelve un diccionario con la información de conexión actual
        (SIN la contraseña).
        """
        # Detectar el tipo de conexión
        if 'neon.tech' in cls._HOST:
            tipo = 'Neon (Cloud)'
        elif cls._HOST in ('localhost', '127.0.0.1'):
            tipo = 'Docker local'
        elif cls._HOST.startswith('192.168') or cls._HOST.startswith('10.'):
            tipo = 'Red local'
        else:
            tipo = 'Remoto'

        return {
            'host': cls._HOST,
            'puerto': cls._DB_PORT,
            'base_datos': cls._DATABASE,
            'usuario': cls._USERNAME,
            'ssl': cls._SSLMODE,
            'tipo': tipo
        }