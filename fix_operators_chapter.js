const fs = require('fs');
const file = 'client/src/pages/CourseReaderPage.jsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

if (lines[974].includes('}, {') && lines[1047].includes('},')) {
    lines[974] = '        },';
    // Delete from index 975 up to 1047 (inclusive)
    lines.splice(975, 73);
    fs.writeFileSync(file, lines.join('\n'));
    console.log("Successfully removed duplicated sections from operators chapter.");
} else {
    console.log("Lines didn't match.");
    console.log(974, lines[974]);
    console.log(1047, lines[1047]);
}
