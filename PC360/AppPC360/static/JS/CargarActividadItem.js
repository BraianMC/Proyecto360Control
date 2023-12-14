

var tables = document.querySelectorAll('table');

// Agregar el evento a cada tabla
tables.forEach(function(tabla) {
    tabla.addEventListener('click', function (event) {
        var target = event.target;

        // Verificar si el clic fue en un ícono específico
        if (target.classList.contains('btn-show-activity')) 
        {
            var itemId = target.getAttribute('data-id');
            cargarActividadItem(itemId);   
        } 
    });
});

function cargarActividadItem(item_ID) {
    var xhrActividad = new XMLHttpRequest();
    xhrActividad.open('GET', '/Actividad-item/' + item_ID + '/', true);
    xhrActividad.setRequestHeader('Content-Type', 'application/json');
    console.log("ingreso");
    xhrActividad.onload = function () {
        if (xhrActividad.status >= 200 && xhrActividad.status < 300) {
            var dataActividad = JSON.parse(xhrActividad.responseText);
           
            
            // Limpiar y llenar el listado de usuarios
            var listadoActividad = document.getElementById('activities');
            listadoActividad.innerHTML = '';
            
            dataActividad.forEach(function(actividad) {
                var divContent = document.createElement('div');
                divContent.className = 'content-activity';

                divContent.innerHTML = `
                    <span class="label-txt">Estado:</span>
                    <span>${actividad.estado}</span>

                    <span class="label-txt">Actividad:</span>
                    <span>${actividad.accion}</span>

                    <span class="label-txt">User:</span>
                    <span>${actividad.usuario}</span>

                    <span class="label-txt">Fecha:</span>
                    <span>${actividad.fecha}</span>
                `;

                // Agregar el contenido al contenedor y el contenedor al documento
                listadoActividad.appendChild(divContent);
            
            });

            // Mostrar el modal de modificación
            // document.getElementById('modal-modificar-proyecto').style.display = 'block';
        } else {
            console.error('Error en la solicitud AJAX:', xhrActividad.statusText);
        }
    };

    xhrActividad.onerror = function () {
        console.error('Error en la solicitud AJAX');
    };

    xhrActividad.send();
}

