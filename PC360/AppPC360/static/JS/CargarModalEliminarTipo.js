
const botonEliminarTipo = document.querySelectorAll('.btn-delete');
const modalEliminarTipo= document.getElementById('modal-delete');
const nombreTipo = document.querySelector('.name-modal-delete');


botonEliminarTipo.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();

        // Obtener el nombre del proyecto
        const nTipo = button.closest('tr').querySelector('.tipo-name').textContent;

        // Mostrar el nombre del proyecto en el modal
        nombreTipo.textContent = `¿Quiere borrar el tipo: ${nTipo}?`;
    });
});






