const fs = require('fs');
const path = require('path');

const seedFilePath = path.join(__dirname, 'server/src/seed_challenges.js');
let content = fs.readFileSync(seedFilePath, 'utf8');

// Find the start of the challenges array
const arrayStart = content.indexOf('const challenges = [');
const arrayEnd = content.lastIndexOf('];');

if (arrayStart === -1 || arrayEnd === -1) {
    console.error('Could not find challenges array');
    process.exit(1);
}

let arrayContent = content.substring(arrayStart, arrayEnd);

// Split by challenge objects. This is tricky because of nested braces in testCases.
// But we know each challenge ends with "        }," roughly.
const blocks = arrayContent.split(/        },/);

let updatedBlocks = blocks.map(block => {
    if (block.includes('solution:') || !block.includes('title:')) return block;

    const titleMatch = block.match(/title:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : 'this problem';

    const solution = `,\n            solution: \`<h3>Explanation</h3>\\n<p>To solve <strong>${title}</strong>, we should consider the specific requirements and constraints. Use an efficient algorithm (often seeking O(n) or O(log n)) and appropriate data structures like Hash Maps for fast lookups or Two Pointers for array manipulation.</p>\\n<h4>Solution Hint</h4>\\n<p>Review the starter code and implement the core logic to pass all test cases.</p>\``;

    return block + solution;
});

let updatedArrayContent = updatedBlocks.join('        },');
let finalContent = content.substring(0, arrayStart) + updatedArrayContent + content.substring(arrayEnd);

fs.writeFileSync(seedFilePath, finalContent);
console.log('Successfully updated all challenges with solutions.');
