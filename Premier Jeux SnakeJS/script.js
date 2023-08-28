document.addEventListener("DOMContentLoaded", function () {
  const canvasWidth = 900;
  const canvasHeight = 600;
  const blockSize = 30;
  const delay = 100;
  const canvasWidthInBlocks = canvasWidth / blockSize;
  const canvasHeightInBlocks = canvasHeight / blockSize;

  let canvas;
  let context;
  let python;
  let balon;
  let score;

  function initialize() {
    canvas = createCanvas();
    context = canvas.getContext("2d");

    python = new Snake(
      [
        [6, 4],
        [5, 4],
        [4, 4],
        [3, 4],
        [2, 4],
        [1, 4],
      ],
      "right"
    );

    balon = new Ball([10, 10]);
    score = 0;

    reloadCanvas();
  }

  function createCanvas() {
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvasWidth;
    newCanvas.height = canvasHeight;
    newCanvas.style.border = "30px solid black";
    newCanvas.style.margin = "50px auto";
    newCanvas.style.display = "block";
    newCanvas.style.backgroundColor = "#dcdcdc";
    document.body.appendChild(newCanvas);
    return newCanvas;
  }

  function reloadCanvas() {
    python.grow();
    if (python.checkDeath()) {
      gameOver();
    } else {
      if (python.eatBall(balon)) {
        score++;
        python.touchBall = true;
        do {
          balon.setNewPosition();
        } while (balon.touchesSnake(python));
      }
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      displayScore();
      python.draw();
      balon.draw();

      setTimeout(reloadCanvas, delay);
    }
  }

  function gameOver() {
    context.save();
    context.font = "bold 70px sans-serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.strokeStyle = "white";
    context.lineWidth = 5;
    const middleX = canvas.width / 2;
    const middleY = canvas.height / 2;
    context.strokeText("GAME OVER!!!", middleX, middleY - 180);
    context.fillText("GAME OVER!!!", middleX, middleY - 180);
    context.font = "bold 30px sans-serif";
    context.strokeText(
      "Appuie sur la touche Espace pour rejouer",
      middleX,
      middleY + 130
    );
    context.fillText(
      "Appuie sur la touche Espace pour rejouer",
      middleX,
      middleY + 130
    );
    context.restore();
  }

  function replay() {
    python = new Snake(
      [
        [6, 4],
        [5, 4],
        [4, 4],
        [3, 4],
        [2, 4],
        [1, 4],
      ],
      "right"
    );
    balon = new Ball([10, 10]);
    score = 0;
    reloadCanvas();
  }

  function displayScore() {
    context.save();
    context.font = "bold 150px sans-serif";
    context.fillStyle = "gray";
    context.textAlign = "center";
    context.textBaseline = "middle";
    const middleX = canvas.width / 2;
    const middleY = canvas.height / 2;
    context.fillText(score.toString(), middleX, middleY);
    context.restore();
  }

  function drawBlock(context, position) {
    const x = position[0] * blockSize;
    const y = position[1] * blockSize;
    context.fillRect(x, y, blockSize, blockSize);
  }

  function Snake(body, direction) {
    this.body = body;
    this.direction = direction;
    this.touchBall = false;

    this.draw = function () {
      context.save();
      context.fillStyle = "#008000";
      this.body.forEach((segment) => {
        drawBlock(context, segment);
      });
      context.restore();
    };

    this.grow = function () {
      const newPosition = this.body[0].slice();
      switch (this.direction) {
        case "left":
          newPosition[0] -= 1;
          break;
        case "right":
          newPosition[0] += 1;
          break;
        case "down":
          newPosition[1] += 1;
          break;
        case "up":
          newPosition[1] -= 1;
          break;
        default:
          throw "mauvaise direction";
      }

      this.body.unshift(newPosition);
      if (!this.touchBall) {
        this.body.pop();
      } else this.touchBall = false;
    };

    this.setDirection = function (newDirection) {
      const authorizedDirections = {
        left: ["up", "down"],
        right: ["up", "down"],
        up: ["left", "right"],
        down: ["left", "right"],
      };

      if (authorizedDirections[this.direction].includes(newDirection)) {
        this.direction = newDirection;
      }
    };

    this.checkDeath = function () {
      const head = this.body[0];
      const restOfBody = this.body.slice(1);

      const collisionWithWall =
        head[0] < 0 ||
        head[0] >= canvasWidthInBlocks ||
        head[1] < 0 ||
        head[1] >= canvasHeightInBlocks;

      const collisionWithBody = restOfBody.some(
        (segment) => segment[0] === head[0] && segment[1] === head[1]
      );

      return collisionWithWall || collisionWithBody;
    };

    this.eatBall = function (ball) {
      const head = this.body[0];
      return head[0] === ball.position[0] && head[1] === ball.position[1];
    };
  }

  function Ball(position) {
    this.position = position;

    this.draw = function () {
      context.save();
      context.fillStyle = "#B0C4DE";
      context.beginPath();
      const radius = blockSize / 2;
      const x = this.position[0] * blockSize + radius;
      const y = this.position[1] * blockSize + radius;
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    this.setNewPosition = function () {
      const newX = Math.floor(Math.random() * canvasWidthInBlocks);
      const newY = Math.floor(Math.random() * canvasHeightInBlocks);
      this.position = [newX, newY];
    };

    this.touchesSnake = function (snake) {
      return snake.body.some(
        (segment) =>
          this.position[0] === segment[0] && this.position[1] === segment[1]
      );
    };
  }

  document.addEventListener("keydown", function (e) {
    const key = e.keyCode;
    let newDirection;
    switch (key) {
      case 37:
      case 81:
        newDirection = "left";
        break;
      case 38:
      case 90:
        newDirection = "up";
        break;
      case 39:
      case 68:
        newDirection = "right";
        break;
      case 40:
      case 83:
        newDirection = "down";
        break;
      case 32:
        replay();
        return;
      default:
        return;
    }

    python.setDirection(newDirection);
  });

  // Initialisation
  initialize();
});
