from django.contrib import admin
from django.urls import path, include # <-- Ajoute include ici

urlpatterns = [
    path('admin/', admin.site.urls),
    # On dit : "Pour toutes les adresses de base, va regarder dans le fichier urls de tasks"
    path('', include('tasks.urls')), 
]