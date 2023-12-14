

document.getElementById('user-list-3').addEventListener('click', function (event) {
    // Verifica si el clic se realizó en un botón con la clase 'btn-update-1'
    if (event.target.classList.contains('btn-update-1')) {
        // Evita que el clic se propague a elementos superiores
        event.stopPropagation();

        // Abre el modal de actualización
        document.getElementById('modal-update-state-2').classList.add('open-update-state');
    }
});



document.addEventListener('click', function (event) {
    var modalStates = document.getElementById('modal-update-state-2');
    var buttonUpdateState = document.getElementById('update-state');

    if (event.target === modalStates || event.target == buttonUpdateState) {
        modalStates.classList.remove('open-update-state');
    }
});




