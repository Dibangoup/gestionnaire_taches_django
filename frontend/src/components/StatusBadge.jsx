export default function StatusBadge({ status }) {
    const config = {
        'TODO': { label: 'À faire', className: 'todo', icon: '○' },
        'IN_PROGRESS': { label: 'En cours', className: 'in-progress', icon: '◑' },
        'DONE': { label: 'Terminée', className: 'done', icon: '●' },
    };

    const { label, className, icon } = config[status] || config['TODO'];

    return (
        <span className={`status-badge ${className}`}>
            {icon} {label}
        </span>
    );
}
