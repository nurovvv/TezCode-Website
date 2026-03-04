/**
 * POST /api/run-code
 * Body: { code: string, language: string, input: string }
 * 
 * Generalized code runner supporting multiple compiled/interpreted languages.
 * Writes code to a temp file, compiles if needed, then executes.
 */
const { execFile, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const router = require('express').Router();

const TIMEOUT = 15000; // 15 seconds
const MAX_BUFFER = 1024 * 64; // 64KB

// Language configurations
const LANGUAGES = {
    python: {
        ext: '.py',
        run: (filepath) => ({ cmd: 'python', args: [filepath] }),
        env: { PYTHONIOENCODING: 'utf-8' }
    },
    javascript: {
        ext: '.js',
        run: (filepath) => ({ cmd: 'node', args: [filepath] }),
    },
    java: {
        ext: '.java',
        // Java needs the file named after the public class, so we use Main.java
        prepare: (code) => {
            // If user didn't write a class, wrap it
            if (!code.includes('class ')) {
                return `import java.util.*;\nimport java.io.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        ${code}\n    }\n}`;
            }
            return code;
        },
        filename: 'Main.java',
        compile: (filepath, dir) => ({ cmd: 'javac', args: [filepath] }),
        run: (filepath, dir) => ({ cmd: 'java', args: ['-cp', dir, 'Main'] }),
    },
    cpp: {
        ext: '.cpp',
        compile: (filepath, dir) => {
            const out = path.join(dir, 'a.out');
            return { cmd: 'g++', args: [filepath, '-o', out, '-std=c++17'] };
        },
        run: (filepath, dir) => ({ cmd: path.join(dir, 'a.out'), args: [] }),
    },
    go: {
        ext: '.go',
        run: (filepath) => ({ cmd: 'go', args: ['run', filepath] }),
    },
    csharp: {
        ext: '.cs',
        prepare: (code) => {
            if (!code.includes('class ') && !code.includes('namespace ')) {
                return `using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main(string[] args) {\n        ${code}\n    }\n}`;
            }
            return code;
        },
        compile: (filepath, dir) => {
            const out = path.join(dir, 'program.exe');
            return { cmd: 'csc', args: ['-out:' + out, filepath] };
        },
        run: (filepath, dir) => {
            const exe = path.join(dir, 'program.exe');
            // On Unix, use mono; on Windows, run directly
            if (os.platform() === 'win32') {
                return { cmd: exe, args: [] };
            }
            return { cmd: 'mono', args: [exe] };
        }
    },
    kotlin: {
        ext: '.kt',
        compile: (filepath, dir) => {
            const jar = path.join(dir, 'program.jar');
            return { cmd: 'kotlinc', args: [filepath, '-include-runtime', '-d', jar] };
        },
        run: (filepath, dir) => {
            const jar = path.join(dir, 'program.jar');
            return { cmd: 'java', args: ['-jar', jar] };
        },
    },
    swift: {
        ext: '.swift',
        run: (filepath) => ({ cmd: 'swift', args: [filepath] }),
    },
};

router.post('/', async (req, res) => {
    const { code, language, input } = req.body;

    if (!code) {
        return res.status(400).json({ success: false, error: 'No code provided' });
    }

    const langConfig = LANGUAGES[language];
    if (!langConfig) {
        return res.status(400).json({ success: false, error: `Unsupported language: ${language}` });
    }

    // Create a temp directory for this run
    const tmpDir = path.join(os.tmpdir(), `tezcode_${Date.now()}_${Math.random().toString(36).slice(2)}`);
    fs.mkdirSync(tmpDir, { recursive: true });

    const filename = langConfig.filename || `main${langConfig.ext}`;
    const filepath = path.join(tmpDir, filename);

    try {
        // Prepare code (apply wrappers if needed)
        const preparedCode = langConfig.prepare ? langConfig.prepare(code) : code;
        fs.writeFileSync(filepath, preparedCode, 'utf8');

        // Compile if needed
        if (langConfig.compile) {
            const compileConfig = langConfig.compile(filepath, tmpDir);
            const compileResult = await executeProcess(compileConfig.cmd, compileConfig.args, '', { timeout: TIMEOUT });
            if (!compileResult.success) {
                return res.json({
                    success: false,
                    output: '',
                    error: `Compilation Error:\n${compileResult.error}`
                });
            }
        }

        // Run
        const runConfig = langConfig.run(filepath, tmpDir);
        const env = { ...process.env, ...(langConfig.env || {}) };
        const result = await executeProcess(runConfig.cmd, runConfig.args, input || '', { timeout: TIMEOUT, env });
        res.json(result);

    } catch (err) {
        res.status(500).json({ success: false, output: '', error: err.message });
    } finally {
        // Clean up temp directory
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch { }
    }
});

function executeProcess(cmd, args, input, options = {}) {
    return new Promise((resolve) => {
        const proc = execFile(cmd, args, {
            timeout: options.timeout || TIMEOUT,
            maxBuffer: MAX_BUFFER,
            env: options.env || process.env,
        }, (err, stdout, stderr) => {
            if (err) {
                if (err.killed) {
                    resolve({ success: false, output: '', error: 'Time limit exceeded (15s)' });
                } else {
                    const errorMsg = stderr
                        ? stderr.split('\n').filter(l => l.trim()).slice(-5).join('\n')
                        : err.message;
                    resolve({ success: false, output: stdout || '', error: errorMsg });
                }
            } else {
                resolve({ success: true, output: stdout, error: stderr || '' });
            }
        });

        if (input && proc.stdin) {
            proc.stdin.write(input);
            proc.stdin.end();
        }
    });
}

module.exports = router;
