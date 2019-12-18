// gọi ra đối tượng là cart
const CART = {
    KEY: 'cart',
    values: [],
    init() {
        // kiểm tra localStorage và khởi tạo nội dung của CART.values
        let productCart = localStorage.getItem(CART.KEY);
        if (productCart) {
            CART.values = JSON.parse(productCart);
        } else {
            
            CART.values = [
            ];
            CART.sync();
        }
    },
    async sync() {
        let _cart = JSON.stringify(CART.values);
        await localStorage.setItem(CART.KEY, _cart);
    },
    // 
    find: function (id) {
        // tìm id có trong giỏ hàng và trả về true
        let match = CART.values.filter(item => {
            if (item.id == id)
                return true;
        });
        if (match && match[0])
            return match[0];
    },
    // thêm một item mới vào giỏ hàng
    add(id) {
        // kiểm tra xem nó chưa có trong giỏ hàng
        if (CART.find(id)) {
            CART.increase(id, 1);
        } else {
            let arr = PRODUCTS.filter(product => {
                if (product.id == id) {
                    return true;
                }
            });
            if (arr && arr[0]) {
                let obj = {
                    id: parseInt(arr[0].id),
                    name: arr[0].name,
                    image: arr[0].image,
                    qty: 1,
                    price: arr[0].price
                };
                CART.values.push(obj);
                //update localStorage
                CART.sync();
            } else {
                
                console.error('Không hợp lệ');
            }
        }
    },
    // tăng số lượng của một mặt hàng trong giỏ hàng
    increase(id, qty = 1) {
        CART.values = CART.values.map(item => {
            if (item.id === id)
                item.qty = item.qty + qty;
            return item;
        });
        //update localStorage
        CART.sync()
    },
    reduce(id, qty = 1) {
        
        CART.values = CART.values.map(item => {
            if (item.id === id)
                item.qty = item.qty - qty;
            return item;
        });
        CART.values.forEach(async item => {
            if (item.id === id && item.qty === 0)
                await CART.remove(id);
        });
        //update localStorage
        CART.sync()
    },
    remove(id) {
       
        CART.values = CART.values.filter(item => {
            if (item.id !== id)
                return true;
        });
        //update localStorage
        CART.sync()
    },
    // sắp xếp
    sort(field = 'price') {

        let sorted = CART.values.sort((a, b) => {
            if (a[field] > b[field]) {
                return 1;
            } else if (a[field] < b[field]) {
                return -1;
            } else {
                return 0;
            }
        });
        return sorted;
        // KHÔNG ảnh hưởng đến localStorage
    },
    logvalues(prefix) {
        console.log(prefix, CART.values)
    }
};

let PRODUCTS = [];

document.addEventListener('DOMContentLoaded', () => {
    // lấy ra sản phẩm
    getProducts(showProducts, errorMessage);
    // lấy các key và value từ localStorage
    CART.init();
    // show giỏ hàng
    showCart();
    // tính tổng tiền 
    getTotalPrice();
    
});

