const fs = require('fs');
const file = 'client/src/pages/CourseReaderPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `        /* ────── 6.5 Python Casting ────── */
        {
            id: 'casting', title: 'Python Casting',
            sections: [
                {
                    id: 'casting-specify', title: 'Specify a Variable Type',
                    content: \`<p>There may be times when you want to specify a type on to a variable. This can be done with casting.</p>
<p>Python is an object-orientated language, and as such it uses classes to define data types, including its primitive types.</p>
<p>Casting in python is therefore done using constructor functions:</p>
<ul>
<li><code>int()</code> - constructs an integer number from an integer literal, a float literal (by removing all decimals), or a string literal (providing the string represents a whole number)</li>
<li><code>float()</code> - constructs a float number from an integer literal, a float literal or a string literal (providing the string represents a float or an integer)</li>
<li><code>str()</code> - constructs a string from a wide variety of data types, including strings, integer literals and float literals</li>
</ul>\`,
                    examples: [
                        { title: 'Integers', code: 'x = int(1)   # x will be 1\\ny = int(2.8) # y will be 2\\nz = int("3") # z will be 3\\nprint(x)\\nprint(y)\\nprint(z)' },
                        { title: 'Floats', code: 'x = float(1)     # x will be 1.0\\ny = float(2.8)   # y will be 2.8\\nz = float("3")   # z will be 3.0\\nw = float("4.2") # w will be 4.2\\nprint(x)\\nprint(y)\\nprint(z)\\nprint(w)' },
                        { title: 'Strings', code: 'x = str("s1") # x will be \\'s1\\'\\ny = str(2)    # y will be \\'2\\'\\nz = str(3.0)  # z will be \\'3.0\\'\\nprint(x)\\nprint(y)\\nprint(z)' }
                    ],
                    exercise: { question: 'What is the type of x if x = str(25)?', options: ['int', 'float', 'str', 'error'], answer: 2 }
                },
                {
                    id: 'casting-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a variable <code>price</code> with a float value of <code>9.99</code>.',
                        'Cast <code>price</code> to an integer and store it in <code>int_price</code>.',
                        'Print both variables to see the difference.'
                    ],
                    starterCode: '# Create float variable\\n\\n# Cast to int\\n\\n# Print both\\n',
                    solution: 'price = 9.99\\nint_price = int(price)\\nprint(price)\\nprint(int_price)',
                    content: \`<p>Practice your casting skills!</p>\`
                }
            ]
        },

        /* ────── 7. Python Operators ────── */`;

let startIndex = content.indexOf('        /* ────── 7. Python Operators ────── */');

if (startIndex !== -1) {
    let before = content.substring(0, startIndex);
    // Remember to replace the 7 header with something else if we are inserting it BEFORE 7. Wait, my replacement ENDS with '/* ────── 7. Python Operators ────── */'
    // So if I replace just index, I will inject the new block and put the chapter 7 comment back.
    let after = content.substring(startIndex + '        /* ────── 7. Python Operators ────── */'.length);
    fs.writeFileSync(file, before + replacement + after);
    console.log("Success");
} else {
    console.log("Section not found");
}
