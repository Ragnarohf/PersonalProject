const elements = {
  startButton: document.getElementById("start-btn"),
  nextButton: document.getElementById("next-btn"),
  questionContainer: document.getElementById("question-container"),
  question: document.getElementById("question"),
  answerButtons: document.getElementById("answer-buttons"),
  score: document.getElementById("score"),
  scoreValue: document.getElementById("score-value"),
  scoreScreen: document.getElementById("score-screen"),
  finalScore: document.getElementById("final-score"),
  restartButton: document.getElementById("restart-btn"),
};

const questions = [
  {
    question: "Combien vaut l'opération 2+2 ?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Combien y a-t-il de pierres d'infinité dans le MCU ?",
    answers: [
      { text: "6", correct: true },
      { text: "8", correct: false },
      { text: "10", correct: false },
      { text: "12", correct: false },
    ],
  },
  {
    question: "Le développement web est-il amusant ?",
    answers: [
      { text: "Un peu", correct: false },
      { text: "OUI !!!", correct: true },
      { text: "Euh non", correct: false },
      { text: "ne se prononce pas", correct: false },
    ],
  },
  {
    question: "Combien vaut l'opération 4 * 2 ?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true },
    ],
  },
];

let totalQuestions = questions.length;
let shuffledQuestions, currentQuestionIndex;
let score = 0;

elements.startButton.addEventListener("click", startGame);
elements.nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function updateScore() {
  elements.scoreValue.innerText = `${score} / ${totalQuestions}`;
}

function startGame() {
  elements.startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  updateScore();
  elements.questionContainer.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    showFinalScore();
  }
}

function showQuestion(question) {
  elements.question.innerText = question.question;
  question.answers.forEach((answer, index) => {
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
  while (elements.answerButtons.firstChild) {
    elements.answerButtons.removeChild(elements.answerButtons.firstChild);
  }
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
  elements.scoreScreen.classList.remove("hide");
  elements.finalScore.innerText = `${score} / ${totalQuestions}`;
}
