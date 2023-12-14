const botonEliminarUser = document.querySelectorAll('.btn-delete');
const botonTrasheu = document.querySelector('.btn-trash');

let idUser = null;

botonEliminarUser.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        idUser = button.getAttribute('data-id');
    });
});



botonTrasheu.addEventListener('click', () => {
    if (idUser) {
        
        const url = `/Eliminar-usuario/${idUser}/`;

        const xhreu = new XMLHttpRequest();

        // Configurar la solicitud POST
        xhreu.open('POST', url, true);
        xhreu.setRequestHeader('Content-Type', 'application/json');

        var csrf_tokeneu = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        xhreu.setRequestHeader('X-CSRFToken', csrf_tokeneu);

        // Manejar la respuesta de la solicitud
        xhreu.onload = function () {
            if (xhreu.status >= 200 && xhreu.status < 300) {
                var response = JSON.parse(xhreu.responseText);
                if (response.status === 'success') {
                    alert(response.message);
                    
                } else if (response.status === 'error') {
                    alert('Error: ' + response.message);
                    
                }

                location.reload();
                
            } else {
                console.error('Error al eliminar el usuario:', xhreu.statusText);
            }
        };

        // Enviar la solicitud
        xhreu.send();
    } else {
        console.error('No se ha seleccionado un proyecto para eliminar.');
    }
});
