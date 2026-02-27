const fs = require('fs');
const file = 'client/src/pages/CourseReaderPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const oldSection = `                {
                    id: 'operators-arithmetic', title: 'Arithmetic Operators',
                    content: \`<p>Arithmetic operators are used with numeric values to perform common mathematical operations.</p>\`,
                    examples: [
                        { title: 'Addition and Subtraction', code: 'x = 10\\ny = 3\\n\\nprint(x + y)  # 13 (Addition)\\nprint(x - y)  # 7 (Subtraction)' },
                        { title: 'Multiplication and Division', code: 'x = 10\\ny = 3\\n\\nprint(x * y)  # 30 (Multiplication)\\nprint(x / y)  # 3.3333333333333335 (Division)' },
                        { title: 'Modulus (Remainder)', code: 'x = 10\\ny = 3\\n\\nprint(x % y)  # 1 (Because 10 divided by 3 is 9, with 1 remainder)' },
                        { title: 'Exponentiation (Power)', code: 'x = 2\\ny = 3\\n\\nprint(x ** y) # 8 (Same as 2 * 2 * 2)' },
                        { title: 'Floor Division', code: 'x = 10\\ny = 3\\n\\nprint(x // y) # 3 (Rounds down to nearest whole number)\\n\\nx = -10\\nprint(x // 3) # -4 (Rounds down!)' }
                    ],
                    exercise: { question: 'What is the result of 5 ** 2?', options: ['10', '7', '25', '3'], answer: 2 }
                },`;

const newSection = `                {
                    id: 'operators-arithmetic', title: 'Arithmetic Operators',
                    content: \`<p>Arithmetic operators are used with numeric values to perform common mathematical operations such as addition, subtraction, multiplication, and division.</p>
<h3>Deep Dive: Division vs Floor Division</h3>
<p>In Python, normal division (<code>/</code>) always returns a <strong>float</strong> (a decimal number), even if the division is clean. For example, <code>10 / 2</code> returns <code>5.0</code>.</p>
<p>If you want integer division (rounding down to the nearest whole number), you must use floor division (<code>//</code>).</p>
<h3>Deep Dive: Modulus</h3>
<p>The modulus operator (<code>%</code>) returns the remainder of a division. It is heavily used in programming to check if a number is even or odd. If <code>x % 2 == 0</code>, the number is even!</p>\`,
                    examples: [
                        { title: 'Addition and Subtraction', code: 'x = 10\\ny = 3\\n\\nprint(x + y)  # 13 (Addition)\\nprint(x - y)  # 7 (Subtraction)' },
                        { title: 'Multiplication and Division', code: 'x = 10\\ny = 3\\n\\nprint(x * y)  # 30 (Multiplication)\\nprint(x / y)  # 3.3333333333333335 (Division)\\n\\n# Notice how division always returns a float!\\nprint(10 / 2) # 5.0' },
                        { title: 'Modulus (Remainder)', code: 'x = 10\\ny = 4\\n\\nprint(x % y)  # 2 (10 divided by 4 is 8, 2 remaining)\\n\\n# Checking for even/odd\\nprint(10 % 2) # 0 (Even)\\nprint(11 % 2) # 1 (Odd)' },
                        { title: 'Exponentiation (Power)', code: 'x = 2\\ny = 3\\n\\nprint(x ** y) # 8 (Same as 2 * 2 * 2)\\n\\n# Using ** with floats to get a square root\\nprint(9 ** 0.5) # 3.0' },
                        { title: 'Floor Division', code: 'x = 10\\ny = 3\\n\\nprint(x // y) # 3 (Rounds down to nearest whole number)\\n\\nx = -10\\nprint(x // 3) # -4 (Rounds down!)' }
                    ],
                    exercise: { question: 'What is the result of 11 % 3?', options: ['3', '2', '0', '3.66'], answer: 1 }
                },
                {
                    id: 'operators-arithmetic-challenge', title: 'Arithmetic Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a variable <code>a</code> and set it to <code>15</code>.',
                        'Create a variable <code>b</code> and set it to <code>4</code>.',
                        'Print the integer division (floor division) of <code>a</code> by <code>b</code>.',
                        'Print the remainder of <code>a</code> divided by <code>b</code>.',
                        'Print <code>b</code> to the power of <code>3</code>.'
                    ],
                    starterCode: '# Assign variables\\n\\n# Floor division\\n\\n# Modulus (remainder)\\n\\n# Exponentiation\\n',
                    solution: 'a = 15\\nb = 4\\nprint(a // b)\\nprint(a % b)\\nprint(b ** 3)',
                    content: \`<p>Let's practice your arithmetic operations!</p>\`
                },`;

const startIndex = content.lastIndexOf("                {", content.indexOf("id: 'operators-arithmetic'"));
const endIndex = content.lastIndexOf("                {", content.indexOf("id: 'operators-assignment'"));

if (startIndex !== -1 && endIndex !== -1) {
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex);
    content = before + newSection + '\\n' + after;
    fs.writeFileSync(file, content);
    console.log("Success: Section replaced");
} else {
    console.log("Error: Could not find start or end index.");
    console.log("Start:", startIndex, "End:", endIndex);
}
