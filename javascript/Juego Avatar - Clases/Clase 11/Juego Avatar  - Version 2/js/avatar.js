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
let enCombate = false
let animacionColision = null
const panelExploracion = document.getElementById('panel-exploracion')
const avisoArena = document.getElementById('aviso-arena')
const efectoColision = document.getElementById('efecto-colision')
const cartelResultado = document.getElementById('cartel-resultado')
const tituloResultado = document.getElementById('titulo-resultado')
const detalleResultado = document.getElementById('detalle-resultado')
const iconoResultado = document.getElementById('icono-resultado')
const historialCombate = document.getElementById('historial-combate')

// Mejoras visuales y de sonido 
const botonSonido = document.getElementById('alternar-sonido')
const botonSonidoMenu = document.getElementById('sonido-en-menu')
const musicaFondo = document.getElementById('musica-fondo')
musicaFondo.volume = 0.22
let sonidoActivo = false
let contextoAudio = null
const tarjetaJugador = document.getElementById('tarjeta-jugador')
const tarjetaEnemigo = document.getElementById('tarjeta-enemigo')
const efectoJugador = document.getElementById('efecto-jugador')
const efectoEnemigo = document.getElementById('efecto-enemigo')


// Imagen de fondo del mapa 
const mapaBackground = new Image()
mapaBackground.src = './assets/mapa_senderos.png'

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

    constructor(nombre, elemento, imagen, vidas, x = 20, y = 30) {

        this.nombre = nombre
        this.elemento = elemento
        this.imagen = imagen
        this.vidas = vidas

        // Posición y tamaño dentro del Canvas
        this.x = x
        this.y = y
        this.ancho = 44
        this.alto = 52

        // Velocidad de movimiento
        this.velocidadX = 0
        this.velocidadY = 0

        // Imagen del personaje en el mapa
        this.mapaFoto = new Image()
        // En el mapa usamos sprites transparentes; las tarjetas conservan su ilustración original.
        const spritesMapa = {
            Zuko: './assets/sprites/Zuko.png',
            Katara: './assets/sprites/Katara.png',
            Aang: './assets/sprites/Anng.png',
            Toph: './assets/sprites/Toph.png'
        }
        this.mapaFoto.src = spritesMapa[nombre] || imagen
        this.ataques = []
    }

    
    pintarAvatares() {
    lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
    )
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

// Enemigos distribuidos por el mapa
    const zukoEnemigo = new Personaje('Zuko', '🔥', './img/Zuko.png', 3, 120, 130)

    const kataraEnemigo = new Personaje('Katara', '💧', './img/Katara.png', 3, 450, 120)

    const aangEnemigo = new Personaje('Aang', '🌪️', './img/Anng.png', 3, 180, 350)

    const tophEnemigo = new Personaje('Toph', '🌱', './img/Toph.png', 3, 480, 350)

    // Ataques de Zuko
zukoEnemigo.ataques.push(
    'Puño',
    'Puño',
    'Puño',
    'Patada',
    'Barrida'
)

// Ataques de Katara
kataraEnemigo.ataques.push(
    'Barrida',
    'Barrida',
    'Barrida',
    'Patada',
    'Puño'
)

// Ataques de Aang
aangEnemigo.ataques.push(
    'Patada',
    'Patada',
    'Patada',
    'Puño',
    'Barrida'
)

// Ataques de Toph
tophEnemigo.ataques.push(
    'Puño',
    'Puño',
    'Puño',
    'Patada',
    'Barrida'
)

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
    cartelResultado.style.display = 'none'
    historialCombate.style.display = 'none'
    seccionReglas.style.display = 'none'
    sectionSeleccionarPersonaje.style.display = 'none'
    sectionFormularioPersonaje.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    panelExploracion.style.display = 'block'


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
    botonSonido.addEventListener('click', alternarSonido)
    botonSonidoMenu.addEventListener('click', alternarSonido)

    // Controles táctiles y de mouse: Pointer Events evitan que queden presionados
    const movimientos = {
        arriba: moverArriba,
        abajo: moverAbajo,
        izquierda: moverIzquierda,
        derecha: moverDerecha
    }
    document.querySelectorAll('[data-movimiento]').forEach(boton => {
        boton.addEventListener('pointerdown', event => {
            event.preventDefault()
            if (!enCombate) movimientos[boton.dataset.movimiento]()
            boton.setPointerCapture(event.pointerId)
        })
        boton.addEventListener('pointerup', detenerMovimiento)
        boton.addEventListener('pointercancel', detenerMovimiento)
        boton.addEventListener('lostpointercapture', detenerMovimiento)
    })
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
    actualizarVidaVisual()

    // Ocultamos la selección y mostramos el mapa
    sectionSeleccionarAtaque.style.display = 'none'
    sectionSeleccionarPersonaje.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
    prepararExploracion()
    iniciarMapa()

    botonReglas.style.display = 'none'


    // Dibujamos la imagen del personaje seleccionado en el mapa
   pintarCanvas()
}


