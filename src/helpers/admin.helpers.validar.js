const {validationResult} = require('express-validator');


const validateResult = (req, res, next) =>
{
    try {
        validationResult(req).throw()
        console.log(req.body);

        return next()
    } catch (err)
    {   
        console.log(err)
        const msg_errors = err.array();
       const errors = [];
       for (let i = 0; i < msg_errors.length; i++) {
        if(msg_errors[i].msg != 'Invalid value')
        {
            errors.push({text: msg_errors[i].msg})
        }
       }
        res.render('User/Admin/Productos',{errors,style:'Agregar_productos.css'})

    }
}
module.exports = {validateResult}