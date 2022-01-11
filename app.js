// **** Element selectors ****

const question_div = document.querySelector(".question-container");
const question_h3 = document.querySelector(".question")
const choices_list = document.querySelector(".choices");
const choice_items = document.querySelectorAll(".choice");
const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
const highscoreBtn = document.querySelector(".highscore-toggle");
const score_p = document.querySelector(".score");
const timer_p = document.querySelector(".timer");
const highscores_div = document.querySelector(".highscore-container");
const scores_list = document.querySelector(".scores");

// **** Global Variables ****

const questions = [
  {
    question: "What are the three ways to declare a variable in JavaScript?",
    choices: [
      "var, bet, set",
      "var, let, const",
      "var, bar, car",
      "var, this, that"
    ],
    answer: "B"
  },
  {
    question: "Which HTML element will size it's text the largest? (with no styles other than default)",
    choices: [
      "h4",
      "h3",
      "h20",
      "h1"
    ],
    answer: "D"
  },
  {
    question: "What CSS property can be used to change the text-color within an HTML element?",
    choices: [
      "background-color",
      "color",
      "text",
      "set-color"
    ],
    answer: "B"
  },
  {
    question: "Which HTML element has default styles that make it appear pressed down when clicked?",
    choices: [
      "button",
      "form",
      "input",
      "header"
    ],
    answer: "A"
  },
  {
    question: "What syntax is used to declare a variable and set it to an empty array in JavaScript?",
    choices: [
      "var = {}",
      "{}",
      "var = []",
      "var[]"
    ],
    answer: "C"
  }
]
let count = 0;
let userChoice;
let score = 0;
let initials;
let highscoresArray = [];

// **** Timer ****

let timerId;
let timeLeft = 10;
timer_p.textContent = timeLeft;

// **** Event Listeners ****

window.addEventListener("DOMContentLoaded", setLocalStorage)

// buttons

startBtn.addEventListener("click", function (e) {
  resetQuiz();
  timerId = setInterval(function () {
    timeLeft--;
    timer_p.textContent = timeLeft;
    if (timeLeft === 0) {
      console.log("time's up!")
      score += timeLeft;
      addScore(`${initials}: ${score}`)
      resetVals();
      question_div.classList.add("hide");
    }
  }, 1000)
})

resetBtn.addEventListener("click", function () {
  resetQuiz();
})

highscoreBtn.addEventListener("click", function () {
  highscores_div.classList.toggle("hide");
})

// Multiple choice questions

choices_list.addEventListener("click", function (e) {
  userChoice = e.target.dataset.letter;
  checkAnswer();
  if (count === questions.length - 1) {
    score += timeLeft;
    initialsPrompt();
    highscoresArray.push(`${initials}: ${score}`);
    addScore(highscoresArray);
    setLocalStorage();
    resetVals();
    question_div.classList.add("hide");
  } else {
    count++;
    setQuestion();
  }
})

// **** Local Storage ****

function setLocalStorage() {
  localStorage.setItem("highscores", highscoresArray);
}

function getLocalStorage() {
  highscoresArray = localStorage.getItem("highscores");
}

function clearLocalStorage() {
  localStorage.clear();
}
getLocalStorage();
console.log(highscoresArray);


// **** Functions ****

function setQuestion() {

  question_h3.textContent = questions[count].question;
  choice_items.forEach(function (item, index) {
    item.textContent = questions[count].choices[index];
  })
  score_p.textContent = score;
}

function checkAnswer() {
  if (userChoice === questions[count].answer) {
    console.log("correct!");
    score++;
  } else {
    console.log("incorrect!");
  }
}

function resetQuiz() {
  resetVals();
  score_p.textContent = score;
  highscores_div.classList.add("hide");
  question_div.classList.remove("hide");
  setQuestion();
}

function resetVals() {
  count = 0;
  userChoice;
  score = 0;
  timeLeft = 10;
  timer_p.textContent = timeLeft;
  clearInterval(timerId);
}

function addScore(array) {
  for (let i = 0; i < array.length; i++) {
    let newScore = document.createElement("li");
    let name = document.createTextNode(array[i]);
    newScore.appendChild(name);
    scores_list.appendChild(newScore);
    highscores_div.classList.remove("hide");
  }
}

function initialsPrompt() {
  if (!initials) {
    initials = prompt("Enter your initials");
  } else if (!confirm("Use same initials?")) {
    initials = prompt("enter new initials");
  }
}