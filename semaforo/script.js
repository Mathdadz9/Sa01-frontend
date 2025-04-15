// Usamos setTimeout() para controlar o tempo de cada luz. A função acenderLuz() 
// inicia a sequência de troca: vermelha por 3 segundos, 
// amarela por 2 segundos e verde por 4 segundos. O ciclo reinicia automaticamente após 10 segundos.

const vermelho = document.querySelector('.vermelho');
const amarelo = document.querySelector('.amarelo');
const verde = document.querySelector('.verde');

function desligarLuzes() {
  vermelho.classList.remove('ativo');
  amarelo.classList.remove('ativo');
  verde.classList.remove('ativo');
}

function ligarVermelho() {
  desligarLuzes();
  vermelho.classList.add('ativo');
}

function ligarAmarelo() {
  desligarLuzes();
  amarelo.classList.add('ativo');
}

function ligarVerde() {
  desligarLuzes();
  verde.classList.add('ativo');
}

function iniciarSemaforo() {
  ligarVermelho();
  setTimeout(() => {
    ligarVerde();
    setTimeout(() => {
      ligarAmarelo();
      setTimeout(() => {
        iniciarSemaforo(); 
      }, 2000); 
    }, 3000); 
  }, 4000); 
}

iniciarSemaforo(); 
// A cada troca de luz, setTimeout()
// aguarda o tempo definido e reinicia o ciclo com a função acenderLuz().