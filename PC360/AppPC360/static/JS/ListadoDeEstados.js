const buttonEstados = document.getElementById("btn-states");
const statesContainer = document.getElementById("states");

// Agrega un evento de clic a la flecha
buttonEstados.addEventListener("click", function() {
    statesContainer.classList.toggle("openStates");
});