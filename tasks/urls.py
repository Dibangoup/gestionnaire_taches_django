from django.urls import path
from . import views

urlpatterns = [
    # 1. La route de la page d'accueil
    # Si l'utilisateur va sur http://127.0.0.1:8000/
    # Django lance la fonction 'project_list' dans views.py
    path('', views.project_list, name='project_list'),
    
    # 2. La route dynamique pour la page de détail d'un projet
    # Si l'utilisateur va sur http://127.0.0.1:8000/projet/1/
    # Django capture le '1', le stocke dans la variable <id>, 
    # et lance la fonction 'project_detail' dans views.py
    path('projet/<int:id>/', views.project_detail, name='project_detail'),
    # La route pour supprimer une tâche spécifique
    path('tache/<int:task_id>/supprimer/', views.delete_task, name='delete_task'),
]