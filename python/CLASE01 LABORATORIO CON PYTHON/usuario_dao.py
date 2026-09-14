from cursor_del_pool import CursorDelPool
from usuario import Usuario
from logger_base import logger
from psycopg2 import DatabaseError, IntegrityError


class UsuarioDao:
    """
    Data Access Object para la entidad Usuario
    """
    _SELECCIONAR = 'SELECT * FROM usuario ORDER BY id_usuario'
    _INSERTAR = 'INSERT INTO usuario(username, password) VALUES(%s, %s) RETURNING id_usuario'
    _ACTUALIZAR = 'UPDATE usuario SET username=%s, password=%s WHERE id_usuario=%s'
    _ELIMINAR = 'DELETE FROM usuario WHERE id_usuario=%s'

    @classmethod
    def seleccionar(cls):
        """
        Selecciona todos los usuarios de la base de datos
        """
        usuarios = []
        try:
            with CursorDelPool() as cursor:
                cursor.execute(cls._SELECCIONAR)
                registros = cursor.fetchall()
                logger.debug(f'Seleccionados {len(registros)} usuarios')
                for registro in registros:
                    usuario = Usuario(registro[0], registro[1], registro[2])
                    usuarios.append(usuario)
                return usuarios
        except DatabaseError as e:
            logger.error(f'Error en la base de datos al seleccionar: {e}')
            raise
        except Exception as e:
            logger.error(f'Error inesperado al seleccionar: {e}')
            raise

    @classmethod
    def insertar(cls, usuario):
        """
        Inserta un nuevo usuario en la base de datos
        """
        try:
            with CursorDelPool() as cursor:
                cursor.execute(cls._INSERTAR, (usuario.username, usuario.password))
                id_generado = cursor.fetchone()[0]
                usuario.id_usuario = id_generado
                logger.info(f'Usuario insertado: {usuario}')
                return usuario
        except IntegrityError as e:
            logger.error(f'Error de integridad al insertar (username duplicado?): {e}')
            raise
        except DatabaseError as e:
            logger.error(f'Error en la base de datos al insertar: {e}')
            raise
        except Exception as e:
            logger.error(f'Error inesperado al insertar: {e}')
            raise

    @classmethod
    def actualizar(cls, usuario):
        """
        Actualiza un usuario existente
        """
        try:
            with CursorDelPool() as cursor:
                cursor.execute(cls._ACTUALIZAR, (usuario.username, usuario.password, usuario.id_usuario))
                filas_afectadas = cursor.rowcount
                logger.info(f'Usuario actualizado: {usuario}, Filas afectadas: {filas_afectadas}')
                return filas_afectadas
        except DatabaseError as e:
            logger.error(f'Error en la base de datos al actualizar: {e}')
            raise
        except Exception as e:
            logger.error(f'Error inesperado al actualizar: {e}')
            raise

    @classmethod
    def eliminar(cls, usuario):
        """
        Elimina un usuario por su ID
        """
        try:
            with CursorDelPool() as cursor:
                cursor.execute(cls._ELIMINAR, (usuario.id_usuario,))
                filas_afectadas = cursor.rowcount
                logger.info(f'Usuario eliminado: {usuario}, Filas afectadas: {filas_afectadas}')
                return filas_afectadas
        except DatabaseError as e:
            logger.error(f'Error en la base de datos al eliminar: {e}')
            raise
        except Exception as e:
            logger.error(f'Error inesperado al eliminar: {e}')
            raise