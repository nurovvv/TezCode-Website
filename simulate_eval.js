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

// Mock challenge data from seed
const challenge = {
    testCases: [
        { input: "[1,2,1]", expectedOutput: "[1, 2, 1, 1, 2, 1]" },
        { input: "[1,3,2,1]", expectedOutput: "[1, 3, 2, 1, 1, 3, 2, 1]" }
    ]
};

// Mock runCode that behaves like Pyodide
const mockRunCode = async (code, language, stdin) => {
    // Correct solution for "Concatenation of Array"
    if (code.includes('nums + nums')) {
        // Simple mock: it evaluates nums + nums based on stdin
        let numsStr = stdin.trim();
        let nums = JSON.parse(numsStr);
        let result = [...nums, ...nums];
        // Python prints lists with spaces
        let output = "[" + result.join(", ") + "]\n";
        return { success: true, output };
    }
    return { success: false, output: '', error: 'Unknown problem' };
};

async function simulateEvaluation() {
    const code = "import ast\nnums = ast.literal_eval(input())\nprint(nums + nums)";
    const language = "python";

    const evaluationResults = [];
    let passedAll = true;

    for (const tc of challenge.testCases || []) {
        const res = await mockRunCode(code, language, tc.input);
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

    console.log('Final Result:', passedAll ? 'PASSED' : 'FAILED');
    evaluationResults.forEach((r, i) => {
        console.log(`Case ${i + 1}: ${r.passed ? 'PASS' : 'FAIL'} | Expected: "${r.expectedOutput}" | Actual: "${r.actualOutput}"`);
    });
}

simulateEvaluation();
