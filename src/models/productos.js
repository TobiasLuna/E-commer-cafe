//DATOS PRODUCTOS 
const {Schema,model} = require('mongoose');

const productos = new Schema({
    nombre:{
        type: String,
        required: true
    },
    tipo:{
        type:String,
        required:true
    },
    descripcion: {
        type:String,
    },
    precio: {
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    cantidad:
    {
        type:String,
        required:true
    }
}, {
    timestamps:true
});

module.exports =  model('productos', productos);