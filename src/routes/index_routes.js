const {Router} = require('express');
const router = Router();
const {rednderIndex,rednderContacto} = require('../controllers/index.controller');
const {RenderTienda} = require('../controllers/admin.controller');
router.get('/', rednderIndex);

router.get('/tienda', RenderTienda);

router.get('/contacto', rednderContacto);

module.exports = router;