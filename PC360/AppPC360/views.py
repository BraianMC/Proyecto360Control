from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from datetime import datetime
from django.utils.timezone import now
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.views import View
from .models import Project, UserProjectRole, Workflow, State, Type_Of_Item, Item, ItemState
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from django.urls import reverse
from django.http import HttpResponse


# Create your views here
@method_decorator(login_required, name='dispatch')
class Administracion(View):
    template_name = 'Administracion.html'

    def get(self, request):
        username = request.user.username
        context = {
            'username': username
        }
        return render(request, self.template_name, context)
    
    

class IniciarSesion(View):
    template_name = 'IniciarSesion.html'
    login_form = AuthenticationForm()
    admin_login_form = AuthenticationForm()
    
    def get(self, request):
        
        return render(request, self.template_name,  {'messages': messages.get_messages(request)})
    
    def post(self, request):
        if 'Sign in' in request.POST:
            login_form = AuthenticationForm(data=request.POST)

            if login_form.is_valid():
                
                username = login_form.cleaned_data['username']
                password = login_form.cleaned_data['password']
                user = authenticate(request, username=username, password=password)
                
                if user is not None:
                    print(f"Usuario autenticado: {user}")
                    request.session.flush()  # Limpiar la sesión activa
                    login(request, user)
                    
                    return redirect('proyectos-rol')
            else:
                messages.error(request, 'Usuario o contraseña incorrectos. Intentelo de nuevo.')
                
            
        elif 'Admin' in request.POST:
            admin_login_form = AuthenticationForm(data=request.POST)

            if admin_login_form.is_valid():
                username = admin_login_form.cleaned_data['username']
                password = admin_login_form.cleaned_data['password']
                user = authenticate(username=username, password=password)

                if user is not None:
                    login(request, user)
                    return redirect('administracion')
            else:
                messages.error(request, 'Usuario o contraseña del administrador incorrectas.')
                    

        return render(request, self.template_name, {'login_form': self.login_form, 'admin_login_form': self.admin_login_form, 'messages': messages.get_messages(request)})


