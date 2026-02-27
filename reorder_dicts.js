const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'client/src/pages/CourseReaderPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

function extractChapter(startMarkerPattern) {
    const startIndex = content.search(startMarkerPattern);
    if (startIndex === -1) throw new Error("Start marker not found for " + startMarkerPattern);

    // Find next chapter marker or the end of the array
    let endIndex = content.substring(startIndex + 1).search(/\/\* ────── \d+\. Python /);
    if (endIndex === -1) {
        // Last chapter ends at "    ],\n};"
        endIndex = content.substring(startIndex + 1).search(/\n    \],\n\};/);
        if (endIndex === -1) throw new Error("End marker not found for last chapter");
    }

    endIndex += startIndex + 1;

    const chunk = content.substring(startIndex, endIndex);
    content = content.substring(0, startIndex) + content.substring(endIndex);
    return chunk;
}

try {
    const ifElseChunk = extractChapter(/\/\* ────── 16\. Python If\.\.\.Else ────── \*\//);
    const loopsChunk = extractChapter(/\/\* ────── 17\. Python Loops ────── \*\//);
    const functionsChunk = extractChapter(/\/\* ────── 18\. Python Functions ────── \*\//);
    const dictChunk = extractChapter(/\/\* ────── 19\. Python Dictionaries ────── \*\//);

    // Now insert them in the new order after Sets
    const setsStart = content.search(/\/\* ────── 15\. Python Sets ────── \*\//);
    if (setsStart === -1) throw new Error("Sets not found");

    let insertIndex = content.search(/\n    \],\n\};/);
    if (insertIndex === -1) {
        console.log("Could not find insert index.");
        process.exit(1);
    }

    // Update headers
    const newDict = dictChunk.replace(/\/\* ────── 19\. Python Dictionaries ────── \*\//, '/* ────── 16. Python Dictionaries ────── */');
    const newIfElse = ifElseChunk.replace(/\/\* ────── 16\. Python If\.\.\.Else ────── \*\//, '/* ────── 17. Python If...Else ────── */');
    const newLoops = loopsChunk.replace(/\/\* ────── 17\. Python Loops ────── \*\//, '/* ────── 18. Python Loops ────── */');
    const newFunctions = functionsChunk.replace(/\/\* ────── 18\. Python Functions ────── \*\//, '/* ────── 19. Python Functions ────── */');

    // Reconstruct
    const replacement = newDict + newIfElse + newLoops + newFunctions;
    content = content.substring(0, insertIndex) + replacement + content.substring(insertIndex);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully reordered chapters.");
} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
