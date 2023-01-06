const express = require('express');
const Product = require('../model/Producto');
const Contenedor = require('../model/Contenedor');
const router = express.Router();

const contenedor = new Contenedor('productos.txt');

const validarProducto = (req, res, next) => {
    const producto = new Product(req.body);
    if(!producto.validarDatos()) {
        res.send({ error: 'Debe ingresar todos los datos para insertar un producto' });
    } else {
        next();
    }
}

router.get('/productos', (req, res) => {
    contenedor.getAll().then((value) => {
        value.length > 0 ? res.send(value) : res.send({ error: 'Productos no encontrados' });
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    })
});

router.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    contenedor.getById(id).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Producto no encontrado '});
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    });
});

router.post('/productos', validarProducto, (req, res) => {
    const producto = new Product(req.body);
    contenedor.save(producto).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Error al insertar producto' });
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    })
});

router.put('/productos/:id', validarProducto, (req, res) => {
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    id = Number(id);
    contenedor.updateById({ ...req.body, id }).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Error al editar producto' });
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    });
});

router.delete('/productos/:id', (req, res) => {
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    id = Number(id);
    const response = contenedor.deleteById(id);
    response ? res.send({ message: 'Elemento eliminado con exito!' }) : res.send({ error: 'Producto no encontrado' });
});

module.exports = router;