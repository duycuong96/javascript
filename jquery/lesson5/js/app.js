var $username;
var $password;
var $confirmPassword;

$(document).ready(function(){
    // thiệt lập giá trị cho các biến jQuery
    $username = $("#username");
    $password = $("#password");
    $confirmPassword = $("#confirm_password");
    //Ẩn các chú thích (Hint)
    $("form span").hide();
    //khi có sự kiện xảy ra trên username input
    $username.focus(processUsername).keyup(processUsername).keyup(enableOrDisableSubmitEvent);
   //khi có sự kiện xảy ra trên password input
    $password.focus(processPassword).keyup(processPassword).keyup(processConfirmPassword).keyup(enableOrDisableSubmitEvent);
   //khi có sự kiện xảy ra trên confirmation input
    $confirmPassword.focus(processConfirmPassword).keyup(processConfirmPassword).keyup(enableOrDisableSubmitEvent);
   // disable nút submit
    enableOrDisableSubmitEvent();
});

function isUsernameValid() {
	return $username.val().length > 0;
}

function isPasswordValid() {
  return $password.val().length >= 6;
}

function arePasswordsMatching() {
  return $password.val() === $confirmPassword.val();
}

function canSubmit() {
  return isUsernameValid() && isPasswordValid() && arePasswordsMatching();
}

function processUsername() {
	//Kiểm tra username đã hợp lệ?
	if (isUsernameValid()) {
		//Ẩn ghi chú ở phần username
		$username.next().hide();
	} else {
		//ngược lại thì hiển thị phần ghi chú cho username
		$username.next().show();
	}
	
}

function processPassword(){
    //Kiểm tra password đã hợp lệ?  
    if(isPasswordValid()) {
      //Ẩn ghi chú ở phần password
      $password.next().hide();
    } else {
      //ngược lại thì hiển thị phần ghi chú cho password
      $password.next().show();
    }
}

function processConfirmPassword() {
  //Kiểm tra confirm password đã hợp lệ? 
  if(arePasswordsMatching()) {
    //Ẩn ghi chú ở phần confirm password
    $confirmPassword.next().hide();
  } else {
    //ngược lại thì hiển thị phần ghi chú cho confirm password 
    $confirmPassword.next().show();
  }
}

function enableOrDisableSubmitEvent() {
  $("#submit").prop("disabled", !canSubmit());
}
