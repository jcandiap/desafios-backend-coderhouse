import express from 'express';
import Contenedor from '../container/Contenedor.js';
import randomRouter from './randoms.js';

const productRouter = express.Router();

const productContainer = new Contenedor('products');

productRouter.get('/productos-test', async (req, res) => {
    res.send(await productContainer.getProducts());
});

productRouter.post('/producto', async (req, res) => {
    if( !Boolean(req.session.user) ) {
        res.send({ status: 'error', message: 'No estas logueado' });
        return;
    }
    const data = req.body;
    const product = await productContainer.save(data);
    res.send({ status: 'ok', message: 'Producto creado con exito', data: product });
})

productRouter.use('/randoms', randomRouter);

export default productRouter;