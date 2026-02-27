import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

export default function LeaderboardPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('leaderboard')
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{ padding: '100px', textAlign: 'center', color: '#fff' }}>Loading leaderboard...</div>;

    return (
        <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '100px 20px 40px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 10px', background: 'linear-gradient(90deg, #04AA6D, #28a745)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Global Leaderboard</h1>
                    <p style={{ color: '#888', fontSize: '1.1rem' }}>Top coders on TezCode. Solve challenges to earn XP and climb the ranks!</p>
                </div>

                <div style={{ background: '#111', borderRadius: '16px', border: '1px solid #222', overflow: 'hidden' }}>
                    {users.map((user, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={user.id}
                            style={{
                                display: 'flex', alignItems: 'center', padding: '20px 30px',
                                borderBottom: index < users.length - 1 ? '1px solid #222' : 'none',
                                background: index === 0 ? 'rgba(4, 170, 109, 0.1)' : 'transparent'
                            }}
                        >
                            <div style={{
                                width: '40px', fontSize: '1.5rem', fontWeight: 800,
                                color: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#666'
                            }}>
                                #{index + 1}
                            </div>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#333', overflow: 'hidden', marginRight: '20px' }}>
                                <img src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: '0 0 5px', fontSize: '1.2rem', fontWeight: 600 }}>{user.name}</h3>
                                <span style={{ fontSize: '0.85rem', color: '#888', background: '#222', padding: '3px 8px', borderRadius: '12px', textTransform: 'capitalize' }}>{user.level || 'Beginner'}</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <strong style={{ fontSize: '1.5rem', color: '#04AA6D' }}>{user.xp}</strong>
                                <div style={{ fontSize: '0.8rem', color: '#888' }}>XP</div>
                            </div>
                        </motion.div>
                    ))}
                    {users.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No users on the leaderboard yet.</div>}
                </div>
            </div>
        </div>
    );
}
