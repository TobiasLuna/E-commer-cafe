const noteController = {};
const usuario = require('../models/user');
const passport = require('passport');

//CREAR USUARIO
noteController.rednderRegistrar = (req, res) => {
    res.render('User/registrar', { style: 'registro.css' })
};

noteController.createUser = async (req, res) => {
    const errors = [];
    const { nombre, apellido, correo, contra, r_correo, r_contra } = req.body;
    if(r_correo != correo)
    {
        errors.push({text: 'No conside el correo'})
    }
    if(r_contra != contra)
    {
        errors.push({text: 'No conside la contraseña'})
    }
    if(contra.length < 8)
    {
        errors.push({text: 'La contraseña debe ser mayor a 8 caracteres'})
    }
    if(errors.length > 0)
    {
        res.render('User/registrar', {errors, 
                                    style:'registro.css', 
                                    nombre,
                                    apellido,
                                    correo,
                                    r_correo,
                                    contra,
                                    r_contra})
    }else{
       const correo_user = await usuario.findOne({correo: correo});
       if(correo_user)
       {
        req.flash('error_msg','el correo ya esta en uso');
        res.redirect('/usuario/registrar');
       }
       else{
        const nuevo_usuario = new usuario({ nombre, apellido, correo, contra });
        nuevo_usuario.contra = await nuevo_usuario.encryptPassword(contra);
        await nuevo_usuario.save();
        req.flash('success_msg', 'USUARIO REGISTRADO');
        res.redirect('/usuario/login')
        }
    }
};
//Login
noteController.RenderLogin = (req, res) => {
    res.render('User/login', { style: 'login.css' });
}
noteController.RenderIniciarLogin = passport.authenticate('login',{
    failureRedirect: '/usuario/login',
    successRedirect: '/tienda',
    failureFlash: true
});
//CERRAR SESION
noteController.CerrarSesion = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}
//CONFIGURACIONES
noteController.ObtenerUsuarios = async (req, res) => {
    const usuarios = await usuario.find({_id: req.user._id});
    res.render('User/configuraciones', { usuarios, style: 'usuarios.css' });
}

//EDITAR USUARIOS
noteController.EditarUsuarios = async (req, res) => {
    const user = await usuario.findById(req.params.id);
    res.render('User/Editar-usuario', { user, style:'editar.css' });
}
noteController.ActualizarUsuario = async (req, res) => {
    const { nombre, apellido, correo} = req.body;
    await usuario.findByIdAndUpdate(req.params.id, { nombre, apellido, correo})
    req.flash('success_msg','USUARIO EDITADO')
    res.redirect('/usuario/configuracion/'+ req.user._id)
}

//ELIMINAR USUARIOS
noteController.EliminarUsuario = async (req, res) => {
    await usuario.findByIdAndDelete(req.params.id);
    req.flash('success_msg','USUARIO ELIMINADO');
    res.redirect('/');
}

module.exports = noteController;