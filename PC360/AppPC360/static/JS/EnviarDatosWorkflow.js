document.getElementById('confirmarWorkflow').addEventListener('click', function() {
    // Obtener información del workflow
    var nombreWorkflow = document.getElementById('nombre_workflow').value;
    // Obtener el listado de estados del modal principal
    var listadoEstados = obtenerEstadosWorkflow();

    document.getElementById('error-name').textContent = '';
    document.getElementById('error-states').textContent = '';

    if (nombreWorkflow.trim() === '') {
        document.getElementById('error-name').textContent = '*campo obligatorio.';
        return;
    }

    if (listadoEstados.length === 0)
    {
        document.getElementById('error-states').textContent = '*Agregue estados';
        return;
    }


    // Realizar la solicitud AJAX para confirmar el proyecto
    var xhrwe = new XMLHttpRequest();
    xhrwe.open('POST', '/Crear-workflow/', true);
    xhrwe.setRequestHeader('Content-Type', 'application/json');

    // Obtener el token CSRF
    var csrf_tokenw = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    xhrwe.setRequestHeader('X-CSRFToken', csrf_tokenw);

    
    var datoswe = {
        nombre_workflow: nombreWorkflow,
        estados: listadoEstados
    };

    var datosJSONwe = JSON.stringify(datoswe);
    
    xhrwe.onload = function () {
        if (xhrwe.status >= 200 && xhrwe.status < 300) {
            // Éxito en la solicitud
            var response = JSON.parse(xhrwe.responseText);
            alert(response.mensaje);
            location.reload();
        } else {
            // Error en la solicitud
            console.error('Error al confirmar datos del proyecto:', xhrwe.statusText);
        }
    };

    xhrwe.send(datosJSONwe);
});

// Función para obtener el listado de usuarios del modal principal
function obtenerEstadosWorkflow() {
    var datosWorkflow = [];
    var listadoDatos = document.getElementById('states').getElementsByTagName('li');

    for (var i = 0; i < listadoDatos.length; i++) {
        var estadoTexto = listadoDatos[i].textContent;

        datosWorkflow.push({
            nombre_estado: estadoTexto
        });
    }

    return datosWorkflow;
}
