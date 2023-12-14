
const modalUpdateItem = document.getElementById('modal-update');

var tablas = document.querySelectorAll('table');

// Agregar el evento a cada tabla
tablas.forEach(function(tabla) {
    tabla.addEventListener('click', function (event) {
        var target = event.target;

        // Verificar si el clic fue en un ícono específico
        if (target.classList.contains('btn-pencil-1')) 
        {
            modalUpdateItem.classList.add('visible');
        } 
    });
});

document.addEventListener('click', (event) => {
    if (event.target === modalUpdateItem) {
        modalUpdateItem.classList.remove('visible');
    }
});





