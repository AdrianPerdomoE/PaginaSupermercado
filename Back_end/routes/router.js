"use strict"
// configuración de las rutas

var express = require("express");
var projectController = require("../controller/controller");
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleWare = multipart({upLoadDir:"./uploads"})
router.get("/home", projectController.home)

module.exports = router;