const buttons = document.querySelectorAll('.button-item');

buttons.forEach((button) =>
{
    button.addEventListener('click', () =>
    {
        //Obtener el valor del atributo data-target para identificar la tabla
        const target = button.getAttribute('data-target');

        //Ocultar todas las tablas
        document.querySelectorAll('.table-oculta').forEach((table) =>
        {
            table.classList.remove('active');
        });

        //Mostrar la tabla correspondiente
        const tableToShow = document.getElementById(target);
        if (tableToShow)
        {
            tableToShow.classList.add('active');
        }

        //Desactivar todos los botones
        buttons.forEach((btn) =>
        {
            btn.classList.remove('active');
        });
        
        //Activar el boton actual
        button.classList.add('active');
    });
});

//Mostrar la tabla 1 por defecto
document.getElementById('table-1').classList.add('active');