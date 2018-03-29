// VARIABLES
// =============================================================================================
var animalsArr = ["wolf", "eagle", "leopard", "mountain goat", "shark", "dolphin", "dog"];


// FUNCTIONS
// =============================================================================================
function displayAnimalGifs() {
  var animal = $(this).attr("data-name");
  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${animal}&api_key=QOs5UwUNB92cGzHglrKf0ueiYv5Fu4J9&limit=5`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(queryURL);
    console.log(response.data);
    console.log(response.data[0].images.fixed_height.url);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);
      // Creating and storing an image tag
      var animalImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      animalImage.attr("src", results[i].images.fixed_height.url);

      $('#animals').prepend(p);
      $('#animals').prepend(animalImage);
    }

  });

}

function clickToPlay() {

}

function renderButtons() {

  // Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons)
  $("#animalButtons").empty();

  // Loops through the array of animals
  for (var i = 0; i < animalsArr.length; i++) {

    // Then dynamicaly generates buttons for each animal in the array
    var a = $("<button>");
    // Adds a class of animal to our button
    a.addClass("animal");
    // Added a data-attribute
    a.attr("data-name", animalsArr[i]);
    // Provided the initial button text
    a.text(animalsArr[i]);
    // Added the button to the buttons-view div
    $("#animalButtons").append(a);
  }
}

// EVENTS
// =============================================================================================
$("#addAnimal").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var animal = $("#animal-input").val().trim();

  // The movie from the textbox is then added to our array
  animalsArr.push(animal);

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();

});

$(document).on("click", ".animal", displayAnimalGifs);

renderButtons();