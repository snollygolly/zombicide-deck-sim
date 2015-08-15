//the deck the game is dealt off of
var deck = [];
//the deck the cards are discarded into
var discard = [];
//the sets available
var setsAvailable = [];
//the sets we've chosen to make up our deck
var setsChosen = [];

$( document ).ready(function() {
  debug("Loaded!");
  fetchAllSets();
  //make event listeners
  $(document).on("click","#sets-available li", availableSetsClicked);
  $(document).on("click","#sets-chosen li", chosenSetsClicked);
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
  setsAvailable = [];
  setsChosen = [];
  $.getJSON( "/js/cards.json", function( data ) {
    debug("Set index loaded. " + data.sets.length + " total sets.");
    setsAvailable = data.sets;
    drawSets();
  });
}

function drawSets(){
  $("#sets-available").html("");
  var i = 0;
  while (i < setsAvailable.length){
    $("#sets-available").append("<li>" + setsAvailable[i].name + "</li>");
    i++;
  }
  $("#sets-chosen").html("");
  var i = 0;
  var difficulty = 0;
  while (i < setsChosen.length){
    $("#sets-chosen").append("<li>" + setsChosen[i].name + "</li>");
    difficulty += setsChosen[i].difficulty;
    i++;
  }
  if (setsChosen.length != 0){
    difficulty /= setsChosen.length;
    $("#difficulty").html("Average Difficulty: <b>" + Math.round(difficulty * 100) / 100 + "</b>");
  }else{
    $("#difficulty").html("");
  }
}

function availableSetsClicked(e){
  var index = $(this).index();
  setsChosen.push(setsAvailable[index]);
  $("#sets-chosen").append("<li>" + setsAvailable[index].name + "</li>");
  setsAvailable.splice(index, 1);
  drawSets();
}

function chosenSetsClicked(e){
  var index = $(this).index();
  setsAvailable.push(setsChosen[index]);
  $("#sets-available").append("<li>" + setsChosen[index].name + "</li>");
  setsChosen.splice(index, 1);
  drawSets();
}
