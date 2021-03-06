$(document).ready(function() {

    var characters = [
     "Bart Simpson", "Homer Simpson", "Lisa Simpson", "Marge Simpson",
      "Sideshow Bob", "Ned Flanders", "Apu Nahasapeemapetilon", "Mr Burns", "Moe",
      "Krusty the Klown", "Barney Gumble", "Principal Skinner", "Lenny Leonard", "Grampa",
      "Chief Wiggum", "Ralph Wiggum", "Todd Flanders", "Rod Flanders", "Comic Book Guy"
    ];
  
    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  
    $(document).on("click", ".simpson-buttons", function() {
      $("#simpson").empty();
      $(".simpson-buttons").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "xKziWUQdkkNnDJYwyafG3UWd0mvJVZxt";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var characterDiv = $("<div class=\"simpson-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var characterImage = $("<img>");
            characterImage.attr("src", still);
            characterImage.attr("data-still", still);
            characterImage.attr("data-animate", animated);
            characterImage.attr("data-state", "still");
            characterImage.addClass("character-image");
  
            characterDiv.append(p);
            characterDiv.append(characterImage);
  
            $("#simpson").append(characterDiv);
          }
        });
    });
  
    $(document).on("click", ".simpson-input", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-simpson").on("click", function(event) {
      event.preventDefault();
      var newCharacter = $("input").eq(0).val();
  
      if (newAnimal.length > 2) {
        characters.push(newCharacter);
      }
  
      populateButtons(characters, "simpson-buttons", "#simpson-buttons");
  
    });
  
    populateButtons(characters, "simpson-buttons", "#simpson-buttons");
  });
  