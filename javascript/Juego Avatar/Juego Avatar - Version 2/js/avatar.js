// ==========================================
// VARIABLES GENERALES DEL JUEGO
// ==========================================

// Elemento HTML donde se muestran las tarjetas
const contenedorPersonajes = document.getElementById('contenedor-personajes')

// Variables que cambian durante el juego
let personajeJugador
let personajeEnemigo
let ataqueJugador
let ataqueEnemigo

// Secciones HTML del juego
const sectionFormularioPersonaje = document.getElementById('formulario-personaje')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
const sectionReiniciar = document.getElementById('reiniciar')
const sectionMensaje = document.getElementById('mensajes')
const seccionReglas = document.getElementById('reglas')

// Campos del formulario para crear personajes
const inputNombreNuevoPersonaje = document.getElementById('nombre-nuevo-personaje')
const selectElementoNuevoPersonaje = document.getElementById('elemento-nuevo-personaje')
const botonCrearNuevoPersonaje = document.getElementById('boton-crear-personaje')

// Botones principales del juego
const botonPersonajeJugador = document.getElementById('boton-personaje')
const botonPunio = document.getElementById('boton-punio')
const botonPatada = document.getElementById('boton-patada')
const botonBarrida = document.getElementById('boton-barrida')

// Botones de reglas y reinicio
const botonReglas = document.getElementById('reglasdejuego')
const botonReiniciar = document.getElementById('boton-reiniciar')
const botonCerrarReglas = document.getElementById('cerrar-reglas')

// Elementos HTML del mapa
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const lienzo = mapa.getContext('2d')

// Intervalo de actualización del mapa
let intervalo

// Imagen de fondo del mapa 
const mapaBackground = new Image()
mapaBackground.src = './assets/mapa.jpg'

// Nombres de los personajes
const spanPersonajeJugador = document.getElementById('personaje-jugador')
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo')

// Vidas de los personajes
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

// Imágenes de los personajes
const imagenJugador = document.getElementById('imagen-jugador')
const imagenEnemigo = document.getElementById('imagen-enemigo')

// Nombres que aparecen durante el combate
const nombreJugadorCombate = document.getElementById('nombre-jugador-combate')
const nombreEnemigoCombate = document.getElementById('nombre-enemigo-combate')

// Menú para elegir el modo de personaje
const sectionModoPersonaje = document.getElementById('modo-personaje')
const botonUsarOriginales = document.getElementById('usar-originales')
const botonCrearPersonaje = document.getElementById('crear-personaje')


// ==========================================
// CLASE PERSONAJE - PROGRAMACIÓN ORIENTADA A OBJETOS
// Define las características y comportamientos
// que tendrán todos los personajes del juego.
// ==========================================

// Clase que define los atributos y comportamientos de los personajes
class Personaje {

    constructor(nombre, elemento, imagen, vidas) {

        this.nombre = nombre
        this.elemento = elemento
        this.imagen = imagen
        this.vidas = vidas

        // Posición y tamaño dentro del Canvas
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80

        // Velocidad de movimiento
        this.velocidadX = 0
        this.velocidadY = 0

        // Imagen utilizada para dibujar el personaje en el mapa
        this.mapaFoto = new Image()
        this.mapaFoto.src = imagen
    }

    perderVida() {
        if(this.vidas > 0) {
            this.vidas--
        }
    }
}


// ==========================================
// PERSONAJES ORIGINALES
// Se crean objetos a partir de la clase Personaje.
// Se pueden agregar más personajes sin cambiar
// el funcionamiento general del juego.
// ==========================================

const personajes = [
    new Personaje('Zuko', '🔥', './img/Zuko.png', 3),
    new Personaje('Katara', '💧', './img/Katara.png', 3),
    new Personaje('Aang', '🌪️', './img/Anng.png', 3),
    new Personaje('Toph', '🌱', './img/Toph.png', 3)
]


// ==========================================
// IMÁGENES PARA PERSONAJES PERSONALIZADOS
// Relaciona cada elemento con una imagen.
// ==========================================

const imagenesElementos = {
    '🔥': './img/fuego.png',
    '💧': './img/agua.png',
    '🌪️': './img/aire.png',
    '🌱': './img/tierra.png'
}


// ==========================================
// INICIAR JUEGO
// Obtiene los elementos del HTML, configura las
// pantallas iniciales y activa los eventos.
// ==========================================

