const fs = require('fs');
const courseFile = 'client/src/pages/CourseReaderPage.jsx';
let courseContent = fs.readFileSync(courseFile, 'utf8');

// 1. Python Lists
const expandListsContent = fs.readFileSync('expand_lists.js', 'utf8');
let listReplMatch = expandListsContent.match(/const replacement = `([\s\S]*?)`;/);
if (listReplMatch) {
    let listRepl = listReplMatch[1];
    // Remove the comment header
    listRepl = listRepl.replace(/.*Python Lists ────── \*\/\r?\n/, '');

    // Replace in course
    let startIdx = courseContent.indexOf('/* ────── 14. Python Lists ────── */');
    let endIdx = courseContent.indexOf('/* ────── 15. Python Tuples ────── */');

    if (startIdx !== -1 && endIdx !== -1) {
        // Find the line ending after the comment
        let startContentIdx = courseContent.indexOf('\n', startIdx) + 1;
        courseContent = courseContent.substring(0, startContentIdx) + listRepl + '\n\n' + courseContent.substring(endIdx);
        console.log("Replaced Python Lists");
    } else {
        console.log("Could not find start/end for Python Lists in CourseReaderPage.jsx", startIdx, endIdx);
    }
} else {
    console.log("Could not extract replacement from expand_lists.js");
}

// 2. Python If...Else
const expandIfElseContent = fs.readFileSync('expand_ifelse.js', 'utf8');
let ifReplMatch = expandIfElseContent.match(/const replacement = `([\s\S]*?)`;/);
if (ifReplMatch) {
    let ifRepl = ifReplMatch[1];
    // Remove the comment header
    ifRepl = ifRepl.replace(/.*Python If\.\.\.Else ────── \*\/\r?\n/, '');

    // Replace in course
    let startIdx = courseContent.indexOf('/* ────── 18. Python If...Else ────── */');
    let endIdx = courseContent.indexOf('/* ────── 19. Python Match ────── */');

    if (startIdx !== -1 && endIdx !== -1) {
        let startContentIdx = courseContent.indexOf('\n', startIdx) + 1;
        courseContent = courseContent.substring(0, startContentIdx) + ifRepl + '\n\n' + courseContent.substring(endIdx);
        console.log("Replaced Python If...Else");
    } else {
        console.log("Could not find start/end for Python If...Else in CourseReaderPage.jsx", startIdx, endIdx);
    }
} else {
    console.log("Could not extract replacement from expand_ifelse.js");
}

fs.writeFileSync(courseFile, courseContent);
console.log("Done");
