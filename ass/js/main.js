// header
$(document).ready(function () {
  var pull = $('#pull');
  menu = $('nav ul');
  menuHeight = menu.height();

  $(pull).on('click', function (e) {
    e.preventDefault();
    menu.slideToggle();
  });
});

$(window).resize(function () {
  var w = $(window).width();
  if (w > 980 && menu.is(':hidden')) {
    menu.removeAttr('style');
  }
});



$(document).ready(function () {
  // Hàm active tab nào đó
  function activeTab(obj) {
    // Xóa class active tất cả các tab
    $('.tab-wrapper ul li').removeClass('active');

    // Thêm class active vòa tab đang click
    $(obj).addClass('active');

    // Lấy href của tab để show content tương ứng
    var id = $(obj).find('a').attr('href');

    // Ẩn hết nội dung các tab đang hiển thị
    $('.tab-item').hide();

    // Hiển thị nội dung của tab hiện tại
    $(id).show();
  }

  // Sự kiện click đổi tab
  $('.tab li').click(function () {
    activeTab(this);
    return false;
  });

  // Active tab đầu tiên khi trang web được chạy
  activeTab($('.tab li:first-child'));
});


// list products

function renderProduct(product) {
  let template = $("#product").html();
  template = template.replace("{{id}}", product.id);
  template = template.replace("{{name}}", product.name);
  template = template.replace("{{price}}", product.price);
  template = template.replace("{{image}}", product.image);
  let shopCart = $('.products-row');
  $(template).appendTo(shopCart);
}


function getProducts() {
  let settings = {
      url: "http://5dcf7e2d75f9360014c268b9.mockapi.io/product?page=1&limit=12",
      dataType: "json",
      success: function(data, textStatus, jqXHR) {
          for (var product of data) {
              renderProduct(product);
          }
      }
  };
  $.ajax(settings);
}

getProducts();

