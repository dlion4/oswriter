$.ajaxSetup({
    cache: false
});

function callAjax(data_type, url, callback, input_data, form) {
    $.ajax({
        url: url,
        data: input_data,
        dataType: data_type,
        type: 'POST',
        error: function(jqxhr, ts, err) {
            //console.error(jqxhr);
        },
        success: function(data) {
            isAuthError(data);
            if(data_type.toLowerCase() == 'html'){
                callback(data);
            }else{
//                     if(typeof(form) != "undefined"){
            if (!(is_error = isError(data, form)) && typeof(form) == "object"){
//            console.log(isError(data, form));
                callback(data);
			}else{
                callback(data, is_error);
			}
            }
        }
    })
}

function getResponseHeaders(jqXHR) {
    var result = {};
    var headers = jqXHR.getAllResponseHeaders();
    headers = headers.split("\n");
    headers.forEach(function (header) {
        header = header.split(": ");
        var key = header.shift();
        if (key.length == 0)
            return
        // chrome60+ force lowercase, other browsers can be different
        key = key.toLowerCase();
        result[key] = header.join(": ");
    });

    return result;
}

function callAjaxWithAjaxDislogin(data_type, url, callback, input_data, form) {
    $.ajax({
        url: url,
        data: input_data,
        dataType: data_type,
        type: 'POST',
        error: function (jqxhr, ts, err) {
            if ($.inArray(parseInt(jqxhr.getResponseHeader('status')), [302, 500]) >= 0) {
                location.reload();
            }
        },
        success: function (data, textStatus, jqXHR) {
            if(parseInt(jqXHR.getResponseHeader('status')) === 302) {
                location.reload();
            }
            isAuthError(data);
//                     if(typeof(form) != "undefined"){
            if (!(is_error = isError(data, form)) && typeof(form) == "object")
//            console.log(isError(data, form));
                callback(data);
            else
                callback(data, is_error);
        }
    })
}

function callAjaxAsyncFalse(data_type, url, callback, input_data, form) {
    $.ajax({
        url: url,
        data: input_data,
        dataType: data_type,
        type: 'POST',
        async: false,
        error: function(jqxhr, ts, err) {
//            console.error(jqxhr);
        },
        success: function(data) {
            isAuthError(data);
//                     if(typeof(form) != "undefined"){
            if (!(is_error = isError(data, form)) && typeof(form) == "object")
//            console.log(isError(data, form));
                callback(data);
            else
                callback(data, is_error);
        }
    })
}

function callAjaxFileUpload(url, form_object, callback) {
    var form_data = new FormData($(form_object)[0]);

    $.ajax({
        url: url,
        type: 'post',
        data: form_data,
        dataType: 'json',
        processData: false,
        contentType: false,
        error: function(jqxhr, ts, err) {
            callback(false, true);
            console.log(ts);
        },
        success: function(data) {
            isAuthError(data);
            if(!isError(data, $(form_object))) { 
                callback(data);
            } else {
                callback(data, true);
            }
        }
    })
}

/*function callAjaxFileUpload(url, form_object, callback, error_callback) {
    $.ajax(form_object.action, {
        data: $("[name]", form_object).not(":file").serializeArray(),
        url: url,
        files: $(":file", form_object),
        iframe: true,
        type: 'POST',
        dataType: 'json',
        processData: false,
        error: function (jqxhr, ts, err) {
//            console.log(ts);
//            isAuthError(data);
            console.log('file error');
        },
        success: function (data) {
            isAuthError(data);
            if (!isError(data, $(form_object))) {
                callback(data);
            } else {
                error_callback(data);
            }
        }
    })
}*/

function isError(data_array, element) {
    var result = false;
    //console.log(data_array);
    $.each(data_array, function (key, value) {
        if (!value) {
            result = false;
        } else if (typeof(value.error) == "string") {
//            console.log(data_array);
//            console.log(key);
            console.log(key, "Attention", value.error);
            result = true;
        } else if (typeof(value.error) == "object") {
            $.each(value.error, function (name, text) {
                if (typeof(element) == "object") {
                    if ($("input[name='" + name + "']").closest(".order-form-admin").length) {
                        $(".order-form-admin input[name='" + name + "']").addClass('error-bl');
                        $(".order-form-admin ." + name + "_error_place").text('');
                        $(".order-form-admin ." + name + "_error_place").append('<span id="' + name + '-error" class="error wrap-lable-error">' + text + '</span>');
                    } else {
                        showFormElemError(element, name, text);
                    }
                } else {
//                    console.error(text);
                }
            })
            result = true;
        } else if ($.isArray(value)) {
            result = isError(value, element);
        }
    })
    return result;
}

function isAuthError(response) {
    if (response != null)
        if (typeof(response["auth_error"]) != "undefined") {
            top.location.href = "/" + response["auth_error"]["auth_controller"];
        } else if (typeof(response["debug"]) != "undefined") {
            $.each(response["debug"], function (key, item) {
                console.log("debug info key=" + key + " item=" + item);
            });
        }
}