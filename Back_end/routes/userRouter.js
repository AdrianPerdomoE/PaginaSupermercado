'use strict'

var express = require('express');
var userController = require('../controller/usersController');

var router = express.Router();

router.post('/USave', userController.saveUser);