/* ═══════════════════════════════════════════════════════
   UNIFIED CODE RUNNER SERVICE
   Supports Python (via Pyodide) and JavaScript (v8)
   ═══════════════════════════════════════════════════════ */

let pyodideInstance = null;
let pyodideLoading = false;
let pyodideLoadCallbacks = [];

async function getPyodide() {
    if (pyodideInstance) return pyodideInstance;
    if (pyodideLoading) {
        return new Promise(r => {
            pyodideLoadCallbacks.push(r);
        });
    }
    pyodideLoading = true;
    try {
        if (typeof window.loadPyodide === 'undefined') {
            throw new Error('Pyodide script not loaded. Check index.html');
        }
        pyodideInstance = await window.loadPyodide();
        pyodideLoadCallbacks.forEach(cb => cb(pyodideInstance));
        pyodideLoadCallbacks = [];
        return pyodideInstance;
    } catch (err) {
        pyodideLoading = false;
        console.error('Failed to load Pyodide:', err);
        throw err;
    }
}

/**
 * Runs code locally in the browser based on the language.
 * @param {string} code - The code to execute.
 * @param {string} language - 'python' or 'javascript'.
 * @param {string} stdin - Optional input for the execution.
 * @returns {Promise<{success: boolean, output: string, error: string}>}
 */
export async function runCode(code, language, stdin = "") {
    if (language === 'python') {
        return runPython(code, stdin);
    } else if (language === 'javascript') {
        return runJavaScript(code, stdin);
    } else {
        return { success: false, output: '', error: `Unsupported language: ${language}` };
    }
}

async function runPython(code, stdin = "") {
    try {
        const py = await getPyodide();

        // Setup pipes
        py.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
sys.stdin = io.StringIO("""${(stdin || "").replace(/"""/g, '\\"\\"\\"')}""")
        `);

        try {
            py.runPython(code);
            const output = py.runPython('sys.stdout.getvalue()');
            const stderr = py.runPython('sys.stderr.getvalue()');

            const isRealError = stderr && (
                stderr.includes('Traceback') ||
                stderr.includes('Error') ||
                stderr.includes('Exception')
            );

            if (isRealError) {
                return { success: false, output: output, error: stderr };
            }
            return { success: true, output: output, error: '' };
        } catch (e) {
            return { success: false, output: '', error: e.message || String(e) };
        }
    } catch (err) {
        return { success: false, output: '', error: err.message };
    }
}

async function runJavaScript(code, stdin = "") {
    try {
        let output = "";
        const originalLog = console.log;

        // Mock stdin
        const inputs = stdin.split('\n');
        let inputIdx = 0;
        const input = () => {
            return inputs[inputIdx++] || "";
        };

        // Mock console.log to capture output
        const logs = [];
        const mockLog = (...args) => {
            logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        };

        try {
            // Simple sandbox using Function
            const fn = new Function('input', 'console', code);
            fn(input, { log: mockLog, error: mockLog, warn: mockLog });
            output = logs.join('\n');
            return { success: true, output: output, error: '' };
        } catch (e) {
            return { success: false, output: logs.join('\n'), error: e.message || String(e) };
        }
    } catch (err) {
        return { success: false, output: '', error: err.message };
    }
}
