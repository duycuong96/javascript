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

  


// lấy thông tin vào giỏ hàng

function addProduct(){
  // productId = productId + 1;
  let productCart = [];

    
  if(localStorage.getItem('productCart')){
    productCart = JSON.parse(localStorage.getItem('productCart'));
    // parse -> productCart nhận 1 array hoặc object được chuyển lại từ json.stringify
  }

  let productName = document.querySelector('#product-name').innerHTML;
  let productPrice = document.querySelector('#product-price').innerHTML;
  let productId = document.querySelector('#product-id-cart').innerHTML;
  
  productCart.push({
    id : productId,
    name : productName,
    price : productPrice
  });

  localStorage.setItem('productCart', JSON.stringify(productCart));
}

function getProductCart(){
  productCart = JSON.parse(localStorage.getItem('productCart'));
  const listProductCart = document.querySelector('.product-cart-row');
  listProductCart.innerHTML = productCart.map(product => {
    return `<div class="products-position">
                <div class="products-image">
                    <img class="products-image__img" src="${product.image}" alt="">
                </div>
                <h3 class="products-position__name"  ><a href="product.html" onclick="createItem(${product.id})">${product.name}</a></h3>
                <hr>
                <div class="products-price" >
                    <h2 class="text-left">${product.price}</h2>
                    <h2 class="text-right"><i class="fa fa-trash"></i></h2>
                </div>
            </div>`;
}).join('');
}
// getProductCart();

    














