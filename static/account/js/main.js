var new_datetimepicker = false;
var rate_order_after_auto_approve = false;
var messages_update_interval = false;
var firstMessageUpdate = true;

if ($.inArray('104', ['4', '6', '7', '8', '9', '10', '11', '14', '17', '18', '21', '23', '33', '36', '39', '41', '47', '49', '55', '58', '62', '70', '72', '82', '94', '100', '104']) > -1 || getParameterByNameInMain('datepricker')) {
    new_datetimepicker = true;
}
if ($.inArray('104', ['4', '6', '7', '8', '9', '10', '11', '14', '17', '18', '21', '23', '33', '36', '39', '41', '47', '49', '55', '58', '62', '70', '72', '100']) > -1) {
    var rate_order_after_auto_approve = true;
}

var in_development = (parseInt(getCookie('test_office')) === 1);

var rate_data = {
    writer: {
        value: false,
        feedback: false,
        errors: {
            empty: 'Please enter details',
            symbols: 'English only'
        },
        regex: new RegExp("^[A-Za-z0-9\\s!@#$%^&*()_+=\\-`~\\\]\[{}|';:\/.,?><\"]*$"),
        tip_amount_regex: new RegExp("^\\d+(\\.\\d+)*$")
    },
    service: {
        value: false,
        feedback: false,
        errors: {
            empty: 'Please enter details',
            symbols: 'English only'
        },
        regex: new RegExp("^[A-Za-z0-9\\s!@#$%^&*()_+=\\-`~\\\]\[{}|';:\/.,?><\"]*$")
    },
    feedback: {
        errors: {
            empty: 'Please enter details',
            symbols: 'English only'
        },
        regex: new RegExp("^[A-Za-z0-9\\s!@#$%^&*()_+=\\-`~\\\]\[{}|';:\/.,?><\"]*$")
    }
};

var tips_data = {
    errors: {
        min: 'Minimum transaction limit is $1',
        max: 'Maximum transaction limit is $500',
        not_valid: 'Please enter the correct amount'
    }
};

var price_order = 0;

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

/*Ajax load page content START*/
$(document).on("click", "[data-ajax-load-page]", function (event) {
    if ($(event.target).attr('data-no-event-click')) {
        event.stopPropagation();
        return false;
    }
    $('[data-ajax-load-page]').addClass('disabled');
    var ajax_page = $(this).data('ajaxLoadPage');
    callAjax(
            'html',
            ajax_page,
            function (data) {
                var isValidJSON = data ? true : false;
                try {
                    JSON.parse(data)
                } catch (e) {
                    isValidJSON = false
                }
                if (isValidJSON) {
                    var result = JSON.parse(data);
                    if (result.redirect) {
                        document.location.href = result.redirect;
                    } else {
                        $('[data-ajax-load-page]').removeClass('disabled');
                        $('.container-fluid[data-main-content]').removeClass('container-ajax-list'); 
                        if (result.html) {
                            var content_page = result.html;
                            $('[data-main-content]').html(content_page).append('<div class="pleasewait"></div>');
                            var title = content_page.split('<!--BlockTitle', 2);
                            title = title.join('');
                            var title = title.split('BlockTitle-->', 1);
                            title = title.join( );
                            $('html head').find('title').text(title);
                        }

                        var main_content = document.getElementById("content");
                        main_content.scrollIntoView(true);
                        var page_title = $('html head').find('title').text() ? $.trim($('html head').find('title').text()) : 'Page Title';
                        window.history.pushState({}, page_title, ajax_page);                                
                    }
                    $(".pleasewait").fadeOut("slow");
                }
            },
            {ajax_load_page: true}
    );
    return false;
});
/*Ajax load page content END*/

