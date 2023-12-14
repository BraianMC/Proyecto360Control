// Agrega un manejador de eventos al contenedor de la lista de usuarios
document.getElementById('user-list-2').addEventListener('click', function(event) {
    // Verifica si se hizo clic en un botón de xmark
    if (event.target.classList.contains('btn-xmark')) {
        // Obtén el elemento <li> padre y elimínalo
        var liPadre = event.target.closest('li');
        
        // Verifica si se encontró el elemento <li> padre
        if (liPadre) {
            liPadre.remove(); // Elimina el <li> del DOM
        } else {
            console.error('No se encontró el elemento <li> padre.');
        }
    }
});
