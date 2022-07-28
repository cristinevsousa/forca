String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

let palavraEscolhida = '';
let strErros = '';
let letraEntrada = '';
let letrasPreenchidas = '';

//api de substantivos randômicos em inglês
let url = 'https://random-word-form.herokuapp.com/random/noun';

async function obterPalavra() {
    await fetch(url)
        .then(response => response.json())
        .then(function (data) {
            palavraEscolhida = data[0];
        });

    return palavraEscolhida;
}

(async () => {
    try {
        palavraEscolhida = await obterPalavra();
        mostrarTracejado();
        iniciarPreenchimento();

        console.log(palavraEscolhida);
    } catch (e) {
        console.log(e);
    }
})();

function mostrarTracejado() {
    let tracejado = '';
    for (let i = 0; i < palavraEscolhida.length; i++) {
        tracejado += '_ ';
    }

    document.getElementById('tracejado').innerHTML = tracejado;
}

function iniciarPreenchimento() { 
    for (let i = 0; i < palavraEscolhida.length; i++) {
        letrasPreenchidas = letrasPreenchidas.replaceAt(i, ' ');
    }
}

function jogar() {
    letraEntrada = '';
    letraEntrada = document.getElementById('input_text').value;
    letraEntrada = letraEntrada.toLocaleLowerCase();

    if (letraEntrada == '') {
        alert('Digite uma letra!');
    } else {
        verificarJogada(letraEntrada);
    }

    document.getElementById('input_text').value = '';
}

function verificarJogada(letraEntrada) {
    if (letrasPreenchidas.includes(letraEntrada) || strErros.includes(letraEntrada)) {
        alert('Você já utilizou esta letra!');
    }
    else if (palavraEscolhida.includes(letraEntrada)) {
        preencherAcerto(letraEntrada);
    }
    else if (!palavraEscolhida.includes(letraEntrada)) {
        preencherErro(letraEntrada);
        desenharForca(letraEntrada);
    }
    alertar();
}

function alertar() {
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 300)
    }).then(verificarJogo);
}

function verificarJogo() {

    if (strErros.length == 6) {
        alert('Game over');
        reiniciarJogo();
    } else if (letrasPreenchidas == palavraEscolhida) {
        alert('Parabéns, você venceu!');
        reiniciarJogo();
    }
}

function preencherAcerto(letraEntrada) {
    let letraAcerto = letraEntrada;

    for (let i = 0; i < palavraEscolhida.length; i++) {
        if (palavraEscolhida.charAt(i) == letraAcerto) {
            letrasPreenchidas = letrasPreenchidas.replaceAt(i, letraAcerto);
        }
    }

    console.log(letrasPreenchidas, letrasPreenchidas.length);

    document.getElementById('palavra').innerHTML = letrasPreenchidas.toUpperCase();
}

function preencherErro(letraEntrada) {
    let letraErro = letraEntrada;
    strErros += letraErro;

    document.getElementById('erros_label').innerHTML = strErros.toUpperCase();
}

function desenharForca() {

    switch (strErros.length) {
        case 1:
            document.getElementById('forca').src = 'img/forca1.svg';
            break;
        case 2:
            document.getElementById('forca').src = 'img/forca2.svg';
            break;
        case 3:
            document.getElementById('forca').src = 'img/forca3.svg';
            break;
        case 4:
            document.getElementById('forca').src = 'img/forca4.svg';
            break;
        case 5:
            document.getElementById('forca').src = 'img/forca5.svg';
            break;
        case 6:
            document.getElementById('forca').src = 'img/forca6.svg';
            break;
        default:
            document.getElementById('forca').src = 'img/forca0.svg';
            break;
    }
}

function reiniciarJogo() {
    document.location.reload();
}




