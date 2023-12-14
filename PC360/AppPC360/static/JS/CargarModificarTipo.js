// Definir una variable para almacenar el data-id

// Agregar un manejador de eventos a todos los botones de lápiz
var botonesPencilt = document.getElementsByClassName('btn-pencil');
console.log("botones modificar:", botonesPencilt);
for (var i = 0; i < botonesPencilt.length; i++) {
    botonesPencilt[i].addEventListener('click', function(event) {
        // Obtener el data-id del botón pencil clickeado
        var Idtipo = event.target.getAttribute('data-id');
        cargarDatosTipo(Idtipo);

    });
}



function cargarDatosTipo(Idtipo) {
    // Obtener información del proyecto y del listado
   
    // Realizar la solicitud AJAX para confirmar el proyecto
    var xhrut = new XMLHttpRequest();
    xhrut.open('GET', '/Modificar-tipo/'+ Idtipo +'/', true);
    xhrut.setRequestHeader('Content-Type', 'application/json');


    xhrut.onload = function () {
        if (xhrut.status >= 200 && xhrut.status < 300) {
            // Éxito en la solicitud
            var detallesTipo = JSON.parse(xhrut.responseText);
        
            // Llenar el input con el nombre del tipo
            document.getElementById('name-type-2').value = detallesTipo.nombre_tipo;

            // Llenar el select con los workflows y establecer la opción seleccionada
            var selectWorkflow = document.getElementById('workflowSelect-2');
            selectWorkflow.innerHTML = '';  // Limpiar opciones existentes

            detallesTipo.workflows.forEach(function(workflow) {
                var option = document.createElement('option');
                option.value = workflow.id;
                option.text = workflow.nombre;
                selectWorkflow.add(option);

                // Establecer la opción seleccionada
                if (workflow.nombre === detallesTipo.workflow_seleccionado) {
                    option.selected = true;
                }
            });
        } else {
            // Error en la solicitud
            console.error('Error al obtener detalles del tipo:', xhrut.statusText);
        }
    };

    xhrut.send();
}



