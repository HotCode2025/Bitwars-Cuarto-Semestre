import pygame
import os
from constantes import ASSETS_PATH


class Explosion:
    def __init__(self, x, y):
        try:
            # Cargar el spritesheet completo
            sprite_sheet = pygame.image.load(
                os.path.join(ASSETS_PATH, 'images', 'exp.png')
            ).convert_alpha()

            # El spritesheet tiene 4 columnas x 4 filas = 16 frames
            columnas = 4
            filas = 4
            ancho_frame = sprite_sheet.get_width() // columnas
            alto_frame = sprite_sheet.get_height() // filas

            # Cortar cada frame del spritesheet
            self.images = []
            for fila in range(filas):
                for col in range(columnas):
                    rect = pygame.Rect(
                        col * ancho_frame,
                        fila * alto_frame,
                        ancho_frame,
                        alto_frame
                    )
                    frame = sprite_sheet.subsurface(rect).copy()
                    # Escalar cada frame a un tamaño visible en pantalla
                    frame = pygame.transform.scale(frame, (80, 80))
                    self.images.append(frame)

        except Exception as e:
            print(f"[AVISO] No se pudo cargar exp.png: {e}")
            # Placeholder por si no encuentra el archivo
            self.images = []
            for i in range(9):
                img = pygame.Surface((80, 80), pygame.SRCALPHA)
                radio = 15 + i * 5
                pygame.draw.circle(img, (255, 165, 0), (40, 40), radio)
                self.images.append(img)

        self.index = 0
        self.image = self.images[self.index]
        self.rect = self.image.get_rect(center=(x, y))
        self.frame_rate = 0
        self.max_frames = 3  # Frames por imagen (más bajo = animación más rápida)

    def actualizar(self):
        self.frame_rate += 1
        if self.frame_rate >= self.max_frames:
            self.frame_rate = 0
            self.index += 1
            if self.index >= len(self.images):
                return False  # Termina la animación
            self.image = self.images[self.index]
        return True

    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)