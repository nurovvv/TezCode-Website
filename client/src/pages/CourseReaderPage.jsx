import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { runCode } from '../services/codeRunner';
import CodeEditor from '../components/CodeEditor';

function highlightPython(code) {
    if (!code) return '';
    let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Combined regex for comments, strings, and keywords to avoid "highlighting the highlighter"
    const regex = /(#.*$)|((["'])(?:(?=(\\?))\4.)*?\3)|\b(print|if|else|elif|for|while|return|import|as|from|in|is|not|and|or)\b/gm;

    return escaped.replace(regex, (match, comment, string, q, esc, keyword) => {
        if (comment) return `<span style="color: #6a737d;">${comment}</span>`;
        if (string) return `<span style="color: #228b22;">${string}</span>`;
        if (keyword) return `<span style="color: #0000ff;">${keyword}</span>`;
        return match;
    });
}

/* ═══════════════════════════════════════════
   COURSE DATA
   ═══════════════════════════════════════════ */
const COURSE = {
    title: 'Introduction to Python',
    chapters: [
        /* ────── 1. Python Introduction ────── */
        {
            id: 'intro', title: 'Python Introduction',
            sections: [{
                id: 'intro-what', title: 'What is Python?',
                content: `<p>Python is a popular programming language. It was created by <strong>Guido van Rossum</strong>, and released in <strong>1991</strong>.</p>
<p>It is used for:</p>
<ul><li>web development (server-side)</li><li>software development</li><li>mathematics</li><li>system scripting</li></ul>
<h3>What can Python do?</h3>
<ul><li>Python can be used on a server to create web applications.</li><li>Python can be used alongside software to create workflows.</li><li>Python can connect to database systems. It can also read and modify files.</li><li>Python can be used to handle big data and perform complex mathematics.</li><li>Python can be used for rapid prototyping, or for production-ready software development.</li></ul>
<h3>Why Python?</h3>
<ul><li>Python works on different platforms (Windows, Mac, Linux, Raspberry Pi, etc).</li><li>Python has a simple syntax similar to the English language.</li><li>Python has syntax that allows developers to write programs with fewer lines than some other programming languages.</li><li>Python runs on an interpreter system, meaning that code can be executed as soon as it is written. This means that prototyping can be very quick.</li><li>Python can be treated in a procedural way, an object-oriented way or a functional way.</li></ul>
<h3>Good to know</h3>
<ul><li>The most recent major version of Python is Python 3, which we shall be using in this tutorial.</li><li>Python will be written in a code editor. It is possible to write Python in an Integrated Development Environment, such as Thonny, PyCharm, or VS Code.</li></ul>
<h3>Python Syntax compared to other programming languages</h3>
<ul><li>Python was designed for readability, and has some similarities to the English language with influence from mathematics.</li><li>Python uses new lines to complete a command, as opposed to other programming languages which often use semicolons or parentheses.</li><li>Python relies on indentation, using whitespace, to define scope; such as the scope of loops, functions and classes. Other programming languages often use curly-brackets for this purpose.</li></ul>`,
                examples: [{ title: 'Your first Python program', code: 'print("Hello, World!")' }],
                exercise: {
                    question: 'Python is mostly used for:',
                    options: ['Web development only', 'Multiple purposes including web, math, and scripting', 'Only mathematics'],
                    answer: 1,
                },
            }],
        },

        /* ────── 2. Python Getting Started ────── */
        {
            id: 'getstarted', title: 'Python Getting Started',
            sections: [{
                id: 'getstarted-all', title: 'Get Started With Python',
                content: `<p>On TezCode, you can try Python without installing anything.</p>
<p>Our online Python editor runs directly in your browser, and shows both the code and the result:</p>

<h3>Python Install</h3>
<p>Many Windows PCs and Mac computers already have Python pre-installed.</p>
<p>To check if you have python installed on a Windows PC, search in the start bar for Python or run the following on the Command Line (cmd.exe):</p>
<div class="code-block-nonrun">C:\\Users\\<em>Your Name</em>&gt;python --version</div>
<p>To check if you have python installed on a Linux or Mac, then on linux open the command line or on Mac open the Terminal and type:</p>
<div class="code-block-nonrun">python --version</div>
<p>If you find that you do not have Python installed on your computer, then you can download it for free from the following website: <a href="https://www.python.org/" target="_blank" style="color:#04AA6D;">https://www.python.org/</a></p>

<h3>Python Quickstart</h3>
<p>Python is an interpreted programming language, this means that as a developer you write Python (<code>.py</code>) files in a text editor and then put those files into the python interpreter to be executed.</p>
<p>Let's write our first Python file, called <code>hello.py</code>, which can be done in any text editor:</p>
<div class="code-filename">hello.py:</div>

<h3>Importing Modules</h3>
<p>Python has a lot of built-in modules that you can use in your code.</p>
<p>A module is a file containing a set of functions you want to include in your application. Think of it as a <strong>code library</strong>.</p>
<p>To use a module, you need to <strong>import</strong> it using the <code>import</code> keyword:</p>
<h3>The sys Module</h3>
<p>One useful built-in module is <code>sys</code>, which provides access to some variables used or maintained by the Python interpreter.</p>
<p>For example, you can check your Python version:</p>

<h3>The Python Command Line</h3>
<p>To test a short amount of code in python sometimes it is quickest and easiest not to write the code in a file. This is made possible because Python can be run as a command line itself.</p>
<p>Type the following on the Windows, Mac or Linux command line:</p>
<div class="code-block-nonrun">C:\\Users\\<em>Your Name</em>&gt;python</div>
<p>Or, if the "python" command did not work, you can try "py":</p>
<div class="code-block-nonrun">C:\\Users\\<em>Your Name</em>&gt;py</div>
<p>From there you can write any python code, including our hello world example from earlier in the tutorial:</p>
<div class="code-block-nonrun">C:\\Users\\<em>Your Name</em>&gt;python
Python 3.6.4 (v3.6.4:d48eceb, Dec 19 2017, 06:04:45) [MSC v.1900 32 bit (Intel)] on win32
Type "help", "copyright", "credits" or "license" for more information.
&gt;&gt;&gt; print("Hello, World!")
Hello, World!</div>
<p>Which will write <code>"Hello, World!"</code> in the command line.</p>
<p>Whenever you are done in the python command line, you can simply type the following to quit the python command line interface:</p>
<div class="code-block-nonrun">exit()</div>

<h3>On TezCode, You Don't Need to Install Anything!</h3>
<p>The great news is that on this platform, you can write and run Python code <strong>directly in your browser</strong>. No installation needed!</p>
<p>Just click <strong>"Try it Yourself »"</strong> on any example and start coding right away. The Python engine runs entirely in your browser using modern WebAssembly technology.</p>`,
                examples: [
                    { title: 'Hello World', code: 'print("Hello, World!")' },
                    { title: 'hello.py', code: 'print("Hello, World!")' },
                    { title: 'Import the sys module', code: 'import sys\nprint(sys.version)' },
                    { title: 'Import the math module', code: 'import math\n\nprint(math.sqrt(64))\nprint(math.pi)\nprint(math.ceil(1.4))\nprint(math.floor(1.4))' },
                    { title: 'Import the datetime module', code: 'import datetime\n\nnow = datetime.datetime.now()\nprint("Current date and time:")\nprint(now)' },
                    { title: 'Try running Python code here!', code: 'print("Hello, World!")\nprint("You are running Python in the browser!")\nprint("No installation needed!")' },
                ],
                exercise: {
                    question: 'What is the correct file extension for Python files?',
                    options: ['.pp', '.pt', '.py'],
                    answer: 2,
                },
            }],
        },

        /* ────── 3. Python Syntax ────── */
        {
            id: 'syntax', title: 'Python Syntax',
            sections: [{
                id: 'syntax-main', title: 'Syntax',
                content: `<h2>Execute Python Syntax</h2>
<p>As we learned in the previous page, Python syntax can be executed by writing directly in the Command Line:</p>
<div class="code-block-nonrun">&gt;&gt;&gt; print("Hello, World!")<br>Hello, World!</div>

<p>Or by creating a python file on the server, using the <code>.py</code> file extension, and running it in the Command Line:</p>
<div class="code-block-nonrun">C:\\Users\\<em>Your Name</em>&gt;python myfile.py</div>

<hr>

<h2>Python Indentation</h2>
<p>Indentation refers to the spaces at the beginning of a code line.</p>
<p>Where in other programming languages the indentation in code is for readability only, the indentation in Python is <strong>very important</strong>.</p>
<p>Python uses indentation to indicate a block of code.</p>`,
                examples: [
                    {
                        title: 'Example',
                        code: 'if 5 > 2:\n  print("Five is greater than two!")'
                    },
                    {
                        title: 'Syntax Error (Indentation skipped)',
                        code: 'if 5 > 2:\nprint("Five is greater than two!")',
                        variant: 'error',
                        staticResult: 'IndentationError: expected an indented block',
                        preContent: `<p>Python will give you an error if you skip the indentation.</p>`
                    },
                    {
                        title: 'Indentation (Amount of spaces)',
                        code: 'if 5 > 2:\n print("Five is greater than two!")\nif 5 > 2:\n        print("Five is greater than two!")',
                        preContent: `<p>The number of spaces is up to you as a programmer, the most common use is four, but it has to be at least one.</p>`
                    },
                    {
                        title: 'Syntax Error (Consistency)',
                        code: 'if 5 > 2:\n  print("Five is greater than two!")\n        print("Five is greater than two!")',
                        variant: 'error',
                        staticResult: 'IndentationError: unindent does not match any outer indentation level',
                        preContent: `<p>You have to use the same number of spaces in the same block of code, otherwise Python will give you an error.</p>`
                    },
                ],
                exercise: {
                    question: 'True or False: Indentation in Python is for readability only.',
                    options: ['True', 'False'],
                    answer: 1,
                },
            }, {
                id: 'syntax-statements', title: 'Statements',
                content: `<p>A <strong>statement</strong> is an instruction that the Python interpreter can execute. We have already seen examples of statements: <code>print("Hello, World!")</code> is a statement.</p>

<h3>Multi-line Statements</h3>
<p>In Python, the end of a statement is marked by a newline character. But we can make a statement extend over multiple lines with the line continuation character (<code>\\</code>):</p>

<h3>Multiple Statements on One Line</h3>
<p>We can also put multiple statements on a single line using semicolons:</p>

<h3>Python is Case Sensitive</h3>
<p>Python is a case-sensitive language. This means that <code>Variable</code> and <code>variable</code> are not the same.</p>
<p>Always give identifiers a name that makes sense. While <code>c = 10</code> is a valid name, writing <code>count = 10</code> would make more sense, and it would be easier to figure out what it represents when you look at your code after a long gap.</p>

<h3>Python Identifiers</h3>
<p>An identifier is a name given to entities like class, functions, variables, etc. It helps to differentiate one entity from another.</p>
<p>Rules for writing identifiers:</p>
<ul><li>Identifiers can be a combination of letters in lowercase (a to z) or uppercase (A to Z) or digits (0 to 9) or an underscore <code>_</code>.</li>
<li>An identifier cannot start with a digit.</li>
<li>Keywords cannot be used as identifiers.</li></ul>`,
                examples: [
                    { title: 'Multi-line statement', code: 'total = 1 + \\\n        2 + \\\n        3\nprint(total)' },
                    { title: 'Multiple statements on one line', code: 'a = 1; b = 2; c = 3\nprint(a)\nprint(b)\nprint(c)' },
                    {
                        title: 'Error Example',
                        code: 'print("Python is fun!") print("Really!")',
                        variant: 'error',
                        staticResult: 'SyntaxError: invalid syntax',
                        preContent: '<p>However, if you put two statements on the same line without a separator (newline or <code>;</code>), Python will give an error:</p>'
                    },
                    { title: 'Case sensitivity', code: 'myVar = "Hello"\nmyvar = "World"\nprint(myVar)\nprint(myvar)' },
                ],
                exercise: {
                    question: 'Can you put multiple statements on one line in Python?',
                    options: ['No, never', 'Yes, by separating them with semicolons', 'Yes, by separating them with commas'],
                    answer: 1,
                },
            }, {
                id: 'syntax-challenge', title: 'Code Challenge',
                type: 'challenge',
                instructions: [
                    'Write a statement that prints "Hello World!"',
                    'Write a statement that prints "Have a good day."',
                    'Write a statement that prints "Learning Python is fun!"'
                ],
                starterCode: '# Print "Hello World!"\n\n# Print "Have a good day."\n\n# Print "Learning Python is fun!"',
                solution: 'print("Hello World!")\nprint("Have a good day.")\nprint("Learning Python is fun!")',
                content: `<p>Test your understanding of Python statements by completing a small coding challenge.</p>`,
            }],
        },

        /* ────── 4. Python Output ────── */
        {
            id: 'output', title: 'Python Output / Print',
            sections: [
                {
                    id: 'output-text', title: 'Print Text',
                    content: `<p>You have already learned that you can use the <code>print()</code> function to display text or output values:</p>`,
                    examples: [
                        {
                            title: 'Example',
                            code: 'print("Hello World!")'
                        },
                        {
                            title: 'Example',
                            code: 'print("Hello World!")\nprint("I am learning Python.")\nprint("It is awesome!")',
                            preContent: `<p>You can use the <code>print()</code> function as many times as you want. Each call prints text on a new line by default:</p>`
                        },
                        {
                            title: 'Example',
                            code: 'print("This will work!")\nprint(\'This will also work!\')',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Double Quotes</h2>\n<p>Text in Python must be inside quotes. You can use either " double quotes or ' single quotes:</p>`
                        },
                        {
                            title: 'Example',
                            code: 'print(This will cause an error)',
                            variant: 'error',
                            staticResult: 'SyntaxError: invalid syntax.',
                            preContent: `<p>If you forget to put the text inside quotes, Python will give an error:</p>`
                        },
                        {
                            title: 'Example',
                            code: 'print("Hello World!", end=" ")\nprint("I will print on the same line.")',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Print Without a New Line</h2>\n<p>By default, the <code>print()</code> function ends with a new line.</p>\n<p>If you want to print multiple words on the same line, you can use the <code>end</code> parameter:</p>`,
                            postContent: `<p>Note that we add a space after <code>end=" "</code> for better readability.</p>`
                        }
                    ],
                    exercise: {
                        question: 'How many print() calls are needed to print text on three separate lines?',
                        options: ['1', '2', '3'],
                        answer: 2,
                    },
                },
                {
                    id: 'output-numbers', title: 'Print Numbers',
                    content: `<p>You can also use the <code>print()</code> function to display numbers:</p>\n<p>However, unlike text, we don't put numbers inside double quotes:</p>`,
                    examples: [
                        {
                            title: 'Example',
                            code: 'print(3)\nprint(358)\nprint(50000)'
                        },
                        {
                            title: 'Example',
                            code: 'print(3 + 3)\nprint(2 * 5)',
                            preContent: `<p>You can also do math inside the <code>print()</code> function:</p>`
                        },
                        {
                            title: 'Example',
                            code: 'print("I am", 35, "years old.")',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Mix Text and Numbers</h2>\n<p>You can combine text and numbers in one output by separating them with a comma:</p>`,
                            postContent: `<div style="background-color: #ffffcc; padding: 20px; border-radius: 4px; border-left: 6px solid #ffeb3b; margin-top: 30px; font-size: 15px;">\nYou will learn more about combining text and variables in the <a href="#" style="color: #000; text-decoration: underline;">Python Variables</a> and <a href="#" style="color: #000; text-decoration: underline;">Python Strings</a> chapters.\n</div>`
                        }
                    ],
                    exercise: {
                        question: 'What character is used to combine text and numbers in a print() function?',
                        options: ['+', ',', ';'],
                        answer: 1,
                    },
                },
                {
                    id: 'output-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Assign the value "Apple" to x',
                        'Assign the value "Banana" to y',
                        'Assign the value "Cherry" to z',
                        'Print all three variables in one "print()" statement'
                    ],
                    starterCode: '# Assign variables\n\n\n\n# Print them',
                    solution: 'x = "Apple"\ny = "Banana"\nz = "Cherry"\nprint(x, y, z)',
                    content: `<p>Test your understanding of Python output by completing this challenge.</p>`,
                }
            ]
        },

        /* ────── 5. Python Comments ────── */
        {
            id: 'comments', title: 'Python Comments',
            sections: [
                {
                    id: 'comments-main', title: 'Comments',
                    content: `<p>Comments can be used to explain Python code.</p>\n<p>to make the code more readable.</p>\n<p>to prevent execution when testing code.</p>\n\n<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Creating a Comment</h2>\n<p>Comments starts with a <code>#</code>, and Python will ignore them:</p>`,
                    examples: [
                        {
                            title: 'Example',
                            code: '#This is a comment\nprint("Hello, World!")'
                        },
                        {
                            title: 'Example',
                            code: 'print("Hello, World!") #This is a comment',
                            preContent: `<p>Comments can be placed at the end of a line, and Python will ignore the rest of the line:</p>`
                        },
                        {
                            title: 'Example',
                            code: '#print("Hello, World!")\nprint("Cheers, Mate!")',
                            preContent: `<p>A comment does not have to be text that explains the code, it can also be used to prevent Python from executing the code:</p>`
                        },
                        {
                            title: 'Example',
                            code: '#This is a comment\n#written in\n#more than just one line\nprint("Hello, World!")',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Multi Line Comments</h2>\n<p>Python does not really have a syntax for multi line comments.</p>\n<p>To add a multiline comment you could insert a <code>#</code> for each line:</p>`
                        },
                        {
                            title: 'Example',
                            code: '"""\nThis is a comment\nwritten in\nmore than just one line\n"""\nprint("Hello, World!")',
                            preContent: `<p>Or, not quite as intended, you can use a multiline string.</p>\n<p>Since Python will ignore string literals that are not assigned to a variable, you can add a multiline string (triple quotes) in your code, and place your comment inside it:</p>`,
                            postContent: `<p>As long as the string is not assigned to a variable, Python will read the code, but then ignore it, and you have made a multiline comment.</p>`
                        }
                    ],
                    exercise: {
                        question: 'Which character is used to create a comment in Python?',
                        options: ['//', '#', '/*'],
                        answer: 1,
                    },
                },
                {
                    id: 'comments-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Add a single-line comment that says <b>This is a comment</b>',
                        'Comment out the line <code>print("This should not run")</code> so it does not execute',
                        'Add a multiline comment (using triple quotes) that says <b>This is<br/>a multiline<br/>comment</b>'
                    ],
                    starterCode: '# Write a single-line comment\n\n# Comment out this line so it does not run:\nprint("This should not run")\n\n# Add a multiline comment',
                    solution: '# This is a comment\n\n# # Comment out this line so it does not run:\n# print("This should not run")\n\n"""\nThis is\na multiline\ncomment\n"""',
                    content: `<p>Test your understanding of Python comments by completing this challenge.</p>`,
                }
            ]
        },

        /* ────── 6. Python Variables ────── */
        {
            id: 'variables', title: 'Python Variables',
            sections: [
                {
                    id: 'variables-intro', title: 'Python Variables',
                    content: `<h2 style="font-size: 30px; font-weight: 700; margin-bottom: 20px;">Variables</h2>\n<p>Variables are containers for storing data values.</p>
<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Python Variables</h2>
<p>Python has no command for declaring a variable.</p>
<p>A variable is created the moment you first assign a value to it.</p>`,
                    examples: [
                        {
                            title: 'Example',
                            code: 'x = 5\ny = "John"'
                        },
                        {
                            title: 'Example',
                            code: 'x = 4       # x is of type int\nx = "Sally" # x is now of type str\nprint(x)',
                            preContent: `<p>Variables do not need to be declared with any particular <em>type</em>, and can even change type after they have been set.</p>`
                        },
                        {
                            title: 'Example',
                            code: 'x = str(3)    # x will be \'3\'\ny = int(3)    # y will be 3\nz = float(3)  # z will be 3.0',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Casting</h2>\n<p>If you want to specify the data type of a variable, this can be done with casting.</p>`
                        },
                        {
                            title: 'Example',
                            code: 'x = 5\ny = "John"\nprint(type(x))\nprint(type(y))',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Get the Type</h2>\n<p>You can get the data type of a variable with the <code>type()</code> function.</p>`,
                            postContent: `<p>You will learn more about data types and casting later in this tutorial.</p>`
                        },
                        {
                            title: 'Example',
                            code: 'x = "John"\n# is the same as\nx = \'John\'',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Single or Double Quotes?</h2>\n<p>String variables can be declared either by using single or double quotes:</p>`
                        },
                        {
                            title: 'Example',
                            code: 'a = 4\nA = "Sally"\n#A will not overwrite a',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Case-Sensitive</h2>\n<p>Variable names are case-sensitive.</p>`
                        }
                    ],
                    exercise: {
                        question: 'What is a correct way to declare a Python variable?',
                        options: ['var x = 5', '#x = 5', '$x = 5', 'x = 5'],
                        answer: 3
                    }
                },
                {
                    id: 'variables-names', title: 'Variable Names',
                    content: `<p>A variable can have a short name (like x and y) or a more descriptive name (age, carname, total_volume).</p>
<p>Rules for Python variables:</p>
<ul>
    <li>A variable name must start with a letter or the underscore character</li>
    <li>A variable name cannot start with a number</li>
    <li>A variable name can only contain alpha-numeric characters and underscores (A-z, 0-9, and _)</li>
    <li>Variable names are case-sensitive (age, Age and AGE are three different variables)</li>
    <li>A variable name cannot be any of the Python keywords.</li>
</ul>`,
                    examples: [
                        {
                            title: 'Legal variable names',
                            code: 'myvar = "John"\nmy_var = "John"\n_my_var = "John"\nmyVar = "John"\nMYVAR = "John"\nmyvar2 = "John"'
                        },
                        {
                            title: 'Illegal variable names',
                            code: '2myvar = "John"\nmy-var = "John"\nmy var = "John"',
                            variant: 'error',
                            staticResult: '  File "demo.py", line 1\n    2myvar = "John"\n    ^\nSyntaxError: invalid syntax'
                        },
                        {
                            title: 'Multi Words Variable Names',
                            code: '# Camel Case\nmyVariableName = "John"\n\n# Pascal Case\nMyVariableName = "John"\n\n# Snake Case\nmy_variable_name = "John"',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Multi Words Variable Names</h2>\n<p>Variable names with more than one word can be difficult to read.</p>\n<p>There are several techniques you can use to make them more readable:</p>`
                        }
                    ]
                },
                {
                    id: 'variables-multi', title: 'Assign Multiple Values',
                    content: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Many Values to Multiple Variables</h2>
<p>Python allows you to assign values to multiple variables in one line:</p>`,
                    examples: [
                        {
                            title: 'Example',
                            code: 'x, y, z = "Orange", "Banana", "Cherry"\nprint(x)\nprint(y)\nprint(z)'
                        },
                        {
                            title: 'One Value to Multiple Variables',
                            code: 'x = y = z = "Orange"\nprint(x)\nprint(y)\nprint(z)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">One Value to Multiple Variables</h2>\n<p>And you can assign the <em>same</em> value to multiple variables in one line:</p>`
                        },
                        {
                            title: 'Unpack a Collection',
                            code: 'fruits = ["apple", "banana", "cherry"]\nx, y, z = fruits\nprint(x)\nprint(y)\nprint(z)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Unpack a Collection</h2>\n<p>If you have a collection of values in a list, tuple etc. Python allows you to extract the values into variables. This is called <em>unpacking</em>.</p>`
                        }
                    ]
                },
                {
                    id: 'variables-output', title: 'Output Variables',
                    content: `<p>The Python <code>print()</code> function is often used to output variables.</p>`,
                    examples: [
                        {
                            title: 'Example',
                            code: 'x = "Python is awesome"\nprint(x)'
                        },
                        {
                            title: 'Example',
                            code: 'x = "Python"\ny = "is"\nz = "awesome"\nprint(x, y, z)',
                            preContent: `<p>In the <code>print()</code> function, you output multiple variables, separated by a comma:</p>`
                        },
                        {
                            title: 'Example',
                            code: 'x = "Python "\ny = "is "\nz = "awesome"\nprint(x + y + z)',
                            preContent: `<p>You can also use the <code>+</code> operator to output multiple variables:</p>`,
                            postContent: `<p>Notice the space character after "Python " and "is ", without them the result would be "Pythonisawesome".</p>`
                        },
                        {
                            title: 'Example',
                            code: 'x = 5\ny = 10\nprint(x + y)',
                            preContent: `<p>For numbers, the <code>+</code> character works as a mathematical operator:</p>`
                        }
                    ]
                },
                {
                    id: 'variables-global', title: 'Global Variables',
                    content: `<p>Variables that are created outside of a function (as in all of the examples in the previous pages) are known as global variables.</p>
<p>Global variables can be used by everyone, both inside of functions and outside.</p>`,
                    examples: [
                        {
                            title: 'Example',
                            code: 'x = "awesome"\n\ndef myfunc():\n  print("Python is " + x)\n\nmyfunc()'
                        },
                        {
                            title: 'The global Keyword',
                            code: 'def myfunc():\n  global x\n  x = "fantastic"\n\nmyfunc()\n\nprint("Python is " + x)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The global Keyword</h2>\n<p>Normally, when you create a variable inside a function, that variable is local, and can only be used inside that function.</p>\n<p>To create a global variable inside a function, you can use the <code>global</code> keyword.</p>`
                        }
                    ]
                },
                {
                    id: 'variables-exercises', title: 'Variable Exercises',
                    exercise: {
                        question: 'Create a variable named <b>carname</b> and assign the value <b>Volvo</b> to it.',
                        options: ['carname = "Volvo"', 'variable carname = "Volvo"', 'carname := "Volvo"'],
                        answer: 0
                    }
                },
                {
                    id: 'variables-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a variable named <code>x</code> and assign the value 50 to it',
                        'Create a variable named <code>y</code> and assign the value 10 to it',
                        'Print the sum of <code>x</code> and <code>y</code>'
                    ],
                    starterCode: '# Create variables here\n\n\n# Print sum here\n',
                    solution: 'x = 50\ny = 10\nprint(x + y)',
                    content: `<p>Test your knowledge by completing this variables challenge!</p>`
                }
            ]
        },

        /* ────── 7. Python Data Types ────── */
        {
            id: 'data-types', title: 'Python Data Types',
            sections: [
                {
                    id: 'data-types-main', title: 'Data Types',
                    content: `<p>In programming, data type is an important concept.</p>
<p>Variables can store data of different types, and different types can do different things.</p>
<p>Python has the following data types built-in by default, in these categories:</p>
<table style="width:100%;text-align:left;border-collapse:collapse;margin-top:20px;">
  <tr style="border-bottom: 2px solid #ddd; background-color: #f2f2f2;"><th>Category</th><th>Types</th></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>Text Type:</td><td><code>str</code></td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>Numeric Types:</td><td><code>int</code>, <code>float</code>, <code>complex</code></td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>Sequence Types:</td><td><code>list</code>, <code>tuple</code>, <code>range</code></td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>Mapping Type:</td><td><code>dict</code></td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>Set Types:</td><td><code>set</code>, <code>frozenset</code></td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>Boolean Type:</td><td><code>bool</code></td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>Binary Types:</td><td><code>bytes</code>, <code>bytearray</code>, <code>memoryview</code></td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>None Type:</td><td><code>NoneType</code></td></tr>
</table>`,
                    examples: [
                        {
                            title: 'Getting the Data Type',
                            code: 'x = 5\nprint(type(x))',
                            preContent: '<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Getting the Data Type</h2>\n<p>You can get the data type of any object by using the <code>type()</code> function:</p>'
                        }
                    ],
                    exercise: {
                        question: 'Which of these is a numeric data type in Python?',
                        options: ['str', 'int', 'list', 'bool'],
                        answer: 1
                    }
                },
                {
                    id: 'data-types-setting', title: 'Setting the Data Type',
                    content: `<p>In Python, the data type is set when you assign a value to a variable:</p>`,
                    examples: [
                        { title: 'str', code: 'x = "Hello World"\nprint(type(x))' },
                        { title: 'int', code: 'x = 20\nprint(type(x))' },
                        { title: 'float', code: 'x = 20.5\nprint(type(x))' },
                        { title: 'complex', code: 'x = 1j\nprint(type(x))' },
                        { title: 'list', code: 'x = ["apple", "banana", "cherry"]\nprint(type(x))' },
                        { title: 'tuple', code: 'x = ("apple", "banana", "cherry")\nprint(type(x))' },
                        { title: 'range', code: 'x = range(6)\nprint(type(x))' },
                        { title: 'dict', code: 'x = {"name" : "John", "age" : 36}\nprint(type(x))' },
                        { title: 'set', code: 'x = {"apple", "banana", "cherry"}\nprint(type(x))' },
                        { title: 'frozenset', code: 'x = frozenset({"apple", "banana", "cherry"})\nprint(type(x))' },
                        { title: 'bool', code: 'x = True\nprint(type(x))' },
                        { title: 'bytes', code: 'x = b"Hello"\nprint(type(x))' },
                        { title: 'bytearray', code: 'x = bytearray(5)\nprint(type(x))' },
                        { title: 'memoryview', code: 'x = memoryview(bytes(5))\nprint(type(x))' },
                        { title: 'NoneType', code: 'x = None\nprint(type(x))' }
                    ]
                },
                {
                    id: 'data-types-specific', title: 'Setting Specific Data Type',
                    content: `<p>If you want to specify the data type, you can use the following constructor functions:</p>`,
                    examples: [
                        { title: 'str', code: 'x = str("Hello World")\nprint(type(x))' },
                        { title: 'int', code: 'x = int(20)\nprint(type(x))' },
                        { title: 'float', code: 'x = float(20.5)\nprint(type(x))' },
                        { title: 'complex', code: 'x = complex(1j)\nprint(type(x))' },
                        { title: 'list', code: 'x = list(("apple", "banana", "cherry"))\nprint(type(x))' },
                        { title: 'tuple', code: 'x = tuple(("apple", "banana", "cherry"))\nprint(type(x))' },
                        { title: 'dict', code: 'x = dict(name="John", age=36)\nprint(type(x))' },
                        { title: 'set', code: 'x = set(("apple", "banana", "cherry"))\nprint(type(x))' },
                        { title: 'bool', code: 'x = bool(5)\nprint(type(x))' }
                    ],
                    exercise: {
                        question: 'What is the correct way to specify that the variable x should be treated as a string containing "10"?',
                        options: ['x = 10', 'x = str(10)', 'x = int("10")', 'x = float(10)'],
                        answer: 1
                    }
                },
                {
                    id: 'data-types-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a variable <code>x</code> and explicitly cast it to be an integer with the value <code>10</code>.',
                        'Create a variable <code>y</code> and explicitly cast it to be a float with the value <code>3.14</code>.',
                        'Print the type of <code>x</code>.',
                        'Print the type of <code>y</code>.'
                    ],
                    starterCode: '# Assign and cast variables\n\n# Print types\n',
                    solution: 'x = int(10)\ny = float(3.14)\nprint(type(x))\nprint(type(y))',
                    content: `<p>Practice identifying and setting data types!</p>`
                }
            ]
        },

        /* ────── 8. Python Numbers ────── */
        {
            id: 'numbers', title: 'Python Numbers',
            sections: [
                {
                    id: 'numbers-main', title: 'Numbers',
                    content: `<p>There are three numeric types in Python:</p>
<ul>
  <li><code>int</code></li>
  <li><code>float</code></li>
  <li><code>complex</code></li>
</ul>
<p>Variables of numeric types are created when you assign a value to them:</p>`,
                    examples: [
                        {
                            title: 'Example',
                            code: 'x = 1    # int\ny = 2.8  # float\nz = 1j   # complex\n\nprint(type(x))\nprint(type(y))\nprint(type(z))',
                            preContent: '<p>To verify the type of any object in Python, use the <code>type()</code> function:</p>'
                        }
                    ],
                    exercise: {
                        question: 'Which of the following is NOT a numeric type in Python?',
                        options: ['int', 'float', 'complex', 'str'],
                        answer: 3
                    }
                },
                {
                    id: 'numbers-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create an <code>int</code> variable named <code>x</code> with the value <code>100</code>.',
                        'Create a <code>float</code> variable named <code>y</code> with the value <code>99.9</code>.',
                        'Print both variables.'
                    ],
                    starterCode: '# Assign variables\n\n# Print variables\n',
                    solution: 'x = 100\ny = 99.9\nprint(x)\nprint(y)',
                    content: '<p>Practice creating numeric variables in Python!</p>'
                }
            ]
        },

        /* ────── 9. Python Casting ────── */
        {
            id: 'casting', title: 'Python Casting',
            sections: [
                {
                    id: 'casting-specify', title: 'Specify a Variable Type',
                    content: `<p>There may be times when you want to specify a type on to a variable. This can be done with casting.</p>
<p>Python is an object-orientated language, and as such it uses classes to define data types, including its primitive types.</p>
<p>Casting in python is therefore done using constructor functions:</p>
<ul>
<li><code>int()</code> - constructs an integer number from an integer literal, a float literal (by removing all decimals), or a string literal (providing the string represents a whole number)</li>
<li><code>float()</code> - constructs a float number from an integer literal, a float literal or a string literal (providing the string represents a float or an integer)</li>
<li><code>str()</code> - constructs a string from a wide variety of data types, including strings, integer literals and float literals</li>
</ul>`,
                    examples: [
                        { title: 'Integers', code: 'x = int(1)   # x will be 1\ny = int(2.8) # y will be 2\nz = int("3") # z will be 3\nprint(x)\nprint(y)\nprint(z)' },
                        { title: 'Floats', code: 'x = float(1)     # x will be 1.0\ny = float(2.8)   # y will be 2.8\nz = float("3")   # z will be 3.0\nw = float("4.2") # w will be 4.2\nprint(x)\nprint(y)\nprint(z)\nprint(w)' },
                        { title: 'Strings', code: 'x = str("s1") # x will be \'s1\'\ny = str(2)    # y will be \'2\'\nz = str(3.0)  # z will be \'3.0\'\nprint(x)\nprint(y)\nprint(z)' }
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
                    starterCode: '# Create float variable\n\n# Cast to int\n\n# Print both\n',
                    solution: 'price = 9.99\nint_price = int(price)\nprint(price)\nprint(int_price)',
                    content: `<p>Practice your casting skills!</p>`
                }
            ]
        },


        /* ────── 10. Python Operators ────── */
        {
            id: 'operators', title: 'Python Operators',
            sections: [
                {
                    id: 'operators-arithmetic', title: 'Arithmetic Operators',
                    content: `<p>Arithmetic operators are used with numeric values to perform common mathematical operations.</p>`,
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
                    content: `<p>Assignment operators are used to assign values to variables.</p>`,
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
                    content: `<p>Comparison operators are used to compare two values. They return a boolean (True or False).</p>`,
                    examples: [
                        { title: 'Equal and Not Equal', code: 'x = 5\\ny = 3\\n\\nprint(x == y)  # False (Equal)\\nprint(x != y)  # True (Not equal)' },
                        { title: 'Greater / Less Than', code: 'x = 5\\ny = 3\\n\\nprint(x > y)   # True (Greater than)\\nprint(x < y)   # False (Less than)' },
                        { title: 'Greater/Less or Equal', code: 'x = 5\\ny = 5\\n\\nprint(x >= y)  # True (Greater than or equal to)\\nprint(x <= y)  # True (Less than or equal to)' }
                    ],
                    exercise: { question: 'Which operator checks if two values are equal?', options: ['=', '==', '!=', '==='], answer: 1 }
                },
                {
                    id: 'operators-logical', title: 'Logical Operators',
                    content: `<p>Logical operators are used to combine conditional statements.</p>`,
                    examples: [
                        { title: 'The "and" Operator', code: 'x = 5\\n# Returns True if BOTH statements are true\\nprint(x > 3 and x < 10)  # True' },
                        { title: 'The "or" Operator', code: 'x = 5\\n# Returns True if ONE of the statements is true\\nprint(x > 10 or x < 10)  # True' },
                        { title: 'The "not" Operator', code: 'x = 5\\n# Reverse the result (returns False if the result is true)\\nprint(not(x > 3 and x < 10))  # False' }
                    ],
                    exercise: { question: 'What does "True and False" evaluate to?', options: ['True', 'False', 'None'], answer: 1 }
                },
                {
                    id: 'operators-identity', title: 'Identity Operators',
                    content: `<p>Identity operators are used to compare the objects, not if they are equal, but if they are actually the <strong>same object</strong> with the same memory location.</p>`,
                    examples: [
                        { title: 'The "is" Operator', code: 'x = ["apple", "banana"]\\ny = ["apple", "banana"]\\nz = x\\n\\nprint(x is z)  # True (z is the same object as x)\\nprint(x is y)  # False (y is a different object, even though content is the same)\\n\\nprint(x == y)  # True (== checks value equality, "is" checks identity)' },
                        { title: 'The "is not" Operator', code: 'x = ["apple", "banana"]\\ny = ["apple", "banana"]\\n\\nprint(x is not y)  # True (they are not the same object in memory)' }
                    ],
                    exercise: { question: 'Difference between "==" and "is"?', options: ['"==" checks value, "is" checks memory identity', 'They are the same', 'No difference'], answer: 0 }
                },
                {
                    id: 'operators-membership', title: 'Membership Operators',
                    content: `<p>Membership operators are used to test if a sequence is presented in an object.</p>`,
                    examples: [
                        { title: 'The "in" Operator', code: 'fruits = ["apple", "banana"]\\n\\nprint("banana" in fruits)  # True\\nprint("orange" in fruits)  # False\\n\\n# Works on strings too!\\nname = "Python"\\nprint("yt" in name)        # True' },
                        { title: 'The "not in" Operator', code: 'fruits = ["apple", "banana"]\\n\\nprint("pineapple" not in fruits)  # True' }
                    ],
                    exercise: { question: 'Which operator checks if an item is inside a list?', options: ['inside', 'has', 'in'], answer: 2 }
                },
                {
                    id: 'operators-precedence', title: 'Operator Precedence',
                    content: `<p>Operator precedence describes the order in which operations are performed.</p>`,
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
                    content: `<p>Test your knowledge of everything you've learned about Python operators!</p>`
                }
            ]
        },

        /* ────── 11. Python Strings ────── */
        {
            id: 'strings', title: 'Python Strings',
            sections: [
                {
                    id: 'strings-basics', title: 'String Basics',
                    content: `<p>Strings in Python are surrounded by either single quotation marks, or double quotation marks. <code>'hello'</code> is the same as <code>"hello"</code>.</p>
<p>You can display a string literal with the <code>print()</code> function.</p>
<h3>Multiline Strings</h3>
<p>You can assign a multiline string to a variable by using three quotes (single or double):</p>`,
                    examples: [
                        { title: 'String Variables', code: 'a = "Hello"\nprint(a)' },
                        { title: 'Multiline String', code: 'a = """Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua."""\nprint(a)' },
                        { title: 'Strings are Arrays', code: '# Get the character at position 1 (remember that the first character has the position 0):\na = "Hello, World!"\nprint(a[1])  # Outputs "e"' },
                        { title: 'Looping Through a String', code: 'for x in "banana":\n    print(x)' },
                        { title: 'String Length', code: 'a = "Hello, World!"\nprint(len(a))  # Outputs 13' },
                        { title: 'Check String', code: 'txt = "The best things in life are free!"\nprint("free" in txt)  # True\n\n# Using if statement\nif "free" in txt:\n    print("Yes, \'free\' is present.")' }
                    ],
                    exercise: { question: 'What is the correct syntax to output the character "o" from the string: txt = "Hello"?', options: ['txt[4]', 'txt[5]', 'txt.get(4)'], answer: 0 }
                },
                {
                    id: 'strings-slicing', title: 'Slicing Strings',
                    content: `<p>You can return a range of characters by using the slice syntax.</p>
<p>Specify the start index and the end index, separated by a colon, to return a part of the string.</p>`,
                    examples: [
                        { title: 'Slicing', code: 'b = "Hello, World!"\n# Get characters from position 2 to 5 (not included)\nprint(b[2:5])  # Outputs "llo"' },
                        { title: 'Slice From the Start', code: 'b = "Hello, World!"\n# By leaving out the start index, the range will start at the first character:\nprint(b[:5])  # Outputs "Hello"' },
                        { title: 'Slice To the End', code: 'b = "Hello, World!"\n# By leaving out the end index, the range will go to the end:\nprint(b[2:])  # Outputs "llo, World!"' },
                        { title: 'Negative Indexing', code: 'b = "Hello, World!"\n# Use negative indexes to start the slice from the end of the string:\nprint(b[-5:-2])  # Outputs "orl"' }
                    ],
                    exercise: { question: 'What does b[1:4] return if b = "Python"?', options: ['Py', 'yth', 'ytho', 'Pyt'], answer: 1 }
                },
                {
                    id: 'strings-modify', title: 'Modify Strings',
                    content: `<p>Python has a set of built-in methods that you can use on strings.</p>`,
                    examples: [
                        { title: 'Upper Case', code: 'a = "Hello, World!"\nprint(a.upper())' },
                        { title: 'Lower Case', code: 'a = "Hello, World!"\nprint(a.lower())' },
                        { title: 'Remove Whitespace', code: 'a = " Hello, World! "\n# strip() removes any whitespace from the beginning or the end\nprint(a.strip()) # returns "Hello, World!"' },
                        { title: 'Replace String', code: 'a = "Hello, World!"\n# format: string.replace(old, new)\nprint(a.replace("H", "J")) # returns "Jello, World!"' },
                        { title: 'Split String', code: 'a = "Hello, World!"\n# split() splits the string into a list if it finds instances of the separator:\nprint(a.split(",")) # returns [\'Hello\', \' World!\']' }
                    ],
                    exercise: { question: 'Which method returns a string in uppercase letters?', options: ['uppercase()', 'toUpper()', 'upper()'], answer: 2 }
                },
                {
                    id: 'strings-concat', title: 'String Concatenation',
                    content: `<p>To concatenate, or combine, two strings you can use the <code>+</code> operator.</p>`,
                    examples: [
                        { title: 'Merge Variables', code: 'a = "Hello"\nb = "World"\nc = a + b\nprint(c)  # HelloWorld' },
                        { title: 'Add a Space', code: 'a = "Hello"\nb = "World"\nc = a + " " + b\nprint(c)  # Hello World' },
                    ],
                    exercise: { question: 'How do you combine: a = "Hi" and b = "!"?', options: ['a & b', 'a + b', 'concat(a, b)'], answer: 1 }
                },
                {
                    id: 'strings-formatting', title: 'Format Strings',
                    content: `<p>As we learned in the Python Variables chapter, we cannot combine strings and numbers like this: <code>age = 36; txt = "My name is John, I am " + age</code> (This gives an error!)</p>
<p>But we can combine strings and numbers by using f-strings or the <code>format()</code> method!</p>
<h3>F-Strings (Recommended)</h3>
<p>F-strings were introduced in Python 3.6, and is now the preferred way of formatting strings. To specify a string as an f-string, simply put an <code>f</code> in front of the string literal, and add curly brackets <code>{}</code> as placeholders for variables and other operations.</p>`,
                    examples: [
                        { title: 'F-Strings', code: 'age = 36\ntxt = f"My name is John, I am {age}"\nprint(txt)' },
                        { title: 'Placeholders and Modifiers', code: 'price = 59\n# A modifier is included by adding a colon : followed by a legal formatting type\n# The .2f modifier turns the value into a float with 2 decimals:\ntxt = f"The price is {price:.2f} dollars"\nprint(txt)' },
                        { title: 'Math Operations', code: 'txt = f"The math is: 20 * 59 = {20 * 59}"\nprint(txt)' }
                    ],
                    exercise: { question: 'Which formatting type formats a number as a float with 2 decimal places?', options: ['.2f', '2d', '.2p'], answer: 0 }
                },
                {
                    id: 'strings-escape', title: 'Escape Characters',
                    content: `<p>To insert characters that are illegal in a string, use an escape character.</p>
<p>An escape character is a backslash <code>\\</code> followed by the character you want to insert.</p>`,
                    examples: [
                        { title: 'Double Quotes Inside String', code: '# You will get an error if you use double quotes inside a string that is surrounded by double quotes:\n# txt = "We are the so-called "Vikings" from the north."\n\n# To fix this problem, use the escape character \\":\ntxt = "We are the so-called \\"Vikings\\" from the north."\nprint(txt)' },
                        { title: 'Common Escape Characters', code: 'print("Hello\\nWorld")  # New Line\nprint("Hello\\tWorld")  # Tab\nprint("A backslash: \\\\") # Single Backslash' }
                    ],
                    exercise: { question: 'Which escape character inserts a new line?', options: ['\\n', '\\t', '\\r'], answer: 0 }
                },
                {
                    id: 'strings-methods', title: 'String Methods',
                    content: `<p>Python has a set of built-in methods that you can use on strings. All string methods return new values. They do not change the original string.</p>
<table style="width:100%;text-align:left;border-collapse:collapse;margin-top:20px;">
  <tr style="border-bottom: 2px solid #ddd; background-color: #f2f2f2;"><th>Method</th><th>Description</th></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>capitalize()</td><td>Converts the first character to upper case</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>count()</td><td>Returns the number of times a specified value occurs in a string</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>find()</td><td>Searches the string for a specified value and returns the position of where it was found</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>isalpha()</td><td>Returns True if all characters in the string are in the alphabet</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>isnumeric()</td><td>Returns True if all characters in the string are numeric</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>startswith()</td><td>Returns true if the string starts with the specified value</td></tr>
</table>`,
                    examples: [
                        { title: 'Using String Methods', code: 'txt = "hello, and welcome to my world."\n\nprint(txt.capitalize())\nprint(txt.count("o"))\nprint(txt.find("welcome"))\n\nwords = "Python123"\nprint(words.isalpha())    # False (because of numbers)\nprint(words.isnumeric())  # False (because of letters)' }
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
                    starterCode: '# Assign variables\n\n# Strip whitespace\n\n# Lowercase\n\n# F-string formatting\n\n# Replace text\n',
                    solution: 'text = "  Python Programming!  "\nprint(text.strip())\nprint(text.lower())\nname = "Alice"\nage = 25\nprint(f"{name} is {age} years old.")\nprint(text.replace("Programming", "Rules"))',
                    content: `<p>Test your knowledge of Python string manipulation!</p>`
                }
            ]
        },

        /* ────── 12. Python Booleans ────── */
        {
            id: 'booleans', title: 'Python Booleans',
            sections: [
                {
                    id: 'booleans-main', title: 'Booleans',
                    content: `<p>Booleans represent one of two values: <code>True</code> or <code>False</code>.</p>
<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Boolean Values</h2>
<p>In programming you often need to know if an expression is <code>True</code> or <code>False</code>.</p>
<p>You can evaluate any expression in Python, and get one of two answers, <code>True</code> or <code>False</code>.</p>
<p>When you compare two values, the expression is evaluated and Python returns the Boolean answer:</p>`,
                    examples: [
                        { title: 'Comparing Values', code: 'print(10 > 9)\nprint(10 == 9)\nprint(10 < 9)' },
                        {
                            title: 'Example',
                            code: 'a = 200\nb = 33\n\nif b > a:\n  print("b is greater than a")\nelse:\n  print("b is not greater than a")',
                            preContent: '<p>When you run a condition in an if statement, Python returns <code>True</code> or <code>False</code>:</p>'
                        }
                    ],
                    exercise: {
                        question: 'What is the boolean result of: print(10 == 9)?',
                        options: ['True', 'False', 'None'],
                        answer: 1
                    }
                },
                {
                    id: 'booleans-evaluate', title: 'Evaluate Values',
                    content: `<p>The <code>bool()</code> function allows you to evaluate any value, and give you <code>True</code> or <code>False</code> in return,</p>`,
                    examples: [
                        { title: 'Evaluate strings and numbers', code: 'print(bool("Hello"))\nprint(bool(15))' },
                        {
                            title: 'Evaluate Variables',
                            code: 'x = "Hello"\ny = 15\n\nprint(bool(x))\nprint(bool(y))',
                            preContent: '<p>You can also evaluate variables:</p>'
                        }
                    ]
                },
                {
                    id: 'booleans-false', title: 'Some Values are False',
                    content: `<p>In fact, there are not many values that evaluate to <code>False</code>, except empty values, such as <code>()</code>, <code>[]</code>, <code>{}</code>, <code>""</code>, the number <code>0</code>, and the value <code>None</code>. And of course the value <code>False</code> evaluates to <code>False</code>.</p>`,
                    examples: [
                        {
                            title: 'The following will return False:',
                            code: 'print(bool(False))\nprint(bool(None))\nprint(bool(0))\nprint(bool(""))\nprint(bool(()))\nprint(bool([]))\nprint(bool({}))'
                        }
                    ],
                    exercise: {
                        question: 'Which of these values evaluates to False?',
                        options: ['"False"', '1', '0', 'True'],
                        answer: 2
                    }
                },
                {
                    id: 'booleans-functions', title: 'Functions can Return a Boolean',
                    content: `<p>You can create functions that returns a Boolean Value:</p>`,
                    examples: [
                        {
                            title: 'Example',
                            code: 'def myFunction() :\n  return True\n\nprint(myFunction())'
                        },
                        {
                            title: 'Example',
                            code: 'def myFunction() :\n  return True\n\nif myFunction():\n  print("YES!")\nelse:\n  print("NO!")',
                            preContent: '<p>You can execute code based on the Boolean answer of a function:</p>'
                        },
                        {
                            title: 'Checking Types',
                            code: 'x = 200\nprint(isinstance(x, int))',
                            preContent: '<p>Python also has many built-in functions that return a boolean value, like the <code>isinstance()</code> function, which can be used to determine if an object is of a certain data type:</p>'
                        }
                    ]
                },
                {
                    id: 'booleans-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a variable <code>is_python_fun</code> and set it to <code>True</code>.',
                        'Create a variable <code>is_coding_hard</code> and set it to <code>False</code>.',
                        'Print the result of <code>is_python_fun</code> AND <code>is_coding_hard</code>.'
                    ],
                    starterCode: '# Create boolean variables\n\n\n# Print logical check\n',
                    solution: 'is_python_fun = True\nis_coding_hard = False\nprint(is_python_fun and is_coding_hard)',
                    content: `<p>Test your boolean logic skills!</p>`
                }
            ]
        },

        /* ────── 13. Python Lists ────── */
        {
            id: 'lists', title: 'Python Lists',
            sections: [
                {
                    id: 'lists-intro', title: 'Python Lists',
                    content: `<p>Lists are used to store multiple items in a single variable.</p>
<p>Lists are one of 4 built-in data types in Python used to store collections of data. The other 3 are Tuple, Set, and Dictionary.</p>
<p>Lists are created using square brackets <code>[]</code>.</p>
<p>List items are:</p>
<ul>
<li><strong>Ordered</strong> — they have a defined order that will not change.</li>
<li><strong>Changeable</strong> — we can change, add, and remove items after it has been created.</li>
<li><strong>Allow duplicates</strong> — lists can have items with the same value.</li>
</ul>`,
                    examples: [
                        {
                            title: 'Create a List',
                            code: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits)\nprint(type(fruits))  # <class \'list\'>\nprint(len(fruits))   # 3 items',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Create a List</h2>\n<p>Use square brackets to create a list:</p>`
                        },
                        {
                            title: 'Allow Duplicates',
                            code: 'fruits = ["apple", "banana", "cherry", "apple", "cherry"]\nprint(fruits)  # both apples and cherries are kept',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Duplicates Allowed</h2>\n<p>Because lists are indexed, they can have items with the same value:</p>`
                        },
                        {
                            title: 'List Data Types',
                            code: 'list1 = ["apple", "banana", "cherry"]    # Strings\nlist2 = [1, 5, 7, 9, 3]                  # Integers\nlist3 = [True, False, False]             # Booleans\n\n# A list can contain different data types:\nlist4 = ["abc", 34, True, 40, "male"]\nprint(list4)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Any Data Type</h2>\n<p>List items can be of any data type, and a single list can contain different types:</p>`
                        }
                    ],
                    exercise: {
                        question: 'Which brackets are used to create a Python list?',
                        options: ['( )', '{ }', '< >', '[ ]'],
                        answer: 3
                    }
                },
                {
                    id: 'lists-access', title: 'Access List Items',
                    content: `<p>List items are indexed, which means you can access them by referring to their index number.</p>
<p><strong>Note:</strong> The first item has index <code>0</code>, not <code>1</code>!</p>`,
                    examples: [
                        {
                            title: 'Access Items',
                            code: 'fruits = ["apple", "banana", "cherry", "orange", "kiwi"]\nprint(fruits[0])  # apple\nprint(fruits[1])  # banana',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Access Items</h2>`
                        },
                        {
                            title: 'Negative Indexing',
                            code: 'fruits = ["apple", "banana", "cherry", "orange", "kiwi"]\nprint(fruits[-1])  # kiwi (last item)\nprint(fruits[-2])  # orange (second to last)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Negative Indexing</h2>\n<p><code>-1</code> refers to the last item, <code>-2</code> refers to the second last item etc.</p>`
                        },
                        {
                            title: 'Range of Indexes (Slicing)',
                            code: 'fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]\n\nprint(fruits[2:5])   # [\'cherry\', \'orange\', \'kiwi\']\nprint(fruits[:4])    # Starts from beginning: [\'apple\', \'banana\', \'cherry\', \'orange\']\nprint(fruits[4:])    # Goes to the end: [\'kiwi\', \'melon\', \'mango\']\nprint(fruits[-4:-1]) # Negative slice: [\'orange\', \'kiwi\', \'melon\']',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Range of Indexes</h2>\n<p>You can specify a range of indexes. The return value will be a <strong>new list</strong>.</p>`
                        },
                        {
                            title: 'Check if Item Exists',
                            code: 'fruits = ["apple", "banana", "cherry"]\nif "apple" in fruits:\n    print("Yes, apple is in the fruits list")\nelse:\n    print("No, not found")',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Check If Exists</h2>\n<p>Use the <code>in</code> keyword to check if an item exists:</p>`
                        }
                    ],
                    exercise: {
                        question: 'What is the index of the FIRST item in a list?',
                        options: ['1', '0', '-1', 'first'],
                        answer: 1
                    }
                },
                {
                    id: 'lists-change', title: 'Change List Items',
                    content: `<p>To change the value of a specific item, refer to the index number.</p>`,
                    examples: [
                        {
                            title: 'Change Item Value',
                            code: 'fruits = ["apple", "banana", "cherry"]\nfruits[1] = "blackcurrant"\nprint(fruits)  # [\'apple\', \'blackcurrant\', \'cherry\']',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Change One Item</h2>`
                        },
                        {
                            title: 'Change a Range of Item Values',
                            code: 'fruits = ["apple", "banana", "cherry", "orange", "kiwi", "mango"]\nfruits[1:3] = ["blackcurrant", "watermelon"]\nprint(fruits)  # [\'apple\', \'blackcurrant\', \'watermelon\', \'orange\', \'kiwi\', \'mango\']',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Change Multiple Items</h2>\n<p>Specify a range and assign a new list of values.</p>`
                        },
                        {
                            title: 'Insert Items',
                            code: 'fruits = ["apple", "banana", "cherry"]\nfruits.insert(2, "watermelon")\nprint(fruits)  # [\'apple\', \'banana\', \'watermelon\', \'cherry\']',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Insert Items</h2>\n<p>To insert a new item without replacing any existing values, use the <code>insert()</code> method.</p>`
                        }
                    ],
                    exercise: {
                        question: 'How do you change the first item of a list called mylist to "kiwi"?',
                        options: ['mylist[1] = "kiwi"', 'mylist[0] = "kiwi"', 'mylist.first("kiwi")'],
                        answer: 1
                    }
                },
                {
                    id: 'lists-add', title: 'Add List Items',
                    content: `<p>Python has several methods to add new items to a list.</p>`,
                    examples: [
                        {
                            title: 'Append Items',
                            code: 'fruits = ["apple", "banana", "cherry"]\nfruits.append("orange")\nprint(fruits)  # [\'apple\', \'banana\', \'cherry\', \'orange\']',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Append</h2>\n<p>To add an item to the <strong>end</strong> of the list, use the <code>append()</code> method:</p>`
                        },
                        {
                            title: 'Insert Items',
                            code: 'fruits = ["apple", "banana", "cherry"]\nfruits.insert(1, "orange")\nprint(fruits)  # [\'apple\', \'orange\', \'banana\', \'cherry\']',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Insert</h2>\n<p>To insert an item at a <strong>specified index</strong>, use <code>insert()</code>:</p>`
                        },
                        {
                            title: 'Extend List',
                            code: 'fruits = ["apple", "banana", "cherry"]\ntropical = ["mango", "pineapple", "papaya"]\nfruits.extend(tropical)\nprint(fruits)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Extend</h2>\n<p>To append elements from <strong>another list</strong> to the current list, use <code>extend()</code>:</p>`
                        },
                        {
                            title: 'Add Any Iterable',
                            code: 'fruits = ["apple", "banana"]\nmytuple = ("kiwi", "orange")  # A tuple\nfruits.extend(mytuple)        # Works with tuples, sets, dictionaries!\nprint(fruits)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Add Any Iterable</h2>\n<p>The <code>extend()</code> method doesn\'t have to append lists, you can add any iterable object.</p>`
                        }
                    ],
                    exercise: {
                        question: 'Which method adds an item to the END of a list?',
                        options: ['insert()', 'add()', 'append()', 'push()'],
                        answer: 2
                    }
                },
                {
                    id: 'lists-remove', title: 'Remove List Items',
                    content: `<p>There are multiple ways to remove items from a list.</p>`,
                    examples: [
                        {
                            title: 'Remove Specified Item',
                            code: 'fruits = ["apple", "banana", "cherry", "banana"]\nfruits.remove("banana")\nprint(fruits)  # Removes the FIRST occurrence of "banana"',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The remove() Method</h2>\n<p><code>remove()</code> removes the specified item:</p>`
                        },
                        {
                            title: 'Remove Specified Index',
                            code: 'fruits = ["apple", "banana", "cherry"]\nfruits.pop(1)\nprint(fruits)  # [\'apple\', \'cherry\']\n\n# Without index, pop() removes the last item:\nfruits.pop()\nprint(fruits)  # [\'apple\']',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The pop() Method</h2>\n<p><code>pop()</code> removes the specified index. If you don\'t specify an index, it removes the last item.</p>`
                        },
                        {
                            title: 'The del Keyword',
                            code: 'fruits = ["apple", "banana", "cherry"]\ndel fruits[0]\nprint(fruits)  # [\'banana\', \'cherry\']\n\n# You can also delete the entire list\ndel fruits',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The del Keyword</h2>\n<p><code>del</code> can remove an index or delete the entire list completely:</p>`
                        },
                        {
                            title: 'Clear the List',
                            code: 'fruits = ["apple", "banana", "cherry"]\nfruits.clear()\nprint(fruits)  # [] — the list still exists, but has no content',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The clear() Method</h2>\n<p><code>clear()</code> empties the list:</p>`
                        }
                    ],
                    exercise: {
                        question: 'Which method removes the LAST item from a list if no index is given?',
                        options: ['remove()', 'pop()', 'delete()', 'clear()'],
                        answer: 1
                    }
                },
                {
                    id: 'lists-loop', title: 'Loop Lists',
                    content: `<p>You can loop through the list items by using a <code>for</code> loop.</p>`,
                    examples: [
                        {
                            title: 'Loop Through Items',
                            code: 'fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Loop Through Items</h2>`
                        },
                        {
                            title: 'Loop Through Index Numbers',
                            code: 'fruits = ["apple", "banana", "cherry"]\nfor i in range(len(fruits)):\n    print(f"Index {i}: {fruits[i]}")',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Loop Through Indexes</h2>\n<p>Use <code>range()</code> and <code>len()</code> to create a suitable iterable.</p>`
                        },
                        {
                            title: 'Using a While Loop',
                            code: 'fruits = ["apple", "banana", "cherry"]\ni = 0\nwhile i < len(fruits):\n    print(fruits[i])\n    i += 1',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Using While Loop</h2>\n<p>You can loop using a <code>while</code> loop and an index number.</p>`
                        }
                    ],
                    exercise: {
                        question: 'What is the most common way to loop through a list in Python?',
                        options: ['for i=0 to len(list)', 'for item in list:', 'foreach item in list:', 'while(list.next())'],
                        answer: 1
                    }
                },
                {
                    id: 'lists-comprehension', title: 'List Comprehension',
                    content: `<p>List comprehension offers a shorter syntax when you want to create a new list based on the values of an existing list.</p>`,
                    examples: [
                        {
                            title: 'Without List Comprehension',
                            code: 'fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\nnewlist = []\n\nfor fruit in fruits:\n    if "a" in fruit:\n        newlist.append(fruit)\n\nprint(newlist)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The Long Way</h2>\n<p>You want a new list with only fruits containing "a":</p>`
                        },
                        {
                            title: 'With List Comprehension',
                            code: 'fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\n\n# One line of code!\nnewlist = [fruit for fruit in fruits if "a" in fruit]\n\nprint(newlist)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The Short Way</h2>\n<p>You can do it in one line with list comprehension:</p>`
                        },
                        {
                            title: 'Syntax: [expression for item in iterable if condition == True]',
                            code: '# Condition is optional\nall_upper = [f.upper() for f in fruits]\n\n# Range iterable\nnumbers = [x for x in range(10)]\n\n# With condition\nevens = [x for x in range(10) if x % 2 == 0]\n\nprint(all_upper)\nprint(numbers)\nprint(evens)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Syntax</h2>`
                        }
                    ],
                    exercise: {
                        question: 'What does [x for x in range(5)] create?',
                        options: ['[1, 2, 3, 4, 5]', '[0, 1, 2, 3, 4]', '5x', 'Error'],
                        answer: 1
                    }
                },
                {
                    id: 'lists-sort', title: 'Sort Lists',
                    content: `<p>List objects have a <code>sort()</code> method that will sort the list alphanumerically, ascending, by default.</p>`,
                    examples: [
                        {
                            title: 'Sort Alphanumerically',
                            code: 'fruits = ["orange", "mango", "kiwi", "pineapple", "banana"]\nfruits.sort()\nprint(fruits)\n\nnumbers = [100, 50, 65, 82, 23]\nnumbers.sort()\nprint(numbers)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Sort Ascending</h2>`
                        },
                        {
                            title: 'Sort Descending',
                            code: 'fruits = ["orange", "mango", "kiwi", "pineapple", "banana"]\nfruits.sort(reverse = True)\nprint(fruits)\n\nnumbers = [100, 50, 65, 82, 23]\nnumbers.sort(reverse = True)\nprint(numbers)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Sort Descending</h2>\n<p>Use the keyword argument <code>reverse = True</code>:</p>`
                        },
                        {
                            title: 'Case Insensitive Sort',
                            code: 'fruits = ["banana", "Orange", "Kiwi", "cherry"]\n\n# By default, capital letters are sorted before lower case!\nfruits.sort()\nprint("Default sort:", fruits)\n\n# Case-insensitive sort\nfruits.sort(key = str.lower)\nprint("Case insensitive:", fruits)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Case Insensitive Sort</h2>\n<p>By default, capital letters sort before lowercase. To ignore case, use <code>key = str.lower</code></p>`
                        },
                        {
                            title: 'Reverse Order',
                            code: 'fruits = ["apple", "banana", "cherry"]\nfruits.reverse()\nprint(fruits)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Reverse Order</h2>\n<p>Use the <code>reverse()</code> method reverses the current sorting order of the elements.</p>`
                        }
                    ],
                    exercise: {
                        question: 'Which argument makes a sort descend?',
                        options: ['descend=True', 'reverse=True', 'order="down"'],
                        answer: 1
                    }
                },
                {
                    id: 'lists-copy', title: 'Copy Lists',
                    content: `<p>You cannot copy a list simply by typing <code>list2 = list1</code>, because: <code>list2</code> will only be a <em>reference</em> to <code>list1</code>, and changes made in <code>list1</code> will automatically also be made in <code>list2</code>.</p>`,
                    examples: [
                        {
                            title: 'The Reference Problem (Why we copy)',
                            code: 'list1 = ["apple", "banana"]\nlist2 = list1   # This is just a reference, NOT a copy!\n\nlist1.append("cherry")\nprint(list2)    # list2 changed too! [\'apple\', \'banana\', \'cherry\']',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The Reference Problem</h2>`
                        },
                        {
                            title: 'Alternative 1: Use the copy() method',
                            code: 'thislist = ["apple", "banana", "cherry"]\nmylist = thislist.copy()\n\nthislist.append("orange")\nprint("Original:", thislist)\nprint("Copy:", mylist)  # The copy did NOT change!',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Proper Copy with copy()</h2>`
                        },
                        {
                            title: 'Alternative 2: Use the list() function',
                            code: 'thislist = ["apple", "banana", "cherry"]\nmylist = list(thislist)\nprint(mylist)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Proper Copy with list()</h2>`
                        }
                    ],
                    exercise: {
                        question: 'If L1 = [1, 2] and L2 = L1, what happens to L2 if we L1.append(3)?',
                        options: ['L2 stays [1, 2]', 'L2 becomes [1, 2, 3]', 'Error'],
                        answer: 1
                    }
                },
                {
                    id: 'lists-join', title: 'Join Lists',
                    content: `<p>There are several ways to join, or concatenate, two or more lists in Python.</p>`,
                    examples: [
                        {
                            title: 'Using the + Operator',
                            code: 'list1 = ["a", "b", "c"]\nlist2 = [1, 2, 3]\n\nlist3 = list1 + list2\nprint(list3)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Using + Operator</h2>\n<p>One of the easiest ways is using the <code>+</code> operator.</p>`
                        },
                        {
                            title: 'Using append() in a loop',
                            code: 'list1 = ["a", "b", "c"]\nlist2 = [1, 2, 3]\n\nfor x in list2:\n    list1.append(x)\n\nprint(list1)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Using append()</h2>\n<p>You can append items one by one.</p>`
                        },
                        {
                            title: 'Using the extend() method',
                            code: 'list1 = ["a", "b", "c"]\nlist2 = [1, 2, 3]\n\nlist1.extend(list2)\nprint(list1)',
                            preContent: `<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Using extend()</h2>\n<p>The <code>extend()</code> method appends elements from one list to another.</p>`
                        }
                    ],
                    exercise: {
                        question: 'Which method adds all items from List 2 to List 1?',
                        options: ['list1.append(list2)', 'list1.extend(list2)', 'list1.push(list2)'],
                        answer: 1
                    }
                },
                {
                    id: 'lists-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create an empty list called <code>my_list</code>',
                        'Append the numbers <code>10</code>, <code>20</code>, and <code>30</code>',
                        'Insert <code>15</code> at index <code>1</code>',
                        'Remove <code>20</code> from the list',
                        'Print the final list and its length using an f-string'
                    ],
                    starterCode: '# Create empty list\n\n# Append elements\n\n# Insert at index 1\n\n# Remove an element\n\n# Print list and length\n',
                    solution: 'my_list = []\nmy_list.append(10)\nmy_list.append(20)\nmy_list.append(30)\nmy_list.insert(1, 15)\nmy_list.remove(20)\nprint(f"List: {my_list}, Length: {len(my_list)}")',
                    content: `<p>Test your knowledge of Python Lists!</p>`
                }
            ]
        },

        /* ────── 14. Python Tuples ────── */
        {
            id: 'tuples', title: 'Python Tuples',
            sections: [
                {
                    id: 'tuples-intro', title: 'Python Tuples',
                    content: `<p>Tuples are used to store multiple items in a single variable.</p>
<p>A tuple is a collection which is ordered and <strong>unchangeable</strong>.</p>
<p>Tuples are written with round brackets.</p>`,
                    examples: [
                        { title: 'Create a Tuple', code: 'mytuple = ("apple", "banana", "cherry")\nprint(mytuple)' },
                        { title: 'Allow Duplicates', code: 'thistuple = ("apple", "banana", "cherry", "apple", "cherry")\nprint(thistuple)' },
                        { title: 'Tuple Length', code: 'thistuple = ("apple", "banana", "cherry")\nprint(len(thistuple))' },
                        { title: 'Create Tuple With One Item', code: '# To create a tuple with only one item, you have to add a comma after the item, otherwise Python will not recognize it as a tuple.\nthistuple = ("apple",)\nprint(type(thistuple))\n\n#NOT a tuple\nthistuple = ("apple")\nprint(type(thistuple))' }
                    ],
                    exercise: { question: 'Which brackets are used to create a tuple?', options: ['[]', '{}', '()', '<>'], answer: 2 }
                },
                {
                    id: 'tuples-access', title: 'Access Tuples',
                    content: `<p>You can access tuple items by referring to the index number, inside square brackets.</p>`,
                    examples: [
                        { title: 'Access Item', code: 'thistuple = ("apple", "banana", "cherry")\nprint(thistuple[1]) # banana' },
                        { title: 'Negative Indexing', code: 'thistuple = ("apple", "banana", "cherry")\nprint(thistuple[-1]) # cherry' },
                        { title: 'Range of Indexes', code: 'thistuple = ("apple", "banana", "cherry", "orange", "kiwi", "melon", "mango")\nprint(thistuple[2:5])' }
                    ],
                    exercise: { question: 'What is printed from: thistuple = ("apple", "banana", "cherry")\\nprint(thistuple[-1])', options: ['apple', 'banana', 'cherry'], answer: 2 }
                },
                {
                    id: 'tuples-update', title: 'Update Tuples',
                    content: `<p>Tuples are unchangeable, meaning that you cannot change, add, or remove items once the tuple is created.</p>
<p>But there are some workarounds. You can convert the tuple into a list, change the list, and convert the list back into a tuple.</p>`,
                    examples: [
                        { title: 'Change Tuple Values', code: 'x = ("apple", "banana", "cherry")\ny = list(x)\ny[1] = "kiwi"\nx = tuple(y)\n\nprint(x)' },
                        { title: 'Add Items', code: 'thistuple = ("apple", "banana", "cherry")\ny = list(thistuple)\ny.append("orange")\nthistuple = tuple(y)' }
                    ],
                    exercise: { question: 'Tuples are mutable (changeable).', options: ['True', 'False'], answer: 1 }
                },
                {
                    id: 'tuples-unpack', title: 'Unpack Tuples',
                    content: `<p>When we create a tuple, we normally assign values to it. This is called "packing" a tuple.</p>
<p>But, in Python, we are also allowed to extract the values back into variables. This is called "unpacking".</p>`,
                    examples: [
                        { title: 'Unpacking a Tuple', code: 'fruits = ("apple", "banana", "cherry")\n\n(green, yellow, red) = fruits\n\nprint(green)\nprint(yellow)\nprint(red)' },
                        { title: 'Using Asterisk *', code: 'fruits = ("apple", "banana", "cherry", "strawberry", "raspberry")\n\n(green, yellow, *red) = fruits\n\nprint(green)\nprint(yellow)\nprint(red)' }
                    ],
                    exercise: { question: 'What character is used to gather remaining values as a list when unpacking a tuple?', options: ['&', '*', '#', '$'], answer: 1 }
                },
                {
                    id: 'tuples-loop', title: 'Loop Tuples',
                    content: `<p>You can loop through the tuple items by using a <code>for</code> loop.</p>`,
                    examples: [
                        { title: 'Iterate Through the Items', code: 'thistuple = ("apple", "banana", "cherry")\nfor x in thistuple:\n  print(x)' },
                        { title: 'Loop Through the Index Numbers', code: 'thistuple = ("apple", "banana", "cherry")\nfor i in range(len(thistuple)):\n  print(thistuple[i])' },
                        { title: 'Using a While Loop', code: 'thistuple = ("apple", "banana", "cherry")\ni = 0\nwhile i < len(thistuple):\n  print(thistuple[i])\n  i = i + 1' }
                    ],
                    exercise: { question: 'Which loop can be used to iterate over elements of a tuple?', options: ['for loop', 'while loop', 'Both'], answer: 2 }
                },
                {
                    id: 'tuples-join', title: 'Join Tuples',
                    content: `<p>To join two or more tuples you can use the <code>+</code> operator.</p>`,
                    examples: [
                        { title: 'Join Two Tuples', code: 'tuple1 = ("a", "b" , "c")\ntuple2 = (1, 2, 3)\n\ntuple3 = tuple1 + tuple2\nprint(tuple3)' },
                        { title: 'Multiply Tuples', code: 'fruits = ("apple", "banana", "cherry")\nmytuple = fruits * 2\n\nprint(mytuple)' }
                    ],
                    exercise: { question: 'What operator is used to join two tuples?', options: ['+', '*', '-', '&'], answer: 0 }
                },
                {
                    id: 'tuples-methods', title: 'Tuple Methods',
                    content: `<p>Python has two built-in methods that you can use on tuples.</p>`,
                    examples: [
                        { title: 'count()', code: '# Returns the number of times a specified value occurs in a tuple\nthistuple = (1, 3, 7, 8, 7, 5, 4, 6, 8, 5)\nx = thistuple.count(5)\nprint(x)' },
                        { title: 'index()', code: '# Searches the tuple for a specified value and returns the position of where it was found\nthistuple = (1, 3, 7, 8, 7, 5, 4, 6, 8, 5)\nx = thistuple.index(8)\nprint(x)' }
                    ],
                    exercise: { question: 'Which method returns the number of times a value appears in a tuple?', options: ['index()', 'find()', 'count()'], answer: 2 }
                },
                {
                    id: 'tuples-exercises', title: 'Tuple Exercises',
                    content: `<p>Let's review everything you've learned about tuples.</p>`,
                    examples: [
                        { title: 'Review Example', code: 'colors = ("red", "green", "blue")\nprint(len(colors)) # 3\n\nnew_colors = colors + ("yellow",)\nprint(new_colors)' }
                    ],
                    exercise: { question: 'Use the correct syntax to print the number of items in the fruits tuple: fruits = ("apple", "banana", "cherry")', options: ['print(size(fruits))', 'print(len(fruits))', 'print(count(fruits))'], answer: 1 }
                },
                {
                    id: 'tuples-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a tuple named <code>cities</code> with the values "New York", "London", and "Tokyo".',
                        'Print the second city in the tuple ("London").',
                        'Convert the tuple into a list named <code>cities_list</code>.',
                        'Add "Paris" to <code>cities_list</code>.',
                        'Convert <code>cities_list</code> back into a tuple named <code>cities</code> and print it.'
                    ],
                    starterCode: '# Create tuple\n\n# Print second item\n\n# Convert to list and add item\n\n# Convert back and print\n',
                    solution: 'cities = ("New York", "London", "Tokyo")\nprint(cities[1])\ncities_list = list(cities)\ncities_list.append("Paris")\ncities = tuple(cities_list)\nprint(cities)',
                    content: `<p>Practice creating, accessing, and modifying tuples (using lists)!</p>`
                }
            ]
        },

        /* ────── 15. Python Sets ────── */
        {
            id: 'sets', title: 'Python Sets',
            sections: [
                {
                    id: 'sets-intro', title: 'Python Sets',
                    content: `<p>Sets are used to store multiple items in a single variable.</p>
<p>A set is a collection which is <strong>unordered</strong>, <strong>unchangeable*</strong>, and <strong>unindexed</strong>.</p>
<p><em>* Note: Set items are unchangeable, but you can remove items and add new items.</em></p>
<p>Sets are written with curly brackets.</p>`,
                    examples: [
                        { title: 'Create a Set', code: 'thisset = {"apple", "banana", "cherry"}\nprint(thisset)\n\n# Note: Sets are unordered, so you cannot be sure in which order the items will appear.' },
                        { title: 'Duplicates Not Allowed', code: '# Duplicate values will be ignored:\nthisset = {"apple", "banana", "cherry", "apple"}\n\nprint(thisset)' },
                        { title: 'True and 1', code: '# The values True and 1 are considered the same value in sets, and are treated as duplicates:\nthisset = {"apple", "banana", "cherry", True, 1, 2}\n\nprint(thisset)' }
                    ],
                    exercise: { question: 'Sets are ordered and allow duplicate values.', options: ['True', 'False'], answer: 1 }
                },
                {
                    id: 'sets-access', title: 'Access Set Items',
                    content: `<p>You cannot access items in a set by referring to an index or a key.</p>
<p>But you can loop through the set items using a <code>for</code> loop, or ask if a specified value is present in a set, by using the <code>in</code> keyword.</p>`,
                    examples: [
                        { title: 'Loop Through Set', code: 'thisset = {"apple", "banana", "cherry"}\n\nfor x in thisset:\n  print(x)' },
                        { title: 'Check if Item Exists', code: 'thisset = {"apple", "banana", "cherry"}\n\nprint("banana" in thisset)' }
                    ],
                    exercise: { question: 'Which keyword is used to check if an item exists in a set?', options: ['has', 'in', 'exists'], answer: 1 }
                },
                {
                    id: 'sets-add', title: 'Add Set Items',
                    content: `<p>Once a set is created, you cannot change its items, but you can add new items.</p>
<p>To add one item to a set use the <code>add()</code> method.</p>
<p>To add items from another set into the current set, use the <code>update()</code> method.</p>`,
                    examples: [
                        { title: 'Add an Item', code: 'thisset = {"apple", "banana", "cherry"}\n\nthisset.add("orange")\n\nprint(thisset)' },
                        { title: 'Add Sets', code: 'thisset = {"apple", "banana", "cherry"}\ntropical = {"pineapple", "mango", "papaya"}\n\nthisset.update(tropical)\n\nprint(thisset)' },
                        { title: 'Add Any Iterable', code: '# The object in the update() method does not have to be a set, it can be any iterable object (tuples, lists, dictionaries etc.).\nthisset = {"apple", "banana", "cherry"}\nmylist = ["kiwi", "orange"]\n\nthisset.update(mylist)\n\nprint(thisset)' }
                    ],
                    exercise: { question: 'Which method is used to add multiple items from a list to a set?', options: ['add()', 'append()', 'update()'], answer: 2 }
                },
                {
                    id: 'sets-remove', title: 'Remove Set Items',
                    content: `<p>To remove an item in a set, use the <code>remove()</code>, or the <code>discard()</code> method.</p>`,
                    examples: [
                        { title: 'remove() Method', code: 'thisset = {"apple", "banana", "cherry"}\n\nthisset.remove("banana")\n\nprint(thisset)\n# Note: If the item to remove does not exist, remove() will raise an error.' },
                        { title: 'discard() Method', code: 'thisset = {"apple", "banana", "cherry"}\n\nthisset.discard("banana")\n\nprint(thisset)\n# Note: If the item to remove does not exist, discard() will NOT raise an error.' },
                        { title: 'pop() Method', code: '# You can also use the pop() method to remove an item, but this method will remove a random item, so you cannot be sure what item that gets removed.\nthisset = {"apple", "banana", "cherry"}\n\nx = thisset.pop()\n\nprint(x)\nprint(thisset)' },
                        { title: 'clear() and del', code: 'thisset = {"apple", "banana", "cherry"}\nthisset.clear() # Empties the set\nprint(thisset)\n\nthisset2 = {"apple", "banana", "cherry"}\ndel thisset2 # Deletes the set completely\n# print(thisset2) # This will raise an error because the set no longer exists' }
                    ],
                    exercise: { question: 'Which method removes an item but does NOT raise an error if the item does not exist?', options: ['remove()', 'discard()', 'delete()'], answer: 1 }
                },
                {
                    id: 'sets-loop', title: 'Loop Sets',
                    content: `<p>You can loop through the set items by using a <code>for</code> loop.</p>`,
                    examples: [
                        { title: 'Loop Through Items', code: 'thisset = {"apple", "banana", "cherry"}\n\nfor x in thisset:\n  print(x)' }
                    ],
                    exercise: { question: 'Can you use a while loop with an index to loop through a set?', options: ['Yes', 'No (Sets are unindexed)'], answer: 1 }
                },
                {
                    id: 'sets-join', title: 'Join Sets',
                    content: `<p>There are several ways to join two or more sets in Python.</p>
<p>You can use the <code>union()</code> method that returns a new set containing all items from both sets, or the <code>update()</code> method that inserts all the items from one set into another.</p>`,
                    examples: [
                        { title: 'union()', code: 'set1 = {"a", "b" , "c"}\nset2 = {1, 2, 3}\n\nset3 = set1.union(set2)\nprint(set3)' },
                        { title: 'update()', code: 'set1 = {"a", "b" , "c"}\nset2 = {1, 2, 3}\n\nset1.update(set2)\nprint(set1)' },
                        { title: 'Keep ONLY the Duplicates', code: '# The intersection_update() method will keep only the items that are present in both sets.\nx = {"apple", "banana", "cherry"}\ny = {"google", "microsoft", "apple"}\n\nx.intersection_update(y)\n\nprint(x)' },
                        { title: 'Keep All, But NOT the Duplicates', code: '# The symmetric_difference_update() method will keep only the elements that are NOT present in both sets.\nx = {"apple", "banana", "cherry"}\ny = {"google", "microsoft", "apple"}\n\nx.symmetric_difference_update(y)\n\nprint(x)' }
                    ],
                    exercise: { question: 'Which method returns a new set with all items from both sets?', options: ['update()', 'union()', 'join()'], answer: 1 }
                },
                {
                    id: 'sets-frozenset', title: 'Frozenset',
                    content: `<p>The <code>frozenset()</code> function returns an unchangeable frozenset object (it is like a set, but immutable).</p>
<p>Once a frozenset is created, you cannot add or remove items from it.</p>`,
                    examples: [
                        { title: 'Create a Frozenset', code: 'mylist = ["apple", "banana", "cherry"]\n\n# Convert list to frozenset\nx = frozenset(mylist)\n\n# Try to change it (this will cause an error!)\n# x.add("orange") \n\nprint(x)' }
                    ],
                    exercise: { question: 'You can use the add() method on a frozenset.', options: ['True', 'False'], answer: 1 }
                },
                {
                    id: 'sets-methods', title: 'Set Methods',
                    content: `<p>Python has a set of built-in methods that you can use on sets.</p>
<p>Some of the remaining methods include methods for comparing sets.</p>`,
                    examples: [
                        { title: 'issubset()', code: '# Returns whether another set contains this set or not\nx = {"a", "b", "c"}\ny = {"f", "e", "d", "c", "b", "a"}\n\nz = x.issubset(y)\nprint(z) # True, because all items in x exist in y' },
                        { title: 'issuperset()', code: '# Returns whether this set contains another set or not\nx = {"f", "e", "d", "c", "b", "a"}\ny = {"a", "b", "c"}\n\nz = x.issuperset(y)\nprint(z) # True' },
                        { title: 'isdisjoint()', code: '# Returns whether two sets have a intersection or not\nx = {"apple", "banana", "cherry"}\ny = {"google", "microsoft", "facebook"}\n\nz = x.isdisjoint(y)\nprint(z) # True, because no items are present in both' }
                    ],
                    exercise: { question: 'What does x.isdisjoint(y) return if x and y share common items?', options: ['True', 'False', 'None'], answer: 1 }
                },
                {
                    id: 'sets-exercises', title: 'Set Exercises',
                    content: `<p>Let's review everything you've learned about sets.</p>`,
                    examples: [
                        { title: 'Review Example', code: 'fruits = {"apple", "banana", "cherry"}\nfruits.add("orange")\nprint(fruits)\n\nfruits.discard("banana")\nprint(fruits)' }
                    ],
                    exercise: { question: 'What is the correct way to add "orange" to the fruits set?', options: ['fruits.append("orange")', 'fruits.insert("orange")', 'fruits.add("orange")'], answer: 2 }
                },
                {
                    id: 'sets-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a set named <code>colors</code> with the values "red", "green", and "blue".',
                        'Add "yellow" to the set.',
                        'Try to add "red" to the set again.',
                        'Remove "green" from the set using <code>discard()</code>.',
                        'Print the length of the set.'
                    ],
                    starterCode: '# Create set\n\n# Add "yellow"\n\n# Try adding "red" again\n\n# Remove "green"\n\n# Print length\n',
                    solution: 'colors = {"red", "green", "blue"}\ncolors.add("yellow")\ncolors.add("red")\ncolors.discard("green")\nprint(len(colors))',
                    content: `<p>Practice creating and modifying Python sets!</p>`
                }
            ]
        },

        /* ────── 16. Python Dictionaries ────── */
        {
            id: 'dictionaries', title: 'Python Dictionaries',
            sections: [
                {
                    id: 'dict-basics', title: 'Python Dictionaries',
                    content: `<p>Dictionaries are used to store data values in <strong>key:value</strong> pairs.</p>
<p>A dictionary is a collection which is ordered*, changeable and do not allow duplicates.</p>
<p><em>* As of Python version 3.7, dictionaries are ordered. In Python 3.6 and earlier, dictionaries are unordered.</em></p>
<p>Dictionaries are written with curly brackets, and have keys and values:</p>`,
                    examples: [
                        { title: 'Create a Dictionary', code: 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nprint(thisdict)' },
                        { title: 'Dictionary Items', code: '# Dictionary items are presented in key:value pairs, and can be referred to by using the key name.\nthisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nprint(thisdict["brand"])' },
                        { title: 'Duplicates Not Allowed', code: '# Dictionaries cannot have two items with the same key:\nthisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964,\n  "year": 2020 # This will overwrite the previous year\n}\nprint(thisdict)' }
                    ],
                    exercise: { question: 'Dictionaries cannot have two items with the same key.', options: ['True', 'False'], answer: 0 }
                },
                {
                    id: 'dict-access', title: 'Access Items',
                    content: `<p>You can access the items of a dictionary by referring to its key name, inside square brackets.</p>
<p>There is also a method called <code>get()</code> that will give you the same result.</p>`,
                    examples: [
                        { title: 'Accessing an Item', code: 'thisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\nx = thisdict["model"]\nprint(x)' },
                        { title: 'Using get()', code: 'thisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\nx = thisdict.get("model")\nprint(x)' },
                        { title: 'Get Keys', code: '# The keys() method will return a list of all the keys in the dictionary.\nthisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\nx = thisdict.keys()\nprint(x)' },
                        { title: 'Get Values', code: '# The values() method will return a list of all the values in the dictionary.\nthisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\nx = thisdict.values()\nprint(x)' },
                        { title: 'Get Items', code: '# The items() method will return each item in a dictionary, as tuples in a list.\nthisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\nx = thisdict.items()\nprint(x)' }
                    ],
                    exercise: { question: 'Which method returns a list of all the values in the dictionary?', options: ['getValues()', 'values()', 'keys()'], answer: 1 }
                },
                {
                    id: 'dict-change', title: 'Change Items',
                    content: `<p>You can change the value of a specific item by referring to its key name.</p>
<p>The <code>update()</code> method will update the dictionary with the items from the given argument.</p>`,
                    examples: [
                        { title: 'Change Values', code: 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nthisdict["year"] = 2018\n\nprint(thisdict)' },
                        { title: 'Update Dictionary', code: 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\n# Update the year\nthisdict.update({"year": 2020})\n\nprint(thisdict)' }
                    ],
                    exercise: { question: 'Which method updates the dictionary with new key-value pairs?', options: ['insert()', 'add()', 'update()'], answer: 2 }
                },
                {
                    id: 'dict-add', title: 'Add Items',
                    content: `<p>Adding an item to the dictionary is done by using a new index key and assigning a value to it.</p>`,
                    examples: [
                        { title: 'Adding Items', code: 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nthisdict["color"] = "red"\nprint(thisdict)' },
                        { title: 'Update Dictionary', code: '# You can also use the update() method to add new items:\nthisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nthisdict.update({"color": "red"})\nprint(thisdict)' }
                    ],
                    exercise: { question: 'How do you add a new color "blue" to carDict?', options: ['carDict.add("color", "blue")', 'carDict["color"] = "blue"', 'carDict.append({"color": "blue"})'], answer: 1 }
                },
                {
                    id: 'dict-remove', title: 'Remove Items',
                    content: `<p>There are several methods to remove items from a dictionary.</p>`,
                    examples: [
                        { title: 'The pop() Method', code: '# Removes the item with the specified key name\nthisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\nthisdict.pop("model")\nprint(thisdict)' },
                        { title: 'The popitem() Method', code: '# Removes the last inserted item\nthisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\nthisdict.popitem()\nprint(thisdict)' },
                        { title: 'The del Keyword', code: '# Removes the item with the specified key name\nthisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\ndel thisdict["model"]\nprint(thisdict)\n\n# The del keyword can also delete the dictionary completely:\n# del thisdict' },
                        { title: 'The clear() Method', code: '# Empties the dictionary\nthisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\nthisdict.clear()\nprint(thisdict)' }
                    ],
                    exercise: { question: 'Which method removes the item with the specified key?', options: ['delete()', 'remove()', 'pop()'], answer: 2 }
                },
                {
                    id: 'dict-loop', title: 'Loop Dictionaries',
                    content: `<p>You can loop through a dictionary by using a <code>for</code> loop.</p>
<p>When looping through a dictionary, the return value are the <strong>keys</strong> of the dictionary, but there are methods to return the <strong>values</strong> as well.</p>`,
                    examples: [
                        { title: 'Loop Through Keys', code: 'thisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\n\n# Loop through keys:\nfor x in thisdict:\n  print(x)' },
                        { title: 'Loop Through Values (Method 1)', code: 'thisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\n\n# Print all values, one by one:\nfor x in thisdict:\n  print(thisdict[x])' },
                        { title: 'Loop Through Values (Method 2)', code: 'thisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\n\n# You can also use the values() method to return values of a dictionary:\nfor x in thisdict.values():\n  print(x)' },
                        { title: 'Loop Through Keys and Values', code: 'thisdict = {"brand": "Ford", "model": "Mustang", "year": 1964}\n\n# Loop through both keys and values, by using the items() method:\nfor x, y in thisdict.items():\n  print(x, y)' }
                    ],
                    exercise: { question: 'What method is used to loop through BOTH keys and values simultaneously?', options: ['keys()', 'items()', 'values()'], answer: 1 }
                },
                {
                    id: 'dict-copy', title: 'Copy Dictionaries',
                    content: `<p>You cannot copy a dictionary simply by typing <code>dict2 = dict1</code>, because: <code>dict2</code> will only be a <em>reference</em> to <code>dict1</code>, and changes made in <code>dict1</code> will automatically also be made in <code>dict2</code>.</p>
<p>There are ways to make a copy, one way is to use the built-in Dictionary method <code>copy()</code>.</p>`,
                    examples: [
                        { title: 'Make a Copy', code: 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nmydict = thisdict.copy()\nprint(mydict)' },
                        { title: 'Make a Copy with dict()', code: 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nmydict = dict(thisdict)\nprint(mydict)' }
                    ],
                    exercise: { question: 'Writing dict2 = dict1 creates a safe, independent copy of the dictionary.', options: ['True', 'False'], answer: 1 }
                },
                {
                    id: 'dict-nested', title: 'Nested Dictionaries',
                    content: `<p>A dictionary can contain dictionaries, this is called nested dictionaries.</p>`,
                    examples: [
                        { title: 'Create a Nested Dictionary', code: 'myfamily = {\n  "child1" : {\n    "name" : "Emil",\n    "year" : 2004\n  },\n  "child2" : {\n    "name" : "Tobias",\n    "year" : 2007\n  },\n  "child3" : {\n    "name" : "Linus",\n    "year" : 2011\n  }\n}\n\nprint(myfamily)' },
                        { title: 'Access Items in Nested Dictionaries', code: 'myfamily = {\n  "child1" : {\n    "name" : "Emil",\n    "year" : 2004\n  },\n  "child2" : {\n    "name" : "Tobias",\n    "year" : 2007\n  }\n}\n\n# To access items from a nested dictionary, you use the name of the dictionaries, starting with the outer dictionary:\nprint(myfamily["child2"]["name"])' }
                    ],
                    exercise: { question: 'Given a nested dictionary dict={"user":{"id":5}}, how do you access the id?', options: ['dict.user.id', 'dict["user" "id"]', 'dict["user"]["id"]'], answer: 2 }
                },
                {
                    id: 'dict-methods', title: 'Dictionary Methods',
                    content: `<p>Python has a set of built-in methods that you can use on dictionaries.</p>
<table style="width:100%;text-align:left;border-collapse:collapse;margin-top:20px;">
  <tr style="border-bottom: 2px solid #ddd; background-color: #f2f2f2;"><th>Method</th><th>Description</th></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>clear()</td><td>Removes all the elements from the dictionary</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>copy()</td><td>Returns a copy of the dictionary</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>fromkeys()</td><td>Returns a dictionary with the specified keys and value</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>get()</td><td>Returns the value of the specified key</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>items()</td><td>Returns a list containing a tuple for each key value pair</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>keys()</td><td>Returns a list containing the dictionary's keys</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>pop()</td><td>Removes the element with the specified key</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>popitem()</td><td>Removes the last inserted key-value pair</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>setdefault()</td><td>Returns the value of the specified key. If the key does not exist: insert the key, with the specified value</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>update()</td><td>Updates the dictionary with the specified key-value pairs</td></tr>
  <tr style="border-bottom: 1px solid #ddd;"><td>values()</td><td>Returns a list of all the values in the dictionary</td></tr>
</table>`,
                    examples: [
                        { title: 'Using fromkeys()', code: 'x = (\'key1\', \'key2\', \'key3\')\ny = 0\n\nthisdict = dict.fromkeys(x, y)\n\nprint(thisdict)' },
                        { title: 'Using setdefault()', code: 'car = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\n# Set a default value if key doesn\'t exist\nx = car.setdefault("color", "white")\n\nprint(x)\nprint(car)' }
                    ],
                    exercise: { question: 'Which method returns a list containing a tuple for each key-value pair?', options: ['get()', 'keys()', 'items()'], answer: 2 }
                },
                {
                    id: 'dict-exercises', title: 'Dictionary Exercises',
                    content: `<p>Let's review everything you've learned about dictionaries.</p>`,
                    examples: [
                        { title: 'Review Example', code: 'car =	{\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nprint(car.get("model"))\n\ncar["year"] = 2020\ncar.pop("model")\ncar.clear()\nprint(car)' }
                    ],
                    exercise: { question: 'Use the get method to print the value of the "model" key of the car dictionary.', options: ['print(car.get("model"))', 'print(car["model"])', 'print(car.find("model"))'], answer: 0 }
                },
                {
                    id: 'dict-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a dictionary named <code>student</code> with the keys <code>"name"</code> (value "John"), <code>"age"</code> (value 21), and <code>"major"</code> (value "Computer Science").',
                        'Print the value of the <code>"major"</code> key.',
                        'Change the <code>"age"</code> to 22.',
                        'Add a new key-value pair: <code>"graduated": False</code>.',
                        'Use a <code>for</code> loop and the <code>items()</code> method to print all key-value pairs formatted as <code>key: value</code>.'
                    ],
                    starterCode: '# Create dictionary\n\n# Print major\n\n# Change age\n\n# Add graduated\n\n# Loop over items\n',
                    solution: 'student = {\n    "name": "John",\n    "age": 21,\n    "major": "Computer Science"\n}\nprint(student["major"])\nstudent["age"] = 22\nstudent["graduated"] = False\nfor key, value in student.items():\n    print(f"{key}: {value}")',
                    content: `<p>Put everything together by building and modifying a dictionary!</p>`
                }
            ]
        },

        /* ────── 17. Python If...Else ────── */
        {
            id: 'conditions', title: 'Python If...Else',
            sections: [
                {
                    id: 'conditions-if', title: 'If Statements',
                    content: `<p>Python relies on indentation (whitespace at the beginning of a line) to define scope in the code. Other programming languages often use curly-brackets for this purpose.</p>
<p>An <code>if</code> statement is written by using the <code>if</code> keyword.</p>`,
                    examples: [
                        { title: 'The if statement', code: 'a = 33\nb = 200\n\nif b > a:\n    print("b is greater than a")' },
                        { title: 'Indentation Error', code: '# If statement, without indentation (will raise an error):\na = 33\nb = 200\n\n# if b > a:\n# print("b is greater than a")' },
                        { title: 'Elif ("Else If")', code: 'a = 33\nb = 33\n\nif b > a:\n    print("b is greater than a")\nelif a == b:\n    print("a and b are equal")' },
                        { title: 'Else', code: 'a = 200\nb = 33\n\nif b > a:\n    print("b is greater than a")\nelif a == b:\n    print("a and b are equal")\nelse:\n    print("a is greater than b")' }
                    ],
                    exercise: { question: 'What keyword is used for "else if" in Python?', options: ['elseif', 'else if', 'elif', 'catch'], answer: 2 }
                },
                {
                    id: 'conditions-shorthand', title: 'Short Hand If / Else',
                    content: `<p>If you have only one statement to execute, you can put it on the same line as the if statement.</p>
<p>This technique is known as <strong>Ternary Operators</strong>, or Conditional Expressions.</p>`,
                    examples: [
                        { title: 'Short Hand If', code: 'if 9 > 5: print("Nine is greater than five")' },
                        { title: 'Short Hand If ... Else', code: 'a = 2\nb = 330\n\nprint("A") if a > b else print("B")' },
                        { title: 'Multiple Else Statements', code: 'a = 330\nb = 330\n\nprint("A") if a > b else print("=") if a == b else print("B")' }
                    ],
                    exercise: { question: 'Translate to shorthand: if a > b: print("Yes") else: print("No")', options: ['print("Yes") if a > b else print("No")', 'if a > b print("Yes") else print("No")', 'a > b ? print("Yes") : print("No")'], answer: 0 }
                },
                {
                    id: 'conditions-logical', title: 'Logical Conditions',
                    content: `<p>The <code>and</code>, <code>or</code>, and <code>not</code> keywords are logical operators, and are used to combine conditional statements.</p>`,
                    examples: [
                        { title: 'The "and" keyword', code: 'a = 200\nb = 33\nc = 500\n\n# Both conditions must be True\nif a > b and c > a:\n    print("Both conditions are True")' },
                        { title: 'The "or" keyword', code: 'a = 200\nb = 33\nc = 500\n\n# At least one condition must be True\nif a > b or a > c:\n    print("At least one of the conditions is True")' },
                        { title: 'The "not" keyword', code: 'a = 33\nb = 200\n\n# Reverses the conditional result\nif not a > b:\n    print("a is NOT greater than b")' }
                    ],
                    exercise: { question: 'Which operator evaluates to True if ONE out of TWO conditions are True?', options: ['and', 'or', 'not', 'xor'], answer: 1 }
                },
                {
                    id: 'conditions-nested', title: 'Nested If',
                    content: `<p>You can have <code>if</code> statements inside <code>if</code> statements, this is called <em>nested</em> <code>if</code> statements.</p>`,
                    examples: [
                        { title: 'Nested If', code: 'x = 41\n\nif x > 10:\n    print("Above ten,")\n    if x > 20:\n        print("and also above 20!")\n    else:\n        print("but not above 20.")' }
                    ],
                    exercise: { question: 'What is required for a nested if to run?', options: ['The outer if condition must be True', 'They run independently', 'They must have the same condition'], answer: 0 }
                },
                {
                    id: 'conditions-pass', title: 'The pass Statement',
                    content: `<p><code>if</code> statements cannot be empty, but if you for some reason have an <code>if</code> statement with no content, put in the <code>pass</code> statement to avoid getting an error.</p>`,
                    examples: [
                        { title: 'The pass statement', code: 'a = 33\nb = 200\n\nif b > a:\n    pass  # To avoid an error, we do nothing for now' }
                    ],
                    exercise: { question: 'Which keyword can be used to prevent an error in an empty if block?', options: ['continue', 'break', 'pass', 'return'], answer: 2 }
                },
                {
                    id: 'conditions-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a variable <code>temperature</code> and set it to <code>25</code>.',
                        'Write an <code>if</code> statement that prints "It\'s hot!" if the temperature is greater than 30.',
                        'Write an <code>elif</code> statement that prints "It\'s a nice day." if the temperature is between 20 and 30.',
                        'Write an <code>else</code> statement that prints "It\'s cold." if the temperature is below 20.',
                        'Run the code to see what it prints.'
                    ],
                    starterCode: '# Set temperature\n\n\n# Write conditional statements\n',
                    solution: 'temperature = 25\n\nif temperature > 30:\n    print("It\'s hot!")\nelif temperature >= 20 and temperature <= 30:\n    print("It\'s a nice day.")\nelse:\n    print("It\'s cold.")',
                    content: `<p>Put your knowledge of conditional statements to the test!</p>`
                }
            ]
        },

        /* ────── 18. Python Match ────── */
        {
            id: 'match', title: 'Python Match',
            sections: [
                {
                    id: 'match-basics', title: 'Python Match',
                    content: `<p>A <code>match</code> statement takes an expression and compares its value to successive patterns given as one or more case blocks.</p>
<p>This is similar to a <em>switch</em> statement in C, Java or JavaScript (and many other languages), but it's much more powerful.</p>
<p><em>Note: The <code>match</code> statement was introduced in Python 3.10. Older versions of Python do not support it.</em></p>`,
                    examples: [
                        { title: 'Basic Match', code: 'status = 400\n\nmatch status:\n    case 400:\n        print("Bad request")\n    case 404:\n        print("Not found")\n    case 418:\n        print("I\'m a teapot")\n    case _:  # The underscore acts as the default case (like "default" in other languages)\n        print("Something\'s wrong with the internet")' },
                        { title: 'Matching Multiple Values', code: '# You can combine several literals in a single pattern using | ("or"):\nstatus = 401\n\nmatch status:\n    case 401 | 403 | 404:\n        print("Not allowed")\n    case 500:\n        print("Server error")\n    case _:\n        print("Other error")' }
                    ],
                    exercise: { question: 'What keyword acts as the "default" or catch-all in a match statement?', options: ['default:', 'case *:', 'case _:'], answer: 2 }
                },
                {
                    id: 'match-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a variable <code>day</code> and set it to <code>"Monday"</code>.',
                        'Write a <code>match</code> statement that checks the value of <code>day</code>.',
                        'If the <code>day</code> is "Saturday" or "Sunday", print "Weekend".',
                        'If the <code>day</code> is any other weekday (Monday-Friday), print "Weekday".',
                        'For the default case (<code>_</code>), print "Invalid day".'
                    ],
                    starterCode: '# Set day\n\n\n# Match statement\n',
                    solution: 'day = "Monday"\n\nmatch day:\n    case "Saturday" | "Sunday":\n        print("Weekend")\n    case "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday":\n        print("Weekday")\n    case _:\n        print("Invalid day")',
                    content: `<p>Practice using Python's structural pattern matching!</p>`
                }
            ]
        },

        /* ────── 19. Python While Loops ────── */
        {
            id: 'while-loops', title: 'Python While Loops',
            sections: [
                {
                    id: 'while-basics', title: 'While Loops',
                    content: `<p>With the <code>while</code> loop we can execute a set of statements as long as a condition is true.</p>
<p>The <code>while</code> loop requires relevant variables to be ready, in this example we need to define an indexing variable, <code>i</code>, which we set to 1.</p>`,
                    examples: [
                        { title: 'The while loop', code: 'i = 1\nwhile i < 6:\n  print(i)\n  i += 1\n\n# Note: remember to increment i, or else the loop will continue forever.' },
                        { title: 'The break Statement', code: '# With the break statement we can stop the loop even if the while condition is true:\ni = 1\nwhile i < 6:\n  print(i)\n  if i == 3:\n    break\n  i += 1' },
                        { title: 'The continue Statement', code: '# With the continue statement we can stop the current iteration, and continue with the next:\ni = 0\nwhile i < 6:\n  i += 1\n  if i == 3:\n    continue\n  print(i)' },
                        { title: 'The else Statement', code: '# With the else statement we can run a block of code once when the condition no longer is true:\ni = 1\nwhile i < 6:\n  print(i)\n  i += 1\nelse:\n  print("i is no longer less than 6")' }
                    ],
                    exercise: { question: 'What statement is used to stop a loop even if the condition is still true?', options: ['stop', 'exit', 'break'], answer: 2 }
                },
                {
                    id: 'while-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a variable <code>count</code> and set it to <code>10</code>.',
                        'Write a <code>while</code> loop that runs as long as <code>count</code> is greater than <code>0</code>.',
                        'Inside the loop, print the value of <code>count</code>.',
                        'Decrement <code>count</code> by <code>1</code> in each iteration (<code>count -= 1</code>).',
                        'Add an <code>else</code> block that prints "Blastoff!" when the loop finishes.'
                    ],
                    starterCode: '# Set count\n\n# Write while loop\n\n# Add else block\n',
                    solution: 'count = 10\nwhile count > 0:\n    print(count)\n    count -= 1\nelse:\n    print("Blastoff!")',
                    content: `<p>Practice creating your own countdown using a while loop!</p>`
                }
            ]
        },

        /* ────── 20. Python For Loops ────── */
        {
            id: 'loops', title: 'Python For Loops',
            sections: [{
                id: 'loops-for', title: 'For Loops',
                content: `<p>A <code>for</code> loop is used for iterating over a sequence (a list, tuple, dictionary, set, or string).</p>
<h3>The range() Function</h3><p>To loop through a set of code a specified number of times, we can use the <code>range()</code> function.</p>`,
                examples: [
                    { title: 'For loop basics', code: 'fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)' },
                    { title: 'Using range()', code: 'for i in range(6):\n    print(i)\n\nprint("---")\n\nfor i in range(2, 6):\n    print(i)' },
                ],
                exercise: {
                    question: 'Which function generates a sequence of numbers for looping?',
                    options: ['seq()', 'loop()', 'range()'],
                    answer: 2,
                },
            }, {
                id: 'loops-while', title: 'While Loops',
                content: `<p>With the <code>while</code> loop we can execute a set of statements as long as a condition is true.</p>
<p><strong>Remember</strong> to increment the variable used in the condition, otherwise the loop will continue forever.</p>`,
                examples: [
                    { title: 'While loop', code: 'i = 1\nwhile i < 6:\n    print(i)\n    i += 1' },
                    { title: 'Break and continue', code: '# Break: exit loop\nfor i in range(10):\n    if i == 5:\n        break\n    print(i)\n\nprint("---")\n\n# Continue: skip iteration\nfor i in range(6):\n    if i == 3:\n        continue\n    print(i)' },
                ],
                exercise: {
                    question: 'Which statement stops a loop early?',
                    options: ['stop', 'exit', 'break'],
                    answer: 2,
                },
            }],
        },


        /* ────── 21. Python Functions ────── */
        {
            id: 'functions', title: 'Python Functions',
            sections: [
                {
                    id: 'functions-intro', title: 'Python Functions',
                    content: `<p>A function is a block of code which only runs when it is called.</p>
<p>You can pass data, known as parameters, into a function.</p>
<p>A function can return data as a result.</p>
<h3>Creating a Function</h3>
<p>In Python a function is defined using the <code>def</code> keyword:</p>
<h3>Calling a Function</h3>
<p>To call a function, use the function name followed by parenthesis:</p>`,
                    examples: [
                        { title: 'Creating and Calling', code: 'def my_function():\n  print("Hello from a function")\n\nmy_function()' }
                    ],
                    exercise: { question: 'Which keyword is used to create a function in Python?', options: ['function', 'func', 'def'], answer: 2 }
                },
                {
                    id: 'functions-args', title: 'Python Arguments',
                    content: `<p>Information can be passed into functions as arguments.</p>
<p>Arguments are specified after the function name, inside the parentheses. You can add as many arguments as you want, just separate them with a comma.</p>
<p><em>Note: The terms parameter and argument can be used for the same thing: information that are passed into a function.</em></p>
<p>From a function's perspective:</p>
<ul>
<li>A parameter is the variable listed inside the parentheses in the function definition.</li>
<li>An argument is the value that is sent to the function when it is called.</li>
</ul>`,
                    examples: [
                        { title: 'Arguments', code: 'def my_function(fname):\n  print(fname + " Refsnes")\n\nmy_function("Emil")\nmy_function("Tobias")\nmy_function("Linus")' },
                        { title: 'Number of Arguments', code: '# By default, a function must be called with the correct number of arguments.\n# Meaning that if your function expects 2 arguments, you have to call the function with 2 arguments, not more, and not less.\ndef my_function(fname, lname):\n  print(fname + " " + lname)\n\nmy_function("Emil", "Refsnes")' },
                        { title: 'Default Parameter Value', code: 'def my_function(country = "Norway"):\n  print("I am from " + country)\n\nmy_function("Sweden")\nmy_function("India")\nmy_function() # Will use the default value "Norway"\nmy_function("Brazil")' }
                    ],
                    exercise: { question: 'If a function expects 2 arguments, how many must you pass when calling it (assuming no default values)?', options: ['1', '2', 'As many as you want'], answer: 1 }
                },
                {
                    id: 'functions-kwargs', title: 'Python *args / **kwargs',
                    content: `<p>If you do not know how many arguments that will be passed into your function, add a <code>*</code> before the parameter name in the function definition. This creates a tuple of arguments, known as <strong>*args</strong>.</p>
<p>If you do not know how many keyword arguments that will be passed into your function, add two asterisk: <code>**</code> before the parameter name. This creates a dictionary of arguments, known as <strong>**kwargs</strong>.</p>`,
                    examples: [
                        { title: 'Arbitrary Arguments, *args', code: 'def my_function(*kids):\n  print("The youngest child is " + kids[2])\n\nmy_function("Emil", "Tobias", "Linus")' },
                        { title: 'Keyword Arguments (kwargs)', code: '# You can also send arguments with the key = value syntax.\ndef my_function(child3, child2, child1):\n  print("The youngest child is " + child3)\n\nmy_function(child1 = "Emil", child2 = "Tobias", child3 = "Linus")' },
                        { title: 'Arbitrary Keyword Arguments, **kwargs', code: 'def my_function(**kid):\n  print("His last name is " + kid["lname"])\n\nmy_function(fname = "Tobias", lname = "Refsnes")' }
                    ],
                    exercise: { question: 'Which syntax allows a function to accept an arbitrary number of positional arguments?', options: ['kwargs', '**kwargs', '*args'], answer: 2 }
                },
                {
                    id: 'functions-scope', title: 'Python Scope',
                    content: `<p>A variable is only available from inside the region it is created. This is called <strong>scope</strong>.</p>
<h3>Local Scope</h3>
<p>A variable created inside a function belongs to the local scope of that function, and can only be used inside that function.</p>
<h3>Global Scope</h3>
<p>A variable created in the main body of the Python code is a global variable and belongs to the global scope. It is available from within any scope, global and local.</p>`,
                    examples: [
                        { title: 'Local Variable', code: 'def myfunc():\n  x = 300\n  print(x)\n\nmyfunc()' },
                        { title: 'Global Variable', code: 'x = 300\n\ndef myfunc():\n  print(x)\n\nmyfunc()\n\nprint(x)' },
                        { title: 'The global Keyword', code: '# Use the global keyword if you want to change a global variable inside a function.\nx = 300\n\ndef myfunc():\n  global x\n  x = 200\n\nmyfunc()\n\nprint(x) # x is now 200' }
                    ],
                    exercise: { question: 'What keyword allows you to modify a global variable from inside a function?', options: ['global', 'modify', 'var'], answer: 0 }
                },
                {
                    id: 'functions-decorators', title: 'Python Decorators',
                    content: `<p>Decorators allow you to wrap another function in order to extend the behavior of the wrapped function, without permanently modifying it.</p>
<p>In Python, functions are first-class objects. This means that functions can be passed around and used as arguments, just like any other object.</p>
<p>A decorator takes in a function, adds some functionality and returns it. We use the <code>@</code> symbol to apply a decorator.</p>`,
                    examples: [
                        { title: 'Simple Decorator', code: 'def my_decorator(func):\n    def wrapper():\n        print("Something is happening before the function is called.")\n        func()\n        print("Something is happening after the function is called.")\n    return wrapper\n\n@my_decorator\ndef say_whee():\n    print("Whee!")\n\nsay_whee()' }
                    ],
                    exercise: { question: 'What symbol is used to apply a decorator to a function?', options: ['#', '$', '@', '&'], answer: 2 }
                },
                {
                    id: 'functions-lambda', title: 'Python Lambda',
                    content: `<p>A lambda function is a small anonymous function.</p>
<p>A lambda function can take any number of arguments, but can only have one expression.</p>
<p>Syntax: <code>lambda arguments : expression</code></p>
<p>The power of lambda is better shown when you use them as an anonymous function inside another function.</p>`,
                    examples: [
                        { title: 'Basic Lambda', code: '# Add 10 to argument a, and return the result:\nx = lambda a : a + 10\nprint(x(5))' },
                        { title: 'Multiple Arguments', code: '# Multiply argument a with argument b and return the result:\nx = lambda a, b : a * b\nprint(x(5, 6))' },
                        { title: 'Why Use Lambda?', code: '# Use that function definition to make a function that always doubles the number you send in:\ndef myfunc(n):\n  return lambda a : a * n\n\nmydoubler = myfunc(2)\n\nprint(mydoubler(11))' }
                    ],
                    exercise: { question: 'How many expressions can a lambda function contain?', options: ['0', '1', 'Unlimited'], answer: 1 }
                },
                {
                    id: 'functions-recursion', title: 'Python Recursion',
                    content: `<p>Python also accepts function recursion, which means a defined function can call itself.</p>
<p>Recursion is a common mathematical and programming concept. It means that a function calls itself. This has the benefit of meaning that you can loop through data to reach a result.</p>
<p>The developer should be very careful with recursion as it can be quite easy to slip into writing a function which never terminates, or one that uses excess amounts of memory or processor power.</p>`,
                    examples: [
                        { title: 'Recursion Example', code: 'def tri_recursion(k):\n  if(k > 0):\n    result = k + tri_recursion(k - 1)\n    print(result)\n  else:\n    result = 0\n  return result\n\nprint("\\n\\nRecursion Example Results")\ntri_recursion(6)' }
                    ],
                    exercise: { question: 'What is it called when a function calls itself?', options: ['Iteration', 'Overloading', 'Recursion'], answer: 2 }
                },
                {
                    id: 'functions-generators', title: 'Python Generators',
                    content: `<p>Generators are a simple way of creating iterators. They are functions that return an iterable set of items, one at a time, in a special way.</p>
<p>Instead of using a <code>return</code> statement, generators use the <code>yield</code> statement.</p>
<p>Unlike regular functions which destroy their local variables when they return, generators "pause" and remember their state between each call.</p>`,
                    examples: [
                        { title: 'Basic Generator', code: 'def my_generator():\n  yield 1\n  yield 2\n  yield 3\n\nfor val in my_generator():\n  print(val)' },
                        { title: 'Generator with a Loop', code: 'def count_up_to(max):\n  count = 1\n  while count <= max:\n    yield count\n    count += 1\n\ncounter = count_up_to(5)\nfor num in counter:\n  print(num)' }
                    ],
                    exercise: { question: 'What keyword does a generator use instead of "return"?', options: ['send', 'yield', 'next', 'throw'], answer: 1 }
                },
                {
                    id: 'functions-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Define a function named <code>calculate_area</code>.',
                        'It should take two arguments: <code>width</code> and <code>height</code>.',
                        'The function should return the product of <code>width</code> and <code>height</code>.',
                        'Call the function with arguments <code>5</code> and <code>10</code>, and print the result.'
                    ],
                    starterCode: '# Define calculate_area function\n\n\n# Call it and print the result\n',
                    solution: 'def calculate_area(width, height):\n    return width * height\n\nresult = calculate_area(5, 10)\nprint(result)',
                    content: `<p>Write your own Python function from scratch!</p>`
                }
            ]
        },

        /* ────── 22. Python Range ────── */
        {
            id: 'range', title: 'Python Range',
            sections: [
                {
                    id: 'range-basics', title: 'Python Range',
                    content: `<p>The <code>range()</code> function returns a sequence of numbers, starting from 0 by default, and increments by 1 (by default), and stops before a specified number.</p>
<h3>Syntax</h3>
<p><code>range(start, stop, step)</code></p>
<ul>
<li><strong>start</strong>: <em>Optional.</em> An integer number specifying at which position to start. Default is 0</li>
<li><strong>stop</strong>: <em>Required.</em> An integer number specifying at which position to stop (not included).</li>
<li><strong>step</strong>: <em>Optional.</em> An integer number specifying the incrementation. Default is 1</li>
</ul>`,
                    examples: [
                        { title: 'Create a sequence of numbers from 0 to 5', code: 'x = range(6)\nfor n in x:\n  print(n)' },
                        { title: 'Create a sequence of numbers from 3 to 5', code: 'x = range(3, 6)\nfor n in x:\n  print(n)' },
                        { title: 'Create a sequence of numbers from 3 to 19, but increment by 2 instead of 1', code: 'x = range(3, 20, 2)\nfor n in x:\n  print(n)' }
                    ],
                    exercise: { question: 'If you use range(5), what is the first number generated?', options: ['1', '0', '5'], answer: 1 }
                },
                {
                    id: 'range-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Use a <code>for</code> loop and the <code>range()</code> function to print out the even numbers from <code>10</code> down to <code>2</code> (inclusive).',
                        '<em>Hint: You will need to use the start, stop, and step arguments. Remember the stop number is NOT included.</em>'
                    ],
                    starterCode: '# Write your loop here\n',
                    solution: 'for i in range(10, 0, -2):\n    print(i)',
                    content: `<p>Practice using all three arguments of the range() function!</p>`
                }
            ]
        },

        /* ────── 23. Python Arrays ────── */
        {
            id: 'arrays', title: 'Python Arrays',
            sections: [
                {
                    id: 'arrays-basics', title: 'Python Arrays',
                    content: `<p><em>Note: Python does not have built-in support for Arrays, but Python Lists can be used instead.</em></p>
<p>This page shows you how to use LISTS as ARRAYS, however, to work with arrays in Python you will have to import a library, like the NumPy library.</p>
<h3>Arrays</h3>
<p>Arrays are used to store multiple values in one single variable.</p>
<p>An array is a special variable, which can hold more than one value at a time.</p>
<p>If you have a list of items (a list of car names, for example), storing the cars in single variables could look like this:</p>
<pre>car1 = "Ford"
car2 = "Volvo"
car3 = "BMW"</pre>
<p>However, what if you want to loop through the cars and find a specific one? And what if you had not 3 cars, but 300? The solution is an array!</p>`,
                    examples: [
                        { title: 'Create an Array', code: 'cars = ["Ford", "Volvo", "BMW"]\nprint(cars)' },
                        { title: 'Access the elements of an Array', code: 'cars = ["Ford", "Volvo", "BMW"]\nx = cars[0]\nprint(x)' },
                        { title: 'Modify the elements of an Array', code: 'cars = ["Ford", "Volvo", "BMW"]\ncars[0] = "Toyota"\nprint(cars)' },
                        { title: 'Length of an Array', code: 'cars = ["Ford", "Volvo", "BMW"]\nx = len(cars)\nprint(x)' },
                        { title: 'Looping Array Elements', code: 'cars = ["Ford", "Volvo", "BMW"]\nfor x in cars:\n  print(x)' },
                        { title: 'Adding Array Elements', code: 'cars = ["Ford", "Volvo", "BMW"]\ncars.append("Honda")\nprint(cars)' },
                        { title: 'Removing Array Elements', code: 'cars = ["Ford", "Volvo", "BMW"]\ncars.pop(1)\nprint(cars)\n\n# Or using remove()\ncars.remove("Volvo")' }
                    ],
                    exercise: { question: 'Does Python have a built-in Array data type (separate from Lists)?', options: ['Yes', 'No', 'Only in Python 3.10+'], answer: 1 }
                },
                {
                    id: 'arrays-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create an array (list) named <code>fruits</code> containing: <code>"apple"</code>, <code>"banana"</code>, and <code>"cherry"</code>.',
                        'Use the <code>append()</code> method to add <code>"orange"</code> to the array.',
                        'Print the length of the array using the <code>len()</code> function.',
                        'Print the final array.'
                    ],
                    starterCode: '# Create the array\n\n\n# Append "orange"\n\n\n# Print length\n\n\n# Print array\n',
                    solution: 'fruits = ["apple", "banana", "cherry"]\nfruits.append("orange")\nprint(len(fruits))\nprint(fruits)',
                    content: `<p>Practice creating, modifying, and inspecting arrays (lists)!</p>`
                }
            ]
        },

        /* ────── 24. Python Iterators ────── */
        {
            id: 'iterators', title: 'Python Iterators',
            sections: [
                {
                    id: 'iterators-basics', title: 'Python Iterators',
                    content: `<p>An iterator is an object that contains a countable number of values.</p>
<p>An iterator is an object that can be iterated upon, meaning that you can traverse through all the values.</p>
<p>Technically, in Python, an iterator is an object which implements the iterator protocol, which consist of the methods <code>__iter__()</code> and <code>__next__()</code>.</p>
<h3>Iterator vs Iterable</h3>
<p>Lists, tuples, dictionaries, and sets are all iterable objects. They are iterable <em>containers</em> which you can get an iterator from.</p>
<p>All these objects have a <code>iter()</code> method which is used to get an iterator:</p>`,
                    examples: [
                        { title: 'Get an Iterator from a Tuple', code: 'mytuple = ("apple", "banana", "cherry")\nmyit = iter(mytuple)\n\nprint(next(myit))\nprint(next(myit))\nprint(next(myit))' },
                        { title: 'Strings are also Iterables', code: 'mystr = "banana"\nmyit = iter(mystr)\n\nprint(next(myit))\nprint(next(myit))\nprint(next(myit))\nprint(next(myit))\nprint(next(myit))\nprint(next(myit))' },
                        { title: 'Looping Through an Iterator', code: '# The for loop actually creates an iterator object and executes the next() method for each loop.\nmytuple = ("apple", "banana", "cherry")\n\nfor x in mytuple:\n  print(x)' }
                    ],
                    exercise: { question: 'Which two methods make up the Python iterator protocol?', options: ['start() and stop()', '__iter__() and __next__()', 'iter() and loop()'], answer: 1 }
                },
                {
                    id: 'iterators-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a string variable named <code>word</code> with the value <code>"TezCode"</code>.',
                        'Get an iterator for this string using the <code>iter()</code> function and assign it to <code>my_iterator</code>.',
                        'Use the <code>next()</code> function three times to print the first three letters of the word.'
                    ],
                    starterCode: '# Create string and iterator\n\n\n# Print first 3 letters using next()\n\n\n\n',
                    solution: 'word = "TezCode"\nmy_iterator = iter(word)\n\nprint(next(my_iterator))\nprint(next(my_iterator))\nprint(next(my_iterator))',
                    content: `<p>Practice extracting an iterator and stepping through it manually!</p>`
                }
            ]
        },

        /* ────── 25. Python Modules ────── */
        {
            id: 'modules', title: 'Python Modules',
            sections: [
                {
                    id: 'modules-basics', title: 'Python Modules',
                    content: `<p>Consider a module to be the same as a code library.</p>
<p>A file containing a set of functions you want to include in your application.</p>
<h3>Create a Module</h3>
<p>To create a module just save the code you want in a file with the file extension <code>.py</code>:</p>
<pre># Save this code in a file named mymodule.py
def greeting(name):
  print("Hello, " + name)</pre>
<h3>Use a Module</h3>
<p>Now we can use the module we just created, by using the <code>import</code> statement:</p>`,
                    examples: [
                        { title: 'Importing a Module', code: 'import platform\n\nx = platform.system()\nprint(x)' },
                        { title: 'Variables in Module', code: 'import platform\n\nx = dir(platform)\nprint(x)' },
                        { title: 'Re-naming a Module', code: 'import platform as pl\n\nx = pl.system()\nprint(x)' },
                        { title: 'Import From Module', code: '# You can choose to import only parts from a module, by using the from keyword.\nfrom math import pi\n\nprint(pi)' }
                    ],
                    exercise: { question: 'Which keyword is used to bring a module into your current script?', options: ['include', 'import', 'require'], answer: 1 }
                },
                {
                    id: 'modules-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Import the built-in <code>math</code> module.',
                        'Use the <code>math.sqrt()</code> function to find the square root of <code>64</code>.',
                        'Print the result.'
                    ],
                    starterCode: '# Import the math module\n\n\n# Calculate and print the square root of 64\n\n\n',
                    solution: 'import math\n\nresult = math.sqrt(64)\nprint(result)',
                    content: `<p>Practice importing built-in Python modules!</p>`
                }
            ]
        },

        /* ────── 26. Python Dates ────── */
        {
            id: 'dates', title: 'Python Dates',
            sections: [
                {
                    id: 'dates-basics', title: 'Python Dates',
                    content: `<p>A date in Python is not a data type of its own, but we can import a module named <code>datetime</code> to work with dates as date objects.</p>
<h3>Date Output</h3>
<p>When we execute the code from the example above the result will be:</p>
<pre>2023-10-31 09:12:35.334123</pre>
<p>The date contains year, month, day, hour, minute, second, and microsecond.</p>
<p>The <code>datetime</code> module has many methods to return information about the date object.</p>`,
                    examples: [
                        { title: 'Import the datetime module and display the current date', code: 'import datetime\n\nx = datetime.datetime.now()\nprint(x)' },
                        { title: 'Return the year and name of weekday', code: 'import datetime\n\nx = datetime.datetime.now()\n\nprint(x.year)\nprint(x.strftime("%A"))' },
                        { title: 'Creating Date Objects', code: 'import datetime\n\n# The datetime() class requires three parameters to create a date: year, month, day.\nx = datetime.datetime(2020, 5, 17)\n\nprint(x)' },
                        { title: 'The strftime() Method', code: 'import datetime\n\nx = datetime.datetime(2018, 6, 1)\n\nprint(x.strftime("%B"))' }
                    ],
                    exercise: { question: 'Which module do you need to import to work with dates in Python?', options: ['date', 'time', 'datetime'], answer: 2 }
                },
                {
                    id: 'dates-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Import the <code>datetime</code> module.',
                        'Create a date object for <strong>July 4, 1776</strong> and assign it to a variable named <code>independence_day</code>.',
                        'Print the <code>independence_day</code> variable.',
                        'Use the <code>strftime()</code> method to print the full name of the weekday for that date using the <code>"%A"</code> format code.'
                    ],
                    starterCode: '# Import datetime\n\n\n# Create date object for 1776-07-04\n\n\n# Print the date object\n\n\n# Print the weekday name\n\n',
                    solution: 'import datetime\n\nindependence_day = datetime.datetime(1776, 7, 4)\n\nprint(independence_day)\nprint(independence_day.strftime("%A"))',
                    content: `<p>Practice creating custom Python date objects and formatting them!</p>`
                }
            ]
        },

        /* ────── 27. Python Math ────── */
        {
            id: 'math', title: 'Python Math',
            sections: [
                {
                    id: 'math-basics', title: 'Python Math',
                    content: `<p>Python has a set of built-in math functions, including an extensive math module, that allows you to perform mathematical tasks on numbers.</p>
<h3>Built-in Math Functions</h3>
<p>The <code>min()</code> and <code>max()</code> functions can be used to find the lowest or highest value in an iterable:</p>
<pre>x = min(5, 10, 25)
y = max(5, 10, 25)</pre>
<p>The <code>abs()</code> function returns the absolute (positive) value of the specified number:</p>
<pre>x = abs(-7.25)</pre>
<p>The <code>pow(x, y)</code> function returns the value of x to the power of y (x<sup>y</sup>).</p>
<h3>The Math Module</h3>
<p>Python has also a built-in module called <code>math</code>, which extends the list of mathematical functions. To use it, you must import the math module:</p>
<pre>import math</pre>`,
                    examples: [
                        { title: 'Using min() and max()', code: 'x = min(5, 10, 25)\ny = max(5, 10, 25)\n\nprint(x)\nprint(y)' },
                        { title: 'Using abs()', code: 'x = abs(-7.25)\nprint(x)' },
                        { title: 'Using pow()', code: 'x = pow(4, 3)\nprint(x)' },
                        { title: 'Using math.sqrt()', code: 'import math\n\nx = math.sqrt(64)\nprint(x)' },
                        { title: 'Using math.ceil() and math.floor()', code: 'import math\n\n# Round a number upward to its nearest integer\nx = math.ceil(1.4)\n\n# Round a number downward to its nearest integer\ny = math.floor(1.4)\n\nprint(x) # returns 2\nprint(y) # returns 1' },
                        { title: 'Using math.pi', code: 'import math\n\nx = math.pi\nprint(x)' }
                    ],
                    exercise: { question: 'Which built-in Python function returns the absolute (positive) value of a number?', options: ['positive()', 'abs()', 'math.abs()'], answer: 1 }
                },
                {
                    id: 'math-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Import the <code>math</code> module.',
                        'Use the <code>math.ceil()</code> function to round the number <code>12.4</code> UP to the nearest integer and print the result.',
                        'Use the <code>math.floor()</code> function to round the number <code>12.8</code> DOWN to the nearest integer and print the result.',
                        'Print the value of Pi using <code>math.pi</code>.'
                    ],
                    starterCode: '# Import math\n\n\n# Round 12.4 up and print\n\n\n# Round 12.8 down and print\n\n\n# Print Pi\n\n',
                    solution: 'import math\n\nprint(math.ceil(12.4))\nprint(math.floor(12.8))\nprint(math.pi)',
                    content: `<p>Practice using advanced functions from the Python Math module!</p>`
                }
            ]
        },

        /* ────── 28. Python JSON ────── */
        {
            id: 'json', title: 'Python JSON',
            sections: [
                {
                    id: 'json-basics', title: 'Python JSON',
                    content: `<p>JSON is a syntax for storing and exchanging data.</p>
<p>JSON is text, written with JavaScript object notation.</p>
<h3>JSON in Python</h3>
<p>Python has a built-in package called <code>json</code>, which can be used to work with JSON data.</p>
<pre>import json</pre>
<h3>Parse JSON - Convert from JSON to Python</h3>
<p>If you have a JSON string, you can parse it by using the <code>json.loads()</code> method. The result will be a Python dictionary.</p>
<h3>Convert from Python to JSON</h3>
<p>If you have a Python object, you can convert it into a JSON string by using the <code>json.dumps()</code> method.</p>`,
                    examples: [
                        { title: 'Convert from JSON to Python', code: 'import json\n\n# some JSON:\nx =  \'{ "name":"John", "age":30, "city":"New York"}\'\n\n# parse x:\ny = json.loads(x)\n\n# the result is a Python dictionary:\nprint(y["age"])' },
                        { title: 'Convert from Python to JSON', code: 'import json\n\n# a Python object (dict):\nx = {\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}\n\n# convert into JSON:\ny = json.dumps(x)\n\n# the result is a JSON string:\nprint(y)' },
                        { title: 'Format the Result', code: 'import json\n\nx = {\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}\n\n# use four indents to make it easier to read the result:\nprint(json.dumps(x, indent=4))' },
                        { title: 'Order the Result', code: 'import json\n\nx = {\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}\n\n# sort the result alphabetically by keys:\nprint(json.dumps(x, indent=4, sort_keys=True))' }
                    ],
                    exercise: { question: 'Which method is used to convert a JSON string into a Python dictionary?', options: ['json.parse()', 'json.dumps()', 'json.loads()'], answer: 2 }
                },
                {
                    id: 'json-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Import the <code>json</code> module.',
                        'You are given a JSON string representing a student in the variable <code>student_json</code>.',
                        'Use the <code>json.loads()</code> method to parse this string into a Python dictionary named <code>student_dict</code>.',
                        'Print the <code>grade</code> of the student from the dictionary.'
                    ],
                    starterCode: '# Import json\n\n\nstudent_json = \'{"name":"Alice", "age":20, "grade":"A+"}\'\n\n# Parse the JSON string\n\n\n# Print the grade\n\n',
                    solution: 'import json\n\nstudent_json = \'{"name":"Alice", "age":20, "grade":"A+"}\'\nstudent_dict = json.loads(student_json)\nprint(student_dict["grade"])',
                    content: `<p>Practice parsing JSON strings into Python dictionaries!</p>`
                }
            ]
        },

        /* ────── 29. Python RegEx ────── */
        {
            id: 'regex', title: 'Python RegEx',
            sections: [
                {
                    id: 'regex-basics', title: 'Python RegEx',
                    content: `<p>A RegEx, or Regular Expression, is a sequence of characters that forms a search pattern.</p>
<p>RegEx can be used to check if a string contains the specified search pattern.</p>
<h3>RegEx Module</h3>
<p>Python has a built-in package called <code>re</code>, which can be used to work with Regular Expressions.</p>
<pre>import re</pre>
<h3>RegEx Functions</h3>
<p>The <code>re</code> module offers a set of functions that allows us to search a string for a match:</p>
<ul>
  <li><code>findall</code>: Returns a list containing all matches.</li>
  <li><code>search</code>: Returns a Match object if there is a match anywhere in the string.</li>
  <li><code>split</code>: Returns a list where the string has been split at each match.</li>
  <li><code>sub</code>: Replaces one or many matches with a string.</li>
</ul>`,
                    examples: [
                        { title: 'Search for a pattern', code: 'import re\n\ntxt = "The rain in Spain"\nx = re.search("^The.*Spain$", txt)\n\nif x:\n  print("YES! We have a match!")\nelse:\n  print("No match")' },
                        { title: 'Find all matches', code: 'import re\n\ntxt = "The rain in Spain"\nx = re.findall("ai", txt)\nprint(x)' },
                        { title: 'Split at each whitespace', code: 'import re\n\ntxt = "The rain in Spain"\nx = re.split("\\s", txt)\nprint(x)' },
                        { title: 'Replace whitespace with 9', code: 'import re\n\ntxt = "The rain in Spain"\nx = re.sub("\\s", "9", txt)\nprint(x)' }
                    ],
                    exercise: { question: 'Which module is used to work with Regular Expressions in Python?', options: ['regexp', 're', 'regex'], answer: 1 }
                },
                {
                    id: 'regex-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Import the <code>re</code> module.',
                        'Use the <code>re.findall()</code> function to find all occurrences of the letters <code>"e"</code> in the string <code>"TezCode is awesome"</code>.',
                        'Print the resulting list.'
                    ],
                    starterCode: '# Import re\n\n\ntxt = "TezCode is awesome"\n\n# Find all "e" characters\n\n\n# Print the result\n\n',
                    solution: 'import re\n\ntxt = "TezCode is awesome"\nx = re.findall("e", txt)\nprint(x)',
                    content: `<p>Practice finding patterns using the RegEx module!</p>`
                }
            ]
        },

        /* ────── 30. Python PIP ────── */
        {
            id: 'pip', title: 'Python PIP',
            sections: [
                {
                    id: 'pip-basics', title: 'Python PIP',
                    content: `<p>PIP is a package manager for Python packages, or modules if you like.</p>
<p>Note: If you have Python version 3.4 or later, PIP is included by default.</p>
<h3>What is a Package?</h3>
<p>A package contains all the files you need for a module. Modules are Python code libraries you can include in your project.</p>
<h3>Check if PIP is Installed</h3>
<p>Navigate your command line to the location of Python's script directory, and type the following:</p>
<pre>pip --version</pre>
<h3>Install PIP</h3>
<p>If you do not have PIP installed, you can download and install it from this page: <a href="https://pypi.org/project/pip/" target="_blank">https://pypi.org/project/pip/</a></p>
<h3>Download a Package</h3>
<p>Downloading a package is very easy. Open the command line interface and tell PIP to download the package you want.</p>
<p>To download a package named "camelcase", use the following command:</p>
<pre>pip install camelcase</pre>`,
                    examples: [
                        { title: 'Using a Package', code: '# After installation, you can use the package:\nimport camelcase\n\nc = camelcase.CamelCase()\ntxt = "hello world"\n\nprint(c.hump(txt))' },
                        { title: 'List Packages', code: '# Use the list command to list all the packages installed on your system:\npip list' }
                    ],
                    exercise: { question: 'What is the command to install a Python package named "requests"?', options: ['pip download requests', 'pip install requests', 'python get requests'], answer: 1 }
                },
                {
                    id: 'pip-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'This code challenge is a simulation.',
                        'In Python, we use the <code>import</code> keyword to use a package after it is installed.',
                        'Import a hypothetical package named <code>emoji</code>.',
                        'Call a function named <code>emojize()</code> from that package with the string <code>"Python is :thumbs_up:"</code> and print the result.',
                        '<em>Note: This is a simulation of using an external library!</em>'
                    ],
                    starterCode: '# Import the emoji package\n\n\n# Call emojize and print\n\n',
                    solution: 'import emoji\n\nprint(emoji.emojize("Python is :thumbs_up:"))',
                    content: `<p>Practice the concept of using third-party packages installed via PIP!</p>`
                }
            ]
        },

        /* ────── 31. Python Try...Except ────── */
        {
            id: 'try_except', title: 'Python Try...Except',
            sections: [
                {
                    id: 'try-except-basics', title: 'Try...Except',
                    content: `<p>The <code>try</code> block lets you test a block of code for errors.</p>
<p>The <code>except</code> block lets you handle the error.</p>
<p>The <code>else</code> block lets you execute code when there is no error.</p>
<p>The <code>finally</code> block lets you execute code, regardless of the result of the try- and except blocks.</p>
<h3>Exception Handling</h3>
<p>When an error occurs, or exception as we call it, Python will normally stop and generate an error message.</p>
<p>These exceptions can be handled using the <code>try</code> statement:</p>`,
                    examples: [
                        { title: 'The try block will generate an exception, because x is not defined:', code: 'try:\n  print(x)\nexcept:\n  print("An exception occurred")' },
                        { title: 'Many Exceptions', code: 'try:\n  print(x)\nexcept NameError:\n  print("Variable x is not defined")\nexcept:\n  print("Something else went wrong")' },
                        { title: 'Else', code: 'try:\n  print("Hello")\nexcept:\n  print("Something went wrong")\nelse:\n  print("Nothing went wrong")' },
                        { title: 'Finally', code: 'try:\n  print(x)\nexcept:\n  print("Something went wrong")\nfinally:\n  print("The \'try except\' is finished")' }
                    ],
                    exercise: { question: 'Which block is used to handle the error if one occurs in the try block?', options: ['catch', 'except', 'error'], answer: 1 }
                },
                {
                    id: 'try-except-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Wrap the following code in a <code>try...except</code> block.',
                        'The code is <code>print(undefined_variable)</code>.',
                        'In the <code>except</code> block, catch the <code>NameError</code> and print <code>"Variable not found!"</code>.'
                    ],
                    starterCode: '# Wrap in try...except\n\nprint(undefined_variable)\n\n',
                    solution: 'try:\n  print(undefined_variable)\nexcept NameError:\n  print("Variable not found!")',
                    content: `<p>Practice basic error handling in Python!</p>`
                }
            ]
        },

        /* ────── 32. Python String Formatting ────── */
        {
            id: 'string_formatting', title: 'Python String Formatting',
            sections: [
                {
                    id: 'string-formatting-basics', title: 'String Formatting',
                    content: `<p>Python f-strings (available since Python 3.6) and the <code>format()</code> method allow you to format parts of a string.</p>
<h3>F-Strings</h3>
<p>To specify a string as an f-string, simply put an <code>f</code> in front of the string literal, and add curly brackets <code>{}</code> as placeholders for variables and other values.</p>
<pre>price = 49
txt = f"The price is {price} dollars"</pre>
<h3>Displaying Decimals</h3>
<p>You can add a modifier to format the value. A modifier is included by adding a colon <code>:</code> followed by a legal formatting type, like <code>.2f</code> which means a fixed point number with 2 decimals:</p>
<pre>txt = f"The price is {price:.2f} dollars"</pre>
<h3>Perform Operations in F-Strings</h3>
<p>You can perform Python operations inside the curly brackets:</p>
<pre>txt = f"The price is {20 * 59} dollars"</pre>`,
                    examples: [
                        { title: 'Using F-string', code: 'price = 59\ntxt = f"The price is {price} dollars"\nprint(txt)' },
                        { title: 'Format to 2 Decimals', code: 'price = 59\ntxt = f"The price is {price:.2f} dollars"\nprint(txt)' },
                        { title: 'Math in F-string', code: 'item = "Widget"\nqty = 10\nprice = 5.99\n\ntxt = f"Total for {qty} {item}s is {qty * price:.2f}"\nprint(txt)' },
                        { title: 'Older .format() method', code: 'price = 49\ntxt = "The price is {} dollars"\nprint(txt.format(price))' }
                    ],
                    exercise: { question: 'Which modifier is used to format a number as a fixed-point number with two decimals?', options: [':2', ':.2f', ':f2'], answer: 1 }
                },
                {
                    id: 'string-formatting-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a variable named <code>price</code> with the value <code>99</code>.',
                        'Use an <strong>f-string</strong> to create a variable named <code>formatted_price</code>.',
                        'The string should be <code>"The cost is 99.00 dollars"</code> (use the <code>:.2f</code> modifier).',
                        'Print the <code>formatted_price</code> variable.'
                    ],
                    starterCode: 'price = 99\n\n# Create f-string with 2 decimals\n\n\n# Print the result\n\n',
                    solution: 'price = 99\nformatted_price = f"The cost is {price:.2f} dollars"\nprint(formatted_price)',
                    content: `<p>Practice formatting numbers within strings using Python f-strings!</p>`
                }
            ]
        },

        /* ────── 33. Python None ────── */
        {
            id: 'none', title: 'Python None',
            sections: [
                {
                    id: 'none-basics', title: 'None',
                    content: `<p>The <code>None</code> keyword is used to define a null value, or no value at all.</p>
<p><code>None</code> is not the same as 0, False, or an empty string. <code>None</code> is a data type of its own (NoneType) and only <code>None</code> can be <code>None</code>.</p>
<h3>Testing for None</h3>
<p>The most idiomatic way to check if a variable is <code>None</code> is to use the <code>is</code> operator:</p>
<pre>x = None

if x is None:
  print("x is None")
else:
  print("x is not None")</pre>
<h3>Function Returns</h3>
<p>If a Python function does not have a <code>return</code> statement, it automatically returns <code>None</code>.</p>`,
                    examples: [
                        { title: 'Testing for None', code: 'x = None\n\nif x is None:\n  print("Do you have a value? No.")\nelse:\n  print("Yes, I have a value")' },
                        { title: 'NoneType', code: 'x = None\nprint(type(x))' },
                        { title: 'Implicit return None', code: 'def my_func():\n  pass\n\nx = my_func()\nprint(x)' }
                    ],
                    exercise: { question: 'What is the data type of the None keyword?', options: ['null', 'void', 'NoneType'], answer: 2 }
                },
                {
                    id: 'none-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a function named <code>check_value</code> that takes one argument <code>val</code>.',
                        'If <code>val</code> is <code>None</code>, the function should return the string <code>"Empty"</code>.',
                        'Otherwise, it should return <code>"Full"</code>.',
                        'Test your function by calling it with <code>None</code> and printing the result.'
                    ],
                    starterCode: 'def check_value(val):\n    # Add logic here\n\n\n# Test with None\nprint(check_value(None))',
                    solution: 'def check_value(val):\n    if val is None:\n        return "Empty"\n    return "Full"\n\nprint(check_value(None))',
                    content: `<p>Practice handling and testing for None in Python functions!</p>`
                }
            ]
        },

        /* ────── 34. Python User Input ────── */
        {
            id: 'user_input', title: 'Python User Input',
            sections: [
                {
                    id: 'user-input-basics', title: 'User Input',
                    content: `<p>Python allows for user input. That means we are able to ask the user for input.</p>
<p>The method is a bit different in Python 3.6 than Python 2.7.</p>
<p>Python 3.6 uses the <code>input()</code> method.</p>
<p>Python 2.7 uses the <code>raw_input()</code> method.</p>
<h3>The input() Function</h3>
<p>The <code>input()</code> function allows user input. It takes an optional string argument that will be displayed to the user before the input is requested.</p>
<pre>username = input("Enter username:")
print("Username is: " + username)</pre>`,
                    examples: [
                        { title: 'Ask for name', code: 'name = input("What is your name? ")\nprint("Hello, " + name)' },
                        { title: 'Numerical input', code: '# Input always returns a string. Cast it to int/float for math:\nage = int(input("Enter age: "))\nprint(f"Next year you will be {age + 1}")' }
                    ],
                    exercise: { question: 'Which function is used to get user input in Python 3?', options: ['get()', 'input()', 'raw_input()'], answer: 1 }
                },
                {
                    id: 'user-input-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'This is a simulation. You cannot actually provide interactive input here, but you can write the code.',
                        'Write a script that asks the user for their favorite color using <code>input()</code>.',
                        'Assign the result to a variable named <code>color</code>.',
                        'Print <code>"Your favorite color is "</code> followed by the color.'
                    ],
                    starterCode: '# Ask for favorite color\n\n\n# Print the result\n\n',
                    solution: 'color = input("Enter favorite color: ")\nprint("Your favorite color is " + color)',
                    content: `<p>Practice using the input function to interact with users!</p>`
                }
            ]
        },

        /* ────── 35. Python VirtualEnv ────── */
        {
            id: 'virtualenv', title: 'Python VirtualEnv',
            sections: [
                {
                    id: 'virtualenv-basics', title: 'VirtualEnv',
                    content: `<p>A Virtual Environment is an isolated environment for Python projects. This means that each project can have its own dependencies, regardless of what dependencies every other project has.</p>
<h3>Why use a Virtual Environment?</h3>
<p>Imagine you have two projects. Project A needs version 1.0 of a library, and Project B needs version 2.0. If you install version 2.0 globally, Project A might break. Virtual environments solve this.</p>
<h3>Creating a Virtual Environment</h3>
<p>Python has a built-in module called <code>venv</code>:</p>
<pre>python -m venv myenv</pre>
<h3>Activating the Environment</h3>
<p>Once created, you must "activate" it:</p>
<ul>
  <li><strong>Windows:</strong> <code>myenv\\Scripts\\activate</code></li>
  <li><strong>Mac/Linux:</strong> <code>source myenv/bin/activate</code></li>
</ul>`,
                    examples: [
                        { title: 'Create environment', code: '# In your terminal:\npython -m venv .venv' },
                        { title: 'Deactivate', code: '# To exit the environment, simply type:\ndeactivate' }
                    ],
                    exercise: { question: 'Which built-in module is used to create virtual environments in Python?', options: ['env', 'venv', 'virtual'], answer: 1 }
                },
                {
                    id: 'virtualenv-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'This is a theoretical challenge.',
                        'Print the exact command used to create a virtual environment named <code>my_project_env</code> using the <code>venv</code> module.'
                    ],
                    starterCode: '# Print the command to create the environment\n',
                    solution: 'print("python -m venv my_project_env")',
                    content: `<p>Check your knowledge of virtual environment commands!</p>`
                }
            ]
        },

        /* ────── 36. Python Classes (Header) ────── */
        {
            id: 'classes_header', title: 'Python Classes', isHeader: true,
            sections: []
        },

        /* ────── 37. Python OOP (Header) ────── */
        {
            id: 'oop_header', title: 'Python OOP', isHeader: true,
            sections: []
        },

        /* ────── 38. Python Classes/Objects ────── */
        {
            id: 'classes_objects', title: 'Python Classes/Objects',
            sections: [
                {
                    id: 'classes-oop-intro', title: 'Python OOP',
                    content: `
                        <p>Python is an object oriented programming language.</p>
                        <p>Almost everything in Python is an object, with its properties and methods.</p>
                        <p>A Class is like an object constructor, or a "blueprint" for creating objects.</p>
                        <h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Object-Oriented Programming (OOP)</h2>
                        <p>OOP is a programming paradigm that provides a means of structuring programs so that properties and behaviors are bundled into individual <strong>objects</strong>.</p>
                    `,
                },
                {
                    id: 'classes-objects-basics', title: 'Classes/Objects',
                    content: '<p>To create a class, use the keyword <code>class</code>:</p><pre>class MyClass:\n  x = 5</pre><p>Now we can use the class named MyClass to create objects:</p><pre>p1 = MyClass()\nprint(p1.x)</pre>',
                    examples: [
                        { title: 'Create an object', code: 'class MyClass:\n  x = 5\n\np1 = MyClass()\nprint(p1.x)' }
                    ],
                    exercise: { question: 'What keyword is used to create a class?', options: ['className', 'class', 'struct'], answer: 1 }
                },
                {
                    id: 'classes-objects-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a class named <code>Car</code> with a property named <code>brand</code> set to <code>"Ford"</code>.',
                        'Create an object of that class named <code>my_car</code>.',
                        'Print the <code>brand</code> of the <code>my_car</code> object.'
                    ],
                    starterCode: '# Create Class\n\n\n# Create Object\n\n\n# Print brand\n',
                    solution: 'class Car:\n    brand = "Ford"\n\nmy_car = Car()\nprint(my_car.brand)',
                    content: `<p>Practice creating your first Python class and object!</p>`
                }
            ]
        },
        /* ────── 39. Python __init__ Method ────── */
        {
            id: 'init_method', title: 'Python __init__ Method',
            sections: [
                {
                    id: 'init-basics', title: '__init__ Method',
                    content: `<p>All classes have a function called <code>__init__()</code>, which is always executed when the class is being initiated.</p>
<p>Use the <code>__init__()</code> function to assign values to object properties, or other operations that are necessary to do when the object is being created:</p>`,
                    examples: [
                        {
                            title: 'Example',
                            code: 'class Person:\n  def __init__(self, name, age):\n    self.name = name\n    self.age = age\n\np1 = Person("John", 36)\n\nprint(p1.name)\nprint(p1.age)',
                            preContent: '<p>Create a class named Person, use the __init__() function to assign values for name and age:</p>'
                        }
                    ],
                    exercise: { question: 'What is the name of the function that is always executed when a class is initiated?', options: ['__start__()', '__init__()', '__main__()', 'init()'], answer: 1 }
                },
                {
                    id: 'init-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a class named <code>Car</code>.',
                        'Use the <code>__init__()</code> function to assign values for <code>brand</code> and <code>model</code>.',
                        'Create an object named <code>my_car</code> with brand <code>"Toyota"</code> and model <code>"Camry"</code>.',
                        'Print both properties of the <code>my_car</code> object.'
                    ],
                    starterCode: 'class Car:\n    # Define __init__ method\n\n\n# Create object\n\n\n# Print properties\n',
                    solution: 'class Car:\n    def __init__(self, brand, model):\n        self.brand = brand\n        self.model = model\n\nmy_car = Car("Toyota", "Camry")\nprint(my_car.brand)\nprint(my_car.model)',
                    content: `<p>Practice using the __init__ method in Python classes!</p>`
                }
            ]
        },
        /* ────── 40. Python self Parameter ────── */
        {
            id: 'self_parameter', title: 'Python self Parameter',
            sections: [
                {
                    id: 'self-basics', title: 'self Parameter',
                    content: `<p>The <code>self</code> parameter is a reference to the current instance of the class, and is used to access variables that belong to the class.</p>
<p>It does not have to be named <code>self</code>, you can call it whatever you like, but it has to be the <b>first parameter</b> of any function in the class:</p>`,
                    examples: [
                        {
                            title: 'Example',
                            code: 'class Person:\n  def __init__(mysillyobject, name, age):\n    mysillyobject.name = name\n    mysillyobject.age = age\n\n  def myfunc(abc):\n    print("Hello my name is " + abc.name)\n\np1 = Person("John", 36)\np1.myfunc()',
                            preContent: '<p>Use the words <code>mysillyobject</code> and <code>abc</code> instead of <code>self</code>:</p>'
                        }
                    ],
                    exercise: { question: 'Does the self parameter have to be named "self"?', options: ['Yes', 'No', 'Only in the __init__ method'], answer: 1 }
                },
                {
                    id: 'self-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a class named <code>Person</code>.',
                        'Use the <code>__init__()</code> function to assign values for <code>name</code>.',
                        'Add a method named <code>greet</code> that prints <code>"Hello, my name is "</code> followed by the name.',
                        'Create an object named <code>p1</code> and call the <code>greet</code> method.'
                    ],
                    starterCode: 'class Person:\n    # Define __init__ and greet methods\n\n\n# Create object and call greet\n',
                    solution: 'class Person:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        print("Hello, my name is " + self.name)\n\np1 = Person("Alice")\np1.greet()',
                    content: `<p>Practice using the self parameter to access instance variables!</p>`
                }
            ]
        },
        /* ────── 41. Python Class Properties ────── */
        {
            id: 'class_properties', title: 'Python Class Properties',
            sections: [
                {
                    id: 'class-properties-basics', title: 'Class Properties',
                    content: `<p>Properties in Python are variables that belong to an object or a class.</p>
<p>You can modify properties on objects like this:</p>
<pre>p1.age = 40</pre>
<p>You can also delete properties on objects by using the <code>del</code> keyword:</p>
<pre>del p1.age</pre>
<p>And you can delete objects by using the <code>del</code> keyword:</p>
<pre>del p1</pre>`,
                    examples: [
                        {
                            title: 'Modify Object Properties',
                            code: 'class Person:\n  def __init__(self, name, age):\n    self.name = name\n    self.age = age\n\np1 = Person("John", 36)\n\np1.age = 40\n\nprint(p1.age)',
                            preContent: '<p>Set the age of p1 to 40:</p>'
                        },
                        {
                            title: 'Delete Object Properties',
                            code: 'class Person:\n  def __init__(self, name, age):\n    self.name = name\n    self.age = age\n\np1 = Person("John", 36)\n\ndel p1.age\n\nprint(p1.age)',
                            variant: 'error',
                            staticResult: "AttributeError: 'Person' object has no attribute 'age'",
                            preContent: '<p>Delete the age property from the p1 object:</p>'
                        }
                    ],
                    exercise: { question: 'What keyword is used to delete a property from an object?', options: ['remove', 'delete', 'del'], answer: 2 }
                },
                {
                    id: 'class-properties-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a class named <code>Vehicle</code> with a property <code>speed</code> set to <code>100</code>.',
                        'Create an object named <code>v1</code>.',
                        'Modify the <code>speed</code> property of <code>v1</code> to <code>150</code>.',
                        'Print the <code>speed</code> of <code>v1</code>.',
                        'Delete the <code>speed</code> property of <code>v1</code>.'
                    ],
                    starterCode: 'class Vehicle:\n    speed = 100\n\n# Create object, modify, print, and delete property\n',
                    solution: 'class Vehicle:\n    speed = 100\n\nv1 = Vehicle()\nv1.speed = 150\nprint(v1.speed)\ndel v1.speed',
                    content: `<p>Practice modifying and deleting class properties!</p>`
                }
            ]
        },
        /* ────── 42. Python Class Methods ────── */
        {
            id: 'class_methods', title: 'Python Class Methods',
            sections: [
                {
                    id: 'class-methods-basics', title: 'Class Methods',
                    content: `<p>Objects can also contain methods. Methods in objects are functions that belong to the object.</p>
<p>Let us create a method in the Person class:</p>`,
                    examples: [
                        {
                            title: 'Example',
                            code: 'class Person:\n  def __init__(self, name, age):\n    self.name = name\n    self.age = age\n\n  def myfunc(self):\n    print("Hello my name is " + self.name)\n\np1 = Person("John", 36)\np1.myfunc()',
                            preContent: '<p>Insert a function that prints a greeting, and execute it on the p1 object:</p>',
                            postContent: '<p><strong>Note:</strong> The <code>self</code> parameter is a reference to the current instance of the class, and is used to access variables that belong to the class.</p>'
                        }
                    ],
                    exercise: { question: 'What are functions called when they are defined inside a class?', options: ['Attributes', 'Methods', 'Procedures'], answer: 1 }
                },
                {
                    id: 'class-methods-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a class named <code>Square</code>.',
                        'Use the <code>__init__</code> method to set a property named <code>side</code>.',
                        'Create a method named <code>area</code> that calculates and returns the area (side * side).',
                        'Create an object named <code>s1</code> with side <code>5</code>.',
                        'Print the result of <code>s1.area()</code>.'
                    ],
                    starterCode: 'class Square:\n    # Define __init__ and area methods\n\n\n# Create object and print area\n',
                    solution: 'class Square:\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side * self.side\n\ns1 = Square(5)\nprint(s1.area())',
                    content: `<p>Practice defining and calling methods within a class!</p>`
                }
            ]
        },

        /* ────── 43. Python Inheritance ────── */
        {
            id: 'inheritance', title: 'Python Inheritance',
            sections: [
                {
                    id: 'inheritance-basics', title: 'Inheritance',
                    content: `<p>Inheritance allows us to define a class that inherits all the methods and properties from another class.</p>
<p><strong>Parent class</strong> is the class being inherited from, also called base class.</p>
<p><strong>Child class</strong> is the class that inherits from another class, also called derived class.</p>
<h3>Create a Parent Class</h3>
<p>Any class can be a parent class, so the syntax is the same as creating any other class:</p>
<pre>class Person:
  def __init__(self, fname, lname):
    self.firstname = fname
    self.lastname = lname

  def printname(self):
    print(self.firstname, self.lastname)</pre>`,
                    examples: [
                        { title: 'Create a Child Class', code: 'class Person:\n  def __init__(self, fname, lname):\n    self.firstname = fname\n    self.lastname = lname\n  def printname(self):\n    print(self.firstname, self.lastname)\n\nclass Student(Person):\n  pass\n\nx = Student("Mike", "Olsen")\nx.printname()' }
                    ],
                    exercise: { question: 'What is the correct syntax to create a class named Student that inherits from a class named Person?', options: ['class Student(Person):', 'class Student inherit Person:', 'class Student : Person:'], answer: 0 }
                },
                {
                    id: 'inheritance-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a class named <code>Animal</code> with a method <code>speak</code> that prints <code>"Animal speaks"</code>.',
                        'Create a class named <code>Dog</code> that inherits from <code>Animal</code>.',
                        'Create an object of <code>Dog</code> and call the <code>speak</code> method.'
                    ],
                    starterCode: 'class Animal:\n    def speak(self):\n        print("Animal speaks")\n\n# Create Dog class\n\n\n# Create object and call speak\n',
                    solution: 'class Animal:\n    def speak(self):\n        print("Animal speaks")\n\nclass Dog(Animal):\n    pass\n\nmy_dog = Dog()\nmy_dog.speak()',
                    content: `<p>Practice basic inheritance in Python!</p>`
                }
            ]
        },

        /* ────── 44. Python Polymorphism ────── */
        {
            id: 'polymorphism', title: 'Python Polymorphism',
            sections: [
                {
                    id: 'polymorphism-basics', title: 'Polymorphism',
                    content: `<p>The word "polymorphism" means "many forms", and in programming it refers to methods/functions/operators with the same name that can be executed on many objects or types.</p>
<h3>Function Polymorphism</h3>
<p>An example of a Python function that can be used on different objects is the <code>len()</code> function.</p>`,
                    examples: [
                        { title: 'len() with String', code: 'x = "Hello World!"\nprint(len(x))' },
                        { title: 'len() with List', code: 'mytuple = ("apple", "banana", "cherry")\nprint(len(mytuple))' }
                    ],
                    exercise: { question: 'What does "polymorphism" mean in Greek?', options: ['Many forms', 'Single form', 'Changing types'], answer: 0 }
                },
                {
                    id: 'polymorphism-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create two classes: <code>Cat</code> and <code>Dog</code>.',
                        'Both should have a method named <code>sound</code>.',
                        '<code>Cat.sound()</code> should print <code>"Meow"</code>.',
                        '<code>Dog.sound()</code> should print <code>"Woof"</code>.',
                        'Loop through a list containing both objects and call the <code>sound()</code> method on each.'
                    ],
                    starterCode: 'class Cat:\n    def sound(self):\n        print("Meow")\n\n# Add Dog class\n\n\n# Create list and loop\n',
                    solution: 'class Cat:\n    def sound(self):\n        print("Meow")\n\nclass Dog:\n    def sound(self):\n        print("Woof")\n\nfor animal in [Cat(), Dog()]:\n    animal.sound()',
                    content: `<p>Practice polymorphism by using the same method name on different classes!</p>`
                }
            ]
        },

        /* ────── 45. Python Encapsulation ────── */
        {
            id: 'encapsulation', title: 'Python Encapsulation',
            sections: [
                {
                    id: 'encapsulation-basics', title: 'Encapsulation',
                    content: `<p>Encapsulation is one of the fundamental concepts in object-oriented programming (OOP). It describes the idea of wrapping data and the methods that work on data within one unit. This puts restrictions on accessing variables and methods directly and can prevent the accidental modification of data.</p>
<h3>Private Members</h3>
<p>To define a private member, prefix the name with double underscores <code>__</code>:</p>
<pre>class Car:
    def __init__(self):
        self.__max_speed = 200 # Private attribute</pre>
<h3>Protected Members</h3>
<p>Protected members are prefixed with a single underscore <code>_</code>. It is a convention to indicate that they should not be accessed outside the class (though Python doesn't strictly enforce this):</p>
<pre>self._speed = 100 # Protected attribute</pre>`,
                    examples: [
                        { title: 'Private Attribute', code: 'class Computer:\n    def __init__(self):\n        self.__maxprice = 900\n\n    def sell(self):\n        print("Selling Price: {}".format(self.__maxprice))\n\n    def setMaxPrice(price):\n        self.__maxprice = price\n\nc = Computer()\nc.sell()\n\n# change the price\nc.__maxprice = 1000\nc.sell()' }
                    ],
                    exercise: { question: 'How do you define a private member in a Python class?', options: ['Prefix with _', 'Prefix with __', 'Use private keyword'], answer: 1 }
                },
                {
                    id: 'encapsulation-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create a class named <code>BankAccount</code>.',
                        'Use <code>__init__</code> to set a private attribute <code>__balance</code> to <code>0</code>.',
                        'Create a method <code>deposit(amount)</code> that adds the amount to <code>__balance</code>.',
                        'Create a method <code>get_balance()</code> that returns the current <code>__balance</code>.',
                        'Create an object, deposit <code>100</code>, and print the balance using <code>get_balance()</code>.'
                    ],
                    starterCode: 'class BankAccount:\n    # Define __init__, deposit, and get_balance\n\n\n# Create object, deposit 100, and print balance\n',
                    solution: 'class BankAccount:\n    def __init__(self):\n        self.__balance = 0\n    def deposit(self, amount):\n        self.__balance += amount\n    def get_balance(self):\n        return self.__balance\n\nacc = BankAccount()\nacc.deposit(100)\nprint(acc.get_balance())',
                    content: `<p>Practice encapsulation by creating a BankAccount class with a private balance!</p>`
                }
            ]
        },

        /* ────── 46. Python Inner Classes ────── */
        {
            id: 'inner_classes', title: 'Python Inner Classes',
            sections: [
                {
                    id: 'inner-classes-basics', title: 'Inner Classes',
                    content: `<p>An inner class or nested class is a class defined inside another class. In Python, this is possible and can be used to logically group classes that are only used in one place, or to increase encapsulation.</p>
<h3>Defining an Inner Class</h3>
<p>To define an inner class, simply place another <code>class</code> definition inside the body of the outer class:</p>
<pre>class Outer:
    def __init__(self):
        self.inner = self.Inner()

    class Inner:
        def display(self):
            print("This is the inner class")</pre>
<h3>Why Use Inner Classes?</h3>
<ul>
    <li>Building more readable and maintainable code.</li>
    <li>Logically grouping classes that only belong together.</li>
    <li>Increased encapsulation.</li>
</ul>`,
                    examples: [
                        { title: 'Accessing Inner Class', code: 'class Student:\n    def __init__(self, name, rollno):\n        self.name = name\n        self.rollno = rollno\n        self.lap = self.Laptop()\n\n    class Laptop:\n        def __init__(self):\n            self.brand = "HP"\n            self.cpu = "i5"\n\ns1 = Student("John", 2)\nprint(s1.lap.brand)' }
                    ],
                    exercise: { question: 'Can you define a class inside another class in Python?', options: ['Yes', 'No', 'Only inside the __init__ method'], answer: 0 }
                },
                {
                    id: 'inner-classes-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Create an outer class named <code>Zoo</code>.',
                        'Inside <code>Zoo</code>, create an inner class named <code>Animal</code>.',
                        'The <code>Animal</code> class should have a method <code>identify()</code> that prints <code>"I am an animal in the zoo"</code>.',
                        'In the <code>Zoo</code> class constructor, create an instance of <code>Animal</code> and assign it to <code>self.animal</code>.',
                        'Create a <code>Zoo</code> object and call <code>identify()</code> through the <code>animal</code> attribute.'
                    ],
                    starterCode: 'class Zoo:\n    # Define __init__ and Inner class Animal\n\n\n# Create Zoo object and call identify\n',
                    solution: 'class Zoo:\n    def __init__(self):\n        self.animal = self.Animal()\n    class Animal:\n        def identify(self):\n            print("I am an animal in the zoo")\n\nmy_zoo = Zoo()\nmy_zoo.animal.identify()',
                    content: `<p>Practice creating and accessing inner classes in Python!</p>`
                }
            ]
        },

        /* ────── 47. File Handling (Header) ────── */
        {
            id: 'file_handling_header', title: 'File Handling', isHeader: true,
            sections: []
        },

        /* ────── 48. Python File Handling ────── */
        {
            id: 'file_handling', title: 'Python File Handling',
            sections: [
                {
                    id: 'file-handling-basics', title: 'File Handling',
                    content: `<p>File handling is an important part of any web application. Python has several functions for creating, reading, updating, and deleting files.</p>
<h3>The open() Function</h3>
<p>The key function for working with files in Python is the <code>open()</code> function.</p>
<p>The <code>open()</code> function takes two parameters; <strong>filename</strong>, and <strong>mode</strong>.</p>
<p>There are four different methods (modes) for opening a file:</p>
<ul>
    <li><code>"r"</code> - <strong>Read</strong> - Default value. Opens a file for reading, error if the file does not exist</li>
    <li><code>"a"</code> - <strong>Append</strong> - Opens a file for appending, creates the file if it does not exist</li>
    <li><code>"w"</code> - <strong>Write</strong> - Opens a file for writing, creates the file if it does not exist</li>
    <li><code>"x"</code> - <strong>Create</strong> - Creates the specified file, returns an error if the file exists</li>
</ul>`,
                    examples: [
                        { title: 'Open for Reading', code: 'f = open("demofile.txt", "r")' }
                    ],
                    exercise: { question: 'Which function is used to open a file in Python?', options: ['openFile()', 'open()', 'file()'], answer: 1 }
                }
            ]
        },

        /* ────── 49. Python Read Files ────── */
        {
            id: 'file_read', title: 'Python Read Files',
            sections: [
                {
                    id: 'file-read-basics', title: 'Read Files',
                    content: `<p>To open the file, use the built-in <code>open()</code> function.</p>
<p>The <code>open()</code> function returns a file object, which has a <code>read()</code> method for reading the content of the file:</p>
<pre>f = open("demofile.txt", "r")
print(f.read())</pre>
<p>If the file is located in a different location, you will have to specify the file path.</p>
<h3>Read Only Parts of the File</h3>
<p>By default the <code>read()</code> method returns the whole text, but you can also specify how many characters you want to return:</p>
<pre>print(f.read(5)) # Reads first 5 characters</pre>`,
                    examples: [
                        { title: 'Read Line', code: 'f = open("demofile.txt", "r")\nprint(f.readline())\nf.close()' }
                    ],
                    exercise: { question: 'What method is used to read the entire content of a file?', options: ['getText()', 'read()', 'getContent()'], answer: 1 }
                },
                {
                    id: 'file-read-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'This is a theoretical challenge.',
                        'Print the command to open a file named <code>"data.txt"</code> in read mode and store it in variable <code>f</code>.',
                        'Then print the command to read only the first 10 characters.'
                    ],
                    starterCode: '# write your code here\n',
                    solution: 'print(\'f = open("data.txt", "r")\')\nprint(\'f.read(10)\')',
                    content: `<p>Practice the syntax for reading files!</p>`
                }
            ]
        },

        /* ────── 50. Python Write/Create Files ────── */
        {
            id: 'file_write', title: 'Python Write/Create Files',
            sections: [
                {
                    id: 'file-write-basics', title: 'Write/Create Files',
                    content: `<p>To write to an existing file, you must add a parameter to the <code>open()</code> function:</p>
<ul>
    <li><code>"a"</code> - <strong>Append</strong> - will append to the end of the file</li>
    <li><code>"w"</code> - <strong>Write</strong> - will overwrite any existing content</li>
</ul>
<h3>Example: Overwrite content</h3>
<pre>f = open("demofile3.txt", "w")
f.write("Woops! I have deleted the content!")
f.close()</pre>`,
                    examples: [
                        { title: 'Append content', code: 'f = open("demofile2.txt", "a")\nf.write("Now the file has more content!")\nf.close()' }
                    ],
                    exercise: { question: 'Which mode will overwrite existing content in a file?', options: ['"a"', '"w"', '"r"'], answer: 1 }
                },
                {
                    id: 'file-write-challenge', title: 'Code Challenge',
                    type: 'challenge',
                    instructions: [
                        'Assuming you have a file object <code>f</code> opened in write mode.',
                        'Write the string <code>"TezCode is Awesome!"</code> to the file.',
                        'Close the file.'
                    ],
                    starterCode: 'f = open("note.txt", "w")\n# Write and close\n',
                    solution: 'f = open("note.txt", "w")\nf.write("TezCode is Awesome!")\nf.close()',
                    content: `<p>Practice writing content to a file!</p>`
                }
            ]
        },

        /* ────── 51. Python Delete Files ────── */
        {
            id: 'file_delete', title: 'Python Delete Files',
            sections: [
                {
                    id: 'file-delete-basics', title: 'Delete Files',
                    content: `<p>To delete a file, you must import the OS module, and run its <code>os.remove()</code> function:</p>
<pre>import os
os.remove("demofile.txt")</pre>
<h3>Check if File exist:</h3>
<p>To avoid getting an error, you might want to check if the file exists before you try to delete it:</p>
<pre>import os
if os.path.exists("demofile.txt"):
  os.remove("demofile.txt")
else:
  print("The file does not exist")</pre>`,
                    examples: [
                        { title: 'Delete Folder', code: 'import os\nos.rmdir("myfolder")' }
                    ],
                    exercise: { question: 'Which module is needed to delete files in Python?', options: ['sys', 'fs', 'os'], answer: 2 }
                }
            ]
        },

        /* ────── 52. Python Modules (Header) ────── */
        {
            id: 'python_modules_header', title: 'Python Modules', isHeader: true,
            sections: []
        },

        /* ────── 53. NumPy Tutorial ────── */
        {
            id: 'numpy_tutorial', title: 'NumPy Tutorial',
            sections: [
                {
                    id: 'numpy-basics', title: 'NumPy Tutorial',
                    content: `<p>NumPy is a Python library used for working with arrays.</p>
<p>It also has functions for working in domain of linear algebra, fourier transform, and matrices.</p>
<p>NumPy was created in 2005 by Travis Oliphant. It is an open source project and you can use it freely.</p>
<h3>Import NumPy</h3>
<p>Once NumPy is installed, import it in your applications by adding the <code>import</code> keyword:</p>
<pre>import numpy</pre>`,
                    examples: [
                        { title: 'Create NumPy Array', code: 'import numpy as np\n\narr = np.array([1, 2, 3, 4, 5])\n\nprint(arr)' }
                    ],
                    exercise: { question: 'What does NumPy primarily work with?', options: ['Lists', 'Arrays', 'Sets'], answer: 1 }
                }
            ]
        },

        /* ────── 54. Pandas Tutorial ────── */
        {
            id: 'pandas_tutorial', title: 'Pandas Tutorial',
            sections: [
                {
                    id: 'pandas-basics', title: 'Pandas Tutorial',
                    content: `<p>Pandas is a Python library used for working with data sets.</p>
<p>It has functions for analyzing, cleaning, exploring, and manipulating data.</p>
<p>The name "Pandas" has a reference to both "Panel Data", and "Python Data Analysis".</p>
<h3>Import Pandas</h3>
<p>Once Pandas is installed, import it in your applications by adding the <code>import</code> keyword:</p>
<pre>import pandas</pre>`,
                    examples: [
                        { title: 'Create Pandas DataFrame', code: 'import pandas as pd\n\nmydataset = {\n  \'cars\': ["BMW", "Volvo", "Ford"],\n  \'passings\': [3, 7, 2]\n}\n\nmyvar = pd.DataFrame(mydataset)\n\nprint(myvar)' }
                    ],
                    exercise: { question: 'What is Pandas used for?', options: ['Working with HTML', 'Working with Data Sets', 'Styling web pages'], answer: 1 }
                }
            ]
        },

        /* ────── 55. SciPy Tutorial ────── */
        {
            id: 'scipy_tutorial', title: 'SciPy Tutorial',
            sections: [
                {
                    id: 'scipy-basics', title: 'SciPy Tutorial',
                    content: `<p>SciPy is a scientific computation library that uses NumPy underneath.</p>
<p>SciPy stands for Scientific Python.</p>
<p>It provides more utility functions for optimization, stats and signal processing.</p>
<h3>Import SciPy</h3>
<p>Once SciPy is installed, import the SciPy module(s) you want to use in your applications by adding the <code>from scipy import module</code> statement:</p>
<pre>from scipy import constants</pre>`,
                    examples: [
                        { title: 'SciPy Constants', code: 'from scipy import constants\n\nprint(constants.pi)' }
                    ],
                    exercise: { question: 'What does SciPy stand for?', options: ['Science Python', 'Scientific Python', 'Simple Python'], answer: 1 }
                }
            ]
        },

        /* ────── 56. Django Tutorial ────── */
        {
            id: 'django_tutorial', title: 'Django Tutorial',
            sections: [
                {
                    id: 'django-basics', title: 'Django Tutorial',
                    content: `<p>Django is a back-end server-side web framework.</p>
<p>Django is free, open source and written in Python.</p>
<p>Django makes it easier to build web pages using Python.</p>
<h3>What is Django?</h3>
<p>Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.</p>`,
                    examples: [
                        { title: 'Check Django Version', code: 'import django\nprint(django.get_version())' }
                    ],
                    exercise: { question: 'What type of framework is Django?', options: ['Front-end', 'Back-end', 'Database'], answer: 1 }
                }
            ]
        },

        /* ────── 57. Python Matplotlib (Header) ────── */
        {
            id: 'matplotlib_header', title: 'Python Matplotlib', isHeader: true,
            sections: []
        },

        /* ────── 58. Matplotlib Intro ────── */
        {
            id: 'matplotlib_intro', title: 'Matplotlib Intro',
            sections: [
                {
                    id: 'matplotlib-intro-basics', title: 'Matplotlib Intro',
                    content: `<p>Matplotlib is a low level graph plotting library in python that serves as a visualization utility.</p>
<p>Matplotlib was created by John D. Hunter.</p>
<p>Matplotlib is open source and we can use it freely.</p>
<p>Matplotlib is mostly written in python, a few segments are written in C, Objective-C and Javascript for Platform compatibility.</p>`,
                    examples: [
                        { title: 'Check Matplotlib Version', code: 'import matplotlib\nprint(matplotlib.__version__)' }
                    ],
                    exercise: { question: 'What is Matplotlib primarily used for?', options: ['Database Management', 'Graph Plotting', 'Web Development'], answer: 1 }
                }
            ]
        },

        /* ────── 59. Matplotlib Get Started ────── */
        {
            id: 'matplotlib_get_started', title: 'Matplotlib Get Started',
            sections: [
                {
                    id: 'matplotlib-get-started-basics', title: 'Matplotlib Get Started',
                    content: `<p>Once Matplotlib is installed, import it in your applications by adding the <code>import matplotlib</code> statement.</p>
<p>Usually, the <code>pyplot</code> submodule is imported under the alias <code>plt</code>:</p>
<pre>import matplotlib.pyplot as plt</pre>`,
                    examples: [
                        { title: 'Draw a Line', code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\nxpoints = np.array([0, 6])\nypoints = np.array([0, 250])\n\nplt.plot(xpoints, ypoints)\nplt.show()' }
                    ],
                    exercise: { question: 'What is the common alias used when importing matplotlib.pyplot?', options: ['mp', 'plt', 'plot'], answer: 1 }
                }
            ]
        },

        /* ────── 60. Matplotlib Pyplot ────── */
        {
            id: 'matplotlib_pyplot', title: 'Matplotlib Pyplot',
            sections: [
                {
                    id: 'matplotlib-pyplot-basics', title: 'Matplotlib Pyplot',
                    content: `<p>Most of the Matplotlib utilities lies under the <code>pyplot</code> submodule, and are usually imported under the <code>plt</code> alias.</p>
<pre>import matplotlib.pyplot as plt</pre>`,
                    examples: [
                        { title: 'Pyplot Plotting', code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\nxpoints = np.array([0, 6])\nypoints = np.array([0, 250])\n\nplt.plot(xpoints, ypoints)\nplt.show()' }
                    ],
                    exercise: { question: 'Which submodule of Matplotlib contains most of the utilities?', options: ['plotit', 'pyplot', 'graph'], answer: 1 }
                }
            ]
        },

        /* ────── 61. Matplotlib Plotting ────── */
        {
            id: 'matplotlib_plotting', title: 'Matplotlib Plotting',
            sections: [
                {
                    id: 'matplotlib-plotting-basics', title: 'Matplotlib Plotting',
                    content: `<p>The <code>plot()</code> function is used to draw points (markers) in a diagram.</p>
<p>By default, the <code>plot()</code> function draws a line from point to point.</p>
<p>The function takes parameters for specifying points in the diagram.</p>
<p>Parameter 1 is an array containing the points on the <strong>x-axis</strong>.</p>
<p>Parameter 2 is an array containing the points on the <strong>y-axis</strong>.</p>`,
                    examples: [
                        { title: 'Plotting Points', code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\nxpoints = np.array([1, 8])\nypoints = np.array([3, 10])\n\nplt.plot(xpoints, ypoints)\nplt.show()' }
                    ],
                    exercise: { question: 'Which function is used to draw points in a diagram in Pyplot?', options: ['draw()', 'plot()', 'line()'], answer: 1 }
                }
            ]
        },

        /* ────── 62. Matplotlib Markers ────── */
        {
            id: 'matplotlib_markers', title: 'Matplotlib Markers',
            sections: [
                {
                    id: 'matplotlib-markers-basics', title: 'Matplotlib Markers',
                    content: `<p>You can use the keyword argument <code>marker</code> to emphasize each point with a specified marker.</p>
<p>For example, use <code>marker = 'o'</code> to draw a circle at each point.</p>`,
                    examples: [
                        { title: 'Using a Marker', code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\nypoints = np.array([3, 8, 1, 10])\n\nplt.plot(ypoints, marker = \'o\')\nplt.show()' }
                    ],
                    exercise: { question: 'Which keyword argument is used to emphasize points in Pyplot?', options: ['point', 'marker', 'dot'], answer: 1 }
                }
            ]
        },

        /* ────── 63. Matplotlib Line ────── */
        {
            id: 'matplotlib_line', title: 'Matplotlib Line',
            sections: [
                {
                    id: 'matplotlib-line-basics', title: 'Matplotlib Line',
                    content: `<p>You can use the keyword argument <code>linestyle</code>, or shorter <code>ls</code>, to change the style of the plotted line.</p>
<p>For example, use <code>linestyle = 'dotted'</code> to draw a dotted line.</p>`,
                    examples: [
                        { title: 'Dotted Line', code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\nypoints = np.array([3, 8, 1, 10])\n\nplt.plot(ypoints, linestyle = \'dotted\')\nplt.show()' }
                    ],
                    exercise: { question: 'Which keyword argument changes the style of the line?', options: ['lineformat', 'linestyle', 'linewidth'], answer: 1 }
                }
            ]
        },

        /* ────── 64. Matplotlib Labels ────── */
        {
            id: 'matplotlib_labels', title: 'Matplotlib Labels',
            sections: [
                {
                    id: 'matplotlib-labels-basics', title: 'Matplotlib Labels',
                    content: `<p>With Pyplot, you can use the <code>xlabel()</code> and <code>ylabel()</code> functions to set a label for the x- and y-axis.</p>
<p>You can use the <code>title()</code> function to set a title for the plot.</p>`,
                    examples: [
                        { title: 'Add Labels and Title', code: 'import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.array([80, 85, 90, 95, 100, 105, 110, 115, 120, 125])\ny = np.array([240, 250, 260, 270, 280, 290, 300, 310, 320, 330])\n\nplt.plot(x, y)\n\nplt.title("Sports Watch Data")\nplt.xlabel("Average Pulse")\nplt.ylabel("Calorie Burnage")\n\nplt.show()' }
                    ],
                    exercise: { question: 'Which functions set labels for the axes?', options: ['SetX() and SetY()', 'xlabel() and ylabel()', 'axis_x() and axis_y()'], answer: 1 }
                }
            ]
        },

        /* ────── 65. Matplotlib Grid ────── */
        {
            id: 'matplotlib_grid', title: 'Matplotlib Grid',
            sections: [
                {
                    id: 'matplotlib-grid-basics', title: 'Matplotlib Grid',
                    content: `<p>With Pyplot, you can use the <code>grid()</code> function to add grid lines to the plot.</p>`,
                    examples: [
                        { title: 'Add Grid Lines', code: 'import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.array([80, 85, 90, 95, 100, 105, 110, 115, 120, 125])\ny = np.array([240, 250, 260, 270, 280, 290, 300, 310, 320, 330])\n\nplt.title("Sports Watch Data")\nplt.xlabel("Average Pulse")\nplt.ylabel("Calorie Burnage")\n\nplt.plot(x, y)\n\nplt.grid()\n\nplt.show()' }
                    ],
                    exercise: { question: 'Which function adds grid lines to a Matplotlib plot?', options: ['lines()', 'grid()', 'mesh()'], answer: 1 }
                }
            ]
        },

        /* ────── 66. Matplotlib Subplot ────── */
        {
            id: 'matplotlib_subplot', title: 'Matplotlib Subplot',
            sections: [
                {
                    id: 'matplotlib-subplot-basics', title: 'Matplotlib Subplot',
                    content: `<p>With the <code>subplot()</code> function you can draw multiple plots in one figure.</p>
<p>The <code>subplot()</code> function takes three arguments that describes the layout of the figure. The layout is organized in rows and columns, which are represented by the first and second argument. The third argument represents the index of the current plot.</p>`,
                    examples: [
                        { title: 'Draw Two Plots', code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\n#plot 1:\nx = np.array([0, 1, 2, 3])\ny = np.array([3, 8, 1, 10])\n\nplt.subplot(1, 2, 1)\nplt.plot(x,y)\n\n#plot 2:\nx = np.array([0, 1, 2, 3])\ny = np.array([10, 20, 30, 40])\n\nplt.subplot(1, 2, 2)\nplt.plot(x,y)\n\nplt.show()' }
                    ],
                    exercise: { question: 'What does the third argument in subplot(1, 2, 1) represent?', options: ['Index of current plot', 'Number of rows', 'Number of columns'], answer: 0 }
                }
            ]
        },

        /* ────── 67. Matplotlib Scatter ────── */
        {
            id: 'matplotlib_scatter', title: 'Matplotlib Scatter',
            sections: [
                {
                    id: 'matplotlib-scatter-basics', title: 'Matplotlib Scatter',
                    content: `<p>With Pyplot, you can use the <code>scatter()</code> function to draw a scatter plot.</p>
<p>The <code>scatter()</code> function plots one dot for each observation. It needs two arrays of the same length, one for the values of the x-axis, and one for values on the y-axis.</p>`,
                    examples: [
                        { title: 'Draw a Scatter Plot', code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])\ny = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])\n\nplt.scatter(x, y)\nplt.show()' }
                    ],
                    exercise: { question: 'Which function creates a scatter plot?', options: ['plot()', 'scatter()', 'dots()'], answer: 1 }
                }
            ]
        },

        /* ────── 68. Matplotlib Bars ────── */
        {
            id: 'matplotlib_bars', title: 'Matplotlib Bars',
            sections: [
                {
                    id: 'matplotlib-bars-basics', title: 'Matplotlib Bars',
                    content: `<p>With Pyplot, you can use the <code>bar()</code> function to draw bar graphs.</p>`,
                    examples: [
                        { title: 'Draw a Bar Graph', code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.array(["A", "B", "C", "D"])\ny = np.array([3, 8, 1, 10])\n\nplt.bar(x, y)\nplt.show()' }
                    ],
                    exercise: { question: 'Which function is used to draw a vertical bar graph?', options: ['bar_v()', 'bar()', 'column()'], answer: 1 }
                }
            ]
        },

        /* ────── 69. Matplotlib Histograms ────── */
        {
            id: 'matplotlib_histograms', title: 'Matplotlib Histograms',
            sections: [
                {
                    id: 'matplotlib-histograms-basics', title: 'Matplotlib Histograms',
                    content: `<p>A histogram is a graph showing frequency distributions.</p>
<p>It is a graph showing the number of observations within each given interval.</p>
<p>In Matplotlib, we use the <code>hist()</code> function to create histograms.</p>`,
                    examples: [
                        { title: 'Create a Histogram', code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.random.normal(170, 10, 250)\n\nplt.hist(x)\nplt.show()' }
                    ],
                    exercise: { question: 'What does a histogram show?', options: ['Linear relationships', 'Frequency distributions', 'Averages only'], answer: 1 }
                }
            ]
        },

        /* ────── 70. Matplotlib Pie Charts ────── */
        {
            id: 'matplotlib_pie_charts', title: 'Matplotlib Pie Charts',
            sections: [
                {
                    id: 'matplotlib-pie-charts-basics', title: 'Matplotlib Pie Charts',
                    content: `<p>With Pyplot, you can use the <code>pie()</code> function to draw pie charts.</p>`,
                    examples: [
                        { title: 'Draw a Pie Chart', code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\ny = np.array([35, 25, 25, 15])\n\nplt.pie(y)\nplt.show()' }
                    ],
                    exercise: { question: 'Which function creates a pie chart?', options: ['piechart()', 'pie()', 'circle()'], answer: 1 }
                }
            ]
        },

        /* ────── 71. Machine Learning (Header) ────── */
        {
            id: 'machine_learning_header', title: 'Machine Learning', isHeader: true,
            sections: []
        },

        /* ────── 72. Getting Started ────── */
        {
            id: 'ml_getting_started', title: 'Getting Started',
            sections: [
                {
                    id: 'ml-getting-started-basics', title: 'Getting Started',
                    content: `<p>Learn how to get started with Machine Learning in Python.</p>`
                }
            ]
        },

        /* ────── 73. Mean Median Mode ────── */
        {
            id: 'ml_mean_median_mode', title: 'Mean Median Mode',
            sections: [
                {
                    id: 'ml-mean-median-mode-basics', title: 'Mean Median Mode',
                    content: `<p>Learn about Mean, Median, and Mode in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 74. Standard Deviation ────── */
        {
            id: 'ml_standard_deviation', title: 'Standard Deviation',
            sections: [
                {
                    id: 'ml-standard-deviation-basics', title: 'Standard Deviation',
                    content: `<p>Learn about Standard Deviation in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 75. Percentile ────── */
        {
            id: 'ml_percentile', title: 'Percentile',
            sections: [
                {
                    id: 'ml-percentile-basics', title: 'Percentile',
                    content: `<p>Learn about Percentiles in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 76. Data Distribution ────── */
        {
            id: 'ml_data_distribution', title: 'Data Distribution',
            sections: [
                {
                    id: 'ml-data-distribution-basics', title: 'Data Distribution',
                    content: `<p>Learn about Data Distribution in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 77. Normal Data Distribution ────── */
        {
            id: 'ml_normal_data_distribution', title: 'Normal Data Distribution',
            sections: [
                {
                    id: 'ml-normal-data-distribution-basics', title: 'Normal Data Distribution',
                    content: `<p>Learn about Normal Data Distribution in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 78. Scatter Plot ────── */
        {
            id: 'ml_scatter_plot', title: 'Scatter Plot',
            sections: [
                {
                    id: 'ml-scatter-plot-basics', title: 'Scatter Plot',
                    content: `<p>Learn how to use Scatter Plots in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 79. Linear Regression ────── */
        {
            id: 'ml_linear_regression', title: 'Linear Regression',
            sections: [
                {
                    id: 'ml-linear-regression-basics', title: 'Linear Regression',
                    content: `<p>Learn about Linear Regression in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 80. Polynomial Regression ────── */
        {
            id: 'ml_polynomial_regression', title: 'Polynomial Regression',
            sections: [
                {
                    id: 'ml-polynomial-regression-basics', title: 'Polynomial Regression',
                    content: `<p>Learn about Polynomial Regression in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 81. Multiple Regression ────── */
        {
            id: 'ml_multiple_regression', title: 'Multiple Regression',
            sections: [
                {
                    id: 'ml-multiple-regression-basics', title: 'Multiple Regression',
                    content: `<p>Learn about Multiple Regression in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 82. Scale ────── */
        {
            id: 'ml_scale', title: 'Scale',
            sections: [
                {
                    id: 'ml-scale-basics', title: 'Scale',
                    content: `<p>Learn about Scaling in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 83. Train/Test ────── */
        {
            id: 'ml_train_test', title: 'Train/Test',
            sections: [
                {
                    id: 'ml-train-test-basics', title: 'Train/Test',
                    content: `<p>Learn about Train/Test evaluations in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 84. Decision Tree ────── */
        {
            id: 'ml_decision_tree', title: 'Decision Tree',
            sections: [
                {
                    id: 'ml-decision-tree-basics', title: 'Decision Tree',
                    content: `<p>Learn about Decision Trees in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 85. Confusion Matrix ────── */
        {
            id: 'ml_confusion_matrix', title: 'Confusion Matrix',
            sections: [
                {
                    id: 'ml-confusion-matrix-basics', title: 'Confusion Matrix',
                    content: `<p>Learn about Confusion Matrix in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 86. Hierarchical Clustering ────── */
        {
            id: 'ml_hierarchical_clustering', title: 'Hierarchical Clustering',
            sections: [
                {
                    id: 'ml-hierarchical-clustering-basics', title: 'Hierarchical Clustering',
                    content: `<p>Learn about Hierarchical Clustering in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 87. Logistic Regression ────── */
        {
            id: 'ml_logistic_regression', title: 'Logistic Regression',
            sections: [
                {
                    id: 'ml-logistic-regression-basics', title: 'Logistic Regression',
                    content: `<p>Learn about Logistic Regression in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 88. Grid Search ────── */
        {
            id: 'ml_grid_search', title: 'Grid Search',
            sections: [
                {
                    id: 'ml-grid-search-basics', title: 'Grid Search',
                    content: `<p>Learn about Grid Search in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 89. Categorical Data ────── */
        {
            id: 'ml_categorical_data', title: 'Categorical Data',
            sections: [
                {
                    id: 'ml-categorical-data-basics', title: 'Categorical Data',
                    content: `<p>Learn how to handle Categorical Data in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 90. K-means ────── */
        {
            id: 'ml_k_means', title: 'K-means',
            sections: [
                {
                    id: 'ml-k-means-basics', title: 'K-means',
                    content: `<p>Learn about K-means clustering in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 91. Bootstrap Aggregation ────── */
        {
            id: 'ml_bootstrap_aggregation', title: 'Bootstrap Aggregation',
            sections: [
                {
                    id: 'ml-bootstrap-aggregation-basics', title: 'Bootstrap Aggregation',
                    content: `<p>Learn about Bootstrap Aggregation (Bagging) in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 92. Cross Validation ────── */
        {
            id: 'ml_cross_validation', title: 'Cross Validation',
            sections: [
                {
                    id: 'ml-cross-validation-basics', title: 'Cross Validation',
                    content: `<p>Learn about Cross Validation in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 93. AUC - ROC Curve ────── */
        {
            id: 'ml_auc_roc_curve', title: 'AUC - ROC Curve',
            sections: [
                {
                    id: 'ml-auc-roc-curve-basics', title: 'AUC - ROC Curve',
                    content: `<p>Learn about AUC - ROC Curve in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 94. K-nearest neighbors ────── */
        {
            id: 'ml_k_nearest_neighbors', title: 'K-nearest neighbors',
            sections: [
                {
                    id: 'ml-k-nearest-neighbors-basics', title: 'K-nearest neighbors',
                    content: `<p>Learn about K-nearest neighbors (KNN) in Machine Learning.</p>`
                }
            ]
        },

        /* ────── 95. Python DSA (Header) ────── */
        {
            id: 'python_dsa_header', title: 'Python DSA', isHeader: true,
            sections: []
        },

        /* ────── 96. Python DSA ────── */
        {
            id: 'dsa_python_dsa', title: 'Python DSA',
            sections: [
                {
                    id: 'dsa-python-dsa-basics', title: 'Python DSA',
                    content: `<p>Learn Data Structures and Algorithms in Python.</p>`
                }
            ]
        },

        /* ────── 97. Lists and Arrays ────── */
        {
            id: 'dsa_lists_and_arrays', title: 'Lists and Arrays',
            sections: [
                {
                    id: 'dsa-lists-and-arrays-basics', title: 'Lists and Arrays',
                    content: `<p>Learn about Lists and Arrays in Python DSA.</p>`
                }
            ]
        },

        /* ────── 98. Stacks ────── */
        {
            id: 'dsa_stacks', title: 'Stacks',
            sections: [
                {
                    id: 'dsa-stacks-basics', title: 'Stacks',
                    content: `<p>Learn about Stacks in Python DSA.</p>`
                }
            ]
        },

        /* ────── 99. Queues ────── */
        {
            id: 'dsa_queues', title: 'Queues',
            sections: [
                {
                    id: 'dsa-queues-basics', title: 'Queues',
                    content: `<p>Learn about Queues in Python DSA.</p>`
                }
            ]
        },

        /* ────── 100. Linked Lists ────── */
        {
            id: 'dsa_linked_lists', title: 'Linked Lists',
            sections: [
                {
                    id: 'dsa-linked-lists-basics', title: 'Linked Lists',
                    content: `<p>Learn about Linked Lists in Python DSA.</p>`
                }
            ]
        },

        /* ────── 101. Hash Tables ────── */
        {
            id: 'dsa_hash_tables', title: 'Hash Tables',
            sections: [
                {
                    id: 'dsa-hash-tables-basics', title: 'Hash Tables',
                    content: `<p>Learn about Hash Tables in Python DSA.</p>`
                }
            ]
        },

        /* ────── 102. Trees ────── */
        {
            id: 'dsa_trees', title: 'Trees',
            sections: [
                {
                    id: 'dsa-trees-basics', title: 'Trees',
                    content: `<p>Learn about Trees in Python DSA.</p>`
                }
            ]
        },

        /* ────── 103. Binary Trees ────── */
        {
            id: 'dsa_binary_trees', title: 'Binary Trees',
            sections: [
                {
                    id: 'dsa-binary-trees-basics', title: 'Binary Trees',
                    content: `<p>Learn about Binary Trees in Python DSA.</p>`
                }
            ]
        },

        /* ────── 104. Binary Search Trees ────── */
        {
            id: 'dsa_binary_search_trees', title: 'Binary Search Trees',
            sections: [
                {
                    id: 'dsa-binary-search-trees-basics', title: 'Binary Search Trees',
                    content: `<p>Learn about Binary Search Trees in Python DSA.</p>`
                }
            ]
        },

        /* ────── 105. AVL Trees ────── */
        {
            id: 'dsa_avl_trees', title: 'AVL Trees',
            sections: [
                {
                    id: 'dsa-avl-trees-basics', title: 'AVL Trees',
                    content: `<p>Learn about AVL Trees in Python DSA.</p>`
                }
            ]
        },

        /* ────── 106. Graphs ────── */
        {
            id: 'dsa_graphs', title: 'Graphs',
            sections: [
                {
                    id: 'dsa-graphs-basics', title: 'Graphs',
                    content: `<p>Learn about Graphs in Python DSA.</p>`
                }
            ]
        },

        /* ────── 107. Linear Search ────── */
        {
            id: 'dsa_linear_search', title: 'Linear Search',
            sections: [
                {
                    id: 'dsa-linear-search-basics', title: 'Linear Search',
                    content: `<p>Learn about Linear Search algorithms in Python DSA.</p>`
                }
            ]
        },

        /* ────── 108. Binary Search ────── */
        {
            id: 'dsa_binary_search', title: 'Binary Search',
            sections: [
                {
                    id: 'dsa-binary-search-basics', title: 'Binary Search',
                    content: `<p>Learn about Binary Search algorithms in Python DSA.</p>`
                }
            ]
        },

        /* ────── 109. Bubble Sort ────── */
        {
            id: 'dsa_bubble_sort', title: 'Bubble Sort',
            sections: [
                {
                    id: 'dsa-bubble-sort-basics', title: 'Bubble Sort',
                    content: `<p>Learn about the Bubble Sort algorithm in Python DSA.</p>`
                }
            ]
        },

        /* ────── 110. Selection Sort ────── */
        {
            id: 'dsa_selection_sort', title: 'Selection Sort',
            sections: [
                {
                    id: 'dsa-selection-sort-basics', title: 'Selection Sort',
                    content: `<p>Learn about the Selection Sort algorithm in Python DSA.</p>`
                }
            ]
        },

        /* ────── 111. Insertion Sort ────── */
        {
            id: 'dsa_insertion_sort', title: 'Insertion Sort',
            sections: [
                {
                    id: 'dsa-insertion-sort-basics', title: 'Insertion Sort',
                    content: `<p>Learn about the Insertion Sort algorithm in Python DSA.</p>`
                }
            ]
        },

        /* ────── 112. Quick Sort ────── */
        {
            id: 'dsa_quick_sort', title: 'Quick Sort',
            sections: [
                {
                    id: 'dsa-quick-sort-basics', title: 'Quick Sort',
                    content: `<p>Learn about the Quick Sort algorithm in Python DSA.</p>`
                }
            ]
        },

        /* ────── 113. Counting Sort ────── */
        {
            id: 'dsa_counting_sort', title: 'Counting Sort',
            sections: [
                {
                    id: 'dsa-counting-sort-basics', title: 'Counting Sort',
                    content: `<p>Learn about the Counting Sort algorithm in Python DSA.</p>`
                }
            ]
        },

        /* ────── 114. Radix Sort ────── */
        {
            id: 'dsa_radix_sort', title: 'Radix Sort',
            sections: [
                {
                    id: 'dsa-radix-sort-basics', title: 'Radix Sort',
                    content: `<p>Learn about the Radix Sort algorithm in Python DSA.</p>`
                }
            ]
        },

        /* ────── 115. Merge Sort ────── */
        {
            id: 'dsa_merge_sort', title: 'Merge Sort',
            sections: [
                {
                    id: 'dsa-merge-sort-basics', title: 'Merge Sort',
                    content: `<p>Learn about the Merge Sort algorithm in Python DSA.</p>`
                }
            ]
        },

        /* ────── 116. Python MySQL (Header) ────── */
        {
            id: 'python_mysql_header', title: 'Python MySQL', isHeader: true,
            sections: []
        },

        /* ────── 117. MySQL Get Started ────── */
        {
            id: 'mysql_get_started', title: 'MySQL Get Started',
            sections: [
                {
                    id: 'mysql-get-started-basics', title: 'MySQL Get Started',
                    content: `<p>Learn how to connect Python to a MySQL database.</p>`
                }
            ]
        },

        /* ────── 118. MySQL Create Database ────── */
        {
            id: 'mysql_create_database', title: 'MySQL Create Database',
            sections: [
                {
                    id: 'mysql-create-database-basics', title: 'MySQL Create Database',
                    content: `<p>Learn how to create a MySQL database using Python.</p>`
                }
            ]
        },

        /* ────── 119. MySQL Create Table ────── */
        {
            id: 'mysql_create_table', title: 'MySQL Create Table',
            sections: [
                {
                    id: 'mysql-create-table-basics', title: 'MySQL Create Table',
                    content: `<p>Learn how to create MySQL tables using Python.</p>`
                }
            ]
        },

        /* ────── 120. MySQL Insert ────── */
        {
            id: 'mysql_insert', title: 'MySQL Insert',
            sections: [
                {
                    id: 'mysql-insert-basics', title: 'MySQL Insert',
                    content: `<p>Learn how to insert data into MySQL database using Python.</p>`
                }
            ]
        },

        /* ────── 121. MySQL Select ────── */
        {
            id: 'mysql_select', title: 'MySQL Select',
            sections: [
                {
                    id: 'mysql-select-basics', title: 'MySQL Select',
                    content: `<p>Learn how to query data from a MySQL database using Python.</p>`
                }
            ]
        },

        /* ────── 122. MySQL Where ────── */
        {
            id: 'mysql_where', title: 'MySQL Where',
            sections: [
                {
                    id: 'mysql-where-basics', title: 'MySQL Where',
                    content: `<p>Learn how to filter MySQL records using the WHERE clause in Python.</p>`
                }
            ]
        },

        /* ────── 123. MySQL Order By ────── */
        {
            id: 'mysql_order_by', title: 'MySQL Order By',
            sections: [
                {
                    id: 'mysql-order-by-basics', title: 'MySQL Order By',
                    content: `<p>Learn how to sort MySQL results using ORDER BY in Python.</p>`
                }
            ]
        },

        /* ────── 124. MySQL Delete ────── */
        {
            id: 'mysql_delete', title: 'MySQL Delete',
            sections: [
                {
                    id: 'mysql-delete-basics', title: 'MySQL Delete',
                    content: `<p>Learn how to delete records from a MySQL table using Python.</p>`
                }
            ]
        },

        /* ────── 125. MySQL Drop Table ────── */
        {
            id: 'mysql_drop_table', title: 'MySQL Drop Table',
            sections: [
                {
                    id: 'mysql-drop-table-basics', title: 'MySQL Drop Table',
                    content: `<p>Learn how to delete a table entirely in MySQL using Python.</p>`
                }
            ]
        },

        /* ────── 126. MySQL Update ────── */
        {
            id: 'mysql_update', title: 'MySQL Update',
            sections: [
                {
                    id: 'mysql-update-basics', title: 'MySQL Update',
                    content: `<p>Learn how to update existing records in a MySQL table using Python.</p>`
                }
            ]
        },

        /* ────── 127. MySQL Limit ────── */
        {
            id: 'mysql_limit', title: 'MySQL Limit',
            sections: [
                {
                    id: 'mysql-limit-basics', title: 'MySQL Limit',
                    content: `<p>Learn how to limit the number of records returned from MySQL.</p>`
                }
            ]
        },

        /* ────── 128. MySQL Join ────── */
        {
            id: 'mysql_join', title: 'MySQL Join',
            sections: [
                {
                    id: 'mysql-join-basics', title: 'MySQL Join',
                    content: `<p>Learn how to combine rows from two or more tables in MySQL.</p>`
                }
            ]
        },

        /* ────── 129. Python MongoDB (Header) ────── */
        {
            id: 'python_mongodb_header', title: 'Python MongoDB', isHeader: true,
            sections: []
        },

        /* ────── 130. MongoDB Get Started ────── */
        {
            id: 'mongodb_get_started', title: 'MongoDB Get Started',
            sections: [
                {
                    id: 'mongodb-get-started-basics', title: 'MongoDB Get Started',
                    content: `<p>Learn how to connect Python to a MongoDB database.</p>`
                }
            ]
        },

        /* ────── 131. MongoDB Create DB ────── */
        {
            id: 'mongodb_create_db', title: 'MongoDB Create DB',
            sections: [
                {
                    id: 'mongodb-create-db-basics', title: 'MongoDB Create DB',
                    content: `<p>Learn how to create a database in MongoDB using Python.</p>`
                }
            ]
        },

        /* ────── 132. MongoDB Collection ────── */
        {
            id: 'mongodb_collection', title: 'MongoDB Collection',
            sections: [
                {
                    id: 'mongodb-collection-basics', title: 'MongoDB Collection',
                    content: `<p>Learn how to create a collection (table) in MongoDB using Python.</p>`
                }
            ]
        },

        /* ────── 133. MongoDB Insert ────── */
        {
            id: 'mongodb_insert', title: 'MongoDB Insert',
            sections: [
                {
                    id: 'mongodb-insert-basics', title: 'MongoDB Insert',
                    content: `<p>Learn how to insert documents into a MongoDB collection using Python.</p>`
                }
            ]
        },

        /* ────── 134. MongoDB Find ────── */
        {
            id: 'mongodb_find', title: 'MongoDB Find',
            sections: [
                {
                    id: 'mongodb-find-basics', title: 'MongoDB Find',
                    content: `<p>Learn how to retrieve data from a MongoDB database using Python.</p>`
                }
            ]
        },

        /* ────── 135. MongoDB Query ────── */
        {
            id: 'mongodb_query', title: 'MongoDB Query',
            sections: [
                {
                    id: 'mongodb-query-basics', title: 'MongoDB Query',
                    content: `<p>Learn how to filter MongoDB results using queries in Python.</p>`
                }
            ]
        },

        /* ────── 136. MongoDB Sort ────── */
        {
            id: 'mongodb_sort', title: 'MongoDB Sort',
            sections: [
                {
                    id: 'mongodb-sort-basics', title: 'MongoDB Sort',
                    content: `<p>Learn how to sort MongoDB result sets.</p>`
                }
            ]
        },

        /* ────── 137. MongoDB Delete ────── */
        {
            id: 'mongodb_delete', title: 'MongoDB Delete',
            sections: [
                {
                    id: 'mongodb-delete-basics', title: 'MongoDB Delete',
                    content: `<p>Learn how to delete documents from a MongoDB collection.</p>`
                }
            ]
        },

        /* ────── 138. MongoDB Drop Collection ────── */
        {
            id: 'mongodb_drop_collection', title: 'MongoDB Drop Collection',
            sections: [
                {
                    id: 'mongodb-drop-collection-basics', title: 'MongoDB Drop Collection',
                    content: `<p>Learn how to delete a collection entirely in MongoDB.</p>`
                }
            ]
        },

        /* ────── 139. MongoDB Update ────── */
        {
            id: 'mongodb_update', title: 'MongoDB Update',
            sections: [
                {
                    id: 'mongodb-update-basics', title: 'MongoDB Update',
                    content: `<p>Learn how to update existing documents in MongoDB using Python.</p>`
                }
            ]
        },

        /* ────── 140. MongoDB Limit ────── */
        {
            id: 'mongodb_limit', title: 'MongoDB Limit',
            sections: [
                {
                    id: 'mongodb-limit-basics', title: 'MongoDB Limit',
                    content: `<p>Learn how to limit the number of documents returned from MongoDB.</p>`
                }
            ]
        },

        /* ────── 141. Python Reference (Header) ────── */
        {
            id: 'python_reference_header', title: 'Python Reference', isHeader: true,
            sections: []
        },

        /* ────── 142. Python Overview ────── */
        {
            id: 'python_overview', title: 'Python Overview',
            sections: [
                {
                    id: 'python-overview-basics', title: 'Python Overview',
                    content: `<p>Comprehensive overview of the Python reference materials.</p>`
                }
            ]
        },

        /* ────── 143. Python Built-in Functions ────── */
        {
            id: 'python_built_in_functions', title: 'Python Built-in Functions',
            sections: [
                {
                    id: 'python-built-in-functions-basics', title: 'Python Built-in Functions',
                    content: `<p>Reference guide to Python's built-in functions.</p>`
                }
            ]
        },

        /* ────── 144. Python String Methods ────── */
        {
            id: 'python_string_methods', title: 'Python String Methods',
            sections: [
                {
                    id: 'python-string-methods-basics', title: 'Python String Methods',
                    content: `<p>Reference guide to string methods in Python.</p>`
                }
            ]
        },

        /* ────── 145. Python List Methods ────── */
        {
            id: 'python_list_methods', title: 'Python List Methods',
            sections: [
                {
                    id: 'python-list-methods-basics', title: 'Python List Methods',
                    content: `<p>Reference guide to list methods in Python.</p>`
                }
            ]
        },

        /* ────── 146. Python Dictionary Methods ────── */
        {
            id: 'python_dictionary_methods', title: 'Python Dictionary Methods',
            sections: [
                {
                    id: 'python-dictionary-methods-basics', title: 'Python Dictionary Methods',
                    content: `<p>Reference guide to dictionary methods in Python.</p>`
                }
            ]
        },

        /* ────── 147. Python Tuple Methods ────── */
        {
            id: 'python_tuple_methods', title: 'Python Tuple Methods',
            sections: [
                {
                    id: 'python-tuple-methods-basics', title: 'Python Tuple Methods',
                    content: `<p>Reference guide to tuple methods in Python.</p>`
                }
            ]
        },

        /* ────── 148. Python Set Methods ────── */
        {
            id: 'python_set_methods', title: 'Python Set Methods',
            sections: [
                {
                    id: 'python-set-methods-basics', title: 'Python Set Methods',
                    content: `<p>Reference guide to set methods in Python.</p>`
                }
            ]
        },

        /* ────── 149. Python File Methods ────── */
        {
            id: 'python_file_methods', title: 'Python File Methods',
            sections: [
                {
                    id: 'python-file-methods-basics', title: 'Python File Methods',
                    content: `<p>Reference guide to file handling methods in Python.</p>`
                }
            ]
        },

        /* ────── 150. Python Keywords ────── */
        {
            id: 'python_keywords', title: 'Python Keywords',
            sections: [
                {
                    id: 'python-keywords-basics', title: 'Python Keywords',
                    content: `<p>Reference guide to reserved keywords in Python.</p>`
                }
            ]
        },

        /* ────── 151. Python Exceptions ────── */
        {
            id: 'python_exceptions', title: 'Python Exceptions',
            sections: [
                {
                    id: 'python-exceptions-basics', title: 'Python Exceptions',
                    content: `<p>Reference guide to built-in exceptions in Python.</p>`
                }
            ]
        },

        /* ────── 152. Python Glossary ────── */
        {
            id: 'python_glossary', title: 'Python Glossary',
            sections: [
                {
                    id: 'python-glossary-basics', title: 'Python Glossary',
                    content: `<p>Glossary of common Python terms.</p>`
                }
            ]
        },

        /* ────── 153. Module Reference (Header) ────── */
        {
            id: 'module_reference_header', title: 'Module Reference', isHeader: true,
            sections: []
        },

        /* ────── 154. Built-in Modules ────── */
        {
            id: 'built_in_modules', title: 'Built-in Modules',
            sections: [
                {
                    id: 'built-in-modules-basics', title: 'Built-in Modules',
                    content: `<p>Learn about Python's built-in modules.</p>`
                }
            ]
        },

        /* ────── 155. Random Module ────── */
        {
            id: 'random_module', title: 'Random Module',
            sections: [
                {
                    id: 'random-module-basics', title: 'Random Module',
                    content: `<p>Reference guide to the random module in Python.</p>`
                }
            ]
        },

        /* ────── 156. Requests Module ────── */
        {
            id: 'requests_module', title: 'Requests Module',
            sections: [
                {
                    id: 'requests-module-basics', title: 'Requests Module',
                    content: `<p>Reference guide to the requests module in Python.</p>`
                }
            ]
        },

        /* ────── 157. Statistics Module ────── */
        {
            id: 'statistics_module', title: 'Statistics Module',
            sections: [
                {
                    id: 'statistics-module-basics', title: 'Statistics Module',
                    content: `<p>Reference guide to the statistics module in Python.</p>`
                }
            ]
        },

        /* ────── 158. Math Module ────── */
        {
            id: 'math_module', title: 'Math Module',
            sections: [
                {
                    id: 'math-module-basics', title: 'Math Module',
                    content: `<p>Reference guide to the math module in Python.</p>`
                }
            ]
        },

        /* ────── 159. cMath Module ────── */
        {
            id: 'cmath_module', title: 'cMath Module',
            sections: [
                {
                    id: 'cmath-module-basics', title: 'cMath Module',
                    content: `<p>Reference guide to the cmath module in Python.</p>`
                }
            ]
        }
    ],
};

const allSections = COURSE.chapters.flatMap(ch =>
    ch.sections.map(s => ({ ...s, chapterId: ch.id, chapterTitle: ch.title }))
);

/* ─── Colors ─── */
const C = {
    primary: '#1d1d1f', gray: '#86868b', light: '#f5f5f7', border: '#d4edda',
    green: '#04AA6D', greenDark: '#059862', greenLight: '#d4edda',
    codeBg: '#282c34', error: '#ff3b30',
};


/* ═══════════════════════════════════════════
   TRY IT YOURSELF — Editor Component
   ═══════════════════════════════════════════ */
function TryItYourself({ initialCode, title, variant, staticResult }) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const [running, setRunning] = useState(false);
    const [pyReady, setPyReady] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setPyReady(true); // shared runner handles loading
    }, []);

    const handleRun = useCallback(async () => {
        setRunning(true); setOutput('');
        const res = await runCode(code, 'python');
        setOutput(res.success ? (res.output || '(no output)') : ('Error: ' + res.error));
        setRunning(false);
    }, [code]);

    const isError = variant === 'error';
    const containerBg = isError ? '#ffdbdb' : '#f1f1f1';
    const borderColor = isError ? '#f44336' : '#04AA6D';
    const highlightedCode = highlightPython(initialCode);

    return (
        <div style={{
            margin: '24px 0 32px', borderRadius: '4px', overflow: 'hidden',
            background: containerBg, padding: '16px 20px', border: '1px solid #ddd'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 400, color: '#000', fontFamily: 'inherit' }}>
                    {title || 'Example'}
                </h3>
            </div>

            {/* Code display */}
            <div style={{
                background: '#fff', padding: '16px 20px', borderLeft: `5px solid ${borderColor}`,
                fontFamily: "Consolas, 'Courier New', monospace", fontSize: '18px', lineHeight: 1.5,
                color: '#000', whiteSpace: 'pre-wrap', marginBottom: '16px'
            }} dangerouslySetInnerHTML={{ __html: highlightedCode }} />

            {/* Error Result for variant="error" */}
            {isError && staticResult && (
                <div style={{ marginBottom: '16px' }}>
                    <p style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 500, color: '#333' }}>Result:</p>
                    <div style={{
                        background: '#000', color: '#fff', padding: '12px 20px',
                        fontFamily: "Consolas, monospace", fontSize: '14px', fontWeight: 700,
                        borderRadius: '2px'
                    }}>
                        {staticResult}
                    </div>
                </div>
            )}

            {/* Try it Yourself button */}
            <button onClick={() => setExpanded(!expanded)} style={{
                background: '#04AA6D', color: '#fff', border: 'none', borderRadius: '5px',
                padding: '10px 20px', fontSize: '17px', fontWeight: 400, cursor: 'pointer',
                fontFamily: 'inherit'
            }}>
                {expanded ? 'Close Editor ✕' : 'Try it Yourself »'}
            </button>

            {/* Expandable editor */}
            <AnimatePresence>
                {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                        <div style={{ borderTop: '2px solid #04AA6D', marginTop: '20px' }}>
                            {/* Editor */}
                            <div style={{ height: '300px' }}>
                                <CodeEditor
                                    value={code}
                                    onChange={setCode}
                                    onRun={handleRun}
                                    language="python"
                                />
                            </div>

                            {/* Run bar */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', background: '#f1f1f1' }}>
                                <button onClick={handleRun} disabled={running || !pyReady} style={{
                                    padding: '8px 28px', border: 'none', borderRadius: '4px',
                                    background: pyReady ? C.green : '#999', color: '#fff',
                                    fontSize: '14px', fontWeight: 700, fontFamily: 'inherit',
                                    cursor: (running || !pyReady) ? 'not-allowed' : 'pointer',
                                }}>
                                    {running ? '⏳ Running...' : !pyReady ? '⏳ Loading Python...' : '▶ Run'}
                                </button>
                                <button onClick={() => { setCode(initialCode); setOutput(''); }} style={{
                                    padding: '8px 18px', border: '1px solid #ccc', borderRadius: '4px',
                                    background: '#fff', color: '#555', fontSize: '13px', fontWeight: 600,
                                    fontFamily: 'inherit', cursor: 'pointer',
                                }}>↺ Reset</button>
                            </div>

                            {/* Output */}
                            {output && (
                                <div style={{
                                    padding: '14px 20px', background: '#fff', borderTop: '1px solid #ddd',
                                    fontFamily: "Consolas, monospace", fontSize: '14px', lineHeight: 1.6,
                                    color: output.startsWith('Error') ? C.error : '#333', whiteSpace: 'pre-wrap',
                                    maxHeight: '200px', overflowY: 'auto',
                                }}>
                                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#999', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Result:</div>
                                    {output}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


/* ═══════════════════════════════════════════
   CODE CHALLENGE UI
   ═══════════════════════════════════════════ */
function CodeChallenge({ section }) {
    const [code, setCode] = useState(section.starterCode || '');
    const [activeTab, setActiveTab] = useState('code'); // 'code' | 'solution'
    const [output, setOutput] = useState('');
    const [running, setRunning] = useState(false);
    const [checks, setChecks] = useState([]); // Array of passed booleans
    const [hasRuntimeError, setHasRuntimeError] = useState(false);

    useEffect(() => {
        setChecks(new Array(section.instructions.length).fill(false));
    }, [section.instructions.length]);

    const handleRun = useCallback(async () => {
        console.log('Running code challenge...');
        setRunning(true); setOutput('');
        try {
            const res = await runCode(code, 'python');
            console.log('Python execution result:', res);
            const newOutput = res.success ? (res.output || '(no output)') : ('Error: ' + res.error);
            setOutput(newOutput);
            setHasRuntimeError(!res.success);

            // Simple validation: check if expected strings are in output
            const nextChecks = section.instructions.map(inst => {
                const match = inst.match(/"([^"]+)"/);
                if (!match) return true;
                const expected = match[1];
                // If the instruction says "Comment out", check that output DOES NOT include it
                const isNegative = inst.toLowerCase().includes('comment out');
                const passed = isNegative ? !newOutput.includes(expected) : newOutput.includes(expected);
                console.log(`Checking instruction: "${inst}" -> ${passed ? 'PASSED' : 'FAILED'}`);
                return passed;
            });
            setChecks(nextChecks);
            if (checks.every(c => c) && !hasRuntimeError && res.success) {
                if (typeof section.onComplete === 'function') section.onComplete();
            }
        } catch (err) {
            console.error('Error running python code:', err);
            setOutput('Error: ' + err.message);
        }
        setRunning(false);
    }, [code, section.instructions]);

    return (
        <div style={{ margin: '24px 0 40px' }}>
            {/* Instructions */}
            <div style={{
                background: '#fff', border: '1px solid #eee', borderRadius: '12px',
                padding: '24px', marginBottom: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 16px', color: '#000' }}>Instructions</h3>
                <p style={{ fontSize: '15px', color: '#333', margin: '0 0 16px' }}>Inside the editor, complete the following steps:</p>
                <ol style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                    {section.instructions.map((step, i) => (
                        <li key={i} style={{ fontSize: '15px', color: '#333', marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: step.replace(/"([^"]+)"/g, '<strong>"$1"</strong>') }} />
                    ))}
                </ol>
            </div>

            {/* Split View */}
            <div style={{ display: 'flex', gap: '8px', minHeight: '380px' }}>
                {/* Left: Editor Area */}
                <div style={{ flex: 1, background: '#1e1e1e', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {/* Editor Tabs */}
                    <div style={{ display: 'flex', background: '#252526', padding: '0 4px', borderBottom: '1px solid #333', alignItems: 'center' }}>
                        <button
                            onClick={() => setActiveTab('code')}
                            style={{
                                padding: '10px 20px', background: activeTab === 'code' ? '#1e1e1e' : 'transparent',
                                border: 'none', color: activeTab === 'code' ? '#fff' : '#888',
                                fontSize: '13px', fontWeight: 500, cursor: 'pointer', borderBottom: activeTab === 'code' ? '2px solid #04AA6D' : 'none'
                            }}>Code</button>
                        <button
                            onClick={() => setActiveTab('solution')}
                            style={{
                                padding: '10px 20px', background: activeTab === 'solution' ? '#1e1e1e' : 'transparent',
                                border: 'none', color: activeTab === 'solution' ? '#fff' : '#888',
                                fontSize: '13px', fontWeight: 500, cursor: 'pointer', borderBottom: activeTab === 'solution' ? '2px solid #04AA6D' : 'none'
                            }}>Solution</button>

                        <div style={{ marginLeft: 'auto', paddingRight: '8px' }}>
                            <button onClick={handleRun} disabled={running || activeTab === 'solution'} style={{
                                background: '#04AA6D', color: '#fff', border: 'none', borderRadius: '4px',
                                padding: '6px 14px', fontSize: '13px', fontWeight: 700, cursor: 'pointer'
                            }}>Check Code</button>
                        </div>
                    </div>

                    {/* Editor Body */}
                    <div style={{ flex: 1, minHeight: '300px' }}>
                        <CodeEditor
                            value={activeTab === 'code' ? code : section.solution}
                            onChange={val => activeTab === 'code' && setCode(val)}
                            onRun={handleRun}
                            language="python"
                        />
                    </div>
                </div>

                {/* Right: Result Area */}
                <div style={{ flex: 1, background: '#1e1e1e', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ background: '#252526', padding: '10px 20px', borderBottom: '1px solid #333', color: '#888', fontSize: '13px', fontWeight: 500 }}>
                        Result
                    </div>
                    <div style={{ flex: 1, padding: '20px', fontFamily: "Consolas, monospace", fontSize: '14px', lineHeight: 1.6 }}>
                        {!output && !running && <div style={{ color: '#555' }}>Click <span style={{ color: '#04AA6D', fontWeight: 600 }}>Check Code</span> to see the result here.</div>}
                        {running && <div style={{ color: '#999' }}>⏳ Running...</div>}
                        {output && <div style={{ color: output.startsWith('Error') ? '#f44336' : '#d4d4d4', whiteSpace: 'pre-wrap' }}>{output}</div>}
                    </div>
                </div>
            </div>

            {/* Submission Status Banner */}
            {output && !running && (
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        marginTop: '24px',
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        background: (checks.every(c => c) && !hasRuntimeError) ? 'rgba(4, 170, 109, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                        border: `2px solid ${(checks.every(c => c) && !hasRuntimeError) ? '#04AA6D' : '#f44336'}`
                    }}
                >
                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: 900,
                        margin: 0,
                        color: (checks.every(c => c) && !hasRuntimeError) ? '#04AA6D' : '#f44336',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        {(checks.every(c => c) && !hasRuntimeError) ? 'CORRECT' : 'INCORRECT'}
                    </h2>
                    <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#555', fontWeight: 500 }}>
                        {(checks.every(c => c) && !hasRuntimeError)
                            ? 'Excellent! You fulfilled all requirements.'
                            : 'Check the checklist below to see what is missing.'}
                    </p>
                </motion.div>
            )}

            {/* Checklist */}
            <div style={{ marginTop: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 500, margin: '0 0 16px', color: '#000' }}>Checklist</h3>
                <div style={{
                    background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden'
                }}>
                    {section.instructions.map((step, i) => (
                        <ChecklistItem key={i} text={step} passed={checks[i]} />
                    ))}
                    <ChecklistItem text="Runtime Error" passed={!hasRuntimeError} isErrorCheck={true} />
                </div>
            </div>
        </div>
    );
}

function ChecklistItem({ text, passed, isErrorCheck }) {
    // If it's an error check, 'passed' means NO error.
    // The user wants to see an X if requirements are NOT MET.
    // So if passed is false, show X.
    const isFailed = !passed;
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '12px 24px', borderBottom: '1px solid #eee'
        }}>
            <div style={{
                width: '28px', height: '28px', borderRadius: '4px',
                background: isFailed ? '#ffdbdb' : '#e8f9ef',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 900, color: isFailed ? '#f44336' : '#04AA6D',
                flexShrink: 0
            }}>
                {isFailed ? '✕' : '✓'}
            </div>
            <span style={{ fontSize: '15px', color: '#000', fontWeight: 500 }}>
                {text.replace(/"([^"]+)"/g, '"$1"')}
            </span>
        </div>
    );
}

/* ═══════════════════════════════════════════
   EXERCISE QUIZ — Multiple Choice
   ═══════════════════════════════════════════ */
function ExerciseQuiz({ exercise }) {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    if (!exercise) return null;

    const isCorrect = selected === exercise.answer;

    return (
        <div style={{ margin: '48px 0 24px', textAlign: 'center' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '0 0 40px' }} />
            <h2 style={{ fontSize: '28px', fontWeight: 300, color: '#555', margin: '0 0 16px' }}>Exercise <span style={{ fontSize: '16px', color: '#999' }}>?</span></h2>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#333', margin: '0 0 24px' }}>{exercise.question}</p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                {exercise.options.map((opt, i) => {
                    let bg = '#fff';
                    let border = '1px solid #ddd';
                    let color = '#333';
                    if (submitted) {
                        if (i === exercise.answer) { bg = '#d4edda'; border = '1px solid #28a745'; color = '#155724'; }
                        else if (i === selected) { bg = '#f8d7da'; border = '1px solid #dc3545'; color = '#721c24'; }
                    } else if (i === selected) { bg = '#e8f4fd'; border = '1px solid #007bff'; }

                    return (
                        <div key={i}
                            onClick={() => { if (!submitted) setSelected(i); }}
                            style={{
                                width: '100%', maxWidth: '400px', padding: '12px 20px',
                                borderRadius: '8px', border, background: bg, cursor: submitted ? 'default' : 'pointer',
                                fontSize: '14px', color, fontWeight: i === selected ? 600 : 400,
                                textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px',
                                transition: 'all 0.15s',
                            }}
                        >
                            <span style={{
                                width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                                border: i === selected ? '6px solid #007bff' : '2px solid #ccc',
                                background: i === selected && !submitted ? '#007bff' : 'transparent',
                                transition: 'all 0.15s',
                            }} />
                            {opt}
                        </div>
                    );
                })}
            </div>

            {!submitted ? (
                <button onClick={() => { if (selected !== null) setSubmitted(true); }} disabled={selected === null}
                    style={{
                        padding: '10px 32px', border: 'none', borderRadius: '4px',
                        background: selected !== null ? C.green : '#ccc', color: '#fff',
                        fontSize: '14px', fontWeight: 700, fontFamily: 'inherit',
                        cursor: selected !== null ? 'pointer' : 'default',
                    }}>
                    Submit Answer »
                </button>
            ) : (
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#28a745', marginTop: '8px' }}>
                    {isCorrect ? (
                        <>
                            ✅ {(() => { if (typeof exercise.onComplete === 'function') exercise.onComplete(); return 'Correct!'; })()}
                        </>
                    ) : '❌ Incorrect. The correct answer is highlighted in green.'}
                </div>
            )}
        </div>
    );
}


/* ═══════════════════════════════════════════
   MAIN COURSE READER
   ═══════════════════════════════════════════ */
export default function CourseReaderPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [currentIdx, setCurrentIdx] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [expandedChapters, setExpandedChapters] = useState(new Set());
    const [completed, setCompleted] = useState(() => {
        try { const s = localStorage.getItem('tezcode_sections'); return s ? new Set(JSON.parse(s)) : new Set(); }
        catch { return new Set(); }
    });

    useEffect(() => {
        // 1. Automatically enroll the user in this course when they open it
        if (user) {
            api.post(`/courses/${id}/enroll`).catch(err => {
                console.error('Enrollment failed:', err);
            });
        }

        // 2. Sync localStorage progress to backend on mount
        const syncLocalProgress = async () => {
            if (user && completed.size > 0) {
                console.log('Syncing global progress from localStorage...');
                for (const sid of completed) {
                    try {
                        await api.post('/progress', { activitySlug: sid, completed: true });
                    } catch (e) {
                        console.error(`Failed to sync ${sid}:`, e);
                    }
                }
            }
        };
        syncLocalProgress();
    }, [id, user]);

    const section = allSections[currentIdx];
    const progress = Math.round((completed.size / allSections.length) * 100);

    const markDone = async (sid) => {
        if (completed.has(sid)) return;

        setCompleted(prev => {
            const n = new Set(prev); n.add(sid);
            localStorage.setItem('tezcode_sections', JSON.stringify([...n]));
            return n;
        });

        // Sync with backend using SLUG
        if (user) {
            try {
                await api.post('/progress', { activitySlug: sid, completed: true });
            } catch (err) {
                console.error('Failed to sync progress:', err);
            }
        }
    };

    const goTo = (i) => { setCurrentIdx(i); window.scrollTo(0, 0); };
    const goNext = () => { markDone(section.id); if (currentIdx < allSections.length - 1) goTo(currentIdx + 1); };
    const goPrev = () => { if (currentIdx > 0) goTo(currentIdx - 1); };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter',-apple-system,sans-serif", background: '#fff' }}>

            {/* ── Sidebar ── */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                        style={{ background: '#fff', borderRight: '1px solid #e5e5e5', overflowY: 'auto', overflowX: 'hidden', flexShrink: 0, position: 'sticky', top: 0, height: '100vh' }}>
                        <div style={{ padding: '20px 16px' }}>
                            <button onClick={() => navigate('/catalog')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#86868b', fontFamily: 'inherit', marginBottom: '16px' }}>
                                ← Back to Catalog
                            </button>
                            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#1d1d1f', margin: '0 0 4px' }}>🐍 {COURSE.title}</h2>

                            {/* Progress */}
                            <div style={{ margin: '12px 0 20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#86868b', marginBottom: '4px' }}>
                                    <span>{completed.size}/{allSections.length} sections</span><span>{progress}%</span>
                                </div>
                                <div style={{ height: '4px', borderRadius: '2px', background: '#eee' }}>
                                    <div style={{ height: '100%', borderRadius: '2px', background: C.green, width: `${progress}%`, transition: 'width 0.3s' }} />
                                </div>
                            </div>

                            {/* Chapter list */}
                            {COURSE.chapters.map(ch => {
                                const isExpanded = expandedChapters.has(ch.id);
                                if (ch.isHeader) {
                                    const isOOP = ch.id === 'oop_header';
                                    return (
                                        <div key={ch.id} style={{
                                            marginTop: isOOP ? '8px' : '32px',
                                            marginBottom: '8px',
                                            padding: '0 4px'
                                        }}>
                                            <h2 style={{
                                                fontSize: isOOP ? '24px' : '32px',
                                                fontWeight: 500,
                                                color: '#000',
                                                margin: 0,
                                                fontFamily: 'inherit'
                                            }}>{ch.title}</h2>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={ch.id} style={{ marginBottom: '8px' }}>
                                        {/* Header / Dropdown Button */}
                                        <div
                                            onClick={() => {
                                                setExpandedChapters(prev => {
                                                    const next = new Set(prev);
                                                    if (next.has(ch.id)) next.delete(ch.id);
                                                    else next.add(ch.id);
                                                    return next;
                                                });
                                            }}
                                            style={{
                                                background: '#ddd', padding: '8px 12px', display: 'flex', alignItems: 'center',
                                                justifyContent: 'space-between', marginBottom: '1px', cursor: 'pointer',
                                                userSelect: 'none'
                                            }}
                                        >
                                            <span style={{ fontSize: '15px', fontWeight: 500, color: '#000', fontFamily: 'inherit' }}>{ch.title}</span>
                                            <span style={{ fontSize: '10px', color: '#666', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
                                        </div>

                                        {/* Sections (only show if expanded) */}
                                        {isExpanded && allSections.filter(s => s.chapterId === ch.id).map(s => {
                                            const idx = allSections.indexOf(s);
                                            const active = idx === currentIdx;

                                            return (
                                                <div key={s.id}
                                                    onClick={() => goTo(idx)}
                                                    style={{
                                                        padding: '8px 16px', borderRadius: '0', marginBottom: '1px',
                                                        cursor: 'pointer', fontSize: '18px',
                                                        background: active ? C.green : 'transparent',
                                                        color: active ? '#fff' : '#000',
                                                        fontWeight: 400,
                                                        display: 'flex', alignItems: 'center', gap: '8px',
                                                        border: 'none',
                                                        transition: 'background 0.1s'
                                                    }}>
                                                    {s.title}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Main ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Toggle */}
                <div style={{ position: 'fixed', top: '12px', left: sidebarOpen ? '288px' : '8px', zIndex: 10, transition: 'left 0.2s' }}>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: '#fff', border: '1px solid #ddd', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', color: '#86868b', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    }}>{sidebarOpen ? '◀' : '▶'}</button>
                </div>

                <div style={{ maxWidth: '840px', padding: '48px 60px 100px', width: '100%', margin: '0 0 0 0' }}>
                    {/* Title */}
                    <h1 style={{ fontSize: '36px', fontWeight: 300, color: '#1d1d1f', margin: '0 0 12px' }}>{section.chapterTitle}</h1>

                    {/* Nav: Previous / Next */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 0 32px' }}>
                        <button onClick={goPrev} disabled={currentIdx === 0} style={{
                            padding: '8px 20px', border: '1px solid #ddd', background: '#fff',
                            fontSize: '13px', fontWeight: 600, color: currentIdx === 0 ? '#ccc' : '#333',
                            cursor: currentIdx === 0 ? 'default' : 'pointer', fontFamily: 'inherit', borderRadius: '2px',
                        }}>❮ Previous</button>
                        <button onClick={goNext} disabled={currentIdx === allSections.length - 1} style={{
                            padding: '8px 20px', border: '1px solid #04AA6D', background: '#fff',
                            fontSize: '13px', fontWeight: 600, color: currentIdx === allSections.length - 1 ? '#ccc' : '#04AA6D',
                            cursor: currentIdx === allSections.length - 1 ? 'default' : 'pointer', fontFamily: 'inherit', borderRadius: '2px',
                        }}>Next ❯</button>
                    </div>

                    {/* Section subtitle */}
                    <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 20px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>{section.title}</h2>

                    {/* Content */}
                    <div className="reader-content" dangerouslySetInnerHTML={{ __html: section.content }}
                        style={{ fontSize: '15px', lineHeight: 1.8, color: '#333' }} />

                    {/* Specialized Challenge View */}
                    {section.type === 'challenge' && <CodeChallenge key={section.id} section={{ ...section, onComplete: () => markDone(section.id) }} />}

                    {/* Standard Blocks */}
                    {section.type !== 'challenge' && (
                        <>
                            {/* Try it Yourself blocks */}
                            {section.examples?.map((ex, i) => (
                                <div key={`${section.id}-${i}`}>
                                    {ex.preContent && <div dangerouslySetInnerHTML={{ __html: ex.preContent }} style={{ fontSize: '15px', lineHeight: 1.8, color: '#333', marginTop: '20px' }} />}
                                    <TryItYourself initialCode={ex.code} title={ex.title} variant={ex.variant} staticResult={ex.staticResult} />
                                    {ex.postContent && <div dangerouslySetInnerHTML={{ __html: ex.postContent }} style={{ fontSize: '15px', lineHeight: 1.8, color: '#333', marginTop: '10px' }} />}
                                </div>
                            ))}

                            {/* Exercise Quiz */}
                            {section.exercise && <ExerciseQuiz key={section.id} exercise={{ ...section.exercise, onComplete: () => markDone(section.id) }} />}
                        </>
                    )}

                    {/* Bottom Nav */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #eee' }}>
                        <button onClick={goPrev} disabled={currentIdx === 0} style={{
                            padding: '10px 24px', border: '1px solid #ddd', background: '#fff',
                            fontSize: '14px', fontWeight: 600, color: currentIdx === 0 ? '#ccc' : '#333',
                            cursor: currentIdx === 0 ? 'default' : 'pointer', fontFamily: 'inherit', borderRadius: '2px',
                        }}>❮ Previous</button>
                        <button onClick={goNext} style={{
                            padding: '10px 24px', border: 'none', borderRadius: '2px',
                            background: C.green, color: '#fff', fontSize: '14px', fontWeight: 700, fontFamily: 'inherit',
                            cursor: currentIdx === allSections.length - 1 ? 'default' : 'pointer',
                            opacity: currentIdx === allSections.length - 1 ? 0.5 : 1,
                        }}>{currentIdx === allSections.length - 1 ? 'Completed ✓' : 'Next ❯'}</button>
                    </div>
                </div>
            </div>

            {/* Styles */}
            <style>{`
        .reader-content { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 400; }
        .reader-content h2 { font-size: 30px; font-weight: 700; color: #1d1d1f; margin: 40px 0 16px; border-bottom: 1px solid #f2f2f2; padding-bottom: 12px; }
        .reader-content h3 { font-size: 22px; font-weight: 700; color: #1d1d1f; margin: 32px 0 12px; }
        .reader-content p { margin: 0 0 16px; font-size: 16px; color: #333; line-height: 1.6; }
        .reader-content ul { margin: 16px 0 24px; padding-left: 28px; list-style-type: disc !important; }
        .reader-content li { margin-bottom: 10px; font-size: 16px; line-height: 1.6; color: #333; display: list-item !important; }
        .reader-content code { background: #f5f5f7; padding: 2px 6px; border-radius: 4px; font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace; font-size: 0.9em; color: #e91429; font-weight: 500; }
        .reader-content table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 15px; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 0 1px #e5e5e5; }
        .reader-content th { background: #f9f9fb; padding: 12px 16px; text-align: left; font-weight: 600; color: #1d1d1f; border-bottom: 2px solid #e5e5e5; }
        .reader-content td { padding: 12px 16px; border-bottom: 1px solid #eee; color: #424245; }
        .reader-content strong { color: #000; font-weight: 600; }
        .reader-content a { color: #04AA6D; text-decoration: none; font-weight: 500; border-bottom: 1px solid transparent; transition: border-bottom 0.2s; }
        .reader-content a:hover { border-bottom: 1px solid #04AA6D; }
        .reader-content .code-block-nonrun { background: #1e1e1e; color: #d4d4d4; padding: 18px 24px; margin: 20px 0; font-family: "SFMono-Regular", Consolas, monospace; font-size: 14px; line-height: 1.7; border-left: 4px solid #04AA6D; border-radius: 0 8px 8px 0; white-space: pre-wrap; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .reader-content .code-filename { color: #86868b; font-weight: 600; font-family: inherit; font-size: 13px; margin: 24px 0 4px; text-transform: uppercase; letter-spacing: 0.05em; }
        .reader-content hr { border: none; border-top: 1px solid #eee; margin: 40px 0; }
      `}</style>
        </div>
    );
}
