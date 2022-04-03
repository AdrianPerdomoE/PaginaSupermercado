"use strict"
// configuración de las rutas

var express = require("express");
var productController = require("../controller/controller");
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleWare = multipart({uploadDir:"./img"});

router.post("/SaveProduct", productController.saveProduct);
router.get("/GetProduct/:id",productController.getProduct);
router.get("/GetProducts",productController.getProducts);
router.put("/UpdateProduct/:id",productController.updateProduct);
router.delete("/DeleteProduct/:id",productController.deleteProduct);
router.post("/UploadImagen/:id",multipartMiddleWare,productController.uploadImagen);
router.get("/GetImagen/:image",productController.getImageFile);

module.exports = router;