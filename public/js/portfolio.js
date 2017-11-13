var yelpCampSite = "https://matt-cronan.herokuapp.com/";
var rgbSite = "http://www.espn.com/";
var recipeSite = "https://stackoverflow.com";
var paratapSite = "https://reddit.com/r/politics";
var yelpCampDisp = "<p>Test</p><p>Test2</p>";
var rgbDisp = "<p>RGB</p><p>Another RGB para</p>";

$("#yelpcampBtn").click(function(){
  $("#iframe").attr('src', yelpCampSite);
	$("#projectInfo").html(yelpCampDisp);
});

$("#rgbBtn").click(function(){
	$("#iframe").attr('src', rgbSite);
	$("#projectInfo").html(rgbDisp);
});

$("#recipeBtn").click(function(){
	$("#iframe").attr('src', recipeSite);
	$("#projectInfo").html(yelpCampDisp);
});

$("#paratapBtn").click(function(){
	$("#iframe").attr('src', paratapSite);
	$("#projectInfo").html(yelpCampDisp);
});