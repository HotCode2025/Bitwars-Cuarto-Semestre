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



## 🎮 Versión 2 — Movimiento con teclado, fondo del mapa y personaje enemigo

En esta etapa continuamos desarrollando nuestro videojuego Avatar, incorporando controles mediante el teclado, una imagen de fondo para el mapa y la visualización del personaje enemigo dentro del Canvas.

El objetivo fue mejorar la interacción del jugador con el escenario y comenzar a preparar el encuentro entre personajes.

### 🛠️ Cambios realizados

**1. Movimiento mediante el teclado**

- Incorporamos los eventos `keydown` y `keyup` utilizando `addEventListener()`.
- Creamos la función `sePresionoUnaTecla(event)` para identificar qué tecla presiona el jugador.
- Utilizamos `switch` para reconocer las flechas del teclado.
- Reutilizamos las funciones `moverArriba()`, `moverAbajo()`, `moverIzquierda()` y `moverDerecha()`.
- Implementamos `event.preventDefault()` para evitar que las flechas desplacen la página.
- Mantuvimos el funcionamiento de los botones de movimiento.

**2. Inicialización del mapa**

- Creamos la función `iniciarMapa()` para organizar la configuración del Canvas.
- Establecimos las dimensiones del mapa en 320 × 240 píxeles.
- Incorporamos `setInterval()` para actualizar continuamente el escenario cada 50 milisegundos.
- Adaptamos la inicialización para que funcione con personajes originales y personalizados.

**3. Incorporación del fondo**

- Creamos la carpeta `assets` para almacenar los recursos del escenario.
- Agregamos la imagen `mapa.jpg`.
- Utilizamos `new Image()` para cargar el fondo desde JavaScript.
- Adaptamos la función de dibujo y la renombramos como `pintarCanvas()`.
- Utilizamos `drawImage()` para mostrar el paisaje ocupando todo el Canvas.
- Mantuvimos el personaje visible por encima del fondo.

**4. Visualización del enemigo**

- Incorporamos el dibujo del personaje enemigo dentro del Canvas.
- Reutilizamos las propiedades de la clase `Personaje`, como `mapaFoto`, `ancho` y `alto`.
- Establecimos una posición fija para el enemigo dentro del escenario.
- Adaptamos el funcionamiento para mostrar al jugador y al enemigo al mismo tiempo.

### 🧠 Conceptos aprendidos

Durante esta clase trabajamos con:

- Eventos del teclado: `keydown` y `keyup`.
- Manejo de eventos mediante `addEventListener()`.
- Propiedad `event.key`.
- Estructura condicional `switch`.
- Reutilización de funciones.
- Organización del código mediante `iniciarMapa()`.
- Dimensiones del Canvas: `width` y `height`.
- Carga de imágenes con `new Image()`.
- Renderizado de fondos y personajes mediante `drawImage()`.
- Actualización continua del escenario con `setInterval()`.
- Uso de objetos y sus propiedades en programación orientada a objetos.

### ✅ Estado actual del proyecto

**Avatar - Versión 2: En desarrollo.**

Actualmente, el jugador puede seleccionar un personaje original o crear uno personalizado.

Una vez seleccionado, aparece dentro de un mapa con fondo ilustrado, donde puede desplazarse utilizando las flechas del teclado o los botones de movimiento.

El escenario también muestra un personaje enemigo, que permanece en una posición fija.

El mapa se actualiza continuamente para representar los movimientos del jugador.

### 🚀 Próximas implementaciones

- Establecer límites para evitar que los personajes salgan del Canvas.
- Incorporar movimiento al personaje enemigo.
- Detectar cuándo el jugador se encuentra con el enemigo.
- Conectar los encuentros del mapa con el sistema de combate.
- Continuar mejorando el escenario y la experiencia de juego.


## 🔧 Refactorización del código — Buenas prácticas

Siguiendo las recomendaciones del profesor, realizamos mejoras en la organización del código JavaScript.

### Cambios realizados

- Declaramos y asignamos las variables en una sola línea.
- Utilizamos `const` para los elementos HTML, objetos y arreglos que no necesitan reasignarse.
- Mantuvimos `let` para las variables cuyos valores cambian durante el juego.
- Eliminamos declaraciones y asignaciones innecesarias dentro de `iniciarJuego()`.

**Resultado:** código más limpio, organizado y fácil de mantener, conservando todas las funcionalidades del juego.


## Arena integrada (actualización)
- Controles direccionales con el mismo estilo que los demás botones y compatibles con mouse y pantalla táctil.
- Efecto visual de explosión al chocar con un enemigo.
- Combate integrado junto al mapa: tarjetas, ataques, vidas, mensajes y reinicio sin abandonar la arena.
- El movimiento se bloquea durante el combate y el mapa permanece visible.


## Actualización visual: mapa con senderos y personajes animados

- Mapa nuevo de **640 × 480** en tonos naturales y apagados, con caminos que conectan las zonas de los cuatro enemigos.
- Sprites de los cuatro personajes con fondo transparente, separados de las imágenes utilizadas en las tarjetas de combate.
- Se mantienen el movimiento, la explosión al encontrarse, el combate al lado del mapa, los resultados debajo y el reinicio.
- Recursos nuevos: `assets/mapa_senderos.png` y `assets/sprites/`.

## Mejoras opcionales: presentación y audio

- Animaciones elementales en las tarjetas al acertar o recibir un ataque.
- Barras de vida y corazones sincronizados con las 3 vidas originales.
- Bienvenida mejorada en el menú existente, sin alterar el flujo de selección.
- Efectos de sonido generados por el navegador con botón para activarlos o silenciarlos (apagados por defecto).
- Se conservan el mapa, los enemigos, las colisiones, el combate y los resultados.


## Edición elemental: animaciones, vida y sonidos

**Esta entrega se identifica en la pantalla inicial por el cartel `EDICIÓN ELEMENTAL ✨` y tres tarjetas de novedades.**
- Botón `🔇 Activar sonidos del juego` en la pantalla inicial; sonidos opcionales generados en el navegador.
- Ataques elementales animados sobre las tarjetas de combate.
- Barras y corazones de vida animados junto a los personajes.
- Se mantienen el mapa, los senderos, los personajes, las colisiones, los resultados y el reinicio.

### Cómo abrir ESTA versión
1. Descomprimí el ZIP en una **carpeta nueva**, no sobre una carpeta anterior.
2. Entrá en `Juego Avatar - Version 2`.
3. Abrí `avatar.html`.
4. Si no ves `EDICIÓN ELEMENTAL ✨` en el título, estás abriendo una versión anterior.


## Portada y música de fondo
- Portada grande con los cuatro maestros debajo del título, reemplazando emojis.
- Música ambiental instrumental original en `assets/musica_ambiental_original.wav`, reproducida en bucle sin conexión a internet.
- El mismo botón activa y silencia **música y efectos de sonido**. La música comienza apagada por las restricciones de reproducción automática de los navegadores.
- No se modifican el mapa, los controles, las colisiones ni las reglas del combate.
