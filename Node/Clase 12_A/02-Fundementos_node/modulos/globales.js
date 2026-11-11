

let i = 0;
let intervalo = setInterval(() => {
    console.log('Hola');
    if (i === 3){
        clearInterval(intervalo); // detenemos la funcion
    }
    i++;
}, 1000);

setImmediate(() => {
    console.log('Saludo Inmediato');
});

//require();

console.log(__filename);

// RESUMEN: Siempre es lo mejor evitar crear variables globales 

global.miVariable = 'mi variable global';
console.log(miVariable);