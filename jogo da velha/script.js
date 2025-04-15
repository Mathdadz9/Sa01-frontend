const celulas = document.querySelectorAll('.celula');
const mensagem = document.getElementById('mensagem');
const botaoReiniciar = document.getElementById('reiniciar');

let jogadorAtual = 'X';
let jogoAtivo = true;
let estadoJogo = ["", "", "", "", "", "", "", "", ""];

const combinacoesVitoria = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
  [0, 4, 8], [2, 4, 6]             // diagonais
];

function checarVitoria() {
  for (const condicao of combinacoesVitoria) {
    const [a, b, c] = condicao;
    if (estadoJogo[a] && estadoJogo[a] === estadoJogo[b] && estadoJogo[a] === estadoJogo[c]) {
      jogoAtivo = false;
      mensagem.textContent = `Jogador ${estadoJogo[a]} venceu!`;
      return;
    }
  }

  if (!estadoJogo.includes("")) {
    jogoAtivo = false;
    mensagem.textContent = "Empate!";
  }
}

function cliqueNaCelula(e) {
  const index = e.target.dataset.index;

  if (estadoJogo[index] !== "" || !jogoAtivo) return;

  estadoJogo[index] = jogadorAtual;
  e.target.textContent = jogadorAtual;

  checarVitoria();

  jogadorAtual = jogadorAtual === "X" ? "O" : "X";
}

function reiniciarJogo() {
  jogadorAtual = "X";
  jogoAtivo = true;
  estadoJogo = ["", "", "", "", "", "", "", "", ""];
  celulas.forEach(celula => celula.textContent = "");
  mensagem.textContent = "";
}

celulas.forEach(celula => celula.addEventListener('click', cliqueNaCelula));
botaoReiniciar.addEventListener('click', reiniciarJogo);
