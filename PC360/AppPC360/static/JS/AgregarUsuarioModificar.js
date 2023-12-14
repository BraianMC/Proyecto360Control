function agregarUsuarioModificar() {
    // Obtener elementos del modal
    var selectUsuariosm = document.getElementById('selectUsuarios-1');
    var selectRolesm = document.getElementById('selectRoles-1');
    var userListm = document.getElementById('user-list-2');

    // Obtener valores seleccionados
    var usuarioSeleccionadom = selectUsuariosm.options[selectUsuariosm.selectedIndex].text;
    var rolSeleccionadom = selectRolesm.options[selectRolesm.selectedIndex].text;

    // Validar que se haya seleccionado un usuario
    if (usuarioSeleccionadom) 
    {

        var li = document.createElement('li');
        // Configurar el contenido del li
        li.innerHTML = '<span class="content-span">' + usuarioSeleccionadom + '</span>/<span class="content-span">' + rolSeleccionadom + '</span>' +
            '<div class="icon-container"><i class="fa-solid fa-pencil btn-pencil-2 btn-update-1"></i>' + '<i class="fa-solid fa-rectangle-xmark btn-xmark"></i></div>';
        // Agregar el li a la lista de usuarios asignados
        userListm.appendChild(li);
        alert("Usuario agregado al listado!.");
    } else {
        alert('Seleccione un usuario antes de guardar.');
    }
}