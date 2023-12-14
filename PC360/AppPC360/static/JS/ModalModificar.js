
const buttonModificar = document.querySelectorAll('.btn-pencil');
const modalModificar = document.getElementById('modalTipos');
const modalContenido = document.querySelector('.modal-content');

console.log(modalModificar);
console.log("Cantidad de botones",buttonModificar.length);

var contenidoModal = '';

buttonModificar.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        contenidoModal = button.getAttribute('data-modal-content');
        console.log(`Botón clicado. Abriendo modal con contenido: ${contenidoModal}`);
        modalModificar.classList.add('abrirmodal');
        console.log("Agrego la clase");
    });
});

document.addEventListener('click', (event) => {
    if (event.target === modalModificar) {
        modalModificar.classList.remove('abrirmodal');
    }
});






