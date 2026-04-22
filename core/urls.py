from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Route par défaut vers l'interface d'administration de Django
    path('admin/', admin.site.urls),
    
    # On dit à Django : "Pour toutes les autres adresses (la chaîne vide ''), 
    # va lire le fichier de routage spécifique de l'application 'tasks'."
    path('', include('tasks.urls')), 
]