import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { runPython } from '../services/pythonRunner';
import CodeEditor from '../components/CodeEditor';

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
    const [running, setRunning] = useState(false);
    const [results, setResults] = useState(null);
    const [activeTab, setActiveTab] = useState('question'); // question, solution, submissions
    const [consoleOpen, setConsoleOpen] = useState(true);
    const [consoleTab, setConsoleTab] = useState('testcase'); // testcase, result
    const [activeTestCase, setActiveTestCase] = useState(0);

    const scrollRef = useRef(null);

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
        } catch (err) {
            console.error(err);
        }
        setRunning(false);
    }, [challenge, code, language]);

    const handleSubmit = async () => {
        await handleRun();
        if (user && challenge) {
            await api.post(`challenges/${id}/submit`, { language, code });
        }
    };

    if (!challenge) return <div className="flex h-screen items-center justify-center bg-[#0a0a0a] text-white">Loading...</div>;

    return (
        <div className="flex flex-col h-screen bg-[#1a1a1a] text-[#eff1f6] overflow-hidden font-sans">
            {/* Header */}
            <header className="h-12 border-b border-[#333] flex items-center justify-between px-4 bg-[#282828]">
                <div className="flex items-center gap-4">
                    <Link to="/challenges" className="text-sm text-[#8a8a8a] hover:text-white transition-colors">
                        &larr; Problem List
                    </Link>
                    <div className="h-4 w-[1px] bg-[#444]" />
                    <span className="text-sm font-semibold">{challenge.title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-[#333] rounded transition-colors"><i className="fas fa-cog text-sm opacity-60"></i></button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                {/* Left Pane: Description & Tabs */}
                <section className="w-[45%] flex flex-col border-r border-[#333] bg-[#1a1a1a]">
                    <div className="flex bg-[#282828] border-b border-[#333]">
                        {['question', 'solution', 'submissions'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors relative ${activeTab === tab ? 'text-white' : 'text-[#8a8a8a] hover:text-white'}`}
                            >
                                {tab}
                                {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ffa116]" />}
                            </button>
                        ))}
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 dark-scrollbar">
                        <AnimatePresence mode="wait">
                            {activeTab === 'question' && (
                                <motion.div
                                    key="question"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                >
                                    <h1 className="text-2xl font-bold mb-4">{challenge.title}</h1>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${challenge.difficulty === 'easy' ? 'bg-[#00af9b26] text-[#00af9b]' : challenge.difficulty === 'medium' ? 'bg-[#feb90026] text-[#feb900]' : 'bg-[#ff2d5526] text-[#ff2d55]'}`}>
                                            {challenge.difficulty}
                                        </span>
                                        {challenge.topics?.map((topic, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full bg-[#3e3e3e] text-[#eff1f6] text-[10px] uppercase font-bold tracking-widest">
                                                {topic}
                                            </span>
                                        ))}
                                        {challenge.tags?.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full bg-[#ffffff10] text-[#8a8a8a] text-[10px] uppercase font-bold tracking-widest">
                                                {tag}
                                            </span>
                                        ))}
                                        <div className="h-6 w-[1px] bg-[#333] hidden sm:block mx-1" />
                                        <span className="px-3 py-1 rounded-full bg-[#00af9b15] text-[#00af9b] text-[10px] uppercase font-bold tracking-widest leading-none flex items-center">
                                            +{challenge.xpReward} XP
                                        </span>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-[#eff1f6] opacity-90 leading-relaxed" dangerouslySetInnerHTML={{ __html: challenge.description }} />
                                </motion.div>
                            )}
                            {activeTab === 'solution' && (
                                <motion.div key="solution">Solution content coming soon...</motion.div>
                            )}
                            {activeTab === 'submissions' && (
                                <motion.div key="submissions">Submission history coming soon...</motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Right Pane: Editor & Console */}
                <section className="flex-1 flex flex-col bg-[#1e1e1e]">
                    {/* Toolbar */}
                    <div className="h-10 border-b border-[#333] flex items-center justify-between px-4 bg-[#282828]">
                        <div className="flex items-center gap-2">
                            <select
                                value={language}
                                onChange={e => setLanguage(e.target.value)}
                                className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer hover:text-white"
                            >
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                            </select>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="flex-1 min-h-0 relative">
                        <CodeEditor value={code} onChange={setCode} onRun={handleRun} language={language} theme="vs-dark" />
                    </div>

                    {/* Console */}
                    <div className={`flex flex-col border-t border-[#333] bg-[#282828] transition-all duration-300 ${consoleOpen ? 'h-[300px]' : 'h-10'}`}>
                        <div className="h-10 flex items-center justify-between px-4 cursor-pointer" onClick={() => setConsoleOpen(!consoleOpen)}>
                            <div className="flex gap-4">
                                <button onClick={e => { e.stopPropagation(); setConsoleTab('testcase'); setConsoleOpen(true); }} className={`text-xs font-semibold ${consoleTab === 'testcase' ? 'text-white' : 'text-[#8a8a8a]'}`}>Console</button>
                                {results && (
                                    <button onClick={e => { e.stopPropagation(); setConsoleTab('result'); setConsoleOpen(true); }} className={`text-xs font-semibold ${consoleTab === 'result' ? 'text-white' : 'text-[#8a8a8a]'}`}>Result</button>
                                )}
                            </div>
                            <i className={`fas fa-chevron-${consoleOpen ? 'down' : 'up'} text-xs opacity-60`}></i>
                        </div>

                        {consoleOpen && (
                            <div className="flex-1 overflow-hidden flex flex-col p-4">
                                {consoleTab === 'testcase' ? (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-2">
                                            {challenge.testCases?.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setActiveTestCase(idx)}
                                                    className={`px-3 py-1.5 rounded bg-[#3e3e3e] text-xs font-medium ${activeTestCase === idx ? 'bg-[#4e4e4e] text-white shadow-lg' : 'text-[#8a8a8a] opacity-60'}`}
                                                >
                                                    Case {idx + 1}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] uppercase font-bold tracking-widest opacity-40">Input</label>
                                            <pre className="p-3 bg-[#1e1e1e] rounded text-sm font-mono whitespace-pre-wrap">{challenge.testCases?.[activeTestCase]?.input}</pre>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4 overflow-y-auto pr-2 dark-scrollbar">
                                        <div className={`text-lg font-bold ${results?.passed ? 'text-[#00af9b]' : 'text-[#ff2d55]'}`}>
                                            {results?.passed ? 'Accepted' : 'Wrong Answer'}
                                        </div>
                                        {results?.results?.map((res, idx) => (
                                            <div key={idx} className="flex flex-col gap-2 p-3 bg-[#1e1e1e] rounded border border-[#333]">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold opacity-60 uppercase">Case {idx + 1}</span>
                                                    <span className={`text-[10px] uppercase font-black ${res.passed ? 'text-[#00af9b]' : 'text-[#ff2d55]'}`}>{res.passed ? 'Passed' : 'Failed'}</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-[9px] uppercase font-bold opacity-30">Expected</label>
                                                        <pre className="text-xs font-mono">{res.expectedOutput}</pre>
                                                    </div>
                                                    <div>
                                                        <label className="text-[9px] uppercase font-bold opacity-30">Actual</label>
                                                        <pre className={`text-xs font-mono ${!res.passed && 'text-[#ff2d55]'}`}>{res.actualOutput}</pre>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Footer Actions */}
                        <div className="h-12 border-t border-[#333] flex items-center justify-between px-4 bg-[#282828]">
                            <button className="text-xs opacity-60 hover:opacity-100 flex items-center gap-1">Console <i className="fas fa-chevron-up text-[8px]"></i></button>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleRun}
                                    disabled={running}
                                    className="px-4 py-1.5 bg-[#3e3e3e] hover:bg-[#4e4e4e] rounded text-xs font-semibold transition-colors disabled:opacity-50"
                                >
                                    {running ? 'Running...' : 'Run'}
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={running}
                                    className="px-4 py-1.5 bg-[#00af9b] hover:bg-[#28c5b3] rounded text-xs font-semibold text-white transition-colors disabled:opacity-50"
                                >
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
