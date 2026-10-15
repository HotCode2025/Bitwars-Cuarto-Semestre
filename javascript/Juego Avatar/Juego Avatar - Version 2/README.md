# 🔥 AVATAR: La Leyenda de Aang

## 📖 Descripción del proyecto

Avatar es un juego web inspirado en la serie *Avatar: La Leyenda de Aang*, desarrollado utilizando HTML, CSS y JavaScript.

El objetivo del juego es seleccionar un personaje y enfrentarse a un enemigo elegido aleatoriamente. Durante el combate, ambos personajes utilizan diferentes ataques para intentar quitarle las vidas a su rival.

Este proyecto fue desarrollado como parte de mi aprendizaje en programación, incorporando progresivamente nuevos conceptos de JavaScript, manipulación del DOM y Programación Orientada a Objetos (POO).

## 🎮 Funcionalidades

- Selección de personajes originales: Zuko, Katara, Aang y Toph.
- Creación de personajes personalizados con nombre y elemento.
- Selección aleatoria del personaje enemigo.
- Sistema de combate con tres ataques: Puño, Patada y Barrida.
- Sistema de tres vidas para cada personaje.
- Mensajes dinámicos de victoria, derrota y empate.
- Pantalla con las reglas del juego.
- Botón para reiniciar la partida.
- Interfaz visual adaptable a diferentes tamaños de pantalla.

## ⚔️ Reglas del juego

Cada personaje comienza con tres vidas.

Los ataques funcionan de la siguiente manera:

- Patada vence a Puño.
- Puño vence a Barrida.
- Barrida vence a Patada.
- Si ambos personajes utilizan el mismo ataque, se produce un empate.

El primer personaje que pierde sus tres vidas pierde la partida.

## 💻 Tecnologías utilizadas

- **HTML5:** estructura y contenido del juego.
- **CSS3:** diseño visual, estilos y adaptación a diferentes pantallas.
- **JavaScript:** lógica del juego, interacción con el usuario y actualización dinámica de los elementos HTML.

## 🧠 Conceptos de programación aplicados

Durante el desarrollo del proyecto se implementaron diferentes conceptos:

- Variables, funciones y condicionales.
- Eventos mediante `addEventListener()`.
- Manipulación del DOM.
- Generación dinámica de elementos HTML.
- Arrays y métodos como `push()`, `forEach()` y `length`.
- Objetos y clases mediante Programación Orientada a Objetos.
- Constructores e instancias utilizando `new`.
- Métodos de clase.
- Uso de números aleatorios.
- Reutilización de código y aplicación del principio DRY.

## 🧩 Programación Orientada a Objetos

Se implementó una clase llamada `Personaje`, que permite crear personajes con sus propios atributos:

- Nombre.
- Elemento.
- Imagen.
- Vidas.

También se incorporó el método `perderVida()`, encargado de descontar una vida sin permitir valores negativos.

Los personajes se almacenan dentro de un array y sus tarjetas se generan dinámicamente mediante JavaScript.

Esto permite incorporar nuevos personajes sin necesidad de escribir una tarjeta HTML para cada uno, logrando que el proyecto sea más escalable y fácil de mantener.

## 📁 Estructura del proyecto

```text
Avatar/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── avatar.js
├── img/
│   └── Imágenes de personajes y elementos
└── README.md
```

## 🚀 Cómo ejecutar el juego

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto.
3. Ejecutar el archivo `index.html` desde un navegador web.
4. Seleccionar un personaje original o crear uno personalizado.
5. ¡Comenzar a jugar!

## 📌 Estado del proyecto

**Versión 1 — Finalizada.**

Esta versión incluye la selección de personajes, creación de personajes personalizados y el sistema completo de combate.

El proyecto continuará desarrollándose en una segunda versión, donde se incorporará un mapa de juego mediante Canvas y el movimiento de personajes.

## 🎯 Objetivo del proyecto

Aplicar los conocimientos adquiridos durante el aprendizaje de desarrollo web, mejorando progresivamente la organización del código, su reutilización y su escalabilidad.

## 🗺️ Versión 2 — Implementación del Canvas

