const elements = {
  startButton: document.getElementById("start-btn"),
  nextButton: document.getElementById("next-btn"),
  questionContainer: document.getElementById("question-container"),
  question: document.getElementById("question"),
  answerButtons: document.getElementById("answer-buttons"),
  scoreValue: document.getElementById("score-value"),
  scoreScreen: document.getElementById("score-screen"),
  finalScore: document.getElementById("final-score"),
};

let totalQuestions,
  shuffledQuestions,
  currentQuestionIndex,
  score = 0;

elements.startButton.addEventListener("click", startGame);

function startGame() {
  elements.startButton.classList.add("hide");
  fetchQuestionsFromJSON();
}

function fetchQuestionsFromJSON() {
  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      totalQuestions = data.length;
      shuffledQuestions = data.sort(() => Math.random() - 0.5);
      currentQuestionIndex = 0;
      score = 0;
      updateScore();
      elements.questionContainer.classList.remove("hide");
      setNextQuestion();
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors du chargement des questions :",
        error
      );
    });
}

elements.nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    setNextQuestion();
  } else {
    showFinalScore();
  }
});

function updateScore() {
  elements.scoreValue.innerText = `${score} / ${totalQuestions}`;
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  elements.question.innerText = question.question;
  elements.answerButtons.innerHTML = ""; // Clear previous answers
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    elements.answerButtons.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  elements.nextButton.classList.add("hide");
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++;
  }
  setStatusClass(document.body, correct);
  Array.from(elements.answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    elements.nextButton.classList.remove("hide");
  } else {
    elements.startButton.innerText = "Recommencer";
    elements.startButton.classList.remove("hide");
  }
  updateScore();
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function showFinalScore() {
  elements.questionContainer.classList.add("hide");
  elements.answerButtons.classList.add("hide");
  elements.nextButton.classList.add("hide");
  elements.startButton.classList.add("hide");
  elements.scoreScreen.classList.remove("hide");
  elements.finalScore.innerText = `Votre score final : ${score} / ${totalQuestions}`;
}
