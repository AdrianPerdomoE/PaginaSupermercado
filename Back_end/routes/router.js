"use strict"
// configuración de las rutas

var express = require("express");
var projectController = require("../controller/controller");
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleWare = multipart({upLoadDir:"./uploads"})

router.post("/SaveProduct", projectController.saveProduct);
router.get("/GetProduct/:id",projectController.getProduct);
router.get("/GetProducts",projectController.getProducts);
router.put("/UpdateProduct/:id",projectController.upDateProduct);
router.delete("/DeleteProduct",projectController.deleteProduct);
router.post("/UploadImagen/:id",multipartMiddleWare,projectController.uploadImage);
router.get("/GetImagen/:Imagen",projectController.getImageFile);

module.exports = router;