function buscar() 
{
    // Obtener el valor del input de búsqueda
    var input = document.getElementById("inputBusqueda");
    var filtro = input.value.toUpperCase();

    // Obtener la tabla y las filas
    var tabla = document.getElementById("tablaCuerpo");
    var filas = tabla.getElementsByTagName("tr");

    // Eliminar la fila de mensaje anterior (si existe)
    var mensajeAnterior = document.getElementById("mensajeNoEncontrado");
    if (mensajeAnterior) 
    {
        mensajeAnterior.remove();
    }

    // Variable para verificar si se encontró alguna coincidencia
    var seEncontroCoincidencia = false;

    // Iterar a través de las filas y ocultar aquellas que no coincidan con el filtro
    for (var i = 0; i < filas.length; i++) {
        var celdas = filas[i].getElementsByTagName("td");
        var mostrarFila = false;

        for (var j = 0; j < celdas.length; j++) {
            if (celdas[j]) {
                var textoCelda = celdas[j].textContent || celdas[j].innerText;
                if (textoCelda.toUpperCase().indexOf(filtro) > -1) {
                    mostrarFila = true;
                    seEncontroCoincidencia = true;
                    break;
                }
            }
        }

        if (mostrarFila) {
            filas[i].style.display = "";
        } else {
            filas[i].style.display = "none";
        }
    }

    // Agregar una fila de mensaje si no se encontró ninguna coincidencia
    if (!seEncontroCoincidencia) 
    {
        var nuevaFila = tabla.insertRow(-1);
        nuevaFila.id = "mensajeNoEncontrado";
        var nuevaCelda = nuevaFila.insertCell(0);
        nuevaCelda.colSpan = "2"; // Reemplaza con el número real de columnas en tu tabla
        nuevaCelda.textContent = "No se encontraron resultados.";
    }
}