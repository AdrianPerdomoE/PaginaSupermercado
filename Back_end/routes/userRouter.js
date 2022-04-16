'use strict'

var express = require('express');
var userController = require('../controller/usersController');

var router = express.Router();

router.post('/USave', userController.saveUser);
router.get('/user/:id?', userController.getUser);
router.get('/users', userController.getUsers);
router.put('/user/:id?', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;