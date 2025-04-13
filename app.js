const squares = document.querySelectorAll('.square');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time');
const levelSelect = document.getElementById('level');

let score = 0;
let timeLeft = 60;
let hitPosition;
let timerId = null;
let moleTimerId = null;
let moleSpeed = parseInt(levelSelect.value); // default from select

// Difficulty selector
levelSelect.addEventListener('change', () => {
  moleSpeed = parseInt(levelSelect.value);
  resetGame();
  startGame();
});

// Reset game state
function resetGame() {
  clearInterval(timerId);
  clearInterval(moleTimerId);
  score = 0;
  timeLeft = 60;
  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = timeLeft;
}

// Random mole placement
function randomMole() {
  squares.forEach((square) => square.classList.remove('mole'));

  const randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add('mole');
  hitPosition = randomSquare.id;
}

// Score update on hit
squares.forEach((square) => {
  square.addEventListener('mousedown', () => {
    if (square.id === hitPosition) {
      score++;
      scoreDisplay.textContent = score;
      hitPosition = null;
    }
  });
});

// Start mole movement
function moveMole() {
  moleTimerId = setInterval(randomMole, moleSpeed);
}

// Countdown timer
function countdown() {
  timeLeft--;
  timeLeftDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timerId);
    clearInterval(moleTimerId);
    alert(`🎉 Game Over! Your final score is ${score}`);
  }
}

// Start the game
function startGame() {
  moveMole();
  timerId = setInterval(countdown, 1000);
}

startGame();
