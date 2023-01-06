import { Product } from './model/products.js';
import express from 'express';

const main = () => {
    const app = express();
    
    const server = app.listen(8080, () => console.log('Server up!'));
    server.on('error', error => console.log(`Error en el servidor: ${ error }`));
    
    app.get('/productos', async (request, response) => {
        const product = new Product();
        product.getAll().then((resolve, reject) => {
            !!reject && console.error(reject);
            response.send(resolve);
        }).catch(error => console.log(error));
    });
    
    app.get('/productoRandom', (request, response) => {
        const product = new Product();
        product.getRandom().then((resolve, reject) => {
            !!reject && console.error(reject);
            response.send(resolve);
        }).catch(error => console.log(error));
    });
}

main();