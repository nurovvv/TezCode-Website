import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const s = {
    page: { minHeight: '100vh', background: '#f5f5f7', fontFamily: "'Inter', -apple-system, sans-serif" },
    container: { maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' },
    card: { background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' },
    badge: (v) => ({
        display: 'inline-block', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
        background: v === 'success' ? '#e8f9ef' : v === 'dark' ? '#1d1d1f' : '#f5f5f7',
        color: v === 'success' ? '#34c759' : v === 'dark' ? '#fff' : '#6e6e73',
    }),
    btn: { padding: '10px 20px', borderRadius: '12px', border: 'none', background: '#1d1d1f', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' },
    btnGhost: { padding: '8px 16px', borderRadius: '10px', border: '1px solid #e5e5e5', background: '#fff', color: '#1d1d1f', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' },
    tab: (active) => ({
        padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'inherit',
        background: active ? '#1d1d1f' : '#fff', color: active ? '#fff' : '#6e6e73',
    }),
};

const COURSES = [
    { id: 1, title: 'Introduction to Python', students: 432, published: true, sections: 24 },
    { id: 2, title: 'Data Structures', students: 287, published: true, sections: 30 },
    { id: 3, title: 'Web Development', students: 0, published: false, sections: 14 },
];

const STUDENTS = [
    { id: 1, name: 'Alex Nazarov', course: 'Intro to Python', progress: 85, lastActive: '2h ago' },
    { id: 2, name: 'Maria Karimova', course: 'Intro to Python', progress: 72, lastActive: '1d ago' },
    { id: 3, name: 'David Rahimov', course: 'Data Structures', progress: 45, lastActive: '3h ago' },
    { id: 4, name: 'Sara Mirzoeva', course: 'Data Structures', progress: 91, lastActive: '30m ago' },
];

export default function TeacherDashboard() {
    const { t } = useLanguage();
    const [tab, setTab] = useState('courses');

    return (
        <div style={s.page}>
            <div style={s.container}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1d1d1f', margin: 0 }}>Teacher Dashboard</h1>
                    <button style={s.btn}>+ Create Course</button>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
                    {[
                        { label: 'Total Courses', value: COURSES.length, icon: '📚' },
                        { label: 'Total Students', value: '719', icon: '👥' },
                        { label: 'Avg. Completion', value: '71%', icon: '📊' },
                        { label: 'Active Today', value: '156', icon: '🟢' },
                    ].map((stat) => (
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

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    <button onClick={() => setTab('courses')} style={s.tab(tab === 'courses')}>Courses</button>
                    <button onClick={() => setTab('students')} style={s.tab(tab === 'students')}>Students</button>
                </div>

                {/* Courses List */}
                {tab === 'courses' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {COURSES.map((c) => (
                            <div key={c.id} style={s.card}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#1d1d1f' }}>{c.title}</span>
                                            <span style={s.badge(c.published ? 'success' : 'light')}>{c.published ? 'Published' : 'Draft'}</span>
                                        </div>
                                        <p style={{ fontSize: '13px', color: '#86868b', margin: 0 }}>{c.sections} sections · {c.students} students</p>
                                    </div>
                                    <button style={s.btnGhost}>Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Students Table */}
                {tab === 'students' && (
                    <div style={s.card}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    {['Student', 'Course', 'Progress', 'Last Active'].map((h) => (
                                        <th key={h} style={{ textAlign: 'left', fontSize: '11px', color: '#86868b', fontWeight: 600, padding: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {STUDENTS.map((st) => (
                                    <tr key={st.id} style={{ borderBottom: '1px solid #fafafa' }}>
                                        <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{st.name}</td>
                                        <td style={{ padding: '12px 0', fontSize: '13px', color: '#86868b' }}>{st.course}</td>
                                        <td style={{ padding: '12px 0' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '80px', height: '6px', background: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                                                    <div style={{ width: `${st.progress}%`, height: '100%', background: '#34c759', borderRadius: '3px' }} />
                                                </div>
                                                <span style={{ fontSize: '12px', color: '#86868b' }}>{st.progress}%</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '12px 0', fontSize: '13px', color: '#86868b' }}>{st.lastActive}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
