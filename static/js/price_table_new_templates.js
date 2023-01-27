$(document).ready(function () {
    
    $(".form-pricing-submit").click(function(e){

        e.stopPropagation();
        e.preventDefault();
        $(".form-pricing-block-order").submit();

        return false;
    });
    
    $('.radio-group .button-group label').click(function () {
        $(this).parents('.radio-group').find('.button-group.active').removeClass('active');
        $(this).parent('.button-group').addClass('active');
        $(this).parents('.radio-group').find('input').removeAttr('checked');
        $(this).find('input').attr('checked', 'checked');
        $(this).find('input').trigger('change');
    });

    var content_price_table = $('#price-table-content');

    content_price_table.find('#prices-tab a').on('click', function (e) {
        content_price_table.find('#type_of_paper_price option[value="' + $(this).attr('data-type-name') + '"]').prop('selected', true).change();
        content_price_table.find('select[name="price-select-test"]').trigger('change');
        content_price_table.find('#currency_0').trigger('change');
        content_price_table.find('.currency-group .button-group .active label').trigger('click');
        content_price_table.find('.deadline-group .button-group .active label').trigger('click');
        setTimeout(function () {
            var current_ac_level = content_price_table.find('.tab-pane.active .price-item-col.active').find('[data-academic-level]');
            if (current_ac_level.length) {
                var ac_level_value = current_ac_level.attr('data-academic-level').replace('104', '').replace('0', '');
                $(".form-pricing-block-order").find('[name="academic_level"]').val(ac_level_value).attr('data-value', ac_level_value);
            }
        }, 500);
    });

    content_price_table.find(".items_wrp .item").on("click", function () {
        var _this = $(this);
        setTimeout(function () {
            var current_ac_level = _this.find('[data-academic-level]');
            if (current_ac_level.length) {
                var ac_level_value = current_ac_level.attr('data-academic-level').replace('104', '').replace('0', '');
                $(".form-pricing-block-order").find('[name="academic_level"]').val(ac_level_value).attr('data-value', ac_level_value);
            }
        }, 500);
    });

    content_price_table.find('#type_of_paper_price').on('change', function (e) {
        $('#prices-tab li a[data-type-name="' + $(this).val() + '"]').tab('show');
        content_price_table.find('select[name="price-select-test"]').trigger('change');
        content_price_table.find('#currency_0').trigger('change');
        $(".form-pricing-block-order").find('[name="service_type"]').val($(this).find('option:selected').attr('data-value'));
    });

    content_price_table.find('select[name="price-select-test"]').on('change', function (e) {
        setPriceOnTablePricesCommonDeadline($(this));
        content_price_table.find('[name="deadline"]').prop('checked', false).closest('.button-group').removeClass('active');
        content_price_table.find('[name="deadline"][value="' + $(this).val() + '"]').prop('checked', true).closest('.button-group').addClass('active');
        
        $(".form-pricing-block-order").find('[name="deadline"]').val($(this).val().replace('94','')).attr('data-value',$(this).val().replace('94',''));
    });

    setPriceOnTablePricesCommonDeadline($(".deadline-group .button-group .active label input[name='deadline']"));

    content_price_table.find('.deadline-group .button-group label').on('click', function (e) {
        setPriceOnTablePricesCommonDeadline($(".deadline-group .button-group .active label input[name='deadline']"));
        content_price_table.find('.currency-group .button-group .active label').trigger('click');
        content_price_table.find('select[name="price-select-test"] option[value="' + $(this).find('input').val() + '"]').prop('selected', true).change();
    });

    $(window).on('resize', function () {
        if ($(window).get(0).innerWidth <= 767) {
            // if mobile
            $("#type_of_paper_price").trigger('change');
            $("#currency_0").trigger('change');
            $("#deadline").trigger('change');
        } else {
            // if desktop
            $(".currency-group .button-group.active label").click();
        }
    });

    $("#currency_0").change(function () {
        var currency_rate = $(this).val().replace(/^....(.*)$/, "$1");
        var currency_code = $(this).val().replace(/^(...).*$/, "$1");
        var currency_rate = (currency_rate * 1).toFixed(2);

        content_price_table.find('[name="currency"]').prop('checked', false).closest('.button-group').removeClass('active');
        content_price_table.find('[name="currency"][value="' + $(this).val() + '"]').prop('checked', true).closest('.button-group').addClass('active');

        changeCurrency(currency_rate, currency_code);
    }).change();

    $('.currency-group .button-group label').click(function () {
        var currency_rate = $(this).find("input[name='currency']").val().replace(/^....(.*)$/, "$1");
        var currency_code = $(this).find("input[name='currency']").val().replace(/^(...).*$/, "$1");

        $("#currency_0 option[value='" + $(this).find("input[name='currency']").val() + "']").prop('selected', true).change();
        changeCurrency(currency_rate, currency_code);
    });


    function changeCurrency(currency_rate, currency_code) {
        var currency_rate = (currency_rate * 1).toFixed(2);
        if (currency_code == "GBP") {
            currency_code = "&pound;"
        } else if (currency_code == "EUR") {
            currency_code = "&euro;"
        } else {
            currency_code == "AUD" ? currency_code = 'A$' : currency_code == "CAD" ? currency_code = 'C$' : currency_code = "$"
        }

        var type_name = $('#type_of_paper_price').val();

        $('#price-table-content').find('.tab-pane .price-item-col .price-span').each(function (indx, element) {

            $(element).html($(element).attr('current-data'));
            if ((currency_code == '&pound;' || currency_code == '&euro;')) {
                $(element).html(parseFloat($(element).html() * currency_rate).toFixed(2));
            } else if (type_name == 'multiple-choice-questions') {

                var cur_value = parseFloat($(element).html() * currency_rate).toFixed(2);
                if (cur_value % 1 !== 0) {
                    $(element).html(parseFloat($(element).html() * currency_rate).toFixed(1));
                } else {
                    $(element).html(parseFloat($(element).html() * currency_rate).toFixed());
                }

            } else {
                $(element).html(Math.round($(element).html() * currency_rate));
            }
        });

        $('#price-table-content').find('.tab-pane .price-item-col .table-price-currency').each(function (indx, element) {
            $(element).html(currency_code);
        });
    }

    function setPriceOnTablePricesCommonDeadline(objectField) {
        var deadline = objectField.val();
        var academic_level = parseInt(objectField.data('academicLevel'));
        var type_name = $('#type_of_paper_price').val();

        var admission_help = false;
        var type_of_work = false;
        var problems = false;
        var questions = false;
        if (type_name == 'multiple-choice-questions' || type_name == 'problem-solving' || type_name == 'writing-scratch') {
            var type_of_work = 1;
            if (type_name == 'problem-solving') {
                var problems = 1;
            } else if (type_name == 'multiple-choice-questions') {
                var questions = 1;
            }
        } else if (type_name == 'editing-proofreading') {
            var type_of_work = 2;
        } else if (type_name == 'admission-help') {
            var admission_help = 1;
            var academic_level = 9405;
        }
        var type_of_paper = 1040002;

        $('#price-table-content').find('.tab-pane#' + type_name + ' .price-item-col .price-span').each(function (indx, element) {

            var price = count_price_local_page_prices($(element).data('academicLevel') ? $(element).data('academicLevel') : academic_level, type_of_paper, deadline, $(element).data('typeOfWork') ? $(element).data('typeOfWork') : type_of_work, admission_help, questions, problems);
            $(element).attr('current-data', price);
            $(element).text(price);
        });
    }

    $('.tag-active').find('label').trigger('click');
    $('.tag-active').removeClass('tag-active');

    if ((typeof (currency_coef_to_country) != "undefined" && currency_coef_to_country !== null)
            && (typeof (currency_coef_to_country) != "undefined" && currency_coef_to_country !== null)) {
        var coef = (currency_coef_to_country * 1).toFixed(2);
        $('.why-us-price-d, .why-us-price, .why-us-inner-text-price').each(function (key, value) {
            let old_price = $(value).text().slice(1);
            old_price = parseFloat(old_price);
            let new_price = (+old_price * coef).toFixed(2);
            $(value).text(currency_sign_to_country + new_price);
        });
    }
});