$(document).ready(function () {
    customRadio();
    customSelect()
    toggleSidebar();
    hideSidebar();
    progressStatus();
    showExtras();
    bannerItem();
    favoriteWriter();
    datePicker();
    orderTitle();
    showSpinner();
    showRewards();
    Tabs();
    sliderItems();
    selectTabs();
    modalClientInformation();
    customTooltip();
    anchorLinkScroll();
    //checkAutoApprovedOrdersForRate();
//    counterMessagesUpdateCronStart();

    if ($(".timeline-inner").length) {
        timerMobile();
    }
    if ($(".timeline-container").length) {
        swipeSlider();
    }


    $('input[name="options"]').on("change",function(){
        console.log("lllllllll");
        if($(this).prop("checked", true) && $(this).hasClass('add_more_info')){
            $('.options_txt_block').show();
        }else{
            $('.options_txt_block').hide();
        }
    });

    $(window).on('resize', function () {
        hideSidebar();
        orderTitle();
        sliderItems();
        clearTimeout(window.resizedFinished);
        if ($("#exstras-wrapper").length) {
            CustomScroll();
        }
    });

    if ($(".datetimepicker").length) {
        datePicker();
    }
    if ($("#exstras-wrapper").length) {
        CustomScroll();
    }
    ContactsButton();

    $('[data-toggle="tooltip"]').tooltip();

    if ($(".paynow_body").length) {
        $('.paynow_body').addClass("scroll-pane");
        JSScrollStart(
                $('.scroll-pane'),
                $("#ModalPayNow"),
                $("#ModalPayNow"),
                "shown.bs.modal"
                );
    }
    setTimeout(function () {
        if ($('.banner_top_wrp_earn .got_it, .banner_top_wrp_earn .not_interested').length > 0) {
            $('.banner_top_wrp_earn .got_it, .banner_top_wrp_earn .not_interested').on('click', function () {
                console.log("Triggered");
                var button = $(this);

                if ($.inArray('104', ['6', '11']) !== -1 && parseInt(button.attr('data-action-type')) === 1) {
                    location.href = '/earn_with_us';
                }

                button.closest('.banner_top_wrp_earn').slideUp(500, function () {
                    button.closest('.banner_top_wrp_earn').detach();
                });

                callAjax('json', '/profile?ajax=HideEarnWithUsBanner', function () {
                }, {
                    action_type: button.attr('data-action-type')
                });
            });
        }
    }, 500);

    if (typeof $.cookie('tip_order') !== 'undefined') {
        $.removeCookie('tip_order', {path: '/'});
        $("#ModalWithoutTips").modal('show');
        if ($("#ModalWithoutTips").attr('data-not-cancel') == '1') {
            $('#ModalWithoutTips').on('hidden.bs.modal', function (e) {               
               location.reload();
            });
        } else {
            setTimeout(function () {
                $("#ModalWithoutTips").modal('hide');
            }, 5000);
        }
    }

    var owl = $('.payment-carousel');
    owl.owlCarousel({
        margin: 8,
        items: 1,
        dots: false,
        nav: true,
        loop: true,
        autoWidth: true
    });

    $('.payment_bonus').on('click', function () {
        if ($(this).hasClass('disabled-element'))
            return false;
        $(this).parents('.payment-col').addClass('active-bonus-pay');
        $(this).hide();
        $(this).parents('.payment-col').find('.bonus-wrapper').show();
    });

    $('.close-bonus-payment').on('click', function () {
        $(this).parents('.payment-col').find('.bonus-wrapper').hide();
        $(this).parents('.payment-col').removeClass('active-bonus-pay');
        $(this).parents('.payment-col').find('.payment_bonus').show();
    });

    $('.btn-gopay').on('click', function () {
        $(this).parents('.payment-col').find('.payment_bonus').show();
        $(this).parents('.bonus-wrapper').hide();
    });

    $('.btn-pay-collapse').on('click', function () {
        $(this).parents('.payment-col').find('.payment_bonus').show();
        $(this).parents('.bonus-wrapper').hide();
    });

    // check height for sticky orders/writers item head
    function checkForChanges() {
        var height = $('.topbar').height();
        $('.orders-caption').css('top', height);
        setTimeout(checkForChanges, 500);
    }
    checkForChanges();

    /*Rate our team Start*/
    $('[data-service-rate]').on('click', function () {
        $('#form_order_rate_service input[name="id"]').val($(this).data('orderId'));
    });

    $('[name="service_rate"]').click(function () {
        $('[data-service-rate-error]').hide();
        $('[data-service-rate-msg]').text($(this).attr('title')).show();
        if ($('[name="recommend_rate"]').is(':checked')) {
            $('[data-rate-service-submit]').removeClass('btn-rate-disabled');
        }
    });

    $('[name="recommend_rate"]').change(function () {
        $('[data-recommend-rate-error]').hide();
        $('[data-recommend-rate-msg]').text($(this).attr('title')).show();
        if ($('[name="service_rate"]').is(':checked')) {
            $('[data-rate-service-submit]').removeClass('btn-rate-disabled');
        }
    });

    $('[data-rate-service-submit]').on('click', function () {
        if ($(this).hasClass('ajax-submit')) {
            rateServiceAjaxSubmit.call(this);
        } else {
            var form = $('#form_order_rate_service');
            if ($(this).hasClass('btn-rate-disabled')) {
                showMessageOnOurRate();
                return false;
            }

            var button_submit = $(this);
            button_submit.addClass('btn-rate-disabled');
            if (form.valid()) {
                var preloader = $('#page-preloader');
                preloader.fadeIn();
                callAjax('json', '/orders?ajax=rateService', function (data) {
                    if(typeof CURRENT_USER !== 'undefined' && CURRENT_USER.id != 307915530){
                        window.location.reload(true);

                    }else{
                        console.log(44444444);
                        console.log(response_data);
                        console.log(data);
                        $("#ModalAfterLowRateService").modal('show');
                        $("#ModalAfterLowRateService input[name='options']:eq(0)").trigger("click");
                        //$('div.sorry_option').not(":eq("+(response_data.result.rate_sorry_options - 1)+")").remove();
                    }
                    
                    
                    
                    
                    
                    
                    
                }, form.serialize(), form);
            } else {
                showMessageOnOurRate();
                button_submit.removeClass('btn-rate-disabled');
            }
            return false;
        }
    });
    /*Rate our team End*/
    

    $('#ModalAfterLowRateWithTextarea textarea[name="manager_help"]').on("keyup", function () {
        delWrongSymbols($(this));
        if($(this).val().trim().split(" ").length > 150){
            $('.rate-mess-error').remove();
            $(this).parent().append('<div class="alert rate-mess-error alert-error alert-block" style="color:red; padding:0;">Oops, you’ve reached the limit of 150 words</div>');
        }else{
            $('.rate-mess-error').remove();
        }
    });
    
    
        $("#ModalAfterLowRateService button").on('click', function () {
            
            
            
            var sry_option = $("#ModalAfterLowRateService form input[name='options']:checked").val();
            var order_id=$(".topic-order-id").text().replace(/\D/g, "");

            var button_submit = $(this);
            button_submit.addClass('btn-rate-disabled');
            button_submit.attr('disabled','disabled');
            
            callAjax("json", "/orders?ajax=SorryRateService", function (response_data) {
                console.log(response_data);

                $("#ModalAfterLowRateService").modal('hide');
                $("#sorryDiscount .disc_sry_code").text(response_data.result.return_code);
                $("#sorryDiscount .opt_name").text(response_data.result.return_option_desc);
                $("#sorryDiscount").modal('show');

            }, {'option_id':sry_option, 'order_id':$('.curr_order').val()});

                return false;
        });
    
    

        $("#ModalAfterLowRateWithTextarea button").on('click', function () {

            if($('.rate-mess-error').length>0){ 
                return false;
            }
            
            
            var button_submit = $(this);
            button_submit.attr('disabled','disabled');
            var form = $('#ModalAfterLowRateWithTextarea form');
            
            if(!button_submit.hasClass("btn-rate-disabled")){
                callAjax("json", "/orders?ajax=SorryRateWriter", function (response_data) {
                    console.log(response_data);
                    button_submit.addClass('btn-rate-disabled');
                    
                    $("#ModalAfterLowRateWithTextarea").modal('hide');
                    $("#sorryDiscountWriter .text-responsive").html(response_data.result.return_code.desc);
                    $("#sorryDiscountWriter").modal('show');

                    if(response_data.result.return_code.refresh==1){
                        timeoutModal = setTimeout(function () {
                            $("#sorryDiscountWriter").modal('hide');
                        }, 10000);
                    }




                }, form.serialize());
            }
            return false;
        });

    /*Rate Writer Start*/
    $('[data-writer-rate]').on('click', function () {
        $('#form_order_rate_paper input[name="id"]').val($(this).data('orderId'));
    });

    $('[name="writer_rate"]').click(function () {
        $('[data-writer-rate-error]').hide();
        $('[data-writer-rate-msg]').text($(this).attr('title')).show();
        $('[data-rate-writer-submit]').removeClass('btn-rate-disabled');

        if ($.inArray($(this).val() * 1, [1, 2, 3]) > -1) {
            $('[data-writer-rate-block-writer-msg]').show();
        } else {
            $('[data-writer-rate-block-writer-msg]').hide();
        }
    });

//    $('#ModalRateWriter [data-add-writer-blacklist]').click(function(){
//        $('#ModalRateWriter').modal('hide');
//    });


    /* start send for paid revision on detailed orders*/

    $("[data-send-for-revision-paid-submit]").click(function () {
        console.log('clicked padi revision');
        $('#form_order_revision_paid').submit();
    });

    /* end send for paid revision on detailed orders*/


    /* start send for revision on detailed orders*/
    $("[data-send-for-revision-submit]").click(function () {
        var preloader = $('#page-preloader');
        var form = $('#form_order_revision_upd');
        var order_id = form.find('[name="order_id"]').val();
        var reasons = form.find('[name="reasons[]"]').val();
        if (!reasons) {
            form.find('[data-error="reasons"]').show();
            form.find('[name="reasons[]"]').closest(".block_element").find('.select2-container').addClass('alert-control');
        } else {
            form.find('[data-error="reasons"]').hide();
            form.find('[name="reasons[]"]').closest(".block_element").find('.select2-container').removeClass('alert-control');

        }

        if (form.valid() && reasons) {
            preloader.fadeIn();
            var form_data = form.serialize();
            if ('104' == '29' && MOBILE_APP) {
                FlurryAgent.logEvent("Order Revision", {
                    idUser: CURRENT_USER.id + "",
                    userType: CURRENT_USER.mkt_type + "",
                    idOrder: ORDER.id + "",
                    page: ORDER.pages_num + "",
                    academicLevel: ORDER.academic_level + "",
                    deadline: ORDER.deadline + "",
                    paymentSystem: ORDER.payment_system + ""
                });
                FlurryAgent.endSession();
            }
            callAjax("json", "/orders?ajax=revise", function (response_data) {
                if (typeof (response_data.sent_for_revision) != "undefined" && response_data.sent_for_revision == true) {
                    if ($("#ModalSendRevision").hasClass('new-revision')) {
                        $("#ModalSendRevision").modal('hide');

                        setTimeout(function () {
                            $("#ModalSuccessRevision").modal('show');
                            setTimeout(function () {
                                $("#ModalSuccessRevision").modal('hide');
                                location.reload();
                            }, 5000);
                        }, 300);
                    } else {
                        location.replace("/orders?subcom=detailed&id=" + ORDER.id);
                    }
                }
                preloader.fadeOut();
            }, form_data, form);
        }
    });
    /* end send for revision on detailed orders*/

    $('[data-rate-writer-submit]').click(function () {
        console.log(1);
        if ($(this).hasClass('ajax-submit')) {
            console.log(2);
            rateWriterAjaxSubmit.call(this);
        } else {
            var form = $('#form_order_rate_paper');
            if ($(this).hasClass('btn-rate-disabled')) {
                if (!$('[name="writer_rate"]').is(':checked')) {
                    $('[data-writer-rate-error]').show();
                }
                return false;
            }
            if (form.valid()) {
                var preloader = $('#page-preloader');
                preloader.fadeIn();
                callAjax('json', '/orders?ajax=rateWriter', function (data) {
                    window.location.reload(true);
                }, form.serialize(), form);
            }
            return false;
        }
    });

    $('.new-rate-modal').find('[name="writer_rate"]').click(function () {
        if ($('[name="writer_rate"]').is(':checked')) {
            $('[data-comment-rate], [data-improve-rate]').show();
            $('[data-new-rate-submit]').removeClass('btn-rate-disabled');
        }

        if ($(this).val() == 5) {
            $('.improve-items-holder').hide();
            $('.writers-tip_holder').show();
        } else {
            $('.writers-tip_holder').hide();
            $('.improve-items-holder').show();
        }

        var submit_text = "Submit";

        if (($(this).val() * 1) == 5 && ($('.btn-tip-writer.btn-tip-writer-active').length > 0 || $('[name="tip-amount"]').is(':visible'))) {
            submit_text = "Submit & Pay";
             submit_n_pay = true;
        }
        $(this).closest('#ModalRatePaper').find('button[data-new-rate-submit]').html(submit_text);
    });

    $('.btn-tip-writer').on('click', function () {
        $(this).toggleClass('btn-tip-writer-active').siblings().removeClass('btn-tip-writer-active');
        $('[name="tip-amount"]').val('').hide();
        $('.text-custom-tip').show();

        $(this).closest('form').find('.error-custom-tips').html('').hide();

        if ($(this).hasClass('btn-tip-writer-active')) {
            $(this).closest('#ModalRatePaper').find('button[data-new-rate-submit]').html("Submit & Pay");
             submit_n_pay = true;
        } else {
            $(this).closest('#ModalRatePaper').find('button[data-new-rate-submit]').html("Submit");
        }
    });

    $('.text-custom-tip').on('click', function () {
        $(this).closest('.modal')
                .find('.text-custom-tip').hide();
        $(this).closest('.modal')
                .find('.btn-tip-writer').removeClass('btn-tip-writer-active');
        $(this).closest('.modal')
                .find('[name="tip-amount"]').show();
        $(this).closest('.modal')
                .find('button[data-new-rate-submit]').html("Submit");
    });

    $('[name="writer_rate"]').click(function () {
        if ($(this).val() == 5) {
            $('[data-comment-title]').text('Light up the writer’s day with your comment.');
        } else if ($(this).val() == 4) {
            $('[data-comment-title]').text('How can our writer be even better?');
        } else {
            $('[data-comment-title]').text('What went wrong? We badly want to fix it!');
        }

        $(this).closest('#ModalRatePaper').removeClass('modal-popup').addClass('modal-custom');
    });

    $('[name="tip-amount"]').on('input', function () {
        var submit_text = "Submit";
        if ($(this).val().length > 0) {
            submit_text = "Submit & Pay";
        }

        $(this).closest('#ModalRatePaper').find('button[data-new-rate-submit]').text(submit_text);
    });
    $('[name="tip-amount"]').on('blur', function () {
        var input = $(this),
                value = input.val();

        input.val(value.replace(/,/g, '.'));
    });
    /*Rate Writer End*/



//Summary Rate Open Modal
    $('[data-summary-rate]').click(function () {
        var form_rate = $('#form_order_rate');
        form_rate.find('input[name="id"]').val($(this).data('orderId'));
        /*form_rate.find('input[name="writer_id"]').val($(this).data('writerId'));
         var form_rate_type_of_paper = $(this).data('typeOfPaper');
         var form_rate_subject = $(this).data('subject');
         if (form_rate_subject && form_rate_type_of_paper && form_rate_subject != 'Other' && form_rate_type_of_paper != 'Other') {
         form_rate.find('span.rate_your_paper_subject').html(form_rate_subject + ' ' + form_rate_type_of_paper);
         } else {
         form_rate.find('span.rate_your_paper_subject').html('Paper');
         }*/
    });

    $('#form_order_rate input').click(function () {
        var is_error = false;
        $('#form_order_rate input').each(function (index) {
            switch ($(this).attr('name')) {
                case 'service_rate':
                    if (!$('[name="service_rate"]').is(':checked')) {
                        is_error = true;
                    }
                case 'recommend_rate':
                    if (!$('[name="recommend_rate"]').is(':checked')) {
                        is_error = true;
                    }
                case 'writer_rate':
                    if (!$('[name="writer_rate"]').is(':checked')) {
                        is_error = true;
                    }
            }
        });
        if (!is_error) {
            $('#form_order_rate [data-rate-summary-submit]').removeClass('btn-rate-disabled');
        }
    });

//Summary Rate Send Rate START
    $('[data-rate-summary-submit]').on('click', function () {
        if ($(this).hasClass('ajax-submit')) {
            rateSummaryAjaxSubmit(this);
        } else {
            var form = $('#form_order_rate');

            var is_error = false;

            if ($(this).hasClass('btn-rate-disabled')) {
                showMessageOnOurRate();
                is_error = true;
            }

            if ($(this).hasClass('btn-rate-disabled')) {
                if (!$('[name="writer_rate"]').is(':checked')) {
                    $('[data-writer-rate-error]').show();
                }
                is_error = true;
            }

            if (is_error) {
                return false;
            }

            var button_submit = $(this);
            button_submit.addClass('btn-rate-disabled');

            if (form.valid()) {
                var preloader = $('#page-preloader');
                preloader.fadeIn();
                callAjax('json', '/orders?ajax=rate', function (data) {
                    window.location.reload(true);
                }, form.serialize(), form);
            } else {
                showMessageOnOurRate();
                button_submit.removeClass('btn-rate-disabled');
            }
            return false;
        }
    });


    $('#form_order_rate [data-link-open]').click(function () {
        var block_change = $(this).data('linkOpen');
        if ($(this).hasClass('open')) {
            $(this).text($(this).data('openText'));
            $(this).removeClass('open');
        } else {
            $(this).text($(this).data('hideText'));
            $(this).addClass('open');
        }
        $('div[data-block-open="' + block_change + '"]').toggle();
    });
//Summary Rate Send Rate END


    /*Payment Modal Start*/
    $('body').on('click', '[data-btn-pay]', function (evt) {

        if (!SINGLE_PAYMENT_METHOD || CURRENT_USER.store_credit > 0) {
            evt.preventDefault();
            if ('104' == '10' || '104' == '7') {
                if ($(this).data('full-paid') && $(this).data('full-paid') == 1) {
                    $('#payment_form [name="full_paid"]').val(1);
                } else {
                    $('#payment_form [name="full_paid"]').val(0);
                }
            }
            var preloader = $('#page-preloader');
            preloader.fadeIn();
            var button_pay = $(this);
            callAjax("json", "/orders?ajax=detailedForPayModal", function (data) {
                preloader.fadeOut();
                var add_nfo = (typeof (data) != "undefined" && data != null) ? data : false;
                pay_modal(button_pay.data('bid'), button_pay.data('token'), parseFloat(button_pay.data('bill-price')), button_pay.data('deadline-id'), button_pay.data("order"), add_nfo);
                var userMaxBonuses = $('#ModalPayNow [data-max-bonus]').data('maxBonus') * 1;
                var priceOrder = $('#ModalPayNow [data-price-pay-modal]').text() * 1;
                if (userMaxBonuses && userMaxBonuses > 0) {
                    if (userMaxBonuses > priceOrder) {
                        $('#ModalPayNow [name="amount"]').val(parseFloat(priceOrder).toFixed(2));
                    } else {
                        $('#ModalPayNow [name="amount"]').val(parseFloat(userMaxBonuses).toFixed(2));
                    }
                }
                if ($.inArray('104', ['4','6','7','8','9','10','11','14','17','18','21','23','33','36','39','41','47','49','55','58','62','70','72','94']) !== -1) {
                    price_order = priceOrder;
                    var form_pay = $('#payment_form');
                    var bid = form_pay.find('[name="bid"]').val();
                    var token = form_pay.find('[name="token"]').val();
                    postTransactionData = (paymentData, srvResult) => {
                        $.ajax({
                            url: "/payment?from_admin=1&bid=" + bid + "&token=" + token + "&m=34",
                            method: 'post',
                            data: '&appleToken=' + encodeURIComponent(JSON.stringify(paymentData.token)),
                            success: function(result){
                                const response = JSON.parse(result);
                                console.log(response);
                                srvResult(response.result);
                            }
                        });
                    }
                }
                $('#ModalPayNow').modal('show');
            }, {
                order_id: $(this).data("order")
            });
        }
    });

    /*Send to Payment System Start*/          
    $('[data-payment-method]').on('click', function (event) {
        if ($.inArray('104', ['4','6','7','8','9','10','11','14','17','18','21','23','33','36','39','41','47','49','55','58','62','70','72','94']) !== -1) {
            if ($(this).data('payment-method') == 34) {
                console.log('pay with applepay');
                payByApple(event);
                return;
            }
        }
        if ($(this).data('payment-method') == 53) {
            if ($(event.target).closest('.crypto-select').length) {
                return false;
            }
            if ($(event.target).closest('.tooltip-crypto').length) {
                return false;
            }
        }
        if ($(this).hasClass('disabled-element'))
            return false;
        var form_pay = $(this).closest('#payment_form');
        form_pay.find('[name="m"]').val($(this).data('payment-method'));
        form_pay.trigger('submit');
    });
    
    $('#payment_form').find('[name="spoynt_method"]').change(function () {
        $('#payment_form').find('[name="spoynt_method_mobile"]').find('option[value="' + $(this).val() + '"]').prop('selected', true);
    });

    $('#payment_form').find('[name="spoynt_method_mobile"]').change(function () {
        $('#payment_form').find('[name="spoynt_method"]').find('option[value="' + $(this).val() + '"]').prop('selected', true);
        $('#payment_form').find('[name="spoynt_method"]').change();
    });
    
    /*Send to Payment System End*/

    /*Validation Bonus on Pay Modal Start*/
    $('body').on('keyup', '#ModalPayNow [name="amount"]', function () {
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var priceOrder = parseFloat($('#ModalPayNow [data-price-pay-modal]').text());
        var userMaxBonuses = parseFloat($('#ModalPayNow [data-max-bonus]').data('maxBonus'));
        var userBonuses = parseFloat($(this).val());
        if (userBonuses && userBonuses < priceOrder && userBonuses < userMaxBonuses) {
            $('.bonus_code_hint').show();
            $('[data-using-bonus]').text(userBonuses);
            $('[data-remaining-pay ]').text(parseFloat(priceOrder - userBonuses).toFixed(2));
        } else {
            $('.bonus_code_hint').hide();
        }
        validBonusOnModal();
    });

    get_add_bill = false;
    var full_paid_store_credit = false;
    var wait_for_apply_bonus = false;
    $("#ModalPayNow .apply-bonus").click(function () {
        if (validBonusOnModal()) {
            if (wait_for_apply_bonus)
                return false;
            wait_for_apply_bonus = true;
            bonus_input = $("#ModalPayNow [name='amount']");
            bonus_error = $("#ModalPayNow .bonus_code_error_place");
            var form = $("#payment_form");
            order_id = form.find('[name="moid"]').val();
            bonus_pay = form.find('[name="amount"]').val() * 1;
            $("#ModalPayNow .call-spinner").show();
            $("#ModalPayNow .apply_bonus_span").hide();
            disabledPayButtons();
            callAjax("json", "/orders?ajax=billPayWithCredit", function (data) {
                if (typeof (data.payed) != "undefined" && data.payed == true) {
                    enabledPayButtons();
                    if (typeof (data.full_payed) != "undefined" && data.full_payed == true) {
                        $("#ModalPayNow").modal('hide');
                        full_paid_store_credit = true;
                        get_add_bill = false;
                        $('#ModalThankYou').find('[data-thankyou-order-id]').attr('href', "/orders?subcom=detailed&id=" + order_id);
                        $('#ModalThankYou').modal('show');
                    } else if (typeof (data.bill) != "undefined") {
                        var payed_by_bonuses = $('[data-payed-pay-modal]').text() * 1;
                        $('[data-payed-pay-modal]').text(parseFloat(bonus_pay + payed_by_bonuses).toFixed(2));
                        $('[data-store-credit-pay-modal]').text(data.store_credit);
                        $('[data-max-bonus]').data('maxBonus', data.store_credit);
                        $('[data-price-pay-modal]').text(data.bill.price);
                        $('#payment_form [name="bid"]').val(data.bill.id);
                        $('#payment_form [name="token"]').val(data.bill.token);
                        $('#ModalPayNow .payed_by_bonuses').show();
                        get_add_bill = true;
                        $("#ModalPayNow .call-spinner").hide();
                        $("#ModalPayNow .apply_bonus_span").show();
                        $('#ModalPayNow [name="amount"]').trigger('keyup');
                        if (data.store_credit * 1 == 0) {
                            $("#ModalPayNow .active-bonus-pay").removeClass('active-bonus-pay');
                            $("#ModalPayNow [data-bonus-inf]").text('You have no bonus yet');
                            $("#ModalPayNow .payment_bonus").addClass('disabled-element');
                            $("#ModalPayNow .btn-pay-collapse").trigger('click');
                        }
                    } else {
                        //location.reload();    
                    }
                } else {
                    if (typeof (data.payed) != "undefined" && data.payed.error && data.payed.error.amount) {
                        bonus_input.addClass('alert-control');
                        bonus_error.text(data.payed.error.amount);
                        $("#ModalPayNow .call-spinner").hide();
                        $('#ModalPayNow [error="amount"]').remove();
                    }
                    //location.reload();
                }
                wait_for_apply_bonus = false;
            }, form.serialize(), form);
        }
    });

    $('[data-open-modal]').each(function () {
        $(this).modal('show');
    });

    $('#ModalThankYou').on('hidden.bs.modal', function (e) {
        if (full_paid_store_credit) {
            location.reload();
        }
    });

    $('#ModalPayNow').on('hidden.bs.modal', function (e) {
        if (get_add_bill) {
            location.reload();
        }
    });

    /*Validation Bonus on Pay Modal End*/

    /*Payment Modal End*/

    /* Modal Login Auth phone highlighted*/
    jQuery(document).on('click', function (e) {
        var el = '.phone-box .select2';
        if (jQuery(e.target).closest(el).length)
            return;
        $('#input_phone').removeClass('select-highlight');
    });

    $('.phone-box .select2-phone').on('select2:unselect select2:select select2:close', function (evt) {
        $(this).parent().closest('.input-phone-inner').find('#input_phone').removeClass('select-highlight');
    });

    $(".phone-box .select2").on('click', function () {
        if ($(this).hasClass('select2-container--open')) {
            $('#input_phone').toggleClass('select-highlight');
        } else {
            $('#input_phone').removeClass('select-highlight');
        }
    });
    /* END Modal Login Auth */

//rate admin banner
    $("#hide_rate-admin-banner").on('click', function () {
        $(this).parents().closest('.rate-admin-banner').hide();
        callAjax("json", "/orders?ajax=SetNpsRateShow", function (result) {
        }, {});
    });

    $(".rate-emoji-item").on('click', function () {
        $('.rate-emoji-item').removeClass('rate-emoji-active');
        $(this).addClass('rate-emoji-active');

        if ($(this).hasClass('rate-emoji-active')) {
            $('.rate-admin-btn').removeClass('rate-admin-btn-dis');
        }

    });

    $(".rate-admin-btn").on('click', function () {
        if ($('.rate-admin-banner .rate-admin-items .rate-emoji-active').length == 0) {
            return false;
        }

        if ($('.rate-emoji-item').hasClass('rate-emoji-active')) {
            $(this).parents('.rate-emoji-holder').hide();

            $('.rate-second-banner').show();

            setTimeout(function () { // auto close rate
                if ($('.rate-admin-banner').is(':visible')) {
                    $('.rate-admin-banner').hide();
                    callAjax("json", "/orders?ajax=SetNpsRateShow", function (result) {
                    }, {});
                }
            }, 5000);

            callAjax("json", "/orders?ajax=NpsRate", function (result) {
            }, {
                id: parseInt($('.rate-admin-banner [name="nps_order_id"]').val()),
                recommend_rate: parseInt($('.rate-admin-banner .rate-admin-items .rate-emoji-active').html())
            });
        }



    });

    $('.rate-admin_textarea').on('paste input', function () {
        var responsiveWidth = $(window).width();
        if (responsiveWidth < 767) {
            if ($(this).outerHeight() > this.scrollHeight) {
                $(this).height(1);
            }
            while ($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
                $(this).height($(this).height() + 1);
            }
        }
    });

//END rate admin banner

//START writer rate
    $('#form_writer_rate [name="feedback_writer"]').on('blur', function () {
        validateWriterRateComment.call(this);
    });

    $('#form_writer_rate [data-new-rate-submit]').on('click', function () {

        if ($('.btn-send-revision.d-none').length > 0) {
            $('.btn-send-revision.d-none').removeClass('d-none');
        }
        
        let auto_approved_order = ($('#form_writer_rate [name="auto_approve_order"]').length && $('#form_writer_rate [name="auto_approve_order"]').val() === '1');

        if (validateWriterRateComment.call($('#form_writer_rate [name="feedback_writer"]').get())
            && validateWriterTips($('#form_writer_rate')) !== false
        ) {
            if (
                (
                    $.inArray('104', ['4', '10']) !== -1
                    || (in_development && $.inArray('104', []) !== -1)
                )
                && typeof ORDER !== 'undefined'
                && !auto_approved_order
            ) {
                var preloader = $('#page-preloader');
                preloader.fadeIn();

                if (typeof rate_and_approve !== 'undefined' && rate_and_approve){
                    rateWriterNewAjaxSubmit(true);
                    console.log("reload 11")
                } else {
                    callAjax(
                        'json',
                        '/orders?subcom=detailed&id=' + (ORDER.id) + '&tab=details&get_ajax_content=1',
                        function (data) {
                            reloadContent(
                                'orders_details_tab_content_ajax',
                                '#tab-1.order-details',
                                data,
                                function () {
                                    rateWriterNewAjaxSubmit(true);
                                }
                            );
                        }
                    );
                }
            } else {
                console.log("reload 21")
                rateWriterNewAjaxSubmit();
            }
        }
    });

    $('#form_writer_rate [data-new-rate-later]').on('click', function () {
        location.replace("/orders?subcom=detailed&id=" + ORDER.id);
    });

    $('#TipYourWriter [data-pay-tip]').on('click', function () {
        var form = $(this).closest('.modal');
        var tips_valid_res = validateWriterTips(form, true);
        if (
                form.find('[name="order_id"]').val() !== ''
                && tips_valid_res !== false // if valid
                ) {
            addWriterTip(form);
        }
    });



    $("#ModalSendRevision").on('hidden.bs.modal', function () {
        // fix modal 
        $("#ModalSendRevision").find('.revision-deadline p').addClass('d-none');
        $("#ModalSendRevision").find('.revision-deadline p:not(.after_rate)').removeClass('d-none');

        if (new_datetimepicker) {
            $("#ModalSendRevision").find("#datetimepicker2").data("DateTimePicker").minDate(new Date(Date.now()));
        } else {
            var date_now = new Date(Date.now());
            var date_formated = date_now.getFullYear() +
                    "/" + ((date_now.getMonth() + 1) < 10 ? ("0" + (date_now.getMonth() + 1)) : (date_now.getMonth() + 1))
                    + "/" + (date_now.getDate() < 10 ? ("0" + date_now.getDate()) : date_now.getDate())
                    + " " + (date_now.getHours() < 10 ? ("0" + date_now.getHours()) : date_now.getHours())
                    + ":" + (date_now.getMinutes() < 10 ? ("0" + date_now.getMinutes()) : date_now.getMinutes());

            $("#ModalSendRevision").find("#datetimepicker2").val(date_formated);
            $("#ModalSendRevision").find("#datetimepicker2").datetimepicker({
                minDate: date_now,
                defaultDate: date_now
            });
//            revision_modal.find("#datetimepicker2").datetimepicker("option", "defaultDate", revision_min_date);
        }
    });
    //END writer rate


    $(".statistic_send[data-counter]").click(function (e) {
        var element = $(this);
        var counter = $(this).data('counter');
        callAjax('json', '/profile?ajax=statisticCounter&counter=' + counter, function () {
            if ($.inArray(counter, ['online_lecture_summary_try_now', 'online_lecture_summary_not_interested']) > -1) {
                $.cookie('hide_banner_online_lecture_summary', 1, {expires: 999999, path: '/'});
                if (element.data('location-to')) {
                    location.replace(element.data('location-to'));
                }
                element.closest('[data-banner]').hide();
            }
        });
    });

    if (new_rating) {
        $('#ModalPayTips').on('hide.bs.modal', function () {
            setTimeout(function () {
                $("#ModalWithoutTips").modal('show');
                if ($("#ModalWithoutTips").attr('data-not-cancel') == '1') {
                    $('#ModalWithoutTips').on('hidden.bs.modal', function (e) {
                        location.reload();
                    });
                } else {
                    if (typeof ORDER !== 'undefined') {
                        setTimeout(function () {
                            location.reload();
                        }, 4500);
                    }

                    setTimeout(function () {
                        $("#ModalWithoutTips").modal('hide');
                    }, 5000);
                }
            }, 500);
        });
    }

    // floating btn for files tab
    $('[data-tab-files]').click(function () {
        if ($('#callback-float-btn').length > 0) {
            $("#callback-float-btn .float-btn").addClass('lottie-wrapper-files');
        } else {
            $("#lottie-wrapper").addClass('lottie-wrapper-files');
        }
    });

    $('[data-tab-messages] , [data-tab-details]').click(function () {
        if ($('#callback-float-btn').length > 0) {
            $("#callback-float-btn .float-btn").removeClass('lottie-wrapper-files');
        } else {
            $("#lottie-wrapper").removeClass('lottie-wrapper-files');
        }
    });
    if ($('.service_level-wrap').length > 0) {
        $('input[name="top_priority"], input[name="standard_level_service"]').off('click');
        $('input[name="top_priority"], input[name="standard_level_service"]').on('click', function () {
            if ($(this).is(":checked")) {
                $(this).prop('checked', false);
                $(this).closest(".checkbox-v").removeClass("check-active");
            } else {
                $(this).prop('checked', true);
                $(this).closest(".checkbox-v").addClass("check-active");
            }
        });
    }

    $('.how-it-works_btn').on('click', function () {
        window.location.href = "https://app.writemyessay.me/how_it_works?subcom=OnboardingHowItWorks";
    });
        
    $('[data-content-to-copy]').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var button = $(this);
        copyToClp(button.attr('data-content-to-copy'));
        button.addClass('has-copied').html('Copied');
        setTimeout(function () {
            button.removeClass('has-copied').html('Copy referral link');
        }, 5000);
    });

    /* Apple pay */
    if ( !window.ApplePaySession || !ApplePaySession.canMakePayments() ){
        $(".payment_apple-pay").remove();
    }
    
    /* sticky files tab */
    $("#order-page .writers-list-inner .tabs .tab-link").on("click", function(){
        if ($('[data-tab-files]').hasClass('current')) {
            $(this).parent(".tabs-list").addClass('sticky-tab');
        } else {
            $(this).parent(".tabs-list").removeClass('sticky-tab');
        }
    });
    
    if ('104' == '10') {
        $('.settings-item__phone .btn-add-alternative').on('click', function () {
            $('#client_change_alt_phone [name="alt_phone"]').trigger('input');
        });
        setTimeout(function(){
            $('#client_change_alt_phone [name="alt_phone"]').bind('input', function () {
                var $this = $(this);
                var onlyNum = $this.val().match(/([0-9]+)/g);
                if (!onlyNum) {
                    $this.val('');
                    return false;
                }
                onlyNum = onlyNum.join('').substring(0, 100);

                var result = '(';
                for (var i = 0; i < onlyNum.length; i++) {
                    if (i == 3) {
                        result += ')';
                    }
                    if (i == 6) {
                        result += ' - ';
                    }

                    result += onlyNum.charAt(i);
                }
                $(this).val( result );
            });       
        },500);
    }
});

