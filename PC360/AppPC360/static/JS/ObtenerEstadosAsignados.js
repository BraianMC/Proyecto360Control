

var btnsPencil = document.querySelectorAll('.btn-pencil');
// Agregar el evento a cada botón
btnsPencil.forEach(function (boton) {
    boton.addEventListener('click', function () {
        var workflowId = this.getAttribute('data-id');
        cargarDatosWorkflow(workflowId);
    });
});


function cargarDatosWorkflow(workflowId) {
    var xhrwk = new XMLHttpRequest();
    xhrwk.open('GET', '/Modificar-workflow/' + workflowId + '/', true);
    xhrwk.setRequestHeader('Content-Type', 'application/json');

    xhrwk.onload = function () {
        if (xhrwk.status >= 200 && xhrwk.status < 300) {
            var datawk = JSON.parse(xhrwk.responseText);
            
            document.getElementById('nombreWorkflow').value = datawk.nombre_workflow;

            // Limpiar y llenar el listado de estado
            var listadoEstadosAsignados = document.getElementById('user-list-3');
            listadoEstadosAsignados.innerHTML = '';

            
            
            datawk.estados.forEach(function(estado) {
                var li = document.createElement('li');
                li.innerHTML = '<span class="content-span">' + estado.nombre_estado + '</span>' +
                '<div class="icon-container"><i class="fa-solid fa-pencil btn-pencil btn-update-1"></i>' + '<i class="fa-solid fa-rectangle-xmark btn-xmark"></i></div>';
                listadoEstadosAsignados.appendChild(li);
            });

    
        } else {
            console.error('Error en la solicitud AJAX:', xhrwk.statusText);
        }
    };

    xhrwk.onerror = function () {
        console.error('Error en la solicitud AJAX');
    };

    xhrwk.send();
}