function iniciarJuego(){

    crearTarjetasPersonajes()

    // Ocultamos las secciones que no se necesitan al comenzar
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    seccionReglas.style.display = 'none'
    sectionSeleccionarPersonaje.style.display = 'none'
    sectionFormularioPersonaje.style.display = 'none'
    sectionVerMapa.style.display = 'none'


    // Eventos principales del juego
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)

    botonUsarOriginales.addEventListener('click', mostrarPersonajesOriginales)
    botonCrearPersonaje.addEventListener('click', mostrarFormularioCrearPersonaje)
    botonCrearNuevoPersonaje.addEventListener('click', crearPersonajePersonalizado)

    botonPunio.addEventListener('click', ataquePunio)
    botonPatada.addEventListener('click', ataquePatada)
    botonBarrida.addEventListener('click', ataqueBarrida)

    botonReglas.addEventListener('click', mostrarOcultarReglas)
    botonCerrarReglas.addEventListener('click', mostrarOcultarReglas)

    botonReiniciar.addEventListener('click', reiniciarJuego)
}


// ==========================================
// GENERAR TARJETAS DE PERSONAJES
// Recorre el arreglo de personajes y crea
// automáticamente sus tarjetas en el HTML.
// ==========================================

function crearTarjetasPersonajes(){

    personajes.forEach((personaje, index) => {

        let tarjeta = document.createElement('div')

        tarjeta.classList.add('tarjeta-personaje')

        tarjeta.innerHTML = `
            <input
                type="radio"
                name="personaje"
                id="personaje-${index}"
                value="${index}"
            >

            <label for="personaje-${index}">
                <img src="${personaje.imagen}" alt="${personaje.nombre}">
                <span>${personaje.nombre} ${personaje.elemento}</span>
            </label>
        `

        contenedorPersonajes.appendChild(tarjeta)
    })
}


// ==========================================
// SELECCIONAR PERSONAJE DEL JUGADOR
// Obtiene el personaje seleccionado y muestra
// sus datos en la pantalla de combate.
// ==========================================

function seleccionarPersonajeJugador(){

    let personajeSeleccionado = document.querySelector(
        'input[name="personaje"]:checked'
    )

    if(!personajeSeleccionado){
        alert('Selecciona a un personaje')
        return
    }

    let indicePersonaje = personajeSeleccionado.value

    personajeJugador = personajes[indicePersonaje]

    spanPersonajeJugador.innerHTML = personajeJugador.nombre

    nombreJugadorCombate.innerHTML =
        personajeJugador.nombre + ' ' + personajeJugador.elemento

    imagenJugador.src = personajeJugador.imagen

    spanVidasJugador.innerHTML = personajeJugador.vidas

    // Ocultamos la selección y mostramos el mapa
    sectionSeleccionarAtaque.style.display = 'none'
    sectionSeleccionarPersonaje.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()

    botonReglas.style.display = 'none'

    seleccionarPersonajeEnemigo()

    // Dibujamos la imagen del personaje seleccionado en el mapa
   pintarCanvas()
}


// ==========================================
// SELECCIONAR PERSONAJE ENEMIGO
// Selecciona aleatoriamente un personaje del arreglo.
// ==========================================

function seleccionarPersonajeEnemigo(){

    let indiceAleatorio = aleatorio(0, personajes.length - 1)

    personajeEnemigo = personajes[indiceAleatorio]

    spanPersonajeEnemigo.innerHTML = personajeEnemigo.nombre

    nombreEnemigoCombate.innerHTML =
        personajeEnemigo.nombre + ' ' + personajeEnemigo.elemento

    imagenEnemigo.src = personajeEnemigo.imagen

    spanVidasEnemigo.innerHTML = personajeEnemigo.vidas
}

// Actualizo y dibuja el mapa y el personaje
function pintarCanvas(){

    // Actualizamos la posición del personaje
    personajeJugador.x = personajeJugador.x + personajeJugador.velocidadX
    personajeJugador.y = personajeJugador.y + personajeJugador.velocidadY

    // Limpiamos el Canvas
    lienzo.clearRect(0, 0, mapa.width, mapa.height)

    // Dibujamos el fondo del mapa
    if(mapaBackground.complete && mapaBackground.naturalWidth > 0){
        lienzo.drawImage(
            mapaBackground,
            0,
            0,
            mapa.width,
            mapa.height
        )
    }

    // Dibujamos el personaje seleccionado
    let imagen = personajeJugador.mapaFoto

    if(!imagen.complete || imagen.naturalWidth === 0){
        imagen.onload = pintarCanvas
        return
    }

    lienzo.drawImage(
        imagen,
        personajeJugador.x,
        personajeJugador.y,
        personajeJugador.ancho,
        personajeJugador.alto
    )
    // Dibujamos al personaje enemigo
    if(personajeEnemigo && personajeEnemigo.mapaFoto.complete &&
   personajeEnemigo.mapaFoto.naturalWidth > 0){

    lienzo.drawImage(
        personajeEnemigo.mapaFoto,
        220,
        120,
        personajeEnemigo.ancho,
        personajeEnemigo.alto
    )
}
}

