// questions, choices, answers array
const questions = [
  {
    questionText: "Question 1 asked here",
    choices: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    questionText: "Question 2 asked here",
    choices: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    questionText: "Question 3 asked here",
    choices: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    questionText: "Question 4 sked here",
    choices: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    questionText: "Question 5 asked here",
    choices: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    questionText: "Question 6 asked here",
    choices: ["A", "B", "C", "D"],
    answer: "A",
  },
];

// variables
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const scoreScreen = document.getElementById("score-screen");
const highScoreScreen = document.getElementById("high-score-screen");
var intervalID;
var time;
var currentQuestion;

// default setting - all screens hidden
function hideScreens() {
  startScreen.setAttribute("hidden", true);
  questionScreen.setAttribute("hidden", true);
  scoreScreen.setAttribute("hidden", true);
  highScoreScreen.setAttribute("hidden", true);
}

const resultBox = document.getElementById("result-box");
const resultText = document.getElementById("result-text");

// hide results
function hideResultText() {
  resultBox.style.display = "none";
}

// go to question screen when start is clicked
document.getElementById("start-button").addEventListener("click", startQuiz);

function startQuiz() {
  hideScreens();
  questionScreen.removeAttribute("hidden");

// assign 0 to currentQuestion when start button is clicked, then display the current question on the page
  currentQuestion = 0;
  displayQuestion();

  // initial timer
  time = 60;

  // update time by one second and display on page
  intervalID = setInterval(countdown, 1000);

  displayTime();
}

function countdown() {
  time--;
  displayTime();
  if (time < 1) {
    endQuiz();
  }
}

const timeDisplay = document.getElementById("time");
function displayTime() {
  timeDisplay.textContent = time;
}

// display question and answer choices for the current question
function displayQuestion() {
  let question = questions[currentQuestion];
  let choices = question.choices;

  let h2QuestionEl = document.getElementById("question-text");
  h2QuestionEl.textContent = question.questionText;

  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i];
    let choiceButton = document.querySelector("#choice" + i);
    choiceButton.textContent = choice;
  }
}

// identify which choice button was clicked
document.getElementById("answer-choices").addEventListener("click", checkAnswer);

// Check choice against answer
function choiceIsCorrect(choiceButton) {
  return choiceButton.textContent === questions[currentQuestion].answer;
}

// -10 seconds for an incorrect answer
function checkAnswer(eventObject) {
  let choiceButton = eventObject.target;
  resultBox.style.display = "block";
  if (choiceIsCorrect(choiceButton)) {
    resultText.textContent = "Correct!";
    setTimeout(hideResultText, 1000);
  } else {
    resultText.textContent = "Incorrect!";
    setTimeout(hideResultText, 1000);
    if (time >= 10) {
      time = time - 10;
      displayTime();
    } else {
  
  // prevent negative time
      time = 0;
      displayTime();
      endQuiz();
    }
  }

  // next question
  currentQuestion++;
  // cycle through all questions then end quiz
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// clear time and show only score screen
const score = document.getElementById("score");

function endQuiz() {
  clearInterval(intervalID);

  hideScreens();
  scoreScreen.removeAttribute("hidden");

// score is time remaining
  score.textContent = time;
  displayTime();
}

// user inputs initials and submit stores
const submitButton = document.getElementById("submit-button");


submitButton.addEventListener("click", function(event) {

// stop refresh
 event.preventDefault();
 const inputElement = document.getElementById("initials");
  // check for user input
  if (!inputElement.value) {
    alert("Please enter your initials and press submit!");
    return;
  }

  // store score and initials
  let highScoreItem = {
    initials: inputElement.value,
    score: time,
  };

  updateStoredHighScore(highScoreItem);

  // display the high scores
  hideScreens();
  highScoreScreen.removeAttribute("hidden");

  renderHighScore();
});


// updates the high score in local storage
function updateStoredHighScore(highScoreItem) {
  let highScoreArray = getHighScore();
  // add new high score input to local storage
  highScoreArray.push(highScoreItem);
  localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
  time = 60;
  displayTime();
}

// parse any existing items in highScoreArray with JSON
function getHighScore() {
  let storedHighScore = localStorage.getItem("highScoreArray");
  if (storedHighScore !== null) {
    let highScoreArray = JSON.parse(storedHighScore);
    return highScoreArray;
  } else {
    highScoreArray = [];
  }
  return highScoreArray;
}

// display high score
function renderHighScore() {
  let sortedHighScoreArray = sortHighScore();
  const highScoreList = document.getElementById("high-score-list");
  highScoreList.innerHTML = "";
  for (let i = 0; i < sortedHighScoreArray.length; i++) {
    let highScoreEntry = sortedHighScoreArray[i];
    let newListItem = document.createElement("li");
    newListItem.textContent =
      highScoreEntry.initials + " - " + highScoreEntry.score;
    highScoreList.append(newListItem);
  }
}

//sort high scores from highest to lowest
function sortHighScore() {
  let highScoreArray = getHighScore();
  if (!highScoreArray) {
    return;
  }

  highScoreArray.sort(function (a, b) {
    return b.score - a.score;
  });
  return highScoreArray;
}

// clear high scores displayed
const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", function(event) {

  localStorage.clear();
  renderHighScore();
});  

const backButton = document.getElementById("back-button");
backButton.addEventListener("click", function(event) {
  hideScreens();
  startScreen.removeAttribute("hidden");
});
  

// static high score link
const highScoreLink = document.getElementById("high-score-link");
highScoreLink.addEventListener("click", function(event) {
  hideScreens();
  highScoreScreen.removeAttribute("hidden");

  // clear countdown and remove remaining time from top corner
  clearInterval(intervalID);

  time = undefined;
  displayTime();

// display  high score
  renderHighScore();
});

  

