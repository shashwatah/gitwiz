$(window).on('scroll',function(){
    if (Math.round($(window).scrollTop()) > 400) {
        $("#topbar").removeClass('topbar-noscroll')
        $("#topbar").addClass("topbar-scroll");
    } else {
        $("#topbar").removeClass('topbar-scroll');
        $("#topbar").addClass("topbar-noscroll");
    }
});

const resContainer = document.getElementById("res-container")
const resCount = document.getElementById("query-res-count");

$.ajax({
    method: "POST",
    url: "/fetch",
    data: {
        query: query
    },
    success: function(data) {
        resCount.innerHTML = `${data.length} Result${data.length > 1 ? "s" : ""}`;
        for(const currentChunk of data) {
            resContainer.innerHTML += currentChunk.htmlString;
        }
    }
})
