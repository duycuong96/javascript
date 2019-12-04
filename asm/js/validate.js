$(document).ready(function(){
    let name = $('#name');
    let email = $('#email');
    let phoneNumber = $('#phone-number');
    // let content = $('#content');
    let patternEmail = /[a-zA-Z0-9]+\@+[a-zA-Z]+\.+[a-zA-Z]/;
    let patternPhoneNumber = /0[3\9][0-9]{8}/;
    $(".contact-form").submit(function(){
        if(name.val() == "" ){
            name.focus();
            $('#userError').html("Vui lòng nhập tên");
            return false;
        }
        if ( patternEmail.test(email.val()) == false ) {
            email.focus();
            $('#emailError').html("Bạn cần nhập đúng email");
            return false;
        }
        if(patternPhoneNumber.test(phoneNumber.val()) == false){
            phoneNumber.focus();
            $('#phoneError').html("Bạn cần nhập đúng số điện thoại");
            return false;
        }

        
    });
    // // kiểm tra nếu nhập thì mất lỗi
    name.bind('blur', function(){
        if(name.val() == ""){
            name.focus();
            $('#userError').html("Vui lòng nhập tên");
        } else {
            $('#userError').html("");
        }
    });


});

