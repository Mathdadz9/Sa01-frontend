const celulas = document.querySelectorAll('.celula');
const mensagem = document.getElementById('mensagem');
const botaoReiniciar = document.getElementById('reiniciar');
const placarX = document.getElementById('placarX');
const placarO = document.getElementById('placarO');

let jogadorAtual = 'X'; // Jogador humano
let jogoAtivo = true;
let estadoJogo = ["", "", "", "", "", "", "", "", ""];
let placarJogadorX = 0;
let placarJogadorO = 0;

// Combinações de vitória
const combinacoesVitoria = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
  [0, 4, 8], [2, 4, 6]             // diagonais
];

// Função para checar se houve vitória ou empate
function checarVitoria() {
  for (const condicao of combinacoesVitoria) {
    const [a, b, c] = condicao;
    if (estadoJogo[a] && estadoJogo[a] === estadoJogo[b] && estadoJogo[a] === estadoJogo[c]) {
      jogoAtivo = false;
      if (estadoJogo[a] === 'X') {
        placarJogadorX++;
        placarX.textContent = placarJogadorX;
        mensagem.textContent = `Jogador X venceu!`;
      } else if (estadoJogo[a] === 'O') {
        placarJogadorO++;
        placarO.textContent = placarJogadorO;
        mensagem.textContent = `Máquina O venceu!`;
      }
      return;
    }
  }

  if (!estadoJogo.includes("")) {
    jogoAtivo = false;
    mensagem.textContent = "Empate!";
  }
}

// Função Minimax para a máquina fazer a melhor jogada
function minimax(tabuleiro, profundidade, jogador) {
  const vencedor = verificarVencedor(tabuleiro);
  if (vencedor !== null) {
    return vencedor === 'O' ? 1 : vencedor === 'X' ? -1 : 0;
  }

  const movimentosDisponiveis = tabuleiro.map((valor, index) => valor === '' ? index : -1).filter(index => index !== -1);

  if (movimentosDisponiveis.length === 0) {
    return 0; // empate
  }

  let melhorPontuacao = jogador === 'O' ? -Infinity : Infinity;
  for (let i = 0; i < movimentosDisponiveis.length; i++) {
    const movimento = movimentosDisponiveis[i];
    tabuleiro[movimento] = jogador;
    const pontuacao = minimax(tabuleiro, profundidade + 1, jogador === 'O' ? 'X' : 'O');
    tabuleiro[movimento] = ''; // Desfaz o movimento

    if (jogador === 'O') {
      melhorPontuacao = Math.max(pontuacao, melhorPontuacao);
    } else {
      melhorPontuacao = Math.min(pontuacao, melhorPontuacao);
    }
  }

  return melhorPontuacao;
}

// Função para verificar vencedor
function verificarVencedor(tabuleiro) {
  for (const condicao of combinacoesVitoria) {
    const [a, b, c] = condicao;
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      return tabuleiro[a];
    }
  }
  return null;
}

// Função que a máquina usa para fazer a jogada
function jogadaDaMaquina() {
  const movimentosDisponiveis = estadoJogo.map((valor, index) => valor === '' ? index : -1).filter(index => index !== -1);

function escolherJogadaMaquina() {
  if (dificuldade === 'facil') {
    jogadaAleatoria();
  } else if (dificuldade === 'medio') {
    jogadaSemiInteligente();
  } else {
    jogadaMinimax();
  }
}

// Função de jogada aleatória (para fácil)
function jogadaAleatoria() {
  const movimentosDisponiveis = estadoJogo.map((valor, index) => valor === '' ? index : -1).filter(index => index !== -1);
  const movimento = movimentosDisponiveis[Math.floor(Math.random() * movimentosDisponiveis.length)];
  estadoJogo[movimento] = 'O';
  celulas[movimento].textContent = 'O';
  checarVitoria();
  jogadorAtual = 'X'; // Volta para o jogador humano
}

// Função de jogada semi-inteligente (para médio)
function jogadaSemiInteligente() {
  const movimentosDisponiveis = estadoJogo.map((valor, index) => valor === '' ? index : -1).filter(index => index !== -1);
  let movimento = null;

  // Exemplo simples: bloquear vitória iminente
  for (let i = 0; i < movimentosDisponiveis.length; i++) {
    const movimentoTeste = movimentosDisponiveis[i];
    estadoJogo[movimentoTeste] = 'O';
    if (checarVitoria()) {
      movimento = movimentoTeste;
      break;
    }
    estadoJogo[movimentoTeste] = ''; // Desfaz o movimento
  }

  if (movimento === null) {
    movimento = movimentosDisponiveis[Math.floor(Math.random() * movimentosDisponiveis.length)];
  }

  estadoJogo[movimento] = 'O';
  celulas[movimento].textContent = 'O';
  checarVitoria();
  jogadorAtual = 'X'; // Volta para o jogador humano
}

// Função de jogada difícil (Minimax)
function jogadaMinimax() {
  const movimentosDisponiveis = estadoJogo.map((valor, index) => valor === '' ? index : -1).filter(index => index !== -1);
  let melhorJogada = -1;
  let melhorPontuacao = -Infinity;

  for (let i = 0; i < movimentosDisponiveis.length; i++) {
    const movimento = movimentosDisponiveis[i];
    estadoJogo[movimento] = 'O';
    const pontuacao = minimax(estadoJogo, 0, 'X');
    estadoJogo[movimento] = ''; // Desfaz o movimento

    if (pontuacao > melhorPontuacao) {
      melhorPontuacao = pontuacao;
      melhorJogada = movimento;
    }
  }

  estadoJogo[melhorJogada] = 'O';
  celulas[melhorJogada].textContent = 'O';
  checarVitoria();
  jogadorAtual = 'X'; // Volta para o jogador humano
}























  let melhorJogada = -1;
  let melhorPontuacao = -Infinity;

  for (let i = 0; i < movimentosDisponiveis.length; i++) {
    const movimento = movimentosDisponiveis[i];
    estadoJogo[movimento] = 'O'; // Faz o movimento da máquina
    const pontuacao = minimax(estadoJogo, 0, 'X'); // Avalia a jogada
    estadoJogo[movimento] = ''; // Desfaz o movimento

    if (pontuacao > melhorPontuacao) {
      melhorPontuacao = pontuacao;
      melhorJogada = movimento;
    }
  }

  estadoJogo[melhorJogada] = 'O';
  celulas[melhorJogada].textContent = 'O';
  checarVitoria();
  jogadorAtual = 'X'; // Volta para o jogador humano
}

// Função chamada quando o jogador clica em uma célula
function cliqueNaCelula(e) {
  const index = e.target.dataset.index;

  if (estadoJogo[index] !== "" || !jogoAtivo || jogadorAtual !== "X") return;

  estadoJogo[index] = jogadorAtual;
  e.target.textContent = jogadorAtual;

  checarVitoria();

  if (jogoAtivo) {
    jogadorAtual = 'O'; // Passa para a vez da máquina
    setTimeout(jogadaDaMaquina, 500); // Máquina joga após um pequeno intervalo
  }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  jogadorAtual = 'X'; // Começa com o jogador
  jogoAtivo = true;
  estadoJogo = ["", "", "", "", "", "", "", "", ""];
  celulas.forEach(celula => celula.textContent = "");
  mensagem.textContent = "";
}

celulas.forEach(celula => celula.addEventListener('click', cliqueNaCelula));
botaoReiniciar.addEventListener('click', reiniciarJogo);
