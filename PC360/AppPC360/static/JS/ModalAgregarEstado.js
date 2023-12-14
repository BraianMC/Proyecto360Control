const modalState = document.getElementById('modal-update-state-1');
const buttonAddState = document.getElementById('add-state');

buttonAddState.addEventListener('click', ()=>
{
    modalState.classList.add('open-update-state'); // Agrega la clase para mostrar el modal
});

document.addEventListener('click', (event) => 
{
    if (event.target === modalState) 
    {
        modalState.classList.remove('open-update-state');
    }
});

