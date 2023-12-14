function agregarUsuario() {
    // Obtener elementos del modal
    var selectUsuarios = document.getElementById('selectUsuarios');
    var selectRoles = document.getElementById('selectRoles');
    var userList = document.getElementById('user-list-1');

    // Obtener valores seleccionados
    var usuarioSeleccionado = selectUsuarios.options[selectUsuarios.selectedIndex].text;
    var rolSeleccionado = selectRoles.options[selectRoles.selectedIndex].text;

    // Validar que se haya seleccionado un usuario
    if (usuarioSeleccionado) {
        // Construir el contenido directamente y agregarlo a la lista de usuarios asignados
        userList.innerHTML += '<li><span class="content-span">' + usuarioSeleccionado + '</span>/<span class="content-span">' + rolSeleccionado + '</span></li>';
        alert('Usuario agregado exitosamente!.');
    } else {
        alert('Seleccione un usuario antes de guardar.');
    }
}