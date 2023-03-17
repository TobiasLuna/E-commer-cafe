//DATOS DEL USUARIO 
const encriptar = require('bcryptjs');//Encriptador
const {Schema,model} = require('mongoose');

const usuario = new Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    correo:{
        type: String,
        required:true,
        unique: true
    },
    contra:{
        type:String,
        required:true
    }
}, {
    timestamps:true
});

usuario.methods.encryptPassword = async contra => {
    const salt = await encriptar.genSalt(10); //Carga encriptado
    return await encriptar.hash(contra, salt);
};

usuario.methods.mathPassword = function(contra){
    return  encriptar.compare(contra, this.contra)
}

module.exports =  model('Usuario', usuario);