function oldHighlightPython(code) {
    if (!code) return '';
    let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return escaped
        .replace(/#.*$/gm, '<span style="color: #6a737d;">$&</span>')
        .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span style="color: #228b22;">$&</span>')
        .replace(/\b(print|if|else|elif|for|while|return|import|as|from|in|is|not|and|or)\b/g, '<span style="color: #0000ff;">$&</span>');
}

function newHighlightPython(code) {
    if (!code) return '';
    let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Combined regex for comments, strings, and keywords
    const regex = /(#.*$)|((["'])(?:(?=(\\?))\4.)*?\3)|\b(print|if|else|elif|for|while|return|import|as|from|in|is|not|and|or)\b/gm;

    return escaped.replace(regex, (match, comment, string, q, esc, keyword) => {
        if (comment) {
            return `<span style="color: #6a737d;">${comment}</span>`;
        }
        if (string) {
            return `<span style="color: #228b22;">${string}</span>`;
        }
        if (keyword) {
            return `<span style="color: #0000ff;">${keyword}</span>`;
        }
        return match;
    });
}

const testCode = 'x = 10\ny = 3\n\nprint(x * y) # 30 (Multiplication)\nprint(x / y) # 3.3333333333333335 (Division)';

console.log("OLD HIGHLIGHT:");
console.log(oldHighlightPython(testCode));
console.log("\nNEW HIGHLIGHT:");
console.log(newHighlightPython(testCode));

const problematicCode = 'print("Hello # world") # Comment';
console.log("\nPROBLEMATIC CODE (Strings with #):");
console.log("OLD HIGHLIGHT:");
console.log(oldHighlightPython(problematicCode));
console.log("\nNEW HIGHLIGHT:");
console.log(newHighlightPython(problematicCode));
