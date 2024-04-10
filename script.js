const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex, score, timer;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'Hyperlinks and Text Markup Language', correct: false },
            { text: 'Home Tool Markup Language', correct: false }
        ]
    },
    // Add more questions as needed
];

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    score = 0;
    timer = 60; // Set timer (e.g., 60 seconds)
    updateTimer();
    setNextQuestion();
    startTimer();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', selectAnswer);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score += 10;
    } else {
        timer -= 10; // Subtract time for wrong answer
    }
    scoreElement.innerText = score;
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function startTimer() {
    setInterval(() => {
        if (timer <= 0) {
            // End game logic here
            alert('Time is up!');
            startButton.classList.remove('hide');
            questionContainerElement.classList.add('hide');
            clearInterval(timer);
            return;
        }
        timer--;
        updateTimer();
    }, 1000);
}

function updateTimer() {
    timerElement.innerText = timer;
}
