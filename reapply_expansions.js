const fs = require('fs');
const courseFile = 'client/src/pages/CourseReaderPage.jsx';
let courseContent = fs.readFileSync(courseFile, 'utf8');

function getUnescapedReplacement(filename) {
    const fileContent = fs.readFileSync(filename, 'utf8');
    const match = fileContent.match(/const replacement = `([\s\S]*?)`;/);
    if (!match) return null;
    // The string inside the backticks. To get its actual logical value in JS, we eval it inside backticks.
    // However, if the text contains ${}, eval will try to evaluate the variable.
    // Fortunately there are no ${} in this text.
    let rawStr = match[1];
    let unescaped = eval('`' + rawStr + '`');
    // Remove the comment header from the replacement so we don't mess up numbering
    return unescaped.replace(/.*\/\* ────── \d+\..*────── \*\/\r?\n\s*/, '');
}

// 1. Reapply Python Lists
const listRepl = getUnescapedReplacement('expand_lists.js');
let startIdx1 = courseContent.indexOf('/* ────── 14. Python Lists ────── */');
let endIdx1 = courseContent.indexOf('/* ────── 15. Python Tuples ────── */');
if (startIdx1 !== -1 && endIdx1 !== -1 && listRepl) {
    let startContentIdx = courseContent.indexOf('\n', startIdx1) + 1;
    // Also, we need to add the leading spaces to match indentation since we stripped it.
    // Actually, `listRepl` starts with `{`. We can just indent with 8 spaces.
    courseContent = courseContent.substring(0, startContentIdx) + '        ' + listRepl + '\n\n' + courseContent.substring(endIdx1);
    console.log("Replaced Python Lists with unescaped content");
}

// 2. Reapply Python If...Else
const ifRepl = getUnescapedReplacement('expand_ifelse.js');
let startIdx2 = courseContent.indexOf('/* ────── 18. Python If...Else ────── */');
let endIdx2 = courseContent.indexOf('/* ────── 19. Python Match ────── */');
if (startIdx2 !== -1 && endIdx2 !== -1 && ifRepl) {
    let startContentIdx = courseContent.indexOf('\n', startIdx2) + 1;
    courseContent = courseContent.substring(0, startContentIdx) + '        ' + ifRepl + '\n\n' + courseContent.substring(endIdx2);
    console.log("Replaced Python If...Else with unescaped content");
}

fs.writeFileSync(courseFile, courseContent);
console.log("CourseReaderPage.jsx updated successfully.");
