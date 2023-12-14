
const botonEliminar2 = document.querySelectorAll('.btn-delete');
const modalEliminar2 = document.getElementById('modal-delete');
const nombreProyectoModal2 = document.querySelector('.name-modal-delete');


botonEliminar2.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();

        // Obtener el nombre del proyecto
        const nombreProyecto = button.closest('tr').querySelector('.project-name').textContent;

        // Mostrar el nombre del proyecto en el modal
        nombreProyectoModal2.textContent = `¿Quiere borrar el proyecto: ${nombreProyecto}?`;
    });
});







