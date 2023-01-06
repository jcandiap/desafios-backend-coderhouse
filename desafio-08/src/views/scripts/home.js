const socket = io();

let formLogin = document.getElementById('form-login');
let formAddProduct = document.getElementById('form-add-product');
let isChatActivated = false;
let activeUser = {};

socket.on('returnMessage', (data) => {
    if( isChatActivated ) {
        let chatBody = document.getElementById('chat-body');
        if( data.id === socket.id ) {
            let messageContainer = buildMessageContainer('justify-content-end');
            messageContainer.append(addMessageTo(data.author.alias, data.message));
            chatBody.append(messageContainer);
        } else {
            let messageContainer = buildMessageContainer('justify-content-start');
            messageContainer.append(addMessageFrom(data.author.alias, data.message));
            chatBody.append(messageContainer);
        }
    }
});

socket.on('getMessages', (data) => {
    console.log(data);
    data.forEach(message => {
        let chatBody = document.getElementById('chat-body');
        if( message.author.id === activeUser.id ) {
            let messageContainer = buildMessageContainer('justify-content-end');
            messageContainer.append(addMessageTo(message.author.alias, message.message));
            chatBody.append(messageContainer);
        } else {
            let messageContainer = buildMessageContainer('justify-content-start');
            messageContainer.append(addMessageFrom(message.author.alias, message.message));
            chatBody.append(messageContainer);
        }
    });
})

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
    tdId.innerText = product?.id;
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

const handleLogin = (evt, form) => {
    evt.preventDefault();
    let frm = new FormData(form);
    let requestObject = {};
    frm.forEach((value, key) => requestObject[key] = value);
    socket.emit('registerUser', requestObject);
    activeUser = requestObject;
    isChatActivated = true;
    buildChat();
}

const buildChat = () => {
    let chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = '';
    chatContainer.append(buildChatCard());
    let messageInput = document.getElementById('message-input');
    messageInput.addEventListener('keyup', (e) => formMessageEvent(e, messageInput));
}

const buildChatCard = () => {
    let chatCard = document.createElement('div');
    chatCard.className = 'card row border border-dark bg-success bg-gradient w-100 min-vh-50 mt-5';
    chatCard.style = 'height: 70%';
    chatCard.append(buildChatBody());
    chatCard.append(buildChatFooter());
    return chatCard;
}

const buildChatBody = () => {
    let chatBody = document.createElement('div');
    chatBody.id = 'chat-body';
    chatBody.className = 'overflow-auto card-body';
    return chatBody;
}

const buildChatFooter = () => {
    let chatFooter = document.createElement('div');
    chatFooter.className = 'container card-footer';
    let messageDiv = document.createElement('div');
    messageDiv.className = 'row';
    let inputForm = document.createElement('input');
    inputForm.type = 'text';
    inputForm.name = 'message';
    inputForm.id = 'message-input'
    inputForm.formMethod = 'post';
    inputForm.className = 'col-12 rounded';
    messageDiv.append(inputForm);
    chatFooter.append(messageDiv);
    return chatFooter;
}

const formMessageEvent = (evt, input) => {
    if (evt.key === "Enter") {
        socket.emit('newMessage', { 
            author: activeUser, 
            message: input.value 
        });
        input.value = ""
    }
}

const buildMessageContainer = (position = '') => {
    let messageContainer = document.createElement('div');
    messageContainer.className = `container d-flex ${ position } mt-1`;
    return messageContainer;
}

const addMessageFrom = (user = '', message = '') => {
    let messageFrom = document.createElement('div');
    messageFrom.className = 'bg-light border p-1 rounded-end rounded-top';
    messageFrom.style = 'max-width: 50%; min-width: 40%';
    messageFrom.innerText = `${ user } dice: ${ message }`;
    return messageFrom;
}

const addMessageTo = (user = '', message = '') => {
    let messageFrom = document.createElement('div');
    messageFrom.className = 'bg-light border p-1 rounded-end rounded-top';
    messageFrom.style = 'max-width: 50%; min-width: 40%';
    messageFrom.innerText = `${ user } dice: ${ message }`;
    return messageFrom;
}

const handleInsertProduct = (evt, form) => {
    evt.preventDefault();
    let frm = new FormData(form);
    let requestObject = {};
    frm.forEach((value, key) => requestObject[key] = value);
    socket.emit('addProduct', requestObject);
}

getData();

formLogin.addEventListener('submit', (e) => handleLogin(e, e.target));
formAddProduct.addEventListener('submit', (e) => handleInsertProduct(e, e.target));