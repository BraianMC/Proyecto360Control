const agregarEstadoButton = document.getElementById("agregar_estado");
const nombreEstadoInput = document.getElementById("nombre");
const estadosList = document.getElementById("states").getElementsByTagName("ul")[0];

        agregarEstadoButton.addEventListener("click", function() {
            const nombreEstado = nombreEstadoInput.value.trim();
            if (nombreEstado) {
                const li = document.createElement("li");
                li.textContent = nombreEstado;
                estadosList.appendChild(li);
                nombreEstadoInput.value = ""; // Limpia el campo de entrada
            }
        });