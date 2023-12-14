const modal = document.getElementById('mimodal');
const button = document.getElementById('open-modal');

button.addEventListener('click', ()=>
{
    modal.classList.add('modal-open'); // Agrega la clase para mostrar el modal
});

document.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('modal-open');
    }
});

