import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
    const { id } = useParams();
    const { user: currentUser, updateUser } = useAuth();
    const [profileUser, setProfileUser] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showCamera, setShowCamera] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        githubUrl: '',
        linkedinUrl: '',
        twitterUrl: '',
        instagramUrl: ''
    });

    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            console.log(`[ProfilePage] Fetching profile for ID: ${id || 'me'}`);
            setLoading(true);
            try {
                // Determine if we are viewing "me" or a specific ID
                const currentUserId = currentUser?.id?.toString();
                const requestedId = id?.toString();

                if (!requestedId || (currentUserId && requestedId === currentUserId)) {
                    console.log('[ProfilePage] Fetching latest "me" profile');
                    setIsOwnProfile(true);
                    const res = await api.get('auth/me');
                    const latestUser = res.data.user;
                    console.log('[ProfilePage] Received me profile with contributions:', latestUser.contributions?.length);
                    setProfileUser(latestUser);

                    setFormData({
                        name: latestUser.name || '',
                        githubUrl: latestUser.githubUrl || '',
                        linkedinUrl: latestUser.linkedinUrl || '',
                        twitterUrl: latestUser.twitterUrl || '',
                        instagramUrl: latestUser.instagramUrl || ''
                    });
                } else {
                    console.log(`[ProfilePage] Viewing public profile for ID: ${id}`);
                    setIsOwnProfile(false);
                    const res = await api.get(`auth/user/${id}`);
                    console.log('[ProfilePage] Received public profile with contributions:', res.data.user.contributions?.length);
                    setProfileUser(res.data.user);
                }
            } catch (err) {
                console.error('[ProfilePage] Error fetching profile:', err);
                setMessage({ type: 'error', text: 'User not found' });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'File size too large (max 5MB)' });
            return;
        }

        const uploadData = new FormData();
        uploadData.append('avatar', file);

        setUploading(true);
        try {
            const res = await api.post('auth/upload-avatar', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            updateUser({ avatarUrl: res.data.avatarUrl });
            setMessage({ type: 'success', text: 'Avatar updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to upload image' });
        } finally {
            setUploading(false);
        }
    };

    const startCamera = async () => {
        setShowCamera(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Could not access camera' });
            setShowCamera(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setShowCamera(false);
    };

    const capturePhoto = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        const context = canvasRef.current.getContext('2d');
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);

        canvasRef.current.toBlob(async (blob) => {
            const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
            const uploadData = new FormData();
            uploadData.append('avatar', file);

            setUploading(true);
            try {
                const res = await api.post('auth/upload-avatar', uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                updateUser({ avatarUrl: res.data.avatarUrl });
                setMessage({ type: 'success', text: 'Photo captured and updated!' });
                stopCamera();
            } catch (err) {
                setMessage({ type: 'error', text: 'Failed to upload photo' });
            } finally {
                setUploading(false);
            }
        }, 'image/jpeg');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await api.put('auth/profile', formData);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            if (res.data.user) updateUser(res.data.user);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.2s',
        marginBottom: '20px'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontSize: '0.9rem',
        fontWeight: 500,
        color: '#aaa'
    };

    const contributionLabelStyle = {
        fontSize: '0.85rem',
        color: '#aaa',
        marginBottom: '10px'
    };

    const ContributionGraph = ({ data }) => {
        const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: '' });
        const today = new Date();
        const yearAgo = new Date();
        yearAgo.setUTCFullYear(today.getUTCFullYear() - 1);
        yearAgo.setUTCHours(0, 0, 0, 0);

        // Generate days aligned to UTC Sunday
        const days = [];
        let curr = new Date(Date.UTC(yearAgo.getUTCFullYear(), yearAgo.getUTCMonth(), yearAgo.getUTCDate()));
        curr.setUTCDate(curr.getUTCDate() - curr.getUTCDay()); // Align to UTC Sunday

        // Goal: Fill exactly 53 weeks (371 days) or until today
        const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
        while (curr <= end) {
            days.push(new Date(curr));
            curr.setUTCDate(curr.getUTCDate() + 1);
        }

        // Map data to a fast-lookup object using YYYY-MM-DD
        const counts = {};
        if (data && Array.isArray(data)) {
            data.forEach(d => {
                // Backend DATE() returns YYYY-MM-DD
                counts[d.date] = (counts[d.date] || 0) + parseInt(d.count);
            });
        }

        const getColor = (count) => {
            if (!count || count <= 0) return '#161b22';
            // Per user request: 1 = light green, more = darker
            if (count === 1) return '#9be9a8'; // Light Green
            if (count < 4) return '#40c463';
            if (count < 8) return '#30a14e';
            return '#216e39'; // Darkest Green
        };

        const formatDate = (date) => {
            const y = date.getUTCFullYear();
            const m = String(date.getUTCMonth() + 1).padStart(2, '0');
            const d = String(date.getUTCDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        };

        const getFullDateDisplay = (date) => {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const d = date.getUTCDate();
            let suffix = 'th';
            if (d === 1 || d === 21 || d === 31) suffix = 'st';
            else if (d === 2 || d === 22) suffix = 'nd';
            else if (d === 3 || d === 23) suffix = 'rd';
            return `${months[date.getUTCMonth()]} ${d}${suffix}`;
        };

        const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Calculate month positions
        const monthPositions = [];
        let lastMonth = -1;
        days.forEach((day, i) => {
            if (i % 7 === 0) { // Only check start of weeks
                const m = day.getUTCMonth();
                if (m !== lastMonth) {
                    monthPositions.push({ name: monthsShort[m], index: Math.floor(i / 7) });
                    lastMonth = m;
                }
            }
        });

        const totalContributions = (data && Array.isArray(data))
            ? data.reduce((sum, d) => sum + parseInt(d.count), 0)
            : 0;

        const handleMouseEnter = (e, count, date) => {
            const rect = e.target.closest('.contribution-container').getBoundingClientRect();
            setTooltip({
                visible: true,
                x: e.clientX - rect.left,
                y: e.clientY - rect.top - 40,
                content: `${count} contributions on ${getFullDateDisplay(date)}.`
            });
        };

        return (
            <div className="contribution-container" style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', padding: '24px', color: '#c9d1d9', width: '100%', boxSizing: 'border-box', overflow: 'hidden', position: 'relative' }}>
                {tooltip.visible && (
                    <div style={{
                        position: 'absolute',
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: 'translateX(-50%)',
                        background: '#30363d',
                        color: '#fff',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                        zIndex: 10,
                        pointerEvents: 'none'
                    }}>
                        {tooltip.content}
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ fontSize: '1rem' }}>
                        <strong>{totalContributions} contributions</strong> in the last year
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#8b949e', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Contribution settings <i className="fas fa-caret-down"></i>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'thin', scrollbarColor: '#30363d transparent' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '34px 0 10px', fontSize: '0.75rem', color: '#8b949e', position: 'sticky', left: 0, background: '#0d1117', zIndex: 1, paddingRight: '10px' }}>
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                    </div>

                    <div style={{ flex: 1, minWidth: 'max-content' }}>
                        <div style={{ position: 'relative', height: '20px', fontSize: '0.75rem', color: '#8b949e', marginBottom: '8px' }}>
                            {monthPositions.map((m, idx) => (
                                <span key={idx} style={{ position: 'absolute', left: `${m.index * 14}px` }}>{m.name}</span>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'repeat(7, 10px)', gap: '4px' }}>
                            {days.map((day, i) => {
                                const dateKey = formatDate(day);
                                const count = counts[dateKey] || 0;
                                return (
                                    <div
                                        key={i}
                                        onMouseEnter={(e) => handleMouseEnter(e, count, day)}
                                        onMouseMove={(e) => handleMouseEnter(e, count, day)}
                                        onMouseLeave={() => setTooltip({ ...tooltip, visible: false })}
                                        style={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '2px',
                                            background: getColor(count),
                                            border: '1px solid rgba(27,31,35,0.06)',
                                            cursor: 'pointer'
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '0.75rem', color: '#8b949e', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ cursor: 'pointer' }}>Learn how we count contributions</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>Less</span>
                        <div style={{ width: '10px', height: '10px', background: '#161b22', borderRadius: '2px', border: '1px solid rgba(27,31,35,0.06)' }}></div>
                        <div style={{ width: '10px', height: '10px', background: '#9be9a8', borderRadius: '2px', border: '1px solid rgba(27,31,35,0.06)' }}></div>
                        <div style={{ width: '10px', height: '10px', background: '#40c463', borderRadius: '2px', border: '1px solid rgba(27,31,35,0.06)' }}></div>
                        <div style={{ width: '10px', height: '10px', background: '#30a14e', borderRadius: '2px', border: '1px solid rgba(27,31,35,0.06)' }}></div>
                        <div style={{ width: '10px', height: '10px', background: '#216e39', borderRadius: '2px', border: '1px solid rgba(27,31,35,0.06)' }}></div>
                        <span>More</span>
                    </div>
                </div>
            </div>
        );
    };

    if (loading && !profileUser) {
        return (
            <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!profileUser && !loading) {
        return (
            <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <h2 style={{ fontSize: '2rem' }}>User not found</h2>
                <button onClick={() => window.history.back()} style={{ background: '#04AA6D', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer' }}>Go Back</button>
            </div>
        );
    }

    return (
        <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '100px 20px 40px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        padding: '40px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '40px', flexWrap: 'wrap' }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '4px solid #04AA6D',
                                background: '#222',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {profileUser?.avatarUrl ? (
                                    <img src={profileUser.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '3rem', color: '#888' }}>{profileUser?.name?.charAt(0) || '?'}</span>
                                )}
                                {uploading && (
                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div className="spinner"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{ flex: 1, minWidth: '250px' }}>
                            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
                                {isOwnProfile ? 'Profile Settings' : `${profileUser.name}'s Profile`}
                            </h1>
                            {isOwnProfile && (
                                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        hidden
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        style={{
                                            background: 'rgba(255,255,255,0.1)',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Upload Photo
                                    </button>
                                    <button
                                        type="button"
                                        onClick={startCamera}
                                        style={{
                                            background: 'rgba(255,255,255,0.1)',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Take Photo
                                    </button>
                                </div>
                            )}
                            {!isOwnProfile && (
                                <div style={{ marginTop: '15px', color: '#aaa', fontSize: '1rem', display: 'flex', gap: '20px' }}>
                                    <div><strong style={{ color: '#04AA6D', fontSize: '1.2rem' }}>{profileUser.xp || 0}</strong> XP</div>
                                    <div><strong style={{ color: '#04AA6D', fontSize: '1.2rem' }}>{profileUser.level || 'Beginner'}</strong></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {isOwnProfile ? (
                        <form onSubmit={handleSubmit}>
                            {message.text && (
                                <div style={{
                                    padding: '15px',
                                    borderRadius: '12px',
                                    background: message.type === 'success' ? 'rgba(4, 170, 109, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                                    border: `1px solid ${message.type === 'success' ? '#04AA6D' : '#f44336'}`,
                                    color: message.type === 'success' ? '#04AA6D' : '#f44336',
                                    marginBottom: '24px'
                                }}>
                                    {message.text}
                                </div>
                            )}

                            <div>
                                <label style={labelStyle}>Username / Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '20px 0 15px', color: '#04AA6D' }}>Social Accounts</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label style={labelStyle}>GitHub URL</label>
                                    <input
                                        type="text"
                                        name="githubUrl"
                                        value={formData.githubUrl}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="https://github.com/username"
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>LinkedIn URL</label>
                                    <input
                                        type="text"
                                        name="linkedinUrl"
                                        value={formData.linkedinUrl}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label style={labelStyle}>Twitter / X URL</label>
                                    <input
                                        type="text"
                                        name="twitterUrl"
                                        value={formData.twitterUrl}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="https://x.com/username"
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Instagram URL</label>
                                    <input
                                        type="text"
                                        name="instagramUrl"
                                        value={formData.instagramUrl}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="https://instagram.com/username"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    background: '#04AA6D',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '14px 32px',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                    marginTop: '10px',
                                    boxShadow: '0 4px 14px 0 rgba(4, 170, 109, 0.39)'
                                }}
                            >
                                {loading ? 'Saving Changes...' : 'Save Changes'}
                            </button>
                        </form>
                    ) : (
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px', color: '#04AA6D' }}>Connect with {profileUser.name}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                {profileUser.githubUrl && (
                                    <a href={profileUser.githubUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#fff', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <i className="fab fa-github" style={{ fontSize: '1.5rem' }}></i>
                                        <span>GitHub</span>
                                    </a>
                                )}
                                {profileUser.linkedinUrl && (
                                    <a href={profileUser.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#fff', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <i className="fab fa-linkedin" style={{ fontSize: '1.5rem' }}></i>
                                        <span>LinkedIn</span>
                                    </a>
                                )}
                                {profileUser.twitterUrl && (
                                    <a href={profileUser.twitterUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#fff', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <i className="fab fa-twitter" style={{ fontSize: '1.5rem' }}></i>
                                        <span>Twitter / X</span>
                                    </a>
                                )}
                                {profileUser.instagramUrl && (
                                    <a href={profileUser.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#fff', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <i className="fab fa-instagram" style={{ fontSize: '1.5rem' }}></i>
                                        <span>Instagram</span>
                                    </a>
                                )}
                                {!profileUser.githubUrl && !profileUser.linkedinUrl && !profileUser.twitterUrl && !profileUser.instagramUrl && (
                                    <p style={{ color: '#666', fontStyle: 'italic' }}>No social links shared yet.</p>
                                )}
                            </div>

                            <div style={{ marginTop: '40px' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px', color: '#04AA6D' }}>Activity Heatmap</h3>
                                <ContributionGraph data={profileUser.contributions || []} />
                            </div>

                            <div style={{ marginTop: '40px' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px', color: '#04AA6D' }}>Learning Progress</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                    {profileUser.enrolledCourses?.map(course => (
                                        <div key={course.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem' }}>{course.titleEn || course.titleRu || course.titleTj}</h4>
                                            <div style={{ height: '6px', background: '#222', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ width: `${Math.random() * 100}%`, height: '100%', background: '#04AA6D' }}></div>
                                            </div>
                                            <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#888' }}>In Progress</div>
                                        </div>
                                    ))}
                                    {(!profileUser.enrolledCourses || profileUser.enrolledCourses.length === 0) && (
                                        <p style={{ color: '#666', fontStyle: 'italic' }}>Not enrolled in any courses yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Camera Modal */}
            <AnimatePresence>
                {showCamera && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1000,
                            background: 'rgba(0,0,0,0.9)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', padding: '20px'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{
                                background: '#111', borderRadius: '24px', padding: '24px',
                                maxWidth: '640px', width: '100%', textAlign: 'center'
                            }}
                        >
                            <h2 style={{ marginBottom: '20px' }}>Take a Photo</h2>
                            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#000', marginBottom: '24px' }}>
                                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', transform: 'scaleX(-1)' }} />
                                <canvas ref={canvasRef} style={{ display: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                                <button type="button" onClick={stopCamera} style={{ background: '#333', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer' }}>Cancel</button>
                                <button type="button" onClick={capturePhoto} style={{ background: '#04AA6D', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>Snap!</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .spinner {
                    width: 30px;
                    height: 30px;
                    border: 3px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: #04AA6D;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
