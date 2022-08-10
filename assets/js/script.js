var questions = [
    {
        question: "Which of the following is an advantage of using JavaScript?",
        answers: ['Less Server Interaction', 'Immediate Feedback to the Visitors', 'Increased Interactivity', 'All of the Above.'],
        correct: 4
    },
    {
        question: "Which of the following is true about cookie handling in JavaScript?",
        answers: ['JavaScript can manipulate cookies using the cookie property of the Document object.', 'JavaScript can read, create, modify, and delete the cookie or cookies that apply to the current web page.', 'Both of the above.', 'None of the above.'],
        correct: 3
    },
    {
        question: " Which built-in method returns the character at the specified index?",
        answers: ['characterAt()', 'getCharAt()', 'charAt()', 'None of the above.'],
        correct: 3
    },
    {
        question: "Which of the following function of Number object forces a number to display in exponential notation?",
        answers: ['toExponential()', 'toFixed()', 'toPrecision()', 'toLocaleString()'],
        correct: 1
    },
    {
        question: "Which of the following function of Number object defines how many total digits to display of a number?",
        answers: ['toExponential()', 'toFixed()', 'toLocaleString()', 'toPrecision()'],
        correct: 4
    },
    {
        question: "Which of the following function of String object executes the search for a match between a regular expression and a specified string?",
        answers: ['concat()', 'match()', 'replace()', 'tsearch()'],
        correct: 4
    },
    {
        question: "Which of the following function of String object returns the primitive value of the specified object?",
        answers: ['toLocaleUpperCase()', 'toUpperCase()', 'valueOf()', 'toString()'],
        correct: 3
    }
];
var scoresArray = [];
var startButtonEl = document.querySelector("#beginQuiz");
var questionsContainer = document.querySelector(".questionContainer");
var questionName = document.querySelector(".questionTitle");
var titleEl = document.querySelector(".titleDiv");
var rulesEl = document.querySelector(".rulesDiv");
var buttonEl = document.querySelector(".buttonDiv");
var initialsInput = document.querySelector("#initials");
var timerEl = document.querySelector(".timer");
var mainContainerEl = document.querySelector(".container");
var quizOverDiv = document.querySelector(".quizEnd");
var quizOverHeaderEl = document.querySelector(".quizEndHeader");
var HighScoresDivEl = document.querySelector(".highscoresDiv");
var scoresButtonEl = document.querySelector("#storageSubmit");
var tableEl = document.querySelector("#rowScores");
var counter = 0;
var timeLeft = 75;

var startQuiz = function () {
    debugger;
    titleEl.remove();
    rulesEl.remove();
    buttonEl.remove();
    questionsContainer.style.display = "block";

    timerStart = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);


    for (let j = 0; j < questions[counter].answers.length; j++) {
        var currentAnswer = document.getElementById(j + 1);
        console.log(currentAnswer);
        currentAnswer.textContent = questions[counter].answers[j];
        var buttonIndex = j + 1;
        currentAnswer.addEventListener("click", () => {
            checkAnswer(j + 1);
        });
    }
    nextQuestion();
};

var nextQuestion = function () {

    var myQuestion = questions[counter].question;
    questionName.textContent = myQuestion;

    for (let i = 0; i < questions[counter].answers.length; i++) {
        var currentAnswer = document.getElementById(i + 1);
        currentAnswer.textContent = questions[counter].answers[i];
    };
};

var checkAnswer = function (buttonIndex) {
    var correctAnswer = questions[counter].correct;
    if (correctAnswer === buttonIndex) {
        mainContainerEl.style.backgroundColor = "lightgreen"
        setTimeout(function () {
            mainContainerEl.style.backgroundColor = "white";
        }, 250);
    }
    else {
        mainContainerEl.style.backgroundColor = "red"
        setTimeout(function () {
            mainContainerEl.style.backgroundColor = "white";
        }, 250);
        timeLeft -= 15;
        timerEl.textContent = "Time: " + timeLeft;
    }
    if (counter >= 4) {
        endQuiz();
    }
    else {
        counter++;
        nextQuestion();
    }
};

var timerStart;

var endQuiz = function () {
    clearInterval(timerStart);

    mainContainerEl.remove();
    quizOverDiv.style.display = "block";

    var finalScore = document.createElement("p")
    finalScore.className = "final-score";
    finalScore.textContent = "Your Final Score Is " + timeLeft + ".";
    quizOverHeaderEl.appendChild(finalScore);

}

var storeObjects = function () {
    var initials = document.getElementById("initials").value.trim();

    while (initials === "" || initials === null) {
        initials = window.prompt("Please enter your initials to log your score!")
    }
    var scoresObj = {
        name: initials,
        score: timeLeft,
    };
    scoresArray.push(scoresObj);

    localStorage.setItem(initials, JSON.stringify({ initials, timeLeft }));
    console.log("array here", scoresArray);
    debugger;
}

startButtonEl.addEventListener("click", startQuiz);
scoresButtonEl.addEventListener("click", function () {
    storeObjects();
    location.href = "./assets/scores.html";
});