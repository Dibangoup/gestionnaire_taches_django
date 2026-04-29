from django.shortcuts import render, get_object_or_404,redirect
from .models import Project, Task

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
    
    # --- LE "C" DE CREATE ---
    # 1. INTERCEPTION : Si le formulaire est envoyé
    if request.method == 'POST':
        # 2. EXTRACTION
        titre_saisi = request.POST.get('title')
        statut_choisi = request.POST.get('status')
        
        # 3. SAUVEGARDE EN BASE DE DONNÉES
        Task.objects.create(
            title=titre_saisi,
            status=statut_choisi,
            project=project
        )
        
        # 4. REDIRECTION (Pour recharger la page proprement)
        return redirect('project_detail', id=project.id)
    # ----------------------------------------------
    
    # La suite normale (Si on veut juste afficher la page)
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

def update_task(request, task_id):
    # 1. On récupère la tâche
    task = get_object_or_404(Task, id=task_id)
    
    # 2. Si l'utilisateur a cliqué sur "Enregistrer" (POST)
    if request.method == 'POST':
        # On remplace les anciennes valeurs par les nouvelles
        task.title = request.POST.get('title')
        task.status = request.POST.get('status')
        
        # L'action magique : on sauvegarde la mise à jour !
        task.save()
        
        # On le renvoie sur la page de son projet
        return redirect('project_detail', id=task.project.id)
    
    # 3. Si l'utilisateur veut juste afficher la page de modification (GET)
    context = {
        'task': task
    }
    return render(request, 'tasks/task_update.html', context)