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




var deck = document.querySelector('.deck');
var cards = document.querySelectorAll('.card');


var openCards = [];

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
  displayCards(gameCardIcons)
}



function displaySymbol(e) {
  var card = e.target;
  // Display the symbol on the card.
  card.classList.add('open', 'show');
  addToList(card)
}

function itsAMatch() {
  alert('Its a match')
}

function notAMatch() {
  alert('Its not a match')
}

function addToList(card) {
  openCards.push(card)
  if (openCards.length >= 2 ) {
    // check to see if there are mathces.
    var icon1 = openCards[0].lastElementChild;
    var icon2 = openCards[1].lastElementChild;
    console.log(icon1.classList[1])
    console.log(icon2.classList[1])
    if (icon1.classList[1] === icon2.classList[1]) {
      console.log("Its a match")
    }
  }
}

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', displaySymbol, true);
}


startGame();





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
