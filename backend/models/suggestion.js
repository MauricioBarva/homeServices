'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SuggestionSchema = Schema({
    name: String,
    surname: String,
    subject: String,
    message: String
});

module.exports = mongoose.model('Suggestion', SuggestionSchema);