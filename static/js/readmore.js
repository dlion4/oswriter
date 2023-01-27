    
        jQuery(document).ready(function($) {
            if (jQuery('[data-readmore]').length > 0) {
                jQuery('[data-readmore]').readmore({
                    collapsedHeight: 313,
                    moreLink: '<a href="#">Read more</a>'
                });
            }
            if (jQuery('[data-readmoref]').length > 0) {
                jQuery('[data-readmoref]').readmore({
                    collapsedHeight: 189,
                    moreLink: '<a href="#">Read more</a>'
                });
            }
            if (jQuery('[data-readmoret]').length > 0) {
                jQuery('[data-readmoret]').readmore({
                    collapsedHeight: 380,
                    moreLink: '<a href="#">Read more</a>'
                });
            }
            //nav
            if ($(window).width() > 993) {
                $('[data-nav] > ul >li').hover(function() {
                    $(this).each(function() {
                        $('[data-nav] li').toggleClass('transp');
                    });
                    $(this).removeClass('transp');
                });
                var menuChild = $('[data-nav] > ul >li.menu-item-has-children');
                $(menuChild).hover(function() {
                    $('body').toggleClass('open');
                });
            }
            if ($(window).width() < 993) {
                $('[data-nav] .menu-item-has-children > a').click(function() {
                    return false;
                })
            }
            if ($(window).width() < 769) {
                $('.footer__title').click(function() {
                    $(this).parent().find('ul').toggleClass('open');
                })
            }
            // fixed header
            var body = jQuery('body');
            jQuery(window).scroll(function() {
                if (jQuery(this).scrollTop() > 40) {
                    body.addClass("header_fixed");
                } else {
                    body.removeClass("header_fixed");
                }
            });
            //tabs
            $('[data-can]').on('click', function() {
                $(this).addClass('active').siblings().removeClass('active').closest('.can__wrap').find('ul.can__list').removeClass('active').eq($(this).index()).addClass('active');
            });
            // team
            $('[data-team]').click(function() {
                $(this).toggleClass('open');
                $(this).find('.team__title').toggleClass('open');
                $(this).find('p').slideToggle(300);
                $(this).find('ul').slideToggle(300);
            })
            //slider
            if (jQuery('[data-writers]').length > 0) {
                $('[data-writers]').slick({
                    dots: true,
                    speed: 300,
                    slidesToShow: 2,
                    responsive: [{
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }, ]
                });
            }
            if (jQuery('[data-talk]').length > 0) {
                $('[data-talk]').slick({
                    dots: true,
                    appendDots: $('[data-line]'),
                    speed: 300,
                    arrows: false,
                    slidesToShow: 4,
                    variableWidth: true
                });
            }
            var sliderItemsNum = $('[data-talk]').find('.slick-slide').not('.slick-cloned').length;
            var dotWidth = $('[data-THelp]').width() / sliderItemsNum;
            $('[data-line] ul li').css({
                'width': dotWidth
            });
            // faq
            if (jQuery('[data-faq]').length > 0) {
                $('[data-faq]').click(function() {
                    $(this).find('.faq__title').toggleClass('open');
                    $(this).find('p').slideToggle(300);
                })
            }
            // burger
            $('[data-burger]').click(function() {
                $('html').toggleClass("open");
                $(this).toggleClass("open");
                $('[data-nav]').toggleClass("open");
                $('body').toggleClass('open');
            });
            //cookies
            var banner = $('[data-cookies]');
            var blockTime = localStorage.getItem('blockTime');

            if (blockTime !== null) {
                setTimeout (function(){
                    banner.removeClass('show');
                }, 3000);
            } else {
                banner.addClass('show');
            };


            banner.find('.btn').click(function() {
                banner.removeClass('show');
                localStorage.setItem('blockTime', 1);
            });

            // sticky sidebar
            $(function() {
                var sidebar = $("[data-side]");
                if (sidebar.length > 0) {
                    var offset = sidebar.offset(),
                        topPadding = 150,
                        sectHeight = $("[data-blwrap]").height(),
                        headerHeight = $('[data-head]').height(),
                        sidebarHeight = sidebar.height();
                    $(window).scroll(function() {
                        if ($(window).scrollTop() + headerHeight > offset.top && (sectHeight - sidebarHeight) > $(window).scrollTop()) {
                            sidebar.stop().animate({
                                marginTop: $(window).scrollTop() - offset.top + topPadding
                            });
                        }
                        if ($(window).scrollTop() + headerHeight < offset.top) {
                            sidebar.stop().animate({
                                marginTop: 0
                            });
                        }
                        if ((headerHeight + sectHeight - sidebarHeight) <= $(window).scrollTop()) {
                            sidebar.stop().animate({
                                marginTop: sectHeight - sidebarHeight
                            });
                        }
                    });
                }
            });
            // adaptive
            if ($(window).width() < 994) {
                $('[data-blwrap]').before('<div class="adapt__auth"></div>');
                $('[data-author]').appendTo('.adapt__auth');
            }
        });
    