const API_BASE = 'http://127.0.0.1:8000';

/**
 * Module centralisé pour tous les appels API vers Django.
 */

// --- PROJETS ---

export async function fetchProjects() {
    const res = await fetch(`${API_BASE}/api/projets/`);
    if (!res.ok) throw new Error('Erreur lors du chargement des projets');
    return res.json();
}

export async function fetchProject(id) {
    const res = await fetch(`${API_BASE}/api/projets/${id}/`);
    if (!res.ok) throw new Error('Projet introuvable');
    return res.json();
}

// --- TÂCHES ---

export async function createTask(taskData) {
    const res = await fetch(`${API_BASE}/api/taches/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
    });
    if (!res.ok) throw new Error('Erreur lors de la création de la tâche');
    return res.json();
}

export async function updateTask(taskId, taskData) {
    const res = await fetch(`${API_BASE}/api/taches/${taskId}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
    });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour');
    return res.json();
}

export async function deleteTask(taskId) {
    const res = await fetch(`${API_BASE}/api/taches/${taskId}/supprimer/`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Erreur lors de la suppression');
    return true;
}
