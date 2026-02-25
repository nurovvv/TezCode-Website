const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const router = require('express').Router();

/**
 * POST /api/run-python
 * Body: { code: string, input: string }
 * Returns: { output: string, error: string, success: boolean }
 *
 * Runs Python code in a sandboxed subprocess with a timeout.
 */
router.post('/', async (req, res) => {
    const { code, input } = req.body;

    if (!code) {
        return res.status(400).json({ success: false, error: 'No code provided' });
    }

    // Write code to a temp file
    const tmpDir = os.tmpdir();
    const filename = `ziyobook_${Date.now()}_${Math.random().toString(36).slice(2)}.py`;
    const filepath = path.join(tmpDir, filename);

    try {
        fs.writeFileSync(filepath, code, 'utf8');

        // Try python3 first, then python
        const pythonCmd = await findPython();
        if (!pythonCmd) {
            return res.status(500).json({
                success: false,
                error: 'Python is not installed on this system. Please install Python 3 to run challenges.',
            });
        }

        const result = await runPython(pythonCmd, filepath, input || '');
        res.json(result);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        // Clean up temp file
        try { fs.unlinkSync(filepath); } catch { }
    }
});

function findPython() {
    return new Promise((resolve) => {
        // Try python first (Windows), then python3 (Unix)
        execFile('python', ['--version'], { timeout: 3000 }, (err) => {
            if (!err) return resolve('python');
            execFile('python3', ['--version'], { timeout: 3000 }, (err2) => {
                if (!err2) return resolve('python3');
                resolve(null);
            });
        });
    });
}

function runPython(cmd, filepath, input) {
    return new Promise((resolve) => {
        const proc = execFile(cmd, [filepath], {
            timeout: 10000,     // 10 second timeout
            maxBuffer: 1024 * 64, // 64KB max output
            env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
        }, (err, stdout, stderr) => {
            if (err) {
                if (err.killed) {
                    resolve({ success: false, output: '', error: 'Time limit exceeded (10s)' });
                } else {
                    // Extract meaningful error from stderr
                    const errorMsg = stderr
                        ? stderr.split('\n').filter(l => l.trim()).slice(-3).join('\n')
                        : err.message;
                    resolve({ success: false, output: stdout || '', error: errorMsg });
                }
            } else {
                resolve({ success: true, output: stdout, error: stderr || '' });
            }
        });

        // Send input to stdin
        if (input && proc.stdin) {
            proc.stdin.write(input);
            proc.stdin.end();
        }
    });
}

module.exports = router;