function modalClientInformation() {
    if ($("#ModalAuth").length) {
        setTimeout(function () {
            $("#ModalAuth").modal('show');
        }, 2000);
    }

    $('#ModalAuth').on('hidden.bs.modal', function () {
        $('#ModalAuth').attr('data-not-used-popup', "");
    });

    $('#client_details_modal #select-country').on('select2:select', function (e) {
        if($("#client_details_modal").data("phoneValidByCountry")){
            validatePhoneByCountry($("#client_details_modal [name='phone']"),e.params.data.id,e.params.data.text); 
            if($.trim($('#client_details_modal [name="phone"]').val())!=''){
                $('#client_details_modal [name="phone"]').valid();
            }
        }        
    });

    $("#client_details_modal").submit(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var form = $(this);
        if($("#client_details_modal").data("phoneValidByCountry")){
            validatePhoneByCountry($("#client_details_modal [name='phone']"),form.find('select[name="country"]').val());
        }
        var data = {
            name: form.find('input[name="name"]').val(),
            phone: form.find('input[name="phone"]').val().replace(/\D/g, ""),
            country: form.find('select[name="country"]').val(),
            email: form.find('input[name="email"]').val(),
            allow_night_call: (form.find('input[name="allow_night_call"]').is(':checked') ? 1 : 0)
        };

        if (data.name.trim() == '') {
            form.validate().settings.rules.name.required = false;
            data.name = 'Customer';
        } else {
            form.validate().settings.rules.name.required = true;
        }

        if (form.valid()) {
            form.find('button[type="submit"]').find('i').addClass('fa-spinner');
            console.log(data);
            callAjax("json", "/profile?ajax=dataChange", function (result) {
                console.log(result);
                location.reload();
            }, data, form);
        }

        return false;
    });

    $('#client_details_modal [name="phone"]').on('input', function () {
        if($("#client_details_modal").data("phoneValidByCountry")){
            validatePhoneByCountry($("#client_details_modal [name='phone']"),$('#client_details_modal select[name="country"]').val());
        }        
        
        var $this = $(this);
        var onlyNum = $this.val().match(/([0-9]+)/g);
        if (!onlyNum) {
            $this.val('');
            return false;
        }
        onlyNum = onlyNum.join('').substring(0, 100);

        if (onlyNum.length > 11 || onlyNum.length < 3) {
            $('#client_details_modal').find('button[type="submit"]').addClass('disabled');
        } else {
            $('#client_details_modal').find('button[type="submit"]').removeClass('disabled');
        }

        var result = '(';
        for (var i = 0; i < onlyNum.length; i++) {
            if (i == 3) {
                result += ')';
            }
            if (i == 6) {
                result += ' - ';
            }

            result += onlyNum.charAt(i);
        }
        $this.val(
                result
                );
    });

    $("#client_details_modal").find('.btn-skip').click(function () {
        //$("#ModalSkipNow").modal('show');
        callAjax("json", "/profile?ajax=notShowModalContactInfo", function () {
        }, {data: 1});
    });

    $('#client_details_modal select[name="country"]')
            .find('option[value="' + $('#client_details_modal select[name="country"]').attr('data-attr-current-country') + '"]').prop('selected', true).parent().change();

    $('#modal-edit-phone select[name="country_format"]').find('option').filter(function() {
            return $(this).text() === $('#modal-edit-phone select[name="country_format"]').attr('data-attr-country-code');
        }).prop('selected', true).parent().change();
    

    $('#client_details_modal').find('[name="name"]').keyup(function () {
        if ($(this).val().trim() == '') {
            $("#client_details_modal").validate().settings.rules.name.required = false;
        } else {
            $("#client_details_modal").validate().settings.rules.name.required = true;
        }
    });
    
        // starts box
    $('.rating input').change(function () {
        $(this).closest('.rating').find('.selected').removeClass('selected');
        $(this).closest('label').addClass('selected');
    });

}

function callWriterRateModalNew() {    
    if ($(this).attr('data-rate-and-approve') == 1) {
        rate_and_approve = true;
    }
    
    $('#ModalRatePaper [name="id"]').val($(this).attr('data-order'));
    if ($(this).attr('data-writers') == 1) {
        $('#ModalRatePaper [name="id"]').attr('from-writers', 1);
    } else {
        $('#ModalRatePaper [name="id"]').removeAttr('from-writers');
    }

    $('#ModalRatePaper .btn-rate-block')
            .attr('data-order-id', $(this).attr('data-order'))
            .attr('data-add-writer-blacklist', $(this).attr('data-writer'));
//    $("#ModalAddBlacklist [name='order_id']").val($(this).attr('data-order'));
//    $("#ModalAddBlacklist [name='writer_id']").val($(this).attr('data-writer'));

    $("#ModalRatePaper [data-rate-writer-submit]").addClass('ajax-submit');
    $("#ModalRatePaper").modal('show');
}

function callWriterRateModal() {
    $('#ModalRateWriter [name="id"]').val($(this).attr('data-order'));
    if ($(this).attr('data-writers') == 1) {
        $('#ModalRateWriter [name="id"]').attr('from-writers', 1);
    } else {
        $('#ModalRateWriter [name="id"]').removeAttr('from-writers');
    }
    $("#ModalAddBlacklist [name='order_id']").val($(this).attr('data-order'));
    $("#ModalAddBlacklist [name='writer_id']").val($(this).attr('data-writer'));

    $("#ModalRateWriter [data-rate-writer-submit]").addClass('ajax-submit');
    $("#ModalRateWriter").modal('show');
}

function callSummaryRateModal() {
    $('#ModalRateSummary [name="id"]').val($(this).attr('data-order'));
    $("#ModalRateSummary [data-rate-summary-submit]").addClass('ajax-submit');

    $('#ModalRateSummary [name="id"]').val($(this).attr('data-order'));
    if ($(this).attr('data-writers') == 1) {
        $('#ModalRateSummary [name="id"]').attr('from-writers', 1);
    } else {
        $('#ModalRateSummary [name="id"]').removeAttr('from-writers');
    }
    $("#ModalAddBlacklist [name='order_id']").val($(this).attr('data-order'));
    $("#ModalAddBlacklist [name='writer_id']").val($(this).attr('data-writer'));

    $("#ModalRateSummary").modal('show');
}

function rateSummaryAjaxSubmit() {
    var form = $('#form_order_rate');
    var button_submit = $(this);

    var from_writers = form.find('[name="id"]').attr('from-writers') == 1 ? true : false;

    if (button_submit.hasClass('btn-rate-disabled')) {
        if (!$('[name="writer_rate"]').is(':checked')) {
            $('[data-writer-rate-error]').show();
        }
        showMessageOnOurRate();
        return false;
    }

    button_submit.addClass('btn-rate-disabled');

    var form_data = {};
    $.each(
            form.serializeArray(),
            function (iter, field) {
                form_data[field.name] = field.value;
            }
    );

    if (form.valid()) {
        var preloader = $('#page-preloader');
        preloader.fadeIn();

        callAjax('json', '/orders?ajax=rate', function (data) {

            /*Service Start*/
            var order_block = $(".order-list-holder .order-item[data-id='" + form_data.id + "']");

            order_block.find(".service-rate-block .team-rating-order").hide();

            if (form_data.service_rate > 0) {
                order_block.find(".service-rate-block .service-rate-data").html(form_data.service_rate + ".0").show();
                if (parseInt(form_data.service_rate) === 1) {
                    order_block.find(".service-rate-block .service-rate-data").addClass('low-rating-item');
                }
            }

            if (form_data.recommend_rate > 0) {
                order_block.find(".service-rate-block .recommend-rate-data").html(form_data.recommend_rate + ".0").show();
                if (parseInt(form_data.recommend_rate) === 1) {
                    order_block.find(".service-rate-block .recommend-rate-data").addClass('low-rating-item');
                }
            }

            order_block.find(".service-rate-block .star-rating-holder").show();

            /*Service End*/

            if (from_writers) {
                var order_blocks = $(".tasks-holder .task-wrap[data-order='" + form_data.id + "']");

                $.each(
                        order_blocks,
                        function (iter, order_block) {
//                        rating-box
                            $(order_block).find('.set-rate-box').detach();
                            var writer_id = $(order_block).closest(".item-holder").attr('data-writer');
                            var parsed_stars = "";

                            for (var i = 1; i <= 5; i++) {
                                var is_checked = parseInt(form_data.writer_rate) >= i;

                                parsed_stars += '<label ' + (is_checked ? 'class="selected"' : '') + '>' +
                                        '<input type="radio" name="rating_' + form_data.id + '" value="' + i + '" title="' + i + ' stars"> ' + i +
                                        '</label>';
                            }

                            $(order_block).find('.rating-box .rating-score').html(form_data.writer_rate + ".0");
                            $(order_block).find('.rating-box .rating').html(parsed_stars);

                            $(order_block).find('.rating-box').show();

                        }
                );
            } else {
                var order_block = $(".order-list-holder .order-item[data-id='" + form_data.id + "']");

                order_block.find(".writer-rate-block .writer-rating-order").hide();

                if (form_data.writer_rate > 0) {
                    order_block.find(".writer-rate-block .writer-rate-data").html(form_data.writer_rate + ".0").show();
                    if (parseInt(form_data.writer_rate) === 1) {
                        order_block.find(".writer-rate-block .writer-rate-data").addClass('low-rating-item');
                    }
                }

                order_block.find(".writer-rate-block .star-rating-holder").show();
            }

            preloader.fadeOut('fast', function () {
                $("#ModalRateSummary").modal('hide');
            });
        }, form.serialize(), form);
    }
    showMessageOnOurRate();
    return false;
}
function validateWriterRateComment() {
    var feedback_val = $(this).val();
    var comment_block = $(this).closest('.comment-wrap');

    if (feedback_val.length === 0) {
        $(this).removeClass('error');
        comment_block.find('.alert-required').hide();

        return true;

    } else if (feedback_val.length > 0 && feedback_val.length < 3) {
        $(this).addClass('error');
        comment_block.find('.alert-required').html(rate_data.writer.errors.empty).show();
        return false;

    } else if (rate_data.writer.regex.test(feedback_val) !== true) {
        $(this).addClass('error');
        comment_block.find('.alert-required').html(rate_data.writer.errors.symbols).show();
        return false;

    } else {
        $(this).removeClass('error');
        comment_block.find('.alert-required').hide();

        return true;
    }
}

