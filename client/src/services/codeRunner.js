/* ═══════════════════════════════════════════════════════
   UNIFIED CODE RUNNER SERVICE
   Supports Python (via Pyodide), JavaScript (in-browser),
   and server-side: Java, C++, Go, C#, Kotlin, Swift
   ═══════════════════════════════════════════════════════ */

import api from './api';

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

// Languages that run in the browser
const BROWSER_LANGUAGES = ['python', 'javascript'];

/**
 * Runs code based on the language.
 * Python/JS run in-browser; everything else goes to the server.
 */
export async function runCode(code, language, stdin = "") {
    if (language === 'python') {
        return runPython(code, stdin);
    } else if (language === 'javascript') {
        return runJavaScript(code, stdin);
    } else {
        // Server-side execution for compiled languages
        return runOnServer(code, language, stdin);
    }
}

async function runOnServer(code, language, input = "") {
    try {
        const res = await api.post('run-code', { code, language, input });
        return res.data;
    } catch (err) {
        if (err.response?.data) {
            return err.response.data;
        }
        return { success: false, output: '', error: err.message || 'Server execution failed' };
    }
}

async function runPython(code, stdin = "") {
    try {
        const py = await getPyodide();

        // 1. Detect required packages and load them dynamically
        const packagesToLoad = [];
        if (code.includes('import numpy') || code.includes('from numpy')) packagesToLoad.push('numpy');
        if (code.includes('import scipy') || code.includes('from scipy')) packagesToLoad.push('scipy');
        if (code.includes('import pandas') || code.includes('from pandas')) packagesToLoad.push('pandas');
        if (code.includes('import matplotlib') || code.includes('from matplotlib')) packagesToLoad.push('matplotlib');

        if (packagesToLoad.length > 0) {
            await py.loadPackage(packagesToLoad);
        }

        // Setup pipes and clear global namespace for isolation
        py.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
sys.stdin = io.StringIO("""${(stdin || "").replace(/\\/g, '\\\\').replace(/"""/g, '\\"\\"\\\"')}""")
custom_globals = {}
        `);

        try {
            // Execute code within the custom_globals namespace
            py.runPython(code, { globals: py.globals.get("custom_globals") });
        } catch (e) {
            const output = py.runPython('sys.stdout.getvalue()');
            const stderr = py.runPython('sys.stderr.getvalue()');
            const errMessage = e.message || String(e);
            return { success: false, output: output, error: stderr || errMessage };
        }

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
