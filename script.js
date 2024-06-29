let intentos = 6;
let palabra = "";
let diccionario = ["APPLE", "ZORRO", "RITMO", "NIEVE", "TIGRE", "MUNDO", "LECHE", "SILLA", "MANGO", "FELIZ"]; // Palabras para adivinar

// Obtener una palabra aleatoria de la API
fetch("https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase")
.then((response) => {
    return response.json();
})
.then((response) => {
    palabra = response[0];
    // console.log(palabra);
})
.catch((error) => {
    console.log("Error: " + error);
    // Si hay un error, selecciona una palabra aleatoria del diccionario
    palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
    // console.log(palabra);
});

const INPUT = document.getElementById("guess-input");
const BUTTON = document.getElementById("guess-button");
const GRID = document.getElementById("grid");
const INTENTOS = document.getElementById("intentos");
const REINICIAR = document.getElementById("reset-button");

BUTTON.addEventListener("click", intentar);
REINICIAR.addEventListener("click", reiniciar);

function intentar() {
    const INTENTO = leerIntento();
    INPUT.value = "";
    let aux = palabra.slice();  // Crear una variable auxiliar que almacene una copia de la palabra oculta
    if (INTENTO === undefined) {
        return;
    } else {
        if (palabra === INTENTO) {
            const ROW = document.createElement("div");
            ROW.className = "row";
            for (let i in palabra) {
                const SPAN = document.createElement("span");
                SPAN.className = "letter";
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = "#7bd389";
                ROW.appendChild(SPAN);
            }
            GRID.appendChild(ROW);
            terminar("<h1>GANASTE!😎</h1>");
        } else {
            const ROW = document.createElement("div");
            ROW.className = "row";
            for (let i in palabra) {
                const SPAN = document.createElement("span");
                SPAN.className = "letter";
                if (INTENTO[i] === palabra[i]) {
                    // Pintar en verde la letra en la posición correcta
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = "#7bd389";
                    // console.log("Se encontró la letra " + INTENTO[i]);
                    // Eliminar la letra de la copia de la palabra oculta
                    aux = aux.replace(INTENTO[i], "");
                } else if (aux.includes(INTENTO[i])) {
                    // Pintar en amarillo la letra en la posición incorrecta
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = "#f7e157";
                    // console.log("La letra " + INTENTO[i] + " está en la palabra, pero en la posición incorrecta");
                    // Eliminar la letra de la copia de la palabra oculta
                    aux = aux.replace(INTENTO[i], "");
                } else {
                    // Pintar en gris la letra que no está en la palabra
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = "#d3d3d3";
                    // console.log("La letra " + INTENTO[i] + " no está en la palabra");
                }
                ROW.appendChild(SPAN);
            }
            GRID.appendChild(ROW);

            intentos--;
            console.log("¡Fallaste! Te quedan " + intentos + " intentos.");
            INTENTOS.innerHTML = "Intentos restantes: " + intentos;
            if (intentos === 0) {
                terminar("<h1>PERDISTE!😖</h1><p>La palabra correcta era: </p>" + palabra);
            }
        }
    }
}

function leerIntento() {
    const VALOR = INPUT.value;

    if (VALOR === "" || VALOR === null || VALOR === undefined || VALOR.length !== 5 || !isNaN(VALOR)) {
        alert("Debes ingresar una palabra con 5 letras!");
        return;
    } else {
        return VALOR.toUpperCase();
    }
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BUTTON.disabled = true;
    BUTTON.style.backgroundColor = "#d3d3d3";
    BUTTON.style.cursor = "not-allowed";
    document.getElementById("msj").style.display = "block";
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje;
    document.getElementById("reset-button").style.display = "block";
    document.getElementById("contenido").classList.add('blur') // Agrega la clase 'blur' al cuerpo del documento
}

function reiniciar() {
    location.reload();
}