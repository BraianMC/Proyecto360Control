const abrirModalItem = document.getElementById('abrirModalItem');
const modalItem = document.getElementById('modal');

console.log("boton:", abrirModalItem);
console.log("modal", modalItem);
abrirModalItem.addEventListener('click', () =>
{
    //Limpio los campos del modal
    var selectType = document.getElementById('select-tipo');
    selectType.selectedIndex = 0;
    
    var selectPriority = document.getElementById('select-prioridad');
    selectPriority.selectedIndex = 0;

    document.getElementById('error-name').textContent = '';
    document.getElementById('error-type').textContent = '';
    document.getElementById('error-priority').textContent = '';
    modalItem.classList.add('visible');
});     


document.addEventListener('click', (event) => 
{
    if (event.target === modalItem) {
        modalItem.classList.remove('visible');
    }
});




