const tablasDeleteConfirmation = document.querySelectorAll('table');
var IdItemEliminar;

tablasDeleteConfirmation.forEach(function(tabla) {
    tabla.addEventListener('click', function (event) {
        var target = event.target;

    
        if (target.classList.contains('btn-delete-1')) {
            // Almacenar el Iditem temporalmente
            IdItemEliminar = target.getAttribute('data-id');
        }
    });
});


var BtnDelete = document.getElementById('delete-item');
BtnDelete.addEventListener('click', function () {
    // Verificar si se ha asignado un Iditem previamente
    if (IdItemEliminar) {
        EliminarItem(IdItemEliminar);
    } 
});


function EliminarItem(idItem) {
    
    var xhrei = new XMLHttpRequest();
    xhrei.open('POST', '/Eliminar-item/'+ idItem +'/', true);
    xhrei.setRequestHeader('Content-Type', 'application/json');

    var csrf_tokenei = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    xhrei.setRequestHeader('X-CSRFToken', csrf_tokenei);
    
    
    xhrei.onload = function () {
        if (xhrei.status >= 200 && xhrei.status < 300) {
            // Éxito en la solicitud
            var response = JSON.parse(xhrei.responseText);
            alert(response.mensaje);
            location.reload();
        }else {
            // Error en la solicitud
            console.error('Error al eliminar item:', xhrei.statusText);
        }
    };

    xhrei.send();
    
}