const { Router } = require('express');
const router = Router();
const { rednderRegistrar, 
        createUser, 
        ObtenerUsuarios, 
        EditarUsuarios, 
        ActualizarUsuario, 
        EliminarUsuario,
        RenderLogin,
        CerrarSesion,
        RenderIniciarLogin
    } = require('../controllers/user.controller');
const {isAuthenticated} = require('../helpers/validar')
router.get('/usuario/registrar', rednderRegistrar);

router.post('/usuario/add', createUser);

router.get('/usuario/login', RenderLogin);

router.post('/usuario/singup', RenderIniciarLogin);

router.get('/usuario/logout', CerrarSesion);

//Configuraciones

router.get('/usuario/configuracion/:id',isAuthenticated, ObtenerUsuarios);

router.get('/usuarios/configuracion/editar/:id',isAuthenticated, EditarUsuarios);

router.put('/usuarios/configuracion/edit/:id',isAuthenticated, ActualizarUsuario);

router.delete('/usuarios/configuracion/eliminar/:id',isAuthenticated, EliminarUsuario);
module.exports = router;