
const modalActivity = document.getElementById('modal-activity');
const tablasActivity = document.querySelectorAll('table');

tablasActivity.forEach(function(tabla) {
    tabla.addEventListener('click', function (event) {
        var target = event.target;

        // Verificar si el clic fue en un ícono específico
        if (target.classList.contains('btn-show-activity')) 
        {
            event.stopPropagation();

            // Obtén la posición del botón
            var buttonPosition = target.getBoundingClientRect();
            var leftPosition = buttonPosition.left + window.scrollX - 550; 
            var topPosition = buttonPosition.bottom + window.scrollY + 20;

            modalActivity.style.top = topPosition + 'px';
            modalActivity.style.left = leftPosition + 'px';

            modalActivity.classList.toggle('open-modal-3');
        } 
    });
});




