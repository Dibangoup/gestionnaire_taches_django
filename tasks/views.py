from django.shortcuts import render, get_object_or_404 # <-- Ajoute cet outil ici
from .models import Project

# ... (garde ta fonction project_list au-dessus) ...

def project_detail(request, id):
    # On utilise l'outil pro pour récupérer le projet (ou afficher une erreur 404)
    project = get_object_or_404(Project, id=id)
    
    # On prépare le "colis" pour la page HTML
    # Attention: cette fois on n'envoie qu'UN SEUL projet, pas une liste
    context = {
        'project': project
    }
    
    # On renvoie vers un nouveau fichier HTML qu'on va créer
    return render(request, 'tasks/project_detail.html', context)