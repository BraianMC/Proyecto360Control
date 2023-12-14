

var modalUpdate = document.getElementById('modal-update');
var inputName = document.getElementById('name-item-update');
var textDescription = document.getElementById('description-2');
var selectUpdate = document.getElementById('select-tipo-update');

document.addEventListener('click', function (event) {
    // Verificar si el clic no fue dentro del modal
    if (modalUpdate && !modalUpdate.contains(event.target)) {
        inputName.disabled = false;
        textDescription.disabled = false;
        selectUpdate.disabled = false;
    }
});

var table2 = document.getElementById('table-2');

table2.addEventListener('click', function (event) {
    // Deshabilitar elementos cuando se hace clic en la tabla
    inputName.disabled = true;
    textDescription.disabled = true;
    selectUpdate.disabled = true;

    // Evitar que el clic en la tabla se propague y active el evento del documento
    event.stopPropagation();
});

