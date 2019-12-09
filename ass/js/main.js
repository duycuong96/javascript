// lấy thông tin vào giỏ hàng
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

// cart
$(document).ready(function(){
  productCart = JSON.parse(localStorage.getItem('productCart'));
  // console.log(productCart);
  getCartProduct();
  getTotalPrice();
  removeProduct();

})

// lấy sản phẩm vào giỏ hàng
function addProduct(){
  let productCart = [];
    
  if(localStorage.getItem('productCart')){
    productCart = JSON.parse(localStorage.getItem('productCart'));
    // parse -> productCart nhận 1 array hoặc object được chuyển lại từ json.stringify
  }

  let productName = $('#product-name').text();
  let productPrice = $('#product-price').text();
  let productId = $('#product-id-cart').text();
  let productImage = $('.product-image').attr('src');
  let quantity = 1;
  
  
  productCart.push({
    id : parseFloat(productId),
    name : productName,
    quantity : quantity,
    price : parseFloat(productPrice),
    image : productImage
  });

  // nếu id đã có trong mảng thì số lượng cộng thêm
  console.log(productCart);
  

  localStorage.setItem('productCart', JSON.stringify(productCart));
  
}


function getCartProduct(){


  // lọc ra id bị trùng
  // const filteredArr = productCart.reduce((acc, current) => {
  //   const x = acc.find(item => item.id === current.id);
  //   if (!x) {
  //     return acc.concat([current]);
  //   } else {
  //     return acc;
  //   }
  // }, []);

  const listProductCart = document.querySelector('.product-cart-row');
  if(listProductCart){
  
    listProductCart.innerHTML = productCart.map(product => {
      return `<div class="products-position">
                <div class="row">
                    <div class="col-sm-3">
                <div class="products-image">
                    <img class="" src="${product.image}" alt="">
                </div>
  
                </div>
                <div class="col-sm-9">
                  <h3 class="products-position__name"><a href="product.html"
                      onclick="createItem(${product.id})">${product.name}</a></h3>
                      
                  <hr>
                  <div class="products-price">
                      <h4 class="text-left">${product.price},000 đ</h4>
                      <p class="text-right"><i id="removeProduct" class="fa fa-trash"></i></p>
                  </div>
                  </div>
               </div>
  
            </div>`;
  }).join('');
  }



}


function getTotalPrice(){
  const totalPrice = productCart.reduce(function(currentTotal, product){
    return currentTotal + product.quantity * product.price;
  }, 0);
  
  const quantityProduct = productCart.reduce(function(totalQuantity, product){
    return totalQuantity + product.quantity;
  }, 0);
  // console.log(quantityProduct);

  $('.quantity-product').html(`Số lượng: ${quantityProduct}`);
  $('.total-price').html(`Tổng tiền: ${totalPrice}000 đ`)
}



function removeProduct(){
  $('#removeProduct').click(function(){
    localStorage.removeItem("productCart");
    // console.log('a');
  });
}





    














