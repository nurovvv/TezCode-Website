const fs = require('fs');
const path = require('path');

const seedFilePath = path.join(__dirname, 'server/src/seed_challenges.js');
let content = fs.readFileSync(seedFilePath, 'utf8');

// Regex to find challenge objects that don't have a solution field
// We look for tags/topics or starterCode and ensure solution isn't already there
const challengeRegex = /({[^{}]*title:[^{}]*difficulty:[^{}]*)(tags:[^{}]*topics:[^{}]*|starterCode:[^{}]*)(})/gs;

let updatedContent = content.replace(challengeRegex, (match, prefix, mid, suffix) => {
    if (match.includes('solution:')) return match;

    const titleMatch = match.match(/title:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : 'this problem';

    const solution = `\n            solution: \`<h3>Explanation</h3>\\n<p>To solve <strong>${title}</strong>, you should analyze the problem constraints and choose an appropriate data structure (like an Array, Hash Table, or Stack). Review the starter code provided and implement the logic accordingly.</p>\\n<h4>Solution Hint</h4>\\n<p>Consider the most efficient time complexity (e.g., O(n) or O(log n)) for this type of problem.</p>\``;

    return prefix + mid + solution + '\n        ' + suffix;
});

fs.writeFileSync(seedFilePath, updatedContent);
console.log('Successfully added generic solutions to all challenges in seed_challenges.js');
