const fs = require('fs');
const file = 'client/src/pages/CourseReaderPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// The file has \r\\n (CR + literal backslash + n) instead of \r\n
// Replace all occurrences of \r\\n with \r\n
content = content.replace(/\r\\n/g, '\r\n');

fs.writeFileSync(file, content);
const lines = content.split('\n');
console.log('Fixed! Line count:', lines.length);
