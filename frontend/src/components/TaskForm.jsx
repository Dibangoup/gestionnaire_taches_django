import { useState } from 'react';
import { createTask } from '../api';

export default function TaskForm({ projectId, onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('TODO');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsSubmitting(true);
        try {
            await createTask({
                title: title.trim(),
                status,
                project: projectId,
            });
            setTitle('');
            setStatus('TODO');
            onTaskCreated(); // Recharger les données
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="task-form">
            <h3 className="task-form-title">➕ Ajouter une nouvelle tâche</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="task-title">Titre</label>
                        <input
                            id="task-title"
                            type="text"
                            className="form-input"
                            placeholder="Ex: Créer la page d'accueil..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ maxWidth: '200px' }}>
                        <label className="form-label" htmlFor="task-status">Statut</label>
                        <select
                            id="task-status"
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="TODO">À faire</option>
                            <option value="IN_PROGRESS">En cours</option>
                            <option value="DONE">Terminée</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting || !title.trim()}
                        style={{ alignSelf: 'flex-end', whiteSpace: 'nowrap' }}
                    >
                        {isSubmitting ? '...' : '＋ Ajouter'}
                    </button>
                </div>
            </form>
        </div>
    );
}
