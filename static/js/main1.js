function callChat (){
    if ($("div").is(".bc-minimize-state")) {$(".bc-minimize-state").click(); } else { $("#chat-hide-link a").click();} return false;    
}

window.addEventListener('DOMContentLoaded', (event) => {

    AOS.init();
    
    $(".main-phones").hover(function () {
        $(this).addClass('opened').next().show()
    }, function () {
        $(this).removeClass('opened').next().hide()
    })

});