function isRevisionAvailable(order_block) {
    var period_after_approved = order_block.attr('data-time-after-approve'),
            spacing = parseInt(order_block.attr('data-spacing')),
            pages = parseInt(order_block.attr('data-pages')),
            slides_problems_questions = parseInt(order_block.attr('data-except-pages')),
            type_of_paper_id = order_block.attr('data-type-of-paper-id');

    if ($.inArray('104', ['4', '10', '58', '100']) !== -1 || (in_development && $.inArray('104', []) !== -1)) {//service layers part
        if (order_block.attr('data-vip') == 1) {
            if (
                    (pages > 0 && pages <= 19 && spacing == 2 && period_after_approved < 14 * 24 * 3600)
                    || (pages > 0 && pages <= 9 && spacing == 1 && period_after_approved < 14 * 24 * 3600)
                    || (pages >= 20 && spacing == 2 && period_after_approved < 30 * 24 * 3600)
                    || (pages >= 10 && spacing == 1 && period_after_approved < 30 * 24 * 3600)
                    || ($.inArray(type_of_paper_id, ["1040004", "1040060", "1041038", "1041039"]) !== -1 && slides_problems_questions <= 39 && period_after_approved < 14 * 24 * 3600)
                    || ($.inArray(type_of_paper_id, ["1040004", "1040060", "1041038", "1041039"]) !== -1 && slides_problems_questions >= 40 && period_after_approved < 30 * 24 * 3600)
                    || ($.inArray(type_of_paper_id, ["1040004", "1040060", "1041038", "1041039"]) !== -1 && slides_problems_questions <= 9 && period_after_approved < 14 * 24 * 3600)
                    || ($.inArray(type_of_paper_id, ["1040004", "1040060", "1041038", "1041039"]) !== -1 && slides_problems_questions > 9 && period_after_approved < 30 * 24 * 3600)
                    )
            {
                return true;
            } else {
                return false;
            }
        }
    }
    if (
            (pages > 0 && pages <= 19 && spacing == 2 && period_after_approved < 7 * 24 * 3600)
            || (pages > 0 && pages <= 9 && spacing == 1 && period_after_approved < 7 * 24 * 3600)
            || (pages >= 20 && spacing == 2 && period_after_approved < 14 * 24 * 3600)
            || (pages >= 10 && spacing == 1 && period_after_approved < 14 * 24 * 3600)
            || ($.inArray(type_of_paper_id, ["1040004", "1040060", "1041038", "1041039"]) !== -1 && slides_problems_questions <= 39 && period_after_approved < 7 * 24 * 3600)
            || ($.inArray(type_of_paper_id, ["1040004", "1040060", "1041038", "1041039"]) !== -1 && slides_problems_questions > 39 && period_after_approved < 14 * 24 * 3600)
            || ($.inArray(type_of_paper_id, ["1040004", "1040060", "1041038", "1041039"]) !== -1 && slides_problems_questions <= 9 && period_after_approved < 7 * 24 * 3600)
            || ($.inArray(type_of_paper_id, ["1040004", "1040060", "1041038", "1041039"]) !== -1 && slides_problems_questions > 9 && period_after_approved < 14 * 24 * 3600)
            )
    {
        return true;
    }

    return false;
}

function chooseExtendRevisionDeadlineValue(client_deadline_left) {
    var extend_time = {
        time: 0,
        days: 0,
        hours: 0
    };

    if (client_deadline_left > 4 * 3600) { // ddl_left > 4 hours
        extend_time.time = client_deadline_left - 4 * 3600;
    } else if (client_deadline_left > 0 && client_deadline_left <= 4 * 3600) { // 0 < ddl_left > 4hours
        extend_time.time = 4 * 3600;
    } else { // ddl passed
        extend_time.time = 4 * 3600;
    }

    extend_time.days = Math.floor(extend_time.time / (24 * 3600)); // how many days extended
    extend_time.hours = Math.round((extend_time.time % (24 * 3600)) / 3600); // how many hours extended

    return extend_time;
}

function prepareWriterRateModal() {
    // prepare #ModalRatePaper + #ModalSendRevision
    // check for revision enable and update revision ddl

    var order_block = $(this);
    var rate_modal = $("#ModalRatePaper");
    var revision_modal = $("#ModalSendRevision");
    var client_deadline_left = order_block.attr('data-time-ddl-left');

    // show/hide revision link
    if (isRevisionAvailable(order_block)) {
        var extend_data = chooseExtendRevisionDeadlineValue(client_deadline_left);

        var revision_min_date = new Date(Date.now() + extend_data.time * 1000 + 60 * 1000) /* in miliseconds */;
        revision_modal.find('.revision-deadline p').addClass('d-none');
        revision_modal.find('.revision-deadline p.after_rate').removeClass('d-none');

        var days_and_hours = false;
        if (extend_data.days > 0 && extend_data.hours > 0) {
            days_and_hours = true;
        }

        revision_modal.find("#revision-deadline").html(
                (extend_data.days > 0 ? (extend_data.days + ' day' + (extend_data.days > 1 ? 's' : '')) : "") + (days_and_hours ? " " : "")
                + (extend_data.hours > 0 ? (extend_data.hours + ' hour' + ((extend_data.hours > 1) ? 's' : '')) : "")
                );

        if (new_datetimepicker) {
            revision_modal.find("#datetimepicker2").data("DateTimePicker").minDate(revision_min_date);
            revision_modal.find("#datetimepicker2").data("DateTimePicker").defaultDate(revision_min_date);
        } else {
            var date_formated = revision_min_date.getFullYear() +
                    "/" + ((revision_min_date.getMonth() + 1) < 10 ? ("0" + (revision_min_date.getMonth() + 1)) : (revision_min_date.getMonth() + 1))
                    + "/" + (revision_min_date.getDate() < 10 ? ("0" + revision_min_date.getDate()) : revision_min_date.getDate())
                    + " " + (revision_min_date.getHours() < 10 ? ("0" + revision_min_date.getHours()) : revision_min_date.getHours())
                    + ":" + (revision_min_date.getMinutes() < 10 ? ("0" + revision_min_date.getMinutes()) : revision_min_date.getMinutes());

            revision_modal.find("#datetimepicker2").val(date_formated);
            revision_modal.find("#datetimepicker2").datetimepicker({
                minDate: revision_min_date,
                defaultDate: revision_min_date
            });
//            revision_modal.find("#datetimepicker2").datetimepicker("option", "defaultDate", revision_min_date);
        }

        var order_id = typeof ORDER !== 'undefined' ? ORDER.id : false;

        if (order_id === false) {
            if (typeof order_block.attr('data-order') !== typeof undefined && order_block.attr('data-order') !== false) {
                order_id = order_block.attr('data-order');
            } else if (typeof order_block.attr('data-order-id') !== typeof undefined && order_block.attr('data-order-id') !== false) {
                order_id = order_block.attr('data-order-id');
            }
        }

        revision_modal.find('[name="order_id"]').val(order_id);
        revision_modal.find('[name="is_new_rate"]').val("1");
        revision_modal.addClass('new-revision');
        rate_modal.find('.new_alert-block-rate').removeClass('d-none');
    } else {
        rate_modal.find('.new_alert-block-rate').addClass('d-none');
    }

}

function validateWriterTips(form, is_required) {
    var tips_input = form.find('.writers-tip_inner .input-tip-writer');

    if (form.find('.writers-tip_inner .btn-tip-writer-active').length) { //if default button active
        return parseFloat(form.find('.writers-tip_inner .btn-tip-writer-active').attr('data-tip-amount'));

    } else if (tips_input.is(':visible')) { // if custom ammount active
        if (
                tips_input.val().length === 0 // if empty
                || !rate_data.writer.tip_amount_regex.test(tips_input.val()) // if not valid
                ) {
            form.find('.error-custom-tips').html(tips_data.errors.not_valid).show();
            form.find('.writers-tip_inner .input-tip-writer').addClass('alert-control');
            return false;

        } else if (parseFloat(tips_input.val()) < 1) {
            form.find('.error-custom-tips').html(tips_data.errors.min).show();
            form.find('.writers-tip_inner .input-tip-writer').addClass('alert-control');
            return false;

        } else if (parseFloat(tips_input.val()) > 500) {
            form.find('.error-custom-tips').html(tips_data.errors.max).show();
            form.find('.writers-tip_inner .input-tip-writer').addClass('alert-control');
            return false;
        }

        form.find('.writers-tip_inner .input-tip-writer').removeClass('alert-control');
        form.find('.error-custom-tips').html('').hide();
        return parseFloat(form.find('.writers-tip_inner .input-tip-writer').val());
    } else if (typeof is_required !== 'undefined') { // if not active & required
        form.find('.error-custom-tips').html(tips_data.errors.not_valid).show();
        return false;

    } else { // if not active & not required
        return true;
    }

}

function addWriterTip(modal_tip) {

    var valid_tip = validateWriterTips(modal_tip);
    if (valid_tip === false || valid_tip === true) { // not-active || not-valid
        return false;
    }

    var form_data = {
        id: modal_tip.find('[name="order_id"]').val(),
        tip_amount: valid_tip
    };

    var preloader = $('#page-preloader');
    var button_submit = modal_tip.find('[data-pay-tip]');

    button_submit.addClass('btn-rate-disabled');
    preloader.fadeIn();

    callAjax('json', '/orders?ajax=CreateTip', function (response_data) {
        preloader.fadeOut('fast', function () {
            button_submit.removeClass('btn-rate-disabled');
            if (typeof response_data.result.bill_add !== 'undefined') {
                var modal_tip_payment = $("#ModalPayTips");
                modal_tip.modal('hide');

                var bill_data = response_data.result.bill_add;

                modal_tip_payment.find('[name="bid"]').val(bill_data.id);
                modal_tip_payment.find('[name="token"]').val(bill_data.hash);

                modal_tip_payment.modal('show');
            }
        });
    }, form_data);
}

var timeoutModal = false;
function rateWriterNewAjaxSubmit(without_preloader) {
    
    
    var form = $('#form_writer_rate');
    var form_data = {};
    var from_writers = form.find('[name="id"]').attr('from-writers') == 1 ? true : false;

    $.each(
            form.serializeArray(),
            function (iter, field) {
                if (field.name !== 'tip-amount' || parseFloat(field.value) > 0) {
                    form_data[field.name] = field.value;
                }
            }
    );


    if (parseInt(form_data.writer_rate) === 5) {
        var valid_tip = validateWriterTips(form);
        if (valid_tip === false) { // active && not valid
            return false;
        } else if (valid_tip === true) { // not-active

        } else { // active && valid
            form_data['tip_amount'] = valid_tip;
        }

    } else if (parseInt(form_data.writer_rate) < 5) {
        if (form.find('.improve-items-holder .improve-item:checked').length) {
            form_data['improve_types'] = [];
            $.each(
                    form.find('.improve-items-holder .improve-item:checked'),
                    function (iter, field) {
                        form_data['improve_types'].push(parseInt($(field).attr('value')));
                    }
            );

            if (form_data['improve_types'].length > 0) {
                form_data['improve_types'] = Base64.encode(form_data['improve_types'].join('|'));
            } else {
                form_data['improve_types'] = '';
            }
        }
    }

    var preloader = $('#page-preloader');

    if (typeof without_preloader === 'undefined' || without_preloader !== true) {
        preloader.fadeIn();
    }

    callAjax('json', '/orders?ajax=WriterRate', function (response_data) {
        
        if (typeof from_writers !== 'undefined' && from_writers) {
//                location.reload();
            var order_blocks = $(".tasks-holder .task-wrap[data-order='" + form_data.id + "']");

            $.each(
                    order_blocks,
                    function (iter, order_block) {
//                        rating-box
                        $(order_block).find('.set-rate-box').detach();
                        var writer_id = $(order_block).closest(".item-holder").attr('data-writer');
                        var parsed_stars = "";

                        for (var i = 1; i <= 5; i++) {
                            var is_checked = parseInt(form_data.writer_rate) >= i;

                            parsed_stars += '<label ' + (is_checked ? 'class="selected"' : '') + '>' +
                                    '<input type="radio" name="rating_' + form_data.id + '" value="' + i + '" title="' + i + ' stars"> ' + i +
                                    '</label>';
                        }

                        $(order_block).find('.rating-box .rating-score').html(form_data.writer_rate + '.0');
                        $(order_block).find('.rating-box .rating').html(parsed_stars);

                        $(order_block).find('.rating-box').show();

                        // check for "Count unrated" to hide
                        var writer_block = $(order_block).closest('.item-holder[data-writer]');
                        var count_unrated = writer_block.find('.tasks-holder-show .task-wrap .set-rate-box').length;

                        if (count_unrated === 0) {
                            writer_block.find('.ratting-messages, .ratting-messages-mobile').detach();
                        }

                    }
            );
        } else {
            var order_block = $(".order-list-holder .order-item[data-id='" + form_data.id + "']");

            if (order_block.length) {
                order_block.find(".rating-order-item").hide();

                if (form_data.writer_rate > 0) {
                    order_block.find(".writer-rate-block .writer-rate-data").html(form_data.writer_rate).show();

                    if (parseInt(form_data.writer_rate) === 5) {
                        order_block.find(".writer-rate-block .small_tip-writer").show();
                    }

                    if (parseInt(form_data.writer_rate) === 1) {
                        order_block.find(".writer-rate-block .writer-rate-data").addClass('low-rating-item');
                    }
                }

                order_block.find(".writer-rate-block .star-rating-holder").show();
            }

            var summary_block = $(".approved-box-inner .rate-section");

            if (summary_block.length) {
                summary_block.find(".rate-enable-block").hide();

                if (form_data.writer_rate > 0) {
                    summary_block.find(".rate-exists-block .writer-rate").html(form_data.writer_rate).show();
                    if (parseInt(form_data.writer_rate) === 1) {
                        summary_block.find(".rate-exists-block .writer-rate").addClass('low-rating-item');
                    }
                    summary_block.find(".call_rate-paper").show();
                }

                summary_block.find(".rate-exists-block").show();
            }

            var writers_order_block = $('.writers-list-inner .item-holder .task-wrap[data-order="' + form_data.id + '"]');

            if (writers_order_block.length) {
                var writer_block = writers_order_block.closest('.item-holder');

                writers_order_block.find(".set-rate-box").hide().detach();
                if (form_data.writer_rate > 0) {
                    writers_order_block.find(".rating-box .rating-score").html(form_data.writer_rate).show();

                    for (var i = 1; i <= form_data.writer_rate; i++) {
                        writers_order_block.find(".rating-box .rating label:nth-of-type(" + i + ")").addClass('selected');
                    }
                }

                writers_order_block.find(".rating-box").show();


                var unrated_count_end = writer_block.find('.tasks-holder-show .task-wrap .set-rate-box').length;

                if (unrated_count_end === 0) {
                    writer_block.find('.ratting-messages, .ratting-messages-mobile').detach();
                }
            }
        }

        preloader.fadeOut('fast', function () {
            $('#ModalRatePaper').off('hide.bs.modal');

            $("#ModalRatePaper").modal('hide');

            if (parseInt(form_data.writer_rate) === 5) {
                if (typeof form_data.tip_amount !== 'undefined') { // added tip
                    var modal = $("#ModalPayTips");
                    var bill_data = response_data.result.bill_add;
                    modal.find('[name="bid"]').val(bill_data.id);
                    modal.find('[name="token"]').val(bill_data.hash);

                    $("#ModalPayTips").modal('show');

                } else { // without tip
                    $("#ModalWithoutTips").modal('show');
                    if ($("#ModalWithoutTips").attr('data-not-cancel') == '1') {
                        $('#ModalWithoutTips').on('hidden.bs.modal', function (e) {
                            location.reload();
                        });
                    } else {
                        if (typeof ORDER !== 'undefined' && ('104' != '10')) { // if from order details
                            setTimeout(function () {
                                location.reload();
                            }, 4500);
                        }

                        timeoutModal = setTimeout(function () {
                            $("#ModalWithoutTips").modal('hide');
                        }, 5000);
                    }
                }


            } else if (parseInt(form_data.writer_rate) === 4) {
                $("#ModalSuccessRateStars").modal('show');
                if ($("#ModalSuccessRateStars").attr('data-not-cancel') == '1') {
                    $('#ModalSuccessRateStars').on('hidden.bs.modal', function (e) {
                        location.reload();
                    });
                } else {
                    if (typeof ORDER !== 'undefined' && ('104' == '10')) { // if from order details
                        setTimeout(function () {
                            location.reload();
                        }, 4500);
                    }

                    timeoutModal = setTimeout(function () {
                        $("#ModalSuccessRateStars").modal('hide');
                    }, 5000);
                }
            } else { // 1-3
                    if(response_data.result.rate_sorry){
                        $("#ModalAfterLowRateWithTextarea").modal('show');
                        $('div.sorry_option').not(":eq("+(response_data.result.rate_sorry_options - 1)+")").remove();
                        $("#ModalAfterLowRateWithTextarea").find('input[name="order_id"]').val(response_data.result.rate_sorry_order);
                        $("#ModalAfterLowRateWithTextarea input[name='options']:eq(0)").trigger("click");
                    }else{
                        console.log(4444);
                        if (typeof ORDER !== 'undefined' && ('104' == '10')) { // if from order details
                            setTimeout(function () {
                                location.reload();
                            }, 4500);
                        }
                        $("#ModalSuccessNewRate").modal('show');
                        timeoutModal = setTimeout(function () {
                            $("#ModalSuccessNewRate").modal('hide');
                            location.reload();
                        }, 5000);
                    }

            }

        });
    }, form_data);

}

