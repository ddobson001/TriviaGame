$(document).ready(function () {
  $("#start").on('click', quiz);
  $("#submit").hide();
  $("#retry").hide();
  $("#timer").hide();
})


let numCorrect = 0;
let numIncorrect = 0; 

function quiz() {
  $("#start").hide();
  $("#submit").show();
  $("#timer").show();

  let count = 2;
  timer = setInterval(function () {
    $("#timer").html(count--);

    if (count == -1) {
      clearInterval(timer);
     
      document.getElementById("timer").innerHTML = "TIMES UP!";
      $("#retry").show();
    };
    
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
  $("#incorrectAnswer").text("CorrectAnswer" + " " + numIncorrect);
  
 // resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}
////Questions/////
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("correctAnswer");
const submitButton = document.getElementById("submit");
const tryAgainButton = document.getElementById("retry");
const myQuestions = [
  {
    question: "Who is the strongest?",
    answers: {
      a: "Superman",
      b: "The Terminator",
      c: "Waluigi, obviously"
    },
    correctAnswer: "c"
  },
  {
    question: "What is the best site ever created?",
    answers: {
      a: "SitePoint",
      b: "Simple Steps Code",
      c: "Trick question; they're both the best"
    },
    correctAnswer: "c"
  },
  {
    question: "Where is Waldo really?",
    answers: {
      a: "Antarctica",
      b: "Exploring the Pacific Ocean",
      c: "Sitting in a tree",
      d: "Minding his own business, so stop asking"
    },
    correctAnswer: "d"
  }
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

