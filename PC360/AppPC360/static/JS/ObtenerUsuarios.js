
var xhr = new XMLHttpRequest();
xhr.open('GET', '/Obtener-usuarios/', true);
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        
        var data = JSON.parse(xhr.responseText);

        // Iterar sobre cada menú desplegable y cargar los usuarios
        
        var selectUsuariosm = document.getElementById('selectUsuarios-1');
        console.log(data);

        // Limpia el menú desplegable
        selectUsuariosm.innerHTML = '';

        // Agrega opciones para cada usuario en el menú desplegable
        data.usuarios.forEach(function(usuario) {
            var option = document.createElement('option');
            option.value = usuario.id;
            option.textContent = usuario.username;
            selectUsuariosm.appendChild(option);
        });
        

    } else {
        console.error('Error en la solicitud AJAX para obtener usuarios:', xhr.statusText);
    }
};

xhr.onerror = function() {
    console.error('Error en la solicitud AJAX para obtener usuarios');
};

xhr.send();
