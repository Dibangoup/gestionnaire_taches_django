import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProject } from '../api';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

export default function ProjectDetailPage() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => setRefreshKey(prev => prev + 1);

    useEffect(() => {
        let active = true;
        const loadProject = async () => {
            try {
                const data = await fetchProject(id);
                if (active) setProject(data);
            } catch (err) {
                if (active) setError(err.message);
            } finally {
                if (active) setLoading(false);
            }
        };
        loadProject();
        return () => {
            active = false;
        };
    }, [id, refreshKey]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">⚠️</div>
                <p className="empty-state-text">{error}</p>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Retour aux projets
                </Link>
            </div>
        );
    }

    const tasks = project.tasks || [];
    const todoCount = tasks.filter(t => t.status === 'TODO').length;
    const progressCount = tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const doneCount = tasks.filter(t => t.status === 'DONE').length;

    return (
        <>
            {/* En-tête du projet */}
            <div className="project-detail-header">
                <Link to="/" className="back-button" title="Retour">
                    ←
                </Link>
                <div className="project-detail-info">
                    <h1 className="page-title">{project.name}</h1>
                    {project.description && (
                        <p className="project-detail-desc">{project.description}</p>
                    )}
                </div>
            </div>

            {/* Résumé des statuts */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <span className="status-badge todo">○ {todoCount} à faire</span>
                <span className="status-badge in-progress">◑ {progressCount} en cours</span>
                <span className="status-badge done">● {doneCount} terminée{doneCount !== 1 ? 's' : ''}</span>
            </div>

            {/* Liste des tâches */}
            <div className="tasks-section">
                <div className="tasks-section-header">
                    <h2 className="tasks-section-title">Tâches</h2>
                    <span className="tasks-count-badge">{tasks.length}</span>
                </div>

                {tasks.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📝</div>
                        <p className="empty-state-text">Aucune tâche créée</p>
                        <p className="empty-state-subtext">
                            Utilisez le formulaire ci-dessous pour ajouter votre première tâche.
                        </p>
                    </div>
                ) : (
                    <div className="tasks-list">
                        {tasks.map((task) => (
                            <TaskItem key={task.id} task={task} onUpdate={triggerRefresh} />
                        ))}
                    </div>
                )}
            </div>

            {/* Formulaire d'ajout */}
            <TaskForm projectId={project.id} onTaskCreated={triggerRefresh} />
        </>
    );
}
