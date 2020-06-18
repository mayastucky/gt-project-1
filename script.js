$(document).ready(function () {
  var activity = "";

  var boredType = "http://www.boredapi.com/api/activity" //?type=+buttonId specific;
//   $("<button>").on("click", function(){
//     var buttonId = $(this).attr("id");
  $.ajax({
    url: boredType,
    method: "GET",
  }).then(function (response) {

    console.log(response);
    activity = response.activity;
    // Paste into #boredAPI div
    var ytURL =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
      activity +
      "&key=AIzaSyBTBC_1X8CFQyIOAFv_AyrCOQPyejInNtI";
    console.log(ytURL)
    // YT Ajax within Bored ajax
    $.ajax({
      url: ytURL,
      method: "GET",
    }).then(function (response2) {
    //   $.cookie("Same-Site", "None")
      var vidID = response2.items[0].id.videoId;
      console.log(vidID)
      var vidURL = "http://youtube.com/embed/" + vidID;
      var vidEl = $("<iframe allowfullscreen src=" + vidURL + ">").attr("id", "ytVideo");
      vidEl.attr("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture")
      vidEl.attr("width","560").attr("height","315").attr("frameborder","0")
      $("#youtubeAPI").append(vidEl);
    });

    $("<button>").on("click", function () {});
    //["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"
//   });
});
})
