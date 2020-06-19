$(document).ready(function () {
  //?type=+buttonId specific;
  var videoCount
  $(":button").on("click", function () {
    $("#boredAPI").empty()
    $("#youtubeAPI").empty()
    var activity = "";
    var typeAdd = "?type=";
    var boredType = "https://www.boredapi.com/api/activity";
    
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
        console.log(vidID);
        var vidURL = "https://youtube.com/embed/" + vidID;
        var vidEl = $("<iframe allowfullscreen src=" + vidURL + ">").attr(
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
          .attr("frameborder", "0");
        $("#youtubeAPI").append(vidEl);
      });
    });
  });

  $("#next").on("click")

});
