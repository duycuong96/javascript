// get categories
axios.get('http://5dcf7e2d75f9360014c268b9.mockapi.io/categories')
    .then(function (response) {
        // handle success
        const { data } = response;
        const listProduct = document.querySelector('.categories-row');
        listProduct.innerHTML = data.map(category => {
            return `<div class="categories-position">
                        <div class="categories-content">
                            <div class="categories-name">
                                <h4>${category.name}</h4>
                                <p>${category.desc}</p>
                            </div>
                            <div class="categories-image">
                                <img src="${category.image}" >
                            </div>
                        </div>
                        
                    </div>
                    `;
        }).join('');
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

// get product
axios.get('http://5dcf7e2d75f9360014c268b9.mockapi.io/product/?p=1&l=8')
    .then(function (response) {
        // handle success
        const { data } = response;
        const listProduct = document.querySelector('.products-row');
        listProduct.innerHTML = data.map(product => {
            return `<div class="products-position">
            <div class="products-image">
                <img class="products-image__img" src="${product.image}" alt="">
            </div>
            <h3 class="products-position__name"  >${product.name}</h3>
            <a href="product.html" class="btn btn-primary" onclick="createItem(${product.id})">Chi tiết sản phẩm</a>
            <hr>
            <div class="products-price" >
                    <h2 class="text-left">${product.price}</h2>
                    <h2 class="text-right"></i><i class="fa fa-shopping-cart"></i></h2>
            </div>
        </div>`;
        }).join('');
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

// 

// get product detail

function getProductDetail(){
    let proid = localStorage.getItem("id");
    axios.get(`http://5dcf7e2d75f9360014c268b9.mockapi.io/product/${proid}`)
    .then(function (response) {
        // handle success
        const { data } = response;

        const detailProductName = $('.product-detail-name');
        detailProductName.append(`<h3 class="title mb-3" id="">${data.name}</h3>`) ;

        const detailProductPrice = $('.product-detail-price');

        detailProductPrice.append(`<var class="price h3 text-warning">
                                    <span class="num">${data.price}</span> <span class="currency">$</span>
                                    </var>`);
        const detailProductCart = $('.product-detail-cart');
        detailProductCart.append(` <button id="products-detail" class="btn btn-lg btn-outline-primary" onclick="createItemCart(${data.id})">Thêm vào giỏ
        hàng</button>`);

        const detailProductDesc = $('#tab-description');
        detailProductDesc.append(`<p>${data.desc}</p>`);

        const detailProductImage = $('#tab-image');
        detailProductImage.append(`<img src="${data.image}">`);
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

// get product cart
function getProductCart(){
    let proid = localStorage.getItem("id");
axios.get(`http://5dcf7e2d75f9360014c268b9.mockapi.io/product/${proid}`)
.then(function (response) {
    // handle success
    const { data } = response;

    const detailProductName = document.querySelector('.product-detail-name');
    detailProductName.innerHTML = `<h3 class="title mb-3" id="">${data.name}</h3>`;


})
.catch(function (error) {
    // handle error
    console.log(error);
})
.finally(function () {
    // always executed
});
}

  




