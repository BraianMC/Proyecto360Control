var openCloseModalBtn = document.getElementById('btnFiltrar');
var modalFilters = document.getElementById('container-filter');

if (openCloseModalBtn)
{
    // Evento de clic para abrir/cerrar el modal
    openCloseModalBtn.addEventListener('click', function () 
    {
        modalFilters.classList.toggle('show-modal-filter');
    });
}
