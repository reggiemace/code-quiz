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
var goBackButton = document.querySelector("#goBack");
var clearButton = document.querySelector("#clear");
var initials = document.querySelector("#initials");
var questionResult = document.querySelector("#questionResult");
var secondsLeft = 60;
var letterChoices = ["a", "b", "c", "d"];
var currentQuestion = 0;

var yourScore = localStorage.getItem("yourScore");

score.textContent = yourScore;

// Hide results and high score section of page until page is loaded
window.onload = function () {
  results.style.display = "none";
  highScore.style.display = "none";
  questionResult.style.display = "none";
};

const quizQuestions = [
  {
    question: "What is 1 + 0",
    answers: ["1", "2", "3", "4"],

    correctAnswer: "1",
  },
  {
    question: "What is 1 + 1",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },
  {
    question: "What is 1 + 2",
    answers: ["1", "2", "3", "4"],

    correctAnswer: "3",
  },
  {
    question: "What is 1 + 3",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "4",
  },
];
// Set a timer to start quiz button is clicked

function startTimer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time : " + secondsLeft;

    if (secondsLeft === 0) {
      gameOver();
      //Stops execution of action at set interval
      clearInterval(timerInterval);
      //Calls function to create and append image
      //sendMessage();
    }
  }, 200);
}
function restartQuiz() {
  goBackButton.addEventListener("click", function () {
    console.log("button Clicked");
  });
}

clearButton.addEventListener("click", function () {
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
  var para = document.createElement("p");
  para.textContent = quizQuestions[currentQuestion].question;
  answers.appendChild(para);

  for (var i = 0; i < quizQuestions[currentQuestion].answers.length; i++) {
    var answerChoices = quizQuestions[currentQuestion].answers[i];
    newButton = document.createElement("button");

    var nextLine = document.createElement("br");
    newButton.className = "newButton";
    newButton.textContent = answerChoices;
    newButton.addEventListener("click", function (event) {
      if (
        quizQuestions[currentQuestion].correctAnswer ===
        event.target.textContent
      ) {
        yourScore = yourScore + 20;
        questionResult.style.display = "visible";
        questionResult.textContent = "Correct";
      } else {
        secondsLeft -= 10;
        questionResult.textContent = "Incorrect";
        questionResult.style.display = "visible";
      }
      currentQuestion++;
      answers.innerHTML = "";
      quizBuilder();
    });

    answers.appendChild(newButton);
    answers.appendChild(nextLine);
  }
}
//gameOver();

//End the game when time is 0 or all questions are answered
function gameOver() {
  answers.style.display = "none";
  results.style.display = "block";
}

//Save the results to local storage
function saveResults() {
  if (yourScore < 100) {
    yourScore += yourScore;
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
restartQuiz();
