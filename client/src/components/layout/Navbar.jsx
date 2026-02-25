import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import tezcodeLogo from '../../assets/tezcode-logo.png';

export default function Navbar() {
    const { language, setLanguage } = useLanguage();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const langBtn = (code) => ({
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        background: language === code ? '#1d1d1f' : 'transparent',
        color: language === code ? '#fff' : '#86868b',
        transition: 'all 0.15s',
    });

    const linkStyle = {
        fontSize: '14px',
        fontWeight: 500,
        color: '#6e6e73',
        textDecoration: 'none',
        transition: 'color 0.15s',
    };

    const signUpStyle = {
        fontSize: '13px',
        fontWeight: 600,
        color: '#fff',
        background: '#1d1d1f',
        padding: '8px 18px',
        borderRadius: '10px',
        textDecoration: 'none',
        transition: 'opacity 0.15s',
    };

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}>
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '0 24px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <img src={tezcodeLogo} alt="TezCode" style={{ height: '24px', width: 'auto' }} />
                    <span style={{ fontSize: '20px', fontWeight: 800, color: '#1d1d1f', letterSpacing: '-0.01em' }}>TezCode</span>
                </Link>

                {/* Right Side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Link to="/catalog" style={linkStyle}>Courses</Link>

                    {user ? (
                        <>
                            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                            <button
                                onClick={handleLogout}
                                style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={linkStyle}>Sign In</Link>
                            <Link to="/register" style={signUpStyle}>Sign Up</Link>
                        </>
                    )}

                    {/* Language Toggle */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#f5f5f7',
                        borderRadius: '8px',
                        padding: '2px',
                    }}>
                        <button onClick={() => setLanguage('en')} style={langBtn('en')}>EN</button>
                        <button onClick={() => setLanguage('ru')} style={langBtn('ru')}>RU</button>
                        <button onClick={() => setLanguage('tj')} style={langBtn('tj')}>TJ</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
