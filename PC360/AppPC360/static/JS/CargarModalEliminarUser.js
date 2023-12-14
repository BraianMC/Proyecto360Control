
const botonDeleteUser = document.querySelectorAll('.btn-delete');
const txtModalDelete = document.querySelector('.name-modal-delete');


botonDeleteUser.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();

        // Obtener el nombre del user
        const nombreUser = button.closest('tr').querySelector('.user-name').textContent;

        // Mostrar el nombre del user en el modal
        txtModalDelete.textContent = `¿Quiere borrar el usuario: ${nombreUser}?`;
    });
});







