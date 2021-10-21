'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UsuarioSchema = Schema({
    name: String,
    lastname: String,
    rol: String,
    status: Boolean
});
 
module.exports = mongoose.model('Usuario', UsuarioSchema);