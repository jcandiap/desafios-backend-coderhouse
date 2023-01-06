import express from 'express';
import { fork } from 'child_process';

const randomRouter = express.Router();

randomRouter.get('/cant=:cant', (req, res) => {
    const cantidad = req.params.cant;
    const forked = fork(`./src/actions/random.js`, [cantidad]);
    forked.on('message', (numbers) => {
        res.send(numbers);
    });
})

export default randomRouter;