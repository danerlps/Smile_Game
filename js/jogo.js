//declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

//captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

//função que zera os valores das variáveis controladoras
function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;
    jogarNovamente();
    atualizaPlacar(0, 0);
    //mostra o botao jogarnovamente alterando a classe css (className)
    btnJogarNovamente.className = 'visivel';
    //oculta o botao reiniciar alterando a classe css (className)
    btnReiniciar.className = 'invisivel';
}

//função jogar novamente
function jogarNovamente() {
    jogar = true;
    // Seleciona apenas as cartas dentro da linha1
    const cartas = document.querySelectorAll('#linha1 > .inicial, #linha1 > .acertou, #linha1 > .errou');
    cartas.forEach(carta => {
        carta.className = "inicial";
        // Remove qualquer imagem dentro da carta
        while (carta.firstChild) {
            carta.removeChild(carta.firstChild);
        }
        // Adiciona o texto original de volta
        carta.textContent = carta.id;
    });
    document.getElementById('mensagem-resultado').className = "mensagem-flutuante";
}

//função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
    //calcula o desempenho em porcentagem
    desempenho = (acertos / tentativas) * 100;
    //escreve o placar com os valores atualizados (innerHTML)
    document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

//função executada quando o jogador acertou
function acertou(obj) {
    //altera a classe CSS da <div> escolhida pelo jogador (className)
    obj.className = "acertou";
    //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
    const img = new Image(100);
    img.id = "imagem";
    //altera o atributo src (source) da imagem criada
    img.src = "image/vitoria.jpg";
    //remove qualquer conteúdo anterior da div
    obj.textContent = '';
    //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
    obj.appendChild(img);
}

//função executada quando o jogador errou
function errou(obj) {
    //altera a classe CSS da <div> escolhida pelo jogador (className)
    obj.className = "errou";
    //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
    const img = new Image(100);
    img.id = "imagem_erro";
    //altera o atributo src (source) da imagem criada
    img.src = "image/derrota.jpg";
    //remove qualquer conteúdo anterior da div
    obj.textContent = '';
    //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
    obj.appendChild(img);
}

//Função que sorteia um número aleatório entre 0 e 3 e verifica se o jogador acertou
function verifica(obj) {
    //se jogar é verdadeiro
    if (jogar) {
        //jogar passa a ser false
        jogar = false;
        //incrementa as tentativas
        tentativas++;
        
        // Marca a carta escolhida
        marcarCartaEscolhida(obj);

        //verifica se jogou 5 vezes
        if (tentativas == 5) {
            //oculta o botao joganovamente alterando a classe css
            btnJogarNovamente.className = 'invisivel';
            //mostra o botao reiniciar alterando a classe css
            btnReiniciar.className = 'visivel';
        }
        //a variável sorteado recebe um valor inteiro aleatório entre 0 e 3
        let sorteado = Math.floor(Math.random() * 4);
        
        //se o id da <div> escolhida pelo jogador for igual ao número sorteado
        if (obj.id == sorteado) {
            //chama a função acertou passando a div escolhida pelo jogador
            acertou(obj);
            //incrementa o contador de acertos
            acertos++;
            mostrarMensagemResultado(true);
        } else {
            //se errou a tentativa, chama a função errou para mostrar a imagem de erro
            errou(obj);
            //armazena a div onde Smile está escondido
            const objSorteado = document.getElementById(sorteado);
            //chama a função acertou para mostrar a div onde está o Smile
            acertou(objSorteado);
            mostrarMensagemResultado(false);
        }
        //chama a função que atualiza o placar
        atualizaPlacar(acertos, tentativas);
    } else {
        //se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
        alert('Clique em "Jogar novamente"');
    }
}

// Adicione estas funções no seu arquivo JavaScript

function mostrarMensagemResultado(acertou) {
    const mensagem = document.getElementById('mensagem-resultado');
    mensagem.textContent = acertou ? "Acertou! 🎉" : "Errou! 😢";
    mensagem.className = acertou ? "mensagem-flutuante mensagem-acerto mostrar" : "mensagem-flutuante mensagem-erro mostrar";
    
    // Remove a classe após a animação terminar
    setTimeout(() => {
        mensagem.className = "mensagem-flutuante";
    }, 3000);
}

function marcarCartaEscolhida(carta) {
    // Remove a marcação de qualquer carta anterior
    const cartas = document.querySelectorAll('.inicial, .acertou, .errou');
    cartas.forEach(c => c.classList.remove('carta-marcada'));
    
    // Adiciona a marcação na carta escolhida
    carta.classList.add('carta-marcada');
}

// Exemplo de função corrigida para resetar cartas:
function resetarCartas() {
    // Seleciona apenas as cartas dentro da linha1
    const cartas = document.querySelectorAll('#linha1 > .inicial, #linha1 > .acertou, #linha1 > .errou');
    cartas.forEach(carta => {
        carta.className = 'inicial';
        carta.innerHTML = carta.id;
    });
    document.getElementById('mensagem-resultado').textContent = '';
    document.getElementById('resposta').textContent = '';
}

// No evento do botão "Jogar novamente":
document.getElementById('joganovamente').onclick = function() {
    resetarCartas();
    // ...outros resets necessários...
};

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);