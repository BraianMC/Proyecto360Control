
const botonEliminar = document.querySelectorAll('.btn-delete');
const modalEliminar = document.getElementById('modal-delete');



botonEliminar.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        modalEliminar.classList.add('open-modal-3');
    });
});



const btnCancelDelete = document.getElementById('btn-cancel');

document.addEventListener('click', (event) => {
    if (event.target === btnCancelDelete) {
        modalEliminar.classList.remove('open-modal-3');
    }
});




