import { useState } from 'react';

const s = {
    page: { minHeight: '100vh', background: '#f5f5f7', fontFamily: "'Inter', -apple-system, sans-serif" },
    container: { maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' },
    card: { background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' },
    badge: (v) => ({
        display: 'inline-block', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 600,
        background: v === 'success' ? '#e8f9ef' : v === 'dark' ? '#1d1d1f' : '#f5f5f7',
        color: v === 'success' ? '#34c759' : v === 'dark' ? '#fff' : '#6e6e73',
    }),
    btnGhost: { padding: '8px 16px', borderRadius: '10px', border: '1px solid #e5e5e5', background: '#fff', color: '#1d1d1f', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' },
};

const STATS = [
    { label: 'Total Users', value: '2,847', icon: '👥' },
    { label: 'Active Courses', value: '24', icon: '📚' },
    { label: 'Activities Done', value: '15.2K', icon: '✅' },
    { label: 'Revenue', value: '$12,450', icon: '💰' },
];

const USERS = [
    { id: 1, name: 'Alex Nazarov', email: 'alex@mail.com', role: 'student', status: 'active' },
    { id: 2, name: 'Madina Karimova', email: 'madina@mail.com', role: 'teacher', status: 'active' },
    { id: 3, name: 'David Rahimov', email: 'david@mail.com', role: 'student', status: 'active' },
    { id: 4, name: 'Sara Mirzoeva', email: 'sara@mail.com', role: 'student', status: 'inactive' },
    { id: 5, name: 'Farrukh Saidov', email: 'farrukh@mail.com', role: 'teacher', status: 'active' },
    { id: 6, name: 'Zuhra Nazarova', email: 'zuhra@mail.com', role: 'admin', status: 'active' },
];

const roleBadge = { student: 'light', teacher: 'dark', admin: 'success' };

export default function AdminDashboard() {
    const [search, setSearch] = useState('');
    const filtered = USERS.filter(
        (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={s.page}>
            <div style={s.container}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1d1d1f', margin: '0 0 24px' }}>Admin Dashboard</h1>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
                    {STATS.map((stat) => (
                        <div key={stat.label} style={s.card}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '24px' }}>{stat.icon}</span>
                                <div>
                                    <p style={{ fontSize: '11px', color: '#86868b', margin: '0 0 2px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
                                    <p style={{ fontSize: '20px', fontWeight: 800, color: '#1d1d1f', margin: 0 }}>{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* User Management */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', margin: 0 }}>User Management</h2>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            padding: '10px 16px', borderRadius: '12px', border: '1.5px solid #e5e5e5', background: '#fff',
                            fontSize: '13px', color: '#1d1d1f', width: '240px', outline: 'none', fontFamily: 'inherit',
                        }}
                    />
                </div>

                <div style={s.card}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                {['Name', 'Email', 'Role', 'Status', ''].map((h) => (
                                    <th key={h} style={{ textAlign: h === '' ? 'right' : 'left', fontSize: '11px', color: '#86868b', fontWeight: 600, padding: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((u) => (
                                <tr key={u.id} style={{ borderBottom: '1px solid #fafafa' }}>
                                    <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{u.name}</td>
                                    <td style={{ padding: '12px 0', fontSize: '13px', color: '#86868b' }}>{u.email}</td>
                                    <td style={{ padding: '12px 0' }}><span style={s.badge(roleBadge[u.role])}>{u.role}</span></td>
                                    <td style={{ padding: '12px 0' }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 500, color: u.status === 'active' ? '#34c759' : '#86868b' }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: u.status === 'active' ? '#34c759' : '#ccc' }} />
                                            {u.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 0', textAlign: 'right' }}><button style={s.btnGhost}>Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
