import express, { json, urlencoded } from 'express';
import { Server } from 'socket.io';
import MongoContainer from './container/MessageContainer.js';
import productRouter from './routes/api.js';
import { normalizarMensajes } from './util/Normalizar.js';

const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server up on port ${ PORT }`));

const io = new Server(server);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static('./src/public'));
app.use('/assets', express.static('./src/public'));
app.use('/scripts', express.static('./src/public'));

app.set('views', './src/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('home');
})

app.use('/api', productRouter);

io.on('connection', (socket) => {
    const messageContainer = new MongoContainer('messages');
    const userContainer = new MongoContainer('user');

    socket.on('registerUser', async (data) => {
        await userContainer.save(data);
        socket.broadcast.emit('newUserConnected', {
            userName: data?.alias
        });
        const messages = await messageContainer.getAll();
        // socket.emit('getMessages', normalizarMensajes(messages));
        socket.emit('getMessages', messages);
    });

    socket.on('newMessage', async (data) => {
        messageContainer.save(data);
        io.emit('returnMessage', { data });
    });

    socket.on('addProduct', async (data) => {
        io.emit('getProducts', products);
    });
});