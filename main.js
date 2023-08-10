var numero = Math.floor(Math.random() * 100) + 1;
var tentativas = 10;
var contagem = 1;

const envioPalpite = document.getElementById("butao");
const botaoReiniciar = document.getElementById("reniciar")
const campoPalpite = document.getElementById("palpite");

const palpites = document.querySelector(".palpites");
const ultimonumero = document.querySelector(".ultimonumero");
const baixoalto = document.querySelector(".baixoalto");

envioPalpite.addEventListener("click", conferirpalpite);

console.log(numero);

function conferirpalpite() {
    var palpite = Number(campoPalpite.value);
    if (contagem == 1) {
        palpites.textContent = "Palpites anteriores: ";
    }
    if (palpite > 0 || palpite < 0) {
        palpites.textContent += palpite + " ";
    }

    if (palpite === numero) {
        ultimonumero.textContent = "Parabéns! Você Acertou!";
        ultimonumero.style.backgroundColor = "green";
        baixoalto.textContent = "";
        fimdejogo();
    } else if (contagem === 11) {
        ultimonumero.textContent = "Fim de Jogo!";
        ultimonumero.style.backgroundColor = "green";
        baixoalto.textContent = "";
        fimdejogo();
    } else {
        ultimonumero.textContent = "Errado!";
        ultimonumero.style.backgroundColor = "red";
        if (palpite < numero) {
            baixoalto.textContent = "Seu palpite está baixo!";
        } else if (palpite > numero) {
            baixoalto.textContent = "Seu palpite está alto!";
        }
    }

    if (palpite > 0 || palpite < 0) {
        contagem++;
    } else {
        baixoalto.textContent = "Seu palpite não é um número";
    }
    campoPalpite.value = "";
    campoPalpite.focus();
}

function fimdejogo() {
    campoPalpite.disabled = true;
    envioPalpite.disabled = true;
    botaoReiniciar.disabled = false;
    botaoReiniciar.style.opacity = 1;
    botaoReiniciar.addEventListener("click", reiniciarJogo);
}

function reiniciarJogo() {
    contagem = 1;

    var reiniciar = document.querySelectorAll(".resultados p");
    for (var i = 0; i < reiniciar.length; i++) {
        reiniciar[i].textContent = "";
    }

    botaoReiniciar.disabled = true;
    botaoReiniciar.style.opacity = 0;

    campoPalpite.disabled = false;
    envioPalpite.disabled = false;
    campoPalpite.value = "";
    campoPalpite.focus();

    ultimonumero.style.backgroundColor = "white";

    numero = Math.floor(Math.random() * 100) + 1;
}