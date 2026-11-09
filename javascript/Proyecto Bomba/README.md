# Proyecto Bomba

Página con un botón rojo en 3D de autodestrucción, hecha con HTML, CSS y JavaScript, sin dependencias.

## Cómo probarlo

Abrir `index.html` en el navegador, o con la extensión Live Server de VS Code.

1. Hacer clic en la tapa de vidrio para abrirla.
2. Apretar el botón rojo: arranca la alarma y la cuenta regresiva de 9 segundos.
3. `ABORT` cancela. Si llega a cero, la pantalla se apaga con sonido de explosión.
4. El botón circular del centro reinicia todo, y el cuadrado de abajo a la derecha silencia.

## Archivos

- `index.html`: estructura de la página.
- `css/style.css`: botón, tapa 3D, placa de advertencia, panel y animaciones de apagado.
- `prueba.js`: tapa, cuenta regresiva, cancelar, reiniciar y silenciar.
- `sound/`: alarma y explosión, generadas con ffmpeg para este proyecto.
