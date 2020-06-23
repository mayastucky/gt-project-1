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
        "https://www.googleapis.com/youtube/v3/search?q=" +
        activity +
        "&key=AIzaSyCjx2987u_zBnYVkuri8eEgHpHwq3AbSRw";
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
        vidEl = $("<iframe allowfullscreen src=" + vidURL + ">")
          .attr("id", "ytVideo")
          .attr("style", "padding: 5px");
        vidEl.attr(
          "allow",
          "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        );
        vidEl
          .attr("width", "560")
          .attr("height", "315")
          .attr("frameborder", "0")
          .attr("style", "padding: 10px")
          .attr("style", "margin: auto");
        var buttonRow = $("<div class = 'row'>");
        var prevCol = $("<div class='col'>");
        var nextCol = $("<div class='col'>");

        var vidRow = $("<div class = 'row' id='videoRow'>");
        prevCol.append(
          "<button type = 'button' class = 'btn hidden' id = 'previous'>&#x2190;</button>"
        );
        nextCol.append(
          "<button type = 'button' class = 'btn hidden' id = 'next'>&#x2192;</button>"
        );
        buttonRow.append(prevCol).append(nextCol);
        $("#youtubeAPI").append(buttonRow);
        vidRow.append(vidEl);
        $("#youtubeAPI").append(vidRow);

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
