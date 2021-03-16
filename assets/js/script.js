/* 1. set element to show high Scores
   2. go button to restart quiz
   3. keep new high score
   4. clear high score*/

//

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
var showHighScore = document.querySelector("#show-highScore");
var secondsLeft = 60;
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
    question: "What is HTML?",
    answers: [
      "1.  The markup language that we use to structure and give meaning to our web content.",
      "2.  A language of style rules that we use to apply styling to web content",
      "3.  A is a scripting language that enables you to create and dynamically update web content,",
      "4.  None of the above",
    ],

    correctAnswer:
      "1.  The markup language that we use to structure and give meaning to our web content.",
  },
  {
    question: "Which of the following is not a backend programming language?",
    answers: ["1.  Python", "2.  PHP", "3.  Java", "4.  CSS"],
    correctAnswer: "4.  CSS",
  },
  {
    question:
      "A local variable's scope can be used in statements from other functions",
    answers: ["1.  True", "2.  False"],

    correctAnswer: "2.  False",
  },
  {
    question: "CSS is a language used to style HTML.",
    answers: ["1.  True", "2.  False"],
    correctAnswer: "4",
  },
];
// Set a timer to start quiz button is clicked

function startTimer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time : " + secondsLeft;

    if (secondsLeft <= 0) {
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
    window.location.reload();
  });
}

clearButton.addEventListener("click", function () {
  localStorage.removeItem(initials, yourScore);
  showHighScore.textContent = " ";
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
  para.className = "questionPara";
  para.textContent = quizQuestions[currentQuestion].question;
  answers.appendChild(para);

  // Loop through answer choices and add to page as buttons
  for (var i = 0; i < quizQuestions[currentQuestion].answers.length; i++) {
    var answerChoices = quizQuestions[currentQuestion].answers[i];
    newButton = document.createElement("button");
    var nextLine = document.createElement("br");
    newButton.className = "newButton";
    newButton.textContent = answerChoices;
    // add event listener and add functionality to correct incorrect responses
    newButton.addEventListener("click", function (event) {
      if (
        quizQuestions[currentQuestion].correctAnswer ===
        event.target.textContent
      ) {
        yourScore = yourScore + 25;
        alert("Correct");
      } else {
        secondsLeft -= 10;
        alert("Incorrect");
      }
      currentQuestion++;
      answers.innerHTML = "";
      quizBuilder();
    });
    answers.appendChild(newButton);
    answers.appendChild(nextLine);
  }
}
//End the game when time is 0 or all questions are answered
function gameOver() {
  if (secondsLeft < 0) {
    timer.textContent = "Time : " + "Sorry your out of Time!!!!!";
  }
  answers.style.display = "none";
  score.textContent = yourScore;
  results.style.display = "block";
}

//Save the results to local storage
function saveResults() {
  if (yourScore < 100) {
    yourScore += yourScore;
    //score.textContent = yourScore;
    //localStorage.setItem("Your Score", yourScore);
    document.querySelector("form").onsubmit = function (e) {
      e.preventDefault();
      var initialsLocal = document.querySelector("#initials").value;
      initials = initialsLocal;
      localStorage.setItem(initialsLocal, yourScore);
      console.log(localStorage);
      results.style.display = "none";
      showHighScore.textContent = " " + initialsLocal + " " + yourScore;
      highScore.style.display = "block";
      score.textContent = yourScore;
    };
  }
}
startQuiz();
restartQuiz();
