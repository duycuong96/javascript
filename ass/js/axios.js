axios.get('http://5dcf7e2d75f9360014c268b9.mockapi.io/product')
    .then(function (response) {
        // handle success
        const { data } = response;
        const listProduct = document.querySelector('.products-row');
        listProduct.innerHTML = data.map(product => {
            return `<div class="product-position">
                        <div class="product-image">
                            <img src="${product.image}" class="product-image__img" >
                        </div>
                            <h4>${product.name}</h4>
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


    // <div class="products-position">
    // <div class="products-image">
    //     <img class="products-image__img" src="{{image}}" alt="image">
    // </div>
    // <h4 class="products-position__name">{{name}}</h4>
    // <h2 class="products-position__price">{{price}} đ</h2>

    // <button type="button" class="btn btn-primary" id="addToCart">Mua ngay</button>
    // </div>