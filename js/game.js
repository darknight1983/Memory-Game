/*
 * Create a list that holds all of your cards
 */

var gameCardIcons = new Array (
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bomb"
)



var stars = document.querySelector('.stars');
var cards = document.querySelectorAll('.card');
var star = document.querySelectorAll('.fa-star');
var moveCounter = document.querySelector('.moves');
var winnerBox = document.querySelector('#winner-box');
var timer = document.querySelector('.timer');
var restartButton = document.querySelector('.restart');
var playAgainButton = document.querySelector('.play-again');
var finalTime = document.querySelector('.time-spent');
var starCount = document.querySelector('#star-count');



var moves = 0;
var openCards = [];
var matches = 0;
var interval;

let timerValue = 0;
let minutes = 0;
let seconds = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function displayCards(cards) {
   // Shuffle the deck of cards.
   var shuffledIcons = shuffle(cards);
   createHtml(shuffledIcons);
 }

 function createHtml(iconsArry) {
   // Iterate through the cards array and create the DOM nodes.
   for (let i = 0; i < cards.length; i++) {
     var icon = document.createElement('i');
     var iconAttr = document.createAttribute('class');
     iconAttr.value = iconsArry[i];
     icon.setAttributeNode(iconAttr);
     cards[i].appendChild(icon);
     // Try attaching an event listener to each card here.
     cards[i].addEventListener('click', displaySymbol, true);
   }
 }


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame() {
  // Clear the innerHTML before adding the shuffled Cards.
  cards.forEach(function(card) {
    card.classList.remove("open", "show", "match");
    card.innerHTML = '';
  });
  clearInterval(interval)
  displayCards(gameCardIcons)
}

function startTimer() {
  timer.textContent = minutes + " Minutes " + seconds + " Seconds";
	interval = setInterval(function(){
		seconds++;
		timer.textContent = minutes + " Minutes " + seconds + " Seconds";
		if(seconds == 60){
			minutes++;
			seconds = 0;
			timer.textContent = minutes + " Minutes " + seconds + " Seconds";
		}
	},1000);
}


function displaySymbol(e) {
  // Condition for starting the timer
  if(openCards.length === 0 && timerValue === 0) {
		startTimer();
		timerValue = 1;
	}
  var card = e.target;
  // Display the symbol on the card.
  if (openCards.length < 2) {
    if (!card.classList.contains('open') && !card.classList.contains('show')) {
      card.classList.add('open', 'show');
      addToList(card)
    } else {
      return;
    }

  } else {
    return;
  }

}

function itsAMatch(card1, card2) {
  card1.classList.add('match');
  card2.classList.add('match');
  matches += 1;
  openCards = [];
  victory();
}

function notAMatch(card1, card2) {
  setTimeout(function() {
    card1.setAttribute('class', 'card');
    card2.setAttribute('class', 'card')
    openCards = [];
  }, 2000)

}

function addToList(card) {
  incrementMoveCounter();
  openCards.push(card)
  if (openCards.length >= 2 ) {
    // check to see if there are mathces.
    var card1 = openCards[0];
    var card2 = openCards[1];

    if (card1.lastElementChild.classList[1] === card2.lastElementChild.classList[1]) {
      // Lock the cards in the match position
      itsAMatch(card1, card2);
    } else {
      notAMatch(card1, card2)
    }
  }
}

function incrementMoveCounter() {
  moves += 1;
  moveCounter.textContent = moves;
  if (moves > 10) {
    star[0].style.display = "none";
  }
   if (moves > 18) {
    star[1].style.display = "none";
  }
}

function victory() {
  if (matches === 8) {
    // Changes the display from hidden to block so that it becomes visible.
    finalTime.textContent = minutes + " Minutes " + seconds + " Seconds";
    if (moves > 18) {
      starCount.textContent = "Stars: 1";
    } else if (moves > 10) {
      starCount.textContent = "Stars: 2";
    } else {
      starCount.textContent = "Stars: 3"; 
    }
    winnerBox.style.display = "block";
    clearInterval(interval);
  }
}

// You need to add the functionality to restart the game here.
// A function to reset the game would work best because the
// user will also have this option upon winning the game.


function resetGame() {
  console.log('You are attempting to restart the game');
  moves = 0;
  openCards = [];
  matches = 0;
  timerValue = 0;
  minutes = 0;
  seconds = 0;
  timer.textContent = minutes + " Minutes " + seconds + " Seconds";
  stars.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`;
  moveCounter.textContent = moves;
  winnerBox.style.display = "none";
  startGame();
}

// Add event listener on the reset button.
restartButton.addEventListener('click', resetGame);
playAgainButton.addEventListener('click', resetGame);




startGame();
