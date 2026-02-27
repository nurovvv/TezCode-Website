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

const tests = [
    { actual: "  [1,2,1, 1,2,1]  ", expected: "[1, 2, 1, 1, 2, 1]", shouldMatch: true },
    { actual: "(1, 2, 1)", expected: "[1, 2, 1]", shouldMatch: true },
    { actual: "['h','e']", expected: "['h', 'e']", shouldMatch: true },
    { actual: "['h','e']", expected: '["h", "e"]', shouldMatch: true },
    { actual: "True", expected: "true", shouldMatch: true },
    { actual: "None", expected: "none", shouldMatch: true },
    { actual: "[True, False]", expected: "[true, false]", shouldMatch: true },
    { actual: "[True, False]", expected: "[True, False]", shouldMatch: true },
    { actual: "abc", expected: "abc\n", shouldMatch: true },
    { actual: "123", expected: "123", shouldMatch: true },
    { actual: "Hello World", expected: "hello world", shouldMatch: false }, // SUCCESS! Should not match now
    { actual: "It is True", expected: "it is true", shouldMatch: false }, // SUCCESS! Should not match now
    { actual: "True", expected: "None", shouldMatch: false }
];

tests.forEach((t, i) => {
    const result = outputsMatch(t.actual, t.expected);
    if (result === t.shouldMatch) {
        console.log(`Test ${i} passed`);
    } else {
        console.error(`Test ${i} failed! actual: "${t.actual}", expected: "${t.expected}", result: ${result}, expected match: ${t.shouldMatch}`);
    }
});