// hàm show cart từ localStorage
function showCart() {
    let cartSection = document.querySelector('.product-cart-row');
    cartSection.innerHTML = "";
    let s = CART.sort('qty');
    s.forEach(item => {
        let cartitem = document.createElement('div');
        cartitem.className = 'products-position';

        cartitem.innerHTML = `<div class="row">
                                <div class="col-sm-3">
                                    <div class="products-image">
                                        <img class="" src="${item.image}" alt="">
                                    </div>

                                </div>
                                <div class="col-sm-9">
                                    <h3 class="products-position__name"><a href="product.html" onclick="createItem(${item.id})">${item.name}</a></h3>
          
                                <hr>
                                <div class="products-price">
                                    <h4 class="text-left">${item.price} đ</h4>
                                </div>
                                <div class="controls">
                                    <span class="increment-qty" data-id="${item.id}">+</span>
                                    <p class="quantity">${item.qty}</p>
                                    <span class="decrement-qty" data-id="${item.id}">-</span>
                                    </div>
                                </div>
                                
                                </div>`;
        
        cartSection.appendChild(cartitem);

        const incrementQty = document.querySelectorAll('.increment-qty');
        for (let i = 0; i < incrementQty.length; i++) {
            incrementQty[i].addEventListener('click', incrementCart);
        }

        const decrementQty = document.querySelectorAll('.decrement-qty');
        for (let i = 0; i < decrementQty.length; i++) {
            decrementQty[i].addEventListener('click', decrementCart);
        }

    })
}
// hàm tăng số lượng từng id trong giỏ hàng
function incrementCart(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    CART.increase(id, 1);
    let controls = ev.target.parentElement;
    let qty = controls.querySelector('.quantity');
    let item = CART.find(id);
    if (item) {
        qty.textContent = item.qty;
    } else {
        document.getElementById('cart').removeChild(controls.parentElement);
    }
}
// hàm giảm số lượng
function decrementCart(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    CART.reduce(id, 1);
    let controls = ev.target.parentElement;
    let qty = controls.querySelector('.quantity');
    let item = CART.find(id);
    if (item) {
        qty.textContent = item.qty;
    } else {
        document.getElementById('cart').removeChild(controls.parentElement);
    }
}
// 
function getProducts(success, failure) {
    //request danh sách sản phẩm từ server
    let categoryId = localStorage.getItem("categoryId");
    const URL = `https://5df044e202b2d90014e1bcaf.mockapi.io/categories/${categoryId}/products`;
    // nhận dữ liẹu 
    fetch(URL, {
        method: 'GET',
        mode: 'cors'
    })
        .then(response => response.json())
        .then(showProducts)
        .catch(err => {
            errorMessage(err.message);
        });
}
// show sản phẩm ra
function showProducts(product) {
    PRODUCTS = product;
    //take data.products and display inside <section id="products">
    let productSection = document.querySelector('.product-list-row');
    productSection.innerHTML = "";
    product.forEach(product => {
        let listProduct = document.createElement('div');
        listProduct.className = 'products-position';

        listProduct.innerHTML = `<div class="products-image">
                                    <img class="products-image__img" src="${product.image}" alt="">
                                </div>
                                <h3 class="products-position__name"  ><a href="product.html" class="product-link" data-id="${product.id}">${product.name}</a></h3>
                                <div class="products-price" >
                                    <h2 class="text-left">${product.price}</h2>
                                </div>
                                <hr>
                                <button class="btn btn-block btn-primary">
                                    <span class="add-cart-product" data-id="${product.id}" >Thêm vào giỏ hàng</span>
                                </button>`;

        productSection.appendChild(listProduct);

        // lấy ra id chi tiết
        const linkProduct = document.querySelectorAll('.product-link');
        for (let i = 0; i < linkProduct.length; i++) {
            linkProduct[i].addEventListener('click', function () {
                const id = linkProduct[i].dataset.id;
                localStorage.setItem('id', id);
            })
        }

        const addCartProduct = document.querySelectorAll('.add-cart-product');
        for (let i = 0; i < addCartProduct.length; i++) {
            addCartProduct[i].addEventListener('click', addItem);
        }
    })
}
// show chi tiết sản phẩm
function getProductDetail(){
    let proId = localStorage.getItem("id");
    let categoryId = localStorage.getItem("categoryId");
    axios.get(`https://5df044e202b2d90014e1bcaf.mockapi.io/categories/${categoryId}/products/${proId}`)
    .then(function (response) {
        // handle success
        const { data } = response;

        const detailProductName = $('.product-detail-name');
        detailProductName.append(`<h3 class="title mb-3" id="product-name">${data.name}</h3>`) ;

        const detailProductPrice = $('.product-detail-price');

        detailProductPrice.append(`<var class="price h3 text-warning">
                                    <span class="num" id="product-price">${data.price}</span> <span class="currency">$</span>
                                    </var>`);
        const detailProductId = $('.product-detail-id');
        detailProductId.append(`<p id="product-id-cart" >${data.id}</p>`);

        const detailProductDesc = $('#tab-description');
        detailProductDesc.append(`<p>${data.desc}</p>`);

        const detailProductImage = $('#tab-image');
        detailProductImage.append(`<img class="product-image" src="${data.image}">`);

        const detailProductCart = $('.product-detail-cart');
        detailProductCart.append(`  <button class="btn btn-lg btn-outline-primary">
                                        <span class="add-cart-product" data-id="${data.id}" >Thêm vào giỏ hàng</span>
                                    </button>`);

        const addCartProduct = document.querySelector('.add-cart-product');
        addCartProduct.addEventListener('click', addItem);
        

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
} 

getProductDetail();
// tính tổng tiền
function getTotalPrice(){

    productCart = JSON.parse(localStorage.getItem('cart'));
    console.log(productCart);
    const totalPrice = productCart.reduce(function(currentTotal, product){
      return currentTotal + product.qty * product.price;
    }, 0);
    
    $('.total-price').html(`Thành tiền: ${totalPrice}000 đ`)
  }


// add id vào giỏ hàng
function addItem(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    console.log('add to cart item', id);
    CART.add(id, 1);
    showCart();
}

function errorMessage(err) {
    //display the error message to the user
    console.error(err);
}












