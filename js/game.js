/*
 * Create a list that holds all of your cards
 */

var gameCards = [
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
]

var deck = document.querySelector('.deck');

var openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function displayCards(cards) {
   // Shuffle the deck of cards.
   var shuffledCards = shuffle(cards);
   createHtml(shuffledCards);
 }

 function createHtml(cardsArry) {
   // Iterate through the cards array and create the DOM nodes.
   cardsArry.forEach(function(card) {
     var indyCard = document.createElement('li')
     var cardAttr = document.createAttribute('class');
     cardAttr.value = "card";
     indyCard.setAttributeNode(cardAttr);

     // Take each card that was passed to the callback function to create <i> element.
     var indyCardPic = document.createElement('i');
     var indyCardAttr = document.createAttribute('class');
     indyCardAttr.value = `${card}`;
     indyCardPic.setAttributeNode(indyCardAttr);

     // Append the <i> element to <li> element.
     indyCard.appendChild(indyCardPic)
     deck.appendChild(indyCard)
   })
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

function displaySymbol(e) {
  var selectedCard = e.target;

  (selectedCard.getAttribute("class") === "card") ?
  selectedCard.setAttribute('class', 'card show open') :
  selectedCard.setAttribute('class', 'card');
}

function addOpenCard(card) {
  openCards.push(card)
  console.log(openCards)
}


window.onload = function() {
  displayCards(gameCards);


  var cards = document.getElementsByClassName('card');
  cards = Array.from(cards);

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', displaySymbol)
  }

}


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
