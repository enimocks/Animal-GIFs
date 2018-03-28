// VARIABLES
// =============================================================================================
var animalsArr = ["wolf", "eagle", "leopard", "mountain goat"];











// FUNCTIONS
// =============================================================================================
function displayAnimalGifs() {
  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=QOs5UwUNB92cGzHglrKf0ueiYv5Fu4J9&limit=5";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response.data[0].images.fixed_height.url);
    
    var results = response.data;

  })

}






function renderButtons() {

  // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
  $("#animalButtons").empty();

  // Loops through the array of animals
  for (var i = 0; i < animalsArr.length; i++) {

    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("animal");
    // Added a data-attribute
    a.attr("data-name", animalsArr[i]);
    // Provided the initial button text
    a.text(animalsArr[i]);
    // Added the button to the buttons-view div
    $("#animalButtons").append(a);
  }
}

$(document).on("click", ".animal", displayAnimalGifs);

renderButtons();