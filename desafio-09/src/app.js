import express, { json, urlencoded } from 'express';
import { Server } from 'socket.io';
import MongoContainer from './container/MessageContainer.js';
import productRouter from './routes/api.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { validateLogin, validateRegister } from './middleware/userMiddleware.js';
import FileStore from 'session-file-store';

const app = express();

const PORT = process.env.PORT || 8081;
const server = app.listen(PORT, () => console.log(`Server up on port ${ PORT }`));

const io = new Server(server);

app.use(cookieParser());
app.use(json());

app.use(urlencoded({ extended: true }));

app.use(express.static('./src/public'));
app.use('/assets', express.static('./src/public'));
app.use('/scripts', express.static('./src/public'));

app.set('views', './src/views');
app.set('view engine', 'pug');

const messageContainer = new MongoContainer('messages');
const userContainer = new MongoContainer('user');

const Store = FileStore(session);

app.use(session({
    store: new Store({
        path: './src/sessions',
        ttl: 60
    }),
    secret: 'c0d3r-09',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.get('/show-cookie', (req, res) => {
    res.send(req.cookies);
});

app.get('/', (req, res) => {
    res.render('home');
})

app.use('/api', productRouter);

app.get('/activeSession', (req, res) => {
    res.send(req.session);
})

app.post('/register', validateRegister, async (req, res) => {
    try {
        const data = req.body;
        await userContainer.save(data);
        req.session.user = data;
        res.send({ status: 'ok', message: 'Usuario creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', message: 'Error al guardar el usuario' });
    }
});

app.post('/login', validateLogin, async (req, res) => {
    try {
        const user = await userContainer.login(req.body);
        req.session.user = user;
        res.send({ status: 'ok', response: user, message: `¡${ user.nombre } ${ user.apellido } se ha conectado!` });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Datos no coinciden' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) {
            res.send({ status: 'ok', message: 'Sesion cerrada con exito' });
            return;
        }
        res.status(500).send({ status: 'error', message: 'Error al cerrar la sesion' });
    })
});

app.post('/sendMessage', (req, res) => {
    try {
        const message = req.body;
        message.timestamp = new Date().getTime();
        messageContainer.save(message);
        io.emit('returnMessage', message);
        res.send({ status: 'ok', message: 'Mensaje enviado con exito' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al enviar el mensaje' });
    }
});


io.on('connection', (socket) => {
    socket.on('registerUser', async (data) => {
        socket.broadcast.emit('newUserConnected', {
            userName: data?.alias
        });
        const messages = await messageContainer.getAll();
        socket.emit('getMessages', messages);
    });

    socket.on('loginUser', async (data) => {
        socket.broadcast.emit('newUserConnected', {
            userName: data?.alias
        });
        const messages = await messageContainer.getAll();
        socket.emit('getMessages', messages);
    });

    socket.on('newMessage', async (data) => {
        messageContainer.save(data);
        io.emit('returnMessage', { data });
    });

    socket.on('addProduct', async (data) => {
        io.emit('newProductRegister', data);
    });
});