import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { runPython } from '../services/pythonRunner';
import CodeEditor from '../components/CodeEditor';

/**
 * Smart comparison: trims whitespace, normalizes brackets/spacing,
 * but PRESERVES element order (critical for index-based answers).
 */
const outputsMatch = (actual, expected) => {
    if (!actual && !expected) return true;
    if (!actual || !expected) return false;

    // Step 1: Trim whitespace and trailing newlines
    let a = actual.trim();
    let e = expected.trim();

    // Step 2: Exact match after trim
    if (a === e) return true;

    // Step 3: Normalize list-like outputs — replace () with [], remove extra spaces
    const normList = (s) => s
        .replace(/\(/g, '[')
        .replace(/\)/g, ']')
        .replace(/\s*,\s*/g, ', ')
        .replace(/\[\s+/g, '[')
        .replace(/\s+\]/g, ']')
        .replace(/'/g, '"');
    if (normList(a) === normList(e)) return true;

    // Step 4: Case-insensitive for boolean-like outputs (true/false, True/False)
    if (a.toLowerCase() === e.toLowerCase() &&
        ['true', 'false', 'yes', 'no', 'none'].includes(a.toLowerCase())) return true;

    // Step 5: Normalize nested list outputs (sort inner groups for problems like Group Anagrams)
    // Only if both look like nested arrays
    try {
        const pa = JSON.parse(normList(a).replace(/'/g, '"'));
        const pe = JSON.parse(normList(e).replace(/'/g, '"'));
        if (Array.isArray(pa) && Array.isArray(pe)) {
            // For flat arrays, compare directly (order matters)
            if (!Array.isArray(pa[0]) && !Array.isArray(pe[0])) {
                return JSON.stringify(pa) === JSON.stringify(pe);
            }
            // For nested arrays (like Group Anagrams), sort each inner array and then sort outer
            const sortNested = (arr) => arr
                .map(inner => Array.isArray(inner) ? [...inner].sort() : inner)
                .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
            return JSON.stringify(sortNested(pa)) === JSON.stringify(sortNested(pe));
        }
    } catch { /* not JSON, skip */ }

    return false;
};

export default function ChallengeSolverPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [running, setRunning] = useState(false);
    const [results, setResults] = useState(null);

    const languages = [
        { id: 'python', name: 'Python' },
        { id: 'javascript', name: 'JavaScript' },
        { id: 'java', name: 'Java' },
        { id: 'cpp', name: 'C++' },
        { id: 'go', name: 'Go' },
        { id: 'rust', name: 'Rust' }
    ];

    useEffect(() => {
        console.log('Fetching challenge:', id);
        api.get(`challenges/${id}`)
            .then(res => {
                console.log('Challenge data received:', res.data);
                if (res.data.message) {
                    console.warn('Redirecting to /challenges');
                    navigate('/challenges');
                } else {
                    setChallenge(res.data);
                    if (res.data.starterCode) {
                        setCode(res.data.starterCode);
                    }
                }
            })
            .catch(err => {
                console.error('Error fetching challenge:', err);
                navigate('/challenges');
            });
    }, [id, navigate]);


    const handleSubmit = useCallback(async () => {
        if (!user) {
            alert("Please log in to submit challenges!");
            return;
        }
        if (!challenge) return;

        setRunning(true);
        setResults(null);
        console.log(`Evaluating challenge ${id} locally...`);

        try {
            // 1. Run evaluation locally using Pyodide (for Python)
            const evaluationResults = [];
            let passedAll = true;

            if (language === 'python') {
                for (const tc of challenge.testCases || []) {
                    const res = await runPython(code, tc.input);
                    // Use whatever the code printed to stdout, trimmed
                    const actualOutput = res.output ? res.output.trim() : "";
                    const expected = tc.expectedOutput ? tc.expectedOutput.trim() : "";

                    // If fatal error with no output at all → fail
                    const hasFatalError = !res.success && !actualOutput;
                    const passed = !hasFatalError && outputsMatch(actualOutput, expected);

                    evaluationResults.push({
                        input: tc.input,
                        expectedOutput: expected,
                        actualOutput: actualOutput || (res.error ? `Runtime Error: ${res.error}` : '(no output)'),
                        passed
                    });
                    if (!passed) passedAll = false;
                }
            } else {
                // For other languages, fallback to backend (which is currently limited)
                const res = await api.post(`challenges/${id}/submit`, { language, code });
                setResults(res.data);
                setRunning(false);
                return;
            }

            const resultsData = {
                passed: passedAll,
                results: evaluationResults,
                error: evaluationResults.find(r => !r.passed && r.actualOutput && (
                    r.actualOutput.includes('Traceback') ||
                    r.actualOutput.includes('SyntaxError') ||
                    r.actualOutput.includes('NameError') ||
                    r.actualOutput.includes('TypeError') ||
                    r.actualOutput.includes('ValueError')
                ))?.actualOutput
            };

            console.log('Local evaluation complete:', resultsData);
            setResults(resultsData);

            // 2. Report result to backend to save progress and award XP
            await api.post(`challenges/${id}/submit`, {
                language,
                code,
                localResults: resultsData // Backend will trust this if it can't run Piston
            });

        } catch (err) {
            console.error('Submission failed:', err);
            alert("An error occurred during evaluation. Check console for details.");
        }
        setRunning(false);
    }, [id, user, challenge, code, language]);

    if (!challenge || !challenge.title) {
        console.log('Challenge is null or missing title, showing loading...');
        return <div style={{ padding: '100px', textAlign: 'center', color: '#fff' }}>Loading challenge...</div>;
    }

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#0a0a0a', color: '#fff', paddingTop: '70px' }}>
            {/* Left: Description */}
            <div style={{ flex: 1, padding: '30px', overflowY: 'auto', borderRight: '1px solid #222' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 10px' }}>{challenge.title}</h1>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                    <span style={{ color: challenge.difficulty === 'easy' ? '#04AA6D' : challenge.difficulty === 'medium' ? '#ff9800' : '#f44336', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>{challenge.difficulty}</span>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>+{challenge.xpReward} XP</span>
                </div>

                <div style={{ lineHeight: 1.7, color: '#ccc', marginBottom: '40px' }} dangerouslySetInnerHTML={{ __html: challenge.description }} />

                {results && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            background: results.passed ? 'rgba(4, 170, 109, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                            border: `2px solid ${results.passed ? '#04AA6D' : '#f44336'}`,
                            borderRadius: '12px',
                            padding: '30px',
                            textAlign: 'center',
                            marginBottom: '30px'
                        }}
                    >
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: 900,
                            margin: 0,
                            color: results.passed ? '#04AA6D' : '#f44336',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            {results.passed ? 'COMPLETED' : 'INCORRECT'}
                        </h2>
                        {results.error && (
                            <div style={{
                                marginTop: '15px',
                                padding: '10px',
                                background: 'rgba(244, 67, 54, 0.1)',
                                border: '1px solid #f44336',
                                borderRadius: '4px',
                                color: '#f44336',
                                textAlign: 'left',
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                whiteSpace: 'pre-wrap'
                            }}>
                                <strong>Runtime Error:</strong><br />
                                {results.error}
                            </div>
                        )}
                        <p style={{ color: '#888', margin: '10px 0 20px', fontSize: '1.1rem' }}>
                            {results.passed
                                ? `Congratulations! You earned ${challenge.xpReward} XP.`
                                : `Keep trying! ${results.results?.filter(r => r.passed).length || 0} / ${results.results?.length || 0} test cases passed.`}
                        </p>
                        {results.passed && (
                            <button
                                onClick={() => navigate('/challenges')}
                                style={{
                                    background: '#04AA6D',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '6px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    marginTop: '10px'
                                }}
                            >
                                Back to Challenges
                            </button>
                        )}
                    </motion.div>
                )}

                {results && (
                    <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px' }}>
                        <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600, margin: '0 0 15px' }}>
                            Test Case Results
                        </h3>
                        {results.results?.map((tc, idx) => (
                            <div key={idx} style={{ marginBottom: '15px', padding: '10px', background: '#1a1a1a', borderRadius: '4px' }}>
                                <div style={{ fontWeight: 600, color: tc.passed ? '#04AA6D' : '#f44336', marginBottom: '5px' }}>Test Case {idx + 1}: {tc.passed ? 'Passed' : 'Failed'}</div>
                                <div style={{ fontSize: '0.85rem', color: '#888' }}>
                                    <div><strong>Input:</strong> {tc.input}</div>
                                    <div><strong>Expected:</strong> {tc.expectedOutput}</div>
                                    <div><strong>Actual:</strong> <span style={{ color: tc.passed ? '#888' : '#f44336' }}>{tc.actualOutput}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right: Editor */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#111', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222' }}>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{ background: '#222', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', outline: 'none' }}
                    >
                        {languages.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                    <button
                        onClick={handleSubmit}
                        disabled={running}
                        style={{ background: '#04AA6D', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontWeight: 600, cursor: running ? 'not-allowed' : 'pointer' }}
                    >
                        {running ? 'Running...' : 'Submit Code'}
                    </button>
                </div>
                <div style={{ flex: 1, background: '#1e1e1e' }}>
                    <CodeEditor
                        value={code}
                        onChange={setCode}
                        onRun={handleSubmit}
                        language={language}
                    />
                </div>
            </div>
        </div>
    );
}
