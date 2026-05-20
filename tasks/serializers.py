from rest_framework import serializers
from .models import Project, Task


class TaskSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Task (Tâche)."""
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'status_display', 'created_at', 'project']
        read_only_fields = ['id', 'created_at']


class ProjectSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Project (Projet)."""
    tasks = TaskSerializer(many=True, read_only=True)
    task_count = serializers.SerializerMethodField()
    owner_name = serializers.CharField(source='owner.username', read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'created_at', 'owner_name', 'tasks', 'task_count']
        read_only_fields = ['id', 'created_at']

    def get_task_count(self, obj):
        return obj.tasks.count()
