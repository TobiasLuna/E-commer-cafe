const express = require ('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const  Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
var cookieParser = require('cookie-parser');

//Multer
const multer = require('multer');
//Inicializaciones
const app = express();
require('./config/passport');
//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views',path.join( __dirname, 'views'));
//HBS
app.engine('.hbs', exphbs.engine({
    defaultLayouts: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    //Helpers
    helpers:{
        adm_tipo: function(a,b){
            if (a == b)
            {
                return true
            }else{
                return false
            }
        },
        validar_carrito: function(a,b)
        {
            if(a == b)
            {
                return true
            }
            else{
                return false
            }
        },
        id_producto: function(id_producuto,id, options)
        {
            options.data.root[id_producuto] = id;
        }
    },
}));
//variable
app.set('view engine', '.hbs');
//Peticiones 

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
//rutas
app.use(require('./routes/index_routes'));
app.use(require('./routes/user_route'));
app.use(require('./routes/carrito_route'));
app.use(require('./routes/admin_route'));


//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;