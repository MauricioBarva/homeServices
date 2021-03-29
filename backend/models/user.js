'use strict';
//Creacion de esquema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    user: String,
    name: String,
    surname: String,
    identification: String,
    birthdate: String,
    city: String,
    address: String,
    cellphone: String,
    password: String,
    image: String,
    services: [],
    status: Boolean
});

module.exports = mongoose.model('User', userSchema);