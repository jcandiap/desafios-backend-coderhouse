const express = require('express');
const app = express();

const handlebars = require('express-handlebars');

const apiRoutes = require('./routes/api.js');

const server = app.listen(8080, () => {
    console.log('Server Up!');
});

server.on('error', error => console.log(`Error en el servidor: ${ error }`));

app.engine('handlebars', handlebars.engine());

app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/insert-product', (req, res) => {
    res.render('insert-product')
});

app.get('/view-products', (req, res) => {
    res.redirect('/productos');
});

app.use('/productos', apiRoutes);