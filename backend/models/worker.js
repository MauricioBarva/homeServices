'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkerSchema = Schema({
    user: String,
    name: String,
    surname: String,
    identification: String,
    birthdate: String,
    password: String,
    skills: String,
    experience: String,
    jobs: [],
    image: String,
    status: Boolean

});

module.exports = mongoose.model('Worker', WorkerSchema);