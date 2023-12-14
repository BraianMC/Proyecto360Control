// Definir una variable para almacenar el data-id
var IdUser = null;

// Agregar un manejador de eventos a todos los botones de lápiz
var botonesPencilmu = document.getElementsByClassName('btn-pencil');

for (var i = 0; i < botonesPencilmu.length; i++) 
{
    botonesPencilmu[i].addEventListener('click', function(event) {
        // Obtener el data-id del botón pencil clickeado
        IdUser = event.target.getAttribute('data-id');
    });
}


document.getElementById('ActualizarUsuario').addEventListener('click', function() {
    
    var new_username = document.getElementById('user-name-update').value;
    var new_password = document.getElementById('password-update').value;
    var new_confirmPassword = document.getElementById('confirm-password-update').value;
    
    document.getElementById('error-username-1').textContent = '';
    document.getElementById('error-password-1').textContent = '';
    document.getElementById('error-confirm-1').textContent = '';


    if (new_username.trim() === '') {
        document.getElementById('error-username-1').textContent = '*Campo obligatorio.';
        return;
    }

    if (new_password === '')
    {
        document.getElementById('error-password-1').textContent = '*Ingrese una contraseña';
        return;
    }

    if (new_confirmPassword === '')
    {
        document.getElementById('error-confirm-1').textContent = '*Confirme contraseña';
        return;
    }


    if (new_password === new_confirmPassword) 
    {
        
        var xhrmu = new XMLHttpRequest();
        xhrmu.open('POST', '/Modificar-usuario/'+ IdUser +'/', true);
        xhrmu.setRequestHeader('Content-Type', 'application/json');

        // Obtener el token CSRF
        var csrf_tokenmu = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        xhrmu.setRequestHeader('X-CSRFToken', csrf_tokenmu);

        var datosmu= {
            new_username: new_username,
            new_password: new_password
        };
    
    
        var datosJSONmu = JSON.stringify(datosmu);
        
        xhrmu.onload = function () {
            if (xhrmu.status >= 200 && xhrmu.status < 300) {
                // Éxito en la solicitud
                var response = JSON.parse(xhrmu.responseText);
                alert(response.mensaje);
                location.reload();
            }else {
                // Error en la solicitud
                console.error('Error al confirmar datos del user:', xhrmu.statusText);
            }
        };

        xhrmu.send(datosJSONmu);
    }
    else{
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
    }
});

