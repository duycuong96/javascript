const API = "https://5dcf7e2d75f9360014c268b9.mockapi.io/product";
// const CATEGORY = "https://5df044e202b2d90014e1bcaf.mockapi.io/categories";
// get categories
axios.get('https://5df044e202b2d90014e1bcaf.mockapi.io/categories')
    .then(function (response) {
        // handle success
        // console.log(response);
        const { data } = response;
        // console.log(data);
        const listProduct = document.querySelector('.categories-row');
        listProduct.innerHTML = data.map(category => {
            return `<div class="categories-position">
                        <div class="categories-content">
                            <div class="categories-name">
                                <h4><a class="categories-link" data-id="${category.id}" href="list-product.html" >${category.name}</a></h4>
                            </div>
                            <div class="categories-image">
                                <img src="${category.image}">
                            </div>
                        </div>
                        
                    </div>
                    `;
        }).join('');

    const linkCategory = document.querySelectorAll('.categories-link');

    for( let i = 0; i < linkCategory.length; i++){
        linkCategory[i].addEventListener('click', function(){
            const id = linkCategory[i].dataset.id;
            // console.log(id);
            localStorage.setItem('categoryId', id);
        })
    }

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

// get 8 product latest 
// get 8 product latest 
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
                        <h3 class="products-position__name" ><a href="product.html" class="product-link" data-id="${product.id}">${product.name}</a></h3>
                        <hr>
                        <div class="products-price" >
                            <h2 class="text-left">${product.price}</h2>
                        </div>
                    </div>`;
        }).join('');

        const linkProduct = document.querySelectorAll('.product-link');
        
        for( let i = 0; i < linkProduct.length; i++){
            linkProduct[i].addEventListener('click', function(){
                const id = linkProduct[i].dataset.id;
                // console.log(id);
                localStorage.setItem('id', id);
            })
        }



    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

// search 
$(document).ready(function() {
    $('#search-pro').click(function(){
        const keyword = $('#value-search').val();

        axios.get(`${API}?search=${keyword}`)
        
        .then(function (response) {
            // handle success
            const { data } = response;
            const listSearchProduct = document.querySelector('.product-search-row');
            listSearchProduct.innerHTML = data.map(product => {
            return `<div class="products-position">
                        <div class="products-image">
                            <img class="products-image__img" src="${product.image}" alt="">
                        </div>
                        <h3 class="products-position__name"  ><a href="product.html" class="product-link" data-id="${product.id}">${product.name}</a></h3>
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
    });
})











  




