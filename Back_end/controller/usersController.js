'use strict'
var User = require('../models/user');

var controller = {
    saveUser: (req,res)=>{
        let usuario = new Usuario();
        var params = req.body;
        usuario.nombre = params.nombre;
        usuario.UserName = params.UserName;
        usuario.Password = params.Password;
        usuario.edad = params.edad;
        usuario.direccion = params.direccion;
        usuario.save((err, userStored)=>{
            if(err){
                return res.status(500).send({msg:'Error en la petición'})
            }
            if(!userStored){
                return res.status(404).send({msg:'No se ha podido guardar el usuario'})
            }
            return res.status(200).send({msg:'Usuario agregado exitosamente', usuario: userStored})
        })

    }
    
}
module.export = controller