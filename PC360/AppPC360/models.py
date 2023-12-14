
from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length = 50)
    
    def __str__(self):
        return self.name


class UserProjectRole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    role = models.CharField(max_length=50, blank=True, null=True)



class Workflow(models.Model):
    name = models.CharField(max_length = 255)
    
    def __str__(self):
        return self.name
    
    def get_states(self):
        return self.states.all()


class Type_Of_Item(models.Model):
    name = models.CharField(max_length = 50)
    workflow = models.ForeignKey(Workflow, on_delete = models.SET_NULL, null = True)


class Item(models.Model):
    name = models.CharField(max_length = 50)
    description = models.TextField(blank=True, null=True)
    priority = models.CharField(max_length = 50)
    state = models.CharField(max_length = 50)
    type_Of_Item = models.ForeignKey(Type_Of_Item, on_delete = models.CASCADE)
    project = models.ForeignKey(Project, on_delete = models.CASCADE, default = None)
    create_for = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items_creados', null=True)
    asignated_to = models.ForeignKey(User, on_delete = models.SET_NULL, related_name='items_asignados', null = True)
    completed = models.BooleanField(default = False)
    completed_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='items_completados',null=True)

    def __str__(self):
        return self.name



class State(models.Model):
    name = models.CharField(max_length = 50)
    workflow = models.ForeignKey(Workflow, on_delete = models.CASCADE)

    def __str__(self):
        return self.name
    


class ItemState(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=True)
    state = models.CharField(max_length=50)
    date = models.DateTimeField()
    user_name = models.CharField(max_length=100, null=True)
    action = models.CharField(max_length=100)