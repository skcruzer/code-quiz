//Defining variables
let mainEl = document.getElementById('#main')
let timerEl = document.getElementById('#timer')
let timeLeft = 90
let totalPoints = 0
let end = false

//adding a function for points
let points = function () {
  totalPoints = totalPoints + 10;
  console.log('Your score is ' + totalPoints + '!')
}

//adding a function for the points in relation to the timer
let timer = function () {
  totalPoints = totalPoints + 10
  console.log('Your score is ' + totalPoints + '!')
}