function agregarEstado() {
    // Obtener elementos del modal
    var inputState = document.getElementById('new-state');
    var statesList = document.getElementById('user-list-3');

    // Obtener valores seleccionados
    var newState = inputState.value;
    

    // Validar que se haya seleccionado un usuario
    if (newState !== '') {
        // Construir el contenido directamente y agregarlo a la lista de usuarios asignados
        statesList.innerHTML += '<li><span class="content-span">' + newState + '</span>' +
         '<div class="icon-container"><i class="fa-solid fa-pencil btn-pencil btn-update-1"></i>' + '<i class="fa-solid fa-rectangle-xmark btn-xmark"></i></div>' + '</li>';
        // document.getElementById('modal-user').style.display = 'none';
        alert("Estado agregado exitosamente!.");
    } else {
        alert('Ingrese el nombre del estado a agregar.');
    }
}