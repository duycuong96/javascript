const API = "http://5dcf7e2d75f9360014c268b9.mockapi.io/product";

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
axios.get(`${API}/?page=1&limit=8&sortBy=createdAt&order=desc`)
    .then(function (response) {
        // handle success
        const { data } = response;
        const listProduct = document.querySelector('.products-row');
        listProduct.innerHTML = data.map(product => {
            return `<div class="products-position">
                        <div class="products-image">
                            <img class="products-image__img" src="${product.image}" alt="">
                        </div>
                        <h3 class="products-position__name"  ><a href="product.html" onclick="createItem(${product.id})">${product.name}</a></h3>
                        
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
// Lấy id 
 
function createItem(id) {
    localStorage.setItem("id", `${id}`);
  }
// get product detail

function getProductDetail(){
    let proid = localStorage.getItem("id");
    axios.get(`${API}/${proid}`)
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
function getListProduct(){
    axios.get(`${API}/?sortBy=createdAt&order=desc`)
    .then(function (response) {
        // handle success
        const { data } = response;
        const listProduct = document.querySelector('.product-list-row');
        listProduct.innerHTML = data.map(product => {
            return `<div class="products-position">
                        <div class="products-image">
                            <img class="products-image__img" src="${product.image}" alt="">
                        </div>
                        <h3 class="products-position__name"  ><a href="product.html" onclick="createItem(${product.id})">${product.name}</a></h3>
                        <hr>
                        <div class="products-price" >
                            <h2 class="text-left">${product.price}</h2>
                            <h2 class="text-right"><i class="fa fa-shopping-cart"></i></h2>
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
}
getListProduct();

// search 
// $(document).ready(function(){
//     $(".form-search").submit(function(){
        
//         getSearchProduct();
//     });
  
// })
$(document).ready(function() {
    $('#search-pro').click(function(){
        const keyword = $('#value-search').val();

        axios.get(`${API}?search=${keyword}`)
        
        .then(function (response) {
            // handle success
            const { data } = response;
            const listSearchProduct = document.querySelector('.product-search-row');
            listSearchProduct.innerHTML = data.map(product => {
                return `<div class="products-position col-sm-3">
                            <div class="products-image">
                                <img class="products-image__img" src="${product.image}" alt="">
                            </div>
                            <h3 class="products-position__name"  ><a href="product.html" onclick="createItem(${product.id})">${product.name}</a></h3>
                            <hr>
                            <div class="products-price" >
                                <h2 class="text-left">${product.price}</h2>
                                <h2 class="text-right"><i class="fa fa-shopping-cart"></i></h2>
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
    })
})

function getSearchProduct(){

}









  




