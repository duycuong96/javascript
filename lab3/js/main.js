let tbody = document.querySelector('tbody');
axios.defaults.baseURL = 'http://5dcf7e2d75f9360014c268b9.mockapi.io';

axios.get('/product')
    .then(function (response) {
        // handle success
        users = response.data;
        showProducts(users);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
function get(user){
    let row = tbody.insertRow();
    
    let id = row.insertCell();
    id.textContent = user.id;

    let name = row.insertCell();
    name.textContent = user.name;

    let price = row.insertCell();
    price.textContent = user.price;


    let image = row.insertCell();
    let img = document.createElement('img');
    img.src = user.image;
    image.appendChild(img);

    let remove = row.insertCell();
    let a = document.createElement('a');
    a.textContent = 'Remove';
    remove.appendChild(a);
    a.removeId = user.id;
    a.addEventListener('click', deleteUser)
}
function showProducts(users) {
        users.map(user => {
           get(user);
        });
    }

function deleteUser(event) {
    event.preventDefault();
    document.body.style.cursor = 'wait';
    let rowIndex = this.parentElement.parentElement.rowIndex;
    axios.delete(`/product/${this.removeId}`)
        .then(function (response) {
            // handle success
            tbody.deleteRow(rowIndex - 1);
            document.body.style.cursor = 'default';
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

let addUserForm = document.querySelector('form');
addUserForm.addEventListener('submit', createUser)

function createUser(event) {
    event.preventDefault();
    let userData = new FormData(addUserForm);

    axios({
        url: '/product',
        method: 'POST',
        data: {
            'name': userData.get('name')
        }
    })
        .then(function (response) {
            //handle success
            document.querySelector('.close').click();
            user = response.data;
            let row = tbody.insertRow();
            let id = row.insertCell();
            id.textContent = user.id;

            let name = row.insertCell();
            name.textContent = user.name;

            let price = row.insertCell();
            price.textContent = user.price;

            let image = row.insertCell();
            let img = document.createElement('img');
            img.src = user.image;
            image.appendChild(img);

            let remove = row.insertCell();
            let a = document.createElement('a');
            a.textContent = 'Remove';
            remove.appendChild(a);
            a.removeId = user.id;
            a.addEventListener('click', deleteUser)

            window.scrollTo(0,document.body.scrollHeight);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
}
