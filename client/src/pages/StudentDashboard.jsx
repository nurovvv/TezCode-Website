import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const s = {
    page: { minHeight: '100vh', background: '#f5f5f7', fontFamily: "'Inter', -apple-system, sans-serif" },
    container: { maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' },
    card: { background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' },
    cardSm: { background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', textAlign: 'center' },
};

function ProgressRing({ progress, size = 48 }) {
    const r = (size - 6) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (progress / 100) * circ;
    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e5e5" strokeWidth="4" />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#34c759" strokeWidth="4"
                strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s' }} />
        </svg>
    );
}

export default function StudentDashboard() {
    const { t } = useLanguage();

    return (
        <div style={s.page}>
            <div style={s.container}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1d1d1f', margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Welcome back 👋
                </h1>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
                    {[
                        { label: 'XP', value: '420', icon: '⚡' },
                        { label: 'Level', value: 'Beginner', icon: '🎖️' },
                        { label: 'Streak', value: '3 days', icon: '🔥' },
                        { label: 'Progress', value: '35%', icon: '📊' },
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

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                    {/* Left */}
                    <div>
                        {/* Python Course */}
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 16px' }}>My Course</h2>
                        <Link to="/course/1" style={{ textDecoration: 'none', display: 'block' }}>
                            <div style={{
                                ...s.card, cursor: 'pointer', transition: 'box-shadow 0.2s',
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 8px rgba(0,0,0,0.04)'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <ProgressRing progress={35} size={56} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 4px' }}>🐍 Introduction to Python</p>
                                        <p style={{ fontSize: '13px', color: '#86868b', margin: '0 0 8px' }}>12 chapters · 26 sections · 44 activities</p>
                                        {/* Progress bar */}
                                        <div style={{ width: '100%', height: '6px', background: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: '35%', height: '100%', background: '#34c759', borderRadius: '3px' }} />
                                        </div>
                                    </div>
                                    <span style={{
                                        padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                                        background: '#1d1d1f', color: '#fff',
                                    }}>Continue →</span>
                                </div>
                            </div>
                        </Link>

                        {/* Recent Activity */}
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', margin: '32px 0 16px' }}>Recent Activity</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { text: 'Completed "What is Python?"', time: '2 hours ago', icon: '✅', xp: '+20 XP' },
                                { text: 'Completed "Installing Python"', time: '3 hours ago', icon: '✅', xp: '+10 XP' },
                                { text: 'Started Chapter 2: Variables', time: '1 day ago', icon: '📖', xp: '' },
                                { text: 'Earned "First Login" badge', time: '2 days ago', icon: '🏆', xp: '+50 XP' },
                            ].map((item, i) => (
                                <div key={i} style={s.card}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', margin: '0 0 2px' }}>{item.text}</p>
                                            <p style={{ fontSize: '12px', color: '#aeaeb2', margin: 0 }}>{item.time}</p>
                                        </div>
                                        {item.xp && (
                                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#34c759' }}>{item.xp}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Achievements */}
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', margin: '32px 0 16px' }}>Achievements</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                            {[
                                { icon: '🔥', name: '7-Day Streak', desc: 'Study 7 days in a row', locked: true },
                                { icon: '⚡', name: 'Speed Learner', desc: 'Complete 5 activities in a row', locked: true },
                                { icon: '🏆', name: 'First Login', desc: 'Start your journey', locked: false },
                                { icon: '💯', name: 'Perfect Score', desc: 'Get 100% on an activity', locked: true },
                            ].map((a) => (
                                <div key={a.name} style={{ ...s.cardSm, opacity: a.locked ? 0.4 : 1 }}>
                                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{a.icon}</div>
                                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 4px' }}>{a.name}</p>
                                    <p style={{ fontSize: '11px', color: '#86868b', margin: 0 }}>{a.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Leaderboard */}
                    <div>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 16px' }}>Leaderboard</h2>
                        <div style={s.card}>
                            {[
                                { rank: 1, name: 'Alex N.', xp: 2450 },
                                { rank: 2, name: 'Maria K.', xp: 2100 },
                                { rank: 3, name: 'David R.', xp: 1900 },
                                { rank: 4, name: 'You', xp: 420, isYou: true },
                                { rank: 5, name: 'Sara M.', xp: 380 },
                            ].map((e) => (
                                <div key={e.rank} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '10px 12px', borderRadius: '10px',
                                    background: e.isYou ? 'rgba(29,29,31,0.03)' : 'transparent', marginBottom: '4px',
                                }}>
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#86868b', width: '24px' }}>#{e.rank}</span>
                                    <span style={{ flex: 1, fontSize: '13px', fontWeight: e.isYou ? 700 : 500, color: e.isYou ? '#1d1d1f' : '#6e6e73' }}>{e.name}</span>
                                    <span style={{
                                        display: 'inline-block', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                                        background: e.rank <= 3 ? '#1d1d1f' : '#f5f5f7', color: e.rank <= 3 ? '#fff' : '#6e6e73',
                                    }}>{e.xp} XP</span>
                                </div>
                            ))}
                        </div>

                        {/* Course Stats */}
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', margin: '32px 0 16px' }}>Course Chapters</h2>
                        <div style={s.card}>
                            {['Getting Started', 'Variables & Data Types', 'Control Flow', 'Functions', 'Data Structures', 'File Handling', 'Error Handling', 'Modules', 'OOP', 'Advanced Topics', 'Mini Projects', "What's Next?"].map((ch, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: i < 11 ? '1px solid #fafafa' : 'none' }}>
                                    <span style={{ width: '20px', height: '20px', borderRadius: '6px', background: i < 2 ? '#34c759' : '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', fontWeight: 700, flexShrink: 0 }}>
                                        {i < 2 ? '✓' : ''}
                                    </span>
                                    <span style={{ fontSize: '12px', color: i < 2 ? '#1d1d1f' : '#aeaeb2', fontWeight: i < 2 ? 600 : 400 }}>{ch}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
