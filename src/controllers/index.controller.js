const indexControler = {};

indexControler.rednderIndex = (req, res)=> {
    res.render('index', {
        style:'estilos.css'
    })};
    
indexControler.rednderTienda = (req, res)=> {
    res.render('tienda',{
        style:'tienda.css'
    })};

    
indexControler.rednderContacto = (req, res)=> {
    res.render('contacto',{style:'contacto.css'})}
    
indexControler.rednderCompra_cafe = (req, res)=> {
    res.render('compra_cafe',{style:'compras.css'})}
    
indexControler.rednderCompra_maquina = (req, res)=> {
    res.render('compra_maquinas',{style:'compras.css'})}
    
indexControler.rednderCompra_otros = (req, res)=> {
    res.render('compra_otros',{style:'compras.css'})}
    

module.exports = indexControler;