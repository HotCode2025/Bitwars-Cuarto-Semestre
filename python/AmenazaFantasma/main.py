import pygame
import sys
import random
import os
import math

os.environ['SDL_VIDEO_CENTERED'] = '1'

from personaje import Personaje, Enemigo
from explosion import Explosion
from constantes import (
    SCREEN_WIDTH, SCREEN_HEIGHT, ASSETS_PATH,
    COLOR_FONDO, PANTALLA_COMPLETA
)

RECORD_PATH = os.path.join(os.path.dirname(__file__), 'record.txt')


# ============================================================
# FUENTE ROBUSTA
# ============================================================
def obtener_fuente(tamanio, negrita=False):
    fuentes_probables = ['dejavusans', 'liberationsans', 'arial', 'freesans', 'sans']
    for nombre in fuentes_probables:
        try:
            fuente = pygame.font.SysFont(nombre, tamanio, bold=negrita)
            if fuente:
                return fuente
        except:
            continue
    return pygame.font.Font(None, tamanio)


# ============================================================
# RÉCORD
# ============================================================
def cargar_record():
    try:
        with open(RECORD_PATH, 'r') as f:
            return int(f.read().strip())
    except:
        return 0


def guardar_record(puntos):
    try:
        with open(RECORD_PATH, 'w') as f:
            f.write(str(puntos))
    except Exception as e:
        print(f"[AVISO] No se pudo guardar el récord: {e}")


# ============================================================
# INTRO (sin mensaje de "presiona tecla")
# ============================================================
def mostrar_imagen_inicial(screen, imagen_path):
    try:
        imagen = pygame.image.load(imagen_path).convert_alpha()
        ancho_max = int(SCREEN_WIDTH * 0.7)
        alto_max = int(SCREEN_HEIGHT * 0.9)

        ancho_original = imagen.get_width()
        alto_original = imagen.get_height()
        escala = min(ancho_max / ancho_original, alto_max / alto_original)

        nuevo_ancho = int(ancho_original * escala)
        nuevo_alto = int(alto_original * escala)
        imagen = pygame.transform.smoothscale(imagen, (nuevo_ancho, nuevo_alto))
    except:
        imagen = pygame.Surface((int(SCREEN_WIDTH * 0.7), int(SCREEN_HEIGHT * 0.7)))
        imagen.fill((0, 0, 0))
        font = obtener_fuente(90, negrita=True)
        texto = font.render("AMENAZA FANTASMA", True, (255, 255, 0))
        imagen.blit(texto, (imagen.get_width() // 2 - texto.get_width() // 2,
                            imagen.get_height() // 2 - texto.get_height() // 2))

    musica_ok = False
    try:
        pygame.mixer.music.load(
            os.path.join(ASSETS_PATH, 'sounds', 'Imperial March - Kenobi.mp3')
        )
        pygame.mixer.music.set_volume(0.6)
        pygame.mixer.music.play()
        musica_ok = True
    except Exception as e:
        print(f"[AVISO] No se pudo cargar la Marcha Imperial: {e}")

    pos_x = SCREEN_WIDTH // 2 - imagen.get_width() // 2
    pos_y = SCREEN_HEIGHT // 2 - imagen.get_height() // 2

    clock = pygame.time.Clock()

    tiempo_inicio = pygame.time.get_ticks()
    TIEMPO_MAX = 15000

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.mixer.music.stop()
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                pygame.mixer.music.stop()
                return

        if musica_ok and not pygame.mixer.music.get_busy():
            return

        if pygame.time.get_ticks() - tiempo_inicio > TIEMPO_MAX:
            pygame.mixer.music.stop()
            return

        screen.fill((0, 0, 0))
        screen.blit(imagen, (pos_x, pos_y))
        pygame.display.flip()
        clock.tick(60)


# ============================================================
# MENÚ (fuentes más chicas, sin pista de navegación)
# ============================================================
def mostrar_menu(screen):
    # 🔤 Fuentes reducidas
    font_titulo = obtener_fuente(80, negrita=True)
    font_opcion = obtener_fuente(42)

    opciones = ["Jugar", "Ver Récord", "Salir"]
    seleccion = 0

    try:
        fondo_menu = pygame.image.load(
            os.path.join(ASSETS_PATH, 'images', 'inicio', 'star.png')
        ).convert_alpha()
        ancho_img = fondo_menu.get_width()
        alto_img = fondo_menu.get_height()
        escala = max(SCREEN_WIDTH / ancho_img, SCREEN_HEIGHT / alto_img)
        nuevo_ancho = int(ancho_img * escala)
        nuevo_alto = int(alto_img * escala)
        fondo_menu = pygame.transform.smoothscale(fondo_menu, (nuevo_ancho, nuevo_alto))
    except:
        fondo_menu = None

    clock = pygame.time.Clock()

    y_titulo = int(SCREEN_HEIGHT * 0.15)
    y_inicio_opciones = int(SCREEN_HEIGHT * 0.45)
    espacio_opciones = int(SCREEN_HEIGHT * 0.09)

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return 3
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    pygame.mixer.music.stop()
                elif event.key in (pygame.K_UP, pygame.K_w):
                    seleccion = (seleccion - 1) % len(opciones)
                elif event.key in (pygame.K_DOWN, pygame.K_s):
                    seleccion = (seleccion + 1) % len(opciones)
                elif event.key in (pygame.K_RETURN, pygame.K_KP_ENTER, pygame.K_SPACE):
                    return seleccion + 1

        screen.fill((0, 0, 0))

        if fondo_menu:
            pos_x = SCREEN_WIDTH // 2 - fondo_menu.get_width() // 2
            pos_y = SCREEN_HEIGHT // 2 - fondo_menu.get_height() // 2
            screen.blit(fondo_menu, (pos_x, pos_y))

        overlay = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT), pygame.SRCALPHA)
        overlay.fill((0, 0, 0, 160))
        screen.blit(overlay, (0, 0))

        # Título
        titulo = font_titulo.render("AMENAZA FANTASMA", True, (255, 215, 0))
        titulo_sombra = font_titulo.render("AMENAZA FANTASMA", True, (0, 0, 0))
        x_titulo = SCREEN_WIDTH // 2 - titulo.get_width() // 2
        screen.blit(titulo_sombra, (x_titulo + 4, y_titulo + 4))
        screen.blit(titulo, (x_titulo, y_titulo))

        # Opciones
        for i, opcion in enumerate(opciones):
            if i == seleccion:
                color = (255, 215, 0)
                prefijo = "▶  "
            else:
                color = (220, 220, 220)
                prefijo = "    "

            texto = font_opcion.render(prefijo + opcion, True, color)
            texto_sombra = font_opcion.render(prefijo + opcion, True, (0, 0, 0))
            x = SCREEN_WIDTH // 2 - texto.get_width() // 2
            y = y_inicio_opciones + i * espacio_opciones
            screen.blit(texto_sombra, (x + 2, y + 2))
            screen.blit(texto, (x, y))

        # ❌ Sin pista de navegación

        pygame.display.flip()
        clock.tick(60)