function rateWriterAjaxSubmit() {
    var form = $('#form_order_rate_paper');
    var button_submit = $(this);

    var from_writers = form.find('[name="id"]').attr('from-writers') == 1 ? true : false;

    if (button_submit.hasClass('btn-rate-disabled')) {
        if (!$('[name="writer_rate"]').is(':checked')) {
            $('[data-writer-rate-error]').show();
        }
        return false;
    }

    button_submit.addClass('btn-rate-disabled');

    var form_data = {};
    $.each(
            form.serializeArray(),
            function (iter, field) {
                form_data[field.name] = field.value;
            }
    );

    if (form.valid()) {
        var preloader = $('#page-preloader');
        preloader.fadeIn();

        callAjax('json', '/orders?ajax=rateWriter', function (data) {
            if (from_writers) {
//                location.reload();
                var order_blocks = $(".tasks-holder .task-wrap[data-order='" + form_data.id + "']");

                $.each(
                        order_blocks,
                        function (iter, order_block) {
//                        rating-box
                            $(order_block).find('.set-rate-box').detach();
                            var writer_id = $(order_block).closest(".item-holder").attr('data-writer');
                            var parsed_stars = "";

                            for (var i = 1; i <= 5; i++) {
                                var is_checked = parseInt(form_data.writer_rate) >= i;

                                parsed_stars += '<label ' + (is_checked ? 'class="selected"' : '') + '>' +
                                        '<input type="radio" name="rating_' + form_data.id + '" value="' + i + '" title="' + i + ' stars"> ' + i +
                                        '</label>';
                            }

                            $(order_block).find('.rating-box .rating-score').html(form_data.writer_rate + ".0");
                            $(order_block).find('.rating-box .rating').html(parsed_stars);

                            $(order_block).find('.rating-box').show();

                        }
                );
            } else {
                var order_block = $(".order-list-holder .order-item[data-id='" + form_data.id + "']");

                order_block.find(".writer-rate-block .writer-rating-order").hide();

                if (form_data.writer_rate > 0) {
                    order_block.find(".writer-rate-block .writer-rate-data").html(form_data.writer_rate + ".0").show();
                    if (parseInt(form_data.writer_rate) === 1) {
                        order_block.find(".writer-rate-block .writer-rate-data").addClass('low-rating-item');
                    }
                }

                order_block.find(".writer-rate-block .star-rating-holder").show();
            }

            preloader.fadeOut('fast', function () {
                $("#ModalRateWriter").modal('hide');
            });
        }, form.serialize(), form);
    }
    return false;
}
function rateServiceAjaxSubmit() {
    var form = $('#form_order_rate_service');
    var button_submit = $(this);

    if (button_submit.hasClass('btn-rate-disabled')) {
        showMessageOnOurRate();
        return false;
    }

    button_submit.addClass('btn-rate-disabled');

    var form_data = {};
    $.each(
            form.serializeArray(),
            function (iter, field) {
                form_data[field.name] = field.value;
            }
    );

    if (form.valid()) {
        var preloader = $('#page-preloader');
        preloader.fadeIn();
        callAjax('json', '/orders?ajax=rateService', function (data) {
            var order_block = $(".order-list-holder .order-item[data-id='" + form_data.id + "']");

            order_block.find(".service-rate-block .team-rating-order").hide();

            if (form_data.service_rate > 0) {
                order_block.find(".service-rate-block .service-rate-data").html(form_data.service_rate + ".0").show();
                if (parseInt(form_data.service_rate) === 1) {
                    order_block.find(".service-rate-block .service-rate-data").addClass('low-rating-item');
                }
            }

            if (form_data.recommend_rate > 0) {
                order_block.find(".service-rate-block .recommend-rate-data").html(form_data.recommend_rate + ".0").show();
                if (parseInt(form_data.recommend_rate) === 1) {
                    order_block.find(".service-rate-block .recommend-rate-data").addClass('low-rating-item');
                }
            }

            order_block.find(".service-rate-block .star-rating-holder").show();


            preloader.fadeOut('fast', function () {
                $("#ModalRate").modal('hide');
            });


        }, form.serialize(), form);
    } else {
        showMessageOnOurRate();
        button_submit.removeClass('btn-rate-disabled');
    }
    return false;
}

function validBonusOnModal() {
    var bonus_input = $("#ModalPayNow [name='amount']");
    var bonus_error = $('#ModalPayNow .bonus_code_error_place');
    var priceOrder = parseFloat($('#ModalPayNow [data-price-pay-modal]').text());
    bonus_input.removeClass('alert-control');
    bonus_error.text('');
    var valid_bonus = true;
    var payed_bonus = $.trim(bonus_input.val()) * 1;
    if (payed_bonus == '') {
        bonus_input.addClass('alert-control');
        bonus_error.text('Type the bonus amount');
        valid_bonus = false;
    } else if (bonus_input.val() > Math.min(bonus_input.data('maxBonus'), priceOrder)) {
        bonus_input.addClass('alert-control');
        bonus_error.text('Should not exceed $' + Math.min(bonus_input.data('maxBonus'), priceOrder));
        valid_bonus = false;
    }
    return valid_bonus;
}

function disabledPayButtons() {
    $('#ModalPayNow .payment_method_box').addClass('disabled-element');
}

function enabledPayButtons() {
    $('#ModalPayNow .payment_method_box').removeClass('disabled-element');
}

function showMessageOnOurRate() {
    if (!$('[name="service_rate"]').is(':checked')) {
        $('[data-service-rate-error]').show();
    }
    if (!$('[name="recommend_rate"]').is(':checked')) {
        $('[data-recommend-rate-error]').show();
    }
}

var crypto_rate_data = null;
var is_get_crypto_rate_data = false;
function handleCryptoPayByPrice(price, type) {
    try {
        let class_disabled_button_pay = 'disabled-click';
        if(type === 'of'){
            var select_name = '#_order_form [name="spoynt_method"]';
            var pay_system_name = '#_order_form [name="pay_system"][value="53"]';
            var $parent_block_button_pay = $(select_name).closest('button');
        } else if(type === 'modal'){
            var select_name = '#ModalPayNow [name="spoynt_method"]';
            var pay_system_name = '.modal_has_no_that_its_cork';
            var $parent_block_button_pay = $(select_name).closest('.payment_cryptopay');
        } else if(type === 'modal_mobile'){
            var select_name = '#ModalPayNow [name="spoynt_method_mobile"]';
            var pay_system_name = '.modal_has_no_that_its_cork';
            var $parent_block_button_pay = $(select_name).closest('.payment_cryptopay');
        } else{
            return false;
        }

        if (crypto_rate_data != null) {

            $.each(crypto_rate_data, function () {
                let option = $(select_name).find('option[value="' + this.sys_name + '"]');
                if (!option.length) {
                    return;
                }
                if (this.min_price > price) {
                    if (option.is(':selected')) {
                        $(select_name).find('option[value="' + this.sys_name + '"]').prop('selected', false).removeAttr('selected');
                        option.prop('selected', false).removeAttr('selected');
                        $(select_name).val(null);
                        if ($(pay_system_name).is(':checked')) {
                            $(pay_system_name).prop('checked', false);
                            $parent_block_button_pay.removeClass('btn-payment-active');
                        }
                        if($parent_block_button_pay.hasClass('btn-payment-active')){
                            $parent_block_button_pay.removeClass('btn-payment-active');
                        }
                    }
                    option.prop('disabled', true);
                } else {
                    option.prop('disabled', false);
                }
            });

            if ($(select_name + ' option:not(:disabled)').length < 1) {
                $parent_block_button_pay.addClass(class_disabled_button_pay);
            } else if ($(select_name).find('option:selected').length < 1) {
                $(select_name + ' option:not(:disabled)').first().prop('selected', true);
                $parent_block_button_pay.removeClass(class_disabled_button_pay);
            } else{
                $parent_block_button_pay.closest('button').removeClass(class_disabled_button_pay);
            }

            $(select_name).change().trigger('change')
                .select2('destroy')
                .select2({
                    minimumResultsForSearch: -1,
                    templateResult: function (o) {
                        if (!o.id) {return o.text; } else { return $(`<span><i class="icon-${o.id}"></i> ${o.text}</span>`);}
                    },
                    templateSelection: function (o) {
                        if (!o.id) {return o.text; } else { return $(`<span><i class="icon-${o.id}"></i> ${o.text}</span>`);}
                    },
                    allowHtml: true
                }).data('select2').$dropdown.addClass("select2-crypto");
        } else if (!crypto_rate_data && !is_get_crypto_rate_data) {
            crypto_rate_request = true;
            $.ajax({
                url: '/public_new/crypto_rate.json',
                success: function (data) {
                    crypto_rate_data = data;
                    is_get_crypto_rate_data = false;
                    handleCryptoPayByPrice(price, type);
                },
                error: function(){
                    console.log('error file crypto_rate.json');
                }
            });
            return false;
        } else {
            console.log('wait for');
        }
    } catch (e) {
        console.log('handleCryptoPayByPrice exception', e);
    }
}


var distributionTextSymbols = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM\".,()\\!?: ;\n{}$_'-%@#^&*[]|\“<>/~+=";

function delWrongSymbols(el) {
    var text = el.val();

    for (i = 0; i < text.length; i++) {
        if (distributionTextSymbols.indexOf(text[i]) == -1) {
            text = text.split(text[i]).join('');
        }
    }

    el.val(text);
}



function pay_modal(bid, token, bprice, deadline_id, order, add_info) {
    //hideAddFieldsCharts();
    $('.payed_by_bonuses').hide();
    $('#payment_form [name="bid"]').val(bid);
    $('#payment_form [name="token"]').val(token);
    if (order > 0) {
        $('#payment_form [name="moid"]').val(order);
    }
    $('[data-price-pay-modal]').text(bprice);
    $('.summary_pay_extra .summary_pay_item').hide();

    if (typeof crypto_pay != 'undefined' && crypto_pay) {
        handleCryptoPayByPrice(bprice, 'modal');
        handleCryptoPayByPrice(bprice, 'modal_mobile');
    }

    if (add_info) {
        if (add_info.preferred_writer) {
            var group_writer = ''
            switch (add_info.preferred_writer * 1) {
                case 1:
                    group_writer = 'Basic';
                    break;
                case 2:
                    group_writer = 'Top';
                    break;
                case 3:
                    group_writer = 'Specific Writer';
                    break;
                case 4:
                    group_writer = 'Advanced';
                    break;
                default:
                    group_writer = 'Basic';
                    break;
            }
            $('.summary_pay_writer').show();
            $('[data-name-writer-category]').text(group_writer);
            if (add_info.price_detailed.bundles.prefered_writer) {
                $('[data-pay-modal-writer-price]').text('$ ' + add_info.price_detailed.bundles.prefered_writer);
            }
        }
        if (add_info.payed && add_info.payed * 1 > 0) {
            $('.payed_by_bonuses').show();
            $('[data-payed-pay-modal]').text(add_info.payed);
        }

        if (add_info.type_of_paper) {
            $('[data-pay-modal-type-of-paper]').text(add_info.type_of_paper);
        }
        if (add_info.deadline_date_format) {
            $('[data-pay-modal-deadline]').text(add_info.deadline_date_format);
        }
        if (add_info.price_detailed.base_price_without_extra) {
            $('[data-pay-modal-type-of-paper-price]').text(add_info.price_detailed.base_price_without_extra);
        }
        if (add_info.subject) {
            $('[data-pay-modal-subject]').text(add_info.subject);
        }
        if (add_info.academic_level) {
            $('[data-pay-modal-ac-level]').text(add_info.academic_level);
        }
        if (add_info.pages_num && add_info.pages_num > 0) {
            if (add_info.pages_num > 1) {
                $('[data-pay-modal-quantity]').text(add_info.pages_num + ' pages');
            } else {
                $('[data-pay-modal-quantity]').text(add_info.pages_num + ' page');
            }
        } else if (add_info.slides_num && add_info.slides_num > 0) {
            if (add_info.slides_num > 1) {
                $('[data-pay-modal-quantity]').text(add_info.slides_num + ' slides');
            } else {
                $('[data-pay-modal-quantity]').text(add_info.slides_num + ' slide');
            }
        } else if (add_info.questions_num && add_info.questions_num > 0) {
            if (add_info.questions_num > 1) {
                $('[data-pay-modal-quantity]').text(add_info.questions_num + ' questions');
            } else {
                $('[data-pay-modal-quantity]').text(add_info.questions_num + ' question');
            }
        } else if (add_info.problems_num && add_info.problems_num > 0) {
            if (add_info.problems_num > 1) {
                $('[data-pay-modal-quantity]').text(add_info.problems_num + ' problems');
            } else {
                $('[data-pay-modal-quantity]').text(add_info.problems_num + ' problem');
            }
        }
        if (add_info.simple_language && add_info.simple_language == 1) {
            $('.summary_language').show();
        }
        var text_free = 'Free';
        if (add_info.abstract_page && add_info.abstract_page == 1) {
            $('.summary_abstract').show();
            if (add_info.price_detailed.bundles.abstract) {
                $('[data-pay-modal-abstract-price]').text('$ ' + add_info.price_detailed.bundles.abstract);
            } else {
                $('[data-pay-modal-abstract-price]').text(text_free);
            }
        }
        if (add_info.editors_check && add_info.editors_check == 1) {
            $('.summary_editors').show();
            if (add_info.price_detailed.bundles.editors_check) {
                $('[data-pay-modal-editors-price]').text('$ ' + add_info.price_detailed.bundles.editors_check);
            } else {
                $('[data-pay-modal-editors-price]').text(text_free);
            }
        }
        if (add_info.sources_used && add_info.sources_used == 1) {
            $('.summary_sources').show();
            if (add_info.price_detailed.bundles.sources_used) {
                $('[data-pay-modal-sources-price]').text('$ ' + add_info.price_detailed.bundles.sources_used);
            } else {
                $('[data-pay-modal-sources-price]').text(text_free);
            }
        }
        if (add_info.table_of_contents && add_info.table_of_contents == 1) {
            $('.summary_table').show();
            if (add_info.price_detailed.bundles.table_of_contents) {
                $('[data-pay-modal-table-price]').text('$ ' + add_info.price_detailed.bundles.table_of_contents);
            } else {
                $('[data-pay-modal-table-price]').text(text_free);
            }
        }
        if (add_info.updates_via_sms && add_info.updates_via_sms == 1) {
            $('.summary_message').show();
            if (add_info.price_detailed.bundles.updates_via_sms) {
                $('[data-pay-modal-message-price]').text('$ ' + add_info.price_detailed.bundles.updates_via_sms);
            } else {
                $('[data-pay-modal-message-price]').text(text_free);
            }
        }
        if (add_info.plagiarism_report && add_info.plagiarism_report == 1) {
            $('.summary_plagiarism').show();
            if (add_info.price_detailed.bundles.plagiarism) {
                $('[data-pay-modal-plagiarism-price]').text('$ ' + add_info.price_detailed.bundles.plagiarism);
            } else {
                $('[data-pay-modal-plagiarism-price]').text(text_free);
            }
        }

        if (add_info.plagiarism_report_turnitin && add_info.plagiarism_report_turnitin == 1) {
            $('.summary_plagiarism_turnitin').show();
            $('[data-pay-modal-turnitin-price]').text('$ 29.99');
        }

        if (add_info.top_priority && add_info.top_priority == 1) {
            $('.summary_vip').show();
            if (add_info.price_detailed.bundles.top_priority) {
                $('[data-pay-modal-vip-price]').text('$ ' + add_info.price_detailed.bundles.top_priority);
            } else {
                $('[data-pay-modal-vip-price]').text(text_free);
            }
        }
    }

    //$('#pay_with_credit_form ._bill-price').text(bprice);
    /*if($.inArray(deadline_id,['10438'])>-1){
     $('#payment_form .btn-paypal-mod').hide();
     $('#payment_form .late_pay_pal').remove();
     }else{
     $('#payment_form .btn-paypal-mod').show();
     $('#payment_form .late_pay_pal').remove();
     }
     
     $('#pay_with_credit_form [name="amount"]').val((bprice <= CURRENT_USER.store_credit) ? bprice : CURRENT_USER.store_credit).trigger("change");
     $('#pay_with_credit_form [name="bid"]').val(bid);
     if (!$('#pay_with_credit_form').hasClass('collapse')) {
     $('#pay_with_credit_form').removeClass('in').addClass('collapse');
     $('._submit_pay_with_credit_form').hide();
     }
     if (order > 0) {
     $('#pay_with_credit_form [name="moid"]').val(order);
     }*/
}

