import { useState, useEffect } from 'react';
import { fetchProjects } from '../api';
import ProjectCard from '../components/ProjectCard';

export default function ProjectListPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                if (active) setProjects(data);
            } catch (err) {
                if (active) setError(err.message);
            } finally {
                if (active) setLoading(false);
            }
        };
        loadProjects();
        return () => {
            active = false;
        };
    }, []);

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
                <p className="empty-state-text">Erreur : {error}</p>
                <p className="empty-state-subtext">Vérifiez que le serveur Django est lancé sur le port 8000.</p>
            </div>
        );
    }

    return (
        <>
            <div className="page-header">
                <h1 className="page-title">
                    Mes <span className="page-title-accent">Projets</span>
                </h1>
                <p className="page-subtitle">
                    {projects.length} projet{projects.length !== 1 ? 's' : ''} en cours
                </p>
            </div>

            {projects.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📂</div>
                    <p className="empty-state-text">Aucun projet pour le moment</p>
                    <p className="empty-state-subtext">
                        Créez un projet via l'interface d'administration Django.
                    </p>
                </div>
            ) : (
                <div className="projects-grid">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </>
    );
}
