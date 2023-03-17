const {Router} = require('express');
const {isAuthenticated} = require('../helpers/validar');
const router = Router();

const {GuardarArticulo,CargarArticulo,EliminarArticulo } = require('../controllers/carrito.controller');

//router.get('/usuario/carrito/:id', RenderCarrito);
router.post('/User/Carrito_guardar/:id_prodcuto',isAuthenticated,GuardarArticulo);
router.get('/User/Carrito/:id',isAuthenticated,CargarArticulo);
router.delete('/User/EliminarCarrito/:id/:precio/:cantidad',isAuthenticated,EliminarArticulo);

module.exports = router;


