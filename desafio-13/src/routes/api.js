import express from 'express';
import Contenedor from '../container/Contenedor.js';
import randomRouter from './randoms.js';
import log4js from 'log4js';

const productRouter = express.Router();

const productContainer = new Contenedor('products');

const logger = log4js.getLogger();
const warnLogger = log4js.getLogger('warn');
const errorLogger = log4js.getLogger('error');

productRouter.get('/productos-test', async (req, res) => {
    logger.info('inicia metodo [productos-test]');
    res.send(await productContainer.getProducts());
});

productRouter.post('/producto', async (req, res) => {
    logger.info('inicia metodo [producto]');
    if( !Boolean(req.session.user) ) {
        warnLogger.warn('Usuario no registrado intenta crear un producto');
        res.send({ status: 'error', message: 'No estas logueado' });
        return;
    }
    const data = req.body;
    const product = await productContainer.save(data);
    res.send({ status: 'ok', message: 'Producto creado con exito', data: product });
})

productRouter.use('/randoms', randomRouter);

export default productRouter;