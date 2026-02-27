/* ═══════════════════════════════════════════════════════
   PYODIDE SINGLETON SERVICE
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
        // Assume loadPyodide is available globally from script tag in index.html
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
 * Runs python code locally in the browser.
 * @param {string} code - The python code to execute.
 * @param {string} stdin - Optional input for the execution.
 * @returns {Promise<{success: boolean, output: string, error: string}>}
 */
export async function runPython(code, stdin = "") {
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

            // Only treat as failure if there's a real Python exception
            // (Pyodide can write harmless warnings to stderr)
            const isRealError = stderr && (
                stderr.includes('Traceback') ||
                stderr.includes('SyntaxError') ||
                stderr.includes('NameError') ||
                stderr.includes('TypeError') ||
                stderr.includes('ValueError') ||
                stderr.includes('IndentationError') ||
                stderr.includes('AttributeError') ||
                stderr.includes('ImportError') ||
                stderr.includes('ZeroDivisionError') ||
                stderr.includes('IndexError') ||
                stderr.includes('KeyError') ||
                stderr.includes('RecursionError')
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
