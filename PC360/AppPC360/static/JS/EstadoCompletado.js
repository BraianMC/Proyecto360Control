document.getElementById('table-2').addEventListener('click', function (event) {
    var target = event.target;

    // Verifica si el clic fue en un ícono específico
    if (target.classList.contains('btn-check')) 
    {
        var Iditem = target.getAttribute('data-id');
        var confirmBtn = document.getElementById('btn-confirmation');
        confirmBtn.addEventListener('click', function ()
        {
            RealizarConfirmacion(Iditem);
        });
    }
});



function RealizarConfirmacion(idItem) {
    
    var xhrci = new XMLHttpRequest();
    xhrci.open('POST', '/Estado-completado/'+ idItem +'/', true);
    xhrci.setRequestHeader('Content-Type', 'application/json');

    // Obtener el token CSRF
    var csrf_tokenci = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    xhrci.setRequestHeader('X-CSRFToken', csrf_tokenci);
    
    
    xhrci.onload = function () {
        if (xhrci.status >= 200 && xhrci.status < 300) {
            // Éxito en la solicitud
            var response = JSON.parse(xhrci.responseText);
            alert(response.mensaje);
            location.reload();
        }else {
            // Error en la solicitud
            console.error('Error al confirmar item completado:', xhrci.statusText);
        }
    };

    xhrci.send();
    
}