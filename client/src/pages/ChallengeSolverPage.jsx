import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { runPython } from '../services/pythonRunner';
import CodeEditor from '../components/CodeEditor';
import './ChallengeSolver.css';

const outputsMatch = (actual, expected) => {
    if (!actual && !expected) return true;
    if (!actual || !expected) return false;
    let a = actual.trim();
    let e = expected.trim();
    if (a === e) return true;
    const normList = (s) => s
        .replace(/\(/g, '[')
        .replace(/\)/g, ']')
        .replace(/\s*,\s*/g, ', ')
        .replace(/\[\s+/g, '[')
        .replace(/\s+\]/g, ']')
        .replace(/'/g, '"');
    if (normList(a) === normList(e)) return true;
    if (a.toLowerCase() === e.toLowerCase() && ['true', 'false', 'none'].includes(a.toLowerCase())) return true;
    return false;
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

    const handleRun = useCallback(async () => {
        if (!challenge) return;
        setRunning(true);
        setConsoleOpen(true);
        setConsoleTab('result');

        try {
            const evaluationResults = [];
            let passedAll = true;

            if (language === 'python') {
                for (const tc of challenge.testCases || []) {
                    const res = await runPython(code, tc.input);
                    const actualOutput = res.output ? res.output.trim() : "";
                    const expected = tc.expectedOutput ? tc.expectedOutput.trim() : "";
                    const hasFatalError = !res.success && !actualOutput;
                    const passed = !hasFatalError && outputsMatch(actualOutput, expected);

                    evaluationResults.push({
                        input: tc.input,
                        expectedOutput: expected,
                        actualOutput: actualOutput || (res.error ? `Error: ${res.error}` : '(no output)'),
                        passed
                    });
                    if (!passed) passedAll = false;
                }
            }
            setResults({ passed: passedAll, results: evaluationResults });
            return passedAll;
        } catch (err) {
            console.error(err);
            return false;
        } finally {
            setRunning(false);
        }
    }, [challenge, code, language]);

    const handleSubmit = async () => {
        setSubmitted(true);
        const passedAll = await handleRun();
        if (passedAll && user && challenge) {
            try {
                await api.post(`challenges/${id}/submit`, { language, code });
                setShowSuccess(true);
            } catch (err) {
                console.error('Submit error:', err);
            }
        } else if (passedAll && !user) {
            // Still show success even if not logged in
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
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <button
                                    onClick={() => setShowSuccess(false)}
                                    className="solver-btn btn-run"
                                    style={{ height: '40px', padding: '0 24px', fontSize: '14px' }}
                                >
                                    Continue Coding
                                </button>
                                <Link
                                    to="/challenges"
                                    className="solver-btn btn-submit"
                                    style={{ height: '40px', padding: '0 24px', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                                >
                                    Next Challenge
                                </Link>
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
                        {['question', 'solution', 'submissions'].map(tab => (
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
                                    <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>{challenge.title}</h1>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '24px' }}>
                                        <span className={`solver-badge badge-${challenge.difficulty || 'easy'}`}>
                                            {challenge.difficulty}
                                        </span>
                                        {challenge.topics?.map((topic, i) => (
                                            <span key={i} className="solver-badge badge-tag" style={{ color: '#eff1f6', background: '#3e3e3e' }}>
                                                {topic}
                                            </span>
                                        ))}
                                        {challenge.tags?.map((tag, i) => (
                                            <span key={i} className="solver-badge badge-tag">
                                                {tag}
                                            </span>
                                        ))}
                                        <span className="solver-badge badge-xp">
                                            +{challenge.xpReward} XP
                                        </span>
                                    </div>
                                    <div
                                        style={{ color: '#eff1f6', opacity: 0.9, lineHeight: '1.7', fontSize: '15px' }}
                                        dangerouslySetInnerHTML={{ __html: challenge.description }}
                                    />
                                </motion.div>
                            )}
                            {activeTab === 'solution' && (
                                <motion.div key="solution" style={{ color: '#8a8a8a' }}>No solution available for this problem yet.</motion.div>
                            )}
                            {activeTab === 'submissions' && (
                                <motion.div key="submissions" style={{ color: '#8a8a8a' }}>You have no submissions yet.</motion.div>
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
                                        <div style={{ fontSize: '18px', fontWeight: '700', color: results?.passed ? '#00af9b' : '#ff2d55' }}>
                                            {results?.passed ? 'Accepted' : 'Wrong Answer'}
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
