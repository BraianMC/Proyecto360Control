var toggleButtons = document.querySelectorAll('.button-eye');

  // Agrega un event listener a cada botón
  toggleButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Encuentra el campo de contraseña y el ícono dentro del contenedor actual
        var container = button.closest('.container-password');
        var passwordField = container.querySelector('.input-user');
        var eyeIcon = container.querySelector('.icon-eye');

        // Cambia el tipo del campo de contraseña y la clase del ícono
        if (passwordField.type === "password") {
          passwordField.type = "text";
          eyeIcon.classList.remove("fa-eye");      
          eyeIcon.classList.add("fa-eye-slash");
        } else {
          passwordField.type = "password";  
          eyeIcon.classList.remove("fa-eye-slash");
          eyeIcon.classList.add("fa-eye");
        }
      });
});