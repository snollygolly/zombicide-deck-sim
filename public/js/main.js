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
  showCreate();
  fetchAllSets();
  //make event listeners
  $(document).on("click", "#sets-available li", availableSetsClicked);
  $(document).on("click", "#sets-chosen li", chosenSetsClicked);
  $(document).on("click", "#create-deck", createDeck);
  $(document).on("click", "#deal-deck", dealCard);
});

//for logging test messages to a user viewable console
function debug(message){
  $("#console").append("* " + message + "\n");
  console.log("* " + message);
}

// shuffle the deck
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

//move discard to the deck and shuffle
function resetDeck(deck, discard){
  deck = discard;
  discard = [];
  shuffleDeck(deck);
  return deck;
}

//create the deck from sets chosen
function createDeck(e){
  var i = 0;
  while (i < setsChosen.length){
    var setArr = fillArray(setsChosen[i].id, setsChosen[i].qty);
    deck = deck.concat(setArr);
    i++;
  }
  shuffleDeck(deck);
  showPlay();
}

//deals the next card off the deck
function dealCard(e){
  var card = deck.shift();
  discard.unshift(card);
  var set = getSetByID(card);
  $("#card-dealt").html(set.name);
  $("#cards-left").html(deck.length);
}

//fills an array with the same value
function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

//used to show the create section
function showCreate(){
  $("#create-div").show();
  $("#play-div").hide();
}

//used to show the play section
function showPlay(){
  $("#play-div").show();
  $("#create-div").hide();
  $("#cards-left").html(deck.length);
}

//get all the sets and draw them on the screen (via drawSets)
function fetchAllSets(){
  setsAvailable = [];
  setsChosen = [];
  masterSets = [];
  $.getJSON( "/js/cards.json", function( data ) {
    debug("Set index loaded. " + data.sets.length + " total sets.");
    setsAvailable = data.sets;
    drawSets();
  });
}

//draw sets on screen
function drawSets(){
  //draw the available sets
  $("#sets-available").html("");
  var i = 0;
  while (i < setsAvailable.length){
    $("#sets-available").append("<li>" + setsAvailable[i].name + "</li>");
    i++;
  }
  //draw the chosen sets
  $("#sets-chosen").html("");
  var i = 0;
  var difficulty = 0;
  while (i < setsChosen.length){
    $("#sets-chosen").append("<li>" + setsChosen[i].name + "</li>");
    difficulty += setsChosen[i].difficulty;
    i++;
  }
  //if we have a chosen deck, calculate difficulty
  if (setsChosen.length != 0){
    difficulty /= setsChosen.length;
    $("#difficulty").html("Average Difficulty: <b>" + Math.round(difficulty * 100) / 100 + "</b>");
  }else{
    $("#difficulty").html("");
  }
}

//EL for available sets clicked
function availableSetsClicked(e){
  var index = $(this).index();
  setsChosen.push(setsAvailable[index]);
  $("#sets-chosen").append("<li>" + setsAvailable[index].name + "</li>");
  setsAvailable.splice(index, 1);
  drawSets();
}

//EL for chosen sets clicked
function chosenSetsClicked(e){
  var index = $(this).index();
  setsAvailable.push(setsChosen[index]);
  $("#sets-available").append("<li>" + setsChosen[index].name + "</li>");
  setsChosen.splice(index, 1);
  drawSets();
}

//get the card by the ID
function getSetByID(id){
  var i = 0;
  while (i < setsChosen.length){
    if (setsChosen[i].id == id){
      //we found a match
      return setsChosen[i];
    }
    i++;
  }
  debug("Match for ID: " + id + " not found");
  return null;
}
