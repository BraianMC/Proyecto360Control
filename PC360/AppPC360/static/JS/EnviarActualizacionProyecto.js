// Definir una variable para almacenar el data-id
var dataIdSeleccionado = null;

// Agregar un manejador de eventos a todos los botones de lápiz
var botonesPencil = document.getElementsByClassName('btn-pencil');

for (var i = 0; i < botonesPencil.length; i++) 
{
    botonesPencil[i].addEventListener('click', function(event) {
        // Obtener el data-id del botón pencil clickeado
        dataIdSeleccionado = event.target.getAttribute('data-id');
    });
}


document.getElementById('ActualizarProyecto').addEventListener('click', function() {
    // Obtener información del proyecto y del listado
    var nombreProyectom = document.getElementById('nombreProyecto-2').value;
    
    // Realizar la solicitud AJAX para confirmar el proyecto
    var xhr2 = new XMLHttpRequest();
    xhr2.open('POST', '/Modificar-proyecto/'+ dataIdSeleccionado +'/', true);
    xhr2.setRequestHeader('Content-Type', 'application/json');

    // Obtener el token CSRF
    var csrf_tokenm = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    xhr2.setRequestHeader('X-CSRFToken', csrf_tokenm);

    // Obtener el listado de usuarios del modal principal
    var listadoUsuariosPrincipalm = obtenerDatosUsuariosPrincipal();

    var datosm = {
        nombre_proyecto: nombreProyectom,
        usuarios: listadoUsuariosPrincipalm
    };
    
    var datosJSONm = JSON.stringify(datosm);
    
    xhr2.onload = function () {
        if (xhr2.status >= 200 && xhr2.status < 300) {
            // Éxito en la solicitud
            var response = JSON.parse(xhr2.responseText);
            alert(response.mensaje);
            location.reload();
        } else {
            // Error en la solicitud
            console.error('Error al confirmar datos del proyecto:', xhr2.statusText);
        }
    };

    xhr2.send(datosJSONm);
});

// Función para obtener el listado de usuarios del modal principal
function obtenerDatosUsuariosPrincipal() {
    var datosUsuariosPrincipalm = [];
    var listadoPrincipalm = document.getElementById('user-list-2').getElementsByTagName('li');

    for (var i = 0; i < listadoPrincipalm.length; i++) {
        var usuario = listadoPrincipalm[i].getElementsByTagName('span')[0].textContent;
        var rol = listadoPrincipalm[i].getElementsByTagName('span')[1].textContent;

        datosUsuariosPrincipalm.push({
            usuario: usuario,
            rol: rol
        });
    }

    return datosUsuariosPrincipalm;
}
