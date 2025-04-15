const lampada = document.getElementById('lampada');
const body = document.body;  // Referência ao corpo da página para alterar o tema
const botaoQuebrar = document.getElementById('quebrar');  // Referência ao botão "Quebrar"
let contadorCliques = 0;  // Contador de cliques

// Função para verificar se a lâmpada está quebrada
function estaQuebrada() {
  return lampada.src.includes('lampada-quebrada.png');
}

// Função para acender a lâmpada e garantir que o tema volte ao claro
function acenderLampada() {
  if (!estaQuebrada()) {
    lampada.src = 'lampada-acesa.png';
    // Garantir que o tema volte ao modo claro quando a lâmpada acende
    body.classList.remove('dark-mode');
    body.classList.remove('blue-dark-mode');
    contadorCliques++;  // Incrementar contador de cliques

    // Se o contador atingir 10, quebra a lâmpada e remove o botão "Quebrar"
    if (contadorCliques >= 10) {
      quebrarLampada();
      botaoQuebrar.style.display = 'none';  // Remove o botão "Quebrar"
    }
  }
}

// Função para apagar a lâmpada e aplicar o tema azul escuro
function apagarLampada() {
  if (!estaQuebrada()) {
    lampada.src = 'lampada-apagada.png';
    // Alterar para o fundo azul escuro quando a lâmpada apagar
    body.classList.add('blue-dark-mode');
    body.classList.remove('dark-mode');  // Garantir que o tema escuro (preto) não seja ativado
    contadorCliques++;  // Incrementar contador de cliques

    // Se o contador atingir 10, quebra a lâmpada e remove o botão "Quebrar"
    if (contadorCliques >= 10) {
      quebrarLampada();
      botaoQuebrar.style.display = 'none';  // Remove o botão "Quebrar"
    }
  }
}

// Função para quebrar a lâmpada e ativar o tema escuro
function quebrarLampada() {
  lampada.src = 'lampada-quebrada.png';
  // Ativar o tema escuro (preto) ao quebrar a lâmpada
  body.classList.add('dark-mode');
  body.classList.remove('blue-dark-mode');  // Garantir que o tema azul não seja ativado
  // Não é possível interagir mais com a lâmpada após quebrar, então removemos a opção de quebrar
  botaoQuebrar.style.display = 'none';  // Remove o botão "Quebrar"
}

// Função para trocar a lâmpada e voltar ao tema claro
function trocarLampada() {
  lampada.src = 'lampada-acesa.png';
  // Remover o tema escuro e azul escuro ao trocar a lâmpada
  body.classList.remove('dark-mode');
  body.classList.remove('blue-dark-mode');
  // Reiniciar o contador de cliques
  contadorCliques = 0;  // Reinicia o contador quando a lâmpada é trocada
  // O botão "Quebrar" é mostrado novamente quando trocamos a lâmpada
  botaoQuebrar.style.display = 'inline-block';  // Exibe o botão "Quebrar"
}
