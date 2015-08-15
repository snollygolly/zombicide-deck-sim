var deck = [];
var discard = [];

$( document ).ready(function() {
  debug("Loaded!");
  fetchAllSets();
});

function debug(message){
  $("#console").append("* " + message + "\n");
}

function shuffleDeck(deck){
  var currentIndex = deck.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  }
  return deck;
}

function resetDeck(deck, discard){
  deck = discard;
  discard = [];
  shuffleDeck(deck);
  return deck;
}

function buildDeck(deck, sets){
  return deck;
}

function fetchAllSets(){
  $.getJSON( "/js/cards.json", function( data ) {
    debug("Set index loaded. " + data.sets.length + " total sets.");
    var i = 0;
    while (i < data.sets.length){
      $("#sets-available").append("<li>" + data.sets[i].name + "</li>");
      i++;
    }
  });
}
