function EnviarCorreo()
{
    const btn = document.getElementById('btn-enviar');

    document.getElementById('form')
    .addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_d9kzm5a';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
        btn.value = 'Enviar';
        Swal.fire(
            'MENSAJE ENVIADO!',
            'Muchas gracias por su opinion!',
            'OK'
          )
        }, (err) => {
        btn.value = 'Enviar';
        alert(JSON.stringify(err));
        });
    });
}
