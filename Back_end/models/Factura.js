"use strict"
//modelo de un producto para la base de datos
var mongoose = require("mongoose");
var esquema = mongoose.Schema;
//creado un esquema vamos a definir su modelo

var factura_esquema = esquema(
    {
        comprador: String,
        medioPago: String,
        direccion: String,
        correo: String,
        detalles: Array,
        subTotal: Number,
        total: Number,
    }
);

module.exports = mongoose.model("facturas", factura_esquema);