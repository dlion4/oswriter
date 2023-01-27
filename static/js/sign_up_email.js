$(document).ready(function() {

    $("#sign-up-email ._submit-sign-up-form").click(function(event){
        event.preventDefault();
        var form = $(this).parents("#sign-up-email");
        var email = form.find("[name='email']").val();
        var email_pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);

        if(eu_country_ip){
            if (!$("#sign-up-email-checkbox input[name='gdpr-agree']").is(":checked")) {
                $('#sign-up-email-checkbox .alert-danger-gdbr').show();
                $('#sign-up-email-checkbox [name=gdpr-agree]').addClass('gdpr-agree-err');                         
            }

            $("#sign-up-email-checkbox input[name='gdpr-agree']").on('change', function(){
                if (!$(this).is(":checked")) {                
                    $('#sign-up-email-checkbox .alert-danger-gdbr').show();
                    $('#sign-up-email-checkbox [name=gdpr-agree]').addClass('gdpr-agree-err');
                }else{
                    $('#sign-up-email-checkbox .alert-danger-gdbr').hide();
                    $('#sign-up-email-checkbox [name=gdpr-agree]').removeClass('gdpr-agree-err');;                        
                }
            }); 
        }
        var gdpr = $("#sign-up-email-checkbox input[name='gdpr-agree']").is(":checked");
        
        if (email != '' && email_pattern.test(email) && (eu_country_ip == 0 || ( eu_country_ip == 1 && gdpr))) {
            if (eu_country_ip) {
                $.cookie("cookie-banner", "show-banner");
                $("#cookie-banner").fadeOut(1000);
            }
            $.ajax({
                url: "sign_up_form?ajax=addUser",
                data: {
                    name:'',
                    email: email,
                    type: 2
                },
                dataType: "json",
                type: 'POST',
                success: function(data) {
                    form.remove();
                    $('#success-message-email').show();
                    location.reload();
                    $('.checkbox-gdbr-block').hide();
                }
            })
            
        } else{
            var messageTooltip = 'Please enter an email address';
            
            if(email != '' && !email_pattern.test(email)){
                messageTooltip= 'Input a valid email to get discounts'; 
            }
            
            form.find("input[name='email']")
                .css("border-bottom","1px solid red")
                .addClass('form-error')
                .focus(); 
        
            var tooltip =form.find("#email-tooltip");
            
            tooltip.click(function (){
                $(this).hide();
            });
            tooltip.find('.tooltip-inner').html(messageTooltip);
            
            tooltip.show();
        }
        return false;
    });
});