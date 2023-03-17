const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;
const usuario = require('../models/user');
const admin = require('../models/admin');
passport.use('login',new LocalStategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email,password, done) => {
    //Confirmar si existe correo
    const usuario_correo = await usuario.findOne({correo: email});
    if(!usuario_correo)
    {
        return done(null, false, {message: 'No a encontrado un usuario'});
    }else{
        //Validar contraseña
      const match = await  usuario_correo.mathPassword(password);
      if(match)
      {
        return done(null, usuario_correo);
      }else{
        return done(null, false, {message:'Contraseña incorrecta'});
      }
    }
}));
passport.use('admin',new LocalStategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    const admin_user = await admin.findOne({nombre: username});
    if(!admin_user)
    {
        return done(null, false, {message: 'No a encontrado un usuario'});
    }else{
        //Validar contraseña
      const match =admin_user.contra;
      if(match == password)
      {
        return done(null, admin_user);
      }else{
        return done(null, false, {message:'Contraseña incorrecta'});
      }
    }
}));
passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});
passport.deserializeUser((id, done) => {
    usuario.findById(id, (err, user) => {
        done(err, user);
    })
})