// ==========================================
// SELECCIONAR PERSONAJE ENEMIGO
// Selecciona aleatoriamente un personaje del arreglo.
// ==========================================

function seleccionarPersonajeEnemigo(enemigo) {

    personajeEnemigo = enemigo

    spanPersonajeEnemigo.innerHTML = personajeEnemigo.nombre

    nombreEnemigoCombate.innerHTML =
        personajeEnemigo.nombre + ' ' + personajeEnemigo.elemento

    imagenEnemigo.src = personajeEnemigo.imagen

    spanVidasEnemigo.innerHTML = personajeEnemigo.vidas
    actualizarVidaVisual()
}

// Actualizo y dibuja el mapa y el personaje
function pintarCanvas(){

    // Actualizamos la posición del personaje
    personajeJugador.x = Math.max(0, Math.min(mapa.width - personajeJugador.ancho, personajeJugador.x + personajeJugador.velocidadX))
    personajeJugador.y = Math.max(0, Math.min(mapa.height - personajeJugador.alto, personajeJugador.y + personajeJugador.velocidadY))

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

    personajeJugador.pintarAvatares()

    // Dibujamos los cuatro enemigos en el mapa
    zukoEnemigo.pintarAvatares()
    kataraEnemigo.pintarAvatares()
    aangEnemigo.pintarAvatares()
    tophEnemigo.pintarAvatares()


    // Revisamos las colisiones cuando el jugador se mueve
    if (!enCombate && (personajeJugador.velocidadX !== 0 || personajeJugador.velocidadY !== 0)) {
        revisarColision(zukoEnemigo)
        revisarColision(kataraEnemigo)
        revisarColision(aangEnemigo)
        revisarColision(tophEnemigo)
    }

}



// Movimiento hacia la derecha
function moverDerecha(){
    if (!enCombate && personajeJugador) personajeJugador.velocidadX = 5
}

// Movimiento hacia la izquierda
function moverIzquierda(){
    if (!enCombate && personajeJugador) personajeJugador.velocidadX = -5
}

// Movimiento hacia abajo
function moverAbajo(){
    if (!enCombate && personajeJugador) personajeJugador.velocidadY = 5
}

// Movimiento hacia arriba
function moverArriba(){
    if (!enCombate && personajeJugador) personajeJugador.velocidadY = -5
}

// Detiene el movimiento del personaje
function detenerMovimiento(){
    if (!personajeJugador) return
    personajeJugador.velocidadX = 0
    personajeJugador.velocidadY = 0
}

