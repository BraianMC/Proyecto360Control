
function generarImagenInicial(nombreUsuario) {
    var divImagenInicial = document.getElementById("profile");

    // Obtener la inicial del nombre de usuario
    var inicial = nombreUsuario[0].toUpperCase();

    // Establecer la inicial como contenido del div
    divImagenInicial.textContent = inicial;
}

// Obtener el texto del bloque user_content por ID 
var userContent = document.getElementById('user-content').textContent.trim();

generarImagenInicial(userContent);