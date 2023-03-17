//DATOS PRODUCTOS 
const {Schema,model,MyModel} = require('mongoose');

const articulos = new Schema({
    id_usuario:{
        type: String,
        required: true
    },
    id_producto:{
        type:String,
        required:true
    },
    nombre_producto:
    {
        type:String,
        required:true
    },
    descripcion_producto:
    {
        type:String,
    },
    image_producto:
    {
        type:String,
    },
    precio_producto:
    {
        type:String,
    },
    cantidad_producto:
    {
        type:String
    },
}, {
    timestamps:true
});
module.exports =  model('articulos', articulos);