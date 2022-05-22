'use strict'
var User = require('../models/Usuario');

var controller = {
    saveUser: (req, res) => { // Metodo para guardar la cuenta de un usuario al sistema
        let usuario = new User();
        var params = req.body;
        usuario.nombre = params.nombre;
        usuario.UserName = params.UserName;
        usuario.Password = params.Password;
        usuario.edad = params.edad;
        usuario.direccion = params.direccion;
        usuario.rol = params.rol
        usuario.save((err, userStored) => {
            if (err) {
                return res.status(500).send({ msg: 'Error en la petición' })
            }
            if (!userStored) {
                return res.status(404).send({ msg: 'No se ha podido guardar el usuario' })
            }
            return res.status(200).send({ msg: 'Usuario agregado exitosamente', user: userStored })
        })

    },
    getUser: function (req, res) { // Metodo para obtener una cuenta de un usuario en especifico
        var UserName = req.params.UserName;

        if (!UserName) {
            return req.status(404).send({ message: 'El usuario no existe' })
        }


        User.findOne({ UserName: UserName }).exec((err, user) => {
            if (err) {
                return res.status(500).send({ message: 'Error al devolver los datos.' });
            }


            if (!user) return req.status(404).send({ message: 'El usuario no existe' })

            return res.status(200).send({ user });

        })
    },
    getUsers: function (req, res) { 
        User.find({}).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' })

            if (!users) return res.status(404).send({ message: 'No hay usuarios para mostrar' })

            return res.status(200).send({ users });
        })

    },
    updateUser: function (req, res) { // Metodo para actualiza los parametros de las cuentas de los usuarios
        var userId = req.params.id;
        var update = req.body;

        User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });

            if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar' });

            return res.status(200).send({
                user: userUpdated
            })
        })
    },
    deleteUser: function (req, res) { // Metodo para borrar la cuenta de un usuario
        var userId = req.params.id;

        User.findByIdAndDelete(userId, (err, userRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido borrar el proyecto' })

            if (!userRemoved) return res.status(404).send({ message: 'No se puede eliminar ese usuario' })

            return res.status(200).send({
                user: userRemoved
            })
        })
    }
}
module.exports = controller