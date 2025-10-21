const game = document.querySelector(".game");
const leftPaddle = document.querySelector(".paddle.left");
const rightPaddle = document.querySelector(".paddle.right");
const ball = document.querySelector(".ball");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const difficultySelect = document.getElementById("difficulty");
const playerScoreEl = document.getElementById("playerScore");
const aiScoreEl = document.getElementById("aiScore");

let gameWidth, gameHeight;
function updateGameSize() {
  const rect = game.getBoundingClientRect();
  gameWidth = Math.floor(rect.width);
  gameHeight = Math.floor(rect.height);
}

let ballX, ballY, ballSpeedX, ballSpeedY;
let leftPaddleY, rightPaddleY;
let playerScore = 0, aiScore = 0;
let isRunning = false;
let isPaused = false;
let maxScore = 10;
let baseSpeed = 5;
let speedMultiplier = 1;

// simple sounds using WebAudio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function beep(freq, duration = 0.05, type = 'sine') {
  try {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type;
    o.frequency.value = freq;
    o.connect(g);
    g.connect(audioCtx.destination);
    g.gain.value = 0.05;
    o.start();
    setTimeout(() => { o.stop(); }, duration * 1000);
  } catch (e) {
    // audio may be blocked until user interacts
  }
}

function resetGame(keepScore = false) {
  updateGameSize();
  ballX = gameWidth / 2 - 7.5;
  ballY = gameHeight / 2 - 7.5;
  const dir = Math.random() < 0.5 ? 1 : -1;
  ballSpeedX = dir * baseSpeed * speedMultiplier;
  ballSpeedY = (Math.random() * 3 + 2) * (Math.random() < 0.5 ? 1 : -1);
  leftPaddleY = gameHeight / 2 - 50;
  rightPaddleY = gameHeight / 2 - 50;
  if (!keepScore) {
    playerScore = 0; aiScore = 0;
  }
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

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

function paddleCollision(paddleX, paddleY, paddleW, paddleH) {
  // simple AABB collision
  return (
    ballX < paddleX + paddleW &&
    ballX + 15 > paddleX &&
    ballY < paddleY + paddleH &&
    ballY + 15 > paddleY
  );
}

function updateGame() {
  if (!isRunning || isPaused) return;

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce off top/bottom
  if (ballY <= 0) { ballY = 0; ballSpeedY *= -1; beep(800, 0.03); }
  if (ballY + 15 >= gameHeight) { ballY = gameHeight - 15; ballSpeedY *= -1; beep(800, 0.03); }

  // left paddle collision
  const paddleW = 10, paddleH = 100;
  if (paddleCollision(0, leftPaddleY, paddleW, paddleH)) {
    // calculate hit position relative to paddle center to change angle
    const hitPos = (ballY + 7.5) - (leftPaddleY + paddleH / 2);
    const normalized = hitPos / (paddleH / 2); // -1 .. 1
    const maxBounceAngle = Math.PI / 3; // 60 degrees
    const angle = normalized * maxBounceAngle;
    const speed = Math.hypot(ballSpeedX, ballSpeedY) * 1.05; // slightly increase speed
    ballSpeedX = Math.cos(angle) * speed;
    ballSpeedY = Math.sin(angle) * speed;
    if (ballSpeedX < 0) ballSpeedX *= -1; // ensure ball goes right
    ballX = paddleW; // prevent sticking
    beep(1200, 0.03);
  }

  // right paddle collision
  if (paddleCollision(gameWidth - paddleW, rightPaddleY, paddleW, paddleH)) {
    const hitPos = (ballY + 7.5) - (rightPaddleY + paddleH / 2);
    const normalized = hitPos / (paddleH / 2);
    const maxBounceAngle = Math.PI / 3;
    const angle = normalized * maxBounceAngle;
    const speed = Math.hypot(ballSpeedX, ballSpeedY) * 1.05;
    ballSpeedX = -Math.cos(angle) * speed;
    ballSpeedY = Math.sin(angle) * speed;
    if (ballSpeedX > 0) ballSpeedX *= -1; // ensure ball goes left
    ballX = gameWidth - paddleW - 15;
    beep(1200, 0.03);
  }

  // Score tracking
  if (ballX < -30) {
    // AI scored
    aiScore++;
    beep(200, 0.15, 'square');
    speedMultiplier = 1; // reset speed
    resetGame(true);
  }

  if (ballX > gameWidth + 30) {
    playerScore++;
    beep(1400, 0.15, 'square');
    speedMultiplier = 1;
    resetGame(true);
  }

  // speed ramp: slowly increase speed over time
  speedMultiplier = Math.min(2.5, speedMultiplier + 0.0005);
  // adjust base speed effect
  const currentSpeed = Math.sign(ballSpeedX) * (Math.abs(ballSpeedX) * (1 + 0.0001));

  // AI movement based on difficulty
  const diff = difficultySelect.value || 'medium';
  let aiSpeed = diff === 'easy' ? 2 : diff === 'hard' ? 5 : 3.2;
  // add slight predictive behavior
  if (diff === 'hard') {
    // try to move towards where ball will be
    const timeToReach = Math.abs((gameWidth - rightPaddleY) / (ballSpeedX || 1));
    // small prediction not to overshoot
  }

  if (rightPaddleY + paddleH / 2 < ballY + 7.5 - 6) rightPaddleY += aiSpeed;
  else if (rightPaddleY + paddleH / 2 > ballY + 7.5 + 6) rightPaddleY -= aiSpeed;

  // Clamp paddles
  leftPaddleY = clamp(leftPaddleY, 0, gameHeight - paddleH);
  rightPaddleY = clamp(rightPaddleY, 0, gameHeight - paddleH);

  updateUI();
  requestAnimationFrame(updateGame);
}

// mouse controls
game.addEventListener("mousemove", (e) => {
  const rect = game.getBoundingClientRect();
  leftPaddleY = e.clientY - rect.top - 50;
  leftPaddleY = clamp(leftPaddleY, 0, gameHeight - 100);
});

// keyboard controls
const keys = {};
window.addEventListener('keydown', (e) => { keys[e.key.toLowerCase()] = true; if (!isRunning && (e.key === ' ')) startGame(); });
window.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; });

