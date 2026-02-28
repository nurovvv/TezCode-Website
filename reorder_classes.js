const fs = require('fs');

const frontendFile = 'client/src/pages/CourseReaderPage.jsx';
const syncFile = 'server/sync_structure.js';

// --- Reorder Frontend ---
let frontendContent = fs.readFileSync(frontendFile, 'utf-8');
const classesMarker = '/* ────── 22. Python Classes ────── */';
const nextChapterMarker = '/* ────── 23. Python Functions ────── */';

const startIndex = frontendContent.indexOf(classesMarker);
const endIndex = frontendContent.indexOf(nextChapterMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const classesBlock = frontendContent.substring(startIndex, endIndex);
    // Remove the block from current position
    frontendContent = frontendContent.substring(0, startIndex) + frontendContent.substring(endIndex);

    // Find the end of chapters array
    // It's after VirtualEnv
    const virtualEnvMarker = '/* ────── 37. Python VirtualEnv ────── */';
    const arrayEndMarker = '],'; // The closing bracket of the chapters array comes after the last chapter
    const lastChapterPos = frontendContent.indexOf(virtualEnvMarker);
    const insertIndex = frontendContent.indexOf(arrayEndMarker, lastChapterPos);

    if (insertIndex !== -1) {
        // Prepare the block to be at the end, maybe renumbered?
        // User wants it as Chapter 38 if we follow the numbering
        const renumberedBlock = classesBlock.replace('22. Python Classes', '38. Python Classes');
        frontendContent = frontendContent.substring(0, insertIndex) + renumberedBlock + frontendContent.substring(insertIndex);

        // Let's also re-number the chapters in between 22 and 37
        // (This might be complex to do with a simple regex, but let's try a bulk replace for the comments)
        for (let i = 23; i <= 37; i++) {
            frontendContent = frontendContent.replace(`────── ${i}.`, `────── ${i - 1}.`);
        }
    }

    fs.writeFileSync(frontendFile, frontendContent);
    console.log('Frontend reordering successful!');
} else {
    console.error('Frontend markers not found!', { startIndex, endIndex });
}

// --- Reorder Backend Sync ---
let syncContent = fs.readFileSync(syncFile, 'utf-8');
// Find the classes object in COURSE_DATA.chapters
const syncObjRegex = /\{\s*id: 'classes',[\s\S]*?\},/;
const match = syncContent.match(syncObjRegex);

if (match) {
    const classesSyncBlock = match[0];
    // Remove it
    syncContent = syncContent.replace(classesSyncBlock, '');

    // Find the end of the chapters array in sync file
    const arrayEndIndex = syncContent.lastIndexOf(']'); // Match the last ] within COURSE_DATA.chapters
    // Actually, sync_structure.js has a specific structure
    // Let's find the position before the very last ] of the chapters array
    const lastChapterMarker = 'virtualenv';
    const insertPos = syncContent.indexOf('}', syncContent.indexOf(lastChapterMarker)) + 1; // After the virtualenv object

    // This is getting a bit hacky, let's just use the fact that it's near the end
    const lastNewlineBeforeArrayEnd = syncContent.lastIndexOf('}', syncContent.lastIndexOf(']'));

    // Let's just append it before the very last ] that closes the array
    const penultimateBracket = syncContent.lastIndexOf(']');
    syncContent = syncContent.substring(0, penultimateBracket) + '        ' + classesSyncBlock + '\n    ' + syncContent.substring(penultimateBracket);

    fs.writeFileSync(syncFile, syncContent);
    console.log('Backend sync reordering successful!');
} else {
    console.error('Backend sync classes object not found!');
}
