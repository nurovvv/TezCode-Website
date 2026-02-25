import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const { t } = useLanguage();
    const { register } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
        setLoading(false);
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1.5px solid #e5e5e5',
        background: '#fff',
        fontSize: '14px',
        color: '#1d1d1f',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
    };

    const labelStyle = {
        display: 'block',
        fontSize: '13px',
        fontWeight: 600,
        color: '#1d1d1f',
        marginBottom: '6px',
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f5f5f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            fontFamily: "'Inter', -apple-system, sans-serif",
        }}>
            <div style={{ width: '100%', maxWidth: '420px' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Link to="/" style={{ fontSize: '24px', fontWeight: 800, color: '#1d1d1f', textDecoration: 'none' }}>
                        ZiyoBook
                    </Link>
                </div>

                {/* Card */}
                <div style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '36px 32px',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 24px' }}>
                        Create Account
                    </h1>

                    {error && (
                        <div style={{
                            background: '#fff2f0',
                            color: '#ff3b30',
                            fontSize: '13px',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            marginBottom: '16px',
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={labelStyle}>Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderColor = '#1d1d1f'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={labelStyle}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderColor = '#1d1d1f'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={labelStyle}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderColor = '#1d1d1f'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={labelStyle}>Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderColor = '#1d1d1f'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '12px',
                                border: 'none',
                                background: '#1d1d1f',
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.6 : 1,
                                fontFamily: 'inherit',
                            }}
                        >
                            {loading ? '...' : 'Create Account'}
                        </button>
                    </form>

                    <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#86868b' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#1d1d1f', fontWeight: 600, textDecoration: 'none' }}>
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
