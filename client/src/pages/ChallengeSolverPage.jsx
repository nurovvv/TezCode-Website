import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { runCode } from '../services/codeRunner';
import CodeEditor from '../components/CodeEditor';
import './ChallengeSolver.css';

const outputsMatch = (actual, expected) => {
    if (actual === expected) return true;
    if (actual == null || expected == null) return actual === expected;

    // Normalize and trim each line individually to handle trailing whitespace on lines
    const normalizeLines = (str) => {
        return String(str)
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n');
    };

    let a = normalizeLines(actual);
    let e = normalizeLines(expected);

    if (a === e) return true;

    // Normalize formatting for lists, tuples, and common literals
    const normalizeForm = (val) => {
        let s = val
            .replace(/\s+/g, ' ')             // Collapse multi-spaces
            .replace(/\(\s*/g, '[')           // (1, 2) -> [1, 2]
            .replace(/\s*\)/g, ']')
            .replace(/,\s*/g, ', ')           // Normalize comma spacing
            .replace(/\[\s+/g, '[')           // [ 1, 2 ] -> [1, 2]
            .replace(/\s+\]/g, ']')
            .replace(/'/g, '"');              // 'string' -> "string"

        // Normalize boolean/none/null tokens regardless of case
        s = s.replace(/\b(true|false|none|null)\b/gi, (m) => m.toLowerCase())
            .replace(/\bnull\b/g, 'none');

        // Final trim of any remaining whitespace after normalization
        return s.trim();
    };

    const normA = normalizeForm(a);
    const normE = normalizeForm(e);

    if (normA === normE) return true;

    // Try numeric comparison if both are numbers or simple list of numbers
    try {
        const numA = parseFloat(normA);
        const numE = parseFloat(normE);
        if (!isNaN(numA) && !isNaN(numE) && Math.abs(numA - numE) < 1e-6) {
            return true;
        }
    } catch (err) {
        // Not numbers, ignore
    }

    // Final loose check for booleans if still not matching
    if (a.toLowerCase() === e.toLowerCase() && ['true', 'false', 'none'].includes(a.toLowerCase())) return true;

    return false;
};

const classifyError = (errorMsg) => {
    if (!errorMsg) return null;
    const e = errorMsg.toLowerCase();
    if (e.includes('syntaxerror') || e.includes('syntax error') || e.includes('invalid syntax') || e.includes('unexpected token') || e.includes('parsing error'))
        return 'Syntax Error';
    if (e.includes('indentationerror') || e.includes('indentation error'))
        return 'Syntax Error';
    if (e.includes('nameerror') || e.includes('referenceerror') || e.includes('is not defined'))
        return 'Runtime Error';
    if (e.includes('typeerror') || e.includes('valueerror') || e.includes('indexerror') || e.includes('keyerror') || e.includes('zerodivisionerror') || e.includes('attributeerror') || e.includes('overflowerror') || e.includes('recursionerror'))
        return 'Runtime Error';
    if (e.includes('traceback') || e.includes('error') || e.includes('exception'))
        return 'Runtime Error';
    return null;
};

const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString();
};

