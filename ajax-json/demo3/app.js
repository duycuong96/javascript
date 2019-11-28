

function sendFormData(){
    var url = 'http://ajax-json.cione.vn/api/v1/forms/formdata';
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = handleResult;
    xhr.open('POST', url);

    var formData = createdFormData();
    xhr.send(formData);

    function handleResult(){
        if(xhr.readyState === this.DONE){
            document.querySelector('#output').innerHTML = xhr.responseText();
        }
    }
}

function createdFormData(){
    var form = new FormData();
    form.append("fullname", "Martin");
    form.append("address", "Atlanta");
    return form;
}

var button = document.querySelector('#submit');
button.addEventListener('click', function(){
    sendFormData();
});