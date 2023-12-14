var btnFiltrarTerminados = document.getElementById('btnFiltrar');
var containerFilter = document.getElementById('container-filter');

if (containerFilter)
{
    var optionFilters = containerFilter.querySelectorAll('.option-filter');
    optionFilters.forEach(function (optionFilter)
    {
        optionFilter.addEventListener('click', function ()
        {
            var filas = document.querySelectorAll("#table-3 tbody .tr-data");
            console.log("filas a filtrar:", filas);
            if (filas.length > 0)
            {
                // Eliminar mensaje anterior si existe
                var mensajeAnterior = document.querySelector('.mensaje-sin-elementos');
                if (mensajeAnterior) 
                {
                    mensajeAnterior.remove();
                }
                // Determinar el filtro seleccionado
                var filtro = this.textContent.toLowerCase();

                // Conjunto para almacenar filas visibles
                var filasVisibles = new Set();

                filas.forEach(function (fila)
                {
                    if (fila.cells.length > 4)
                    {
                        var estadoActual = fila.cells[4].textContent.toLowerCase();
                        switch (filtro) 
                        {
                            case 'todos':
                              // Mostrar todas las filas
                                fila.style.display = 'table-row';
                                filasVisibles.add(fila);
                                break;
                            case 'por terminar':
                                // Ocultar filas donde el estado sea "final"
                                fila.style.display = estadoActual.includes('terminado') ? 'none' : 'table-row';
                                if (fila.style.display === 'table-row') 
                                {
                                    filasVisibles.add(fila);
                                }
                                break;
                            case 'terminados':
                                // Ocultar filas donde el estado no sea "final"
                                fila.style.display = estadoActual.includes('terminado') ? 'table-row' : 'none';
                                if (fila.style.display === 'table-row') 
                                {
                                    filasVisibles.add(fila);
                                }
                                break;
                            default:
                                break;
                        }
                    }
                });

                if (filtro === 'todos') 
                {
                    filas.forEach(function (fila) 
                    {
                      fila.style.display = 'table-row';
                    });
                }
            
                // Mostrar mensaje si no hay elementos para mostrar
                if (filasVisibles.size === 0) 
                {
                    mostrarMensajeSinElementos();
                }
            }
        });
    });
}


function mostrarMensajeSinElementos() 
{
    var tbody = document.getElementById('table-3').getElementsByTagName('tbody')[0];
    var mensajeFila = document.createElement('tr');
    mensajeFila.classList.add('mensaje-sin-elementos'); // Agregar la clase en lugar del id
    mensajeFila.innerHTML = '<td colspan="7">No hay elementos para mostrar.</td>';
    tbody.appendChild(mensajeFila);
}