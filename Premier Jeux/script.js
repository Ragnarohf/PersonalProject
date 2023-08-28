window.onload = function () {
  // variables Globales scopes dans tout le pgm
  var canvasWidth = 900;
  var canvasHeight = 600;
  var canvas;
  var context;
  var blockSize = 30;
  var delay = 100;
  var python;
  var balon;
  var canvasWidthInBlocks = canvasWidth / blockSize;
  var canvasHeightInBlocks = canvasHeight / blockSize;
  var score;

  function initialization() {
    canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "30px solid black";
    canvas.style.margin = "50px auto";
    canvas.style.display = "block";
    canvas.style.backgroundColor = "#dcdcdc";
    document.body.appendChild(canvas);
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

  // --Lancement--
  initialization();

  // --refresh--
  function reloadCanvas() {
    python.growUp();
    if (python.death()) {
      gameOverBro();
    } else {
      if (python.gnomGnom(balon)) {
        score++;
        python.touchBall = true;
        do {
          balon.setNewPosition();
        } while (balon.touchSnake(python));
      }
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      displayScore();
      python.draw();
      balon.draw();

      setTimeout(reloadCanvas, delay);
    }
  }

  // --fin de la partie--
  function gameOverBro() {
    context.save();

    context.font = "bold 70px sans-serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "midlle";
    context.strokeStyle = "white";
    context.lineWidth = 5;
    let middleX = canvas.width / 2;
    let middleY = canvas.height / 2;
    context.strokeText(" GAME OVER !!!", middleX, middleY - 180);
    context.fillText(" GAME OVER !!!", middleX, middleY - 180);
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

  // --recommencez la partie--
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

  // --affichage score--
  function displayScore() {
    context.save();

    context.font = "bold 150px sans-serif";
    context.fillStyle = "gray";
    context.textAlign = "center";
    context.textBaseline = "midlle";
    let middleX = canvas.width / 2;
    let middleY = canvas.height / 2;
    context.fillText(score.toString(), middleX, middleY);

    context.restore();
  }

  // --encadrement--
  function drawBlock(context, position) {
    let x = position[0] * blockSize;
    let y = position[1] * blockSize;
    context.fillRect(x, y, blockSize, blockSize);
  }

  // --les deux grosses fonctions--
  function Snake(body, direction) {
    this.body = body;
    this.direction = direction;
    this.touchBall = false;
    this.draw = function () {
      context.save();

      context.fillStyle = "#008000";
      for (let i = 0; i < this.body.length; i++) {
        drawBlock(context, this.body[i]);
      }

      context.restore();
    };
    this.growUp = function () {
      let newPosition = this.body[0].slice();
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
      let authorizedDirection;
      switch (this.direction) {
        case "left":
        case "right":
          authorizedDirection = ["up", "down"];
          break;

        case "down":
        case "up":
          authorizedDirection = ["right", "left"];
          break;
        default:
          throw "mauvaise direction";
      }
      if (authorizedDirection.indexOf(newDirection) > -1) {
        this.direction = newDirection;
      }
    };
    this.death = function () {
      let wall = false;
      let snakeBody = false;
      let snakeHead = this.body[0];
      let snakeRestBody = this.body.slice(1);
      let xCoordSnakeHead = snakeHead[0];
      let yCoordSnakeHead = snakeHead[1];
      let xMinSnakeHead = 0;
      let yMinSnakeHead = 0;
      let xMaxSnakeHead = canvasWidthInBlocks - 1;
      let yMaxSnakeHead = canvasHeightInBlocks - 1;
      let collisionWithVerticalWall =
        xCoordSnakeHead < xMinSnakeHead || xCoordSnakeHead > xMaxSnakeHead;
      let collisionWithHorizontalWall =
        yCoordSnakeHead < yMinSnakeHead || yCoordSnakeHead > yMaxSnakeHead;

      if (collisionWithVerticalWall || collisionWithHorizontalWall) {
        wall = true;
      }

      for (let i = 0; i < snakeRestBody.length; i++) {
        if (
          xCoordSnakeHead === snakeRestBody[i][0] &&
          yCoordSnakeHead === snakeRestBody[i][1]
        ) {
          snakeBody = true;
        }
      }
      return wall || snakeBody;
    };
    // gnomGnom fantastic name for function "is eating ball "?
    this.gnomGnom = function (eatBall) {
      let snakeHead = this.body[0];
      if (
        snakeHead[0] === eatBall.position[0] &&
        snakeHead[1] === eatBall.position[1]
      ) {
        return true;
      } else return false;
    };
  }

  function Ball(position) {
    this.position = position;
    this.draw = function () {
      context.save();

      context.fillStyle = "#B0C4DE";
      context.beginPath();
      let rayon = blockSize / 2;
      let x = this.position[0] * blockSize + rayon;
      let y = this.position[1] * blockSize + rayon;
      context.arc(x, y, rayon, 0, Math.PI * 2, true);
      context.fill();

      context.restore();
    };
    this.setNewPosition = function () {
      let newX = Math.round(Math.random() * (canvasWidthInBlocks - 1));
      let newY = Math.round(Math.random() * (canvasHeightInBlocks - 1));
      this.position = [newX, newY];
    };
    this.touchSnake = function (snakeCheck) {
      let touchSnake = false;

      for (let i = 0; i < snakeCheck.body.length; i++)
        if (
          this.position[0] === snakeCheck.body[i][0] &&
          this.position[1] === snakeCheck.body[i][1]
        ) {
          touchSnake = true;
        }
      return touchSnake;
    };
  }

  // --interaction avec le moche derriere l'ecran (coucou soph si tu lis ça <3)--
  document.onkeydown = function pressKey(e) {
    let keybinds = e.keyCode;
    let newDirection;
    switch (keybinds) {
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
  };
};
