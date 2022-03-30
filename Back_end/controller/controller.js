"use strict"
var Product = require("../models/Product");
var fs = require("fs");
const {exists} = require("../models/Product");
var path = require("path");
var controller = {
    home:(req,res)=>{
        return res.status(200).send({mensaje:"soy la home"});
    },
};

module.exports = controller;