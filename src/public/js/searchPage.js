$(window).on('scroll',function(){
    if (Math.round($(window).scrollTop()) > 400) {
        $("#topbar").removeClass('topbar-noscroll')
        $("#topbar").addClass("topbar-scroll");
    } else {
        $("#topbar").removeClass('topbar-scroll');
        $("#topbar").addClass("topbar-noscroll");
    }
});