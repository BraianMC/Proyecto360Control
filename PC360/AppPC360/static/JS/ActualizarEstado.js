var liToUpdate;  // Variable para almacenar el <li> que se actualizará

// Agregar evento al botón 'pencil' para capturar el <li> al que se le hará update
document.getElementById('user-list-3').addEventListener('click', function (event) {
    // Verificar si el clic se realizó en un botón con la clase 'btn-update-1'
    if (event.target.classList.contains('btn-update-1')) {
        // Obtener el elemento <li> específico
        liToUpdate = event.target.closest('li');

        // Verificar si se encontró el <li>
        if (liToUpdate) {
            alert("Información capturada para actualizar el estado.");
        } else {
            console.error('No se encontró el elemento <li> específico.');
        }
    }
});

// Agregar evento al botón 'update-state' para realizar la actualización
document.getElementById('update-state').addEventListener('click', function() {
    if (liToUpdate) {
        // Obtener el valor del input
        var nuevoStateInput = document.getElementById('name-state-update').value;

        // Obtener el elemento <span> dentro del <li> específico
        var spanEstado = liToUpdate.querySelector('span');

        // Verificar si se encontró el elemento <span>
        if (spanEstado) {
            // Actualizar el contenido del <span>
            spanEstado.textContent = nuevoStateInput;
            alert("Estado actualizado exitosamente!.");
        } else {
            console.error('No se encontró el elemento <span> dentro del elemento <li> específico.');
        }
    } else {
        console.error('No se capturó la información necesaria para actualizar el estado.');
    }
});
