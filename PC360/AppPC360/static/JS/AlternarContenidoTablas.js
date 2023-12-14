document.addEventListener('DOMContentLoaded', function () 
{
  var btnCambiarContenido = document.getElementById('cambiarContenido');
  //Verifico si el boton esta presente 
  if(btnCambiarContenido)
  {
  var contenidoOriginal = {};
  var contenidoActualizado = {};

  // Guardar el contenido original de las tablas
  guardarContenidoOriginal();

  // Función para guardar el contenido original de las tres tablas
  function guardarContenidoOriginal() {
    contenidoOriginal.tablaCreados = document.getElementById('table-1').innerHTML;
    contenidoOriginal.tablaAsignados = document.getElementById('table-2').innerHTML;
    contenidoOriginal.tablaCompletados = document.getElementById('table-3').innerHTML;
  }

  // Función para restaurar el contenido original de las tres tablas
  function restaurarContenidoOriginal() {
    document.getElementById('table-1').innerHTML = contenidoOriginal.tablaCreados;
    document.getElementById('table-2').innerHTML = contenidoOriginal.tablaAsignados;
    document.getElementById('table-3').innerHTML = contenidoOriginal.tablaCompletados;
  }

  // Manejar el clic en el botón de actualizar/restaurar
  document.getElementById('cambiarContenido').addEventListener('click', function () {
    // Alternar entre el contenido original y el contenido actualizado
    if (this.textContent === 'Todos los items') {
      // Realizar una solicitud AJAX para obtener los nuevos datos
      var url = window.location.href;
      var urlParts = url.split('/');
      var lastPart = urlParts[urlParts.length - 1];
      var project_id = parseInt(lastPart);
      console.log("proyecto id:", project_id);

      var xhrTabla = new XMLHttpRequest();
      xhrTabla.open('GET', '/Todos-los-items/' + project_id + '/', true);
      console.log("Paso");
 
      xhrTabla.onload = function () {
        console.log("ingreso aca");
        if (xhrTabla.status >= 200 && xhrTabla.status < 300) {
          var data = JSON.parse(xhrTabla.responseText);
          console.log("informacion obtenido:", data);
          // Guardar el contenido actualizado
          contenidoActualizado.tablaCreados = generarFilasHTML(data.items_creados, "creados");
          contenidoActualizado.tablaAsignados = generarFilasHTML(data.items_asignados, "asignados");
          contenidoActualizado.tablaCompletados = generarFilasHTML(data.items_completados, "terminados");
          // Actualizar las tablas con los nuevos datos
          document.getElementById('table-1').innerHTML = contenidoActualizado.tablaCreados;
          document.getElementById('table-2').innerHTML = contenidoActualizado.tablaAsignados;
          document.getElementById('table-3').innerHTML = contenidoActualizado.tablaCompletados;
        }
        else
        {
          console.error('Error en la solicitud AJAX para obtener datos items:', xhrTabla.statusText);
        }
      };
      xhrTabla.send();
      this.textContent = 'Mis items';
    } else {
      // Restaurar el contenido original de las tablas
      restaurarContenidoOriginal();
      this.textContent = 'Todos los items';
    }
  });

  // Función para generar el HTML de las filas de la tabla
  function generarFilasHTML(items, mensaje) {
    var html = '';
    // Agregar cabecera de la tabla
    html += '<thead>';
    html += '<tr>';
    html += '<th><h1>Nombre</h1></th>';
    html += '<th><h1>Descripcion</h1></th>';
    html += '<th><h1>Tipo</h1></th>';
    html += '<th><h1>Prioridad</h1></th>';
    html += '<th><h1>Estado actual</h1></th>';
    html += '<th><h1>Responsable</h1></th>';
    html += '<th><h1>Opciones</h1></th>';
    html += '</tr>';
    html += '</thead>';

    //Verifico si hay elementos en el array
    //Agregar filas con los datos
    if (items.length > 0)
    {
      for (var i = 0; i < items.length; i++) 
      {
        html += '<tr class="tr-data">';
        html += '<td>' + items[i].nombre + '</td>';
        html += '<td>';
        html += '<button class="btn-show" data-id="' + items[i].id + '">Ver</button>';
        html += '<div class="hidden-text" id="hidden-text-' + items[i].id + '">';
        html += items[i].descripcion;
        html += '</div>';
        html += '</td>';
        html += '<td class="td-3">' + items[i].tipo + '</td>';
        html += '<td class="td-4">' + items[i].prioridad + '</td>';
        html += '<td>' + items[i].estado + '</td>';
        html += '<td>' + items[i].usuario; 
        html+= '<br><span class="role-text">' + items[i].rol + '</span>';
        html+= '</td>';
        
        // Agrega lógica similar para otras columnas si es necesario
        // Nueva columna adicional con enlaces a acciones
        var estado = items[i].estado;
        if (mensaje === 'creados')
        {
          html += '<td>';
          html += '<i class="fa-solid fa-pencil btn-pencil-1" data-id="' + items[i].id + '"></i>';
          html += '<i class="fa-solid fa-trash-can btn-delete-1" data-id="' + items[i].id + '"></i>';
          html += '<i class="fa-solid fa-eye btn-show-activity" data-id="' + items[i].id + '"></i>';
          html += '<i class="fa-solid fa-user-tie btn-responsible" data-id="' + items[i].id + '"></i>';
          html += '</td>';
        } else if (mensaje === 'asignados'){
          html += '<td>';
          html += '<i class="fa-solid fa-pencil btn-pencil-1" data-id="' + items[i].id + '"></i>';
          html += '<i class="fa-solid fa-eye btn-show-activity" data-id="' + items[i].id + '"></i>';
          html += '<i class="fa-solid fa-user-tie btn-responsible" data-id="' + items[i].id + '"></i>';
          html += '</td>';
        } else if (mensaje === 'terminados')
        {
          html += '<td>';
          if (estado === 'Terminado')
          {
            html += '<i class="fa-solid fa-trash-can btn-delete-1" data-id="' + items[i].id + '"></i>';
            html += '<i class="fa-solid fa-eye btn-show-activity" data-id="' + items[i].id + '"></i>';
          } else {
            html += '<i class="fa-solid fa-pencil btn-pencil-1" data-id="' + items[i].id + '"></i>';
            html += '<i class="fa-solid fa-eye btn-show-activity" data-id="' + items[i].id + '"></i>';
            html += '<i class="fa-solid fa-user-tie btn-responsible" data-id="' + items[i].id + '"></i>';
          }
          html += '</td>';
        }
        
        html += '</tr>';
      }
    } else {
        html += '<tr>';
        html += '<td colspan="7"> No hay items ' + mensaje + '</td>';
        html += '</tr>';
    }
    
    return html;
  }
}

});




