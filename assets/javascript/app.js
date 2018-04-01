$(document).ready(function() {

// VARIABLES
// =============================================================================================
var animalsArr = ["wolf", "eagle", "leopard", "mountain goat", "shark", "dolphin", "dog", "tiger", "bear", "fox", "elephant", "horse", "platypus", "alligator","monkey", "otter", "praying mantis", ];


// FUNCTIONS
// =============================================================================================
function displayAnimalGifs() {
  var animal = $(this).attr("data-name");
  var rating = "pg";
  var limit = 10;
  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${animal}&api_key=QOs5UwUNB92cGzHglrKf0ueiYv5Fu4J9&rating=${rating}&limit=${limit}`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var results = response.data;

    console.log(results)

    for (var i = 0; i < results.length; i++) {
      // Creating a paragraph tag with the result item's rating
      var pRating = $("<p>").text("Rating: " + results[i].rating);
      var pTitle = $("<p>").text("Title: " + results[i].title);
      // Creating and storing an image tag
      var animalImage = $("<img>");

      var display = $("<div>");
      display.addClass("display");

      // Setting the src attribute of the image to a property pulled off the result item

      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-state", "still");
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      animalImage.addClass("gif");

      display.prepend(animalImage);
      display.prepend(pRating);
      display.prepend(pTitle);

      pTitle.css("font-weight", "b");


      $("#animals").append(display);
    }
  });
}

// this function will be called in a click event
function toggleGifState() {
  // "data-state" can be either: "still" or "animate"
  // here "this" refers to the object of the click event - in this case - the displayed GIF/image
  var state = $(this).attr("data-state");
  var animateGif = $(this).attr("data-animate");
  var stillGif = $(this).attr("data-still");

  if (state === "still") {
    $(this).attr("src", animateGif);
    $(this).attr("data-state", "animate");
  }
  else if (state === "animate") {
    $(this).attr("src", stillGif);
    $(this).attr("data-state", "still");
  }
}

// this function will also be called in a click event
function renderButtons() {

  // Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons)
  $("#animalButtons").empty();

  // Loops through the array of animals
  for (var i = 0; i < animalsArr.length; i++) {

    // Then dynamicaly generates buttons for each animal in the array
    var newButton = $("<button>");
    // Adds a class of animal to our button
    newButton.addClass("animal");
    // Added a data-attribute
    newButton.attr("data-name", animalsArr[i]);
    // Provided the initial button text
    newButton.text(animalsArr[i]);
    // Added the button to the buttons-view div
    $("#animalButtons").append(newButton);
  }
}

// EVENTS & CALLS
// =============================================================================================
$("#addAnimal").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var animal = $("#animal-input").val().trim();

  // The movie from the textbox is then added to our array
  animalsArr.push(animal);
  // Clears text input after submission of new button
  $("#animal-input").val("");

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();

});

renderButtons();

$(document).on("click", ".animal", displayAnimalGifs);
$(document).on("click", ".gif", toggleGifState);

});