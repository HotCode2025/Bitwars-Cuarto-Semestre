// ==========================================
// VARIABLES GENERALES DEL JUEGO
// ==========================================

let contenedorPersonajes
let personajeJugador
let personajeEnemigo
let ataqueJugador
let ataqueEnemigo
let sectionFormularioPersonaje

let inputNombreNuevoPersonaje
let selectElementoNuevoPersonaje
let botonCrearNuevoPersonaje

let sectionSeleccionarAtaque
let sectionSeleccionarPersonaje
let sectionReiniciar
let sectionMensaje
let seccionReglas

let botonPersonajeJugador
let botonPunio
let botonPatada
let botonBarrida
let botonReglas
let botonReiniciar
let botonCerrarReglas

let spanPersonajeJugador
let spanPersonajeEnemigo
let spanVidasJugador
let spanVidasEnemigo

let imagenJugador
let imagenEnemigo

let nombreJugadorCombate
let nombreEnemigoCombate

let sectionModoPersonaje
let botonUsarOriginales
let botonCrearPersonaje


// ==========================================
// CLASE PERSONAJE - PROGRAMACIÓN ORIENTADA A OBJETOS
// Define las características y comportamientos
// que tendrán todos los personajes del juego.
// ==========================================

class Personaje {

    constructor(nombre, elemento, imagen, vidas) {
        this.nombre = nombre
        this.elemento = elemento
        this.imagen = imagen
        this.vidas = vidas
    }

    // Método que permite quitar una vida sin bajar de 0
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

let personajes = [
    new Personaje('Zuko', '🔥', './img/Zuko.png', 3),
    new Personaje('Katara', '💧', './img/Katara.png', 3),
    new Personaje('Aang', '🌪️', './img/Anng.png', 3),
    new Personaje('Toph', '🌱', './img/Toph.png', 3)
]


// ==========================================
// IMÁGENES PARA PERSONAJES PERSONALIZADOS
// Relaciona cada elemento con una imagen.
// ==========================================

let imagenesElementos = {
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

    contenedorPersonajes = document.getElementById('contenedor-personajes')
    crearTarjetasPersonajes()

    sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
    sectionFormularioPersonaje = document.getElementById('formulario-personaje')

    inputNombreNuevoPersonaje = document.getElementById('nombre-nuevo-personaje')
    selectElementoNuevoPersonaje = document.getElementById('elemento-nuevo-personaje')
    botonCrearNuevoPersonaje = document.getElementById('boton-crear-personaje')

    sectionReiniciar = document.getElementById('reiniciar')
    sectionMensaje = document.getElementById('mensajes')
    seccionReglas = document.getElementById('reglas')

    sectionModoPersonaje = document.getElementById('modo-personaje')
    botonUsarOriginales = document.getElementById('usar-originales')
    botonCrearPersonaje = document.getElementById('crear-personaje')

    botonPersonajeJugador = document.getElementById('boton-personaje')
    botonPunio = document.getElementById('boton-punio')
    botonPatada = document.getElementById('boton-patada')
    botonBarrida = document.getElementById('boton-barrida')

    botonReglas = document.getElementById('reglasdejuego')
    botonReiniciar = document.getElementById('boton-reiniciar')
    botonCerrarReglas = document.getElementById('cerrar-reglas')

    spanPersonajeJugador = document.getElementById('personaje-jugador')
    spanPersonajeEnemigo = document.getElementById('personaje-enemigo')

    spanVidasJugador = document.getElementById('vidas-jugador')
    spanVidasEnemigo = document.getElementById('vidas-enemigo')

    imagenJugador = document.getElementById('imagen-jugador')
    imagenEnemigo = document.getElementById('imagen-enemigo')

    nombreJugadorCombate = document.getElementById('nombre-jugador-combate')
    nombreEnemigoCombate = document.getElementById('nombre-enemigo-combate')


    // Ocultamos las secciones que no se necesitan al comenzar
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    seccionReglas.style.display = 'none'
    sectionSeleccionarPersonaje.style.display = 'none'
    sectionFormularioPersonaje.style.display = 'none'


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

    sectionSeleccionarAtaque.style.display = 'flex'
    sectionSeleccionarPersonaje.style.display = 'none'

    botonReglas.style.display = 'none'

    seleccionarPersonajeEnemigo()
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

    sectionFormularioPersonaje.style.display = 'none'
    sectionSeleccionarPersonaje.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'

    botonReglas.style.display = 'none'

    seleccionarPersonajeEnemigo()
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