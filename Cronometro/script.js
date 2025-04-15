let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');
let setButton = document.getElementById('setTime');
let timeDisplay = document.getElementById('time');
let hoursInput = document.getElementById('hours');
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');

let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let timerInterval;
let isCountingDown = false; // Flag para controlar a direção do cronômetro

// Função para formatar os números
function formatTime(num) {
    return num < 10 ? '0' + num : num;
}

// Atualiza a exibição do tempo
function updateTimeDisplay() {
    timeDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${milliseconds < 100 ? '0' + milliseconds : milliseconds}`;
}

// Função para a contagem regressiva (de um valor definido até 0)
function startCountdown() {
    isCountingDown = true;
    timerInterval = setInterval(function() {
        if (milliseconds > 0) {
            milliseconds--;
        } else {
            if (seconds > 0) {
                seconds--;
                milliseconds = 999;
            } else {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                    milliseconds = 999;
                } else {
                    if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                        milliseconds = 999;
                    } else {
                        clearInterval(timerInterval); // Para o cronômetro quando o tempo chega a zero
                        alert("Tempo Expirado!");
                    }
                }
            }
        }
        updateTimeDisplay();
    }, 1); // Intervalo de 1 milissegundo
}

// Função para a contagem para frente (tempo subindo)
function startTimer() {
    isCountingDown = false;
    timerInterval = setInterval(function() {
        milliseconds++;
        if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
        updateTimeDisplay();
    }, 1); // Intervalo de 1 milissegundo
}

// Função para parar o cronômetro
function stopTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
    document.querySelector('.timer').classList.remove('bright');
}

// Função para reiniciar o cronômetro
function resetTimer() {
    clearInterval(timerInterval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateTimeDisplay();
    startButton.disabled = false;
    stopButton.disabled = true;
    document.querySelector('.timer').classList.remove('bright');
}

// Função para definir o tempo de contagem regressiva
function setTime() {
    hours = parseInt(hoursInput.value) || 0;
    minutes = parseInt(minutesInput.value) || 0;
    seconds = parseInt(secondsInput.value) || 0;
    milliseconds = 0;
    updateTimeDisplay();

    // Desabilita o botão de Start até que o tempo seja definido
    startButton.disabled = false;
}

// Adiciona os ouvintes de eventos para os botões
startButton.addEventListener('click', function() {
    if (isCountingDown) {
        startCountdown(); // Inicia a contagem regressiva
    } else {
        startTimer(); // Inicia a contagem para frente
    }
});

stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
setButton.addEventListener('click', setTime);
