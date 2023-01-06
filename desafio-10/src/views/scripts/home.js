const socket = io();

let formRegister = document.getElementById('form-register');
let formLogin = document.getElementById('form-login');

let formAddProduct = document.getElementById('form-add-product');
let isChatActivated = false;
let activeUser = {};

let activateRegister = document.getElementById('activate-register');
let activateLogin = document.getElementById('activate-login');

let divLogin = document.getElementById('div-login');
let divRegister = document.getElementById('div-register');
let divHeader = document.getElementById('div-header');
let divInsertProduct = document.getElementById('insert-product-container');
let userContainer = document.getElementById('user-container');

const handleLogout = async () => {
    console.log('entro');
    let response = await fetch('/logout');
    let { status, message } = await response.json();
    console.log(status, message);
    if( status === 'ok' ) {
        Swal.fire({
            text: message,
            toast: true,
            icon: 'success',
            position: 'bottom-end',
            timer: 2000,
            showConfirmButton: false,
        });
        disableAddProduct();
    }
}

const buildHeader = () => {
    divHeader.innerHTML = '';
    let alert = document.createElement('div');
    alert.className = 'alert alert-primary d-flex justify-content-between';
    alert.role = 'alert';
    alert.innerText = `Bienvenido, ${ activeUser.nombre } ${ activeUser.apellido }! ( ${ activeUser.id } )`;
    let btnLogout = document.createElement('button');
    btnLogout.type = 'button';
    btnLogout.className = 'btn btn-outline-danger';
    btnLogout.innerText = 'Cerrar sesión';
    btnLogout.onclick = () => handleLogout();
    alert.append(btnLogout);
    divHeader.appendChild(alert);
    divHeader.className = 'd-block';
}

const enableAddProduct = () => {
    userContainer.className = 'd-none'
    habilitarInsertarProducto();
    buildHeader();
    isChatActivated = true;
}

const disableAddProduct = () => {
    divHeader.className = 'd-none';
    userContainer.className = ''
    deshabilitarInsertarProducto();
}

const findActiveSession = async () => {
    const response = await fetch('/activeSession');
    const data = await response.json();
    if(Boolean(data.user)) {
        activeUser = data.user;
        enableAddProduct();
    } else {
        disableAddProduct();
    }
}

findActiveSession();


socket.on('newUserConnected', ({ userName }) => {
    if( isChatActivated ) {
        Swal.fire({
            text: `Se ha conectado ${ userName }`,
            toast: true,
            icon: 'info',
            position: 'bottom-end',
            timer: 2000,
            showConfirmButton: false,
        });
    }
});

const getData = async () => {
    let response = await fetch('/api/productos-test');
    let data = await response.json();
    data.forEach(product => addProductTable(product));
}

socket.on('newProductRegister', (product) => {
    addProductTable(product);
});

socket.on('getProducts', (products) => {
    let tableBody = document.getElementById('body-table-products');
    tableBody.innerHTML = '';
    products.forEach(product => {
        addProductTable(product);
    })
})

const addProductTable = (product) => {
    let tableBody = document.getElementById('body-table-products');
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    tdId.className = 'text-end';
    tdId.innerText = product?._id;
    let tdDescription = document.createElement('td');
    tdDescription.className = 'text-start ps-4';
    tdDescription.innerHTML = product?.title;
    let tdPrice = document.createElement('td');
    tdPrice.className = 'text-end ps-4';
    tdPrice.innerText = product?.price;
    let tdThumbnail = document.createElement('td');
    tdThumbnail.className = 'text-center';
    let img = document.createElement('img');
    img.src = product?.thumbnail;
    img.className = 'img-fluid';
    img.style = 'max-width: 100px';
    tdThumbnail.append(img);
    tr.append(tdId);
    tr.append(tdDescription);
    tr.append(tdPrice);
    tr.append(tdThumbnail);
    tableBody.append(tr);
}

const handleRegister = async (evt, form) => {
    evt.preventDefault();
    let frm = new FormData(form);
    let requestObject = {};
    frm.forEach((value, key) => requestObject[key] = value);
    if( !validatePassword(requestObject) ) {
        Swal.fire({
            text: 'Las contraseñas no coinciden',
            toast: true,
            icon: 'error',
            position: 'bottom-end',
            timer: 2000,
            showConfirmButton: false,
        });
        return;
    }
    let response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
    });
    let { status, message } = await response.json();
    if( status === 'ok' ) {
        Swal.fire({
            text: message,
            toast: true,
            icon: 'success',
            position: 'bottom-end',
            timer: 2000,
            showConfirmButton: false,
        });
        activeUser = requestObject;
        enableAddProduct();
    } else {
        Swal.fire({
            text: message,
            toast: true,
            icon: 'error',
            position: 'bottom-end',
            timer: 2000,
            showConfirmButton: false,
        });
    }
}

const validatePassword = ({ password, passwordConfirm }) => {
    return password === passwordConfirm;
}

const handleLogin = async (evt, form) => {
    console.log('entro');
    evt.preventDefault();
    let frm = new FormData(form);
    let requestObject = {};
    frm.forEach((value, key) => requestObject[key] = value);
    let responseService = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
    });
    let { status, message, response } = await responseService.json();
    if( status === 'ok' ) {
        Swal.fire({
            text: message,
            toast: true,
            icon: 'success',
            position: 'bottom-end',
            timer: 2000,
            showConfirmButton: false,
        });
        activeUser = response;
        enableAddProduct();
    } else {
        Swal.fire({
            text: message,
            toast: true,
            icon: 'error',
            position: 'bottom-end',
            timer: 2000,
            showConfirmButton: false,
        });
    }
}

const handleAddProduct = async (evt, form) => {
    evt.preventDefault();
    let frm = new FormData(form);
    let requestObject = {};
    frm.forEach((value, key) => requestObject[key] = value);
    let response = await fetch('/api/producto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
    });
    let { status, message, data } = await response.json();
    if( status === 'ok' ) {
        Swal.fire({
            text: message,
            toast: true,
            icon: 'success',
            position: 'bottom-end',
            timer: 2000,
            showConfirmButton: false,
        });
        socket.emit('addProduct', data);
    } else {
        Swal.fire({
            text: message,
            toast: true,
            icon: 'error',
            position: 'bottom-end',
            timer: 2000,
            showConfirmButton: false,
        });
        disableAddProduct();
        activarLogin();
    }
}

habilitarInsertarProducto = () => {
    divInsertProduct.className = 'col-lg-12 col-sm-12 position-relative';
}

deshabilitarInsertarProducto = () => {
    divInsertProduct.className = 'd-none';
}

getData();

formRegister.addEventListener('submit', (e) => handleRegister(e, e.target));
formLogin.addEventListener('submit', (e) => handleLogin(e, e.target));
formAddProduct.addEventListener('submit', (e) => handleAddProduct(e, e.target));

function activarLogin() {
    divLogin.className = 'bg-secondary text-white p-5 rounded d-block';
    divRegister.className = 'd-none bg-secondary text-white p-5 rounded';
}

function activarRegistro() {
    divRegister.className = 'd-block bg-secondary text-white p-5 rounded';
    divLogin.className = 'd-none bg-secondary text-white p-5 rounded';
}