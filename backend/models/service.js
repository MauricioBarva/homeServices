'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaService = Schema({
    worker_info: [],
    user_address: String,
    description_service: String,
    skill_type: String,
    amount_money: Number
});

module.exports = mongoose.model('Service', SchemaService);