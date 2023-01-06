const express = require('express');

const apiRoutes = require('./routes/api.js');

const app = express();

const server = app.listen(8080, () => {
    console.log('Server Up!');
});

server.on('error', error => console.log(`Error en el servidor: ${ error }`));

app.use(express.json());

app.use('/', express.static('public'));
app.use('/api', apiRoutes);