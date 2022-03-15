var addArray = function (fromArray, toArray) {
  var fromArrayIndex = 0;
  while (fromArrayIndex < fromArray.length) {
    toArray.unshift(fromArray[fromArrayIndex]);
    fromArrayIndex += 1;
  }
  return toArray;
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      cardDeck.push(card);

      rankCounter += 1;
    }

    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};

var deck = shuffleCards(makeDeck());

var playerHand = deck.splice(0, 26);
var computerHand = deck;
console.log(playerHand);
console.log(computerHand);

var main = function (input) {
  var playerCard = playerHand.pop();
  var computerCard = computerHand.pop();

  var myOutputValue =
    'PLAYER: ' +
    playerCard.name +
    ' of ' +
    playerCard.suit +
    '<br>COMPUTER: ' +
    computerCard.name +
    ' of ' +
    computerCard.suit +
    '<br>';

  if (playerCard.rank > computerCard.rank) {
    playerHand.unshift(playerCard);
    playerHand.unshift(computerCard);
    myOutputValue = myOutputValue + 'PLAYER WINS!<br>';
  }
  else if (computerCard.rank > playerCard.rank) {
    computerHand.unshift(playerCard);
    computerHand.unshift(computerCard);
    myOutputValue = myOutputValue + 'COMPUTER WINS!<br>';
  }
  else {
    myOutputValue = myOutputValue + "It's WAR!<br>";
    var warCards = [playerCard, computerCard];
    var cardsEqual = true;

    while (cardsEqual) {
      var playerFaceDown = playerHand.pop();
      var computerFaceDown = computerHand.pop();
      var playerFaceUp = playerHand.pop();
      var computerFaceUp = computerHand.pop();
      warCards.push(playerFaceDown);
      warCards.push(computerFaceDown);
      warCards.push(playerFaceUp);
      warCards.push(computerFaceUp);

      if (playerFaceUp.rank > computerFaceUp.rank) {
        cardsEqual = false;
        playerHand = addArray(warCards, playerHand);
      } else if (playerFaceUp.rank < computerFaceUp.rank) {
        cardsEqual = false;
        computerHand = addArray(warCards, computerHand);
      }

      myOutputValue =
        myOutputValue +
        '<br>PLAYER: ' +
        playerFaceUp.name +
        ' of ' +
        playerFaceUp.suit +
        '<br>COMPUTER ' +
        computerFaceUp.name +
        ' of ' +
        computerFaceUp.suit;

      if (
        (playerHand.length == 0 && computerHand.length == 0) ||
        (playerHand.length == 1 && computerHand.length == 1)
      ) {
        cardsEqual = false;
        myOutputValue = myOutputValue + '<br> GAME OVER! TIE';
      }
      else if (
        (playerHand.length == 0 || playerHand.length == 1) &&
        computerHand.length > playerHand.length
      ) {
        cardsEqual = false;
        myOutputValue = myOutputValue + '<br> GAME OVER! YOU LOSE';
      }
      else if (
        (computerHand.length == 0 || computerHand.length == 1) &&
        playerHand.length > computerHand.length
      ) {
        cardsEqual = false;
        myOutputValue = myOutputValue + '<br> GAME OVER! YOU WIN';
      }
    }
  }

  myOutputValue = myOutputValue + '<br>PLAYER HAND: ' + playerHand.length;
  myOutputValue = myOutputValue + '<br>COMPUTER HAND: ' + computerHand.length;
  return myOutputValue;
};

