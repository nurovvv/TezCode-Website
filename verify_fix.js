const outputsMatch = (actual, expected) => {
    if (actual === expected) return true;
    if (actual == null || expected == null) return actual === expected;

    // Normalize and trim each line individually to handle trailing whitespace on lines
    const normalizeLines = (str) => {
        return String(str)
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n');
    };

    let a = normalizeLines(actual);
    let e = normalizeLines(expected);

    if (a === e) return true;

    // Normalize formatting for lists, tuples, and common literals
    const normalizeForm = (val) => {
        let s = val
            .replace(/\s+/g, ' ')             // Collapse multi-spaces
            .replace(/\(\s*/g, '[')           // (1, 2) -> [1, 2]
            .replace(/\s*\)/g, ']')
            .replace(/,\s*/g, ', ')           // Normalize comma spacing
            .replace(/\[\s+/g, '[')           // [ 1, 2 ] -> [1, 2]
            .replace(/\s+\]/g, ']')
            .replace(/'/g, '"');              // 'string' -> "string"

        // Normalize boolean/none/null tokens regardless of case
        s = s.replace(/\b(true|false|none|null)\b/gi, (m) => m.toLowerCase())
            .replace(/\bnull\b/g, 'none');

        // Final trim of any remaining whitespace after normalization
        return s.trim();
    };

    const normA = normalizeForm(a);
    const normE = normalizeForm(e);

    if (normA === normE) return true;

    // Try numeric comparison if both are numbers or simple list of numbers
    try {
        const numA = parseFloat(normA);
        const numE = parseFloat(normE);
        if (!isNaN(numA) && !isNaN(numE) && Math.abs(numA - numE) < 1e-6) {
            return true;
        }
    } catch (err) {
        // Not numbers, ignore
    }

    // Final loose check for booleans if still not matching
    if (a.toLowerCase() === e.toLowerCase() && ['true', 'false', 'none'].includes(a.toLowerCase())) return true;

    return false;
};

const testCases = [
    { name: "Exact match", a: "Hello World", e: "Hello World", expected: true },
    { name: "Trailing newline", a: "Hello World\n", e: "Hello World", expected: true },
    { name: "Trailing space", a: "Hello World ", e: "Hello World", expected: true },
    { name: "Mixed line ending spacing", a: "Line 1  \nLine 2 ", e: "Line 1\nLine 2", expected: true },
    { name: "Empty lines", a: "Line 1\n\nLine 2", e: "Line 1\nLine 2", expected: true },
    { name: "Python List vs JS List", a: "[1, 2, 3]", e: "[1,2,3]", expected: true },
    { name: "Python Tuple vs JS List", a: "(1, 2, 3)", e: "[1, 2, 3]", expected: true },
    { name: "Python Bool (True) vs JSON Bool", a: "True", e: "true", expected: true },
    { name: "Python None vs JSON null", a: "None", e: "null", expected: true },
    { name: "Single vs Double quotes", a: "'hello'", e: '"hello"', expected: true },
    { name: "Numeric tolerance", a: "3.0000001", e: "3.0", expected: true },
    { name: "Numeric false positive", a: "3.1", e: "3.0", expected: false },
    { name: "Complex nested structure", a: "([1, 2], {'a': 1})", e: "[[1, 2], {\"a\": 1}]", expected: true },
];

testCases.forEach((tc, i) => {
    const result = outputsMatch(tc.a, tc.e);
    const passed = result === tc.expected;
    console.log(`Test ${i} (${tc.name}): ${passed ? '✅ PASS' : '❌ FAIL'}`);
    if (!passed) {
        console.log(`  Input: A="${tc.a}", E="${tc.e}"`);
        console.log(`  Result: ${result}, Expected: ${tc.expected}`);
    }
});
