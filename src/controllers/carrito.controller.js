const ArticulosController = {};
const carrito = require('../models/articulos');
const usuarios = require('../models/user');
const productos = require('../models/productos');
//Guardar articulos
ArticulosController.GuardarArticulo = async (req,res) => {
    const user = await usuarios.findById(req.session.passport.user);
    const producto = await productos.findById(req.params.id_prodcuto);
    const cookies = req.cookies;
    var contador = 0;
    var precio = 0;
    const id_producto = await carrito.findOne({id_producto: producto._id});

    //Verificar si carrito esta vacio
    if(!(id_producto)) 
    {
         //Carga de cantidad
        if(cookies.contador == undefined)
        {
            res.cookie('contador',parseInt(producto.cantidad));
        }
        else
        {
            contador = parseInt(cookies.contador) + parseInt(producto.cantidad);
            res.cookie('contador',contador);
        }
        //Carga de precio
        if(cookies.precio == undefined)
        {
            res.cookie('precio',parseInt(producto.precio));
        }
        else
        {
            precio = parseInt(cookies.precio) + parseInt(producto.precio);
            res.cookie('precio',precio);
        }
        const articulo = new carrito({id_usuario: user._id, id_producto: producto._id,nombre_producto: producto.nombre, descripcion_producto: producto.descripcion, image_producto: producto.image,precio_producto: producto.precio ,cantidad_producto:producto.cantidad});
        await articulo.save();
    }
    res.redirect(`/tienda`);
}
//Mostrar articulos

ArticulosController.CargarArticulo = async (req,res) => {   
    const  user = await usuarios.findById(req.session.passport.user);
    const articulo = await carrito.find({id_usuario: req.params.id});
    const precio = req.cookies.precio;
    const cantidad = req.cookies.contador;


    res.render('User/carrito.hbs',{precio,cantidad,articulo,user,style:'carrito.css'})
};

//Eliminar articulo
ArticulosController.EliminarArticulo = async(req,res) => {
  const precio_producto =req.params.precio;
  const cantidad_producto = req.params.cantidad;
  const cookies = req.cookies;
 
  var precio = cookies.precio - precio_producto;
  var cantidad = cookies.contador - cantidad_producto;
 
  res.cookie('contador',cantidad);
  res.cookie('precio',precio);

  await carrito.findByIdAndDelete(req.params.id);
  res.redirect(`/User/Carrito/${req.session.passport.user}`);
};

module.exports = ArticulosController;