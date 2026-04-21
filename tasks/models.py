from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # Un projet appartient à un utilisateur (le chef de projet)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')

    def __str__(self):
        return self.name

class Task(models.Model):
    STATUS_CHOICES = (
        ('TODO', 'À faire'),
        ('IN_PROGRESS', 'En cours'),
        ('DONE', 'Terminée'),
    )
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='TODO')
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Une tâche appartient à un projet
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    # Une tâche peut être assignée à un utilisateur
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title