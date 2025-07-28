let listaDeNumerosSorteados = [];
let quantidadeDeNumerosDisponiveis = 5;
let numeroEscolhido = 0;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial () {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 5');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Aqui ele deixa gramaticalmente correta a frase, se for maior que 1, usa 'tentativas' no plural, caso contrário usa 'tentativa' no singular.
        let mensagemTentativas = `Parabéns, você é bom mesmo! você acertou em ${tentativas} ${palavraTentativa}`; // Aqui monta uma mensagem usando template string com crase
        exibirTextoNaTela('p', mensagemTentativas); // mostra a mensagem com o número de tentativas
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de novo jogo
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor que ' + chute);
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior que ' + chute);
        }
        tentativas++; // tentativas = tentativas + 1; simplificado
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * quantidadeDeNumerosDisponiveis + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == quantidadeDeNumerosDisponiveis) {
        listaDeNumerosSorteados = []; // Limpa a lista se já tiver 5 números sorteados
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Se o número já foi sorteado, chama a função novamente
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número sorteado à lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido; 
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true) // Desabilita o botão de novo jogo
}