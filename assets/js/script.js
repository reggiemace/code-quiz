/* When the start button is clicked:
A timer is started
The user is presented with a question
When the user answers the question he's presented another question
If a question is answered incorrectly 10 seconds is subtracted from the clock
When all questions have been answered or timer equals 0, the game is over.
When the game is over user saves initials and score */

var timer = document.querySelector("#timer");
var instructions = document.querySelector("#instructions");
var questions = document.querySelector("#questions");
var answers = document.querySelector("#answers");
var startButton = document.querySelector("#start-button");
var results = document.querySelector("#results");
var score = document.querySelector("#score");
var highScore = document.querySelector("#highScores");
var restartButton = document.querySelector("#restart");
var resetButton = document.querySelector("#reset");
var initials = document.querySelector("#initials");
var secondsLeft = 60;

var yourScore = localStorage.getItem("yourScore");

score.textContent = yourScore;

// Hide results and high score section of page until page is loaded
window.onload = function () {
  results.style.display = "none";
  highScore.style.display = "none";
};

const quizQuestions = [
  {
    question: "What is 1 + 0",
    answers: {
      a: "1",
      b: "2",
      c: "3",
      d: "4",
    },
    correctAnswer: "a",
  },
  {
    question: "What is 1 + 1",
    answers: {
      a: "1",
      b: "2",
      c: "3",
      d: "4",
    },
    correctAnswer: "b",
  },
  {
    question: "What is 1 + 2",
    answers: {
      a: "1",
      b: "2",
      c: "3",
      d: "4",
    },
    correctAnswer: "c",
  },
  {
    question: "What is 1 + 3",
    answers: {
      a: "1",
      b: "2",
      c: "3",
      d: "4",
    },
    correctAnswer: "4",
  },
];
// Set a timer to start quiz button is clicked

function startTimer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time: :" + secondsLeft;

    if (secondsLeft === 0) {
      gameOver();
      //Stops execution of action at set interval
      clearInterval(timerInterval);
      //Calls function to create and append image
      //sendMessage();
    }
  }, 100);
}
function restartQuiz() {
  restartButton.addEventListener("click", function () {
    console.log("button Clicked");
  });
}

resetButton.addEventListener("click", function () {
  localStorage.removeItem(initials, yourScore);
  //score.textContent = " ";
});

//Generate random questions for the user to answer
function startQuiz() {
  startButton.addEventListener("click", function () {
    startTimer();
    startButton.style.display = "none";
    instructions.style.display = "none";
    quizBuilder();
    saveResults();
  });
}

//Build Questions for the Quiz
function quizBuilder() {
  var newButton;
  for (var i = 0; i < quizQuestions.length; i++) {
    var answerChoices = answers[i];
    newButton = document.createElement("button");
    var nextLine = document.createElement("br");
    newButton.style.width = "100%";
    newButton.style.height = "30px";
    newButton.className = i + 1;
    newButton.textContent = answerChoices + " " + i;
    newButton.setAttribute(answerChoices, i);
    answers.appendChild(newButton);
    answers.appendChild(nextLine);
  }
  //gameOver();
}

//End the game when time is 0 or all questions are answered
function gameOver() {
  answers.style.display = "none";
  results.style.display = "block";
}

//Save the results to local storage
function saveResults() {
  if (yourScore < 1000) {
    yourScore++;
    score.textContent = yourScore;
    //localStorage.setItem("Your Score", yourScore);
    document.querySelector("form").onsubmit = function (e) {
      e.preventDefault();
      var initialsLocal = document.querySelector("#initials").value;
      //initials = initials.getItem.textContent;
      initials = initialsLocal;
      localStorage.setItem(initialsLocal, yourScore);
      console.log(localStorage);
      results.style.display = "none";
      highScore.style.display = "block";
    };
  }
}

startQuiz();
//restartQuiz();
