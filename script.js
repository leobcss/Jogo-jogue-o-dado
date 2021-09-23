'use strict';

// Selecionando elementos
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnInfo = document.querySelector('.btn--info');
const btnCloseModal = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

// Condições iniciais
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();

// FUNCIONALIDADES:

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Jogando os dados
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Gerar um número aleatório
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Mostrar o dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Checar o número
    if (dice !== 1) {
      // 3.1 add valor do dado ao placar
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // 3.2 jogador perde pontos, troca jogador
      switchPlayer();
    }
  }
});

// Guardar Pontos
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add pontos ao placar do jogador ativo
    scores[activePlayer] += currentScore; //   scores [1] = scores [1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //  2. Checa se placar >= 100
    if (scores[activePlayer] >= 100) {
      // 2.1 Termina o jogo
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 2.2 Troca jogador
      switchPlayer();
    }
  }
});

// RESET
btnNew.addEventListener('click', init);

// INFO:Como Jogar (abre modal / fecha modal)
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnInfo.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  // console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