function buttonEnable(button_el) {
    if (button_el.hasClass('disabled')) {
        button_el.removeClass('disabled');
        button_el.removeAttr('disabled').css('pointer-events', 'auto');
        button_el.find('i.fa').removeClass('fa-spin').removeClass('fa-spinner').addClass(button_el.attr('fa'));
        return true;
    } else {
        return false;
    }
}

function buttonDisable(button_el) {
    if (!button_el.hasClass('disabled')) {
        button_el.addClass('disabled');
        button_el.attr('disabled', 'disabled').css('pointer-events', 'none');
        button_el.find('i.fa').addClass('fa-spin').addClass('fa-spinner');
        return true;
    } else {
        return false;
    }
}

function JSScrollStart(scroll_block, parent_block_opacity, event_listen_block, event_trigger) {
    parent_block_opacity.css('opacity', '0');
    event_listen_block.on(event_trigger, function () {
        scroll_block.jScrollPane();
        parent_block_opacity.css('opacity', '1');
    });
}

// Toggle the side navigation
function toggleSidebar() {
    $("#sidebarToggle").on('click', function (e) {
        $(".sidebar").toggleClass("toggled");
        $('.sidebar-brand-desk').toggleClass("toggled");
        $('.sidebar-brand-mob').toggleClass("toggled");
        $('.topbar-btn-balance').toggleClass("toggled");
    });
    $("#sidebarToggleTop").on('click', function (e) {
        $("body").toggleClass("sidebar-toggled");
    });
    $("#sidebarToggleMob").on('click', function (e) {
        $("body").toggleClass("sidebar-toggled");
    });
}

//Hide Sidebar tablet/mobile
function hideSidebar() {
    var windowWidth = $(window).width();
    if (windowWidth > 767 && windowWidth < 992) {
        $(".sidebar").addClass("toggled");
        $('.sidebar-brand-desk').addClass("toggled");
        $('.sidebar-brand-mob').removeClass("toggled");
        $('.topbar-btn-balance').removeClass("toggled");
    } else {
        $(".sidebar").removeClass("toggled");
        $('.sidebar-brand-desk').removeClass("toggled");
        $('.sidebar-brand-mob').addClass("toggled");
        $('.topbar-btn-balance').addClass("toggled");
    }
}



//Contact Button
function ContactsButton() {
    if ($(".partner-content").length == 0) {
        buildContactButton();
    }
}
function buildContactButton() {
    if ('104' == '10') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="messager-icon"><a target="_blank" href="https://m.me/830593933647283">Messenger</a></div>' +
                '<div class="skype-icon"><a href="skype:paperhelp.org?call">Skype</a></div>' +
                '<div class="email-icon"><a href="mailto:support@paperhelp.org ">Email</a></div>' +
                '<div class="phone-icon-usa"><a href="tel:+1-888-318-0063">1-888-318-0063</a></div>' +
                '<div class="phone-icon-uk"><a href="tel:+44-203-608-5285">44-203-608-5285</a></div>' +
                '<div class="phone-icon-au"><a href="tel:+61-283-550-180">61-283-550-180</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else if ('104' == '6') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="messager-icon"><a target="_blank" href="http://m.me/writemypapers.org">Messenger</a></div>' +
                '<div class="email-icon"><a href="mailto:support@writemypapers.org ">Email</a></div>' +
                '<div class="phone-icon-usa"><a href="tel:+1-800-380-2909">1-800-380-2909</a></div>' +
                '<div class="phone-icon-uk"><a href="tel:+44-800-086-9055">44-800-086-9055</a></div>' +
                '<div class="phone-icon-au"><a href="tel:+61-386-477-477">61-386-477-477</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else if ('104' == '11') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="email-icon"><a href="mailto:support@myadmissionsessay.com">Email</a></div>' +
                '<div class="phone-icon"><a href="tel:+1-888-581-7887">1-888-581-7887</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else if ('104' == '72') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="email-icon"><a href="mailto:support@essayswriting.org">Email</a></div>' +
                '<div class="phone-icon"><a href="tel:+1-888-631-2757">1-888-631-2757</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else if ('104' == '18') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="email-icon"><a href="mailto:support@1ws.com">Email</a></div>' +
                '<div class="phone-icon"><a href="tel:+1-877-211-8477">1-877-211-8477</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else if ('104' == '36') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="email-icon"><a href="mailto:support@essays.agency">Email</a></div>' +
                '<div class="phone-icon"><a href="tel:+1-888-880-8504">1-888-880-8504</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else if ('104' == '4') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="email-icon"><a href="mailto:support@evolutionwriters.com">Email</a></div>' +
                '<div class="phone-icon-usa"><a href="tel:+1-877-282-9925">1-877-282-9925</a></div>' +
                '<div class="phone-icon-uk"><a href="tel:+44-800-098-8093">44-800-098-8093</a></div>' +
                '<div class="phone-icon-au"><a href="tel:+61-283-550-191">61-283-550-191</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else if ('104' == '14') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="email-icon"><a href="mailto:support@paperduenow.com">Email</a></div>' +
                '<div class="phone-icon-usa"><a href="tel:+1-800-878-3917">1-800-878-3917</a></div>' +
                '<div class="phone-icon-uk"><a href="tel:+44-203-51-416-85">44-203-51-416-85</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else if ('104' == '41') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="email-icon"><a href="mailto:support@last-minute-essay.com">Email</a></div>' +
                '<div class="phone-icon-usa"><a href="tel:+1-888-240-62-70">1-888-240-62-70</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else if ('104' == '55') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="email-icon"><a href="mailto:support@college-writers.com">Email</a></div>' +
                '<div class="phone-icon-usa"><a href="tel:+1-888-542-5836">1-888-542-5836</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else if ('104' == '62') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="email-icon"><a href="mailto:buyessayfriend.com">Email</a></div>' +
                '<div class="phone-icon-usa"><a href="tel:+1-888-382-2732">1-888-382-2732</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else if ('104' == '47') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="email-icon"><a href="mailto:darwinessay.com">Email</a></div>' +
                '<div class="phone-icon-usa"><a href="tel:+1-314-332-1075">1-314-332-1075</a></div>' +
                '<div class="phone-icon-uk"><a href="tel:+44-203-80-820-49">44-203-80-820-49</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else if ('104' == '94') {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon d-none" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="email-icon"><a href="mailto:support@studdit.com">Email</a></div>' +
                '<div class="phone-icon-usa"><a href="tel:+18885300874">+18885300874</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    } else {
        button = '<div id="lottie-wrapper">';
        button += '<div id="contacts-popup" class="shadow contact-button-in" role="button">' +
                '<div class="chat-icon" style="cursor: pointer"><a onclick="toggleUp()" style="cursor: pointer" href="javascript:void(Tawk_API.toggle())">Instant Chat</a></div>' +
                '<div class="email-icon"><a href="mailto:support@';
        if ('104' == '58') {
            button += 'writemyessays.net';
        } else if ('104' == '17') {
            button += 'essaytigers.com';
        } else if ('104' == '49') {
            button += 'apapers.net';
        } else if ('104' == '7') {
            button += 'freshessays.com';
        }else if ('104' == '100') {
            button += 'masterra.com';
        } else {
            button += 'writemyessay.me';
        }
        button += '">Email</a></div>' +
                '</div>';
        button += '<div id="lottie-block"><div id="contactButton">';
        button += '<a id="shadow-element" class="contact-button shadow"></a>';
        button += '<a id="contacts-btn" style="cursor: pointer" onclick="toggleUp(this)" class="main-button contact-button contact-button-in" role="button"></a>';

        button += '</div></div></div>';
        $(button).appendTo("body");
    }

    if ($('[data-tab-files]').hasClass('current')) {
        $("#lottie-wrapper").addClass('lottie-wrapper-files');
    } else {
        $("#lottie-wrapper").removeClass('lottie-wrapper-files');
    }

}

function toggleUp() {
    $(".contact-button-in").toggleClass("up");
    $(".menu-button").toggleClass("contact-button-out");
}
//Contact Button END

function progressStatus() {
    var progressStatus = $('.progress-line').find('.is-active').text();
    $('.progress-line-status').text(progressStatus);
}

function customRadio() {
    $('.checkbox-v input[type="checkbox"]').on('click touchstart', function () {
        $('.checkbox-v input[type="checkbox"]').each(function () {
            $(this).parents(".checkbox-v").removeClass("check-active");
            if ($(this).is(":checked")) {
                $(this).parents(".checkbox-v").addClass("check-active");
            }
        });
    });
}

function counterMessagesUpdate() {
    console.log('function counterMessagesUpdate');
    
    if (firstMessageUpdate) {
        var lastMsgTime = $('#last_msg_time').val();
    } else {
        var lastMsgTime = $('#last_msg_time').val();
    }    
    callAjax("json", "/messages?ajax=GetCountNewMessages", function (response) {
        if (response.new_messages.result) {
            if (firstMessageUpdate) {
                firstMessageUpdate = false;
            }
            $('#last_msg_time').val(response.new_messages.result.last_message_time);
            console.log('response count messages all', response.new_messages.result.count_new_messages_all);
            addSidebarMessageCounter(response.new_messages.result.count_new_messages_all);
            if (TITLE_CTRL == 'orders') {
                $.each(response.new_messages.result.messages, function (key, message) {
                    var messCounterOrder = $('.order-item[data-id="' + message.order_id + '"]').find('.messages-box .alert-new');
                    if (messCounterOrder.is(':visible')) {
                        var oldCount = parseInt(messCounterOrder.html());
                        messCounterOrder.html(oldCount + parseInt(message.count_messages));
                    } else {
                        messCounterOrder.html(message.count_messages);
                        messCounterOrder.show();
                    }
                })
                $.each(response.new_messages.result.files, function (key, file) {
                    var messCounterOrder = $('.order-item[data-id="' + file.order_id + '"]').find('.files-box .alert-new');
                    if (messCounterOrder.is(':visible')) {
                        var oldCount = parseInt(messCounterOrder.html());
                        messCounterOrder.html(oldCount + parseInt(file.count_messages));
                    } else {
                        messCounterOrder.html(file.count_messages);
                        messCounterOrder.show();
                    }
                })
            };
        }
    },{date_from: lastMsgTime});    
    
    /*if (messages_update_interval) {
        clearInterval(messages_update_interval);
    }
    messages_update_interval = setInterval(function () {
        if (firstMessageUpdate) {
            var lastMsgTime = $('#last_msg_time').val();
        } else {
            var lastMsgTime = $('#last_msg_time').val();
        }

        callAjax("json", "/messages?ajax=GetCountNewMessages", function (response) {
            if (response.new_messages.result) {
                if (firstMessageUpdate) {
                    firstMessageUpdate = false;
                }
                $('#last_msg_time').val(response.new_messages.result.last_message_time);
                console.log('response count messages all', response.new_messages.result.count_new_messages_all);
                addSidebarMessageCounter(response.new_messages.result.count_new_messages_all);
                if (TITLE_CTRL == 'orders') {
                    $.each(response.new_messages.result.messages, function (key, message) {
                        var messCounterOrder = $('.order-item[data-id="' + message.order_id + '"]').find('.messages-box .alert-new');
                        if (messCounterOrder.is(':visible')) {
                            var oldCount = parseInt(messCounterOrder.html());
                            messCounterOrder.html(oldCount + parseInt(message.count_messages));
                        } else {
                            messCounterOrder.html(message.count_messages);
                            messCounterOrder.show();
                        }
                    })
                    $.each(response.new_messages.result.files, function (key, file) {
                        var messCounterOrder = $('.order-item[data-id="' + file.order_id + '"]').find('.files-box .alert-new');
                        if (messCounterOrder.is(':visible')) {
                            var oldCount = parseInt(messCounterOrder.html());
                            messCounterOrder.html(oldCount + parseInt(file.count_messages));
                        } else {
                            messCounterOrder.html(file.count_messages);
                            messCounterOrder.show();
                        }
                    })
                }
                ;

            }

        },
                {date_from: lastMsgTime});

    }, 20000)*/
}

function addSidebarMessageCounter(count_messages) {
    var sidebar_counter_unread = $('.nav-link[href="/messages"]').parent().find('.counter');
    var sidebar_counter_orders = $('.nav-link[href="/orders"]').parent().find('.counter');
    if (sidebar_counter_unread.length > 0) {
        var new_count_unread = parseInt(sidebar_counter_unread.html()) + count_messages;
        sidebar_counter_unread.html(new_count_unread)
    } else {
        $('.nav-link[href="/messages"] .nav-link-item').append('<span class="counter">' + count_messages + '</span>')
    }

    if (sidebar_counter_orders.length > 0) {
        var new_count_unread = parseInt(sidebar_counter_orders.html()) + count_messages;
        sidebar_counter_orders.html(new_count_unread)
    } else {
        $('.nav-link[href="/orders"] .nav-link-item').append('<span class="counter">' + count_messages + '</span>')
    }
}


// Summary Block
function showExtras() {
    var count = 2;

    var max_show_extras = 4;
    if ($('#exstras-wrapper [data-block-extra]').length > max_show_extras) {
        $('#exstras-wrapper [data-block-extra]').each(function (index) {
            if (index + 1 > max_show_extras) {
                $(this).addClass('hidden d-none');
            }
        });
        $('.link-extras__show-more').removeClass('d-none');
        $('.link-extras__show-more').on('click', function () {
            if ($(this).text() == 'Show more') {
                $(this).text('Show less');
            } else {
                $(this).text('Show more');
            }
            $('.order-summary__wrapper .checkbox-v.hidden').each(function () {
                $(this).toggleClass('d-none');
            });
        });
    }


    if ($('.extras-selected-top-desk').hasClass('shown')) {
        $('.extras-selected-counter-block').show();
    } else {
        $('.extras-selected-counter-block').hide();
    }

    $('.extras-selected-top-desk').on('click', function () {
        $(this).toggleClass('shown');
        $('.extras-selected-items').slideToggle();
        if ($('.extras-selected-top-desk').hasClass('shown')) {
            $('.extras-selected-counter-block').show();
        } else {
            $('.extras-selected-counter-block').hide();
        }


    });

    $('.extras-selected-top-desk, #add_extra_buy .checkbox-v').on('click', function () {
        var count_selected = 0;
        $('.extras-selected-items .extras__wrapper--top').each(function (index, element) {
            //if ($(this).is(':visible')) {
            count_selected++;
            //}       
        });
        $('#extras-selected-counter').text(count_selected - 1);
    });


    $('.extras-selected-arrow').on('click', function () {
        $(this).toggleClass('shown');
        $('.extras-selected-items').slideToggle();
        $('.extras-selected-items .extras-selected-top').slideToggle();
    });

    $('.extras-selected-items .extras-selected-top').on('click', function () {
        $('.extras-selected-arrow').toggleClass('shown');
        $('.extras-selected-items').slideToggle();
        $('.extras-selected-items .extras-selected-top').slideToggle();
    });

    $('.extras-selected-items .extras__wrapper--top').each(function (index, element) {
        count = index + 1;
    });

    $('.extras__wrapper--top .extras__delete').on('click', function () {
        $(this).closest('.extras__wrapper--top').remove();
    });

    $('#extras-selected-counter').text(count);

}

function bannerItem() {
    $('.banner-item').find('.close-banner').on('click', function () {
        $(this).closest('.banner-item').fadeOut('slow');
    })
}

function orderTitle() {
    $('.order-title').each(function () {
        var orderHeight = $(this).find('span').height();
        var orderTitle = $(this).find('span').text();
        if (orderHeight > 60) {
            $(this).attr('data-toggle', 'tooltip').attr('title', orderTitle);
            $('[data-toggle="tooltip"]').tooltip();
        } else {
            $(this).removeAttr('title').removeAttr('data-toggle').removeAttr('data-original-title');
        }
    });
}

