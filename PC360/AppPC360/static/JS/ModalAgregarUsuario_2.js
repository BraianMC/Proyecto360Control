const modalUser_2 = document.getElementById('modal-user-2');
const buttonUser_2 = document.getElementById('modal-add-user-2');

buttonUser_2.addEventListener('click', ()=>
{
    modalUser_2.classList.add('modal-open-user'); // Agrega la clase para mostrar el modal
});

document.addEventListener('click', (event) => {
    if (event.target === modalUser_2) {
        modalUser_2.classList.remove('modal-open-user');
    }
});