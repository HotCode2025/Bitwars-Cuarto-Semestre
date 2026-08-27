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
let botonCerrarReglas

let inputZuko
let inputKatara
let inputAang
let inputToph

let spanPersonajeJugador
let spanPersonajeEnemigo
let spanVidasJugador
let spanVidasEnemigo

let imagenJugador
let imagenEnemigo

let nombreJugadorCombate
let nombreEnemigoCombate


function iniciarJuego(){

    sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
    sectionReiniciar = document.getElementById('reiniciar')
    sectionMensaje = document.getElementById('mensajes')
    seccionReglas = document.getElementById('reglas')

    botonPersonajeJugador = document.getElementById('boton-personaje')
    botonPunio = document.getElementById('boton-punio')
    botonPatada = document.getElementById('boton-patada')
    botonBarrida = document.getElementById('boton-barrida')
    botonReglas = document.getElementById('reglasdejuego')
    botonReiniciar = document.getElementById('boton-reiniciar')
    botonCerrarReglas = document.getElementById('cerrar-reglas')

    inputZuko = document.getElementById('zuko')
    inputKatara = document.getElementById('katara')
    inputAang = document.getElementById('aang')
    inputToph = document.getElementById('toph')

    spanPersonajeJugador = document.getElementById('personaje-jugador')
    spanPersonajeEnemigo = document.getElementById('personaje-enemigo')
    spanVidasJugador = document.getElementById('vidas-jugador')
    spanVidasEnemigo = document.getElementById('vidas-enemigo')

    imagenJugador = document.getElementById('imagen-jugador')
    imagenEnemigo = document.getElementById('imagen-enemigo')

    nombreJugadorCombate = document.getElementById('nombre-jugador-combate')
    nombreEnemigoCombate = document.getElementById('nombre-enemigo-combate')

    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    seccionReglas.style.display = 'none'

    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)

    botonPunio.addEventListener('click', ataquePunio)
    botonPatada.addEventListener('click', ataquePatada)
    botonBarrida.addEventListener('click', ataqueBarrida)

    botonReglas.addEventListener('click', mostrarOcultarReglas)
    botonCerrarReglas.addEventListener('click', mostrarOcultarReglas)

    botonReiniciar.addEventListener('click', reiniciarJuego)
}


function seleccionarPersonajeJugador(){

    if(inputZuko.checked){
        spanPersonajeJugador.innerHTML = 'Zuko'
        nombreJugadorCombate.innerHTML = 'Zuko 🔥'
        imagenJugador.src = './img/Zuko.png'

    } else if(inputKatara.checked){
        spanPersonajeJugador.innerHTML = 'Katara'
        nombreJugadorCombate.innerHTML = 'Katara 💧'
        imagenJugador.src = './img/Katara.png'

    } else if(inputAang.checked){
        spanPersonajeJugador.innerHTML = 'Aang'
        nombreJugadorCombate.innerHTML = 'Aang 🌪️'
        imagenJugador.src = './img/Anng.png'

    } else if(inputToph.checked){
        spanPersonajeJugador.innerHTML = 'Toph'
        nombreJugadorCombate.innerHTML = 'Toph 🌱'
        imagenJugador.src = './img/Toph.png'

    } else {
        alert('Selecciona a un personaje')
        return
    }

    sectionSeleccionarAtaque.style.display = 'flex'
    sectionSeleccionarPersonaje.style.display = 'none'
    botonReglas.style.display = 'none'
    seleccionarPersonajeEnemigo()
}


function seleccionarPersonajeEnemigo(){

    let personajeAleatorio = aleatorio(1, 4)

    if(personajeAleatorio == 1){
        spanPersonajeEnemigo.innerHTML = 'Zuko'
        nombreEnemigoCombate.innerHTML = 'Zuko 🔥'
        imagenEnemigo.src = './img/Zuko.png'

    } else if(personajeAleatorio == 2){
        spanPersonajeEnemigo.innerHTML = 'Katara'
        nombreEnemigoCombate.innerHTML = 'Katara 💧'
        imagenEnemigo.src = './img/Katara.png'

    } else if(personajeAleatorio == 3){
        spanPersonajeEnemigo.innerHTML = 'Aang'
        nombreEnemigoCombate.innerHTML = 'Aang 🌪️'
        imagenEnemigo.src = './img/Anng.png'

    } else {
        spanPersonajeEnemigo.innerHTML = 'Toph'
        nombreEnemigoCombate.innerHTML = 'Toph 🌱'
        imagenEnemigo.src = './img/Toph.png'
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


function combate(){

    if(vidasJugador <= 0 || vidasEnemigo <= 0){
        return
    }

    if(ataqueEnemigo == ataqueJugador){
        crearMensaje("🤝 EMPATE")

    } else if(
        ataqueJugador == 'Puño' && ataqueEnemigo == 'Barrida' ||
        ataqueJugador == 'Patada' && ataqueEnemigo == 'Puño' ||
        ataqueJugador == 'Barrida' && ataqueEnemigo == 'Patada'
    ){
        vidasEnemigo--
        if(vidasEnemigo < 0){
            vidasEnemigo = 0
        }
        spanVidasEnemigo.innerHTML = vidasEnemigo
        crearMensaje("🎉 GANASTE")

    } else {
        vidasJugador--
        if(vidasJugador < 0){
            vidasJugador = 0
        }
        spanVidasJugador.innerHTML = vidasJugador
        crearMensaje("💀 PERDISTE")
    }
    revisarVidas()
}


function revisarVidas(){

    if(vidasEnemigo <= 0){
        vidasEnemigo = 0
        spanVidasEnemigo.innerHTML = vidasEnemigo
        crearMensajeFinal("🏆 FELICIDADES HAS GANADO!!!")
    } else if(vidasJugador <= 0){
        vidasJugador = 0
        spanVidasJugador.innerHTML = vidasJugador
        crearMensajeFinal("💀 QUE PENA HAS PERDIDO!!!")
    }
}


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


function reiniciarJuego(){
    location.reload()
}


function aleatorio(min, max){
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

iniciarJuego()