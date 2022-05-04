"use strict"
// configuración de las rutas

var express = require("express");
//controladores para productos
var productController = require("../controller/controller");
//controladores para usuarios
var userController = require('../controller/usersController');

var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleWare = multipart({ uploadDir: "./img" });
//rutas para producto
router.post("/SaveProduct", productController.saveProduct);
router.get("/GetProduct/:id", productController.getProduct);
router.get("/GetProducts", productController.getProducts);
router.put("/UpdateProduct/:id", productController.updateProduct);
router.delete("/DeleteProduct/:id", productController.deleteProduct);
router.post("/UploadImagen/:id", multipartMiddleWare, productController.uploadImagen);
router.get("/GetImagen/:image", productController.getImageFile);
router.get("/GetAll/:searchBy", productController.getAll);
//Rutas para el usuario
router.post('/USave', userController.saveUser);
router.get('/user/:id', userController.getUser);
router.get('/users', userController.getUsers);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
module.exports = router;