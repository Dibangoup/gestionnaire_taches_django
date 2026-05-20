import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <span className="logo-icon">✦</span>
                TaskFlow
            </Link>
            <div className="navbar-links">
                <Link to="/" className="navbar-link active">
                    Projets
                </Link>
            </div>
        </nav>
    );
}
