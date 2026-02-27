const fs = require('fs');
const filepath = 'client/src/pages/CourseReaderPage.jsx';

let content = fs.readFileSync(filepath, 'utf-8');

// Use exact string indexOf instead of regex to avoid regex escaping errors with special chars
const opStart = content.indexOf('/* ────── 10. Python Operators ────── */');
const strStart = content.indexOf('/* ────── 11. Python Strings ────── */');
const boolStart = content.indexOf('/* ────── 12. Python Booleans ────── */');
const listsStart = content.indexOf('/* ────── 13. Python Lists ────── */');

if (opStart === -1 || strStart === -1 || boolStart === -1 || listsStart === -1) {
    console.error("Could not find one of the headers");
    process.exit(1);
}

let opMatch = content.slice(opStart, strStart);
let strMatch = content.slice(strStart, boolStart);
let boolMatch = content.slice(boolStart, listsStart);

opMatch = opMatch.replace('10. Python Operators', '12. Python Operators');
strMatch = strMatch.replace('11. Python Strings', '10. Python Strings');
boolMatch = boolMatch.replace('12. Python Booleans', '11. Python Booleans');

const allThree = content.slice(opStart, listsStart);
const newThree = strMatch + boolMatch + opMatch;

content = content.replace(allThree, newThree);

fs.writeFileSync(filepath, content);
console.log('Reordering successful!');