class CerrarSesion(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return redirect('iniciar-sesion')
    

@method_decorator(login_required, name='dispatch')
class ListadoProyectos(View):
    template_name = 'ListadoProyectos.html'

    def get(self, request, *args, **kwargs):
        proyectos = Project.objects.all()
        username = request.user.username
        context = {
            'proyectos': proyectos,
            'username': username
        }
        return render(request, self.template_name, context)


class CrearProyecto(View):
    template_name = 'ListadoProyectos.html'

    def get(self, request, *args, **kwargs):
        #Me trae todos los usuarios menos el superuser
        usuarios = User.objects.filter(is_superuser=False)
        usuarios_data = [{'id': usuario.id, 'username': usuario.username} for usuario in usuarios]
        context = {'usuarios': usuarios_data}

        return JsonResponse(context)
    
    def post(self, request, *args, **kwargs):
        
        data = json.loads(request.body.decode('utf-8'))

        # Acceder a los datos JSON
        nombre_proyecto = data.get('nombre_proyecto', None)
        usuarios = data.get('usuarios', [])

        # Crear el objeto Proyecto y guardarlo en la base de datos
        proyecto = Project(name=nombre_proyecto)
        proyecto.save()

        # Iterar sobre los usuarios y guardarlos en la base de datos
        for usuario_data in usuarios:
            username = usuario_data.get('usuario')
            rol = usuario_data.get('rol')
    
            #Obtengo el user
            usuario = User.objects.get(username=username)

            # Crear el objeto UsuarioProyecto y asociarlo al proyecto y usuario
            usuario_proyecto = UserProjectRole(user=usuario, role=rol, project=proyecto)
            usuario_proyecto.save()

        return JsonResponse({'mensaje': 'Proyecto creado exitosamente!.'})
    
    

class ModificarProyecto(View):

    def get(self, request, proyecto_id, *args, **kwargs):
        proyecto = Project.objects.get(pk=proyecto_id)
        usuarios = UserProjectRole.objects.filter(project=proyecto)
        
        usuarios_data = [{'id': usuario.id, 'username': usuario.user.username, 'rol': usuario.role} for usuario in usuarios]
        
        response_data = {
            'proyecto':{'id':proyecto.id, 'name':proyecto.name},
            'usuarios':usuarios_data,
        }
        return JsonResponse(response_data)
    
    def post(self, request, proyecto_id, *args, **kwargs):
        # Obtener el cuerpo JSON de la solicitud
        data = json.loads(request.body.decode('utf-8'))
        
        # Acceder a los datos JSON
        nuevo_nombre_proyecto = data.get('nombre_proyecto', None)
        usuarios_nuevos = data.get('usuarios', [])

        # Obtener el proyecto existente
        proyecto = Project.objects.get(pk=proyecto_id)

        #Actualizar el nombre del proyecto
        proyecto.name = nuevo_nombre_proyecto
        proyecto.save()

        # # Eliminar todas las asignaciones de usuarios excepto el superusuario
        UserProjectRole.objects.filter(project=proyecto).delete()

        # Iterar sobre los nuevos usuarios y asignarlos al proyecto
        for usuario_data in usuarios_nuevos:
            username = usuario_data.get('usuario')
            rol = usuario_data.get('rol')

            # Obtener o crear el usuario
            usuario = User.objects.get(username=username)
            
            # Crear el objeto UsuarioProyecto y asociarlo al proyecto y usuario
            usuario_proyecto = UserProjectRole(user=usuario, role=rol, project=proyecto)
            usuario_proyecto.save()

        return JsonResponse({'mensaje': 'Proyecto modificado con exito!.'})
    

class ObtenerUsuarios(View):
    def get(self, request, *args, **kwargs):
        usuarios = User.objects.filter(is_superuser=False)
        usuarios_data = [{'id': usuario.id, 'username': usuario.username} for usuario in usuarios]
        context = {'usuarios': usuarios_data}
        
        return JsonResponse(context)
    

class EliminarProyecto(View):
    def post(self, request, proyecto_id, *args, **kwargs):
        proyecto = get_object_or_404(Project, pk=proyecto_id)
        
        # Elimina el proyecto y redirige a la lista de proyectos o a donde desees
        proyecto.delete()
        return JsonResponse({'mensaje': 'Proyecto eliminado con exito!.'})
    
@method_decorator(login_required, name='dispatch')
class ListadoWorkflows(View):
    template_name = 'ListadoWorkflows.html'

    def get(self, request, *args, **kwargs):
        workflows = Workflow.objects.all()
        username = request.user.username
        context = {
            'workflows': workflows,
            'username': username
        }

        return render(request, self.template_name, context)
    

class CrearWorkflow(View):
    def post(self, request):
        #Obtener el json
        data = json.loads(request.body.decode('utf-8'))
        
        #Acceder a los datos
        workflow_nombre = data.get('nombre_workflow', '')
        estados_data = data.get('estados', [])
        
        #Crear el objeto workflow y guardar en la base de datos
        workflow = Workflow(name=workflow_nombre)
        workflow.save()

        # Crea los estados asociados al workflow
        
        for estado_data in estados_data:
            nombre_estado = estado_data.get('nombre_estado','')
            #Creo el estado
            nuevo_estado = State(name=nombre_estado, workflow=workflow)
            nuevo_estado.save()

        return JsonResponse({'mensaje': 'Workflow creado con exito!.'})
    

class ModificarWorkflow(View):
    def get(self, request, workflow_id):
        # Obtén el workflow existente y sus estados asociados
        workflow = Workflow.objects.get(id=workflow_id)
        print('wokflow:',workflow)
        estados = State.objects.filter(workflow=workflow)

        workflow_data = {
            'nombre_workflow': workflow.name,
            'estados': [{'nombre_estado': estado.name} for estado in estados]
        }
        
        # Devuelve los datos en formato JSON
        return JsonResponse(workflow_data)


    def post(self, request, workflow_id):
        # Obtén el cuerpo JSON de la solicitud
        data = json.loads(request.body.decode('utf-8'))

        # Accede a los datos JSON
        nuevo_nombre_workflow = data.get('nombre_workflow', '')
        nuevos_estados_data = data.get('estados', [])

        # Verifica si el workflow está asociado a algún tipo que, a su vez, está asociado a un item
        tipos_asociados = Type_Of_Item.objects.filter(workflow_id=workflow_id)
        items_asociados = Item.objects.filter(type_Of_Item__in=tipos_asociados)

        if items_asociados.exists():
            message = "No se puede modificar el workflow porque está asociado a un tipo que, a su vez, está asociado a un item."
            return JsonResponse({'status': 'error', 'message': message})


        # Actualiza el nombre del workflow
        wflow = Workflow.objects.get(id=workflow_id)
        wflow.name = nuevo_nombre_workflow
        wflow.save()

        State.objects.filter(workflow=wflow).delete()

        # Crea los estados
        for nuevo_estado_data in nuevos_estados_data:
            nombre_estado = nuevo_estado_data.get('nombre_estado', '')

            estadoNuevo = State(name=nombre_estado, workflow=wflow)
            estadoNuevo.save()


        return JsonResponse({'status': 'success', 'message': 'Workflow modificado exitosamente'})


class EliminarWorkflow(View):
    def post(self, request, workflow_id, *args, **kwargs):
        workflow = get_object_or_404(Workflow, pk=workflow_id)
        
        tipo_asociado = Type_Of_Item.objects.filter(workflow=workflow).first()
        if tipo_asociado:
            return JsonResponse({'status': 'error', 'message': 'No se puede eliminar el workflow porque esta asociado a un tipo.'})
        
        workflow.delete()
        
        return JsonResponse({'status': 'success', 'message': 'El workflow ha sido eliminado exitosamente.'})
    

@method_decorator(login_required, name='dispatch')
class ListadoTipos(View):
    template_name = 'ListadoTipos.html'

    def get(self, request, *args, **kwargs):
        tipos = Type_Of_Item.objects.all()
        username = request.user.username
        context = {
            'tipos':tipos,
            'username': username
        }
        return render(request, self.template_name, context)
    
class CrearTipo(View):
    def get(self, request):
        workflows = Workflow.objects.all()
        workflows_data = [{'id': workflow.id, 'name': workflow.name} for workflow in workflows]
        context = {'workflows': workflows_data}
        return JsonResponse(context)
    
    def post(self, request):
        # Obtén el cuerpo JSON de la solicitud
        data = json.loads(request.body.decode('utf-8'))

        # Accede a los datos JSON
        nombre_tipo = data.get('nombre_tipo', '')
        workflow_id = data.get('workflow_id', '')

        
        # Obtengo el workflow asociado al ID proporcionado
        workflow = Workflow.objects.get(id=workflow_id)

        # Crea el tipo y asígna el workflow
        tipo = Type_Of_Item(name=nombre_tipo, workflow=workflow)
        tipo.save()

        return JsonResponse({'mensaje': 'Tipo creado con exito!.'})
    
class ModificarTipo(View):
    def get(self, request, tipo_id):
        #Obtener el tipo existente
        tipo = Type_Of_Item.objects.get(id=tipo_id)

        #Obtener todos los workflow
        workflows = Workflow.objects.all()

        # Convierte los datos en un formato adecuado para tu respuesta (por ejemplo, JSON)
        tipo_data = {
            'nombre_tipo': tipo.name,
            'workflow_seleccionado': tipo.workflow.name,
            'workflows': [{'id': workflow.id, 'nombre': workflow.name} for workflow in workflows]
        }

        return JsonResponse(tipo_data)
    
    def post(self, request, tipo_id):
        # Obtener datos del cuerpo de la solicitud POST en formato JSON
        data = json.loads(request.body.decode('utf-8'))

        # Obtener el nombre del tipo y el ID del nuevo workflow desde los datos
        nombre_tipo = data.get('nombre_tipo', '')
        workflow_id = data.get('workflow_id', None)

        # Obtener el objeto Tipo a modificar
        tipo = Type_Of_Item.objects.get(id=tipo_id)

        # Actualizar los campos según sea necesario
        tipo.name = nombre_tipo

        # Si hay un nuevo workflow seleccionado, actualizarlo
        if workflow_id is not None:
            nuevo_workflow = Workflow.objects.get(id=workflow_id)
            tipo.workflow = nuevo_workflow

        # Guardar los cambios en la base de datos
        tipo.save()

        return JsonResponse({'mensaje': 'Tipo modificado con exito'})


class EliminarTipo(View):
    def post(self, request, tipo_id, *args, **kwargs):
        tipo = get_object_or_404(Type_Of_Item, pk=tipo_id)
        
        # Eliminar el objeto Tipo
        # Verificar si el tipo está asociado a algún Item
        if Item.objects.filter(type_Of_Item=tipo).exists():
            return JsonResponse({'status': 'error', 'message': 'No se puede eliminar el tipo porque está asociado a al menos un item.'})
        
        tipo.delete()
        # Si no está asociado a ningún Item, proceder con la eliminación

        return JsonResponse({'status': 'success', 'message': 'El tipo ha sido eliminado exitosamente.'})
    

@method_decorator(login_required, name='dispatch')
class ListadoUsuarios(View):
    template_name = 'ListadoUsuarios.html'

    def get(self, request, *args, **kwargs):
        usuarios = User.objects.all()
        username = request.user.username
        context = {
            'usuarios': usuarios,
            'username': username
        }
        
        return render(request, self.template_name, context)
    
class CrearUsuario(View):
    def post(self, request):
        # Obtener datos JSON del cuerpo de la solicitud
        data = json.loads(request.body.decode('utf-8'))

        # Extraer datos del JSON
        username = data.get('username', '')
        password = data.get('password', '')

        # Crear el usuario, el create_user es importante para la password
        user = User.objects.create_user(username=username, password=password)

        return JsonResponse({'mensaje': 'Usuario creado con exito!.'})
    
class ModificarUsuario(View):
    def get(self, request, user_id, *args, **kwargs):
        user = get_object_or_404(User, pk=user_id)
        username = user.username
        password = user.password

        context = {
            'username': username,
            'password': password
        }

        return JsonResponse(context)
    

    def post(self, request, user_id, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        new_username = data.get('new_username')
        new_password = data.get('new_password')

        user = get_object_or_404(User, pk=user_id)

        
        user.username = new_username

        
        user.set_password(new_password)

        user.save()

        return JsonResponse({'mensaje': 'Usuario modificado con éxito!'})
    
class EliminarUsuario(View):
    def post(self, request, user_id):
        # Obtén el usuario que deseas eliminar
        usuario = get_object_or_404(User, id=user_id)

        if usuario.items_asignados.exists():
            #El usuario tiene al menos un item asignado
            return JsonResponse({'status': 'error', 'message': 'El usuario no puede ser eliminado por tiene asignado por lo menos un item.'})
        else:
            usuario.delete()
            return JsonResponse({'status': 'success', 'message': 'Usuario eliminado con exito!.'}) 
    


@method_decorator(login_required, name='dispatch')    
class ListadoProyectosRol(View):
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        usuario_actual = request.user
        roles_usuario = UserProjectRole.objects.filter(user=usuario_actual).values_list('role', flat=True).distinct()
        username = request.user.username
        context = {
            'roles': roles_usuario,
            'username': username
        }
        return render(request, self.template_name, context)
    
@method_decorator(login_required, name='dispatch')
class ProyectosPorRol(View):
    template_name = 'ListadoProyectoRol.html'

    def get(self, request, rol, *args, **kwargs):
        usuario_actual = request.user
        proyectos_usuario = UserProjectRole.objects.filter(user=usuario_actual, role=rol).select_related('project')
        username = request.user.username
        
        context = {
            'rol': rol, 
            'proyectos': proyectos_usuario,
            'username': username
        }
        return render(request, self.template_name, context)
    
    
@method_decorator(login_required, name='dispatch')
class ProyectoItemsUsuario(View):
    template_name = 'ListadoItemsProyecto.html'
         
    def get(self, request, project_id):
        #Obtengo el proyecto
        proyecto = get_object_or_404(Project, id=project_id)
        nombre_proyecto = proyecto.name
        
        #Obtengo el rol del usuario
        rol_usuario = UserProjectRole.objects.get(user=request.user, project=proyecto)


        # Filtrar ítems creados, asignados y completados por el usuario en el proyecto
        items_creados = Item.objects.filter(project_id=project_id, create_for=request.user)
        items_asignados = Item.objects.filter(project_id=project_id, asignated_to=request.user)
        items_completados = Item.objects.filter(project_id=project_id, completed_by=request.user)

        username = request.user.username

        #Obtengo los tipos 
        tipos = Type_Of_Item.objects.all()

        context = {
            'proyecto': nombre_proyecto,
            'items_creados': items_creados,
            'items_asignados': items_asignados,
            'items_completados': items_completados,
            'rol': rol_usuario.role,
            'tipos': tipos,
            'username': username
        }

        return render(request, self.template_name, context)
    

class CrearItem(View):
    def post(self, request, *args, **kwargs):
        # Deserializar los datos JSON de la solicitud

        data = json.loads(request.body.decode('utf-8'))
        nombre = data.get('nombre_item')
        prioridad = data.get('prioridad')
        tipo_item_id = data.get('tipo_id')  # Asumiendo que type_of_item_id es el ID del Type_Of_Item
        proyecto_id = data.get('proyecto_id')
        descripcion = data.get('descripcion')

        #Obtener el objeto tipo de item
        tipo_item = Type_Of_Item.objects.get(id=tipo_item_id)

        
        #Obtener el objeto proyecto
        proyecto = Project.objects.get(id=proyecto_id)

        #Obtener el usuario actualmente autenticado que seria el que creo el item
        creado_por_usuario = request.user
        usuario = creado_por_usuario.username

        #Obtener el primer estado para asignarlo como estado actual del item
        primer_estado = tipo_item.workflow.state_set.first().name

        #Crear objeto item y guardarlo
        item = Item(name=nombre, description=descripcion, priority=prioridad, state=primer_estado , type_Of_Item=tipo_item, project=proyecto, create_for=creado_por_usuario)
        item.save()
        
        item_state = ItemState(item=item, state=primer_estado, date=datetime.now() ,user_name=usuario, action="Creacion de item")
        item_state.save()

        return JsonResponse({'mensaje': 'Item creado con exito!.'})
    
class ModificarItem(View):
    def get(self, request, item_id):
        item = Item.objects.get(id=item_id)
        
        context = {
            'nombre_item': item.name,
            'descripcion': item.description,
            'tipo': item.type_Of_Item.id,
            'prioridad': item.priority
        }

        return JsonResponse(context)
    
    def post(self, request, item_id):
        data = json.loads(request.body.decode('utf-8'))

        #Obtener los datos
        prioridad = data.get('prioridad')
        tipo_item_id = data.get('tipo')  
        nombre_item = data.get('name_item')
        descripcion = data.get('descripcion')

        #Obtengo el item
        item = Item.objects.get(id=item_id)

        #Actualizo el item
        item.name = nombre_item
        item.priority = prioridad
        item.description = descripcion

        tipo_nuevo  = Type_Of_Item.objects.get(id=tipo_item_id)
        tipo_actual = item.type_Of_Item

        #Verifico si el tipo enviado es igual o diferente al actual
        #Me fijo si cambio el tipo para cambiar el estado segun el tipo que se asigno
        if tipo_actual != tipo_nuevo:
            #obtengo el primer estado para asignarlo al item y asigno el nuevo tipo
            primer_estado = tipo_nuevo.workflow.state_set.first().name
            item.type_Of_Item = tipo_nuevo
            item.state = primer_estado
        
        #El proyecto no lo toco porque sigue siendo el mismo y no cambiara nunca
        #Cuando el item ya este asignado a un responsable y en un estado ya no se puede tocar el tipo
        #Se podra modificar la prioridad y el nombre
        
        #Guardo los cambios realizados
        item.save()

        #Creo el objeto para registrar que se modifico el item
        usuario = request.user.username
        item_state = ItemState(item=item, state=item.state, date=datetime.now() ,user_name=usuario, action="Modificacion de item")
        item_state.save()

        return JsonResponse({'mensaje':"Item modificado con exito!."})


class EliminarItem(View):
    def post(self, request, item_id):
        
        #Obtengo el item
        item = Item.objects.get(id=item_id)

        #Elimino los registro de actividad del item
        registros_actividad = ItemState.objects.filter(item=item)
        registros_actividad.delete()
        
        #Elimino el item
        item.delete()

        #Lo hago asi porque hay un error en la bbdd que no me toma el cascade cuando elimino un item

        return JsonResponse({'mensaje': 'Item eliminado con exito!.'})
    
    
class ObtenerActividadItem(View):
    def get(self, request, item_id):

        #Obtengo todos los registros con el id especifico
        item = Item.objects.get(id=item_id)

        registros_actividad = ItemState.objects.filter(item=item)
    
        #Creo una lista de direccionacionarios para representar cada registro
        listado_actividad = []
        for actividad in registros_actividad:
            listado_actividad.append({
                'estado': actividad.state,
                'usuario': actividad.user_name,
                'fecha': actividad.date.strftime('%Y-%m-%d | %H:%M:%S'),
                'accion': actividad.action,
            })
        
        
        return JsonResponse(listado_actividad, safe=False)


class ObtenerTodosItems(View):
    def get(self, request, project_id):
        
        
        items_creados = Item.objects.filter(project_id=project_id, asignated_to=None, completed_by=None)
        items_asignados = Item.objects.filter(project_id=project_id, create_for=None, completed_by=None)
        items_completados = Item.objects.filter(project_id=project_id, create_for=None, asignated_to=None)


        items_creados_data = []
        for item in items_creados:
            user_role = UserProjectRole.objects.filter(user=item.create_for, project=item.project).first()
            role = user_role.role if user_role else None
            items_creados_data.append({'id': item.pk, 'nombre': item.name, 'descripcion': item.description ,'prioridad': item.priority, 'estado': item.state, 'tipo': item.type_Of_Item.name, 'usuario': item.create_for.username, 'rol': role})

        items_asignados_data = []
        for item in items_asignados:
            user_role = UserProjectRole.objects.filter(user=item.asignated_to, project=item.project).first()
            role = user_role.role if user_role else None
            items_asignados_data.append({'id': item.pk, 'nombre': item.name, 'descripcion': item.description ,'prioridad': item.priority, 'estado': item.state, 'tipo': item.type_Of_Item.name, 'usuario': item.asignated_to.username, 'rol': role})

        
        items_completados_data = []
        for item in items_completados:
            user_role = UserProjectRole.objects.filter(user=item.completed_by, project=item.project).first()
            role = user_role.role if user_role else None
            items_completados_data.append({'id': item.pk, 'nombre': item.name, 'descripcion': item.description ,'prioridad': item.priority, 'estado': item.state, 'tipo': item.type_Of_Item.name, 'usuario': item.completed_by.username, 'rol': role})
        
       
        data = {
            'items_creados': items_creados_data,
            'items_asignados': items_asignados_data,
            'items_completados': items_completados_data,
        }

        return JsonResponse(data)
    
class AsignarResponsable(View):
    def get(self, request, item_id):
        
        #Obtengo el objeto item
        item = Item.objects.get(id=item_id)

        # Obtener usuarios asociados al proyecto del ítem
        usuarios = UserProjectRole.objects.filter(project=item.project)
        
        usuarios_data = [{'id': user.user.id, 'username': user.user.username} for user in usuarios]

        # Obtener el tipo de ítem asociado al ítem
        tipo_item = item.type_Of_Item

        # Obtener estados del tipo de ítem
        estados = State.objects.filter(workflow=tipo_item.workflow)
        estados_data = [{'id': estado.id, 'nombre': estado.name} for estado in estados]

        #Obtener el estado actual
        estado_actual_obj = estados.filter(name=item.state).first()
        estado_actual = {'id': estado_actual_obj.id}
        
        #Obtengo el usuario actual
        usuario_actual = None

        if item.create_for:
            usuario_actual = {'id': item.create_for.id}
        elif item.asignated_to:
            usuario_actual = {'id': item.asignated_to.id}
        elif item.completed_by:
            usuario_actual = {'id': item.completed_by.id}

        context = {
            'usuarios': usuarios_data,
            'estados': estados_data,
            'usuario_actual': usuario_actual,
            'estado_actual': estado_actual, 
        }

        return JsonResponse(context)
    
    def post(self, request, item_id):
        
        #Obtener datos 
        data = json.loads(request.body.decode('utf-8'))
        id_responsable = data['responsable']
        id_estado = data['estado']
        responsable = User.objects.get(id=id_responsable)

        #Obtener item
        item = Item.objects.get(id=item_id)
        estado = State.objects.get(id=id_estado)
        nombre_estado = estado.name

        
        if item.create_for:
            #Si tiene asignado un usuario en creado entonces significa que fue creado y debe ser asignado
            item.create_for = None
            item.asignated_to = responsable
            item.state = nombre_estado
        elif item.asignated_to:
            #En este caso si el campo asignated no es nulo entonces significa que esta reasignando un responsable
            item.asignated_to = responsable
            item.state = nombre_estado
        elif item.completed_by:
            item.asignated_to = responsable
            item.state = nombre_estado
            item.completed_by = None

        #Algo a aclarar el que asigna a los responsables siempre se fijara en creados, asignados y terminados(los que tiene complete=false)
        #Cuando toca algun item asignado significa que esta reasignando un item
        item.save()

        usuario = request.user.username
        usuario_asignado = responsable.username
        item_state = ItemState(item=item, state=item.state, date=datetime.now() ,user_name=usuario, action="Asignacion de estado a "+usuario_asignado)
        item_state.save()

        return JsonResponse({'mensaje': 'Item asignado correctamente!.'})
    

class EstadoCompletado(View):
    def post(self, request, item_id):
        item = Item.objects.get(id=item_id)

        #Obtengo el estado actual
        estado_actual = State.objects.get(name=item.state, workflow=item.type_Of_Item.workflow)
        
        # Obtener el siguiente estado (si existe)
        siguiente_estado = State.objects.filter(workflow=item.type_Of_Item.workflow, id__gt=estado_actual.id).order_by('id').first()

        # Registro la actividad de que el usuario completo el item
        item_state = ItemState(item=item, state=item.state, date=datetime.now(), user_name=item.asignated_to.username, action="Estado completado")
        item_state.save()

        if siguiente_estado.name == 'Terminado':
            item.state = siguiente_estado.name
            
        #En este caso se el usuario que tenia el item asingado termino el estado que le toco y avisa
        #Se pone en null el asignado y el create_for deberia estar en null tambien 
        responsable = item.asignated_to
        item.completed_by = responsable
        item.asignated_to = None
        #Faltaria poner en true completado en el caso de que el estado sea final
        item.save()

        # usuario = request.user.username
        if (item.state == 'Terminado'):
            item_state = ItemState(item=item, state=item.state, date=datetime.now() ,user_name=item.completed_by.username, action="Item terminado")
            item_state.save()

        return JsonResponse({'mensaje': 'Estado completado!.'})

