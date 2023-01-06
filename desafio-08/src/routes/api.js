import express from 'express';
import Contenedor from '../container/Contenedor.js';

const productRouter = express.Router();

productRouter.get('/productos-test', async (req, res) => {
    const contenedor = new Contenedor();
    res.send(await contenedor.getProducts());
});

export default productRouter;