

var tablesConfirmationResponsible = document.querySelectorAll('table');

var currentIdItem;

// Agregar el evento a cada tabla
tablesConfirmationResponsible.forEach(function(tabla) {
    tabla.addEventListener('click', function (event) {
        var target = event.target;

        if (target.classList.contains('btn-responsible')) {
            // Almacenar el Iditem temporalmente
            currentIdItem = target.getAttribute('data-id');
        }
    });
});


var confirmBtnResponsible = document.getElementById('asign-responsible');
confirmBtnResponsible.addEventListener('click', function () {
    // Verificar si se ha asignado un Iditem previamente
    if (currentIdItem) {
        // Llamar a la función con el Iditem almacenado
        AsignarResponsable(currentIdItem);
    } 
});


function AsignarResponsable(idItem) {

    // Obtener informacion de asignacion de responsable
    var option_select_user = document.getElementById('select-users').value;
    var option_select_state = document.getElementById('select-states').value;
    
    
    // Realizar la solicitud AJAX para realizar la asignacion
    var xhrar = new XMLHttpRequest();
    xhrar.open('POST', '/Asignar-responsable/'+ idItem +'/', true);
    xhrar.setRequestHeader('Content-Type', 'application/json');

    // Obtener el token CSRF
    var csrf_tokenar = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    xhrar.setRequestHeader('X-CSRFToken', csrf_tokenar);

    var datosar= {
        responsable: option_select_user,
        estado: option_select_state
    };
    

    var datosJSONar = JSON.stringify(datosar);
    
    xhrar.onload = function () {
        if (xhrar.status >= 200 && xhrar.status < 300) {
            // Éxito en la solicitud
            var response = JSON.parse(xhrar.responseText);
            alert(response.mensaje);
            location.reload();
        }else {
            // Error en la solicitud
            console.error('Error al confirmar datos de asignacion:', xhrar.statusText);
        }
    };

    xhrar.send(datosJSONar);
    
}