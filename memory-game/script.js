const gameContainer = document.getElementById("game");
const resetBttn = document.querySelector("#resetBttn")
const clickCountDisplay = document.querySelector("#numClicks")
const bestScore = document.querySelector("#bestScore")
let cardsFlipped = []
let clickCount = 0

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  clickCount ++
  clickCountDisplay.innerText = `Score: ${clickCount}`
  
  let card = event.target
  let color = card.className
  
  if (!card.classList.contains("flipped")) {
    card.classList.toggle("flipped")
    card.style.backgroundColor = color
    cardsFlipped.push(card)
  }

  if (cardsFlipped.length === 2) {
    console.log(cardsFlipped[0].className)
    console.log(cardsFlipped[1].className)
    if (cardsFlipped[0].className === cardsFlipped[1].className) {
      console.log("Match!")
      for (let card of cardsFlipped) {
        card.classList.toggle("flipped")
        card.classList.toggle("matched")
      }
      cardsFlipped = []
    } else {
      console.log("Try again")
      setTimeout(function() {
        for (let card of cardsFlipped) {
          card.style = ""
          card.classList.toggle("flipped")
        }
        cardsFlipped = []
      }, 1000)
      
    }
  }

  // Congratulate after winning and update score
  let matchedCards = document.querySelectorAll(".matched")
  if (matchedCards.length === COLORS.length) {
    setTimeout(function() {
      alert("You won!")
    }, 1000)
    if (clickCount < localStorage.bestScore || !localStorage.bestScore) {
      localStorage.bestScore = clickCount
      bestScore.innerText = `Best Score: ${localStorage.bestScore}`
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

resetBttn.addEventListener("click", function(e) {
  for (let card of document.querySelectorAll(".flipped, .matched")) {
    card.style.backgroundColor = ""
    card.classList.remove("flipped")
    card.classList.remove("matched")
  }
  cardsFlipped = []
})

document.addEventListener("DOMContentLoaded", function() {
  if (localStorage.bestScore) {
    bestScore.innerText = `Best Score: ${localStorage.bestScore}`
  } else {
    localStorage.bestScore = ""
  }
})