En esta segunda versión comenzamos a desarrollar un mapa de encuentro para los personajes, utilizando el elemento `canvas` de HTML5 y JavaScript.

El objetivo de esta nueva etapa es preparar un espacio donde los personajes puedan desplazarse e interactuar dentro de un mapa.

### 🛠️ Cambios realizados

- Creamos una nueva sección en HTML llamada `ver-mapa`, que contiene el elemento `<canvas>`.
- Incorporamos estilos CSS para organizar y visualizar el mapa.
- Utilizamos `getContext('2d')` para obtener el contexto de dibujo del Canvas.
- Configuramos JavaScript para mantener el mapa oculto al iniciar el juego.
- Modificamos la selección de personajes para mostrar el mapa en lugar de la pantalla de combate.
- Implementamos `new Image()` para cargar la imagen del personaje seleccionado.
- Utilizamos `drawImage()` para dibujar el personaje dentro del Canvas.
- Creamos la función `dibujarPersonaje()` para reutilizar el código tanto con personajes originales como personalizados.
- Incorporamos `clearRect()` para limpiar el Canvas antes de dibujar la imagen.

### 🧠 Conceptos aprendidos

En esta etapa trabajamos con:

- Canvas de HTML5.
- Sistema de coordenadas X e Y.
- Contexto de dibujo en dos dimensiones.
- Manipulación del DOM desde JavaScript.
- Carga de imágenes mediante `Image()` y `onload`.
- Reutilización de funciones y principio DRY.

### 📌 Estado actual

## 🎮 Versión 2 — Movimiento de personajes en el Canvas

En esta etapa continuamos desarrollando el videojuego Avatar, incorporando el movimiento de los personajes dentro del Canvas mediante botones de dirección.

El objetivo de esta clase fue lograr que los personajes pudieran desplazarse hacia arriba, abajo, izquierda y derecha, manteniendo el movimiento mientras el jugador presiona un botón.

### 🛠️ Cambios realizados

- Incorporamos las propiedades `x`, `y`, `ancho` y `alto` dentro de la clase `Personaje` para controlar su posición y tamaño.
- Agregamos `velocidadX` y `velocidadY` para gestionar la velocidad de desplazamiento.
- Incorporamos `mapaFoto` para almacenar la imagen utilizada en el Canvas.
- Adaptamos la función `dibujarPersonaje()` para utilizar las propiedades de cada personaje.
- Solucionamos la carga de imágenes de los personajes personalizados mediante el evento `onload`.
- Agregamos cuatro botones de movimiento: arriba, abajo, izquierda y derecha.
- Implementamos los eventos `onmousedown` y `onmouseup` para detectar cuándo se presiona y se suelta un botón.
- Creamos las funciones `moverArriba()`, `moverAbajo()`, `moverIzquierda()` y `moverDerecha()`.
- Incorporamos `detenerMovimiento()` para detener al personaje cuando se suelta el botón.
- Utilizamos `setInterval()` para actualizar continuamente la posición y el dibujo del personaje cada 50 milisegundos.
- Adaptamos el movimiento para que funcione tanto con personajes originales como personalizados.

### 🧠 Conceptos aprendidos

Durante esta clase trabajamos con:

- Propiedades de objetos y programación orientada a objetos (POO).
- Coordenadas X e Y dentro del Canvas.
- Movimiento horizontal y vertical.
- Velocidades positivas, negativas y cero.
- Eventos del mouse: `onmousedown` y `onmouseup`.
- Actualización continua mediante `setInterval()`.
- Renderizado de imágenes con `drawImage()`.
- Limpieza del Canvas con `clearRect()`.
- Reutilización de funciones.

### ✅ Estado actual del proyecto

**Avatar - Versión 2: En desarrollo.**

Actualmente, el jugador puede seleccionar uno de los personajes originales o crear uno personalizado y visualizarlo dentro del Canvas.

Los personajes pueden desplazarse en las cuatro direcciones utilizando los botones de movimiento.

El desplazamiento es continuo mientras se mantiene presionado el botón y se detiene al soltarlo.

