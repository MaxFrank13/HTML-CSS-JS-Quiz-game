// **** Element selectors ****

const question_div = document.querySelector(".question-container");
const question_h3 = document.querySelector(".question")
const choices_list = document.querySelector(".choices");
const choice_items = document.querySelectorAll(".choice");
const startBtn = document.querySelector(".start");
// const resetBtn = document.querySelector(".reset");
const highscoreBtn = document.querySelector(".highscore-toggle");
const score_p = document.querySelector(".score");
const timer_p = document.querySelector(".timer");
const highscores_div = document.querySelector(".highscore-container");
const scoresList = document.querySelector(".scores");
const savedScores = document.querySelectorAll(".entry");

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

// **** Event Listeners ****

window.addEventListener("DOMContentLoaded", function() {
  getLocalStorage();
  timer_p.textContent = timeLeft;
  score_p.textContent = score;
});

// buttons

startBtn.addEventListener("click", function (e) {
  resetQuiz();
  timerId = setInterval(function () {
    timeLeft--;
    timer_p.textContent = timeLeft;
    if (timeLeft === 0) {
      console.log("time's up!")
      setScores();
    }
  }, 1000)
})

// resetBtn.addEventListener("click", function () {
//   resetQuiz();
// })

highscoreBtn.addEventListener("click", function () {
  highscores_div.classList.toggle("hide");
})

// Multiple choice questions

choices_list.addEventListener("click", function (e) {
  userChoice = e.target.dataset.letter;
  checkAnswer();
  if (count === questions.length - 1) {
    setScores();
  } else {
    count++;
    setQuestion();
  }
})

// **** Local Storage ****

function setLocalStorage() {
  localStorage.setItem("highscores", JSON.stringify(highscoresArray));
}

function getLocalStorage() {
  if (localStorage.getItem("highscores")) {
    highscoresArray = JSON.parse(localStorage.getItem("highscores"));
    renderScores(highscoresArray);
  }
}

function clearLocalStorage() {
  localStorage.clear();
}

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
    score += 5;
    timeLeft++;
  } else {
    console.log("incorrect!");
    timeLeft--;
    score--;
  }
}

function resetQuiz() {
  clearInterval(timerId);
  resetVals();
  highscores_div.classList.add("hide");
  question_div.classList.remove("hide");
  setQuestion();
}

function resetVals() {
  count = 0;
  userChoice;
  score = 0;
  score_p.textContent = score;
  timeLeft = 10;
  timer_p.textContent = timeLeft;
}


function renderScores(object) {
  scoresList.innerHTML = "";
  for (let i = 0; i < object.length; i++) {
    let newScore = document.createElement("li");
    let entry = document.createTextNode(`${object[i].name} ${object[i].number}`);
    newScore.appendChild(entry);
    newScore.classList.add("entry");
    scoresList.appendChild(newScore);
  }
}

function sortScores(record) {
  if (highscoresArray.length === 0) {
    return highscoresArray.push(record);
  }
  const arrayLength = highscoresArray.length;
  for (let i = 0; i < arrayLength; i++) {
    if (record.number > highscoresArray[i].number) {
      return highscoresArray.splice(i, 0, record);
    }
  }
  return highscoresArray.push(record);
}

function initialsPrompt() {
  if (!initials) {
    initials = prompt("Enter your initials");
  } else if (!confirm("Use same initials?")) {
    initials = prompt("enter new initials");
  }
}

function setScores() {
  clearInterval(timerId);
  question_div.classList.add("hide")
  score += timeLeft;
  score_p.textContent = score;
  setTimeout(function () {
    initialsPrompt();
    let record = {
      name: initials,
      number: score
    }
    sortScores(record);
    renderScores(highscoresArray);
    setLocalStorage();
    resetVals();
    highscores_div.classList.remove("hide");
  }, 500);
}
