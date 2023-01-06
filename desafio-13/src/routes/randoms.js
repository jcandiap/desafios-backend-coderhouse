import express from 'express';
import log4js from 'log4js';

const randomRouter = express.Router();

const logger = log4js.getLogger();

randomRouter.get('/cant=:cant', (req, res) => {
    logger.info('inicia metodo [random]');
    const cantidad =  req.params.cant || 100000000;
    const min = 1;
    const max = 1000;

    const numbers = {};
    for (let i = 0; i < cantidad; i++) {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        if( numbers[random] === undefined ) {
            numbers[random] = 1;
        } else {
            numbers[random] += 1;
        }
    }
    res.send(numbers);
})

export default randomRouter;