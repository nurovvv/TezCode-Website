const fs = require('fs');
const content = fs.readFileSync('client/src/pages/CourseReaderPage.jsx', 'utf8');

const regex = /(\/\* ────── 16\. Python If\.\.\.Else ────── \*\/[\s\S]*?)(\/\* ────── 17\. Python Loops ────── \*\/[\s\S]*?)(\/\* ────── 18\. Python Functions ────── \*\/[\s\S]*?)(\/\* ────── 19\. Python Dictionaries ────── \*\/[\s\S]*?)(    \],\r?\n\};)/;

const match = content.match(regex);
if (match) {
    const ifElse = match[1].replace('16. Python If...Else', '17. Python If...Else');
    const loops = match[2].replace('17. Python Loops', '18. Python Loops');
    const funcs = match[3].replace('18. Python Functions', '19. Python Functions');
    const dicts = match[4].replace('19. Python Dictionaries', '16. Python Dictionaries');
    const end = match[5];

    const replacement = dicts + ifElse + loops + funcs + end;
    const newContent = content.replace(regex, replacement);
    fs.writeFileSync('client/src/pages/CourseReaderPage.jsx', newContent, 'utf8');
    console.log("Success");
} else {
    console.log("No match found!");
    process.exit(1);
}
