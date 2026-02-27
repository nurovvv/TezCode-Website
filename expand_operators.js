const fs = require('fs');
const file = 'client/src/pages/CourseReaderPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `        /* ────── 7. Python Operators ────── */
        {
            id: 'operators', title: 'Python Operators',
            sections: [
                {
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
                },
                {
                    id: 'operators-assignment', title: 'Assignment Operators',
                    content: \`<p>Assignment operators are used to assign values to variables.</p>\`,
                    examples: [
                        { title: 'Basic Assignment (=)', code: 'x = 5\\nprint(x)' },
                        { title: 'Add AND (+=)', code: 'x = 5\\nx += 3   # Same as x = x + 3\\nprint(x) # 8' },
                        { title: 'Subtract AND (-=)', code: 'x = 5\\nx -= 3   # Same as x = x - 3\\nprint(x) # 2' },
                        { title: 'Multiply AND (*=)', code: 'x = 5\\nx *= 3   # Same as x = x * 3\\nprint(x) # 15' },
                        { title: 'Divide AND (/=)', code: 'x = 5\\nx /= 2   # Same as x = x / 2\\nprint(x) # 2.5' }
                    ],
                    exercise: { question: 'What is x after: x = 10; x += 5', options: ['5', '10', '15'], answer: 2 }
                },
                {
                    id: 'operators-comparison', title: 'Comparison Operators',
                    content: \`<p>Comparison operators are used to compare two values. They return a boolean (True or False).</p>\`,
                    examples: [
                        { title: 'Equal and Not Equal', code: 'x = 5\\ny = 3\\n\\nprint(x == y)  # False (Equal)\\nprint(x != y)  # True (Not equal)' },
                        { title: 'Greater / Less Than', code: 'x = 5\\ny = 3\\n\\nprint(x > y)   # True (Greater than)\\nprint(x < y)   # False (Less than)' },
                        { title: 'Greater/Less or Equal', code: 'x = 5\\ny = 5\\n\\nprint(x >= y)  # True (Greater than or equal to)\\nprint(x <= y)  # True (Less than or equal to)' }
                    ],
                    exercise: { question: 'Which operator checks if two values are equal?', options: ['=', '==', '!=', '==='], answer: 1 }
                },
                {
                    id: 'operators-logical', title: 'Logical Operators',
                    content: \`<p>Logical operators are used to combine conditional statements.</p>\`,
                    examples: [
                        { title: 'The "and" Operator', code: 'x = 5\\n# Returns True if BOTH statements are true\\nprint(x > 3 and x < 10)  # True' },
                        { title: 'The "or" Operator', code: 'x = 5\\n# Returns True if ONE of the statements is true\\nprint(x > 10 or x < 10)  # True' },
                        { title: 'The "not" Operator', code: 'x = 5\\n# Reverse the result (returns False if the result is true)\\nprint(not(x > 3 and x < 10))  # False' }
                    ],
                    exercise: { question: 'What does "True and False" evaluate to?', options: ['True', 'False', 'None'], answer: 1 }
                },
                {
                    id: 'operators-identity', title: 'Identity Operators',
                    content: \`<p>Identity operators are used to compare the objects, not if they are equal, but if they are actually the <strong>same object</strong> with the same memory location.</p>\`,
                    examples: [
                        { title: 'The "is" Operator', code: 'x = ["apple", "banana"]\\ny = ["apple", "banana"]\\nz = x\\n\\nprint(x is z)  # True (z is the same object as x)\\nprint(x is y)  # False (y is a different object, even though content is the same)\\n\\nprint(x == y)  # True (== checks value equality, "is" checks identity)' },
                        { title: 'The "is not" Operator', code: 'x = ["apple", "banana"]\\ny = ["apple", "banana"]\\n\\nprint(x is not y)  # True (they are not the same object in memory)' }
                    ],
                    exercise: { question: 'Difference between "==" and "is"?', options: ['"==" checks value, "is" checks memory identity', 'They are the same', 'No difference'], answer: 0 }
                },
                {
                    id: 'operators-membership', title: 'Membership Operators',
                    content: \`<p>Membership operators are used to test if a sequence is presented in an object.</p>\`,
                    examples: [
                        { title: 'The "in" Operator', code: 'fruits = ["apple", "banana"]\\n\\nprint("banana" in fruits)  # True\\nprint("orange" in fruits)  # False\\n\\n# Works on strings too!\\nname = "Python"\\nprint("yt" in name)        # True' },
                        { title: 'The "not in" Operator', code: 'fruits = ["apple", "banana"]\\n\\nprint("pineapple" not in fruits)  # True' }
                    ],
                    exercise: { question: 'Which operator checks if an item is inside a list?', options: ['inside', 'has', 'in'], answer: 2 }
                },
                {
                    id: 'operators-precedence', title: 'Operator Precedence',
                    content: \`<p>Operator precedence describes the order in which operations are performed.</p>\`,
                    examples: [
                        { title: 'Precedence Rules', code: '# Multiplication has higher precedence than addition:\\nprint(10 + 5 * 2)  # 20\\n\\n# Parentheses have the highest precedence:\\nprint((10 + 5) * 2)  # 30' }
                    ],
                    exercise: { question: 'Which operation is evaluated first in: 10 + 5 * 2?', options: ['10 + 5', '5 * 2'], answer: 1 }
                },
                {
                    id: 'operators-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create two variables: <code>a = 15</code> and <code>b = 4</code>',
                        'Print the result of the division (<code>/</code>)',
                        'Print the result of the floor division (<code>//</code>)',
                        'Check if <code>a</code> is greater than 10 AND <code>b</code> is less than 5',
                        'Use the assignment operator (<code>+=</code>) to add 10 to <code>a</code>'
                    ],
                    starterCode: '# Create variables\\n\\n# Division\\n\\n# Floor division\\n\\n# Logical Check\\n\\n# Assignment\\n',
                    solution: 'a = 15\\nb = 4\\nprint(a / b)\\nprint(a // b)\\nprint(a > 10 and b < 5)\\na += 10\\nprint(a)',
                    content: \`<p>Test your knowledge of everything you've learned about Python operators!</p>\`
                }
            ]
        },`;

let startIndex = content.indexOf('        /* ────── 7. Python Operators ────── */');
let endIndex = content.indexOf('        /* ────── 8. Python Strings ────── */');

if (startIndex !== -1 && endIndex !== -1) {
    let before = content.substring(0, startIndex);
    let after = content.substring(endIndex);
    fs.writeFileSync(file, before + replacement + "\n\n" + after);
    console.log("Success");
} else {
    console.log("Section not found");
}
