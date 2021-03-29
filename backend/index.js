'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var app = require('./app');
var port = 4000;
mongoose.connect('mongodb://localhost:27017/login', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology:true
    })
    .then(() => {
        console.log('Base de datos corriendo...');
        app.listen(port, () => {
            console.log('Servidor corriendo en el puerto: ' + port);
        });
    }).catch(error => console.log(error));