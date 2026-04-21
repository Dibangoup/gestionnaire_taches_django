from django.urls import path
from . import views

urlpatterns = [
    # Quand quelqu'n va sur la racine de l'application, on lance ta vue 'project_list'
    path('', views.project_list, name='project_list'),
    # La nouvelle route dynamique pour le détail d'un projet
    path('projet/<int:id>/', views.project_detail, name='project_detail'),
]