var xhr1 = new XMLHttpRequest();
xhr1.open('GET', '/Crear-proyecto/', true);
xhr1.setRequestHeader('Content-Type', 'application/json');

    xhr1.onload = function() {
        if (xhr1.status >= 200 && xhr1.status < 300) {
            
            var data = JSON.parse(xhr1.responseText);
            var selectUsuarios = document.getElementById('selectUsuarios');

            // Limpia el menú desplegable
            selectUsuarios.innerHTML = '';
            
            // Agrega opciones para cada usuario
            data.usuarios.forEach(function(usuario) {
                var option = document.createElement('option');
                option.value = usuario.id;
                option.textContent = usuario.username;
                selectUsuarios.appendChild(option);
            });
            
            } else {
                console.error('Error en la solicitud AJAX:', xhr1.statusText);
            }
        };

        xhr1.onerror = function() {
            console.error('Error en la solicitud AJAX');
        };

    xhr1.send();