export default function ChallengeSolverPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [activeTab, setActiveTab] = useState('question');
    const [consoleOpen, setConsoleOpen] = useState(true);
    const [consoleTab, setConsoleTab] = useState('testcase');
    const [activeTestCase, setActiveTestCase] = useState(0);
    const [running, setRunning] = useState(false);
    const [results, setResults] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submissions, setSubmissions] = useState([]);
    const [loadingSubmissions, setLoadingSubmissions] = useState(false);
    const [expandedSubmission, setExpandedSubmission] = useState(null);
    const [solution, setSolution] = useState(null);
    const [loadingSolution, setLoadingSolution] = useState(false);
    const [revealingSolution, setRevealingSolution] = useState(false);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [postingComment, setPostingComment] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

    useEffect(() => {
        api.get(`challenges/${id}`)
            .then(res => {
                if (res.data.message) navigate('/challenges');
                else {
                    setChallenge(res.data);
                    if (res.data.starterCode) setCode(res.data.starterCode);
                }
            })
            .catch(() => navigate('/challenges'));
    }, [id, navigate]);

    // Fetch submissions when tab is switched to 'submissions'
    useEffect(() => {
        if (activeTab === 'submissions' && user) {
            setLoadingSubmissions(true);
            api.get(`challenges/${id}/submissions`)
                .then(res => setSubmissions(res.data))
                .catch(err => console.error('Failed to fetch submissions:', err))
                .finally(() => setLoadingSubmissions(false));
        }
    }, [activeTab, id, user]);

    // Fetch comments when discussion tab is active
    useEffect(() => {
        if (activeTab === 'discussion') {
            setLoadingComments(true);
            api.get(`challenges/${id}/discussions`)
                .then(res => setComments(res.data))
                .catch(err => console.error('Failed to fetch comments:', err))
                .finally(() => setLoadingComments(false));
        }
    }, [activeTab, id]);

    const handleUnlockSolution = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setRevealingSolution(true);
        try {
            const res = await api.get(`challenges/${id}/solution`);
            setSolution(res.data.solution);
            setChallenge(prev => ({ ...prev, solutionViewed: true }));
        } catch (err) {
            console.error('Failed to fetch solution:', err);
            const errorMsg = err.response?.data?.message || err.message;
            // Only alert if we're actually on the solution tab to avoid spamming
            if (activeTab === 'solution') {
                alert(`Failed to reveal solution: ${errorMsg}. Please ensure you are logged in and the server is running.`);
            }
        } finally {
            setRevealingSolution(false);
        }
    };

    // Auto-reveal removed to restore the button as requested

    const handleRun = useCallback(async () => {
        if (!challenge) return;
        setRunning(true);
        setResults(null);
        setConsoleOpen(true);
        setConsoleTab('result');

        try {
            const evaluationResults = [];
            let passedAll = true;
            let detectedErrorType = null;

            // Check for empty code
            if (!code || !code.trim()) {
                detectedErrorType = 'Empty Code';
                for (const tc of challenge.testCases || []) {
                    evaluationResults.push({
                        input: tc.input,
                        expectedOutput: tc.expectedOutput ? tc.expectedOutput.trim() : "",
                        actualOutput: '(no code submitted)',
                        passed: false,
                        errorType: 'Empty Code'
                    });
                }
                passedAll = false;
            } else {
                for (const tc of challenge.testCases || []) {
                    const res = await runCode(code, language, tc.input);
                    const actualOutput = res.output ? res.output.trim() : "";
                    const expected = tc.expectedOutput ? tc.expectedOutput.trim() : "";
                    const hasFatalError = !res.success && !actualOutput;
                    const passed = !hasFatalError && outputsMatch(actualOutput, expected);

                    // Classify the error type from the error message
                    let errorType = null;
                    if (!passed && res.error) {
                        errorType = classifyError(res.error);
                    }
                    if (!passed && !errorType && !res.success) {
                        errorType = 'Runtime Error';
                    }

                    evaluationResults.push({
                        input: tc.input,
                        expectedOutput: expected,
                        actualOutput: actualOutput || (res.error ? `Error: ${res.error}` : '(no output)'),
                        passed,
                        errorType
                    });

                    console.log(`Test Case: Input="${tc.input}", Expected="${expected}", Actual="${actualOutput}", Passed=${passed}, ErrorType=${errorType}`);
                    if (!passed) {
                        passedAll = false;
                        if (!detectedErrorType && errorType) detectedErrorType = errorType;
                    }
                }
            }

            const runResults = { passed: passedAll, results: evaluationResults, errorType: detectedErrorType };
            setResults(runResults);
            return runResults;
        } catch (err) {
            console.error(err);
            return { passed: false, results: [] };
        } finally {
            setRunning(false);
        }
    }, [challenge, code, language]);

    const handleSubmit = async () => {
        setSubmitted(true);
        const runResults = await handleRun();
        if (user && challenge) {
            try {
                // Send local results to the backend so it records the submission correctly
                await api.post(`challenges/${id}/submit`, {
                    language,
                    code,
                    localResults: runResults
                });
                if (runResults.passed) {
                    setShowSuccess(true);
                }
            } catch (err) {
                console.error('Submit error:', err);
            }
        } else if (runResults.passed && !user) {
            // Show success even if not logged in (but not recorded)
            setShowSuccess(true);
        }
    };

    if (!challenge) return <div className="solver-page-container" style={{ justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;

    return (
        <div className="solver-page-container">
            {/* Success Overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.85)',
                            zIndex: 99999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                            recycle={false}
                            numberOfPieces={300}
                            gravity={0.15}
                            colors={['#00af9b', '#ffa116', '#00b8d9', '#36b37e', '#ffab00', '#6554c0']}
                        />
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                            style={{
                                background: '#1e1e1e',
                                borderRadius: '16px',
                                padding: '48px',
                                textAlign: 'center',
                                maxWidth: '420px',
                                width: '90%',
                                border: '1px solid #333',
                                boxShadow: '0 24px 80px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
                            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#00af9b', marginBottom: '8px' }}>
                                Challenge Completed!
                            </h2>
                            <p style={{ fontSize: '15px', color: '#8a8a8a', marginBottom: '8px' }}>
                                You solved <strong style={{ color: '#eff1f6' }}>{challenge.title}</strong>
                            </p>
                            {user ? (
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: 'rgba(0, 175, 155, 0.1)',
                                    color: '#00af9b',
                                    padding: '8px 20px',
                                    borderRadius: '999px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    marginBottom: '32px'
                                }}>
                                    +{challenge.xpReward} XP Earned
                                </div>
                            ) : (
                                <div style={{
                                    display: 'inline-flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '32px'
                                }}>
                                    <div style={{
                                        background: 'rgba(255, 161, 22, 0.1)',
                                        color: '#ffa116',
                                        padding: '8px 20px',
                                        borderRadius: '999px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                    }}>
                                        Points are not saved as guest
                                    </div>
                                    <Link to="/login" style={{
                                        color: '#00af9b',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        textDecoration: 'none'
                                    }}>
                                        Log in to save progress & earn XP →
                                    </Link>
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <button
                                    onClick={() => setShowSuccess(false)}
                                    className="solver-btn btn-run"
                                    style={{ height: '40px', padding: '0 24px', fontSize: '14px' }}
                                >
                                    Continue Coding
                                </button>
                                <button
                                    onClick={async () => {
                                        try {
                                            const res = await api.get('challenges');
                                            const allChallenges = res.data;
                                            const currentIndex = allChallenges.findIndex(c => String(c.id) === String(id));
                                            // Look for the next unsolved challenge after the current one
                                            let next = allChallenges.slice(currentIndex + 1).find(c => !c.completed);
                                            // If none found after current, wrap around and check from the beginning
                                            if (!next) {
                                                next = allChallenges.find(c => !c.completed && String(c.id) !== String(id));
                                            }
                                            if (next) {
                                                navigate(`/challenges/${next.id}`);
                                                setShowSuccess(false);
                                            } else {
                                                navigate('/challenges');
                                            }
                                        } catch {
                                            navigate('/challenges');
                                        }
                                    }}
                                    className="solver-btn btn-submit"
                                    style={{ height: '40px', padding: '0 24px', fontSize: '14px' }}
                                >
                                    Next Challenge
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Header */}
            <header className="solver-nav-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link to="/challenges" style={{ fontSize: '14px', color: '#8a8a8a', textDecoration: 'none' }}>
                        &larr; Problem List
                    </Link>
                    <div style={{ height: '16px', width: '1px', background: '#444' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{challenge.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button style={{ background: 'none', border: 'none', color: '#8a8a8a', cursor: 'pointer' }}>
                        <i className="fas fa-cog" style={{ fontSize: '14px' }}></i>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="solver-main-content">
                {/* Left Pane */}
                <section className="solver-left-pane">
                    <div className="solver-tabs-row">
                        {['question', 'solution', 'submissions', 'discussion'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`solver-tab-item ${activeTab === tab ? 'active' : ''}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="solver-description-area">
                        <AnimatePresence mode="wait">
                            {activeTab === 'question' && (
                                <motion.div
                                    key="question"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#fff' }}>{challenge.title}</h1>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                                        <span className={`solver-badge badge-${challenge.difficulty?.toLowerCase() || 'easy'}`} style={{ padding: '6px 14px', fontSize: '12px' }}>
                                            {challenge.difficulty}
                                        </span>
                                        <button className="solver-badge badge-tag" style={{ border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.07)', color: '#8a8a8a', padding: '6px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            Topics <i className="fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
                                        </button>
                                        <button className="solver-badge badge-tag" style={{ border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.07)', color: '#8a8a8a', padding: '6px 14px', fontSize: '12px' }}>
                                            Company Tags
                                        </button>
                                        <div style={{ flex: 1 }} />
                                        <span className="solver-badge badge-xp" style={{ background: 'rgba(0, 175, 155, 0.1)', color: '#00af9b', padding: '6px 14px', fontSize: '12px', fontWeight: '700' }}>
                                            +{challenge.xpReward} XP
                                        </span>
                                    </div>
                                    <div
                                        className="lc-description"
                                        dangerouslySetInnerHTML={{ __html: challenge.description }}
                                    />
                                </motion.div>
                            )}
                            {activeTab === 'solution' && (
                                <motion.div key="solution">
                                    {(challenge.solutionViewed || solution) ? (
                                        <div
                                            className="solution-content lc-description"
                                            dangerouslySetInnerHTML={{ __html: solution || challenge.solution || 'No solution available yet.' }}
                                        />
                                    ) : (
                                        <div style={{
                                            textAlign: 'center',
                                            padding: '40px 20px',
                                            background: 'rgba(255,161,22,0.05)',
                                            borderRadius: '12px',
                                            border: '1px dashed rgba(255,161,22,0.3)'
                                        }}>
                                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🔑</div>
                                            <h3 style={{ color: '#ffa116', marginBottom: '8px' }}>Unlock Solution</h3>
                                            <p style={{ color: '#8a8a8a', fontSize: '14px', marginBottom: '24px', maxWidth: '300px', margin: '0 auto 24px' }}>
                                                Revealing the solution will prevent you from earning <strong>{challenge.xpReward} XP</strong> for this challenge.
                                            </p>
                                            <button
                                                onClick={handleUnlockSolution}
                                                disabled={revealingSolution}
                                                className="solver-btn btn-run"
                                                style={{
                                                    background: '#ffa116',
                                                    color: '#000',
                                                    border: 'none',
                                                    padding: '10px 24px',
                                                    fontWeight: '700'
                                                }}
                                            >
                                                {revealingSolution ? 'Unlocking...' : 'Unlock Solution'}
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                            {activeTab === 'discussion' && (
                                <motion.div key="discussion">
                                    {/* Post new comment */}
                                    {user ? (
                                        <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #ffa116, #ff6b00)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: '#000', flexShrink: 0 }}>
                                                {user.username?.[0]?.toUpperCase() || 'U'}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <textarea
                                                    value={newComment}
                                                    onChange={e => setNewComment(e.target.value)}
                                                    placeholder="Share your thoughts or ask a question..."
                                                    maxLength={2000}
                                                    style={{ width: '100%', minHeight: '80px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px', color: '#e0e0e0', fontSize: '14px', resize: 'vertical', fontFamily: 'inherit' }}
                                                />
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                                                    <span style={{ fontSize: '12px', color: '#555' }}>{newComment.length}/2000</span>
                                                    <button
                                                        onClick={async () => {
                                                            if (!newComment.trim()) return;
                                                            setPostingComment(true);
                                                            try {
                                                                const res = await api.post(`challenges/${id}/discussions`, { content: newComment });
                                                                setComments(prev => [res.data, ...prev]);
                                                                setNewComment('');
                                                            } catch (err) { console.error('Failed to post:', err); }
                                                            finally { setPostingComment(false); }
                                                        }}
                                                        disabled={postingComment || !newComment.trim()}
                                                        className="solver-btn btn-run"
                                                        style={{ padding: '8px 20px', fontSize: '13px' }}
                                                    >
                                                        {postingComment ? 'Posting...' : 'Post Comment'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p style={{ color: '#8a8a8a', marginBottom: '16px' }}>Log in to join the discussion.</p>
                                    )}

                                    {/* Comments list */}
                                    {loadingComments ? (
                                        <p style={{ color: '#8a8a8a' }}>Loading comments...</p>
                                    ) : comments.length === 0 ? (
                                        <p style={{ color: '#8a8a8a' }}>No comments yet. Be the first to share your thoughts!</p>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            {comments.map(comment => (
                                                <div key={comment.id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '16px' }}>
                                                    {/* Comment header */}
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>
                                                            {comment.user?.username?.[0]?.toUpperCase() || '?'}
                                                        </div>
                                                        <div>
                                                            <span style={{ fontWeight: '600', fontSize: '14px', color: '#e0e0e0' }}>{comment.user?.username || 'Unknown'}</span>
                                                            <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>{getTimeAgo(new Date(comment.createdAt))}</span>
                                                        </div>
                                                        {user && comment.user?.id === user.id && (
                                                            <button
                                                                onClick={async () => {
                                                                    try {
                                                                        await api.delete(`challenges/${id}/discussions/${comment.id}`);
                                                                        setComments(prev => prev.filter(c => c.id !== comment.id));
                                                                    } catch (err) { console.error('Failed to delete:', err); }
                                                                }}
                                                                style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '12px' }}
                                                            >
                                                                <span style={{ fontSize: '14px' }}>🗑️</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                    {/* Content */}
                                                    <p style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.6', margin: '0 0 10px 42px', whiteSpace: 'pre-wrap' }}>{comment.content}</p>
                                                    {/* Actions */}
                                                    <div style={{ display: 'flex', gap: '16px', marginLeft: '42px' }}>
                                                        <button
                                                            onClick={async () => {
                                                                if (!user) return;
                                                                try {
                                                                    const res = await api.post(`challenges/${id}/discussions/${comment.id}/like`);
                                                                    setComments(prev => prev.map(c => c.id === comment.id ? { ...c, liked: res.data.liked, likeCount: c.likeCount + (res.data.liked ? 1 : -1) } : c));
                                                                } catch (err) { console.error('Failed to like:', err); }
                                                            }}
                                                            style={{ background: 'none', border: 'none', color: comment.liked ? '#ffa116' : '#666', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                                                        >
                                                            <span style={{ fontSize: '16px' }}>{comment.liked ? '❤️' : '🤍'}</span> <span>{comment.likeCount || 0}</span>
                                                        </button>
                                                        <button
                                                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                                            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                                                        >
                                                            <span style={{ fontSize: '14px' }}>↩️</span> Reply
                                                        </button>
                                                    </div>
                                                    {/* Reply input */}
                                                    {replyingTo === comment.id && user && (
                                                        <div style={{ marginLeft: '42px', marginTop: '12px', display: 'flex', gap: '8px' }}>
                                                            <input
                                                                value={replyText}
                                                                onChange={e => setReplyText(e.target.value)}
                                                                placeholder="Write a reply..."
                                                                maxLength={2000}
                                                                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '8px 12px', color: '#e0e0e0', fontSize: '13px' }}
                                                                onKeyDown={async e => {
                                                                    if (e.key === 'Enter' && replyText.trim()) {
                                                                        try {
                                                                            const res = await api.post(`challenges/${id}/discussions`, { content: replyText, parentId: comment.id });
                                                                            setComments(prev => prev.map(c => c.id === comment.id ? { ...c, replies: [...(c.replies || []), res.data] } : c));
                                                                            setReplyText(''); setReplyingTo(null);
                                                                        } catch (err) { console.error('Failed to reply:', err); }
                                                                    }
                                                                }}
                                                            />
                                                            <button
                                                                onClick={async () => {
                                                                    if (!replyText.trim()) return;
                                                                    try {
                                                                        const res = await api.post(`challenges/${id}/discussions`, { content: replyText, parentId: comment.id });
                                                                        setComments(prev => prev.map(c => c.id === comment.id ? { ...c, replies: [...(c.replies || []), res.data] } : c));
                                                                        setReplyText(''); setReplyingTo(null);
                                                                    } catch (err) { console.error('Failed to reply:', err); }
                                                                }}
                                                                className="solver-btn btn-run"
                                                                style={{ padding: '8px 14px', fontSize: '12px' }}
                                                            >Reply</button>
                                                        </div>
                                                    )}
                                                    {/* Replies */}
                                                    {comment.replies && comment.replies.length > 0 && (
                                                        <div style={{ marginLeft: '42px', marginTop: '12px', borderLeft: '2px solid rgba(255,255,255,0.06)', paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                            {comment.replies.map(reply => (
                                                                <div key={reply.id}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #43e97b, #38f9d7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#000', flexShrink: 0 }}>
                                                                            {reply.user?.username?.[0]?.toUpperCase() || '?'}
                                                                        </div>
                                                                        <span style={{ fontWeight: '600', fontSize: '13px', color: '#e0e0e0' }}>{reply.user?.username || 'Unknown'}</span>
                                                                        <span style={{ fontSize: '11px', color: '#666' }}>{getTimeAgo(new Date(reply.createdAt))}</span>
                                                                    </div>
                                                                    <p style={{ fontSize: '13px', color: '#aaa', lineHeight: '1.5', margin: '0 0 4px 32px', whiteSpace: 'pre-wrap' }}>{reply.content}</p>
                                                                    <button
                                                                        onClick={async () => {
                                                                            if (!user) return;
                                                                            try {
                                                                                const res = await api.post(`challenges/${id}/discussions/${reply.id}/like`);
                                                                                setComments(prev => prev.map(c => c.id === comment.id ? {
                                                                                    ...c, replies: c.replies.map(r => r.id === reply.id ? { ...r, liked: res.data.liked, likeCount: r.likeCount + (res.data.liked ? 1 : -1) } : r)
                                                                                } : c));
                                                                            } catch (err) { console.error('Failed to like reply:', err); }
                                                                        }}
                                                                        style={{ marginLeft: '32px', background: 'none', border: 'none', color: reply.liked ? '#ffa116' : '#666', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                                                                    >
                                                                        <span style={{ fontSize: '14px' }}>{reply.liked ? '❤️' : '🤍'}</span> <span>{reply.likeCount || 0}</span>
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                            {activeTab === 'submissions' && (
                                <motion.div key="submissions">
                                    {!user ? (
                                        <p style={{ color: '#8a8a8a' }}>Log in to see your submissions.</p>
                                    ) : loadingSubmissions ? (
                                        <p style={{ color: '#8a8a8a' }}>Loading submissions...</p>
                                    ) : submissions.length === 0 ? (
                                        <p style={{ color: '#8a8a8a' }}>You have no submissions yet.</p>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {submissions.map((sub) => {
                                                const date = new Date(sub.createdAt);
                                                const timeAgo = getTimeAgo(date);
                                                const passed = sub.status === 'passed';
                                                const isExpanded = expandedSubmission == sub.id;
                                                return (
                                                    <motion.div key={sub.id} whileHover={{ background: 'rgba(255,255,255,0.02)' }} style={{ borderRadius: '8px' }}>
                                                        <div
                                                            onClick={() => setExpandedSubmission(isExpanded ? null : sub.id)}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                padding: '14px 16px',
                                                                background: isExpanded ? '#2a2a2a' : '#262626',
                                                                borderRadius: isExpanded ? '8px 8px 0 0' : '8px',
                                                                border: '1px solid #333',
                                                                borderBottom: isExpanded ? 'none' : '1px solid #333',
                                                                cursor: 'pointer',
                                                                transition: 'background 0.15s ease'
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                <div style={{
                                                                    width: '8px', height: '8px', borderRadius: '50%',
                                                                    background: passed ? '#00af9b' : '#ff2d55'
                                                                }} />
                                                                <span style={{
                                                                    fontSize: '14px', fontWeight: '700',
                                                                    color: passed ? '#00af9b' : '#ff2d55'
                                                                }}>
                                                                    {passed ? 'Accepted' : (sub.errorType || 'Wrong Answer')}
                                                                </span>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                                <span style={{
                                                                    fontSize: '12px', color: '#666',
                                                                    background: '#1e1e1e', padding: '4px 10px',
                                                                    borderRadius: '4px', fontWeight: '600', textTransform: 'capitalize'
                                                                }}>
                                                                    {sub.language}
                                                                </span>
                                                                <span style={{ fontSize: '12px', color: '#666' }}>
                                                                    {timeAgo}
                                                                </span>
                                                                <span style={{
                                                                    fontSize: '11px',
                                                                    color: '#00af9b',
                                                                    fontWeight: '600',
                                                                    textTransform: 'uppercase',
                                                                    marginLeft: '8px'
                                                                }}>
                                                                    {isExpanded ? 'Close' : 'View Code'}
                                                                </span>
                                                                <span style={{
                                                                    display: 'inline-block',
                                                                    width: '0', height: '0',
                                                                    borderLeft: '4px solid transparent',
                                                                    borderRight: '4px solid transparent',
                                                                    borderTop: isExpanded ? 'none' : '4px solid #555',
                                                                    borderBottom: isExpanded ? '4px solid #555' : 'none',
                                                                    marginLeft: '4px'
                                                                }} />
                                                            </div>
                                                        </div>
                                                        {isExpanded && (
                                                            <div style={{
                                                                background: '#1a1a1a',
                                                                border: '1px solid #333',
                                                                borderTop: 'none',
                                                                borderRadius: '0 0 8px 8px',
                                                                padding: '16px'
                                                            }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#555', textTransform: 'uppercase' }}>Submitted Code</span>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setCode(sub.code);
                                                                            setLanguage(sub.language);
                                                                            setActiveTab('question');
                                                                        }}
                                                                        style={{
                                                                            background: '#04AA6D',
                                                                            color: '#fff',
                                                                            border: 'none',
                                                                            padding: '6px 14px',
                                                                            borderRadius: '6px',
                                                                            fontSize: '12px',
                                                                            fontWeight: '600',
                                                                            cursor: 'pointer'
                                                                        }}
                                                                    >
                                                                        Load this code
                                                                    </button>
                                                                </div>
                                                                <pre style={{
                                                                    background: '#0d0d0d',
                                                                    padding: '16px',
                                                                    borderRadius: '6px',
                                                                    fontSize: '13px',
                                                                    fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                                                                    color: '#d4d4d4',
                                                                    overflowX: 'auto',
                                                                    lineHeight: '1.6',
                                                                    margin: 0,
                                                                    whiteSpace: 'pre-wrap',
                                                                    wordBreak: 'break-word'
                                                                }}>
                                                                    {sub.code}
                                                                </pre>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Right Pane */}
                <section className="solver-right-pane">
                    <div className="solver-editor-toolbar">
                        <select
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                            style={{ background: 'transparent', color: '#eff1f6', fontSize: '13px', border: 'none', outline: 'none', cursor: 'pointer', fontWeight: '500' }}
                        >
                            <option value="python">Python</option>
                            <option value="javascript">JavaScript</option>
                        </select>
                    </div>

                    <div className="solver-editor-container">
                        <CodeEditor value={code} onChange={setCode} onRun={handleRun} language={language} theme="vs-dark" />
                    </div>

                    {/* Console */}
                    <div className="solver-console-container" style={{ height: consoleOpen ? '320px' : '40px' }}>
                        <div className="solver-console-header" onClick={() => setConsoleOpen(!consoleOpen)}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <span
                                    onClick={(e) => { e.stopPropagation(); setConsoleTab('testcase'); setConsoleOpen(true); }}
                                    style={{ fontSize: '13px', fontWeight: '600', color: consoleTab === 'testcase' ? '#fff' : '#8a8a8a', cursor: 'pointer' }}
                                >
                                    Console
                                </span>
                                {results && (
                                    <span
                                        onClick={(e) => { e.stopPropagation(); setConsoleTab('result'); setConsoleOpen(true); }}
                                        style={{ fontSize: '13px', fontWeight: '600', color: consoleTab === 'result' ? '#fff' : '#8a8a8a', cursor: 'pointer' }}
                                    >
                                        Result
                                    </span>
                                )}
                            </div>
                            <i className={`fas fa-chevron-${consoleOpen ? 'down' : 'up'}`} style={{ fontSize: '12px', opacity: 0.5 }}></i>
                        </div>

                        {consoleOpen && (
                            <div className="solver-console-body">
                                {consoleTab === 'testcase' ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {challenge.testCases?.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setActiveTestCase(idx)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        borderRadius: '4px',
                                                        background: activeTestCase === idx ? '#4e4e4e' : '#3e3e3e',
                                                        color: activeTestCase === idx ? '#fff' : '#8a8a8a',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        border: 'none',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Case {idx + 1}
                                                </button>
                                            ))}
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '8px' }}>Input</p>
                                            <pre style={{ padding: '12px', background: '#1e1e1e', borderRadius: '4px', fontSize: '13px', fontFamily: 'monospace', color: '#eff1f6' }}>
                                                {challenge.testCases?.[activeTestCase]?.input}
                                            </pre>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div style={{ fontSize: '18px', fontWeight: '700', color: running ? '#8a8a8a' : (results?.passed ? '#00af9b' : (results?.errorType ? '#ff9500' : '#ff2d55')) }}>
                                            {running ? 'Evaluating...' : (results?.passed ? 'Accepted' : (results?.errorType || 'Wrong Answer'))}
                                        </div>
                                        {results?.error && <div style={{ color: '#ff2d55' }}>{results.error}</div>}
                                        {results?.results?.map((res, idx) => (
                                            <div key={idx} style={{ padding: '12px', background: '#1e1e1e', borderRadius: '4px', border: '1px solid #333' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#8a8a8a' }}>CASE {idx + 1}</span>
                                                    <span style={{ fontSize: '10px', fontWeight: '900', color: res.passed ? '#00af9b' : '#ff2d55' }}>{res.passed ? 'PASSED' : 'FAILED'}</span>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                                    <div>
                                                        <label style={{ fontSize: '9px', fontWeight: '700', color: '#555', display: 'block', marginBottom: '4px' }}>EXPECTED</label>
                                                        <pre style={{ fontSize: '12px', fontFamily: 'monospace' }}>{res.expectedOutput}</pre>
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize: '9px', fontWeight: '700', color: '#555', display: 'block', marginBottom: '4px' }}>ACTUAL</label>
                                                        <pre style={{ fontSize: '12px', fontFamily: 'monospace', color: !res.passed ? '#ff2d55' : 'inherit' }}>{res.actualOutput}</pre>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="solver-console-footer">
                            <span style={{ fontSize: '12px', color: '#8a8a8a' }}>Console</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={handleRun} disabled={running} className="solver-btn btn-run">
                                    {running ? 'Running...' : 'Run'}
                                </button>
                                <button onClick={handleSubmit} disabled={running} className="solver-btn btn-submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
