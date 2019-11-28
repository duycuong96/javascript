var input = document.querySelector('#selectFile');
input.addEventListener('change', function(evt){
    var file = document.querySelector('#selectFile').file[0];
    sendFile(file);
});

function sendFile(file){
    var url = 'http://ajax-json.cione.vn/api/v1/messages'; // khai báo địa chỉ
    var xhr = new XMLHttpRequest(); // khởi tạo thể hiện của đối tượng XMLHTMLRequest
    var output = document.getElementById('output'); // 
    // gắn sự kiện onreadystatechange bằng hàm handleResult
    xhr.onreadystatechange = handleResult; // khai báo hàm để xử lý trạng thái kết nối tới server khi thay đổi
    
    xhr.open('POST', url); // Mở kết nối tới server
    xhr.send(file); // Gửi yêu cầu đi
    
    function handleResult() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            output.innerHTML = xhr.responseText;
        }
    }
    
}