// Detecta las flechas presionadas en el teclado
function sePresionoUnaTecla(event){
    if (enCombate || !personajeJugador) return

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
    mapa.width = 640
    mapa.height = 480

    // Actualiza el Canvas cada 50 milisegundos
    clearInterval(intervalo)
    intervalo = setInterval(pintarCanvas, 50)

    // Controles del teclado
    window.removeEventListener('keydown', sePresionoUnaTecla)
    window.removeEventListener('keyup', detenerMovimiento)
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
    prepararExploracion()
    iniciarMapa()

    botonReglas.style.display = 'none'

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

function ataqueAleatorioEnemigo() {

    const indiceAleatorio = aleatorio(0, personajeEnemigo.ataques.length - 1)

    ataqueEnemigo = personajeEnemigo.ataques[indiceAleatorio]

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

    actualizarVidaVisual()
    animarAtaqueElemental()
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

    const mensajeInicial = sectionMensaje.querySelector('.mensaje-inicial')
    if (mensajeInicial) mensajeInicial.remove()

    const parrafo = document.createElement('p')
    parrafo.textContent = 'Tu personaje atacó con ' + ataqueJugador +
        ' y el enemigo atacó con ' + ataqueEnemigo + '. ' + resultado
    parrafo.classList.add('mensaje-combate')

    if(resultado.includes('GANASTE')){
        parrafo.classList.add('mensaje-ganaste')
    } else if(resultado.includes('PERDISTE')){
        parrafo.classList.add('mensaje-perdiste')
    } else {
        parrafo.classList.add('mensaje-empate')
    }

    sectionMensaje.prepend(parrafo)
    historialCombate.style.display = 'block'
}

// ==========================================
// MENSAJE FINAL

// Muestra el resultado definitivo, desactiva los
// ataques y habilita el botón para reiniciar.
// ==========================================

function crearMensajeFinal(resultado){

    const victoria = personajeEnemigo.vidas <= 0
    const titulo = victoria ? '¡GANASTE!' : '¡PERDISTE!'
    tituloResultado.textContent = titulo
    iconoResultado.textContent = victoria ? '🏆' : '💔'
    detalleResultado.textContent = victoria
        ? '¡Derrotaste a ' + personajeEnemigo.nombre + '! ¿Querés volver a jugar?'
        : personajeEnemigo.nombre + ' ganó este combate. ¡Podés intentarlo otra vez!'
    cartelResultado.classList.toggle('resultado-victoria', victoria)
    cartelResultado.classList.toggle('resultado-derrota', !victoria)

    const parrafo = document.createElement('p')
    parrafo.textContent = resultado
    parrafo.classList.add('mensaje-final')
    sectionMensaje.prepend(parrafo)

    botonPunio.disabled = true
    botonPatada.disabled = true
    botonBarrida.disabled = true

    sectionReiniciar.style.display = 'block'
    cartelResultado.style.display = 'flex'
    reproducirEfecto(personajeEnemigo.vidas <= 0 ? 'victoria' : 'derrota')
    botonReiniciar.focus()
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

// Detectar colisiones entre el jugador y los enemigos
function revisarColision(enemigo) {

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaPersonaje = personajeJugador.y
    const abajoPersonaje = personajeJugador.y + personajeJugador.alto
    const derechaPersonaje = personajeJugador.x + personajeJugador.ancho
    const izquierdaPersonaje = personajeJugador.x

    if (
        abajoPersonaje < arribaEnemigo ||
        arribaPersonaje > abajoEnemigo ||
        derechaPersonaje < izquierdaEnemigo ||
        izquierdaPersonaje > derechaEnemigo
    ) {
        return
    }

    if (enCombate) return
    enCombate = true
    detenerMovimiento()
    seleccionarPersonajeEnemigo(enemigo)
    panelExploracion.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    historialCombate.style.display = 'block'
    avisoArena.textContent = '⚔️ ¡Combate contra ' + enemigo.nombre + '!'
    document.getElementById('controles-mapa').classList.add('controles-desactivados')
    efectoExplosion(enemigo)
}

// El mapa permanece en pantalla durante el combate
function prepararExploracion() {
    enCombate = false
    panelExploracion.style.display = 'block'
    sectionSeleccionarAtaque.style.display = 'none'
    avisoArena.textContent = 'Usá las flechas o los controles para moverte'
    document.getElementById('controles-mapa').classList.remove('controles-desactivados')
}

// Destello y partículas al tocar a un enemigo
function efectoExplosion(enemigo) {
    efectoColision.innerHTML = ''
    const centroX = (enemigo.x + enemigo.ancho / 2) / mapa.width * 100
    const centroY = (enemigo.y + enemigo.alto / 2) / mapa.height * 100
    efectoColision.style.setProperty('--choque-x', centroX + '%')
    efectoColision.style.setProperty('--choque-y', centroY + '%')
    efectoColision.classList.remove('explotando')
    void efectoColision.offsetWidth
    efectoColision.classList.add('explotando')
    for (let i = 0; i < 16; i++) {
        const particula = document.createElement('i')
        const angulo = (i / 16) * Math.PI * 2
        const distancia = 65 + (i % 4) * 13
        particula.style.setProperty('--dx', Math.cos(angulo) * distancia + 'px')
        particula.style.setProperty('--dy', Math.sin(angulo) * distancia + 'px')
        particula.style.left = centroX + '%'
        particula.style.top = centroY + '%'
        efectoColision.appendChild(particula)
    }
    clearTimeout(animacionColision)
    animacionColision = setTimeout(() => {
        efectoColision.classList.remove('explotando')
        efectoColision.innerHTML = ''
    }, 900)
}

// Inicia el juego cuando se carga el archivo JavaScript
// ==========================================
// PRESENTACIÓN: VIDAS, ANIMACIONES Y AUDIO
// ==========================================
function actualizarVidaVisual() {
    const actualizar = (personaje, rellenoId, corazonesId, barraId) => {
        if (!personaje) return
        const maximo = 3
        const actual = Math.max(0, Math.min(maximo, personaje.vidas))
        const relleno = document.getElementById(rellenoId)
        const corazones = document.getElementById(corazonesId)
        const barra = document.getElementById(barraId)
        relleno.style.width = (actual / maximo * 100) + '%'
        relleno.classList.toggle('vida-baja', actual <= 1)
        corazones.textContent = '❤️'.repeat(actual) + '🖤'.repeat(maximo - actual)
        corazones.setAttribute('aria-label', actual + ' de ' + maximo + ' vidas')
        barra.setAttribute('aria-valuenow', String(actual))
    }
    actualizar(personajeJugador, 'vida-jugador-relleno', 'corazones-jugador', 'barra-jugador')
    actualizar(personajeEnemigo, 'vida-enemigo-relleno', 'corazones-enemigo', 'barra-enemigo')
}

function animarAtaqueElemental() {
    const iconos = {'🔥':'🔥', '💧':'💦', '🌪️':'💨', '🌱':'🪨'}
    const icono = iconos[personajeJugador.elemento] || '✨'
    const empate = ataqueJugador === ataqueEnemigo
    const jugadorGanoRonda = !empate && (
        (ataqueJugador === 'Puño' && ataqueEnemigo === 'Barrida') ||
        (ataqueJugador === 'Patada' && ataqueEnemigo === 'Puño') ||
        (ataqueJugador === 'Barrida' && ataqueEnemigo === 'Patada')
    )
    const destino = empate ? null : jugadorGanoRonda ? efectoEnemigo : efectoJugador
    if (destino) {
        destino.textContent = jugadorGanoRonda ? icono : (iconos[personajeEnemigo.elemento] || '💥')
        destino.classList.remove('efecto-activo')
        void destino.offsetWidth
        destino.classList.add('efecto-activo')
        const tarjeta = jugadorGanoRonda ? tarjetaEnemigo : tarjetaJugador
        tarjeta.classList.remove('recibio-golpe')
        void tarjeta.offsetWidth
        tarjeta.classList.add('recibio-golpe')
        setTimeout(() => { destino.classList.remove('efecto-activo'); tarjeta.classList.remove('recibio-golpe') }, 650)
    } else {
        reproducirEfecto('empate')
    }
    if (!empate) reproducirEfecto('golpe')
}

function alternarSonido() {
    sonidoActivo = !sonidoActivo
    botonSonido.textContent = sonidoActivo ? '🔊 Sonido: activado' : '🔇 Sonido: apagado'
    botonSonido.setAttribute('aria-pressed', String(sonidoActivo))
    botonSonidoMenu.textContent = sonidoActivo ? '🔊 Silenciar música y sonidos' : '🔇 Activar música y sonidos'
    botonSonidoMenu.setAttribute('aria-pressed', String(sonidoActivo))
    if (sonidoActivo) {
        // El clic del usuario habilita la reproducción en navegadores modernos.
        musicaFondo.play().catch(error => console.warn('No se pudo iniciar la música:', error))
        reproducirEfecto('activar')
    } else {
        musicaFondo.pause()
        musicaFondo.currentTime = 0
    }
}

// Sonidos sintetizados en el navegador, sin descargas ni archivos externos.
function reproducirEfecto(tipo) {
    if (!sonidoActivo) return
    try {
        const AudioContextDisponible = window.AudioContext || window.webkitAudioContext
        if (!AudioContextDisponible) return
        if (!contextoAudio) contextoAudio = new AudioContextDisponible()
        if (contextoAudio.state === 'suspended') contextoAudio.resume()
        const tonos = {
            activar: [520, 660], golpe: [230, 115], empate: [330, 330],
            victoria: [440, 550, 660, 880], derrota: [350, 280, 210]
        }[tipo] || [440]
        tonos.forEach((frecuencia, indice) => {
            const inicio = contextoAudio.currentTime + indice * .12
            const oscilador = contextoAudio.createOscillator()
            const volumen = contextoAudio.createGain()
            oscilador.type = tipo === 'golpe' ? 'triangle' : 'sine'
            oscilador.frequency.setValueAtTime(frecuencia, inicio)
            volumen.gain.setValueAtTime(.0001, inicio)
            volumen.gain.exponentialRampToValueAtTime(.065, inicio + .012)
            volumen.gain.exponentialRampToValueAtTime(.0001, inicio + .15)
            oscilador.connect(volumen)
            volumen.connect(contextoAudio.destination)
            oscilador.start(inicio)
            oscilador.stop(inicio + .17)
        })
    } catch (error) {
        console.warn('No se pudo reproducir el efecto de sonido:', error)
    }
}

iniciarJuego()
