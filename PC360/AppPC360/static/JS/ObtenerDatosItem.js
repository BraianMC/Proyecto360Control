
var tablesModify = document.querySelectorAll('table');

// Agregar el evento a cada tabla
tablesModify.forEach(function(tabla) {
    tabla.addEventListener('click', function (event) {
        var target = event.target;

        // Verificar si el clic fue en un ícono específico
        if (target.classList.contains('btn-pencil-1')) 
        {
            var itemId = target.getAttribute('data-id');
            cargarDatosItem(itemId);   
        } 
    });
});


function cargarDatosItem(itemId) {
    var xhrui = new XMLHttpRequest();
    xhrui.open('GET', '/Modificar-item/' + itemId + '/', true);
    xhrui.setRequestHeader('Content-Type', 'application/json');
    
    xhrui.onload = function () {
        if (xhrui.status >= 200 && xhrui.status < 300) {
            var data = JSON.parse(xhrui.responseText);
            console.log("informacion obtenida:",data);
            
            // Llenar el nombre del item
            document.getElementById('name-item-update').value = data.nombre_item;
            //Cargar descripcion
            document.getElementById('description-2').value = data.descripcion;

            
            var selectTypes = document.getElementById('select-tipo-update');
            selectTypes.value = data.tipo;

            var selectPriority = document.getElementById('select-prioridad-update')
            selectPriority.value = data.prioridad;

        } else {
            console.error('Error en la solicitud AJAX:', xhrui.statusText);
        }
    };

    xhrui.onerror = function () {
        console.error('Error en la solicitud AJAX');
    };

    xhrui.send();
}    




