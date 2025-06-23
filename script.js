const game = document.querySelector(".game");
const leftPaddle = document.querySelector(".paddle.left");
const rightPaddle = document.querySelector(".paddle.right");
const ball = document.querySelector(".ball");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const playerScoreEl = document.getElementById("playerScore");
const aiScoreEl = document.getElementById("aiScore");

const gameWidth = 800;
const gameHeight = 500;

let ballX, ballY, ballSpeedX, ballSpeedY;
let leftPaddleY, rightPaddleY;
let playerScore = 0, aiScore = 0;
let isRunning = false;

function resetGame() {
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  ballSpeedX = Math.random() < 0.5 ? 5 : -5;
  ballSpeedY = (Math.random() * 4 + 2) * (Math.random() < 0.5 ? 1 : -1);
  leftPaddleY = gameHeight / 2 - 50;
  rightPaddleY = gameHeight / 2 - 50;
  updateUI();
}

function updateUI() {
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
  leftPaddle.style.top = `${leftPaddleY}px`;
  rightPaddle.style.top = `${rightPaddleY}px`;
  playerScoreEl.textContent = playerScore;
  aiScoreEl.textContent = aiScore;
}

function updateGame() {
  if (!isRunning) return;

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce off top/bottom
  if (ballY <= 0 || ballY + 15 >= gameHeight) {
    ballSpeedY *= -1;
  }

  // Collision with left paddle
  if (
    ballX <= 10 &&
    ballY + 15 >= leftPaddleY &&
    ballY <= leftPaddleY + 100
  ) {
    ballSpeedX *= -1;
    ballX = 10;
  }

  // Collision with right paddle
  if (
    ballX + 15 >= gameWidth - 10 &&
    ballY + 15 >= rightPaddleY &&
    ballY <= rightPaddleY + 100
  ) {
    ballSpeedX *= -1;
    ballX = gameWidth - 25;
  }

  // Score tracking
  if (ballX < 0) {
    aiScore++;
    resetGame();
  }

  if (ballX > gameWidth) {
    playerScore++;
    resetGame();
  }

  // AI movement
  if (rightPaddleY + 50 < ballY) rightPaddleY += 3;
  else if (rightPaddleY + 50 > ballY) rightPaddleY -= 3;

  // Clamp paddles
  leftPaddleY = Math.max(0, Math.min(gameHeight - 100, leftPaddleY));
  rightPaddleY = Math.max(0, Math.min(gameHeight - 100, rightPaddleY));

  updateUI();
  requestAnimationFrame(updateGame);
}

game.addEventListener("mousemove", (e) => {
  const rect = game.getBoundingClientRect();
  leftPaddleY = e.clientY - rect.top - 50;
});

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    updateGame();
  }
});

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  aiScore = 0;
  isRunning = false;
  resetGame();
});

resetGame(); // Initialize
