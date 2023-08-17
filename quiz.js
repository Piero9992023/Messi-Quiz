const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progress-text");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let sec = 140;
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "In which country was Lionel Messi born? ",
        choice1: "Argentina", 
        choice2: "Spain", 
        choice3: "Bolivia",
        choice4: "France", 
        answer: 1,
    },

    {
        question: "What is Lionel Messi's current jersey number?",
        choice1: "7", 
        choice2: "13", 
        choice3: "10",
        choice4: "23", 
        answer: 3,
    },

    {
        question: "What was Lionel Messi's childhood team?",
        choice1: "AC Milan", 
        choice2: "Barcelona Youth Team", 
        choice3: "Newell's Old Boys",
        choice4: "None", 
        answer: 3,
    },
    
    {
        question: "What was Lionel Messi's jersey number when he newly joined FC Barcelona?",
        choice1: "30", 
        choice2: "19", 
        choice3: "33",
        choice4: "29", 
        answer: 2,
    },

    {
        question: "How many Balon d'OR awards does Messi have?",
        choice1: "7", 
        choice2: "1", 
        choice3: "5",
        choice4: "11", 
        answer: 1,
    },

    {
        question: "Which club does Lionel Messi currently play for?",
        choice1: "PSG", 
        choice2: "Inter Miami", 
        choice3: "FC Barcelona",
        choice4: "Real Madrid", 
        answer: 2,
    },

    {
        question: "How old is Lionel Messi?",
        choice1: "29", 
        choice2: "37", 
        choice3: "36",
        choice4: "39", 
        answer: 3,
    },

    {
        question: "Lionel Messi is the brand ambassador of which company?",
        choice1: "Coca-Cola", 
        choice2: "Pepsi", 
        choice3: "Gatorade",
        choice4: "Starbucks", 
        answer: 2,
    },

    {
        question: "Which team has Lionel Messi faced in the 2022 World Cup finals?",
        choice1: "Netherslands", 
        choice2: "Portugal", 
        choice3: "Croatia",
        choice4: "France", 
        answer: 4,
    },

    {
        question: "How many goals has Lionel Messi scored in his career?",
        choice1: "About 991", 
        choice2: "About 673", 
        choice3: "About 1001",
        choice4: "About 814", 
        answer: 4,
    }


]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion ()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)

        return window.location.assign("./end.html")
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]

    })

    availableQuestions.splice(questionsIndex, 1)
    
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(SCORE_POINTS);
        } else{
            sec-=10
        }


        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion(); 
        }, 1000);
    });
});

incrementScore = num => {
    score+=num
    scoreText.innerText = score
}

    function startTimer(){
        var timer = setInterval(function(){
            sec--;
            document.getElementById('timer-display').innerHTML='00:'+sec;
            if (sec < 0) {
                clearInterval(timer);
                alert("Time is up!")
            }
        }, 1000);
    }

startGame()
startTimer()


