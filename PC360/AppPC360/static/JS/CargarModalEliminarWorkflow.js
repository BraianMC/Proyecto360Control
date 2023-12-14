
const botonEliminarWk = document.querySelectorAll('.btn-delete');
const modalEliminarWk= document.getElementById('modal-delete');
const nombreWorkflow = document.querySelector('.name-modal-delete');


botonEliminarWk.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();

        // Obtener el nombre del workflow
        const nombreWk = button.closest('tr').querySelector('.workflow-name').textContent;

        // Mostrar el nombre del workflow en el modal
        nombreWorkflow.textContent = `¿Quiere borrar el workflow: ${nombreWk}?`;
    });
});







