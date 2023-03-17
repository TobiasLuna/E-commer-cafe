const btnCompra = document.getElementById('btn-compra');
const MostrarCompra = document.getElementById('compra');
const cerrar = document.getElementById('cerrar');

//Abrir
btnCompra.onclick = function()
{
    MostrarCompra.style.visibility="visible";
}
//Cerrar
cerrar.onclick = function()
{
    MostrarCompra.style.visibility = "hidden";
}
