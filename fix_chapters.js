const fs = require('fs');
const file = 'client/src/pages/CourseReaderPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const newChapterTemplate = `
        /* ────── 20. Python Classes ────── */
        {
            id: 'classes', title: 'Python Classes',
            sections: [
                {
                    id: 'classes-oop', title: 'Python OOP',
                    content: '<p>Python Classes</p>',
                    examples: [],
                }
            ]
        },`;

// Find the insertion point before Python Functions
const functionsIdx = content.indexOf('/* ────── 21. Python Functions ────── */');
if (functionsIdx !== -1) {
    // Check if it's already there
    if (!content.includes("id: 'classes', title: 'Python Classes'")) {
        content = content.slice(0, functionsIdx) + newChapterTemplate + '\n\n' + content.slice(functionsIdx);
        console.log("Inserted Python Classes chapter.");
    }
} else {
    // If "21. Python Functions" is not exactly that, find "Python Functions"
    const fallbackIdx = content.indexOf('Python Functions ────── */');
    if (fallbackIdx !== -1) {
        const startOfComment = content.lastIndexOf('/* ──────', fallbackIdx);
        if (!content.includes("id: 'classes', title: 'Python Classes'")) {
            content = content.slice(0, startOfComment) + newChapterTemplate + '\n\n        ' + content.slice(startOfComment);
            console.log("Inserted Python Classes chapter via fallback.");
        }
    }
}

// Renumbering all chapter comments
let counter = 1;
content = content.replace(/\/\* ────── \d+(?:\.\d+)?\.? (.*?) ────── \*\//g, (match, title) => {
    const res = `/* ────── ${counter}. ${title} ────── */`;
    counter++;
    return res;
});

fs.writeFileSync(file, content);
console.log("Renumbering complete. Total chapters:", counter - 1);
