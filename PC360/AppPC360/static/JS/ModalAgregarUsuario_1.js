
const modalUser = document.getElementById('modal-user');
const buttonUser = document.getElementById('modal-add-user');

buttonUser.addEventListener('click', ()=>
{
    modalUser.classList.add('modal-open-user'); // Agrega la clase para mostrar el modal
});

document.addEventListener('click', (event) => {
    if (event.target === modalUser) {
        modalUser.classList.remove('modal-open-user');
    }
});

