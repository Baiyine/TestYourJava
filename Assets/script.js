const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    currentQuestionIndex = 0
    // Initialize your game variables and display the first question
}

function setNextQuestion() {
    // Show the next question or finish the game if there are no more questions
}

function selectAnswer() {
    // Check the answer, display feedback, and set up the next question
}