function handleKeyboard() {
  if (keys['w']) leftPaddleY -= 6;
  if (keys['s']) leftPaddleY += 6;
  leftPaddleY = clamp(leftPaddleY, 0, gameHeight - 100);
}

function gameLoop() {
  handleKeyboard();
  if (isRunning && !isPaused) requestAnimationFrame(gameLoop);
}

function startGame() {
  if (!isRunning) {
    isRunning = true;
    isPaused = false;
    updateGameSize();
    requestAnimationFrame(updateGame);
    requestAnimationFrame(gameLoop);
  } else if (isPaused) {
    isPaused = false;
    requestAnimationFrame(updateGame);
    requestAnimationFrame(gameLoop);
  }
}

function pauseGame() {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
}

startBtn.addEventListener("click", () => startGame());
pauseBtn.addEventListener("click", () => pauseGame());

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  aiScore = 0;
  isRunning = false;
  isPaused = false;
  pauseBtn.textContent = 'Pause';
  speedMultiplier = 1;
  resetGame();
});

// keep ball/paddles responsive when window resizes
window.addEventListener('resize', () => {
  updateGameSize();
  // re-center elements if needed
  leftPaddleY = clamp(leftPaddleY, 0, gameHeight - 100);
  rightPaddleY = clamp(rightPaddleY, 0, gameHeight - 100);
  ballX = clamp(ballX, 0, gameWidth - 15);
  ballY = clamp(ballY, 0, gameHeight - 15);
  updateUI();
});

resetGame(); // Initialize
