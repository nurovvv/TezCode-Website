const fs = require('fs');
const code = fs.readFileSync('client/src/pages/CourseReaderPage.jsx', 'utf8');
const acorn = require('acorn');
const jsx = require('acorn-jsx');

const parser = acorn.Parser.extend(jsx());

try {
    parser.parse(code, { sourceType: 'module', ecmaVersion: 2020 });
    console.log("No syntax error found by acorn!");
} catch (e) {
    console.log("Acorn Parse Error:", e.name, e.message);
    const loc = e.loc;
    if (loc) {
        console.log("Error at line", loc.line, "column", loc.column);
        const lines = code.split('\n');
        const start = Math.max(0, loc.line - 5);
        const end = Math.min(lines.length, loc.line + 5);
        for (let i = start; i < end; i++) {
            console.log(`${i + 1}: ${lines[i]}`);
            if (i === loc.line - 1) {
                console.log(' '.repeat(loc.column + 3) + '^');
            }
        }
    } else {
        console.log(e);
    }
}
