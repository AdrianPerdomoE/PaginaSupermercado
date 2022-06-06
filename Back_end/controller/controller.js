"use strict"
var Product = require("../models/Product");
var fs = require("fs");
const { exists } = require("../models/Product");
var path = require("path");
var controller = {
    saveProduct: (req, res) => {//metodo de la API para guardar un producto en la coleción de la base de datos, relacionado con la historia de usuario HU1 y el requisito RF001
        let product = new Product();
        var params = req.body;
        product.nombre = params.nombre;
        product.tipo = params.tipo;
        product.precio = params.precio;
        product.caracteristicas = params.caracteristicas;
        product.cantidad = params.cantidad;
        product.codigo = params.codigo;
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
    getProduct: (req, res) => {//Metodo para buscar un producto por id en la base de datos, devuelve el producto encontrado, relacionado al requisito RF004
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
    getProducts: (req, res) => {//Metodo para buscar todos los productos que existen en la base de datos, devuelve una lista con todos los elementos, relacionado a la historia de usuario Hu4 y el requisito RF005
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
    updateProduct: (req, res) => {// Metodo para actualizar un producto de la colecion, se busca en la base de datos por el id, se actualizan los valores que se pasan por la peticion y se devuelve el nuevo producyo con los cambios realizados, relacionado con la historia de usuario Hu3 y el requisito RF003
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
    deleteProduct: (req, res) => {//Metodo para eliminar un producto de la base de datos, se busca por la id, se devuelve el producto eliminado , relacionado a la historia de usuario Hu2 y el requisito RF002
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
    uploadImagen: (req, res) => {//Metodo para guardar una imagen en el servidor relacionado con los metodos de crear y actualizar producto 
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
    getImageFile: (req, res) => {// Metodo para devolver la ruta de la imagen
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
    getAll: (req, res) => {//Metodo para buscar en la base de datos los productos deacuerdo al regular expresion, que depende de la palabra ingresada, metodo usado para el filtrado de productos, relacionado a la historia de usuario Hu7 y el requisito RF0017

        let productotipo = new RegExp(`${req.params.searchBy}`, "i")
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