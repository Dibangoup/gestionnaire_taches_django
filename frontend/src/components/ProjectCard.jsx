import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
    return (
        <Link to={`/projet/${project.id}`} className="project-card">
            <h3 className="project-card-name">{project.name}</h3>
            <p className="project-card-desc">
                {project.description || 'Aucune description'}
            </p>
            <div className="project-card-footer">
                <span className="project-task-count">
                    📋 {project.task_count} tâche{project.task_count !== 1 ? 's' : ''}
                </span>
                <span className="project-card-arrow">→</span>
            </div>
        </Link>
    );
}
