// $(document).ready(function(){
//     $(".note span").hide();
//     $(".note").append("<button>Click me</button>");
    
//     //cho button 1
//     $(".note:first > button").click({param: $(".note:first > button")}, function(event){
//     // hiển thị thẻ span
//     $(".note:first > span").show();
//     // loại bỏ nút 1
//     event.data.param.remove();
//    });
   
//    //cho button 2
//    $(".note:last > button").click({param: $(".note:last > button")}, function(event){
//     // hiển thị thẻ span
//     $(".note:last > span").show();
//     // loại bỏ nút 2
//     event.data.param.remove();
//    });
// });


// tối ưu bằng kỹ thuật traversing
$(document).ready(function(){
    $(".note").children("span").hide();
    $(".note").append("<button>Click me!</button>");

    // $(".note:first").children("button").click(function(){
    //     $(".note").first().children("span").show();
    //     $(".note").first().children("button").remove();
    // });

    // $(".note:last").children("button").click(function(){
    //     $(".note").last().children("span").show();
    //     $(".note").last().children("button").remove();
    // });

    $(".note").children("button").click(function(){
        // hiển thị lá phiếu tương ứng nút được nhấn
        $(this).prev().show();
        // loại bỏ nút nhấn
        $(this).remove();
    });
})