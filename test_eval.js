const outputsMatch = (actual, expected) => {
    if (actual === expected) return true;
    if (actual == null || expected == null) return actual === expected;

    let a = String(actual).trim();
    let e = String(expected).trim();
    if (a === e) return true;

    // Normalize formatting for lists, tuples, and common literals
    const normalize = (val) => {
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
        return s.trim();
    };

    const normA = normalize(a);
    const normE = normalize(e);

    if (normA === normE) return true;

    // Final loose check for booleans if still not matching
    if (a.toLowerCase() === e.toLowerCase() && ['true', 'false', 'none'].includes(a.toLowerCase())) return true;

    return false;
};

const testCases = [
    { a: "Hello World", e: "Hello World", expected: true },
    { a: "Hello World\n", e: "Hello World", expected: true },
    { a: "1 2 3", e: "1  2  3", expected: true },
    { a: "[1, 2, 3]", e: "[1,2,3]", expected: true },
    { a: "(1, 2, 3)", e: "[1, 2, 3]", expected: true },
    { a: "True", e: "true", expected: true },
    { a: "None", e: "null", expected: true },
    { a: "'hello'", e: '"hello"', expected: true },
    { a: "3.14159", e: "3.1416", expected: false }, // Should fail if precision matters
    { a: "1\n2\n3", e: "1 2 3", expected: true }, // Normalized should match
];

testCases.forEach((tc, i) => {
    const result = outputsMatch(tc.a, tc.e);
    console.log(`Test ${i}: ${result === tc.expected ? 'PASS' : 'FAIL'} (Actual: ${result}, Expected: ${tc.expected})`);
    if (result !== tc.expected) {
        console.log(`  Input: A="${tc.a}", E="${tc.e}"`);
    }
});
