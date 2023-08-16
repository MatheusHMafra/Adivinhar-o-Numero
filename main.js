var numero = Math.floor(Math.random() * 100) + 1;
console.log(numero);
var tentativas = 10;
var vitorias = 0;
var derrotas = 0;
var erros = 0;

const delbutton = document.getElementById("apagar");

const envioPalpite = document.getElementById("butao");
const botaoReiniciar = document.getElementById("reniciar")
const campoPalpite = document.getElementById("palpite");

const campovitoria = document.getElementById("win");
const campoderrota = document.getElementById("loss");
const campotentativa = document.getElementById("tries");
const campoerro = document.getElementById("miss");

const palpites = document.querySelector(".palpites");
const ultimonumero = document.querySelector(".ultimonumero");
const baixoalto = document.querySelector(".baixoalto");

// Update
function update() {
    campovitoria.textContent = vitorias;
    campoderrota.textContent = derrotas;
    campoerro.textContent = erros;
}

function apagardata() {
    localStorage.clear();
    vitorias = 0;
    derrotas = 0;
    erros = 0;
    update();
}

// Load
vitorias = localStorage.getItem("vitorias") || 0;
derrotas = localStorage.getItem("derrotas") || 0;
erros = localStorage.getItem("erros") || 0;
update();

//Apagar data
delbutton.addEventListener("click", apagardata)

//Esperar apertar no botão para conferir palpite
envioPalpite.addEventListener("click", conferirpalpite);

// Main
function conferirpalpite() {
    var palpite = Number(campoPalpite.value);
    if (tentativas == 10) {
        palpites.textContent = "Palpites anteriores: ";
    }
    if (palpite > 0 || palpite < 0) {
        palpites.textContent += palpite + " ";
    }

    if (palpite === numero) {
        ultimonumero.textContent = "Parabéns! Você Acertou!";
        ultimonumero.style.backgroundColor = "green";
        baixoalto.textContent = "";
        vitorias++;
        fimdejogo();
    } else if (tentativas <= 1) {
        ultimonumero.textContent = "Fim de Jogo!";
        ultimonumero.style.backgroundColor = "green";
        baixoalto.textContent = "";
        derrotas++;
        fimdejogo();
    } else {
        if (palpite > 0 || palpite < 0) {
            ultimonumero.textContent = "Errado!";
            ultimonumero.style.backgroundColor = "red";
            erros++;
            //Save aqui
            localStorage.setItem("erros", erros);
            update();
            if (palpite < numero) {
                baixoalto.textContent = "Seu palpite está baixo!";
            } else if (palpite > numero) {
                baixoalto.textContent = "Seu palpite está alto!";
            }
        }
    }

    if (palpite > 0 || palpite < 0) {
        tentativas--;
        campotentativa.textContent = tentativas;
    } else {
        baixoalto.textContent = "Seu palpite não é um número";
    }
    campoPalpite.value = "";
    campoPalpite.focus();
}

function fimdejogo() {
    campoPalpite.disabled = true;
    envioPalpite.disabled = true;
    delbutton.disabled = true;
    botaoReiniciar.disabled = false;
    botaoReiniciar.style.opacity = 1;
    update();
    botaoReiniciar.addEventListener("click", reiniciarJogo);
}

function reiniciarJogo() {
    tentativas = 10;

    var reiniciar = document.querySelectorAll(".resultados p");
    for (var i = 0; i < reiniciar.length; i++) {
        reiniciar[i].textContent = "";
    }

    botaoReiniciar.disabled = true;
    botaoReiniciar.style.opacity = 0;

    delbutton.disabled = false;
    envioPalpite.disabled = false;
    campoPalpite.disabled = false;
    campoPalpite.value = "";
    campoPalpite.focus();

    ultimonumero.style.backgroundColor = "white";

    numero = Math.floor(Math.random() * 100) + 1;

    console.log(numero);

    //Save
    localStorage.setItem("vitorias", vitorias);
    localStorage.setItem("derrotas", derrotas);

    campotentativa.textContent = tentativas;
}