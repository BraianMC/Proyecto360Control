const ModalConfirmation = document.getElementById('modal-complete-item');

document.getElementById('table-2').addEventListener('click', function (event) {
    var target = event.target;

    // Verifica si el clic fue en un ícono específico
    if (target.classList.contains('btn-check')) 
    {
        ModalConfirmation.classList.add('open-modal-item');
    } 
});

const btnCancelConfirmation = document.getElementById('btn-cancel-confirmation');

document.addEventListener('click', (event) => {
    if (event.target === btnCancelConfirmation || event.target === ModalConfirmation) {
        ModalConfirmation.classList.remove('open-modal-item');
    }
});