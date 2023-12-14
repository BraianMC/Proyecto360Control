var xhrct = new XMLHttpRequest();
    xhrct.open('GET', '/Crear-tipo/', true);

    xhrct.onload = function () {
        if (xhrct.status >= 200 && xhrct.status < 300) {
            // Éxito en la solicitud
            var datact = JSON.parse(xhrct.responseText);

            // Obtener el elemento select
            var selectElement = document.getElementById('workflowSelect');

            // Iterar sobre los workflows y agregar opciones al select
            datact.workflows.forEach(function (workflow) {
                var optionElement = document.createElement('option');
                optionElement.value = workflow.id;
                optionElement.textContent = workflow.name;
                selectElement.appendChild(optionElement);
            });
        } else {
            // Error en la solicitud
            console.error('Error al cargar los workflows:', xhrct.statusText);
        }
    };

    xhrct.send();