from django.shortcuts import render

# 1. Importe ton modèle Project ici (depuis le fichier models actuel '.')
from .models import Project

def project_list(request):
    # 2. Utilise ta ligne magique pour récupérer les projets et stocke-les dans une variable
    projects = Project.objects.all()
    
    # On crée un dictionnaire qu'on appelle souvent "context". 
    # C'est le colis de données qu'on va envoyer à notre page HTML.
    context = {
        'projects': projects
    }
    
    # 3. On demande à Django de "rendre" (render) la page HTML en lui passant notre colis
    return render(request, 'tasks/project_list.html', context)