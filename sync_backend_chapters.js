const fs = require('fs');
const filepath = 'client/src/pages/CourseReaderPage.jsx';
const content = fs.readFileSync(filepath, 'utf-8');

// Extract the COURSE object chapters
const startMarker = 'const COURSE = {';
const chaptersStart = content.indexOf('chapters: [', content.indexOf(startMarker));
const chaptersEnd = content.indexOf('],', chaptersStart) + 1; // Find the end of chapters array

// This is a bit risky due to the object structure, so let's use a more robust way to get titles/ids
const chapters = [];
const chapterRegex = /\/\* ────── (\d+)\. (.*?) ────── \*\/\s*\{\s*id: '([^']+)', title: '([^']+)',\s*sections: \[([\s\S]*?)\]\s*\}/g;

let match;
while ((match = chapterRegex.exec(content)) !== null) {
    const sections = [];
    const sectionRegex = /id: '([^']+)', title: '([^']+)'/g;
    let sMatch;
    while ((sMatch = sectionRegex.exec(match[5])) !== null) {
        sections.push({ id: sMatch[1], title: sMatch[2] });
    }
    chapters.push({
        id: match[3],
        title: match[4],
        sections: sections
    });
}

const syncFile = 'server/sync_structure.js';
let syncContent = fs.readFileSync(syncFile, 'utf-8');

const courseDataStr = `const COURSE_DATA = ${JSON.stringify({ title: 'Introduction to Python', chapters: chapters }, null, 4)};`;

// Replace the old COURSE_DATA
const oldStart = syncContent.indexOf('const COURSE_DATA = {');
const oldEnd = syncContent.indexOf('};', oldStart) + 2;

syncContent = syncContent.substring(0, oldStart) + courseDataStr + syncContent.substring(oldEnd);

fs.writeFileSync(syncFile, syncContent);
console.log(`Updated sync_structure.js with ${chapters.length} chapters.`);
