document.getElementById('crear-usuario').addEventListener('click', function () {
    // Obtener valores de los campos
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    document.getElementById('error-username').textContent = '';
    document.getElementById('error-password').textContent = '';
    document.getElementById('error-confirm').textContent = '';

    if (username.trim() === '') {
        document.getElementById('error-username').textContent = '*Campo obligatorio.';
        return;
    }

    if (password === '')
    {
        document.getElementById('error-password').textContent = '*Ingrese una contraseña';
        return;
    }

    var longitudPassword = password.length;
    if (longitudPassword < 8)
    {
        document.getElementById('error-password').textContent = '';
        document.getElementById('error-password').textContent = 'Debe ser mayor o igual a 8 caracteres';   
        return;
    }

    if (confirmPassword === '')
    {
        document.getElementById('error-confirm').textContent = '*Confirme contraseña';
        return;
    }

    var longitudConfirmPassword = confirmPassword.length;
    if (longitudConfirmPassword < 8)
    {
        document.getElementById('error-confirm').textContent = '';
        document.getElementById('error-confirm').textContent = 'Debe ser mayor o igual a 8 caracteres';   
        return;
    }


    // Verificar si las contraseñas son iguales
    if (password === confirmPassword) {
        // Crear objeto con datos a enviar
        var data = {
            username: username,
            password: password
        };

        // Realizar la solicitud AJAX
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/Crear-usuario/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        var csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        xhr.setRequestHeader('X-CSRFToken', csrf_token);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var response = JSON.parse(xhr.responseText);
                alert(response.mensaje);
                location.reload();
            } else {
                alert('Error en la solicitud al servidor: ' + xhr.statusText);
            }
        };

        xhr.send(JSON.stringify(data));
    } else {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
    }
});