'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Usuario = Schema({
    nombre: String,
    UserName: String,
    Password: String,
    edad: Number,
    direccion: String,
    rol: String
});

module.exports = mongoose.model('Usuarios', Usuario);