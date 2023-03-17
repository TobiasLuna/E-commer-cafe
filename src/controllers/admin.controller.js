const passport = require('passport');
const administrador = require('../models/admin');
const productos = require('../models/productos');
const admin_controller = {};
// SDK de Mercado Pago
const {ACCESS_TOKEN} = process.env;
const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: ACCESS_TOKEN,
  });
//MULER
const path = require('path');
const multer = require('multer');
const { isNumber } = require('util');
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/img/producto'),
  filename:  (req, file, cb) => {
      cb(null, file.originalname);
  }
})
const upload = multer({
  storage,
  limits:{fileSize:2000000},
  fileFilter: function(_req, file, cb)
  {
    let type = file.mimetype.startsWith('image/')
    type?cb(null,true):cb(new Error ('No es un archivo de tipo imagen'))
  }
}).single('image');
//USUARIO
admin_controller.RenderLogin = (req, res) => {
    res.render('User/admin', { style: 'login.css' });
};

admin_controller.RenderInicioSesionAdmin = passport.authenticate('admin', {
  failureRedirect: '/admin',
  successRedirect: '/admin/productos',
  failureFlash: true
});

//PRODUCTOS
admin_controller.RenderProductos = async (req,res) => {
  const admin = await administrador.findById('63e3daad649455cc2f241bb0');
  res.render('User/Admin/Productos',{admin,style:'Agregar_productos.css'})
}

admin_controller.RenderGuardarProductos = async (req, res) => {
  //Muler
  const errors = []
  upload(req, res, async (err) => {
    if (err) {
      const {nombre,tipo, precio, descripcion, image,cantidad} = req.body; 
      console.log('err')
      errors.push({text: err});
      res.render('User/Admin/Productos',{errors, style:'Agregar_productos.css',
                                          nombre,
                                          tipo,
                                          precio,
                                          descripcion,
                                          image,
                                          cantidad })
      }else{
          const {nombre,tipo, precio, descripcion, image,cantidad} = req.body; 
          if(nombre == null)
          {
            errors.push({text:'Nombre: Ingrese un nombre'});
          }
          if(tipo == null)
          {
            errors.push({text:'Tipo: Ingrese un tipo'});
          }
          if(isNaN(precio))
          {
            errors.push({text:'Precio: Ingrese un valor numerico'})
          }
          if(isNaN(cantidad))
          {
            errors.push({text:'Cantidad: Ingrese un valor numerico'})
          }
          if(errors.length > 0)
          {
            res.render('User/Admin/Productos',{errors, style:'Agregar_productos.css',
            nombre,
            tipo,
            precio,
            descripcion,
            image,
            cantidad })
          }else{
            const image_name = req.file.originalname;
            const nuevo_producto = new productos({nombre, tipo,descripcion, precio, image: image_name, cantidad});
            await nuevo_producto.save();
            res.redirect('/admin/tienda')
          }
      }
    });
 
}
//Tienda
admin_controller.RenderTienda = async (req, res) =>
{
  const producto = await productos.find(); 
  const admin = await administrador.findById(req.params.id);
  res.render('tienda', {admin, producto, style: 'tienda.css' });
}
//COMPRAR PRODUCTO
admin_controller.RenderComprar = async (req,res) =>
{
  const producto = await productos.findById(req.params.id);
  res.render('comprar', { producto, style:'compras.css' });
}
//ELIMINAR PRODUCTO
admin_controller.EliminarProducto= async (req, res) => {
  await productos.findByIdAndDelete(req.params.id);
  res.redirect(`/admin/tienda/63e3daad649455cc2f241bb0`);
}
//EEDITAR PRODUCTO
admin_controller.RenderEditar = async (req,res) =>
{
  const producto = await productos.findById(req.params.id);
  console.log(producto)
  res.render('User/Admin/Editar_producto',{producto,style:'Agregar_productos.css'});
}
admin_controller.ActualizarDatos = async (req,res) =>
{
    const { nombre, tipo, precio, descripcion, image,cantidad} = req.body;
    await usuario.findByIdAndUpdate(req.params.id, { nombre, apellido, correo})
    req.flash('success_msg','USUARIO EDITADO')
    res.redirect('/usuario/configuracion/'+ req.user._id)
}

admin_controller.ComprarProducto = async (req, res) => {
  const producto = await productos.findById(req.params.id);
  
  const precio = parseInt(producto.precio, 10);
  const cantidad = parseInt(producto.cantidad, 10);

  // Crea un objeto de preferencia
let preference = {
  back_urls: {
    success: `https://3e6e-181-167-18-237.sa.ngrok.io/success/${producto._id}`
  },
  items: [
    {
      id: producto._id,
      title: producto.nombre,
      unit_price: precio,
      quantity: cantidad,
    },
  ],
 notification_url: `https://3e6e-181-167-18-237.sa.ngrok.io/notificacion/${producto._id}`
};

mercadopago.preferences
  .create(preference)
  .then(function (response) {
    res.send(`<a href="${response.body.init_point}">Pagar</a>`);
  })
  .catch(function (error) {
    console.log(error);
  });


}
admin_controller.CompraExitosa = (req,res) =>{
  res.redirect('/tienda');
}
admin_controller.CompraNotificada = async (req,res) => 
{
  const {query} = req;
  const topic = query.topic || query.type;
  res.send();
  //Validar topic
  switch (topic) {
    case "payment": 
      const paymentId = query.id || query['data.id'];
      console.log(topic, 'getting payment', paymentId);
      const payment = await mercadopago.payment.findById(paymentId);
      var { body } = await mercadopago.merchant_orders.findById(payment.body.order.id);
      break;
    case "merchant_order":
      const orderId = query.id;
      console.log(topic, "getting merchant order", orderId);
       var { body } = await mercadopago.merchant_orders.findById(orderId)
       break;
  }
  var paidAmount = 0;
  body.payments.forEach(payment => {
    if(payment.status === 'approved')
    {
      paidAmount += payment.transaction_amount;
    }
  });
   
  if(paidAmount >= body.total_amount)
  {
    console.log('el pago se concreto');
  }
  else{
    console.log('el pago no se concreto')
  }
  
}
module.exports = admin_controller;