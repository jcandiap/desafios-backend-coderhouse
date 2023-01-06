let productForm = document.getElementById('productForm');

const handleSubmit = (evt, form, route) => {
    evt.preventDefault();
    let frm = new FormData(form);
    let requestObject = {};
    frm.forEach((value, key) => requestObject[key] = value);
    fetch(route, {
        method: 'POST',
        body: JSON.stringify(requestObject),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
    .then(response => {
        if( !!response?.error ) {
            alert(`Error al ingresar: \n${ response?.error }`);
        } else {
            alert(`Producto ingresado con exito, ID nuevo de producto: ${ response?.id }`);
        }
    });
}

productForm.addEventListener('submit', (e) => handleSubmit(e, e.target, '/api/productos'));