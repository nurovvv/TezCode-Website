const fs = require('fs');
const file = 'client/src/pages/CourseReaderPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `        /* ────── 10. Python If...Else ────── */
        {
            id: 'conditions', title: 'Python If...Else',
            sections: [
                {
                    id: 'conditions-if', title: 'If Statements',
                    content: \`<p>Python relies on indentation (whitespace at the beginning of a line) to define scope in the code. Other programming languages often use curly-brackets for this purpose.</p>
<p>An <code>if</code> statement is written by using the <code>if</code> keyword.</p>\`,
                    examples: [
                        { title: 'The if statement', code: 'a = 33\\nb = 200\\n\\nif b > a:\\n    print("b is greater than a")' },
                        { title: 'Indentation Error', code: '# If statement, without indentation (will raise an error):\\na = 33\\nb = 200\\n\\n# if b > a:\\n# print("b is greater than a")' },
                        { title: 'Elif ("Else If")', code: 'a = 33\\nb = 33\\n\\nif b > a:\\n    print("b is greater than a")\\nelif a == b:\\n    print("a and b are equal")' },
                        { title: 'Else', code: 'a = 200\\nb = 33\\n\\nif b > a:\\n    print("b is greater than a")\\nelif a == b:\\n    print("a and b are equal")\\nelse:\\n    print("a is greater than b")' }
                    ],
                    exercise: { question: 'What keyword is used for "else if" in Python?', options: ['elseif', 'else if', 'elif', 'catch'], answer: 2 }
                },
                {
                    id: 'conditions-shorthand', title: 'Short Hand If / Else',
                    content: \`<p>If you have only one statement to execute, you can put it on the same line as the if statement.</p>
<p>This technique is known as <strong>Ternary Operators</strong>, or Conditional Expressions.</p>\`,
                    examples: [
                        { title: 'Short Hand If', code: 'if 9 > 5: print("Nine is greater than five")' },
                        { title: 'Short Hand If ... Else', code: 'a = 2\\nb = 330\\n\\nprint("A") if a > b else print("B")' },
                        { title: 'Multiple Else Statements', code: 'a = 330\\nb = 330\\n\\nprint("A") if a > b else print("=") if a == b else print("B")' }
                    ],
                    exercise: { question: 'Translate to shorthand: if a > b: print("Yes") else: print("No")', options: ['print("Yes") if a > b else print("No")', 'if a > b print("Yes") else print("No")', 'a > b ? print("Yes") : print("No")'], answer: 0 }
                },
                {
                    id: 'conditions-logical', title: 'Logical Conditions',
                    content: \`<p>The <code>and</code>, <code>or</code>, and <code>not</code> keywords are logical operators, and are used to combine conditional statements.</p>\`,
                    examples: [
                        { title: 'The "and" keyword', code: 'a = 200\\nb = 33\\nc = 500\\n\\n# Both conditions must be True\\nif a > b and c > a:\\n    print("Both conditions are True")' },
                        { title: 'The "or" keyword', code: 'a = 200\\nb = 33\\nc = 500\\n\\n# At least one condition must be True\\nif a > b or a > c:\\n    print("At least one of the conditions is True")' },
                        { title: 'The "not" keyword', code: 'a = 33\\nb = 200\\n\\n# Reverses the conditional result\\nif not a > b:\\n    print("a is NOT greater than b")' }
                    ],
                    exercise: { question: 'Which operator evaluates to True if ONE out of TWO conditions are True?', options: ['and', 'or', 'not', 'xor'], answer: 1 }
                },
                {
                    id: 'conditions-nested', title: 'Nested If',
                    content: \`<p>You can have <code>if</code> statements inside <code>if</code> statements, this is called <em>nested</em> <code>if</code> statements.</p>\`,
                    examples: [
                        { title: 'Nested If', code: 'x = 41\\n\\nif x > 10:\\n    print("Above ten,")\\n    if x > 20:\\n        print("and also above 20!")\\n    else:\\n        print("but not above 20.")' }
                    ],
                    exercise: { question: 'What is required for a nested if to run?', options: ['The outer if condition must be True', 'They run independently', 'They must have the same condition'], answer: 0 }
                },
                {
                    id: 'conditions-pass', title: 'The pass Statement',
                    content: \`<p><code>if</code> statements cannot be empty, but if you for some reason have an <code>if</code> statement with no content, put in the <code>pass</code> statement to avoid getting an error.</p>\`,
                    examples: [
                        { title: 'The pass statement', code: 'a = 33\\nb = 200\\n\\nif b > a:\\n    pass  # To avoid an error, we do nothing for now' }
                    ],
                    exercise: { question: 'Which keyword can be used to prevent an error in an empty if block?', options: ['continue', 'break', 'pass', 'return'], answer: 2 }
                },
                {
                    id: 'conditions-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a variable <code>temperature</code> and set it to <code>25</code>.',
                        'Write an <code>if</code> statement that prints "It\\\'s hot!" if the temperature is greater than 30.',
                        'Write an <code>elif</code> statement that prints "It\\\'s a nice day." if the temperature is between 20 and 30.',
                        'Write an <code>else</code> statement that prints "It\\\'s cold." if the temperature is below 20.',
                        'Run the code to see what it prints.'
                    ],
                    starterCode: '# Set temperature\\n\\n\\n# Write conditional statements\\n',
                    solution: 'temperature = 25\\n\\nif temperature > 30:\\n    print("It\\'s hot!")\\nelif temperature >= 20 and temperature <= 30:\\n    print("It\\'s a nice day.")\\nelse:\\n    print("It\\'s cold.")',
                    content: \`<p>Put your knowledge of conditional statements to the test!</p>\`
                }
            ]
        },`;

let startIndex = content.indexOf('        /* ────── 10. Python If...Else ────── */');
let endIndex = content.indexOf('        /* ────── 11. Python Loops ────── */');

if (startIndex !== -1 && endIndex !== -1) {
    let before = content.substring(0, startIndex);
    let after = content.substring(endIndex);
    fs.writeFileSync(file, before + replacement + "\n\n" + after);
    console.log("Success");
} else {
    console.log("Section not found");
}
