const fs = require('fs');
const file = 'client/src/pages/CourseReaderPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const classesSection = `
    /* ────── 22. Python Classes ────── */
        {
            id: 'classes', title: 'Python Classes',
            sections: [
                {
                    id: 'classes-oop', title: 'Python OOP',
                    content: \`<p>Python is an object oriented programming language.</p>
<p>Almost everything in Python is an object, with its properties and methods.</p>
<p>A Class is like an object constructor, or a "blueprint" for creating objects.</p>\`,
                    examples: [],
                    exercise: null
                }
            ]
        },`;

let insertIdx = content.indexOf('/* ────── 23. Python Functions ────── */');
if (insertIdx !== -1) {
    if (!content.includes('id: \'classes\'')) {
        content = content.substring(0, insertIdx) + classesSection + '\n' + content.substring(insertIdx);
        fs.writeFileSync(file, content);
        console.log("Inserted Python Classes successfully.");
    } else {
        console.log("Python Classes already exists.");
    }
} else {
    console.log("Could not find insertion point.");
}
