
const buttonChange = document.getElementById("mostrar-table");
const table1 = document.getElementById("table");
const table2 = document.getElementById("table-2");

buttonChange.addEventListener("click", () => 
{
    
    if (table1.classList.contains("tabla-oculta")) 
    {
        table1.classList.remove("tabla-oculta");
        table1.classList.add("tabla-visible");

        table2.classList.remove("tabla-visible");
        table2.classList.add("tabla-oculta");
    } else 
    {
        table1.classList.remove("tabla-visible");
        table1.classList.add("tabla-oculta");

        table2.classList.remove("tabla-oculta");
        table2.classList.add("tabla-visible");
    }
});
