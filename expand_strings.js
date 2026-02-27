const fs = require('fs');
const file = 'client/src/pages/CourseReaderPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `        /* ────── 8. Python Strings ────── */
        {
            id: 'strings', title: 'Python Strings',
            sections: [
                {
                    id: 'strings-basics', title: 'String Basics',
                    content: \`<p>Strings in Python are surrounded by either single quotation marks, or double quotation marks. <code>'hello'</code> is the same as <code>"hello"</code>.</p>
<p>You can display a string literal with the <code>print()</code> function.</p>
<h3>Multiline Strings</h3>
<p>You can assign a multiline string to a variable by using three quotes (single or double):</p>\`,
                    examples: [
                        { title: 'String Variables', code: 'a = "Hello"\\nprint(a)' },
                        { title: 'Multiline String', code: 'a = """Lorem ipsum dolor sit amet,\\nconsectetur adipiscing elit,\\nsed do eiusmod tempor incididunt\\nut labore et dolore magna aliqua."""\\nprint(a)' },
                        { title: 'Strings are Arrays', code: '# Get the character at position 1 (remember that the first character has the position 0):\\na = "Hello, World!"\\nprint(a[1])  # Outputs "e"' },
                        { title: 'Looping Through a String', code: 'for x in "banana":\\n    print(x)' },
                        { title: 'String Length', code: 'a = "Hello, World!"\\nprint(len(a))  # Outputs 13' },
                        { title: 'Check String', code: 'txt = "The best things in life are free!"\\nprint("free" in txt)  # True\\n\\n# Using if statement\\nif "free" in txt:\\n    print("Yes, \\'free\\' is present.")' }
                    ],
                    exercise: { question: 'What is the correct syntax to output the character "o" from the string: txt = "Hello"?', options: ['txt[4]', 'txt[5]', 'txt.get(4)'], answer: 0 }
                },
                {
                    id: 'strings-slicing', title: 'Slicing Strings',
                    content: \`<p>You can return a range of characters by using the slice syntax.</p>
<p>Specify the start index and the end index, separated by a colon, to return a part of the string.</p>\`,
                    examples: [
                        { title: 'Slicing', code: 'b = "Hello, World!"\\n# Get characters from position 2 to 5 (not included)\\nprint(b[2:5])  # Outputs "llo"' },
                        { title: 'Slice From the Start', code: 'b = "Hello, World!"\\n# By leaving out the start index, the range will start at the first character:\\nprint(b[:5])  # Outputs "Hello"' },
                        { title: 'Slice To the End', code: 'b = "Hello, World!"\\n# By leaving out the end index, the range will go to the end:\\nprint(b[2:])  # Outputs "llo, World!"' },
                        { title: 'Negative Indexing', code: 'b = "Hello, World!"\\n# Use negative indexes to start the slice from the end of the string:\\nprint(b[-5:-2])  # Outputs "orl"' }
                    ],
                    exercise: { question: 'What does b[1:4] return if b = "Python"?', options: ['Py', 'yth', 'ytho', 'Pyt'], answer: 1 }
                },
                {
                    id: 'strings-modify', title: 'Modify Strings',
                    content: \`<p>Python has a set of built-in methods that you can use on strings.</p>\`,
                    examples: [
                        { title: 'Upper Case', code: 'a = "Hello, World!"\\nprint(a.upper())' },
                        { title: 'Lower Case', code: 'a = "Hello, World!"\\nprint(a.lower())' },
                        { title: 'Remove Whitespace', code: 'a = " Hello, World! "\\n# strip() removes any whitespace from the beginning or the end\\nprint(a.strip()) # returns "Hello, World!"' },
                        { title: 'Replace String', code: 'a = "Hello, World!"\\n# format: string.replace(old, new)\\nprint(a.replace("H", "J")) # returns "Jello, World!"' },
                        { title: 'Split String', code: 'a = "Hello, World!"\\n# split() splits the string into a list if it finds instances of the separator:\\nprint(a.split(",")) # returns [\\'Hello\\', \\' World!\\']' }
                    ],
                    exercise: { question: 'Which method returns a string in uppercase letters?', options: ['uppercase()', 'toUpper()', 'upper()'], answer: 2 }
                },
                {
                    id: 'strings-concat', title: 'String Concatenation',
                    content: \`<p>To concatenate, or combine, two strings you can use the <code>+</code> operator.</p>\`,
                    examples: [
                        { title: 'Merge Variables', code: 'a = "Hello"\\nb = "World"\\nc = a + b\\nprint(c)  # HelloWorld' },
                        { title: 'Add a Space', code: 'a = "Hello"\\nb = "World"\\nc = a + " " + b\\nprint(c)  # Hello World' },
                    ],
                    exercise: { question: 'How do you combine: a = "Hi" and b = "!"?', options: ['a & b', 'a + b', 'concat(a, b)'], answer: 1 }
                },
                {
                    id: 'strings-formatting', title: 'Format Strings',
                    content: \`<p>As we learned in the Python Variables chapter, we cannot combine strings and numbers like this: <code>age = 36; txt = "My name is John, I am " + age</code> (This gives an error!)</p>
<p>But we can combine strings and numbers by using f-strings or the <code>format()</code> method!</p>
<h3>F-Strings (Recommended)</h3>
<p>F-strings were introduced in Python 3.6, and is now the preferred way of formatting strings. To specify a string as an f-string, simply put an <code>f</code> in front of the string literal, and add curly brackets <code>{}</code> as placeholders for variables and other operations.</p>\`,
                    examples: [
                        { title: 'F-Strings', code: 'age = 36\\ntxt = f"My name is John, I am {age}"\\nprint(txt)' },
                        { title: 'Placeholders and Modifiers', code: 'price = 59\\n# A modifier is included by adding a colon : followed by a legal formatting type\\n# The .2f modifier turns the value into a float with 2 decimals:\\ntxt = f"The price is {price:.2f} dollars"\\nprint(txt)' },
                        { title: 'Math Operations', code: 'txt = f"The math is: 20 * 59 = {20 * 59}"\\nprint(txt)' }
                    ],
                    exercise: { question: 'Which formatting type formats a number as a float with 2 decimal places?', options: ['.2f', '2d', '.2p'], answer: 0 }
                },
                {
                    id: 'strings-escape', title: 'Escape Characters',
                    content: \`<p>To insert characters that are illegal in a string, use an escape character.</p>
<p>An escape character is a backslash <code>\\\\</code> followed by the character you want to insert.</p>\`,
                    examples: [
                        { title: 'Double Quotes Inside String', code: '# You will get an error if you use double quotes inside a string that is surrounded by double quotes:\\n# txt = "We are the so-called "Vikings" from the north."\\n\\n# To fix this problem, use the escape character \\\\":\\ntxt = "We are the so-called \\\\"Vikings\\\\" from the north."\\nprint(txt)' },
                        { title: 'Common Escape Characters', code: 'print("Hello\\\\nWorld")  # New Line\\nprint("Hello\\\\tWorld")  # Tab\\nprint("A backslash: \\\\\\\\") # Single Backslash' }
                    ],
                    exercise: { question: 'Which escape character inserts a new line?', options: ['\\\\n', '\\\\t', '\\\\r'], answer: 0 }
                },
                {
                    id: 'strings-methods', title: 'String Methods',
                    content: \`<p>Python has a set of built-in methods that you can use on strings. All string methods return new values. They do not change the original string.</p>
<table style="width:100%;text-align:left;border-collapse:collapse;margin-top:20px;">
  <tr style="border-bottom: 2px solid #ddd; background-color: #f2f2f2;"><th>Method</th><th>Description</th></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>capitalize()</td><td>Converts the first character to upper case</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>count()</td><td>Returns the number of times a specified value occurs in a string</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>find()</td><td>Searches the string for a specified value and returns the position of where it was found</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>isalpha()</td><td>Returns True if all characters in the string are in the alphabet</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>isnumeric()</td><td>Returns True if all characters in the string are numeric</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>startswith()</td><td>Returns true if the string starts with the specified value</td></tr>
</table>\`,
                    examples: [
                        { title: 'Using String Methods', code: 'txt = "hello, and welcome to my world."\\n\\nprint(txt.capitalize())\\nprint(txt.count("o"))\\nprint(txt.find("welcome"))\\n\\nwords = "Python123"\\nprint(words.isalpha())    # False (because of numbers)\\nprint(words.isnumeric())  # False (because of letters)' }
                    ],
                    exercise: { question: 'Which method returns the number of times a specified value occurs in a string?', options: ['find()', 'index()', 'count()'], answer: 2 }
                },
                {
                    id: 'strings-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Assign the string <code>"  Python Programming!  "</code> to a variable called <code>text</code>.',
                        'Remove the whitespace at the beginning and the end of the string and print the result.',
                        'Convert the string to completely lowercase and print it.',
                        'Use an f-string to combine the variables <code>name = "Alice"</code> and <code>age = 25</code> into the sentence: <code>"Alice is 25 years old."</code> and print it.',
                        'Replace the word "Programming" in your <code>text</code> variable with "Rules" and print it.'
                    ],
                    starterCode: '# Assign variables\\n\\n# Strip whitespace\\n\\n# Lowercase\\n\\n# F-string formatting\\n\\n# Replace text\\n',
                    solution: 'text = "  Python Programming!  "\\nprint(text.strip())\\nprint(text.lower())\\nname = "Alice"\\nage = 25\\nprint(f"{name} is {age} years old.")\\nprint(text.replace("Programming", "Rules"))',
                    content: \`<p>Test your knowledge of Python string manipulation!</p>\`
                }
            ]
        },`;

let startIndex = content.indexOf('        /* ────── 8. Python Strings ────── */');
let endIndex = content.indexOf('        /* ────── 9. Python Lists ────── */');

if (startIndex !== -1 && endIndex !== -1) {
    let before = content.substring(0, startIndex);
    let after = content.substring(endIndex);
    fs.writeFileSync(file, before + replacement + "\n\n" + after);
    console.log("Success");
} else {
    console.log("Section not found");
}
