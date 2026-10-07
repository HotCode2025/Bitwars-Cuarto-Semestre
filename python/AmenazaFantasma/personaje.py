import pygame
import os
import math
import random
from constantes import (
    ASSETS_PATH, COLOR_PERSONAJE, COLOR_ENEMIGO,
    COLOR_LASER
)


class Personaje:
    def __init__(self, x, y):
        try:
            self.image = pygame.image.load(
                os.path.join(ASSETS_PATH, 'images', 'nave.png')
            ).convert_alpha()
            ancho_deseado = 140
            alto_deseado = int(ancho_deseado * self.image.get_height() / self.image.get_width())
            self.image = pygame.transform.scale(self.image, (ancho_deseado, alto_deseado))
        except Exception as e:
            print(f"[AVISO] No se pudo cargar nave.png: {e}")
            self.image = pygame.Surface((140, 80), pygame.SRCALPHA)
            self.image.fill(COLOR_PERSONAJE)

        try:
            self.icono = pygame.image.load(
                os.path.join(ASSETS_PATH, 'images', 'nave.png')
            ).convert_alpha()
            self.icono = pygame.transform.scale(self.icono, (40, 26))
        except:
            self.icono = pygame.Surface((40, 26), pygame.SRCALPHA)
            self.icono.fill(COLOR_PERSONAJE)

        self.shape = self.image.get_rect(center=(x, y))
        self.lasers = []
        self.energia_max = 100
        self.energia = 100
        self.cooldown = 0
        self.recoil_offset = 0
        self.invulnerable = 0

    def mover(self, dx, dy):
        self.shape.x += dx
        self.shape.y += dy
        from constantes import SCREEN_WIDTH, SCREEN_HEIGHT
        if self.shape.left < 0:
            self.shape.left = 0
        if self.shape.right > SCREEN_WIDTH:
            self.shape.right = SCREEN_WIDTH
        if self.shape.top < 0:
            self.shape.top = 0
        if self.shape.bottom > SCREEN_HEIGHT:
            self.shape.bottom = SCREEN_HEIGHT

    def lanzar_laser(self):
        if self.cooldown <= 0:
            offset_x = int(self.shape.width * 0.33)
            laser_izq = Laser(self.shape.centerx - offset_x, self.shape.top)
            laser_der = Laser(self.shape.centerx + offset_x, self.shape.top)
            self.lasers.append(laser_izq)
            self.lasers.append(laser_der)
            self.cooldown = 14
            self.recoil_offset = 14

    def recibir_dano(self, cantidad=10):
        if self.invulnerable > 0:
            return True
        self.energia -= cantidad
        self.invulnerable = 60
        if self.energia <= 0:
            self.energia = 0
            return False
        return True

    def dibujar(self, screen):
        if self.invulnerable > 0:
            if (self.invulnerable // 4) % 2 == 0:
                screen.blit(self.image, (self.shape.x, self.shape.y + self.recoil_offset))
            self.invulnerable -= 1
        else:
            screen.blit(self.image, (self.shape.x, self.shape.y + self.recoil_offset))

        if self.recoil_offset > 0:
            self.recoil_offset = max(0, self.recoil_offset - 3)

        for laser in self.lasers[:]:
            laser.mover()
            laser.dibujar(screen)
            if laser.rect.bottom < 0:
                self.lasers.remove(laser)

        if self.cooldown > 0:
            self.cooldown -= 1

    def dibujar_vidas(self, screen, x, y):
        vidas = self.energia // 10
        for i in range(vidas):
            screen.blit(self.icono, (x + i * 45, y))


class LaserEnemigo:
    def __init__(self, x, y):
        self.image = pygame.Surface((8, 25), pygame.SRCALPHA)
        pygame.draw.rect(self.image, (255, 50, 50), (0, 0, 8, 25))
        pygame.draw.rect(self.image, (255, 200, 200), (0, 0, 8, 10))
        self.rect = self.image.get_rect(center=(x, y))

    def mover(self):
        self.rect.y += 7

    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)


class Enemigo:
    """Nave TIE que desciende en zig-zag y dispara."""

    def __init__(self, x, y):
        try:
            self.image = pygame.image.load(
                os.path.join(ASSETS_PATH, 'images', 'enemigo.png')
            ).convert_alpha()
            self.image = pygame.transform.scale(self.image, (70, 70))
        except:
            self.image = pygame.Surface((70, 70), pygame.SRCALPHA)
            self.image.fill(COLOR_ENEMIGO)

        self.rect = self.image.get_rect(topleft=(x, y))
        self.velocidad = 4

        self.x_inicial = x
        self.amplitud = 80
        self.velocidad_zigzag = 0.05
        self.tiempo = 0

        self.lasers = []
        self.cooldown_disparo = random.randint(60, 180)

        self.sonido_proximidad_reproducido = False

    def mover(self):
        self.rect.y += self.velocidad

        self.tiempo += self.velocidad_zigzag
        offset_x = math.sin(self.tiempo) * self.amplitud
        self.rect.x = self.x_inicial + offset_x

        from constantes import SCREEN_WIDTH
        if self.rect.left < 0:
            self.rect.left = 0
            self.x_inicial = self.rect.x
        if self.rect.right > SCREEN_WIDTH:
            self.rect.right = SCREEN_WIDTH
            self.x_inicial = self.rect.x - self.amplitud * 2

        self.cooldown_disparo -= 1
        if self.cooldown_disparo <= 0:
            self.disparar()
            self.cooldown_disparo = random.randint(90, 210)

        for laser in self.lasers[:]:
            laser.mover()
            if laser.rect.top > 1000:
                self.lasers.remove(laser)

    def disparar(self):
        laser = LaserEnemigo(self.rect.centerx, self.rect.bottom)
        self.lasers.append(laser)

    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)
        for laser in self.lasers:
            laser.dibujar(screen)


class Laser:
    def __init__(self, x, y):
        try:
            self.image = pygame.image.load(
                os.path.join(ASSETS_PATH, 'images', 'lase1.png')
            ).convert_alpha()
        except:
            self.image = pygame.Surface((10, 30), pygame.SRCALPHA)
            self.image.fill(COLOR_LASER)

        self.rect = self.image.get_rect(center=(x, y))

    def mover(self):
        self.rect.y -= 12

    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)