// GifTastic Game
// Variables
var animals = ["dog","cat","bear","parrot","squirel"];

//***********************************************************************************
// On load
//***********************************************************************************
for (var i = 0; i < animals.length; i++) {
  var btnHtml = $('<button type="button"> ' + animals[i] +' </button>').addClass("btn").attr("data-btnvalue", animals[i]);
  $(".btn-container").append(btnHtml);
}

//********************************************
// Click event for animal buttons at top of page
//********************************************
$(document).on("click",".btn", function() {
  $(".results").empty();
  var btnValue = ($(this).data("btnvalue"));
  console.log(btnValue);
  // URL to be called from API
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + btnValue + "&limit=10";
  // API to GET data from queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
      console.log(response);
      console.log(Object.keys(response.data).length);
      for (var i = 0; i < Object.keys(response.data).length; i++) {
        var imageDiv = $('<div class="imagediv">');
        var urlStill = response.data[i].images.original_still.url;
        var urlAnimate = response.data[i].images.original.url;
        var image = $("<img>").addClass('image' + i).attr("src", urlStill).attr('data-imgnum', i).attr('data-otherurl', urlAnimate);
        var rating = $("<p>").text("Rated: " + response.data[i].rating );
        imageDiv.prepend(rating);
        imageDiv.prepend(image);
        $(".results").append(imageDiv);
        //$(".results").append($("<img>").addClass('image' + i).attr("src", urlStill).attr('data-imgnum', i).attr('data-otherurl', urlAnimate));
      }
  });
});

//********************************************
// Click event for image
//********************************************
$(document).on("click","img", function() {
  //Get source and other URL and swap
  var imgNum = $(this).data('imgnum');
  var srcUrl = $(this).attr('src');
  var otherUrl = $(this).attr('data-otherurl');
  var imgObj = ".image" + imgNum;
  $(this).attr("src", otherUrl).attr('data-otherurl', srcUrl);
});
//********************************************
// Click event for search
//********************************************
$(document).on("click",".search", function() {
  // Get input value
  var btnValue = ($(".inputAnimal").val()).trim();
  // Check if only space(s)
  if (btnValue != "") {
    // Check if button already exists
    if (animals.indexOf(btnValue) < 0) {
      // Add button to the screen
      animals[animals.length] = btnValue;
      var btnHtml = $('<button type="button"> ' + btnValue +' </button>').addClass("btn").attr("data-btnvalue", btnValue);
      $(".btn-container").append(btnHtml);
    }else{
      alert(btnValue + ' already exists!');
    }
  }else{
    alert('Enter an animal, then press submit');
  }
});
