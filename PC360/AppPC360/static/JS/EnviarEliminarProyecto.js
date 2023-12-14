
const botonEliminarm = document.querySelectorAll('.btn-delete');
const botonTrash = document.querySelector('.btn-trash');

let idProyectoSeleccionado = null;

botonEliminarm.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        idProyectoSeleccionado = button.getAttribute('data-id');
    });
});



botonTrash.addEventListener('click', () => {
    if (idProyectoSeleccionado) {
        // Construir la URL con el ID del proyecto
        const url = `/Eliminar-proyecto/${idProyectoSeleccionado}/`;

        const xhr = new XMLHttpRequest();

        // Configurar la solicitud POST
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        var csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        xhr.setRequestHeader('X-CSRFToken', csrf_token);

        // Manejar la respuesta de la solicitud
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var response = JSON.parse(xhr.responseText);
                alert(response.mensaje);
                location.reload();
                
            } else {
                console.error('Error al eliminar el proyecto:', xhr.statusText);
            }
        };

        // Enviar la solicitud
        xhr.send();
    } else {
        console.error('No se ha seleccionado un proyecto para eliminar.');
    }
});





