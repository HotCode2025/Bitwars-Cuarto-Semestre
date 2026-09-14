from usuario_dao import UsuarioDao
from usuario import Usuario
from logger_base import logger


class MenuAppUsuario:
    """
    Clase que representa el menú de opciones según el diagrama UML.
    Contiene las 5 opciones: listar, agregar, actualizar, eliminar y salir.
    Aunque la aplicación usa GUI, esta clase se mantiene para cumplir con el diseño.
    """

    @staticmethod
    def listar_usuarios():
        """Opción 1: Listar usuarios"""
        logger.info('MenuAppUsuario: Listando usuarios')
        usuarios = UsuarioDao.seleccionar()
        for u in usuarios:
            print(u)
        return usuarios

    @staticmethod
    def agregar_usuario(username, password):
        """Opción 2: Agregar usuario"""
        logger.info(f'MenuAppUsuario: Agregando usuario {username}')
        usuario = Usuario(username=username, password=password)
        return UsuarioDao.insertar(usuario)

    @staticmethod
    def actualizar_usuario(id_usuario, username, password):
        """Opción 3: Actualizar usuario"""
        logger.info(f'MenuAppUsuario: Actualizando usuario {id_usuario}')
        usuario = Usuario(id_usuario=id_usuario, username=username, password=password)
        return UsuarioDao.actualizar(usuario)

    @staticmethod
    def eliminar_usuario(id_usuario):
        """Opción 4: Eliminar usuario"""
        logger.info(f'MenuAppUsuario: Eliminando usuario {id_usuario}')
        usuario = Usuario(id_usuario=id_usuario)
        return UsuarioDao.eliminar(usuario)

    @staticmethod
    def salir():
        """Opción 5: Salir"""
        logger.info('MenuAppUsuario: Saliendo del sistema')
        print('Saliendo del sistema...')
        return True