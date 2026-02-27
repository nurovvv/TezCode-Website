import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';

export default function ChallengesPage() {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        api.get('challenges')
            .then(res => {
                setChallenges(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setError(err.message || 'Failed to connect to server');
                setLoading(false);
            });
    }, []);

    const filteredChallenges = filter === 'all'
        ? challenges
        : challenges.filter(c => c.difficulty === filter);

    if (loading) return <div style={{ padding: '100px', textAlign: 'center', color: '#fff' }}>Loading challenges...</div>;

    const filterBtnStyle = (active) => ({
        padding: '8px 20px',
        borderRadius: '20px',
        border: active ? 'none' : '1px solid #333',
        background: active ? '#04AA6D' : 'transparent',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 600,
        transition: 'all 0.2s ease',
        fontSize: '0.9rem'
    });

    return (
        <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '100px 20px 40px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '20px' }}>Coding Challenges</h1>
                <p style={{ color: '#888', marginBottom: '40px', fontSize: '1.1rem' }}>Solve problems in any programming language, earn XP, and climb the leaderboard.</p>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
                    {['all', 'easy', 'medium', 'hard'].map(level => (
                        <button
                            key={level}
                            onClick={() => setFilter(level)}
                            style={filterBtnStyle(filter === level)}
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'grid', gap: '20px' }}>
                    {error && (
                        <div style={{ background: 'rgba(244, 67, 54, 0.1)', border: '1px solid #f44336', padding: '20px', borderRadius: '8px', color: '#f44336', marginBottom: '20px' }}>
                            <strong>Error:</strong> {error}
                            <button
                                onClick={() => window.location.reload()}
                                style={{ marginLeft: '20px', background: '#f44336', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}
                            >Retry</button>
                        </div>
                    )}

                    {filteredChallenges.map(challenge => (
                        <motion.div
                            key={challenge.id}
                            whileHover={{ scale: 1.01 }}
                            style={{
                                background: '#111', border: '1px solid #222',
                                borderRadius: '12px', padding: '24px',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>{challenge.title}</h3>
                                    {challenge.completed && (
                                        <span style={{
                                            background: 'rgba(4, 170, 109, 0.2)',
                                            color: '#04AA6D',
                                            fontSize: '0.7rem',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontWeight: 700,
                                            textTransform: 'uppercase'
                                        }}>
                                            Completed
                                        </span>
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <span style={{
                                        color: challenge.difficulty === 'easy' ? '#04AA6D' : challenge.difficulty === 'medium' ? '#ff9800' : '#f44336',
                                        fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase'
                                    }}>{challenge.difficulty}</span>
                                    <span style={{ color: '#888', fontSize: '0.9rem' }}>+{challenge.xpReward} XP</span>
                                </div>
                            </div>
                            <Link
                                to={`/challenges/${challenge.id}`}
                                style={{
                                    background: challenge.completed ? '#222' : '#04AA6D',
                                    color: '#fff', textDecoration: 'none',
                                    padding: '10px 24px', borderRadius: '8px', fontWeight: 600,
                                    border: challenge.completed ? '1px solid #333' : 'none'
                                }}
                            >
                                {challenge.completed ? 'View Challenge' : 'Solve Challenge'}
                            </Link>
                        </motion.div>
                    ))}
                    {challenges.length === 0 && <p style={{ color: '#888' }}>No challenges available yet. Check back soon!</p>}
                </div>
            </div>
        </div>
    );
}