function customSelect() {
    $(".custom-select").select2({
        minimumResultsForSearch: -1,
        containerCssClass: 'custom-select-wrapper',
        dropdownCssClass: 'custom-select-wrapper'
    });

    $(".custom-select-1").select2({
        minimumResultsForSearch: -1,
        containerCssClass: 'custom-select-wrapper',
        dropdownCssClass: 'custom-select-wrapper'
    });

    $(".custom-select-2").select2({
        minimumResultsForSearch: -1,
        containerCssClass: 'custom-select-wrapper',
        dropdownCssClass: 'custom-select-wrapper'
    });

    //$('.custom-select option:eq(1)').prop('selected',true)

    $("#actions").select2({
        minimumResultsForSearch: -1,
        placeholder: "Actions",
        dropdownCssClass: 'actions-dropdown',
        templateResult: function (data, container) {
            if (data.element) {
                $(container).addClass($(data.element).attr("class"));
            }
            return data.text;
        }
    });

    $(".reason-for-revision-select").select2({
        minimumResultsForSearch: -1,
        placeholder: "Reason for revision"
    });

    $(".custom-select-multiple").select2({
        minimumResultsForSearch: -1,
        containerCssClass: 'custom-select-multiple',
        placeholder: "Reason for revision"
    });

}

function datePicker() {
    if (new_datetimepicker) {
        if ($('.datetimepicker').length) {
            $('.datetimepicker').each(function () {
                var min_date = $(this).attr('data-x-value');
                if (!min_date || ((typeof min_date == 'string') && min_date.trim() == '')) {
                    min_date = new Date();
                }
                $(this).datetimepicker({
                    ignoreReadonly: true,
                    minDate: min_date,
                    defaultDate: min_date
                });
            });
        }
    } else {
        $('.datetimepicker').datetimepicker({
            defaultDate: new Date()
        });
    }
}

function favoriteWriter() {
    $('.favourite-writer').on('click', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).attr('data-original-title', 'Remove writer from favorites');
        } else {
            $(this).attr('data-original-title', 'Add writer to Favorites');
        }
    });

    $('.blacklist-writer').on('click', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).attr('data-original-title', 'Remove writer from blacklist');
        } else {
            $(this).attr('data-original-title', 'Add writer to blacklist');
        }
    });
}

function CustomScroll() {
    var windowWidth = $(window).width();
    var element = $('#exstras-wrapper .scroll-pane').jScrollPane();
    var api = element.data('jsp');
    if (windowWidth > 767 && windowWidth < 1440) {
        $('#exstras-wrapper').addClass('scroll-pane');
        $(function () {
            $('.scroll-pane').jScrollPane();
        });
    } else {
        try {
            api.destroy();
        } catch (err) {
            console.log('api is destroyed');
        }
        $('#exstras-wrapper').removeClass('scroll-pane');
    }
}

//modal start
function customModal(content, title, data_unique) {
    title = title || 'Message';
    data_unique = data_unique || 'custom_message';
    $('#ModalCustomMessage').attr('data_unique', data_unique);
    $('#ModalCustomMessageTitle').html(title);
    $('#ModalCustomMessageContent').html(content);
    $('#ModalCustomMessage').modal('show');

}
$(document).ready(function () {//for customModal function
    $('#ModalCustomMessage').on('hide.bs.modal', function () {
        $(this).find('#ModalCustomMessageContent').val('');
        $(this).find('#ModalCustomMessageTitle').val('');
    });
});

//modal end

function checkAutoApprovedOrdersForRate() {

    if (!rate_order_after_auto_approve) {
        return false;
    }

    if ($.inArray(TITLE_CTRL, ['order', 'auth', 'password_restore']) !== -1
            || (TITLE_CTRL == 'orders' && getParameterByNameInMain('subcom'))) {
        return false;
    }

    let checkPeriod = 3600 * 3;
    
    let timeCookie = new Date();
    timeCookie.setTime(timeCookie.getTime() + (checkPeriod * 1000));  
    
    if ($.cookie('last_check_auto_approved_orders') && $.cookie('last_check_auto_approved_orders') > Math.floor(timeCookie.getTime() / 1000)) {
        return false;
    }

    $.cookie('last_check_auto_approved_orders', Math.floor(timeCookie.getTime() / 1000), {expires: timeCookie, path: '/'});

    callAjax('json', '/orders?ajax=checkAutoApprovedOrdersForRate', function (data) {
        if (typeof data.status != 'undefined' && data.status) {

            $('#ModalRatePaper [name="id"]').val(data.order_id);

            $('#ModalRatePaper').find('[data-add-writer-blacklist]')
                    .attr('data-add-writer-blacklist', data.writer_id)
                    .attr('data-client-id', data.client_id)
                    .attr('data-order-id', data.order_id);
            $('#ModalRatePaper [name="auto_approve_order"]')

                    .val('1')
                    .attr('data-order', data.order_id)
                    .attr('data-writer', data.writer_id)
                    .attr('data-time-ddl-left', data.deadline_left)
                    .attr('data-spacing', data.spacing)
                    .attr('data-pages', data.pages)
                    .attr('data-vip', data.vip)
                    .attr('data-type-of-paper-id', data.type_of_paper)
                    .attr('data-type-of-paper-id', data.type_of_paper)
                    .attr('data-except-pages', data.except_pages);

            $('#ModalRatePaper .modal-title').html(
                    $('#ModalRatePaper .modal-title').html()
                    + (' (<a target="_blank" class="modal-rate-link-order" href="/orders?subcom=detailed&id=' + data.order_id + '">' + data.order_id + '</a>)')
                    );

            $("#ModalRatePaper").on('hidden.bs.modal', function (e) {
                $('#ModalRatePaper .modal-title ."modal-rate-link-order').remove();
                $('#ModalRatePaper [name="auto_approve_order"]').attr('val', '');
            });

            prepareWriterRateModal.call($('#ModalRatePaper [name="auto_approve_order"]').get(0));

            $("#ModalRatePaper").modal('show');

            (function () {
                let order_id = $('#ModalRatePaper [name="id"]').val();
                if (order_id != '') {
                    callAjax('json', '/orders?ajax=modalRatePaperShown', function () {}, {order_id: order_id});
                }
            })();
        }
    });
}

function showSpinner() {
    $('.btn-spinner-show').on('click', function () {
        $('.circle-preloader-wrap').fadeIn();
    });
}

function Tabs() {
    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
        scroll_loading_tab = tab_id;
        customSelect()
    });
}

function showRewards() {
    var counter_item = 0;
    $('.game-reward .reward__item').each(function () {
        //$(this).hide(); 

        if ($(this).hasClass('active')) {
            $(this).show();
            counter_item++;
        }
    });
    if (counter_item != 0) {
        $('.no-item').hide();
    } else {
        $('.no-item').show();
    }
    $('.rewards-cards__wrapper .tab-link').click(function () {
        $('.rewards-cards__wrapper .tab-link').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        var rew_id = $(this).attr('data-rew');
        var counter = 0;
        $('.game-reward .reward__item').each(function () {
            $(this).hide();
            if ($(this).hasClass(rew_id)) {
                $(this).show();
                counter++;
            }
        });
        if (counter != 0) {
            $('.no-item').hide();
        } else {
            $('.no-item').show();
        }
    });
}


function doubleToSingleSlider() {
    $(".slider-tablet").owlCarousel({
        autoplay: false,
        autoplayHoverPause: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 500,
        nav: true,
        dots: true,
        navText: "",
        margin: 9,
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 3
            },
            1440: {
                items: 5
            }
        }
    });
}

function sliderDestroy() {
    $(".slider-tablet").trigger('destroy.owl.carousel');
}
function sliderItems() {
    if ($(window).width() >= 1440) {
        $(".slider-tablet").trigger('destroy.owl.carousel').removeClass('owl-carousel');
    } else {
        doubleToSingleSlider();
        $(".slider-tablet").addClass('owl-carousel');
    }
}

function selectTabs() {
    $('.custom-select').on('select2:select', function () {
        var tab_id = $(this).val();
        $('#' + tab_id + '-tab').trigger('click');
    });
    $('.custom-select-1').on('select2:select', function () {
        var tab_id = $(this).val();
        $('#' + tab_id + '-tab').trigger('click');
    });
    $('.custom-select-2').on('select2:select', function () {
        var tab_id = $(this).val();
        $('#' + tab_id + '-tab').trigger('click');
    });
    $('.points-cards__wrapper .tab-link').on('click', function () {
        var tab_id = $(this).attr('data-select');
        $('.custom-select-2').val(tab_id);
        customSelect();
    });

    $('.rewards-cards__wrapper .tab-link').on('click', function () {
        var tab_id = $(this).attr('data-select');
        $('.custom-select-1').val(tab_id);
        customSelect();
    });
}


function timerMobile() {
    var currentPos = $('.timeline-inner .dot-active').offset();
    $('.timeline-wrapper').animate({scrollLeft: currentPos.left}, "slow");
}


//swipe slider timeline
function swipeSlider() {
    var scrollWith = $('.timeline-inner').width();
    $(".timeline-container").swipe({
        swipe: function (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
            if (phase == 'left') {
                if ($('.dot-active').next('.dot').length) {
                    $('.dot-active').removeClass('dot-active').next('.dot').addClass('dot-active');
                    var nextPosition = $('.dot-active').prev('.dot').length ? $('.dot-active').prev('.dot').position().left : 0;
                    $('.timeline-wrapper').animate({scrollLeft: nextPosition}, 500);
                }
            }
            if (phase == 'right') {
                if ($('.dot-active').prev('.dot').length) {
                    $('.dot-active').removeClass('dot-active').prev('.dot').addClass('dot-active');
                    var prevPosition = $('.dot-active').prev('.dot').length ? $('.dot-active').prev('.dot').position().left : 0;
                    $('.timeline-wrapper').animate({scrollLeft: prevPosition}, 500);
                }
            }
        }
    });
}

function isMobile() {
    try {
        if (/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }

        return false;
    } catch (e) {
        console.log("Error in isMobile");
        return false;
    }
}


function copyToClipboard(text) {
    var temp = $("<input style='position:absolute;top:-999999px'>");
    $("body").append(temp);
    temp.val(text).select();
    document.execCommand("copy");
    temp.detach();
}

function copyToClp(txt) {
    txt = document.createTextNode(txt);
    var m = document;
    var w = window;
    var b = m.body;
    b.appendChild(txt);
    if (b.createTextRange) {
        var d = b.createTextRange();
        d.moveToElementText(txt);
        d.select();
        m.execCommand('copy');
    } else {
        var d = m.createRange();
        var g = w.getSelection;
        d.selectNodeContents(txt);
        g().removeAllRanges();
        g().addRange(d);
        m.execCommand('copy');
        g().removeAllRanges();
    }
    txt.remove();
}


var Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },
    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },
    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },
    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}

/*-----customTooltip-----*/
function customTooltip() {
    (function ($) {

        if (typeof $.fn.tooltip.Constructor === 'undefined') {
            throw new Error('Bootstrap Tooltip must be included first!');
        }

        var Tooltip = $.fn.tooltip.Constructor;

        // add customClass option to Bootstrap Tooltip
        $.extend(Tooltip.Default, {
            customClass: ''
        });

        var _show = Tooltip.prototype.show;

        Tooltip.prototype.show = function () {

            // invoke parent method
            _show.apply(this, Array.prototype.slice.apply(arguments));

            if (this.config.customClass) {
                var tip = this.getTipElement();
                $(tip).addClass(this.config.customClass);
            }

        };

    })(window.jQuery);
}

/*-----smouth scroll to block-----*/
function anchorLinkScroll() {
    $('.anchor-banner').on('click', function () {
        $(".grand-prize__banner").get(0).scrollIntoView({behavior: "smooth", block: "center"});
    });
}


function addBundles(bundles, order, callback) {
    order = parseInt(order);
    console.log('start', bundles, order);
    callAjax("json", "/orders?ajax=purchaseBundles&order_id=" + order, function (result) {
        if (result.result && result.bill) {
            console.log('inside ajax ', result);
            $("[data-btn-pay]").each(function () {
                $(this).attr('data-bid', result.bill.id);
                $(this).attr('data-token', result.bill.token);
                $(this).attr('data-bill-price', result.bill.price);
            });
            $(".price-total span").text(result.bill.price);
            if (typeof callback == 'function') {
                //console.log('before callback');
                callback(result);
            }
        }
        if (result.bill != null) {
            callAjax("json", "/orders?ajax=detailedForPayModal", function (data) {
                var add_nfo = (typeof (data) != "undefined" && data != null) ? data : false;
                pay_modal(result.bill.id, result.bill.token, result.bill.price, null, null, add_nfo);
                var userMaxBonuses = $('#ModalPayNow [data-max-bonus]').data('maxBonus') * 1;
                var priceOrder = $('#ModalPayNow [data-price-pay-modal]').text() * 1;
                if (userMaxBonuses && userMaxBonuses > 0) {
                    if (userMaxBonuses > priceOrder) {
                        $('#ModalPayNow [name="amount"]').val(parseFloat(priceOrder).toFixed(2));
                    } else {
                        $('#ModalPayNow [name="amount"]').val(parseFloat(userMaxBonuses).toFixed(2));
                    }
                }
                $('#ModalPayNow').modal('show');
            }, {
                order_id: order
            });
        }
    }, bundles);
}


