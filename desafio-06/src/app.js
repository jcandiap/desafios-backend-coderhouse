const express = require('express');
const app = express();
const { Server } = require('socket.io');
const Contenedor = require('./model/Contenedor');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server up on port ${ PORT }`));

const io = new Server(server);
const contenedor = new Contenedor('productos.txt');

let listaUsuarios = [];
let history = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./src/public'));
app.use('/assets', express.static('./src/public'));
app.use('/scripts', express.static('./src/public'));

app.set('views', './src/views');
app.set('view engine', 'pug');

app.post('/connect', (req, res) => {
    if( !!req.body ) {
        listaUsuarios.push(req.body);
    }
})

app.get('/', (req, res) => {
    res.render('home');
})

io.on('connection', (socket) => {
    socket.on('registerUser', (data) => {
        listaUsuarios.push(data);
        socket.broadcast.emit('newUserConnected', {
            userName: data?.userName
        });
    });
    socket.on('newMessage', (data) => {
        const user = listaUsuarios.find(usuario => usuario.id === data.id);
        data.userName = user.userName;
        data.time = new Date().toLocaleString();
        history.push(data);
        io.emit('returnMessage', { data });
    });
    socket.on('addProduct', (data) => {
        contenedor.save(data).then((value) => {
            contenedor.getAll().then((value) => {
                io.emit('getProducts', value);
            });
        });
    });
    contenedor.getAll().then((value) => {
        io.emit('getProducts', value);
    });
});