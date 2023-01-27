window.addEventListener('DOMContentLoaded', (event) => {
    //lazy load
    $("img[lazzy]").each(function () {
        $(this).attr("src", $(this).attr("lazzy"));
    });

    //easy slider how-it-work
    $('.hiw-item-wrap .hiw-item').click(function (e) {
        $('.hiw-item-wrap .hiw-item').each(function(){
            $(this).removeClass("active");
        });
        $(this).addClass("active");
        var index = $('.hiw-item-wrap .hiw-item').index(this) + 1;
        $(".slider-pic img").attr('src',"https://1ws.com/img/slider-"+index+".png");
    });

    //faq
    $(".faq-content--item .header").on("click", function () {
        if ($(this).parent().hasClass("active")) {
            $(".faq-content--item ").removeClass("active");
        } else {
            $(".faq-content--item").removeClass("active");
            $(this).parent().addClass("active");
        }
    });
    
    
    //review slider
    if($('#testimonials-slider').length){
        sliderReview();
    }
    
    function sliderReview(){
        $('#testimonials-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            autoplay: false,
            speed: 300,
            dots: true,
            arrows: false,
            fade: false,
            mobileFirst: true,
            responsive: [
                  {
                          breakpoint: 767,
                          settings: 'unslick'
                  }
            ]
        });
    }
    
    //tooltip for academic level
    var getWindowWidth = $(window).width();

    $(".calc_form .info-tooltip").hover(function () {
        $(this).addClass('info-tooltip-active');
        $('body').addClass('open-tooltip-lvl');
        $('.info-tooltip-wrap').show();
        if (getWindowWidth >= 768) {
            if ($(window).scrollTop() > ($(this).offset().top - 220)) {
                $(this).parent().find('.info-tooltip-wrap').addClass('info-tooltip-bottom');
            }else{
                $(this).parent().find('.info-tooltip-wrap').removeClass('info-tooltip-bottom');
            }
        }
    }, function () {
        if (getWindowWidth >= 768) {
            $(this).removeClass('info-tooltip-active');
            $('.info-tooltip-wrap').hide();
            $('body').removeClass('open-tooltip-lvl');
        }
    });

    $('.close-mob-tooltip').on('click touchstart', function () {
        if (getWindowWidth <= 767) {
            $('.calc_form .info-tooltip').removeClass('info-tooltip-active');
            $('body').removeClass('open-tooltip-lvl');
            $(this).parent().closest('.info-tooltip-wrap').hide();
        }
    });
    //END tooltip for academic level
    
    $(".navbar-toggle").on("click", function(){
        $("body").toggleClass("menu-open");
    });

    $(".select2_pices").select2({
        minimumResultsForSearch: -1,
    });
   
});