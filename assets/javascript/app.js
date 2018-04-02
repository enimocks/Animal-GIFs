$(document).ready(function() {

// VARIABLES
// =============================================================================================
var physicsArr = ["atom", "electromagnetic radiation", "boson", "galaxy", "pulsar", "quasar", "fourier transform", "solar system", "nebula", "magnetism", "fluid dynamics", "lepton", "thermodynamics"];


// FUNCTIONS
// =============================================================================================
function displayPhysicsGifs() {
  var physics = $(this).attr("data-name");
  var rating = "pg";
  var limit = 10;
  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${physics}&api_key=QOs5UwUNB92cGzHglrKf0ueiYv5Fu4J9&rating=${rating}&limit=${limit}`;

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
      var physicsImage = $("<img>");

      var display = $("<div>");
      display.addClass("display");

      // Setting the src attribute of the image to a property pulled off the result item

      physicsImage.attr("src", results[i].images.fixed_height_still.url);
      physicsImage.attr("data-state", "still");
      physicsImage.attr("data-still", results[i].images.fixed_height_still.url);
      physicsImage.attr("data-animate", results[i].images.fixed_height.url);
      physicsImage.addClass("gif");

      display.prepend(physicsImage);
      display.prepend(pRating);
      display.prepend(pTitle);

      pTitle.css("font-weight", "b");


      $("#physics").prepend(display);
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

  // Deletes the gifs prior to adding new gifs (this is necessary otherwise you will have repeat buttons)
  $("#physicsButtons").empty();

  // Loops through the array of gifs
  for (var i = 0; i < physicsArr.length; i++) {

    // Then dynamicaly generates buttons for each gif in the array
    var newButton = $("<button>");
    // Adds a class of physics to our button
    newButton.addClass("physics");
    // Added a data-attribute
    newButton.attr("data-name", physicsArr[i]);
    // Provided the initial button text
    newButton.text(physicsArr[i]);
    // Added the button to the buttons-view div
    $("#physicsButtons").append(newButton);
  }
}

// EVENTS & CALLS
// =============================================================================================
$("#addButton").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var physics = $("#physics-input").val().trim();

  // The movie from the textbox is then added to our array
  physicsArr.push(physics);
  // Clears text input after submission of new button
  $("#physics-input").val("");

  // Calling renderButtons which handles the processing of our physics terms array
  renderButtons();

});

renderButtons();

$(document).on("click", ".physics", displayPhysicsGifs);
$(document).on("click", ".gif", toggleGifState);

});