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