$(window).on('scroll',function(){
    if (Math.round($(window).scrollTop()) > 400) {
        $("#topbar").removeClass('topbar-noscroll')
        $("#topbar").addClass("topbar-scroll");
    } else {
        $("#topbar").removeClass('topbar-scroll');
        $("#topbar").addClass("topbar-noscroll");
    }
});

const resContainer = document.getElementById("res-container");
const queryInfoContainer = document.getElementById("query-info-container");
const queryTitle = document.getElementById("query-title");
const queryResCount = document.getElementById("query-res-count");

$.ajax({
    method: "POST",
    url: "/fetch",
    data: {
        query: query
    },
    beforeSend: function() {
        queryTitle.innerHTML = queryTitle.innerHTML.length < 25 ? queryTitle.innerHTML : `${queryTitle.innerHTML.substring(0, 25)}...`;
    },
    success: function(data) {
        queryResCount.innerHTML = `${data.length} Result${data.length > 1 ? "s" : ""}`;
        queryInfoContainer.style.display ="block";
        for(const currentChunk of data) {
            resContainer.innerHTML += currentChunk.htmlString;
        }
        // console.log(data);
    },
    error: function(err) {
      resContainer.innerHTML = "";
      snackbarController(err.responseText);
    }
});
