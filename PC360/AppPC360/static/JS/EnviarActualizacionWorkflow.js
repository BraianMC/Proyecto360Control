// Definir una variable para almacenar el data-id
var IdSeleccionado = null;

// Agregar un manejador de eventos a todos los botones de lápiz
var botonesPencilwk = document.getElementsByClassName('btn-pencil');

for (var i = 0; i < botonesPencilwk.length; i++) 
{
    botonesPencilwk[i].addEventListener('click', function(event) {
        // Obtener el data-id del botón pencil clickeado
        IdSeleccionado = event.target.getAttribute('data-id');
    });
}


document.getElementById('ActualizarWorkflow').addEventListener('click', function() {
    
    var nombreWorkflow = document.getElementById('nombreWorkflow').value;
    
    // Realizar la solicitud AJAX para confirmar el proyecto
    var xhrup = new XMLHttpRequest();
    xhrup.open('POST', '/Modificar-workflow/'+ IdSeleccionado +'/', true);
    xhrup.setRequestHeader('Content-Type', 'application/json');

    // Obtener el token CSRF
    var csrf_tokenup = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    xhrup.setRequestHeader('X-CSRFToken', csrf_tokenup);

    // Obtener el listado de usuarios del modal principal
    var listStatesup = obtenerDatosUsuariosPrincipal();

    var datosup= {
        nombre_workflow: nombreWorkflow,
        estados: listStatesup
    };
    

    var datosJSONup = JSON.stringify(datosup);
    
    xhrup.onload = function () {
        if (xhrup.status >= 200 && xhrup.status < 300) {
            // Éxito en la solicitud
            var response = JSON.parse(xhrup.responseText);

            if (response.status === 'success') {
                alert(response.message);
                    // Realiza acciones adicionales si es necesario
            } else if (response.status === 'error') {
                alert('Error: ' + response.message);
                // Realiza acciones adicionales en caso de error
            }

            location.reload();
        } else {
            // Error en la solicitud
            console.error('Error al confirmar datos del workflow:', xhrup.statusText);
        }
    };

    xhrup.send(datosJSONup);
});

// Función para obtener el listado de usuarios del modal principal
function obtenerDatosUsuariosPrincipal() {
    var nombresEstados = [];
    var listStatesAsignated = document.getElementById('user-list-3').getElementsByTagName('li');

    for (var i = 0; i < listStatesAsignated.length; i++) {
        var state = listStatesAsignated[i].getElementsByTagName('span')[0].textContent;

        nombresEstados.push({
            nombre_estado: state,
        });
    }

    return nombresEstados;
}
