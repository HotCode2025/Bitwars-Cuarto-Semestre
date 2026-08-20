let ataqueJugador
let ataqueEnemigo

let vidasJugador = 3
let vidasEnemigo = 3

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

let inputZuko
let inputKatara
let inputAang
let inputToph

let spanPersonajeJugador
let spanPersonajeEnemigo
let spanVidasJugador
let spanVidasEnemigo


function iniciarJuego(){

    sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
    sectionReiniciar = document.getElementById('boton-reiniciar')
    sectionMensaje = document.getElementById('mensajes')
    seccionReglas = document.getElementById('reglas')

    botonPersonajeJugador = document.getElementById('boton-personaje')
    botonPunio = document.getElementById('boton-punio')
    botonPatada = document.getElementById('boton-patada')
    botonBarrida = document.getElementById('boton-barrida')
    botonReglas = document.getElementById('reglasdejuego')
    botonReiniciar = document.getElementById('boton-reiniciar')

    inputZuko = document.getElementById('zuko')
    inputKatara = document.getElementById('katara')
    inputAang = document.getElementById('aang')
    inputToph = document.getElementById('toph')

    spanPersonajeJugador = document.getElementById('personaje-jugador')
    spanPersonajeEnemigo = document.getElementById('personaje-enemigo')
    spanVidasJugador = document.getElementById('vidas-jugador')
    spanVidasEnemigo = document.getElementById('vidas-enemigo')

    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)
    botonPunio.addEventListener('click', ataquePunio)
    botonPatada.addEventListener('click', ataquePatada)
    botonBarrida.addEventListener('click', ataqueBarrida)
    botonReglas.addEventListener('click', mostrarOcultarReglas)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}


function seleccionarPersonajeJugador(){

    if(inputZuko.checked){
        spanPersonajeJugador.innerHTML = 'Zuko'
    } else if(inputKatara.checked){
        spanPersonajeJugador.innerHTML = 'Katara'
    } else if(inputAang.checked){
        spanPersonajeJugador.innerHTML = 'Aang'
    } else if(inputToph.checked){
        spanPersonajeJugador.innerHTML = 'Toph'
    } else {
        alert('Selecciona a un personaje')
        return
    }

    sectionSeleccionarAtaque.style.display = 'block'
    sectionSeleccionarPersonaje.style.display = 'none'

    seleccionarPersonajeEnemigo()
}


function seleccionarPersonajeEnemigo(){

    let personajeAleatorio = aleatorio(1,4)

    if(personajeAleatorio == 1){
        spanPersonajeEnemigo.innerHTML = 'Zuko'
    } else if(personajeAleatorio == 2){
        spanPersonajeEnemigo.innerHTML = 'Katara'
    } else if(personajeAleatorio == 3){
        spanPersonajeEnemigo.innerHTML = 'Aang'
    } else {
        spanPersonajeEnemigo.innerHTML = 'Toph'
    }
}


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


function ataqueAleatorioEnemigo(){

    let ataqueAleatorio = aleatorio(1,3)

    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'Puño'
    } else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'Patada'
    } else {
        ataqueEnemigo = 'Barrida'
    }

    combate()
}


function combate(){

    if(ataqueEnemigo == ataqueJugador){

        crearMensaje("🤝 EMPATE")

    } else if(
        ataqueJugador == 'Puño' && ataqueEnemigo == 'Barrida' ||
        ataqueJugador == 'Patada' && ataqueEnemigo == 'Puño' ||
        ataqueJugador == 'Barrida' && ataqueEnemigo == 'Patada'
    ){

        crearMensaje("🎉 GANASTE")

        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo

    } else {

        crearMensaje("💀 PERDISTE")

        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}


function revisarVidas(){

    if(vidasEnemigo == 0){

        crearMensajeFinal("FELICIDADES HAS GANADO!!!")

    } else if(vidasJugador == 0){

        crearMensajeFinal("QUE PENA HAS PERDIDO!!!")
    }
}


function crearMensajeFinal(resultado){

    sectionReiniciar.style.display = 'block'

    let parrafo = document.createElement('p')

    parrafo.innerHTML = resultado

    sectionMensaje.appendChild(parrafo)

    botonPunio.disabled = true
    botonPatada.disabled = true
    botonBarrida.disabled = true
}


function crearMensaje(resultado){

    let parrafo = document.createElement('p')

    parrafo.innerHTML =
        'Tu personaje atacó con ' +
        ataqueJugador +
        ' el personaje enemigo atacó con ' +
        ataqueEnemigo +
        ' ' +
        resultado

    sectionMensaje.appendChild(parrafo)
}


function mostrarOcultarReglas(){

    if(
        seccionReglas.style.display == 'none' ||
        seccionReglas.style.display == ''
    ){

        seccionReglas.style.display = 'block'
        botonReglas.innerHTML = '📕 Ocultar reglas'

    } else {

        seccionReglas.style.display = 'none'
        botonReglas.innerHTML = '📖 Ver reglas'
    }
}


function reiniciarJuego(){
    location.reload()
}


function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}


iniciarJuego()