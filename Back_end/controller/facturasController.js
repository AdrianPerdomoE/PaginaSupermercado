'use strict'
var Factura = require('../models/Factura');

var controller = {
    saveFactura: (req, res) => {
        let factura = new Factura();
        var params = req.body;
        factura.comprador = params.comprador;
        factura.medioPago = params.medioPago;
        factura.direccion = params.direccion;
        factura.correo = params.correo;
        factura.detalles = params.detalles;
        factura.subTotal = params.subTotal;
        factura.total = params.total;
        factura.save((err, facturaStored) => {
            if (err) {
                return res.status(500).send({ msg: 'Error en la petición' })
            }
            if (!facturaStored) {
                return res.status(404).send({ msg: 'No se ha podido guardar la factura' })
            }
            return res.status(200).send({ msg: 'Factura agregado exitosamente', factura: facturaStored })
        })

    },
    getFactura: function (req, res) {
        var _id = req.params._id;
        Factura.findById(_id, (err, factura) => {
            if (err) {
                return res.status(500).send({ message: 'Error al devolver los datos.' });
            }


            if (!factura) return req.status(404).send({ message: 'La factura no existe' })

            return res.status(200).send({ factura: factura });

        })
    },
    getfacturas: function (req, res) {
        var comprador = req.params.comprador;
        if (comprador) {
            Factura.find({ comprador: comprador }).exec((err, facturas) => {
                if (err) return res.status(500).send({ message: 'Error al devolver los datos' })

                if (!facturas) return res.status(404).send({ message: 'No hay facturas para mostrar' })

                return res.status(200).send({ facturas });
            })

        }
        else {
            Factura.find({}).exec((err, facturas) => {
                if (err) return res.status(500).send({ message: 'Error al devolver los datos' })

                if (!facturas) return res.status(404).send({ message: 'No hay facturas para mostrar' })

                return res.status(200).send({ facturas });
            })
        }
    }
}
module.exports = controller