# ============================================================
# RÉCORD (sin mensaje de "presiona tecla")
# ============================================================
def mostrar_record(screen, record):
    font_titulo = obtener_fuente(80, negrita=True)
    font_texto = obtener_fuente(70, negrita=True)

    clock = pygame.time.Clock()
    esperando = True

    while esperando:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                esperando = False

        screen.fill((0, 0, 0))
        titulo = font_titulo.render("MEJOR PUNTAJE", True, (255, 215, 0))
        screen.blit(titulo, (SCREEN_WIDTH // 2 - titulo.get_width() // 2, SCREEN_HEIGHT // 2 - 150))

        valor = font_texto.render(str(record), True, (255, 255, 255))
        screen.blit(valor, (SCREEN_WIDTH // 2 - valor.get_width() // 2, SCREEN_HEIGHT // 2 - 30))

        # ❌ Sin mensaje "presiona cualquier tecla"

        pygame.display.flip()
        clock.tick(60)


# ============================================================
# GAME OVER (sin mensaje de "presiona tecla")
# ============================================================
def mostrar_game_over(screen, puntos, nivel, es_nuevo_record=False):
    font_large = obtener_fuente(75, negrita=True)
    font_medium = obtener_fuente(38)
    font_small = obtener_fuente(28)

    screen.fill((0, 0, 0))

    texto_game_over = font_large.render("GAME OVER", True, (255, 0, 0))
    screen.blit(texto_game_over, (SCREEN_WIDTH // 2 - texto_game_over.get_width() // 2, SCREEN_HEIGHT // 2 - 130))

    if es_nuevo_record:
        texto_record = font_medium.render("¡NUEVO RÉCORD!", True, (255, 215, 0))
        screen.blit(texto_record, (SCREEN_WIDTH // 2 - texto_record.get_width() // 2, SCREEN_HEIGHT // 2 - 40))

    texto_puntos = font_medium.render(f"Puntos: {puntos}   |   Nivel: {nivel}", True, (255, 255, 255))
    screen.blit(texto_puntos, (SCREEN_WIDTH // 2 - texto_puntos.get_width() // 2, SCREEN_HEIGHT // 2 + 30))

    texto_mensaje = font_small.render("Que la Fuerza te acompañe", True, (200, 200, 200))
    screen.blit(texto_mensaje, (SCREEN_WIDTH // 2 - texto_mensaje.get_width() // 2, SCREEN_HEIGHT // 2 + 90))

    # ❌ Sin mensaje "presiona cualquier tecla"

    pygame.display.flip()

    clock = pygame.time.Clock()
    esperando = True
    while esperando:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                esperando = False
        clock.tick(60)


# ============================================================
# JUEGO (HUD más chico y sin recuadro verde)
# ============================================================
def jugar(screen, sonido_laser, sonido_explosion, sonido_proximidad, canales):
    try:
        fondo2 = pygame.image.load(
            os.path.join(ASSETS_PATH, 'images', 'fondo.png')
        ).convert()
        fondo2 = pygame.transform.scale(fondo2, (SCREEN_WIDTH, SCREEN_HEIGHT))
    except:
        fondo2 = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))
        fondo2.fill(COLOR_FONDO)

    fondo3 = fondo2.copy()
    fondo3.fill((80, 80, 80), special_flags=pygame.BLEND_RGB_MULT)
    fondo_actual = fondo2

    personaje = Personaje(SCREEN_WIDTH // 2, SCREEN_HEIGHT - 100)
    enemigos = []
    explosiones = []
    puntos = 0
    nivel = 1
    puntos_para_subir = 250

    clock = pygame.time.Clock()
    running = True

    # 🔤 Fuente del HUD más chica
    font_hud = obtener_fuente(30, negrita=True)
    DISTANCIA_PROXIMIDAD = 180

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                pygame.mixer.music.stop()
                running = False

        keys = pygame.key.get_pressed()
        dx, dy = 0, 0
        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            dx = -7
        if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            dx = 7
        if keys[pygame.K_UP] or keys[pygame.K_w]:
            dy = -7
        if keys[pygame.K_DOWN] or keys[pygame.K_s]:
            dy = 7

        personaje.mover(dx, dy)

        if keys[pygame.K_SPACE]:
            if personaje.cooldown <= 0:
                personaje.lanzar_laser()
                if canales and sonido_laser:
                    canales['laser'].play(sonido_laser)
                elif sonido_laser:
                    sonido_laser.play()

        # --- ACTUALIZAR ENEMIGOS ---
        for enemigo in enemigos[:]:
            enemigo.mover()

            if not enemigo.sonido_proximidad_reproducido:
                distancia = math.hypot(
                    enemigo.rect.centerx - personaje.shape.centerx,
                    enemigo.rect.centery - personaje.shape.centery
                )
                if distancia < DISTANCIA_PROXIMIDAD:
                    if sonido_proximidad:
                        ch = pygame.mixer.find_channel()
                        if ch:
                            ch.play(sonido_proximidad)
                    enemigo.sonido_proximidad_reproducido = True

            if enemigo.rect.top > SCREEN_HEIGHT:
                enemigos.remove(enemigo)
                continue

            if enemigo.rect.colliderect(personaje.shape):
                enemigos.remove(enemigo)
                explosiones.append(Explosion(enemigo.rect.centerx, enemigo.rect.centery))
                if canales and sonido_explosion:
                    ch = pygame.mixer.find_channel()
                    (ch or canales['explosion']).play(sonido_explosion)
                elif sonido_explosion:
                    sonido_explosion.play()

                if not personaje.recibir_dano(10):
                    running = False
                continue

            for laser in personaje.lasers[:]:
                if enemigo.rect.colliderect(laser.rect):
                    explosiones.append(Explosion(laser.rect.centerx, laser.rect.centery))
                    personaje.lasers.remove(laser)

                    if canales and sonido_explosion:
                        ch = pygame.mixer.find_channel()
                        (ch or canales['explosion']).play(sonido_explosion)
                    elif sonido_explosion:
                        sonido_explosion.play()

                    enemigos.remove(enemigo)
                    puntos += 10
                    break

            if hasattr(enemigo, 'lasers'):
                for laser_enemigo in enemigo.lasers[:]:
                    if laser_enemigo.rect.colliderect(personaje.shape):
                        enemigo.lasers.remove(laser_enemigo)
                        if not personaje.recibir_dano(10):
                            running = False

        if random.random() < 0.015 + (nivel * 0.005):
            x = random.randint(0, SCREEN_WIDTH - 70)
            enemigos.append(Enemigo(x, -70))

        explosiones = [e for e in explosiones if e.actualizar()]

        if puntos >= puntos_para_subir:
            nivel += 1
            puntos = 0
            fondo_actual = fondo3 if fondo_actual == fondo2 else fondo2

        # --- DIBUJAR ---
        screen.blit(fondo_actual, (0, 0))
        personaje.dibujar(screen)

        for enemigo in enemigos:
            enemigo.dibujar(screen)
        for explosion in explosiones:
            explosion.dibujar(screen)

        # --- HUD (sin recuadro verde) ---
        panel = pygame.Surface((320, 140))
        panel.set_alpha(200)
        panel.fill((0, 0, 0))
        screen.blit(panel, (15, 15))

        # ❌ Sin borde verde

        # Puntos
        texto_puntos_sombra = font_hud.render(f"Puntos: {puntos}", True, (0, 0, 0))
        texto_puntos = font_hud.render(f"Puntos: {puntos}", True, (255, 255, 255))
        screen.blit(texto_puntos_sombra, (30, 27))
        screen.blit(texto_puntos, (28, 25))

        # Nivel
        texto_nivel_sombra = font_hud.render(f"Nivel: {nivel}", True, (0, 0, 0))
        texto_nivel = font_hud.render(f"Nivel: {nivel}", True, (255, 255, 0))
        screen.blit(texto_nivel_sombra, (30, 67))
        screen.blit(texto_nivel, (28, 65))

        # Vidas
        personaje.dibujar_vidas(screen, 28, 110)

        pygame.display.flip()
        clock.tick(60)

    return puntos, nivel


# ============================================================
# MAIN
# ============================================================
def main():
    pygame.init()
    pygame.font.init()

    if PANTALLA_COMPLETA:
        screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT), pygame.FULLSCREEN)
        pygame.mouse.set_visible(False)
    else:
        screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))

    pygame.display.set_caption('Amenaza Fantasma')

    try:
        icon = pygame.image.load(os.path.join(ASSETS_PATH, 'images', '001.jfif'))
        pygame.display.set_icon(icon)
    except:
        pass

    pygame.mixer.set_num_channels(32)

    sonido_laser = None
    sonido_explosion = None
    sonido_proximidad = None
    canales = None
    try:
        sonido_laser = pygame.mixer.Sound(
            os.path.join(ASSETS_PATH, 'sounds', 'laserdis.mp3')
        )
        sonido_explosion = pygame.mixer.Sound(
            os.path.join(ASSETS_PATH, 'sounds', 'explosion.mp3')
        )
        sonido_proximidad = pygame.mixer.Sound(
            os.path.join(ASSETS_PATH, 'sounds', 'efectos.mp3')
        )

        sonido_laser.set_volume(0.4)
        sonido_explosion.set_volume(0.8)
        sonido_proximidad.set_volume(0.5)

        canal_laser = pygame.mixer.Channel(1)
        canal_explosion = pygame.mixer.Channel(2)

        canales = {'laser': canal_laser, 'explosion': canal_explosion}
    except Exception as e:
        print(f"[AVISO] Sonidos no cargados: {e}")

    imagen_inicial_path = os.path.join(ASSETS_PATH, 'images', 'inicio', 'star.png')
    mostrar_imagen_inicial(screen, imagen_inicial_path)

    while True:
        opcion = mostrar_menu(screen)

        if opcion == 1:
            puntos_finales, nivel_final = jugar(
                screen, sonido_laser, sonido_explosion, sonido_proximidad, canales
            )

            record_actual = cargar_record()
            es_nuevo_record = puntos_finales > record_actual
            if es_nuevo_record:
                guardar_record(puntos_finales)

            mostrar_game_over(screen, puntos_finales, nivel_final, es_nuevo_record)

        elif opcion == 2:
            mostrar_record(screen, cargar_record())

        elif opcion == 3:
            break

    pygame.quit()
    sys.exit()


if __name__ == '__main__':
    main()