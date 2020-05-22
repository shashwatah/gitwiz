$(window).on('scroll',function(){
    if (Math.round($(window).scrollTop()) > 400) {
        $("#topbar").removeClass('topbar-noscroll')
        $("#topbar").addClass("topbar-scroll");
    } else {
        $("#topbar").removeClass('topbar-scroll');
        $("#topbar").addClass("topbar-noscroll");
    }
});

const container = document.getElementById("res-container")


$.ajax({
    method: "POST",
    url: "/fetch",
    data: {
        query: query
    },
    success: function(data) {
        container.innerHTML = "";
        for(const chunk of data) {
            console.log(chunk);
            container.innerHTML += chunk.htmlString;
        }
    }
})
