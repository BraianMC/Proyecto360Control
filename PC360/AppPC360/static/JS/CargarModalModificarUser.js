const buttonsPencil = document.querySelectorAll('.btn-pencil');
const inputUsername = document.getElementById('user-name-update');

console.log("input:", inputUsername);

buttonsPencil.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();

        const name = button.closest('tr').querySelector('.user-name').textContent;

        // Mostrar el nombre del usuario en el modal
        inputUsername.value = name;
    });
});


