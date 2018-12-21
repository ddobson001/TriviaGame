$(document).ready(function () {
  $("#start").on('click', quiz);
  $("#submit").hide();
  $("#retry").hide();
  $("#timer").hide();
  $("#timeLeft").hide();
})


let numCorrect = 0;
let numIncorrect = 0; 



function quiz() {
  $("#start").hide();
  $("#submit").show();
  $("#timer").show();
  $("#timeLeft").show();


  let count = 60;
  timer = setInterval(function () {
    $("#timer").text(count--);

    if (count == -1) {
      clearInterval(timer);
      showResults();
      document.getElementById("timer").innerHTML = "TIMES UP!";
      $("#retry").show();
    }
  }, 1000);

  const output = [];
  
  myQuestions.forEach((currentQuestion, questionNumber) => {

    const answers = [];


    for (letter in currentQuestion.answers) {

      answers.push(
        `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
      );
    }


    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
    );
  });



  quizContainer.innerHTML = output.join("");
};
///Show Results of Quiz///
function showResults() {

  const answerContainers = quizContainer.querySelectorAll(".answers");




  myQuestions.forEach((currentQuestion, questionNumber) => {

    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;



    if (userAnswer === currentQuestion.correctAnswer) {

      numCorrect++;


      answerContainers[questionNumber].style.color = "lightgreen";
    } else if (userAnswer !== currentQuestion.correctAnswer) {

      answerContainers[questionNumber].style.color = "red";

      numIncorrect++;
    }

    $("#retry").show();
    $("#correctAnswer").show();
    $("#incorrectAnswer").show();

  });
  $("#correctAnswer").text("CorrectAnswer" + " " + numCorrect);
  $("#incorrectAnswer").text("IncorrectAnswer" + " " + numIncorrect);
  
 // resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}
////Questions/////
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("correctAnswer");
const submitButton = document.getElementById("submit");
const tryAgainButton = document.getElementById("retry");
const myQuestions = [
  {
    question: "Question 1: What is the best-selling Nintendo exclusive game of all time?",
    answers: {
      a: "Duck Hunt",
      b: "Super Mario Bros.",
      c: "Wii Sports",
      d: "Mario Kart Wii"
    },
    correctAnswer: "c"
  },
  {
    question: "Question 2: Which of the following games did Mario creator Shigeru Miyamoto NOT design?",
    answers: {
      a: "Donkey Kong",
      b: "Excitebike",
      c: "Kid Icarus",
      d: "The Legend of Zelda"
    },
    correctAnswer: "c"
  },
  {
    question: "Question 3: What is the first game with Princess Zelda as a playable character?",
    answers: {
      a: "The Legend of Zelda: Ocarina of Time",
      b: "Super Smash Bros. Melee",
      c: "Super Smash Bros. Brawl",
      d: "Zelda: Wand of Gamelon"
    },
    correctAnswer: "d"
  },
  {
    question: "Question 4: What is the best-selling Nintendo handheld of all time?",
    answers: {
      a: "Nintendo Game Boy",
      b: "Nintendo Game Boy Advance",
      c: "Nintendo DS",
      d: "Nintendo 3DS",
    },
    correctAnswer: "c"
  },
  {
    question: "Question 5: Which pro baseball team did Nintendo become majority owner of in 1992?",
    answers: {
      a: "Seattle Mariners",
      b: "Oakland Athletics",
      c: "Kansas City Royals",
      d: "Tampa Bay Rays",
    },
    correctAnswer: "a"
  },
  {
    question: "Question 6: Which Nintendo game caused enough injuries in children to result in a $80M settlement?",
    answers: {
      a: "Tony Hawk's Pro Skater",
      b: "Super Smash Bros.",
      c: "Mario Kart 64",
      d: "Mario Party",
    },
    correctAnswer: "d"
  },
  {
    question: "Question 7: What is the first Nintendo game to feature Mario in it?",
    answers: {
      a: "Mario Bros.",
      b: "Tennis",
      c: "Donkey Kong",
      d: "Wrecking Crew",
    },
    correctAnswer: "c"
  },
  {
    question: "Question 8: What is the name of Nintendo's first-ever 'Game & Watch' title?",
    answers: {
      a: "Ball",
      b: "Oil Panic",
      c: "Egg",
      d: "Mario Bros.",
    },
    correctAnswer: "a"
  },
  {
    question: "Question 9: Which film inspired the enemies in Nintendo's Metroid series?",
    answers: {
      a: "Star Wars",
      b: "Galaxy of Terror",
      c: "Predator",
      d: "Alien",
    },
    correctAnswer: "d"
  },
  {
    question: "Question 10: What was the first NES game to use the Konami Code?",
    answers: {
      a: "Contra",
      b: "R-Type",
      c: "Gradius",
      d: "Life Force",
    },
    correctAnswer: "b"
  },
  {
    question: "Question 11: What was Nintendo's original line of business when the company was founded in 1889?",
    answers: {
      a: "Playing Cards",
      b: "Instant Rice",
      c: "Taxi Company",
      d: "Love Hotels"
    },
    correctAnswer: "a"
  },
  {
    question: "Question 12: What was the first SNES game to use the Super FX chip?",
    answers: {
      a: "Pilotwings",
      b: "Star Fox",
      c: "Doom",
      d: "Super Mario World 2: Yoshi's Island",
    },
    correctAnswer: "b"
  },

  
];
function restartGame (){
quiz();
$("#retry").hide();
$("#correctAnswer").hide();
$("#incorrectAnswer").hide();
numCorrect = 0;
numIncorrect = 0;
};

// on submit, show correctAnswer
submitButton.addEventListener("click", showResults);

///restart game///
tryAgainButton.addEventListener("click", restartGame );
