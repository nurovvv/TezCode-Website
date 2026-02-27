import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

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
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/dashboard').then(res => {
            setData(res.data);
            setLoading(false);
        }).catch(err => {
            console.error('Failed to fetch dashboard:', err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    if (!data) return <div style={{ padding: '40px', textAlign: 'center' }}>Failed to load dashboard. Try signing in again.</div>;

    const stats = [
        { label: 'XP', value: data.stats.xp, icon: '⚡' },
        { label: 'Level', value: data.stats.level, icon: '🎖️' },
        { label: 'Streak', value: `${data.stats.streak} days`, icon: '🔥' },
        { label: 'Progress', value: `${data.stats.progress}%`, icon: '📊' },
    ];

    return (
        <div style={s.page}>
            <div style={s.container}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1d1d1f', marginBottom: '24px' }}>{t('dashboard.welcome')} 👋</h1>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                    {stats.map((stat) => (
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
                        {/* Course Progress */}
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 16px' }}>My Course</h2>
                        {data.course ? (
                            <Link to={`/course/${data.course.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                                <div style={{
                                    ...s.card, cursor: 'pointer', transition: 'box-shadow 0.2s',
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 8px rgba(0,0,0,0.04)'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <ProgressRing progress={data.course.progress} size={56} />
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 4px' }}>🐍 {data.course.title}</p>
                                            <p style={{ fontSize: '13px', color: '#86868b', margin: '0 0 8px' }}>{data.course.totalActivities} activities</p>
                                            {/* Progress bar */}
                                            <div style={{ width: '100%', height: '6px', background: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ width: `${data.course.progress}%`, height: '100%', background: '#34c759', borderRadius: '3px' }} />
                                            </div>
                                        </div>
                                        <span style={{
                                            padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                                            background: '#1d1d1f', color: '#fff',
                                        }}>Continue →</span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <Link to="/catalog" style={{ textDecoration: 'none' }}>
                                <div style={s.card}>You haven't enrolled in any courses yet. Explore catalog!</div>
                            </Link>
                        )}

                        {/* Recent Activity */}
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', margin: '32px 0 16px' }}>Recent Activity</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {data.recentActivities && data.recentActivities.length > 0 ? data.recentActivities.map((item, i) => (
                                <div key={i} style={s.card}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', margin: '0 0 2px' }}>{item.text}</p>
                                            <p style={{ fontSize: '12px', color: '#aeaeb2', margin: 0 }}>{new Date(item.time).toLocaleDateString()}</p>
                                        </div>
                                        {item.xp && (
                                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#34c759' }}>{item.xp}</span>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div style={{ color: '#86868b', fontSize: '14px' }}>No recent activity. Start learning!</div>
                            )}
                        </div>

                        {/* Achievements */}
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', margin: '32px 0 16px' }}>Achievements</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                            {[
                                { icon: '🔥', name: '7-Day Streak', desc: 'Study 7 days in a row', locked: (data.stats.streak || 0) < 7 },
                                { icon: '⚡', name: 'Speed Learner', desc: 'Complete 5 activities', locked: (data.stats.totalCompleted || 0) < 5 },
                                { icon: '🏆', name: 'First Login', desc: 'Start your journey', locked: false },
                                { icon: '💯', name: 'Perfect Score', desc: 'Get 100% on a challenge', locked: !data.stats.hasPerfectScore },
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
                            {data.leaderboard && data.leaderboard.map((e) => (
                                <div key={e.rank} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '10px 12px', borderRadius: '10px',
                                    background: e.isYou ? 'rgba(29,29,31,0.03)' : 'transparent', marginBottom: '4px',
                                }}>
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#86868b', width: '24px' }}>#{e.rank}</span>
                                    <span style={{ flex: 1, fontSize: '13px', fontWeight: e.isYou ? 700 : 500, color: e.isYou ? '#1d1d1f' : '#6e6e73' }}>{e.isYou ? 'Вы' : e.name}</span>
                                    <span style={{
                                        display: 'inline-block', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                                        background: e.rank <= 3 ? '#1d1d1f' : '#f5f5f7', color: e.rank <= 3 ? '#fff' : '#6e6e73',
                                    }}>{e.xp} XP</span>
                                </div>
                            ))}
                        </div>

                        {/* Course Chapters */}
                        {data.course && data.course.chapters && (
                            <>
                                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', margin: '32px 0 16px' }}>Course Chapters</h2>
                                <div style={s.card}>
                                    {data.course.chapters.map((ch, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: i < data.course.chapters.length - 1 ? '1px solid #fafafa' : 'none' }}>
                                            <span style={{ width: '20px', height: '20px', borderRadius: '6px', background: ch.completed ? '#34c759' : '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', fontWeight: 700, flexShrink: 0 }}>
                                                {ch.completed ? '✓' : ''}
                                            </span>
                                            <span style={{ fontSize: '12px', color: ch.completed ? '#1d1d1f' : '#aeaeb2', fontWeight: ch.completed ? 600 : 400 }}>{ch.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