// Movimiento hacia la derecha
function moverDerecha(){
    personajeJugador.velocidadX = 5
}

// Movimiento hacia la izquierda
function moverIzquierda(){
    personajeJugador.velocidadX = -5
}

// Movimiento hacia abajo
function moverAbajo(){
    personajeJugador.velocidadY = 5
}

// Movimiento hacia arriba
function moverArriba(){
    personajeJugador.velocidadY = -5
}

// Detiene el movimiento del personaje
function detenerMovimiento(){
    personajeJugador.velocidadX = 0
    personajeJugador.velocidadY = 0
}

// Detecta las flechas presionadas en el teclado
function sePresionoUnaTecla(event){

    switch(event.key){

        case 'ArrowUp':
            event.preventDefault()
            moverArriba()
            break

        case 'ArrowDown':
            event.preventDefault()
            moverAbajo()
            break

        case 'ArrowLeft':
            event.preventDefault()
            moverIzquierda()
            break

        case 'ArrowRight':
            event.preventDefault()
            moverDerecha()
            break

        default:
            break
    }
}

// Inicia el mapa y los controles del teclado
function iniciarMapa(){

    // Tamaño del Canvas
    mapa.width = 320
    mapa.height = 240

    // Actualiza el Canvas cada 50 milisegundos
    intervalo = setInterval(pintarCanvas, 50)

    // Controles del teclado
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}


// ==========================================
// MOSTRAR PERSONAJES ORIGINALES
// Cambia del menú inicial a la selección.
// ==========================================

function mostrarPersonajesOriginales(){

    sectionModoPersonaje.style.display = 'none'
    sectionSeleccionarPersonaje.style.display = 'flex'
}


// ==========================================
// MOSTRAR FORMULARIO DE CREACIÓN
// Abre la pantalla para crear un personaje propio.
// ==========================================

function mostrarFormularioCrearPersonaje(){

    sectionModoPersonaje.style.display = 'none'
    sectionSeleccionarPersonaje.style.display = 'none'
    sectionFormularioPersonaje.style.display = 'flex'
}


// ==========================================
// CREAR PERSONAJE PERSONALIZADO
// Obtiene nombre y elemento, crea un nuevo objeto
// Personaje y lo utiliza como jugador.
// ==========================================

function crearPersonajePersonalizado(){

    let nombre = inputNombreNuevoPersonaje.value
    let elemento = selectElementoNuevoPersonaje.value

    if(nombre == ''){
        alert('Debes escribir un nombre')
        return
    }

    let imagen = imagenesElementos[elemento]

    let nuevoPersonaje = new Personaje(
        nombre,
        elemento,
        imagen,
        3
    )

    personajeJugador = nuevoPersonaje

    personajes.push(nuevoPersonaje)

    spanPersonajeJugador.innerHTML = nuevoPersonaje.nombre

    nombreJugadorCombate.innerHTML =
        nuevoPersonaje.nombre + ' ' + nuevoPersonaje.elemento

    imagenJugador.src = nuevoPersonaje.imagen

    spanVidasJugador.innerHTML = personajeJugador.vidas

    // Ocultamos el formulario y mostramos el mapa
    sectionFormularioPersonaje.style.display = 'none'
    sectionSeleccionarPersonaje.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()

    botonReglas.style.display = 'none'

    seleccionarPersonajeEnemigo()

    pintarCanvas()
}


// ==========================================
// ATAQUES DEL JUGADOR
// Guarda el ataque elegido y genera después
// un ataque aleatorio para el enemigo.
// ==========================================

function ataquePunio(){
    ataqueJugador = 'Puño'
    ataqueAleatorioEnemigo()
}

function ataquePatada(){
    ataqueJugador = 'Patada'
    ataqueAleatorioEnemigo()
}

function ataqueBarrida(){
    ataqueJugador = 'Barrida'
    ataqueAleatorioEnemigo()
}


