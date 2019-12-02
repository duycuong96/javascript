$('.buy-now').on('click', function(evt) {
    var settings = {
        method: "POST",
        url: "http://5dcf7e2d75f9360014c268b9.mockapi.io/product",
        contentType: "application/json",
        data: JSON.stringify($(evt.target).data()),
        success: function() {
            cleanCartItems();
            getProducts();
        }
    }
    $.ajax(settings);
});

function cleanCartItems() { 
    $('.shop-cart').children().remove();
}


function renderProduct(product) {
    var template = $("#template").html();
    template = template.replace(" {{alt}}", product.name);
    template = template.replace("{{img}}", product.image);
    template = template.replace("{{title}}", product.title);
    template = template.replace("{{author}}", product.author);
    var shopCart = $('.shop-cart');
    $(template).appendTo(shopCart);
}


function getProducts() {
    var settings = {
        url: "http://5dcf7e2d75f9360014c268b9.mockapi.io/product/1",
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
