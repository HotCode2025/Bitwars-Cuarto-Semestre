var theCount;
var alarm = document.getElementById("alarm");
var alarm2 = document.getElementById("alarm2");
var panel = document.getElementById("panel");
var turnOff = document.getElementById("turn-off");
var turnOffHor = document.getElementById("closing");
var detonate = document.getElementById("detonate");
var abort = document.getElementById("abort");
var reload = document.getElementById("restart");
alarm.volume = 0.50;

var time = document.getElementById("time");
function showCountDown() {
    time.innerText = time.innerText - 1;
    if (time.innerText == 0) {
        clearInterval(theCount);
        time.classList.add("crono");
        abort.classList.add("hide");
        detonate.classList.add("show");
        setTimeout(function () {
            turnOff.classList.add("close");
            turnOffHor.classList.add("close");
            reload.classList.add("show");
            alarm.pause();
            alarm2.play();
        }, 1500);
    }
}

var cover = document.getElementById("cover");
var rebotes = [];

// reinicia la animacion aunque la anterior siga corriendo
function golpear(tipo) {
    document.body.classList.remove("golpe", "toque");
    void document.body.offsetWidth;
    document.body.classList.add(tipo);
}

function abrirTapa() {
    rebotes.forEach(clearTimeout);
    cover.classList.remove("cayendo");
    cover.classList.add("opened");
}

// 451 y 667 ms son los impactos que da la simulacion de la curva --caer
function cerrarTapa() {
    cover.classList.remove("opened");
    cover.classList.add("cayendo");
    rebotes = [
        setTimeout(function () { golpear("golpe"); }, 451),
        setTimeout(function () { golpear("toque"); }, 667),
        setTimeout(function () { cover.classList.remove("cayendo"); }, 740),
    ];
}

cover.addEventListener("click", function () {
    if (this.classList.contains("opened")) cerrarTapa();
    else abrirTapa();
});

var btn = document.getElementById("activate");
btn.addEventListener("pointerdown", function () {
    golpear("toque");
});
btn.addEventListener("click", function () {
    this.classList.add("pushed");
    setTimeout(function () {
        panel.classList.add("show");
        theCount = setInterval(showCountDown, 1000);
        alarm.load();
        alarm.play();
    }, 500);
});

// Parte 2
abort.addEventListener("click", function () {
    btn.classList.remove("pushed");
    panel.classList.remove("show");
    clearInterval(theCount);
    time.innerText = 9;
    alarm.pause();
    alarm.load();
});

reload.addEventListener("click", function () {
    panel.classList.remove("show");
    turnOff.classList.remove("close");
    turnOffHor.classList.remove("close");
    abort.classList.remove("hide");
    detonate.classList.remove("show");
    btn.classList.remove("pushed");
    this.classList.remove("show");
    time.innerText = 9;
    time.classList.remove("crono");
    setTimeout(cerrarTapa, 100);
});

var mute = document.getElementById("mute");
mute.addEventListener("click", function () {
    if (this.className == "muted") {
        alarm.muted = false;
        alarm2.muted = false;
        this.classList.remove("muted");
    } else {
        alarm.muted = true;
        alarm2.muted = true;
        this.classList.add("muted");
    }
});
