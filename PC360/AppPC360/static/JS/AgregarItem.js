document.getElementById('CrearItem').addEventListener('click', function () 
{

    // Obtener el valor del input para el nombre del tipo
    var nameItem = document.getElementById('name-item').value;

    // Obtener el valor seleccionado del select tipo
    var tipo_id = document.getElementById('select-tipo').value;

    //Obtener la prioridad seleccionada
    var prioridad_seleccionada = document.getElementById('select-prioridad').value;

    var descripcion = document.getElementById('description').value;

    // Limpiar mensajes de error
    document.getElementById('error-name').textContent = '';
    document.getElementById('error-type').textContent = '';
    document.getElementById('error-priority').textContent = '';

    // Validar que los campos no estén vacíos
    if (nameItem.trim() === '') {
        document.getElementById('error-name').textContent = '*campo obligatorio.';
        return;
    }

    if (tipo_id.trim() === '') {
        document.getElementById('error-type').textContent = '*Seleccione un tipo.';
        return;
    }

    if (prioridad_seleccionada.trim() === '') {
        document.getElementById('error-priority').textContent = '*Seleccione una prioridad.';
        return;
    }


    var url = window.location.href;
    var urlParts = url.split('/');
    var lastPart = urlParts[urlParts.length - 1];
    var projectId = parseInt(lastPart);
    
    var xhrai = new XMLHttpRequest();
    xhrai.open('POST', '/Crear-item/', true);
    xhrai.setRequestHeader('Content-Type', 'application/json');

    // Obtener el token CSRF
    var csrf_tokenai = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    xhrai.setRequestHeader('X-CSRFToken', csrf_tokenai);




    // Datos a enviar en el cuerpo de la solicitud
    var dataai = {
        nombre_item: nameItem,
        prioridad: prioridad_seleccionada,
        tipo_id: tipo_id,
        proyecto_id: projectId,
        descripcion: descripcion
    };

    // Convertir datos a formato JSON
    var jsonDataai = JSON.stringify(dataai);

    xhrai.onload = function () {
        if (xhrai.status >= 200 && xhrai.status < 300) {
            var response = JSON.parse(xhrai.responseText);
            alert(response.mensaje);
            location.reload();
        } else {
            // Error en la solicitud
            console.error('Error en la solicitud:', xhrai.statusText);
        }
    };

    xhrai.send(jsonDataai);
});