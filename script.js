$(document).ready(function () {
    var activity



    var boredURL = "https://www.boredapi.com/api/activity/"
    
    $.ajax({
        url: boredURL,
        method: "GET",
      }).then(function (response) {
          console.log(response)
          $("<button>").on("click", function(){
            
            
            }


          })
          //["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"



      })
    
    
    
    })
    var ytURL="https://www.googleapis.com/youtube/v3/search?part=snippet&q=Dog&key=AIzaSyBTBC_1X8CFQyIOAFv_AyrCOQPyejInNtI"
    $.ajax({
        url: ytURL,
        method: "GET",
    }).then(function (response){
        console.log(response)
        vidID=response.items[0].id.videoID
    })