// ==========================================
// ATAQUE ALEATORIO DEL ENEMIGO
// El enemigo elige entre Puño, Patada y Barrida.
// ==========================================

function ataqueAleatorioEnemigo(){

    let ataqueAleatorio = aleatorio(1, 3)

    if(ataqueAleatorio == 1){

        ataqueEnemigo = 'Puño'

    } else if(ataqueAleatorio == 2){

        ataqueEnemigo = 'Patada'

    } else {

        ataqueEnemigo = 'Barrida'
    }

    combate()
}


// ==========================================
// COMBATE
// Compara ambos ataques, determina el resultado
// y descuenta una vida al personaje correspondiente.
// ==========================================

function combate(){

    if(personajeJugador.vidas <= 0 || personajeEnemigo.vidas <= 0){
        return
    }

    if(ataqueEnemigo == ataqueJugador){

        crearMensaje("🤝 EMPATE")

    } else if(
        ataqueJugador == 'Puño' && ataqueEnemigo == 'Barrida' ||
        ataqueJugador == 'Patada' && ataqueEnemigo == 'Puño' ||
        ataqueJugador == 'Barrida' && ataqueEnemigo == 'Patada'
    ){

        personajeEnemigo.perderVida()

        spanVidasEnemigo.innerHTML = personajeEnemigo.vidas

        crearMensaje("🎉 GANASTE")

    } else {

        personajeJugador.perderVida()

        spanVidasJugador.innerHTML = personajeJugador.vidas

        crearMensaje("💀 PERDISTE")
    }

    revisarVidas()
}


// ==========================================
// REVISAR VIDAS
// Comprueba si alguno de los dos personajes
// llegó a 0 vidas y finaliza la partida.
// ==========================================

function revisarVidas(){

    if(personajeEnemigo.vidas <= 0){

        personajeEnemigo.vidas = 0

        spanVidasEnemigo.innerHTML = personajeEnemigo.vidas

        crearMensajeFinal("🏆 FELICIDADES HAS GANADO!!!")

    } else if(personajeJugador.vidas <= 0){

        personajeJugador.vidas = 0

        spanVidasJugador.innerHTML = personajeJugador.vidas

        crearMensajeFinal("💀 QUE PENA HAS PERDIDO!!!")
    }
}


// ==========================================
// MENSAJES DEL COMBATE
// Genera dinámicamente el mensaje correspondiente
// a victoria, derrota o empate.
// ==========================================

function crearMensaje(resultado){

    let parrafo = document.createElement('p')

    parrafo.innerHTML =
        'Tu personaje atacó con ' +
        ataqueJugador +
        ' y el enemigo atacó con ' +
        ataqueEnemigo +
        ' ' +
        resultado

    parrafo.classList.add('mensaje-combate')

    if(resultado.includes('GANASTE')){

        parrafo.classList.add('mensaje-ganaste')

    } else if(resultado.includes('PERDISTE')){

        parrafo.classList.add('mensaje-perdiste')

    } else {

        parrafo.classList.add('mensaje-empate')
    }

    sectionMensaje.appendChild(parrafo)
}


// ==========================================
// MENSAJE FINAL
// Muestra el resultado definitivo, desactiva los
// ataques y habilita el botón para reiniciar.
// ==========================================

function crearMensajeFinal(resultado){

    let parrafo = document.createElement('p')

    parrafo.innerHTML = resultado

    parrafo.classList.add('mensaje-final')

    sectionMensaje.appendChild(parrafo)

    botonPunio.disabled = true
    botonPatada.disabled = true
    botonBarrida.disabled = true

    sectionReiniciar.style.display = 'block'
}


// ==========================================
// MOSTRAR / OCULTAR REGLAS
// Controla la ventana modal de las reglas.
// ==========================================

function mostrarOcultarReglas(){

    if(
        seccionReglas.style.display == 'none' ||
        seccionReglas.style.display == ''
    ){

        seccionReglas.style.display = 'flex'

    } else {

        seccionReglas.style.display = 'none'
    }
}


// ==========================================
// REINICIAR JUEGO
// Recarga la página para comenzar una nueva partida.
// ==========================================

function reiniciarJuego(){
    location.reload()
}


// ==========================================
// FUNCIÓN ALEATORIA
// Devuelve un número entero aleatorio entre
// el mínimo y máximo indicados.
// ==========================================

function aleatorio(min, max){

    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}


// Inicia el juego cuando se carga el archivo JavaScript
iniciarJuego()