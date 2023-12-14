"""PC360 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from AppPC360.views import IniciarSesion, CerrarSesion ,Administracion, ListadoProyectos,CrearProyecto, ModificarProyecto, ObtenerUsuarios, EliminarProyecto, ListadoWorkflows, CrearWorkflow, ModificarWorkflow, EliminarWorkflow, ListadoTipos, CrearTipo, ModificarTipo, EliminarTipo, ListadoUsuarios, CrearUsuario, ModificarUsuario, EliminarUsuario, ListadoProyectosRol, ProyectosPorRol, ProyectoItemsUsuario, CrearItem, ModificarItem, ObtenerActividadItem, ObtenerTodosItems, AsignarResponsable, EstadoCompletado, EliminarItem

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', IniciarSesion.as_view(), name='iniciar-sesion'),
    path('Cerrar-sesion/', CerrarSesion.as_view(), name='cerrar-sesion'),
    path('administracion/', Administracion.as_view(), name='administracion'),
    # path('home/', Home.as_view(), name='home'),
    #urls de proyecto
    path('Proyectos/', ListadoProyectos.as_view(), name='proyectos'),
    path('Crear-proyecto/', CrearProyecto.as_view(), name='crear-proyecto'),
    path('Modificar-proyecto/<int:proyecto_id>/', ModificarProyecto.as_view(), name='modificar-proyecto'),
    path('Obtener-usuarios/', ObtenerUsuarios.as_view(), name='usuarios'),
    path('Eliminar-proyecto/<int:proyecto_id>/', EliminarProyecto.as_view(), name='eliminar-proyecto'),
    #urls de workflows
    path('Workflows/', ListadoWorkflows.as_view(), name='workflows'),
    path('Crear-workflow/', CrearWorkflow.as_view(), name='crear-workflow'),
    path('Modificar-workflow/<int:workflow_id>/', ModificarWorkflow.as_view(), name='modificar-workflow'),
    path('Eliminar-workflow/<int:workflow_id>/', EliminarWorkflow.as_view(), name='eliminar-workflow'),
    #urls de tipos
    path('Tipos/', ListadoTipos.as_view(), name='tipos'),
    path('Crear-tipo/', CrearTipo.as_view(), name='crear-tipo'),
    path('Modificar-tipo/<int:tipo_id>/', ModificarTipo.as_view(), name='modificar-tipo'),
    path('Eliminar-tipo/<int:tipo_id>/', EliminarTipo.as_view(), name='eliminar-tipo'),
    #urls de usuarios
    path('Usuarios/',ListadoUsuarios.as_view(), name='usuarios'),
    path('Crear-usuario/', CrearUsuario.as_view(), name='crear-usuario'),
    path('Modificar-usuario/<int:user_id>/', ModificarUsuario.as_view(), name='modificar-usuario'),
    path('Eliminar-usuario/<int:user_id>/', EliminarUsuario.as_view(), name='eliminar-usuario'),
    path('Proyectos-por-rol/', ListadoProyectosRol.as_view(), name='proyectos-rol'),
    path('Proyectos-rol/<str:rol>/', ProyectosPorRol.as_view(), name='proyectos-rol-user'),
    path('Items-proyecto/<int:project_id>', ProyectoItemsUsuario.as_view(), name='items-por-proyecto'),
    path('Crear-item/', CrearItem.as_view(), name='crear-item'),
    path('Modificar-item/<int:item_id>/', ModificarItem.as_view(), name='modificar-item'),
    path('Eliminar-item/<int:item_id>/', EliminarItem.as_view(), name='eliminar-item'),
    path('Actividad-item/<int:item_id>/', ObtenerActividadItem.as_view(), name='actividad-item'),
    path('Todos-los-items/<int:project_id>/', ObtenerTodosItems.as_view(), name= 'todos-items'),
    path('Asignar-responsable/<int:item_id>/', AsignarResponsable.as_view(), name='asignar-responsable'),
    path('Estado-completado/<int:item_id>/', EstadoCompletado.as_view(), name='estado-completado'),
]
