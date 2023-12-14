

document.getElementById('confirmarProyecto').addEventListener('click', function() {
    // Obtener información del proyecto y del listado
    var nombreProyecto1 = document.getElementById('nombreProyecto').value;
    // Obtener el listado de usuarios del modal principal
    
    var datosUsuariosPrincipal = [];
    var listadoPrincipal = document.getElementById('user-list-1').getElementsByTagName('li');

    for (var i = 0; i < listadoPrincipal.length; i++) 
    {
        var usuario = listadoPrincipal[i].querySelector('span:first-child').textContent;
        var rol = listadoPrincipal[i].querySelector('span:last-child').textContent;
        
        datosUsuariosPrincipal.push({
            usuario: usuario,
            rol: rol
        });
    }
    
    

    document.getElementById('error-name-project').textContent = '';
    document.getElementById('error-users').textContent = '';

    if (nombreProyecto1.trim() === '') {
        document.getElementById('error-name-project').textContent = '*campo obligatorio.';
        return;
    }

    if (datosUsuariosPrincipal.length === 0)
    {
        document.getElementById('error-users').textContent = '*Agregue usuarios';
        return;
    }

    
    // Realizar la solicitud AJAX para confirmar el proyecto
    var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', '/Crear-proyecto/', true);
    xhr1.setRequestHeader('Content-Type', 'application/json');

    // Obtener el token CSRF
    var csrf_token1 = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    xhr1.setRequestHeader('X-CSRFToken', csrf_token1);


    var datos1 = {
        nombre_proyecto: nombreProyecto1,
        usuarios: datosUsuariosPrincipal
    };

    var datosJSON1 = JSON.stringify(datos1);
    
    xhr1.onload = function () {
        if (xhr1.status >= 200 && xhr1.status < 300) 
        {
            // Éxito en la solicitud
            var response = JSON.parse(xhr1.responseText);
            alert(response.mensaje);
            location.reload();
        } else {
            // Error en la solicitud
            console.error('Error al confirmar datos del proyecto:', xhr1.statusText);
        }
    };

    xhr1.send(datosJSON1);
});


