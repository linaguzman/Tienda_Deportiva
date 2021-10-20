const mongoose  = require("mongoose");

const usuarioSchema = mongoose.Schema({

    idusuario:{
        type:String,
        required:true
    },
    nombres:{
        type:String,
        required:true
    },
    
    correo:{
        type:String,
        required:true

    },
    rol:{
        type:String,
        required:true

    },
    Est_solicitud:{
        type:String,
        required:true

    }
});

module.exports = mongoose.model('usuario', usuarioSchema);