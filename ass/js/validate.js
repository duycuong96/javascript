$(document).ready(function(){
    let name = $('#name');
    let email = $('#email');
    let phoneNumber = $('#phone-number');
    let content = $('#content');
    let pattern = /^[\w_\.\-]{2,}@(([\w]{2,})+\.)+[\w]{2,}$/;
    $(".contact-form").submit(function(){
        if(name.val() == "" ){
            name.focus();
            $('#userError').html("Vui lòng nhập tên");
            return false;
        }
        if ( pattern.test(email.val()) == false ) {{
            email.focus();
            $('#emailError').html("Bạn cần nhập đúng email");
            return false;
        }}
    });
    // kiểm tra nếu nhập thì mất lỗi
    name.bind('blur', function(){
        if(name.val() == ""){
            name.focus();
            $('#userError').html("Vui lòng nhập tên");
        } else {
            $('#userError').html("");
        }
    });


});

