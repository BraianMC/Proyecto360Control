document.getElementById('CrearTipo').addEventListener('click', function () 
{
    // Obtener el valor del input para el nombre del tipo
    var nameType = document.getElementById('name-type').value;

    // Obtener el valor seleccionado del select
    var workflowId = document.getElementById('workflowSelect').value;

    document.getElementById('error-name').textContent = '';
    document.getElementById('error-workflow').textContent = '';

    if (nameType.trim() === '') {
        document.getElementById('error-name').textContent = '*campo obligatorio.';
        return;
    }

    if (workflowId === '')
    {
        document.getElementById('error-workflow').textContent = '*Elija un workflow';
        return;
    }

    var xhrat = new XMLHttpRequest();
    xhrat.open('POST', '/Crear-tipo/', true);
    xhrat.setRequestHeader('Content-Type', 'application/json');

    // Obtener el token CSRF
    var csrf_tokenat = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    xhrat.setRequestHeader('X-CSRFToken', csrf_tokenat);

    
    
    // Datos a enviar en el cuerpo de la solicitud
    var dataat = {
        nombre_tipo: nameType,
        workflow_id: workflowId
    };

    // Convertir datos a formato JSON
    var jsonDataat = JSON.stringify(dataat);

    xhrat.onload = function () {
        if (xhrat.status >= 200 && xhrat.status < 300) {
            // Éxito en la solicitud
            var response = JSON.parse(xhrat.responseText);
            alert(response.mensaje);
            
            location.reload();
        } else {
            // Error en la solicitud
            console.error('Error en la solicitud:', xhrat.statusText);
        }
    };

    xhrat.send(jsonDataat);
});