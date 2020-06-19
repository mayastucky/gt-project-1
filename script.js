var videoCount;
var activity;
var typeAdd;
var boredType;
var vidURL;
var vidID;
var vidEl;
var response2;

$(document).ready(function () {
  //?type=+buttonId specific;

  $(":button").on("click", function () {
    $("#boredAPI").empty();
    $("#youtubeAPI").empty();
    videoCount = 0;
    activity = "";
    typeAdd = "?type=";
    boredType = "https://www.boredapi.com/api/activity";

    var buttonId = $(this).attr("id");
    $(":button").removeClass("selected");
    $(this).addClass("selected");
    if (buttonId == "random") {
    } else {
      boredType = boredType + typeAdd + buttonId;
    }

    $.ajax({
      url: boredType,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      activity = response.activity;
      // Paste into #boredAPI div
      var boredAPIText = $("<div>").text(activity);
      $("#boredAPI").append(boredAPIText);
      var ytURL =
        "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
        activity +
        "&key=AIzaSyDKgsVLLSormwn1mfdafnThlX2E2VdFVA4";
      console.log(ytURL);
      // YT Ajax within Bored ajax
      $.ajax({
        url: ytURL,
        method: "GET",
      }).then(function (response2) {
        console.log(response2);
        vidID = response2.items[videoCount].id.videoId;
        console.log(vidID);
        vidURL = "https://youtube.com/embed/" + vidID;
        vidEl = $("<iframe allowfullscreen src=" + vidURL + ">").attr(
          "id",
          "ytVideo"
        );
        vidEl.attr(
          "allow",
          "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        );
        vidEl
          .attr("width", "560")
          .attr("height", "315")
          .attr("frameborder", "0")
          .attr("style", "padding: 10px");
        $("#youtubeAPI").append(
          "<button type = 'button' class = 'btn hidden' id = 'previous'>Previous</button>"
        );
        $("#youtubeAPI").append(vidEl);
        $("#youtubeAPI").append(
          "<button type = 'button' class = 'btn hidden' id = 'next'>Next</button>"
        );
        $("#next").on("click", function () {
          console.log("clicked");
          console.log(videoCount);
          videoCount++;
          if (videoCount > 4) {
            videoCount = 0;
          }
          vidID = response2.items[videoCount].id.videoId;
          vidURL = "https://youtube.com/embed/" + vidID;
          $("#ytVideo").attr("src", vidURL);
        });
        $("#previous").on("click", function () {
          console.log("clicked");
          console.log(videoCount);
          videoCount--;
          if (videoCount < 0) {
            videoCount = 4;
          }
          vidID = response2.items[videoCount].id.videoId;
          vidURL = "https://youtube.com/embed/" + vidID;
          $("#ytVideo").attr("src", vidURL);
        });
      });
    });
  });
});
