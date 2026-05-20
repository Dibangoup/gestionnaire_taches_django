import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<ProjectListPage />} />
                    <Route path="/projet/:id" element={<ProjectDetailPage />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
