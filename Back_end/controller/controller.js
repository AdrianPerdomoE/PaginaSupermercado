"use strict"
var Product = require("../models/Product");
var fs = require("fs");
const { exists, modelName } = require("../models/Product");
var path = require("path");
var controller = {
    saveProduct: (req, res) => {
        let product = new Product();
        var params = req.body;
        product.nombre = params.nombre;
        product.tipo = params.tipo;
        product.precio = params.precio;
        product.caracteristicas = params.caracteristicas;
        product.cantidad = params.cantidad;
        product.imagen = null;
        product.save((err, productStored) => {
            if (err) {
                return res.status(500).send({ msg: "Error en la petición" });
            }
            if (!productStored) {
                return res.status(404).send({ msg: "No se ha podido  guardar el producto" });
            }
            return res.status(200).send({ msg: "Producto agregado exitosamente", product: productStored });
        });
    },
    getProduct: (req, res) => {
        var product_id = req.params.id;
        Product.findById(product_id, (err, product) => {
            if (err) {
                return res.status(500).send({ msg: "Error al obtener el producto" });
            }
            if (!product) {
                return res.status(404).send({ msg: "El producto no existe" });
            }
            return res.status(200).send({ product });
        });
    },
    getProducts: (req, res) => {
        Product.find({}).exec((err, products) => {
            if (err) {
                return res.status(500).send({ msg: "Ha ocurrido un error cargando los productos" });
            }
            if (!products) {
                return res.status(404).send({ msg: "No existen productos" });
            }
            return res.status(200).send({ products });
        });
    },
    updateProduct: (req, res) => {
        var product_id = req.params.id;
        var upData = req.body;
        Product.findByIdAndUpdate(product_id, upData, { new: true }, (err, productUpDated) => {
            if (err) {
                return res.status(500).send({ msg: "Error al actualizar" });
            }
            if (!productUpDated) {
                return res.status(404).send({ msg: "Producto no encontrado" });
            }
            return res.status(200).send({ msg: "Producto actualizado correctamente", product: productUpDated });
        });
    },
    deleteProduct: (req, res) => {
        var product_id = req.params.id;
        Product.findByIdAndRemove(product_id, (err, productDeleted) => {
            if (err) {
                return res.status(500).send({ msg: "Ha ocurrido un error al eliminar el producto" });
            }
            if (!productDeleted) {
                return res.status(404).send({ msg: "Producto no encontrado" });
            }
            return res.status(200).send({ msg: "Producto eliminado correctamente", product: productDeleted });
        });
    },
    uploadImagen: (req, res) => {
        var product_id = req.params.id;
        var fileName = "Imagen no subida...";
        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split("\\");
            var fileName = fileSplit[1];
            var extSplit = fileName.split("\.");
            var fileExt = extSplit[1];
            if (fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "gif") {
                Product.findByIdAndUpdate(product_id, { imagen: fileName }, { new: true }, (err, productUpdated) => {
                    if (err) {
                        return res.status(500).send({ msg: "La imagen no se ha subido" });
                    }
                    if (!productUpdated) {
                        return res.status(404).send({ msg: "La imagen no existe" });
                    }
                    return res.status(200).send({ productUpdated });
                });
            }
            else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ msg: "Extension no es valida" });
                });
            }
        }
        else {
            return res.status(500).send({ msg: "No se han subido archivos" });
        }
    },
    getImageFile: (req, res) => {
        var file = req.params.image;
        var path_file = `./img/${file}`;
        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            }
            else {
                return res.status(200).send({ msg: "No existe la imagen..." });
            }
        });
    },
    getAll: (req, res) => {

        let productotipo = new RegExp(`${req.params.searchBy}`)
        Product.find({ tipo: productotipo }).exec((err, products) => {
            if (err) {
                return res.status(500).send({ msg: "Ha ocurrido un error cargando los productos" });
            }
            if (!products) {
                return res.status(404).send({ msg: "No existen productos" });
            }
            return res.status(200).send({ products });
        });
    }
};

module.exports = controller;