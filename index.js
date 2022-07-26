const palavras = ['teste', 'testezinho', 'testinho'];

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

let palavraEscolhida = 'teste';
let strErros = '';
let letraEntrada = '';
let letrasPreenchidas = '';

for (letra of palavraEscolhida) {
    letrasPreenchidas += '_';
}

function jogar() {
    let letraEntrada = document.getElementById('input_text').value;

    verificarJogada(letraEntrada);
    verificarJogo();

    document.getElementById('input_text').value = '';
}

function verificarJogada(letraEntrada) {
    if (letrasPreenchidas.includes(letraEntrada) || strErros.includes(letraEntrada)) {
        alert('Você já utilizou esta letra!');
    }
    else if (palavraEscolhida.includes(letraEntrada)) {
        preencherAcerto(letraEntrada);
    }
    else {
        preencherErro(letraEntrada);
        desenharForca(letraEntrada);
    }
}

function verificarJogo() {

    if (strErros.length == 6) {
        alert('Game over'); //
    } else if (letrasPreenchidas == palavraEscolhida) {
        alert('Parabéns, você venceu!'); //
    }
}

function preencherAcerto(letraEntrada) {
    let letraAcerto = letraEntrada;

    for (let i = 0; i < letrasPreenchidas.length; i++){
        if (palavraEscolhida.charAt(i) == letraAcerto) {
            letrasPreenchidas = letrasPreenchidas.replaceAt(i, letraAcerto);
        }
    }

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
    window.location.reload; //
}




