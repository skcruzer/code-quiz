// creating variables for items in page
const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const timerEl = document.querySelector('#timer')

let currentQuestion = {}
let acceptedAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let timeLeft = 90

let timer;


// 10 coding questions!
let questions = [
  {
    question: 'Which of these is NOT a programming language?',
    choice1: 'Ruby',
    choice2: 'Leopard',
    choice3: 'Python',
    choice4: 'Java',
    answer: 2,
  },
  {
    question: 'Which of these is ran using a computer program?',
    choice1: 'Train',
    choice2: 'Bicycle',
    choice3: 'Running Shoes',
    choice4: 'Vase',
    answer: 1,
  },
  {
    question: 'Which of these is a way to declare a JavaScript Variable?',
    choice1: 'var',
    choice2: 'let',
    choice3: 'const',
    choice4: 'All The Above',
    answer: 4,
  },
  {
    question: 'CSS stands for:',
    choice1: 'Cascading Style System',
    choice2: 'Coding Security System',
    choice3: 'Coding Style Sheets',
    choice4: 'Cascading Style Sheets',
    answer: 4,
  },
  {
    question: 'What are people who write computer code called?',
    choice1: 'Professors',
    choice2: 'Programmers',
    choice3: 'Manufacturers',
    choice4: 'Cryptographers',
    answer: 2,
  },
  {
    question: 'What is computer coding?',
    choice1: 'Telling a computer what to do',
    choice2: 'A lock you put on your computer',
    choice3: 'A list of functions',
    choice4: 'Using google for everything',
    answer: 1,
  },
  {
    question: 'What word describes a set of instructions that computers need to do work?',
    choice1: 'Blueprint',
    choice2: 'Synopsis',
    choice3: 'Program',
    choice4: 'Agenda',
    answer: 3,
  },
  {
    question: 'What is the element used - and hidden - in code that explains things and makes the content more readable?',
    choice1: 'Comparisons',
    choice2: 'Comments',
    choice3: 'Notes',
    choice4: 'Quotations',
    answer: 2,
  },
  {
    question: 'What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?',
    choice1: 'Debugger',
    choice2: 'Repeater',
    choice3: 'Loop',
    choice4: 'Copy',
    answer: 3,
  },
  {
    question: 'What is the language or list of instructions that are executed by the computer (how JavaScript is built)?',
    choice1: 'Scope',
    choice2: 'JSON',
    choice3: 'Output',
    choice4: 'Syntax',
    answer: 4,
  },
]

// variables for keeping track of score and how many questions
const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

const startGame = () => {
  // timer function
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft
      timeLeft--
      return timeLeft
      
    } else {
      timerEl.textContent = ''
      return window.location.assign('end.html')
    }

  }, 1000);

  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

// parameters for new questions
const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('end.html')
  }

  questionCounter++
  progressText.innerText = ['Question ' + questionCounter + ' of ' + MAX_QUESTIONS]

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptedAnswers = true
}



choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptedAnswers) return

    acceptedAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    if (classToApply === 'incorrect') {
      timeLeft = timeLeft - 10;
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 1000)
  })
})

const incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame();