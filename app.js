// let titulo = document.querySelector("h1"); // querySelector aqui seleciona o h1 para a váriavel titulo
// titulo.innerHTML = "Jogo do Número Secreto"; // innerHTML vai alterar o h1 "dentro do HTML", por meio de titulo

// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Escolha um número entre 1 e 10:";

let listaDeNumerosSortedos = []; 
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do Número Secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e " + numeroMaximo + ":");
}

exibirMensagemInicial();

function verificarChute() {
    let numeroEscolhido = document.querySelector("input").value;
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = "você descobriu o número secreto com " + tentativas + " " + palavraTentativa + "!";
    
    if(numeroEscolhido == numeroSecreto) {
        exibirTextoNaTela("h1", "Você acertou!");
        exibirTextoNaTela("p", "Parabéns, " + mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (numeroEscolhido > numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é menor que o número escolhido.");
        } else {
            exibirTextoNaTela("p", "O número secreto é maior que o número escolhido.")
        }
        tentativas++
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSortedos.length;

    if (quantidadeDeElementosNaLista == numeroMaximo) {
        listaDeNumerosSortedos = [];
    }

    if (listaDeNumerosSortedos.includes(numeroSorteado)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSortedos.push(numeroSorteado)
        console.log(listaDeNumerosSortedos);
        return numeroSorteado;
    }
}

function limparCampo() {
    numeroEscolhido = document.querySelector("input");
    numeroEscolhido.value = " ";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirMensagemInicial();
    tentativas = 1;
    document.getElementById("reiniciar").setAttribute("disabled", true);

}