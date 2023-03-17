//DATOS DEL USUARIO 
const encriptar = require('bcryptjs');//Encriptador
const {Schema,model} = require('mongoose');

const admin = new Schema({
    nombre:{
        type: String,
        required: true
    },
    contra:{
        type:String,
        required:true
    }
}, {
    timestamps:true
});

module.exports =  model('admin', admin);