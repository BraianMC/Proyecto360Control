// Definir una variable para almacenar el data-id
var Idtipomt = null;

// Agregar un manejador de eventos a todos los botones de lápiz
var botonesPencilmt = document.getElementsByClassName('btn-pencil');

for (var i = 0; i < botonesPencilmt.length; i++) 
{
    botonesPencilmt[i].addEventListener('click', function(event) {
        // Obtener el data-id del botón pencil clickeado
        Idtipomt = event.target.getAttribute('data-id');
    });
}


document.getElementById('ActualizarTipo').addEventListener('click', function() {
    
    
    var xhrmt = new XMLHttpRequest();
    xhrmt.open('POST', '/Modificar-tipo/'+ Idtipomt +'/', true);
    xhrmt.setRequestHeader('Content-Type', 'application/json');

    // Obtener el token CSRF
    var csrf_tokenmt = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    xhrmt.setRequestHeader('X-CSRFToken', csrf_tokenmt);

    var nombreTipom = document.getElementById('name-type-2').value;
    
    var opcionSeleccionada = document.getElementById('workflowSelect-2').value;

    var datosmt= {
        nombre_tipo: nombreTipom,
        workflow_id: opcionSeleccionada
    };
    
    var datosJSONmt = JSON.stringify(datosmt);
    
    xhrmt.onload = function () {
        if (xhrmt.status >= 200 && xhrmt.status < 300) {
            // Éxito en la solicitud
            var response = JSON.parse(xhrmt.responseText);
            alert(response.mensaje);
            location.reload();
        } else {
            // Error en la solicitud
            console.error('Error al confirmar datos del tipo:', xhrmt.statusText);
        }
    };

    xhrmt.send(datosJSONmt);
});

