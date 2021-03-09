/* When the start button is clicked:
A timer is started
The user is presented with a question
When the user answers the question he's presented another question
If a question is answered incorrectly 10 seconds is subtracted from the clock
When all questions have been answered or timer equals 0, the game is over.
When the game is over user saves initials and score */

var timer = document.querySelector("#timer");
var questions = document.querySelector("#questions");
var answers = document.querySelector("#answers");
var startButton = document.querySelector("#start-button");

var secondsLeft = 60;

// Set a timer to start quiz button is clicked
function startTimer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time: :" + secondsLeft;

    if (secondsLeft === 0) {
      //Stops execution of action at set interval
      clearInterval(timerInterval);
      //Calls function to create and append image
      //sendMessage();
    }
  }, 1000);
}

//Generate random questions for the user to answer
function startQuiz() {}
//End the game when time is 0 or all questions are answered
function gameOver() {}
//Save the results to local storage
function saveResults() {}

startTimer();
