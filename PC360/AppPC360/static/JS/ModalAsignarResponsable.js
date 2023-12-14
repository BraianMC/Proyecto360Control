const ModalResponsible = document.getElementById('modal-responsible');

var tablasShowResponsible = document.querySelectorAll('table');

// Agregar el evento a cada tabla
tablasShowResponsible.forEach(function(tabla) {
    tabla.addEventListener('click', function (event) {
        var target = event.target;

        // Verificar si el clic fue en un ícono específico
        if (target.classList.contains('btn-responsible')) 
        {
            ModalResponsible.classList.add('open-modal-responsible');
        } 
    });
});


document.addEventListener('click', (event) => {
    if (event.target === ModalResponsible) {
        ModalResponsible.classList.remove('open-modal-responsible');
    }
});