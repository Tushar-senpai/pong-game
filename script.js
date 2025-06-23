const game = document.querySelector(".game");
const leftPaddle = document.querySelector(".paddle.left");
const rightPaddle = document.querySelector(".paddle.right");
const ball = document.querySelector(".ball");

const gameWidth = 800;
const gameHeight = 500;

let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

let leftPaddleY = gameHeight / 2 - 50;
let rightPaddleY = gameHeight / 2 - 50;

function update() {
  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top/bottom
  if (ballY <= 0 || ballY + 15 >= gameHeight) {
    ballSpeedY *= -1;
  }

  // Ball collision with left paddle
  if (
    ballX <= 10 &&
    ballY + 15 >= leftPaddleY &&
    ballY <= leftPaddleY + 100
  ) {
    ballSpeedX *= -1;
    ballX = 10; // Avoid sticking
  }

  // Ball collision with right paddle
  if (
    ballX + 15 >= gameWidth - 10 &&
    ballY + 15 >= rightPaddleY &&
    ballY <= rightPaddleY + 100
  ) {
    ballSpeedX *= -1;
    ballX = gameWidth - 25; // Avoid sticking
  }

  // Ball reset if it goes out of bounds
  if (ballX < 0 || ballX > gameWidth) {
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    ballSpeedX = -ballSpeedX;
  }

  // Simple AI for right paddle
  if (rightPaddleY + 50 < ballY) rightPaddleY += 3;
  else if (rightPaddleY + 50 > ballY) rightPaddleY -= 3;

  // Clamp paddles
  leftPaddleY = Math.max(0, Math.min(gameHeight - 100, leftPaddleY));
  rightPaddleY = Math.max(0, Math.min(gameHeight - 100, rightPaddleY));

  // Update DOM
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  leftPaddle.style.top = leftPaddleY + "px";
  rightPaddle.style.top = rightPaddleY + "px";

  requestAnimationFrame(update);
}

game.addEventListener("mousemove", (e) => {
  const rect = game.getBoundingClientRect();
  leftPaddleY = e.clientY - rect.top - 50;
});

update();

