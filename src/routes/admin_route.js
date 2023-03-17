const {Router} = require('express');
const router = Router();
const {validateCreate} = require('../config/admin_validator')
const {
    RenderInicioSesionAdmin,
    RenderLogin,
    RenderLogout,
    RenderProductos,
    RenderTienda,
    RenderGuardarProductos,
    RenderEditar,
    ActualizarDatos,
    EliminarProducto,
    RenderComprar,
    ComprarProducto,
    CompraExitosa,
    CompraNotificada
} = require('../controllers/admin.controller');

//ADMIN
router.get('/admin', RenderLogin);

router.post('/admin/login', RenderInicioSesionAdmin);

//PRODUCTOS
router.get('/admin/productos',RenderProductos);

router.post('/admin/productos/guardar',RenderGuardarProductos);

//CONFIGURACIONES DEL PRODUCTO
router.get('/admin/tienda/:id',RenderTienda);
router.get('/admin/producto/editar/:id',RenderEditar);
router.put('/admin/producto/edit/:id',ActualizarDatos);
router.delete('/admin/productos/eliminar/:id',EliminarProducto);


//COMPRAR
router.get('/tienda/comprar/:id',RenderComprar);
router.get('/comprar/:id', ComprarProducto);
router.get('/success/:id', CompraExitosa);
router.post('/notificacion/:id', CompraNotificada);


module.exports = router;