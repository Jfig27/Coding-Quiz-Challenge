const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreForm = document.querySelector('form')
const displayScore = document.getElementById('displayScore')
const saveScoreBtn = document.getElementById('saveScoreBtn')

var userNameInput = document.getElementById('username')

var timeCount = document.getElementById('timer')
let shuffledQuestions, currentQuestionIndex
let countRightAnswers = 0;
var secondsLeft = 80;
let answeredQuestions = 0;

var userName = document.querySelector("#username").value;
var userScore = JSON.stringify((countRightAnswers/answeredQuestions * 100));

var Highscore = [
    userName,
    line = " ------ ",
    userScore
]


saveScoreBtn.addEventListener("click", function(event) {
    event.preventDefault();

    Highscore[0] = (document.querySelector("#username").value)
    Highscore[2] = (countRightAnswers/answeredQuestions * 100);

    localStorage.setItem("Highscore", Highscore.join(""))
    renderLastScore();
    saveScoreBtn.setAttribute('disabled', true)
}) 


startButton.addEventListener('click', startGame)
answerButtonsElement.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function renderLastScore() {

    var hscore = localStorage.getItem("Highscore")
    const newScoreDiv = document.createElement('div')
    newScoreDiv.innerHTML = hscore + '%';
    newScoreDiv.classList.add('newDivs')
    questionContainerElement.appendChild(newScoreDiv)
    
}


function setTime() {

    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeCount.textContent = secondsLeft;

      let pastScores = document.querySelectorAll('.newDivs')

      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        questionElement.innerText = "You ran out of time!"
        questionElement.style.textAlign = "center";
        answerButtonsElement.classList.add('hide')
        restartGame()
        scoreForm.classList.remove('hide')
        displayScore.classList.remove('hide')
        for (let el of pastScores) {
            el.classList.remove('hide')
        }
      }
      if(answeredQuestions === questions.length) {
        clearInterval(timerInterval);
        questionElement.innerText = "Your score is: " +
        (countRightAnswers/answeredQuestions * 100) + "%";
        questionElement.style.textAlign = "center";
        scoreForm.classList.remove('hide')
        displayScore.classList.remove('hide')
        for (let el of pastScores) {
            el.classList.remove('hide')
        }
      }
  
    }, 1000);
}

function startGame(){
    secondsLeft = 80;
    countRightAnswers = 0;
    answeredQuestions = 0;
    document.getElementById('right-answers').innerText = countRightAnswers;
    startButton.classList.add('hide')
    answerButtonsElement.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    scoreForm.classList.add('hide')
    let pastScores = document.querySelectorAll('.newDivs')
    for (let el of pastScores) {
        el.classList.add('hide')
    }
    displayScore.classList.add('hide')
    if (saveScoreBtn.disabled){saveScoreBtn.removeAttribute('disabled')}

    setNextQuestion()
    setTime()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState(){
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function restartGame(){
    startButton.innerText = 'Restart?'
    startButton.classList.remove('hide')
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct    

    if (shuffledQuestions.length <= currentQuestionIndex +1){
        restartGame()
    }

    if (selectedButton.dataset = correct) {
        countRightAnswers++;
    } else if (selectedButton.dataset != correct){
        secondsLeft -= 10;
        console.log(secondsLeft)
    }
    document.getElementById('right-answers').innerText = countRightAnswers;
    answeredQuestions++;
}

const questions = [
    {
        question: 'Commonly used data types DO NOT Include:',
        answers: [
            { text: 'strings', correct: false},
            { text: 'booleans', correct: false},
            { text: 'alerts', correct: true},
            { text: 'numbers', correct: false}
        ]
    },
    {
        question: 'The condition in an if / else statement ' + 
        'is enclosed within ____.',
        answers: [
            { text: 'quotes', correct: false},
            { text: 'curly brackets', correct: false},
            { text: 'parentheses', correct: true},
            { text: 'square brackets', correct: false}
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        answers: [
            { text: 'numbers and strings', correct: false},
            { text: 'other arrays', correct: false},
            { text: 'booleans', correct: false},
            { text: 'all of the above', correct: true}
        ]
    },
    {
        question: 'String values must be enclosed within ____' + 
        ' when being assigned to variables.',
        answers: [
            { text: 'commas', correct: false},
            { text: 'curly brackets', correct: false},
            { text: 'quotes', correct: true},
            { text: 'parentheses', correct: false}
        ]
    },
    {
        question: 'A very useful tool used during development and ' +
        'debugging for printing content to the debugger is: ',
        answers: [
            { text: 'JavaScript', correct: false},
            { text: 'terminal/bash', correct: false},
            { text: 'for loops', correct: false},
            { text: 'console log', correct: true}
        ]
    }
]