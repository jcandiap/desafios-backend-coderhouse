import express, { json, urlencoded } from 'express';
import { Server } from 'socket.io';
import { ContenedorMariaDB } from './model/ContenedorMariaDB.js';
import { ContenedorSqlite } from './model/ContenedorSqlite.js';
import { optionsMySql } from './options/mariaDB.js';
import { optionsSqlite } from './options/sqlite.js';

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

io.on('connection', (socket) => {
    const contenedorMariaDb = new ContenedorMariaDB(optionsMySql);
    const contenedorSqlite = new ContenedorSqlite(optionsSqlite);

    socket.on('registerUser', async (data) => {
        await contenedorSqlite.saveUser(data);
        socket.broadcast.emit('newUserConnected', {
            userName: data?.userName
        });
    });

    socket.on('newMessage', async (data) => {
        const user = await contenedorSqlite.findUser(data.id);
        await contenedorSqlite.saveMessage(data);
        data.userName = user.userName;
        io.emit('returnMessage', { data });
    });

    socket.on('addProduct', async (data) => {
        await contenedorMariaDb.save(data);
        const products = contenedorMariaDb.findAll();
        io.emit('getProducts', products);
    });
    
    contenedorMariaDb.findAll().then((value) => {
        io.emit('getProducts', value);
    });
});