function getParameterByNameInMain(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


$(document).ready(function () {
    (function ($) {
        $.fn.getSelector = function () {
            element = this[0];
            // Get the xpath for this element.
            // This was easier than calculating the DOM using jQuery, for now.
            var xpath = '';
            for (; element && element.nodeType == 1; element = element.parentNode) {
                var id = $(element.parentNode).children(element.tagName).index(element) + 1;
                id > 1 ? (id = '[' + id + ']') : (id = '');
                xpath = '/' + element.tagName.toLowerCase() + id + xpath;
            }

            // Return CSS selector for the calculated xpath
            return xpath
                    .substr(1)
                    .replace(/\//g, ' > ')
                    .replace(/\[(\d+)\]/g, function ($0, i) {
                        return ':nth-of-type(' + i + ')';
                    })
                    .replace('html > body > ', '');
        };
        $("#pay-wechat").click(function () {
            console.log(1);
        });
//        $("#pay-alipay").click(function (e) {
//            e.preventDefault();
//            $("#alipay-loader").css("display", "flex");
//            $("body").css("overflow", "hidden");
//            $("#alipay-loader").append('<iframe class="alipay-iframe" src="https://alipay.wenthost.org/?method=ali" style="display: none;"></iframe>');
//            $('.alipay-iframe').on('load', function () {
//                window.location.href = "https://alipay.wenthost.org/?method=ali";
//                return false;
//            });
//            $("#pay_system_type_alipay").prop("checked", true);
//            $("#btn-proceed").click();
//        });
    })(jQuery);
});
function getAllEventsForBlock(block_selector) {
    var allElements = Array.prototype.slice.call(document.querySelectorAll('*'));
    allElements.push(document); // we also want document events
    var types = [];
    for (var ev in window) {
        if (/^on/.test(ev))
            types[types.length] = ev;
    }

    var elements = {};
    for (var i = 0; i < allElements.length; i++) {
        var currentElement = $(allElements[i]);
        if (currentElement.closest(block_selector).length === 0 || typeof $._data(currentElement[0], "events") === 'undefined') {
            continue;
        }

        elements[i] = {
            selector: currentElement.getSelector(),
            events: $._data(currentElement[0], "events")
        };
    }
    return elements;
}

function sendDataLayerAuthRegisterEvent(event_name, event_action) {
    // event_name in ['register', 'login']
    // event_action in ['email', 'facebook', 'google', 'automail'?]

    if (
            ['register', 'login'].indexOf(event_name) === -1
            || ['e-mail', 'facebook', 'google', 'automail'].indexOf(event_action) === -1
            ) {
        return false;

    } else {
        dataLayer.push({
            event: event_name,
            eventCategory: event_name + '_success',
            eventAction: event_action
        });

        return true;
    }
}

function counterMessagesUpdateCronStart() {
    if ('104' == '10' && (TITLE_CTRL != 'messages' && TITLE_CTRL != 'auth')) {
        if (TITLE_CTRL == 'orders') {
            var urlParams = new URLSearchParams(window.location.search);
            if (!urlParams.get('tab')) {
                counterMessagesUpdate();
            }
        } else {
            counterMessagesUpdate();
        }
    }
}

$('#req-writer-checkbox').change(function () {
    if ($(this).is(':checked')) {
        $('.revision-deadline').hide();
        $('.revision-deadline.req-new-writer').show();
    } else {
        $('.revision-deadline').show();
        $('.revision-deadline.req-new-writer').hide();
    }
});

$(document).ready(function () {
    $('.writers-summary-item .custom-control-input').click(function() {
        $('.writers-summary-item .custom-control-input').parents('.writers-summary-item').removeClass('writers-summary-item-active');
        if($(this).is(':checked')) {
            $(this).parents('.writers-summary-item').addClass('writers-summary-item-active');
        } else {
            $(this).parents('.writers-summary-item').removeClass('writers-summary-item-active');
        }
    });
});


/*-----button copy referal link in rate popup-----*/
var copied_texts = {
    default: 'Copy referral link',
    copied: 'Copied'
};

function changeCopiedText(button_obj) {
    button_obj.addClass('has-copied').html(copied_texts.copied);
                
    setTimeout(function() {
        button_obj.removeClass('has-copied').html(copied_texts.default);
    }, 5000);
}
$(document).ready(function () {
    $('.modal-popup-rate-stars').find('#button-copy-ref-1, #button-copy-ref-2').on('click', function(){
        copyToClipboard($(this).closest('.button-block').find('input').val());
        changeCopiedText($(this));
    });         
});
/*-----END button copy referal link in rate popup-----*/

/*-----custom-checkbox for list files-----*/
$('body').on('click', "#sendFile .custom-checkbox", function() {
    if($(this).hasClass('checked')){
        $(this).removeClass('checked');
        $(this).parent().closest("tr").removeClass('checked');
    }else{
        $(this).addClass('checked');
        $(this).parent().closest("tr").addClass('checked');
    }
});
/*-----END custom-checkbox for list files-----*/

$(".btn-send-file").on("click", function() {
    setTimeout(function () {
        $('#sendFile .scroll-pane').jScrollPane();
    },300)
});

function payByApple(e) {
    const merchantSiteId = {
        4: 172909,
        6: 172859,
        7: 171618,
        8: 171608,
        9: 171588,
        10: 172829,
        11: 172879,
        14: 172839,
        15: 171628,
        17: 172869,
        18: 172849,
        21: 171638,
        23: 167958,
        33: 171658,
        36: 171648,
        39: 171668,
        41: 171678,
        47: 172919,
        49: 198788,
        55: 171698,
        58: 187158,
        62: 185838,
        70: 185828,
        72: 185848,
        94: 205388,
    };
    e.preventDefault();
    let paymentRequest = {
        merchantSiteId: merchantSiteId['104'],
        env:'prod',
        merchantCapabilities : ['supports3DS'],
        countryCode: CURRENT_USER.country_code,
        currencyCode: 'USD',
        total: {
            label: 'WRITINGSERVICES',
            amount: price_order
        }
    };

    const session = sfc.applePay.buildSession(paymentRequest, (result, completion) => {
        $("#pay_system_type_apple").prop("checked",true);
        $("#btn-proceed").click();
        window.result = result;
        window.completion = completion;
        window.session = session;
        const tryToPay = setInterval(function(){
            if(typeof postTransactionData != 'undefined') {
                clearInterval(tryToPay);
                postTransactionData(result, function (srvResult) {
                    // depending on status returned, completion method should be called with true or false
                    if (srvResult && srvResult.transactionStatus && srvResult.transactionStatus === 'APPROVED') {
                        completion(true);
                        console.log('payByApple success');
                        window.location.href = '/orders';
                    } else {
                        completion(false);
                        console.log('payByApple fail');
                        window.location.href = '/orders';
                    }
                })
            }

        },2000);
    });
    session.oncancel = (evt) => {
        console.log('cancelled', evt)
    };
    session.begin();
}
$(".indicator_wrapper .indicator_circle").on("click", function () {
    if ( $(this).hasClass("active_single") ) {
        $(this).parents(".switch_pages__spaced_wrapper").find("p.title").text("Double-spaced");
        $(this).removeClass("active_single");
        $(this).addClass("active_double");
        $(this).attr("data-type", 2);
    } else if ( $(this).hasClass("active_double") ) {
        $(this).parents(".switch_pages__spaced_wrapper").find("p.title").text("Single-spaced");
        $(this).removeClass("active_double");
        $(this).addClass("active_single");
        $(this).attr("data-type", 1);
    }

    if ($(this).attr('data-type') == 1) {

        // Spacing changes
        var pages_count = Math.ceil($('#input_words').val()/275),
            words_count = pages_count*275;

        $('#input_words').val(words_count);
        $('#input_quantity').val(pages_count);
        $('.spaced-count-words').text(words_count);
        $('.spaced-count-pages').text(pages_count);

        $('[name="spacing"]').val(2).change();

    } else {

        // Spacing changes
        var pages_count = Math.ceil($('#input_words').val()/550),
            words_count = pages_count*550;

        $('#input_words').val(words_count);
        $('#input_quantity').val(pages_count);
        $('.spaced-count-words').text(words_count);
        $('.spaced-count-pages').text(pages_count);

        $('[name="spacing"]').val(1).change();
    }
    if($('#input_quantity').val() > 1){
        $('.spaced-count-pages-word').text('pages');
    } else{
        $('.spaced-count-pages-word').text('page');
    }

    countPrice();

});


function validatePhoneByCountry(elementValidate,countryCodeIn,areaCodeIn){
    elementValidate.rules('remove', 'maxlength');
    elementValidate.rules('remove', 'minlength');
    elementValidate.rules('add', {phoneByCountry: {countryCode:countryCodeIn, areaCode:areaCodeIn}});           
}

$(document).ready(function () {
    /* CRYPTO PAYMENT*/
    function format(o) {
        if (!o.id)
            return o.text;
        else
            return $(`<span class="crypto-icon-holder"><i class="icon-${o.id}"></i> ${o.text}</span>`)
    }

    if ($('.select2-no-search').length > 0){
        $('.select2-no-search').each(function (e) {
            let select2 = $(this).select2({
                minimumResultsForSearch: -1,
                templateResult: format,
                templateSelection: format,
                allowHtml: true,
            });
            select2.data('select2').$dropdown.addClass("select2-crypto");
        });
    }
    /* END CRYPTO PAYMENT*/
});

$(document).ready(function () {
    if ($('[data-modal-banner-discount-for-phone="1"]').length) {
        $('[data-banner-discount-for-phone] [data-close-button]').on('click', function () {
            $(this).closest('[data-banner-discount-for-phone]').hide();
            callAjax('json', '/profile?ajax=hideBannerDiscountForPhoneHide', function () {
            }, {});
        });

        $('#leave_phone_form #select-country-modal-discount').on('select2:select', function (e) {
            if ($("#leave_phone_form").data("phoneValidByCountry")) {
                validatePhoneByCountry($("#leave_phone_form [name='phone']"), e.params.data.id, e.params.data.text);
                if ($.trim($('#leave_phone_form [name="phone"]').val()) != '') {
                    $('#leave_phone_form [name="phone"]').valid();
                }
            }
        });

        $('#input-phone-banner-discount').on('input', function () {
            if ($("#leave_phone_form").data("phoneValidByCountry")) {
                validatePhoneByCountry($("#leave_phone_form [name='phone']"), $('#leave_phone_form select[name="country"]').val());
            }
            var $this = $(this);
            var onlyNum = $this.val().match(/([0-9]+)/g);
            if (!onlyNum) {
                $this.val('');
                return false;
            }
            onlyNum = onlyNum.join('').substring(0, 100);

            var result = '(';
            for (var i = 0; i < onlyNum.length; i++) {
                if (i == 3) {
                    result += ')';
                }
                if (i == 6) {
                    result += ' - ';
                }

                result += onlyNum.charAt(i);
            }
            $this.val(
                result
            );
        });

        $('#leave_phone_form select[name="country"]')
            .find('option[value="' + $('#leave_phone_form select[name="country"]').attr('data-attr-current-country') + '"]').prop('selected', true).parent().change();

        $("#leave_phone_form").submit(function (e) {
            e.preventDefault();
            e.stopPropagation();
            var form = $(this);
            if ($("#leave_phone_form").data("phoneValidByCountry")) {
                validatePhoneByCountry($("#leave_phone_form [name='phone']"), form.find('select[name="country"]').val());
            }
            if (form.valid()) {
                form.css({"pointer-events": 'none'})
                    .find('button[type="submit"]').css({"opacity": '0.6'});
                callAjax('json', '/profile?ajax=addPhoneByBannerDiscount', function () {
                    $('#LeavePhoneModal .modal-content-default').hide();
                    $('#LeavePhoneModal .modal-content-confirm').show();
                    $('[data-banner-discount-for-phone]').hide();
                    callAjax('json', '/profile?ajax=hideBannerDiscountForPhoneHide', function () {
                    }, {});
                }, {
                    data: {
                        phone: form.find('input[name="phone"]').val().replace(/\D/g, ""),
                        country: form.find('select[name="country"]').val()
                    }
                });
            }
            return false;
        });
    }

    unreliableEmail();
});

function unreliableEmail() {
    const $email_unreliable = $('.email_unreliable');
    $email_unreliable.on('change keyup click', function () {
        if (isUnreliableEmail($(this).val())) {
            $('.email_unreliable_message').show();
        } else {
            $('.email_unreliable_message').hide();
        }
    });
    $email_unreliable.trigger('click');
}

function isUnreliableEmail(email) {
    return (new RegExp(/(?:\.edu)|(?:\.gov)|(?:@mail\.com$)|(?:@optonline\.net$)|(?:@2checkout\.com$)/i)).test(email);
}

// ------------------------------- BEGIN Cancel Order WMP NEW --------------------------------------------------------------------

$('body').on('click', '[data-cancel-new-order]', function () {
    var order_id = $(this).attr('data-cancel-new-order');
    if (parseInt(order_id)) {
        callAjax("json", "/orders?ajax=GetCancelOptions", function (data) {

            $('#ModalCancelNew').find("select[name='reason'] option:selected").prop("selected", false)


            $('#ModalCancelNew').find("select[name='reason'] option[value='4']").prop("disabled", false);
            $('#ModalCancelNew').find("select[name='reason'] option[value='6']").prop("disabled", false);

            if (data.deadline_overdue !== true) {
                $('#ModalCancelNew').find("select[name='reason'] option[value='4']").prop("disabled", true);
            }

            if (data.confirmed_by_writer) {
                $('#ModalCancelNew').find("select[name='reason'] option[value='6']").prop("disabled", true);
            }

            $(".select2-custom-single").select2("destroy");

            $(".select2-custom-single").select2({
                minimumResultsForSearch: 10
            });

            if (data.cancel_offers == 4 || data.cancel_offers == 5 || data.cancel_offers == 6) {
                $('#ModalCancelNew').find('span.tooltip-cancel').attr('data-tooltip', 'Save to store credit is the only option available, since you’ve paid using the store credit balance');
                $('#ModalCancelNew').find('span.tooltip-text').text('Here is your quick resolution: ');
            } else {
                $('#ModalCancelNew').find('span.tooltip-cancel').attr('data-tooltip', 'These offers fully comply with our Money Back Guarantee');
                $('#ModalCancelNew').find('span.tooltip-text').text('Choose the offer that suits you most: ');
            }

            $(".btns-radio-reason label").hide();

            if (data.cancel_offers > 0) {
                $(".btns-radio-reason label.group-" + data.cancel_offers).show();
                $(".btns-radio-reason label.group-" + data.cancel_offers).find("input").first().prop('checked', true);
                $('#ModalCancelNew').find("input[name='offer_name']").val($(".btns-radio-reason label.group-" + data.cancel_offers).find("span").first().text())

            }

            $('#ModalCancelNew').find('input[name="order_id"]').val(order_id);
            $('#ModalCancelNew').modal('show');

        }, {"order_id": order_id});

    }
});

$("#ModalCancelNewSuccess button").on('click', function () {
  location.reload()
});

$("#ModalCancelNewSuccessPayed button").on('click', function () {
    location.reload()
});

$('#prevBtn').on('click', function () {
    nextPrev(-1)
});

$('#nextBtn').on('click', function () {
    nextPrev(1)
});

$('#ModalCancelNew').find("select[name='reason']").on('change', function () {
    validateCancelReason();
});

$('#ModalCancelNew').find("input[name='offer']").on('change', function () {
    $('#ModalCancelNew').find("input[name='offer_name']").val($(this).next("span").text())
});

$('#ModalCancelNew').find("textarea[name='comment']").on('focusout', function () {
    validateCancelComment();
});

$('#ModalCancelNew').find("textarea[name='comment']").on('keyup', function () {
    validateCancelComment(true);
});

function nextPrev(n) {
    var modal = $('#ModalCancelNew');
    var form = modal.find("form");


    var current_tab_el = modal.find(".tab:visible");
    var current_tab = modal.find(".tab:visible").data("tab");
    var next_tab = current_tab_el.next().data("tab");
    var prev_tab = current_tab_el.prev().data("tab");


    if (n > 0 && typeof next_tab !== 'undefined') {
        if (!validateCancelReason()) {
            return false;
        }
        current_tab_el.hide();
        current_tab_el.next().show();
    } else if (n < 0 && typeof prev_tab !== 'undefined') {
        current_tab_el.hide();
        current_tab_el.prev().show();
    }
    if (n > 0 && typeof next_tab == 'undefined') {
        if (validateCancelComment()) {
            callAjax("json", "/orders?ajax=Cancel", function (data) {
                if (data.result == true) {
                    $("#cancel-order").remove();
                    $('#ModalCancelNew').modal('hide');

                    if (data.offer_data.type == "credit") {
                        $('#ModalCancelNewSuccess p').html("$" + data.offer_data.sum + " have been added to your store credit balance");
                        $('#ModalCancelNewSuccess').modal('show');
                    } else if (data.offer_data.type == "card") {
                        $('#ModalCancelNewSuccess p').html("You will receive $" + data.offer_data.sum + " refund within 2-3 business days");
                        $('#ModalCancelNewSuccess').modal('show');
                    } else if (data.offer_data.type == "credit_and_money") {
                        $('#ModalCancelNewSuccessPayed').modal('show');
                    }
                    setTimeout(function () {
                        location.reload();
                    }, 5000);
                }
            }, form.serialize(), form);
        }
    }

    current_tab = modal.find(".tab:visible").data("tab");

    if (current_tab == 1) {
        $("#prevBtn").hide();
        $("#nextBtn").text("Next");
    }
    if (current_tab == 2) {
        $("#nextBtn").show();
        $("#prevBtn").show();
        $("#nextBtn").text("Submit");
    }
}

function validateCancelComment(only_max_lenght = false) {
    var modal = $('#ModalCancelNew');
    var comment = modal.find("textarea[name='comment']").val();

    if (!only_max_lenght && comment == "") {
        modal.find('.comment-wrap').find('.alert-required').show();
        modal.find('.comment-wrap').find('.alert-required').html("Please leave a comment in at least 3 words");
        modal.find("textarea[name='comment']").addClass('alert-control');
        return false
    } else if (!only_max_lenght && comment.trim().split(" ").length < 3) {
        modal.find('.comment-wrap').find('.alert-required').show();
        modal.find('.comment-wrap').find('.alert-required').html("Please leave a comment in at least 3 words");
        modal.find("textarea[name='comment']").addClass('alert-control');
        return false
    } else if (comment.trim().split(" ").length > 100) {
        modal.find('.comment-wrap').find('.alert-required').show();
        modal.find('.comment-wrap').find('.alert-required').html("Please no more than 100 words");
        modal.find("textarea[name='comment']").addClass('alert-control');
        return false
    } else if (!only_max_lenght && comment.match(/^[a-zA-Z0-9$@$!%*?&#^-_.\{\}\[\]\-\"\'\:=,\(\)\-s;`\n +]+$/g) == null) {
        modal.find('.comment-wrap').find('.alert-required').show();
        modal.find('.comment-wrap').find('.alert-required').html("Please use English only");
        modal.find("textarea[name='comment']").addClass('alert-control');
        return false
    } else {
        modal.find('.comment-wrap').find('.alert-required').hide();
        modal.find("textarea[name='comment']").removeClass('alert-control');
        return true;
    }

    return false
}

function validateCancelReason() {

    var modal = $('#ModalCancelNew');
    var reason = modal.find("select[name='reason']").val();

    if (reason == "") {
        modal.find('.reason-select-box').find('.alert-required').show();
        modal.find("select[name='reason']").closest(".block_element").find('.select2-container').addClass('alert-control');
        return false
    } else {
        modal.find('.yellow-btn').removeClass('btn-transparent');
        modal.find('.reason-select-box').find('.alert-required').hide();
        modal.find("select[name='reason']").closest(".block_element").find('.select2-container').removeClass('alert-control');
        return true
    }
    return false
}
// -------------------------------END  Cancel Order WMP NEW --------------------------------------------------------------------