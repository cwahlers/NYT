var title =[];
var startYear;
var endYear;
var numOfRecords = 0;
var titleDiv;
var question = "";
var response = "";
var startYr = "";
var endYr = "";
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var counter = 0;


//*****************************************
//  Search Button
//*****************************************
$("#search").on("click", function() {
  question = $("#term-input").val().trim();
  records = $("#records-input").val().trim();
  startYr = $("#start-input").val().trim();
  endYr = $("#end-input").val().trim();

  // Base URL
  url += '?' + $.param({
  'api-key': "87aa1a53935e4b768f3d84b1ec41ad22",
  'q': question,
  'sort' : "newest"
  });

  // Check if Start Year is populated
  if (startYr != "" ) {
    url += "&";
    url += $.param({ 'begin_date' : (startYr + "0101") });
  }

  // Check if End Year is populated
  if (endYr != "" ) {
    url += "&";
    url += $.param({ 'end_date' : (endYr + "1231") });
  }

  // NYT API Call
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {
    //console.log(result);
    var articlesArray = result.response.docs;
    var resultsContainer = $("<div>");
    var title, snippetText, date, articleURL, multimediaArray, thumbnailURL;
    //console.log(articlesArray);
    console.log(articlesArray.length);
    $(".list-group").empty();

    if (records != "" && records <= articlesArray.length){
      counter = records;
    } else {
      counter = articlesArray.length;
    }

    for(var i = 0; i < counter ; i++){
       //set variables to API results
        title = articlesArray[i].headline.main;
        snippetText = articlesArray[i].snippet;
        date = articlesArray[i].pub_date;
        articleURL = articlesArray[i].web_url;
        multimediaArray = articlesArray[i].multimedia;
        
        //testing for loop
        //console.log(title + "\n " + snippetText + "\n " + date + "\n " + articleURL);
        //var articleWrapper = $("<div>");
        var articleWrapper = $("<li>").addClass("list-group-item");

        var articleResults = $("<div>").addClass("media")
                              .append( $("<button>").addClass("btn btn-primary").text(i + 1) )
                              .append( $("<h4>").addClass("media-heading").text(title) )
                              .append( $("<p>").addClass("media-object").text(snippetText) )
                              .append( $("<p>").addClass("media-object").text(date) )
                              .append( $("<a>").addClass("media-object").attr("href", articleURL)
                              .html("<p>Read More</p>"));

        articleWrapper.append(articleResults);
        $('.list-group').append(articleWrapper);
    }
    

  }).fail(function(err) {
    throw err;
  });
  // Don't refresh the page!
      return false;
});

//*****************************************
//  Clear Button
//*****************************************
$("#clear").on("click", function() {
  $(".list-group").empty();
  console.log("emptied");
  // Don't refresh the page!
  return false;

  });
