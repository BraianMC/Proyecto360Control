const botonEliminaret = document.querySelectorAll('.btn-delete');
const botonTrashet = document.querySelector('.btn-trash');

let idTipoet = null;

botonEliminaret.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        idTipoet = button.getAttribute('data-id');
    });
});



botonTrashet.addEventListener('click', () => {
    if (idTipoet) {
        // Construir la URL con el ID del proyecto
        const url = `/Eliminar-tipo/${idTipoet}/`;

        const xhret = new XMLHttpRequest();

        // Configurar la solicitud POST
        xhret.open('POST', url, true);
        xhret.setRequestHeader('Content-Type', 'application/json');

        var csrf_tokenet = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        xhret.setRequestHeader('X-CSRFToken', csrf_tokenet);

        // Manejar la respuesta de la solicitud
        xhret.onload = function () {
            if (xhret.status >= 200 && xhret.status < 300) {
                var response = JSON.parse(xhret.responseText);

                if (response.status === 'success') {
                    alert(response.message);
                    
                } else if (response.status === 'error') {
                    alert('Error: ' + response.message);
                    
                }

                location.reload();
                
            } else {
                console.error('Error al eliminar el tipo:', xhret.statusText);
            }
        };

        // Enviar la solicitud
        xhret.send();
    } else {
        console.error('No se ha seleccionado un proyecto para eliminar.');
    }
});
