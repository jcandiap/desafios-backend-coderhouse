const express = require('express');
const app = express();
const axios = require('axios').default;
const apiRoutes = require('./routes/api.js');

const server = app.listen(8080, () => console.log('Server up!'));

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/insert-product', (req, res) => {
    res.render('insert-product')
});

app.get('/view-products', (req, res) => {
    res.redirect('/productos');
});

app.use('/productos', apiRoutes);