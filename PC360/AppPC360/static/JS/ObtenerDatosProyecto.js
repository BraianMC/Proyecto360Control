

var botonesPencil = document.querySelectorAll('.btn-pencil');

// Agregar el evento a cada botón
botonesPencil.forEach(function (boton) {
    boton.addEventListener('click', function () {
        var proyectoId = this.getAttribute('data-id');
        cargarDatosProyecto(proyectoId);
    });
});

function cargarDatosProyecto(proyectoId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/Modificar-proyecto/' + proyectoId + '/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var data = JSON.parse(xhr.responseText);
            // Llenar el nombre del proyecto
            document.getElementById('nombreProyecto-2').value = data.proyecto.name;

            // Limpiar y llenar el listado de usuarios
            var listadoUsuariosModal = document.getElementById('user-list-2');
            listadoUsuariosModal.innerHTML = '';
            
            data.usuarios.forEach(function(usuario) {
                var idUnico = 'usuario-'+ Date.now();
                var li = document.createElement('li');
                li.setAttribute('data-id', idUnico);
                li.innerHTML = '<span class="content-span">' + usuario.username + '</span>/<span class="content-span">' + usuario.rol + '</span>' +
                '<div class="icon-container"><i class="fa-solid fa-rectangle-xmark btn-xmark"></i></div>';
                listadoUsuariosModal.appendChild(li);
            });

            
        } else {
            console.error('Error en la solicitud AJAX:', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud AJAX');
    };

    xhr.send();
}

