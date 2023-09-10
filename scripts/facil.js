//Creamos el array de frutas y lo "barajamos":

const arrayFrutas = ['🍐','🍊','🍓','🍋','🍍','🍒','🥝','🍉','🍐','🍊','🍓','🍋','🍍','🍒','🥝','🍉'];

const barajar = array => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
};

barajar(arrayFrutas);

//Obtenemos los elementos del DOM:

const carta0 = document.querySelector('.carta-1-1');
const carta1 = document.querySelector('.carta-1-2');
const carta2 = document.querySelector('.carta-1-3');
const carta3 = document.querySelector('.carta-1-4');
const carta4 = document.querySelector('.carta-2-1');
const carta5 = document.querySelector('.carta-2-2');
const carta6 = document.querySelector('.carta-2-3');
const carta7 = document.querySelector('.carta-2-4');
const carta8 = document.querySelector('.carta-3-1');
const carta9 = document.querySelector('.carta-3-2');
const carta10 = document.querySelector('.carta-3-3');
const carta11 = document.querySelector('.carta-3-4');
const carta12 = document.querySelector('.carta-4-1');
const carta13 = document.querySelector('.carta-4-2');
const carta14 = document.querySelector('.carta-4-3');
const carta15 = document.querySelector('.carta-4-4');

const nuevaPartida = document.querySelector('.nueva-partida');
const contadorErrores = document.querySelector('.contador-errores');

//Introducimos todos nuestros elementos tipo carta en un array 'baraja' que usaremos en los bucles al final del código:

const baraja = [carta0, carta1, carta2, carta3, carta4, carta5, carta6, carta7, carta8, carta9, carta10, carta11, carta12, carta13, carta14, carta15];

//Creamos un array auxiliar que nos servirá para almacenar la primera carta que cliquemos y compararla con la segunda. Siempre lo vaciamos para que sólo tenga un elemento. Con el boolean 'esperandoPar' comprobamos qué instrucción es la que toca en función de si hay o no una carta en el array auxiliar a la espera de compararse con el par escogido. El 'arrayAuxiliarFrutas' lo usaremos para almacenar las imágenes para acceder a ellas al final del juego:

const arrayAuxiliar = [];
const arrayAuxiliarFrutas = [];
let errores = 0;
let aciertos = 0;
let esperandoPar = false;

function clicarCarta(e) {
    const cartaClicada = e.target;
    cartaClicada.classList.add('carta-girada');
    cartaClicada.childNodes[0].classList.remove('imagen-oculta');
    cartaClicada.removeEventListener('click', clicarCarta);
    if (esperandoPar) {
        if (cartaClicada.childNodes[0].textContent === arrayAuxiliar[0].childNodes[0].textContent) {
            aciertos++;
            arrayAuxiliar.pop();
            esperandoPar = false;
            if (aciertos === 8) {
                for (let i of arrayAuxiliarFrutas) {
                    i.classList.add('palpitante');
                }
            }
        } else {
            errores++;
            contadorErrores.textContent = `ERRORES: ${errores}`;
            setTimeout(() => {
            cartaClicada.classList.remove('carta-girada');
            cartaClicada.childNodes[0].classList.add('imagen-oculta');
            arrayAuxiliar[0].classList.remove('carta-girada');
            arrayAuxiliar[0].childNodes[0].classList.add('imagen-oculta');
            cartaClicada.addEventListener('click', clicarCarta);
            arrayAuxiliar[0].addEventListener('click', clicarCarta);
            arrayAuxiliar.pop();
            esperandoPar = false;
            }, 250);
        }
    } else {    
        arrayAuxiliar.push(cartaClicada);
        esperandoPar = true;
    }
};

//Declaramos los eventos de escucha:

nuevaPartida.addEventListener('click', () => {window.location.reload()});

setTimeout(() => {
carta0.addEventListener('click',clicarCarta);
carta1.addEventListener('click',clicarCarta);
carta2.addEventListener('click',clicarCarta);
carta3.addEventListener('click',clicarCarta);
carta4.addEventListener('click',clicarCarta);
carta5.addEventListener('click',clicarCarta);
carta6.addEventListener('click',clicarCarta);
carta7.addEventListener('click',clicarCarta);
carta8.addEventListener('click',clicarCarta);
carta9.addEventListener('click',clicarCarta);
carta10.addEventListener('click',clicarCarta);
carta11.addEventListener('click',clicarCarta);
carta12.addEventListener('click',clicarCarta);
carta13.addEventListener('click',clicarCarta);
carta14.addEventListener('click',clicarCarta);
carta15.addEventListener('click',clicarCarta);
}, 11000);

//Por último, implementamos los bucles que iniciarán la partida con el efecto secuencial. Cada elemento carta es un <div> al que le añadimos un <p> que llevará como contenido de texto la imagen de fruta correspondiente del 'arrayFrutas'.

baraja.forEach((carta, index) => {
    const time = setTimeout(() => {
        const imagen = document.createElement('p');
        imagen.textContent = arrayFrutas[index];
        carta.classList.add('carta-girada');
        carta.appendChild(imagen);
        arrayAuxiliarFrutas.push(imagen);
    }, 100 * index);
});

baraja.forEach((carta) => {
    setTimeout(() => {
        carta.classList.remove('carta-girada');
        carta.childNodes[0].classList.add('imagen-oculta');
    }, 10000);
});


