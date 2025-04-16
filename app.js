// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaNumeroEscolhido = [];
let numeroMaximo = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {ratio:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`);
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Parabéns!! Acertou!!');
        if(tentativas>1){
            exibirTextoNaTela('p', `Você acertou o número secreto com ${tentativas} tentativas.`);
        } else {
            exibirTextoNaTela('p', `Você acertou o número secreto com ${tentativas} tentativa.`);
        }
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        let maiorMenor = numeroSecreto > chute ? 'maior' : 'menor';
        texto = `O número secreto é ${maiorMenor} que ${chute}.`;
        exibirTextoNaTela('p', texto);
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido =  parseInt(Math.random() * numeroMaximo + 1);
    if (listaNumeroEscolhido.length == numeroMaximo){ listaNumeroEscolhido = [];}
    if (listaNumeroEscolhido.includes(numeroEscolhido)){
        return gerarNumeroAleatorio()
    }else{
        listaNumeroEscolhido.push(numeroEscolhido);
        console.log(listaNumeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    document.querySelector('input').value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}