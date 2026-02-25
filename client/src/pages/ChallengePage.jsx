import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════
   PYODIDE SINGLETON — loads once, reused
   ═══════════════════════════════════════════ */
let pyodideInstance = null;
let pyodideLoading = false;
let pyodideLoadCallbacks = [];

async function getPyodide() {
    if (pyodideInstance) return pyodideInstance;
    if (pyodideLoading) {
        return new Promise((resolve) => { pyodideLoadCallbacks.push(resolve); });
    }
    pyodideLoading = true;
    try {
        // eslint-disable-next-line no-undef
        pyodideInstance = await loadPyodide();
        pyodideLoadCallbacks.forEach(cb => cb(pyodideInstance));
        pyodideLoadCallbacks = [];
        return pyodideInstance;
    } catch (err) {
        pyodideLoading = false;
        throw err;
    }
}

/* Run Python code with simulated stdin/stdout */
async function runPython(code, inputStr) {
    try {
        const pyodide = await getPyodide();

        // Set up stdin (mock input())
        const inputs = inputStr.split('\n');
        let inputIdx = 0;

        pyodide.runPython(`
import sys, io

class MockStdin:
    def __init__(self, data):
        self._lines = data
        self._idx = 0
    def readline(self):
        if self._idx < len(self._lines):
            line = self._lines[self._idx]
            self._idx += 1
            return line + '\\n'
        return ''

sys.stdin = MockStdin(${JSON.stringify(inputs)})
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

        // Run user code
        try {
            pyodide.runPython(code);
        } catch (pyErr) {
            const stderr = pyodide.runPython('sys.stderr.getvalue()');
            return { success: false, output: '', error: pyErr.message || stderr || String(pyErr) };
        }

        const stdout = pyodide.runPython('sys.stdout.getvalue()');
        return { success: true, output: stdout, error: '' };
    } catch (err) {
        return { success: false, output: '', error: 'Python runtime error: ' + err.message };
    }
}

/* ═══════════════════════════════════════════
   CHALLENGES
   ═══════════════════════════════════════════ */
const CHALLENGES = [
    {
        id: 1, title: 'Hello, Name!', difficulty: 'Easy', xp: 10,
        description: 'Write a program that reads a name and prints a greeting.\n\nExample:\nInput: Alice\nOutput: Hello, Alice!',
        starterCode: 'name = input()\n# Your solution goes here\n',
        testCases: [
            { input: 'Alice', expected: 'Hello, Alice!' },
            { input: 'Bob', expected: 'Hello, Bob!' },
            { input: 'World', expected: 'Hello, World!' },
        ],
        hint: 'Use print(f"Hello, {name}!") or print("Hello, " + name + "!")',
    },
    {
        id: 2, title: 'Even or Odd', difficulty: 'Easy', xp: 10,
        description: 'Read an integer. Print "Even" if even, "Odd" if odd.\n\nExample:\nInput: 4\nOutput: Even',
        starterCode: 'num = int(input())\n# Your solution goes here\n',
        testCases: [
            { input: '4', expected: 'Even' },
            { input: '7', expected: 'Odd' },
            { input: '0', expected: 'Even' },
            { input: '-3', expected: 'Odd' },
        ],
        hint: 'Check num % 2 == 0',
    },
    {
        id: 3, title: 'Sum of List', difficulty: 'Easy', xp: 15,
        description: 'Read comma-separated integers and print their sum.\n\nExample:\nInput: 1,2,3,4,5\nOutput: 15',
        starterCode: 'data = input()\n# Your solution goes here\n',
        testCases: [
            { input: '1,2,3,4,5', expected: '15' },
            { input: '10,20,30', expected: '60' },
            { input: '5', expected: '5' },
            { input: '-1,1', expected: '0' },
        ],
        hint: 'print(sum(int(x) for x in data.split(",")))',
    },
    {
        id: 4, title: 'Reverse a String', difficulty: 'Easy', xp: 10,
        description: 'Read a string and print it reversed.\n\nExample:\nInput: Python\nOutput: nohtyP',
        starterCode: 'text = input()\n# Your solution goes here\n',
        testCases: [
            { input: 'Python', expected: 'nohtyP' },
            { input: 'hello', expected: 'olleh' },
            { input: 'a', expected: 'a' },
        ],
        hint: 'print(text[::-1])',
    },
    {
        id: 5, title: 'FizzBuzz', difficulty: 'Medium', xp: 20,
        description: 'Read N. Print numbers 1 to N, but:\n- Multiples of 3 → "Fizz"\n- Multiples of 5 → "Buzz"\n- Multiples of both → "FizzBuzz"\n\nExample:\nInput: 5\nOutput:\n1\n2\nFizz\n4\nBuzz',
        starterCode: 'n = int(input())\n# Your solution goes here\n',
        testCases: [
            { input: '5', expected: '1\n2\nFizz\n4\nBuzz' },
            { input: '3', expected: '1\n2\nFizz' },
            { input: '15', expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' },
        ],
        hint: 'Check i % 15 == 0 first, then i % 3, then i % 5',
    },
    {
        id: 6, title: 'Count Vowels', difficulty: 'Medium', xp: 15,
        description: 'Read a string and print how many vowels (a,e,i,o,u) it has. Case-insensitive.\n\nExample:\nInput: Hello World\nOutput: 3',
        starterCode: 'text = input()\n# Your solution goes here\n',
        testCases: [
            { input: 'Hello World', expected: '3' },
            { input: 'Python', expected: '1' },
            { input: 'AEIOU', expected: '5' },
            { input: 'xyz', expected: '0' },
        ],
        hint: 'print(sum(1 for c in text.lower() if c in "aeiou"))',
    },
    {
        id: 7, title: 'Fibonacci Sequence', difficulty: 'Medium', xp: 20,
        description: 'Read N. Print first N Fibonacci numbers, space-separated.\nFibonacci: 0, 1, 1, 2, 3, 5, 8, ...\n\nExample:\nInput: 7\nOutput: 0 1 1 2 3 5 8',
        starterCode: 'n = int(input())\n# Your solution goes here\n',
        testCases: [
            { input: '7', expected: '0 1 1 2 3 5 8' },
            { input: '1', expected: '0' },
            { input: '5', expected: '0 1 1 2 3' },
        ],
        hint: 'a, b = 0, 1 — loop n times, append a, then a, b = b, a + b',
    },
    {
        id: 8, title: 'Palindrome Check', difficulty: 'Medium', xp: 15,
        description: 'Read a string. Print "Yes" if palindrome, "No" otherwise. Ignore case.\n\nExample:\nInput: Racecar\nOutput: Yes',
        starterCode: 'text = input()\n# Your solution goes here\n',
        testCases: [
            { input: 'Racecar', expected: 'Yes' },
            { input: 'hello', expected: 'No' },
            { input: 'madam', expected: 'Yes' },
            { input: 'A', expected: 'Yes' },
        ],
        hint: 'Compare text.lower() == text.lower()[::-1]',
    },
    {
        id: 9, title: 'Word Frequency', difficulty: 'Hard', xp: 25,
        description: 'Read a sentence. Print each unique word with count, alphabetically, one per line.\nFormat: "word: count"\n\nExample:\nInput: the cat sat on the mat\nOutput:\ncat: 1\nmat: 1\non: 1\nsat: 1\nthe: 2',
        starterCode: 'sentence = input()\n# Your solution goes here\n',
        testCases: [
            { input: 'the cat sat on the mat', expected: 'cat: 1\nmat: 1\non: 1\nsat: 1\nthe: 2' },
            { input: 'hello hello hello', expected: 'hello: 3' },
        ],
        hint: 'Use a dict to count words, then print sorted keys.',
    },
    {
        id: 10, title: 'Matrix Diagonal Sum', difficulty: 'Hard', xp: 30,
        description: "Read N, then N rows of space-separated integers (N×N matrix).\nPrint sum of both diagonals. Don't double-count center if N is odd.\n\nExample:\nInput:\n3\n1 2 3\n4 5 6\n7 8 9\nOutput: 25\n\n(1+5+9 + 3+5+7 - 5 = 25)",
        starterCode: 'n = int(input())\nmatrix = []\nfor i in range(n):\n    row = list(map(int, input().split()))\n    matrix.append(row)\n# Your solution goes here\n',
        testCases: [
            { input: '3\n1 2 3\n4 5 6\n7 8 9', expected: '25' },
            { input: '2\n1 2\n3 4', expected: '10' },
        ],
        hint: 'Sum matrix[i][i] + matrix[i][n-1-i]. Subtract matrix[n//2][n//2] if n is odd.',
    },
];

/* ─── Colors ─── */
const C = {
    primary: '#1d1d1f', gray: '#86868b', light: '#f5f5f7',
    border: '#e5e5e5', success: '#34c759', error: '#ff3b30', warn: '#ff9500',
};
const diffCol = {
    Easy: { bg: '#e8f9ef', color: '#34c759' },
    Medium: { bg: '#fff8e6', color: '#ff9500' },
    Hard: { bg: '#fff2f0', color: '#ff3b30' },
};

/* ═══════════════════════════════════════════
   CHALLENGE VIEW
   ═══════════════════════════════════════════ */
function ChallengeView({ challenge, onBack, onSolved }) {
    const [code, setCode] = useState(challenge.starterCode);
    const [results, setResults] = useState(null);
    const [running, setRunning] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [solved, setSolved] = useState(false);
    const [pyodideReady, setPyodideReady] = useState(!!pyodideInstance);
    const [loadingPyodide, setLoadingPyodide] = useState(false);

    // Pre-load Pyodide
    useEffect(() => {
        if (!pyodideInstance) {
            setLoadingPyodide(true);
            getPyodide().then(() => {
                setPyodideReady(true);
                setLoadingPyodide(false);
            }).catch(() => setLoadingPyodide(false));
        }
    }, []);

    const handleRun = useCallback(async () => {
        setRunning(true);
        setResults(null);

        const testResults = [];
        for (const tc of challenge.testCases) {
            const res = await runPython(code, tc.input);
            const actual = (res.output || '').replace(/\r\n/g, '\n').trim();
            const expected = tc.expected.trim();
            const passed = res.success && actual === expected;
            testResults.push({ ...tc, output: actual, error: res.error, passed });
        }

        setResults(testResults);
        setRunning(false);

        if (testResults.every(r => r.passed)) {
            setSolved(true);
            onSolved(challenge.id);
        }
    }, [code, challenge, onSolved]);

    const allPassed = results?.every(r => r.passed);
    const passedCount = results?.filter(r => r.passed).length ?? 0;
    const total = challenge.testCases.length;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: "'Inter',-apple-system,sans-serif" }}>
            {/* ── Top Bar ── */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0,
                padding: '14px 24px', borderBottom: `1px solid ${C.border}`, background: '#fff',
            }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: C.gray, fontFamily: 'inherit', fontWeight: 600 }}>← Back</button>
                <div style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', background: C.primary, color: '#fff' }}>
                    Challenge Activity
                </div>
                <span style={{ fontSize: '15px', fontWeight: 700, color: C.primary }}>{challenge.title}</span>
                <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, ...diffCol[challenge.difficulty] }}>{challenge.difficulty}</span>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {solved && <span style={{ padding: '6px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, background: C.success, color: '#fff' }}>✓ Solved</span>}
                    <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: C.light, color: C.gray }}>{challenge.xp} XP</span>
                </div>
            </div>

            {/* ── Split ── */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* LEFT: Problem + Results */}
                <div style={{ width: '38%', overflowY: 'auto', borderRight: `1px solid ${C.border}`, background: '#fafafa', padding: '24px' }}>
                    <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#333', whiteSpace: 'pre-wrap', margin: '0 0 20px' }}>
                        {challenge.description}
                    </p>

                    {/* Hint */}
                    <button onClick={() => setShowHint(!showHint)} style={{ fontSize: '13px', color: C.warn, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit', padding: 0 }}>
                        {showHint ? '🙈 Hide hint' : '💡 Need help?'}
                    </button>
                    <AnimatePresence>
                        {showHint && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                                <div style={{ margin: '12px 0', padding: '12px 16px', borderRadius: '10px', background: '#fff8e6', fontSize: '13px', color: '#7a5a00', lineHeight: 1.6, fontFamily: "'SF Mono','Fira Code',monospace" }}>
                                    💡 {challenge.hint}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Loading indicator */}
                    {loadingPyodide && !pyodideReady && (
                        <div style={{ margin: '20px 0', padding: '14px 18px', borderRadius: '12px', background: '#f0f4ff', border: '1px solid #d0d8f0', textAlign: 'center' }}>
                            <p style={{ fontSize: '14px', fontWeight: 600, color: '#2563eb', margin: '0 0 4px' }}>⏳ Loading Python runtime...</p>
                            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>First load takes ~5 seconds</p>
                        </div>
                    )}

                    {/* Results */}
                    {results && (
                        <div style={{ marginTop: '24px' }}>
                            <div style={{
                                padding: '16px 18px', borderRadius: '12px', marginBottom: '14px',
                                background: allPassed ? '#f0fdf4' : '#fff2f0',
                                border: `2px solid ${allPassed ? C.success : C.error}`, textAlign: 'center',
                            }}>
                                <p style={{ fontSize: '18px', fontWeight: 800, color: allPassed ? C.success : C.error, margin: '0 0 4px' }}>
                                    {allPassed ? '🎉 All tests passed!' : `❌ ${total - passedCount} test(s) failed`}
                                </p>
                                <p style={{ fontSize: '13px', color: allPassed ? '#2d9b4e' : '#c93025', margin: 0 }}>
                                    {passedCount}/{total} passed{allPassed ? ` · +${challenge.xp} XP` : ''}
                                </p>
                            </div>

                            {results.map((r, i) => (
                                <div key={i} style={{
                                    borderRadius: '10px', padding: '14px 16px', marginBottom: '8px',
                                    background: r.passed ? '#f0fdf4' : '#fff',
                                    borderLeft: `4px solid ${r.passed ? C.success : C.error}`,
                                    boxShadow: r.passed ? 'none' : '0 1px 6px rgba(0,0,0,0.04)',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <span style={{
                                            width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                                            background: r.passed ? C.success : C.error, fontSize: '12px', color: '#fff', fontWeight: 700,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>{r.passed ? '✓' : '✕'}</span>
                                        <span style={{ fontSize: '13px', fontWeight: 700, color: r.passed ? C.success : C.error }}>Test {i + 1}</span>
                                    </div>
                                    <div style={{ fontSize: '12px', fontFamily: "'SF Mono','Fira Code',Consolas,monospace", color: '#444' }}>
                                        <div style={{ marginBottom: '4px' }}><span style={{ color: C.gray, fontWeight: 600 }}>Input:    </span>{r.input}</div>
                                        <div style={{ marginBottom: '4px' }}><span style={{ color: C.gray, fontWeight: 600 }}>Expected: </span>{r.expected.replace(/\n/g, ' ↵ ')}</div>
                                        <div><span style={{ color: r.passed ? C.success : C.error, fontWeight: 600 }}>Got:      </span><span style={{ color: r.passed ? '#333' : C.error }}>{r.output.replace(/\n/g, ' ↵ ') || '(empty)'}</span></div>
                                        {r.error && !r.passed && (
                                            <div style={{ marginTop: '6px', padding: '8px 10px', borderRadius: '6px', background: '#fff2f0', color: C.error, fontSize: '11px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                {r.error}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT: Editor */}
                <div style={{ width: '62%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                        {/* Line nums */}
                        <div style={{
                            width: '44px', background: '#f8f8f8', borderRight: '1px solid #eee',
                            padding: '16px 8px 16px 0', textAlign: 'right',
                            fontFamily: "'SF Mono','Fira Code',Consolas,monospace",
                            fontSize: '13px', lineHeight: '1.55', color: '#ccc', userSelect: 'none', overflowY: 'hidden',
                        }}>
                            {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                        </div>
                        <textarea
                            value={code} onChange={e => setCode(e.target.value)} spellCheck={false}
                            style={{
                                flex: 1, padding: '16px', border: 'none', outline: 'none',
                                fontFamily: "'SF Mono','Fira Code',Consolas,monospace",
                                fontSize: '13px', lineHeight: '1.55', color: C.primary,
                                background: '#fff', resize: 'none', tabSize: 4,
                            }}
                            onKeyDown={e => {
                                if (e.key === 'Tab') {
                                    e.preventDefault();
                                    const s = e.target.selectionStart;
                                    setCode(code.substring(0, s) + '    ' + code.substring(e.target.selectionEnd));
                                    requestAnimationFrame(() => { e.target.selectionStart = e.target.selectionEnd = s + 4; });
                                }
                            }}
                        />
                    </div>

                    {/* Run bar */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0,
                        padding: '14px 20px', borderTop: `1px solid ${C.border}`, background: '#fafafa',
                    }}>
                        <button onClick={handleRun} disabled={running || !pyodideReady} style={{
                            padding: '11px 32px', borderRadius: '10px', border: 'none',
                            background: pyodideReady ? C.success : '#ccc', color: '#fff',
                            fontSize: '15px', fontWeight: 700, fontFamily: 'inherit',
                            cursor: (running || !pyodideReady) ? 'not-allowed' : 'pointer',
                            opacity: running ? 0.6 : 1, boxShadow: pyodideReady ? '0 2px 8px rgba(52,199,89,0.3)' : 'none',
                        }}>
                            {running ? '⏳ Running...' : !pyodideReady ? '⏳ Loading Python...' : '▶ Run'}
                        </button>

                        {results && !running && (
                            <span style={{ fontSize: '13px', fontWeight: 600, color: allPassed ? C.success : C.error }}>
                                {passedCount}/{total} tests passed
                            </span>
                        )}
                        {solved && (
                            <span style={{ marginLeft: 'auto', padding: '6px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, background: '#e8f9ef', color: C.success }}>
                                +{challenge.xp} XP ✨
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


/* ═══════════════════════════════════════════
   CHALLENGE LIST
   ═══════════════════════════════════════════ */
function ChallengeList({ challenges, onSelect, completed }) {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, color: C.primary, margin: '0 0 8px' }}>🐍 Python Challenges</h1>
                <p style={{ fontSize: '15px', color: C.gray, margin: '0 0 8px' }}>Write real Python code and solve problems</p>
                <p style={{ fontSize: '13px', color: '#aeaeb2', margin: 0 }}>
                    {completed.size}/{challenges.length} solved · {challenges.reduce((a, c) => a + (completed.has(c.id) ? c.xp : 0), 0)} XP
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {challenges.map((ch, i) => {
                    const done = completed.has(ch.id);
                    return (
                        <motion.div key={ch.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                            <div onClick={() => onSelect(ch)} style={{
                                background: '#fff', borderRadius: '14px', padding: '16px 20px',
                                boxShadow: '0 1px 6px rgba(0,0,0,0.04)', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '14px',
                                transition: 'box-shadow 0.2s, transform 0.2s',
                                borderLeft: done ? `4px solid ${C.success}` : '4px solid transparent',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '10px',
                                    background: done ? C.success : C.light,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '14px', fontWeight: 700, color: done ? '#fff' : C.gray, flexShrink: 0,
                                }}>{done ? '✓' : i + 1}</div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '14px', fontWeight: 700, color: C.primary, margin: '0 0 3px' }}>{ch.title}</p>
                                    <p style={{ fontSize: '12px', color: C.gray, margin: 0 }}>{ch.testCases.length} test cases · {ch.xp} XP</p>
                                </div>
                                {done && <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, background: '#e8f9ef', color: C.success }}>Solved ✓</span>}
                                <span style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, ...diffCol[ch.difficulty] }}>{ch.difficulty}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}


/* ═══════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════ */
export default function ChallengePage() {
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [completed, setCompleted] = useState(() => {
        try {
            const saved = localStorage.getItem('tezcode_challenges');
            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch { return new Set(); }
    });

    const handleSolved = useCallback((id) => {
        setCompleted(prev => {
            const next = new Set(prev);
            next.add(id);
            localStorage.setItem('tezcode_challenges', JSON.stringify([...next]));
            return next;
        });
    }, []);

    if (selectedChallenge) {
        return <ChallengeView challenge={selectedChallenge} onBack={() => setSelectedChallenge(null)} onSolved={handleSolved} />;
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f7', fontFamily: "'Inter',-apple-system,sans-serif" }}>
            <ChallengeList challenges={CHALLENGES} onSelect={setSelectedChallenge} completed={completed} />
        </div>
    );
}
