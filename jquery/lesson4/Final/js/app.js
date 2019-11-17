//Tạo thẻ select và thêm nó vào #menu
var $select = $("<select></select>");


//Duyệt qua từng link trong #menu
$("#menu a").each(function(){
  var $anchor = $(this);
  //Tạo thẻ option
  var $option = $("<option></option>");

  //Highlight option tương ứng với trang hiện hành
  if($anchor.parent().hasClass("selected")) {
    $option.prop("selected", true);
  }
  //Gán giá trị của option là href
  $option.val($anchor.attr("href"));
  //Text của option là text của link
  $option.text($anchor.text());
  //Thêm option vào thẻ select
  $select.append($option);
});

$("#menu").append($select);

//Bách sự kiện change cho thẻ select
$select.change(function(){
  //Mở trang mới ứng với otpion được chọn trong thẻ select
  window.location = $select.val();
});








