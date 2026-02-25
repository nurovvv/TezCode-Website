import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-surface">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <Outlet />
            </main>
        </div>
    );
}
