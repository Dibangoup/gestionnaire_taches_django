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

def delete_task(request, task_id):
    # 1. On récupère la tâche avec le bon Modèle et la bonne variable
    task = get_object_or_404(Task, id=task_id)
    
    # 2. Sécurité : On vérifie que c'est bien une requête POST
    if request.method == 'POST':
        # On sauvegarde l'id du projet AVANT de supprimer la tâche 
        projet_id = task.project.id
        
        # 3. L'action fatale : on supprime la tâche
        task.delete()
        
        # 4. On redirige vers la page de détail du projet
        return redirect('project_detail', id=projet_id)
    
    # Si c'est un simple GET, on redirige sans rien faire
    return redirect('project_detail', id=task.project.id)