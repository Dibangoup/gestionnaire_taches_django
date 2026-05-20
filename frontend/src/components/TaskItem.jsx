import { useState } from 'react';
import StatusBadge from './StatusBadge';
import { updateTask, deleteTask } from '../api';

export default function TaskItem({ task, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editStatus, setEditStatus] = useState(task.status);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSave = async () => {
        try {
            await updateTask(task.id, { title: editTitle, status: editStatus });
            setIsEditing(false);
            onUpdate(); // Recharger les données
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Supprimer cette tâche ?')) return;
        setIsDeleting(true);
        try {
            await deleteTask(task.id);
            onUpdate(); // Recharger les données
        } catch (err) {
            console.error(err);
            setIsDeleting(false);
        }
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setEditStatus(task.status);
        setIsEditing(false);
    };

    if (isDeleting) return null;

    return (
        <div className="task-item">
            {isEditing ? (
                <>
                    <div className="edit-row">
                        <input
                            type="text"
                            className="form-input"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            autoFocus
                        />
                        <select
                            className="form-select"
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            style={{ maxWidth: '160px' }}
                        >
                            <option value="TODO">À faire</option>
                            <option value="IN_PROGRESS">En cours</option>
                            <option value="DONE">Terminée</option>
                        </select>
                    </div>
                    <div className="task-actions">
                        <button className="btn btn-primary btn-icon" onClick={handleSave} title="Sauvegarder">
                            ✓
                        </button>
                        <button className="btn btn-ghost btn-icon" onClick={handleCancel} title="Annuler">
                            ✕
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <span className="task-title">{task.title}</span>
                    <StatusBadge status={task.status} />
                    <div className="task-actions">
                        <button
                            className="btn btn-ghost btn-icon"
                            onClick={() => setIsEditing(true)}
                            title="Modifier"
                        >
                            ✎
                        </button>
                        <button
                            className="btn btn-danger btn-icon"
                            onClick={handleDelete}
                            title="Supprimer"
                        >
                            🗑
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
