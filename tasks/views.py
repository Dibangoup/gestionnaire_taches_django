from django.shortcuts import render, get_object_or_404
from .models import Project

# --- 1. La fonction pour la page d'accueil (Celle qui a dû disparaître !) ---
def project_list(request):
    projects = Project.objects.all()
    context = {
        'projects': projects
    }
    return render(request, 'tasks/project_list.html', context)


# --- 2. La nouvelle fonction pour la page de détail ---
def project_detail(request, id):
    project = get_object_or_404(Project, id=id)
    context = {
        'project': project
    }
    return render(request, 'tasks/project_detail.html', context)