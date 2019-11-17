let tbody = document.querySelector('tbody');
axios.defaults.baseURL = 'http://5dcf7e2d75f9360014c268b9.mockapi.io';

axios.get('/users')
    .then(function (response) {
        // handle success
        users = response.data;
        showUsers(users);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });


function deleteUser(event) {
    event.preventDefault();
    document.body.style.cursor = 'wait';
    let rowIndex = this.parentElement.parentElement.rowIndex;
    axios.delete(`/blogs/${this.removeId}`)
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
        url: '/blogs',
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

            let avatar = row.insertCell();
            let img = document.createElement('img');
            img.src = user.avatar;
            avatar.appendChild(img);

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

function showUsers(users) {
    users.forEach(user => {
        let row = tbody.insertRow();

        let id = row.insertCell();
        id.textContent = user.id;

        let name = row.insertCell();
        name.textContent = user.name;

        let avatar = row.insertCell();
        let img = document.createElement('img');
        img.src = user.avatar;
        avatar.appendChild(img);

        let remove = row.insertCell();
        let a = document.createElement('a');
        a.textContent = 'Remove';
        remove.appendChild(a);
        a.removeId = user.id;
        a.addEventListener('click', deleteUser)
    });
}

// ---------------------------Modal--------------------------------

let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("trigger");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ----------------------------------fetch API------------------------------------------------
/* let response = await fetch('https://5dcb60b034d54a0014314e8d.mockapi.io/blogs', {
    method: 'POST',
    body: userData
});

let result = await response.json();
document.querySelector('.close').click();
user = result;
let row = tbody.insertRow();
let id = row.insertCell();
id.textContent = user.id;

let name = row.insertCell();
name.textContent = user.name;

let avatar = row.insertCell();
let img = document.createElement('img');
img.src = user.avatar;
avatar.appendChild(img);

let remove = row.insertCell();
let a = document.createElement('a');
a.textContent = 'Remove';
remove.appendChild(a);
a.removeId = user.id;
a.addEventListener('click', deleteUser) */