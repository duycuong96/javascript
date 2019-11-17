=var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");

//thêm image vào overlay
$overlay.append($image);

//thêm caption vào overlay
$overlay.append($caption);

//thêm overlay vào trang web
$("body").append($overlay);

// Đăng ký sự kiện click trên các thẻ <a>
$("#imageGallery a").click(function(event){
    event.preventDefault();

    var imageLocation = $(this).attr("href");
    $image.attr("src",  imageLocation);

    var captionText = $(this).children("img").attr("alt");

    $caption.text(captionText);

    $overlay.show();
});

$overlay.click(function(){
    $overlay.hide();
})
  // Loại bỏ các hành động mặc định của liên kết
  
  // Lấy đường dẫn file ảnh cho overlay
  
  // Lấy caption cho overlay
  
  // Hiển thị overay


// Đăng ký sự click trên overlay
  // Ẩn overlay










