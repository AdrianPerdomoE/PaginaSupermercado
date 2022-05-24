"use strict"
//modelo de un producto para la base de datos
var mongoose = require("mongoose");
var esquema = mongoose.Schema;
//creado un esquema vamos a definir su modelo

var Product_esquema = esquema(
    {
        nombre: String,
        tipo: String,
        precio: Number,
        cantidad: Number,
        caracteristicas: String,
        imagen: String,
        codigo: Number

    }
);

module.exports = mongoose.model("Productos", Product_esquema);
//Guarda los modelos en la colección de la base datos con el nombre del primer parametro