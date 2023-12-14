
var tablesModificar = document.querySelectorAll('table');
var IdItemModificar;


// Agregar el evento a cada tabla
tablesModificar.forEach(function(tabla) {
    tabla.addEventListener('click', function (event) {
        var target = event.target;

        if (target.classList.contains('btn-pencil-1')) {
            // Almacenar el Iditem temporalmente
            IdItemModificar = target.getAttribute('data-id');
        }
    });
});


var btnUpdate = document.getElementById('ActualizarItem');
btnUpdate.addEventListener('click', function () {
    
    if (IdItemModificar) {
        RealizarModificacionItem(IdItemModificar);
    } 
});


function RealizarModificacionItem(idItem) {
    
    // Obtener información del item
    var new_name_item = document.getElementById('name-item-update').value;
    var option_select_tipo = document.getElementById('select-tipo-update').value;
    var option_select_prioridad = document.getElementById('select-prioridad-update').value;
    var descripcion = document.getElementById('description-2').value;


    var xhrui = new XMLHttpRequest();
    xhrui.open('POST', '/Modificar-item/'+ idItem +'/', true);
    xhrui.setRequestHeader('Content-Type', 'application/json');

    // Obtener el token CSRF
    var csrf_tokenui = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    xhrui.setRequestHeader('X-CSRFToken', csrf_tokenui);

    var datosui= {
        name_item: new_name_item,
        tipo: option_select_tipo,
        prioridad: option_select_prioridad,
        descripcion: descripcion
    };
    
    var datosJSONui = JSON.stringify(datosui);
    
    xhrui.onload = function () {
        if (xhrui.status >= 200 && xhrui.status < 300) {
            // Éxito en la solicitud
            var response = JSON.parse(xhrui.responseText);
            alert(response.mensaje);
            location.reload();
        }else {
            // Error en la solicitud
            console.error('Error al confirmar datos del item:', xhrui.statusText);
        }
    };

    xhrui.send(datosJSONui);
    
}

