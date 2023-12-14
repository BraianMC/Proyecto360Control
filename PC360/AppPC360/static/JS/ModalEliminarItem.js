
const modalDeleteItem = document.getElementById('modal-delete-item');
const tablasDelete = document.querySelectorAll('table');

tablasDelete.forEach(function(tabla) {
    tabla.addEventListener('click', function (event) {
        var target = event.target;

        // Verificar si el clic fue en un ícono específico
        if (target.classList.contains('btn-delete-1')) 
        {

            modalDeleteItem.classList.add('open-modal-delete');
        } 
    });
});

const btnCancel1 = document.getElementById('btn-cancel-1');

document.addEventListener('click', (event) => {
    if (event.target === btnCancel1 || event.target === modalDeleteItem) {
        modalDeleteItem.classList.remove('open-modal-delete');
    }
});






