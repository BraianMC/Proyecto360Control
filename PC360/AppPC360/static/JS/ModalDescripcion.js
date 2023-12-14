
const tablasDescription = document.querySelectorAll('table');

tablasDescription.forEach(function(tabla) {
    tabla.addEventListener('click', function (event) {
        var target = event.target;

        // Verificar si el clic fue en un ícono específico
        if (target.classList.contains('btn-show')) 
        {
            event.stopPropagation();
            var itemID = target.getAttribute('data-id');
        

            mostrarTexto(itemID);
        } 
    });
});

function mostrarTexto(itemID){
    var modalDescription = document.getElementById('hidden-text-' + itemID);
    modalDescription.classList.toggle('show-description')
}