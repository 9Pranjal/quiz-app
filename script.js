// Questions

const questions = [
{
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<a>", "<p>", "<h1>"],
    answer: "<a>"
},
{
    question: "Which HTML tag represents the main heading?",
    options: ["<h6>", "<p>", "<h1>", "<title>"],
    answer: "<h1>"
},
{
    question: "Which semantic element is used for navigation links?",
    options: ["<section>", "<nav>", "<footer>", "<div>"],
    answer: "<nav>"
},
{
    question: "Which symbol is used for class selector in CSS?",
    options: [".", "#", "*", "$"],
    answer: "."
},
{
    question: "Which CSS property changes text color?",
    options: ["background", "font-size", "color", "border"],
    answer: "color"
},
{
    question: "Which value enables Flexbox layout?",
    options: [
        "display:flex",
        "position:flex",
        "float:flex",
        "align:flex"
    ],
    answer: "display:flex"
},
{
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["define", "int", "let", "varible"],
    answer: "let"
},
{
    question: "Which keyword is used to create a function?",
    options: ["method", "function", "define", "fun"],
    answer: "function"
},
{
    question: "Which data structure stores multiple values?",
    options: ["Array", "String", "Boolean", "Number"],
    answer: "Array"
},
{
    question: "Which event occurs when a button is clicked?",
    options: ["onhover", "onchange", "onclick", "onload"],
    answer: "onclick"
}
];


// Variables

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;


// Elements

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const questionNumber = document.getElementById("questionNumber");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");
const timerText = document.getElementById("timer");
const quizCard = document.getElementById("quizCard");


// Load Question

function loadQuestion(){

    clearInterval(timer);

    timeLeft = 10;
    timerText.innerText = timeLeft;

    startTimer();

    nextBtn.disabled = true;

    question.classList.add("fade");

    questionNumber.innerText =
    `Question ${currentQuestion + 1} of ${questions.length}`;

    question.innerText =
    questions[currentQuestion].question;

    options.innerHTML = "";

    questions[currentQuestion].options.forEach(option => {

        const button = document.createElement("div");

        button.classList.add("option");

        button.innerText = option;

        button.addEventListener("click", () => selectOption(button));

        options.appendChild(button);

    });

    updateProgress();
}



// Select Option

function selectOption(selectedOption){

    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(option => {
        option.classList.remove("selected");
    });

    selectedOption.classList.add("selected");

    nextBtn.disabled = false;
}



// Next Button

nextBtn.addEventListener("click", () => {

    checkAnswer();

});



// Check Answer

function checkAnswer(){

    const selected = document.querySelector(".selected");

    if(selected){

        if(selected.innerText === questions[currentQuestion].answer){

            score++;

        }

    }

    currentQuestion++;

    if(currentQuestion < questions.length){

        loadQuestion();

    }
    else{

        showResult();

    }

}



// Progress Bar

function updateProgress(){

    let percent =
    ((currentQuestion + 1) / questions.length) * 100;

    progress.style.width = percent + "%";

    progressText.innerText =
    Math.round(percent) + "%";

}



// Timer

function startTimer(){

    timer = setInterval(() => {

        timeLeft--;

        timerText.innerText = timeLeft;

        if(timeLeft === 0){

            clearInterval(timer);

            currentQuestion++;

            if(currentQuestion < questions.length){

                loadQuestion();

            }
            else{

                showResult();

            }

        }

    },1000);

}



// Result

function showResult(){

    clearInterval(timer);

    let percentage = (score / questions.length) * 100;

    let message = "";

    if(score >= 9){

        message = "Excellent!";

    }
    else if(score >= 7){

        message = "Great Job!";

    }
    else if(score >= 5){

        message = "Good Effort!";

    }
    else{

        message = "Keep Practicing!";

    }

    quizCard.innerHTML = `
    
    <div class="result">

        <h1>${score}/10</h1>

        <h2>${percentage}%</h2>

        <p>${message}</p>

        <button class="restart-btn" onclick="restartQuiz()">
            Restart Quiz
        </button>

    </div>

    `;
}



// Restart Quiz

function restartQuiz(){

    currentQuestion = 0;
    score = 0;

    location.reload();

}



// Start Quiz

loadQuestion();

