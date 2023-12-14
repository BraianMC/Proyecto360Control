// document.querySelector('table').addEventListener('click', function (event) {
//     var target = event.target;

//     // Verifica si el clic fue en un ícono específico
//     if (target.classList.contains('btn-responsible')) {
//         var itemId = target.getAttribute('data-id');
//         console.log("boton para abrir modal responsable");
//         cargarDatosResponsable(itemId);
        
//     }
// });

var tablesLoadResponsible = document.querySelectorAll('table');

// Agregar el evento a cada tabla
tablesLoadResponsible.forEach(function(tabla) {
    tabla.addEventListener('click', function (event) {
        var target = event.target;

        // Verificar si el clic fue en un ícono específico
        if (target.classList.contains('btn-responsible')) 
        {
            var Iditem = target.getAttribute('data-id');
            cargarDatosResponsable(Iditem);
        } 
    });
});

function cargarDatosResponsable(itemId) {
    var xhrdr = new XMLHttpRequest();
    xhrdr.open('GET', '/Asignar-responsable/' + itemId + '/', true);
    xhrdr.setRequestHeader('Content-Type', 'application/json');
    
    xhrdr.onload = function () {
        if (xhrdr.status >= 200 && xhrdr.status < 300) {
            var data = JSON.parse(xhrdr.responseText);
            
            
            // Limpia el select actual
            var selectElementUsers = document.getElementById('select-users');
            selectElementUsers.innerHTML = '';

            // Agrega las opciones desde los datos JSON
            for (var i = 0; i < data.usuarios.length; i++) {
                var option = document.createElement('option');
                option.value = data.usuarios[i].id;
                option.text = data.usuarios[i].username;
                selectElementUsers.appendChild(option);
            }

            // Selecciona la opción correspondiente al estado actual
            selectElementUsers.value = data.usuario_actual.id;

            var selectElementStates = document.getElementById('select-states');
            selectElementStates.innerHTML = '';

            // Agrega las opciones desde los datos JSON
            for (var i = 0; i < data.estados.length; i++) {
                var option = document.createElement('option');
                option.value = data.estados[i].id;
                option.text = data.estados[i].nombre;
                selectElementStates.appendChild(option);
            }

            // Selecciona la opción correspondiente al estado actual
            selectElementStates.value = data.estado_actual.id;
        }
        else {
            console.error('Error en la solicitud AJAX:', xhrdr.statusText);
        }
    };

    xhrdr.onerror = function () {
        console.error('Error en la solicitud AJAX');
    };

    xhrdr.send();
}    
