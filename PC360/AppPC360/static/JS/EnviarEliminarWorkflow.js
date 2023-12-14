
const btnEliminarwk = document.querySelectorAll('.btn-delete');
const btnTrash = document.querySelector('.btn-trash');

let idSeleccionadowk = null;

btnEliminarwk.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        idSeleccionadowk = button.getAttribute('data-id');
    });
});



btnTrash.addEventListener('click', () => {
    if (idSeleccionadowk) {
        
        const url = `/Eliminar-workflow/${idSeleccionadowk}/`;

        const xhrdw = new XMLHttpRequest();

        // Configurar la solicitud POST
        xhrdw.open('POST', url, true);
        xhrdw.setRequestHeader('Content-Type', 'application/json');

        var csrf_tokendw = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        xhrdw.setRequestHeader('X-CSRFToken', csrf_tokendw);

        // Manejar la respuesta de la solicitud
        xhrdw.onload = function () {
            if (xhrdw.status >= 200 && xhrdw.status < 300) {

                var response = JSON.parse(xhrdw.responseText);

                if (response.status === 'success') {
                    alert(response.message);
                    
                } else if (response.status === 'error') 
                {
                    alert('Error: ' + response.message);
                }

                location.reload();
                
            } else {
                console.error('Error al eliminar el workflow:', xhrdw.statusText);
            }
        };

        // Enviar la solicitud
        xhrdw.send();
    } else {
        console.error('No se ha seleccionado un proyecto para eliminar.');
    }
});





