const {body} = require('express-validator');
const {validateResult} = require('../helpers/admin.helpers.validar')
const validateCreate = [
    body("nombre", "Ingrese nombre").exists().not().isEmpty().withMessage('Debes completar nombre'),
    body("tipo", "Ingrese el tipo").exists().not().isEmpty().withMessage('Debes completar tipo'),
    body("precio", "Ingrese el precio").exists().not().withMessage('completar campo precio').isNumeric().withMessage('El campo precio debe ser numerico'),
    body("cantidad", "Ingrese la cantidad").exists().isNumeric().withMessage('Cantidad debe ser numerico').custom((value, {req}) => {
        if(value == 0)
        {
            throw new Error('Cantidad no puede ser 0')
        }
    }),
    (req, res, next) => {
        console.log('val: ',req.body)
        validateResult(req,res,next)
    }
]
module.exports = {validateCreate}