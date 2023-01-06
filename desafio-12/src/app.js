import express, { json, urlencoded } from 'express';
import { Server } from 'socket.io';
import MongoContainer from './container/MessageContainer.js';
import productRouter from './routes/api.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { validateLogin, validateRegister } from './middleware/userMiddleware.js';
import FileStore from 'session-file-store';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import yargs from 'yargs/yargs';
import os from 'os';
import cluster from 'cluster';

dotenv.config();

const argv = yargs(process.argv.slice(1))
    .default('port', 8080)
    .default('modo', 'FORK')
    .alias('m', 'modo')
    .alias('c', 'cluster')
    .argv;

const app = express();

const PORT = Number(argv.port) || 8080;

const SERVER_TYPE = argv.modo || 'FORK';

let server = null;

if( SERVER_TYPE !== 'FORK' ) {
    if( cluster.isPrimary ) {
        for (let i = 0; i < os.cpus().length; i++) cluster.fork();
    } else {
        server = app.listen(PORT, () => console.log(`Servidor iniciado en mondo ${ SERVER_TYPE } en el puerto ${ PORT } y el proceso ${ process.pid }`));
    }
} else {
    server = app.listen(PORT, () => console.log(`Servidor iniciado en mondo ${ SERVER_TYPE } en el puerto ${ PORT } y el proceso ${ process.pid }`));
}

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

// app.use(session({
//     store: new Store({
//         path: './src/sessions',
//         ttl: 60
//     }),
//     secret: 'c0d3r-09',
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }
// }))

app.get('/show-cookie', (req, res) => {
    res.send(req.cookies);
});

app.get('/', (req, res) => {
    console.log('Entra puerto', PORT);
    res.render('home');
})

app.use('/api', productRouter);

app.get('/activeSession', (req, res) => {
    res.send(req.session);
})

app.post('/register', validateRegister, async (req, res) => {
    try {
        const data = req.body;
        const user = await userContainer.login(data);
        if( Boolean(user) ) {
            res.status(400).send({ status: 'error', message: 'Ya existe un usuario con ese email' });
            return;
        }
        delete data?.passwordConfirm;
        data.password = await bcrypt.hash(data.password, 10);
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
        if( Boolean(user) ) {
            const validatePassword = await bcrypt.compare(req.body.password, user.password);
            if( validatePassword ) {
                delete user?.password;
                req.session.user = user;
                res.send({ status: 'ok', response: user, message: `¡${ user.nombre } ${ user.apellido } se ha conectado!` });
            } else {
                res.status(401).send({ status: 'error', message: 'Contraseña incorrecta' });
            }
        } else {
            res.status(401).send({ status: 'error', message: 'Usuario no encontrado' });
        }
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

app.post('/test-bcrypt', async (req, res) => {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const salt = await bcrypt.genSalt(10);
    // const hash = bcrypt.hashSync('$2b$10$/ZEOYBDAZRYi2K3d6XeK6.S8HJsZ0kYl6C2V2UEFIHHjiQEcCv.ze', salt);
    const compare = await bcrypt.compare(password, '$2b$10$75afbpmo7gXMT3LIHzSaku6vci45lVIEktCdtkUhdR2Fna6HONkji');
    res.send(compare);
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

app.get('/info', (req, res) => {
    let info = {
        entryArguments: process.argv.slice(2),
        platformName: os.release(),
        nodeVersion: process.version,
        rss: process.memoryUsage().rss,
        execPath: process.execPath,
        pid: process.pid,
        currentWorking: process.cwd(),
        processCount: os.cpus().length,
    }
    res.render('info', info); 
})