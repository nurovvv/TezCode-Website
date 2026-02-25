import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   PYODIDE SINGLETON
   ═══════════════════════════════════════════════════════ */
let pyodideInstance = null;
let pyodideLoading = false;
let pyodideLoadCallbacks = [];

async function getPyodide() {
    if (pyodideInstance) return pyodideInstance;
    if (pyodideLoading) return new Promise(r => { pyodideLoadCallbacks.push(r); });
    pyodideLoading = true;
    try {
        pyodideInstance = await loadPyodide();
        pyodideLoadCallbacks.forEach(cb => cb(pyodideInstance));
        pyodideLoadCallbacks = [];
        return pyodideInstance;
    } catch (err) { pyodideLoading = false; throw err; }
}

async function runPython(code) {
    try {
        const py = await getPyodide();
        py.runPython(`import sys, io\nsys.stdout = io.StringIO()\nsys.stderr = io.StringIO()`);
        try { py.runPython(code); } catch (e) {
            return { success: false, output: '', error: e.message || String(e) };
        }
        return { success: true, output: py.runPython('sys.stdout.getvalue()'), error: '' };
    } catch (err) { return { success: false, output: '', error: err.message }; }
}

function highlightPython(code) {
    if (!code) return '';
    let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return escaped
        .replace(/#.*$/gm, '<span style="color: #6a737d;">$&</span>')
        .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span style="color: #228b22;">$&</span>')
        .replace(/\b(print|if|else|elif|for|while|return|import|as|from|in|is|not|and|or)\b/g, '<span style="color: #0000ff;">$&</span>');
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
                content: `<p>On ZiyoBook, you can try Python without installing anything.</p>
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

<h3>On ZiyoBook, You Don't Need to Install Anything!</h3>
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

        /* ────── 7. Python Operators ────── */
        {
            id: 'operators', title: 'Python Operators',
            sections: [{
                id: 'operators-arithmetic', title: 'Arithmetic Operators',
                content: `<p>Arithmetic operators are used with numeric values to perform common mathematical operations:</p>
<table><tr><th>Operator</th><th>Name</th><th>Example</th></tr>
<tr><td><code>+</code></td><td>Addition</td><td>x + y</td></tr>
<tr><td><code>-</code></td><td>Subtraction</td><td>x - y</td></tr>
<tr><td><code>*</code></td><td>Multiplication</td><td>x * y</td></tr>
<tr><td><code>/</code></td><td>Division</td><td>x / y</td></tr>
<tr><td><code>%</code></td><td>Modulus</td><td>x % y</td></tr>
<tr><td><code>**</code></td><td>Exponentiation</td><td>x ** y</td></tr>
<tr><td><code>//</code></td><td>Floor division</td><td>x // y</td></tr></table>`,
                examples: [{ title: 'Arithmetic operators', code: 'x = 15\ny = 4\n\nprint("Add:", x + y)\nprint("Sub:", x - y)\nprint("Mul:", x * y)\nprint("Div:", x / y)\nprint("Mod:", x % y)\nprint("Pow:", x ** y)\nprint("Floor:", x // y)' }],
                exercise: {
                    question: 'Which operator is used for exponentiation in Python?',
                    options: ['^', '**', 'pow'],
                    answer: 1,
                },
            }],
        },

        /* ────── 8. Python Strings ────── */
        {
            id: 'strings', title: 'Python Strings',
            sections: [{
                id: 'strings-basics', title: 'String Basics',
                content: `<p>Strings in Python are surrounded by either single quotation marks or double quotation marks.</p>
<p><code>'hello'</code> is the same as <code>"hello"</code>.</p>
<p>You can display a string literal with the <code>print()</code> function:</p>
<h3>Multiline Strings</h3><p>You can assign a multiline string to a variable by using three quotes.</p>
<h3>String Length</h3><p>To get the length of a string, use the <code>len()</code> function.</p>`,
                examples: [
                    { title: 'String basics', code: 'a = "Hello"\nprint(a)\n\nb = \'World\'\nprint(b)\n\nprint(len(a))' },
                    { title: 'String concatenation', code: 'a = "Hello"\nb = "World"\nc = a + " " + b\nprint(c)' },
                    { title: 'F-Strings (Python 3.6+)', code: 'name = "Alice"\nage = 25\nprint(f"My name is {name} and I am {age} years old")' },
                ],
                exercise: {
                    question: 'Which function returns the length of a string?',
                    options: ['length()', 'size()', 'len()'],
                    answer: 2,
                },
            }, {
                id: 'strings-methods', title: 'String Methods',
                content: `<p>Python has a set of built-in methods that you can use on strings.</p><p>All string methods return new values. They do not change the original string.</p>`,
                examples: [
                    { title: 'Common string methods', code: 'txt = "Hello, World!"\n\nprint(txt.upper())\nprint(txt.lower())\nprint(txt.replace("World", "Python"))\nprint(txt.split(","))' },
                    { title: 'String slicing', code: 'txt = "Hello, World!"\nprint(txt[2:5])\nprint(txt[:5])\nprint(txt[7:])\nprint(txt[-6:-1])' },
                ],
                exercise: {
                    question: 'Which method converts a string to uppercase?',
                    options: ['.uppercase()', '.upper()', '.toUpperCase()'],
                    answer: 1,
                },
            }],
        },

        /* ────── 9. Python Lists ────── */
        {
            id: 'lists', title: 'Python Lists',
            sections: [{
                id: 'lists-basics', title: 'List Basics',
                content: `<p>Lists are used to store multiple items in a single variable. Lists are one of 4 built-in data types in Python used to store collections of data.</p>
<p>Lists are created using square brackets:</p>
<ul><li>List items are ordered, changeable, and allow duplicate values.</li><li>List items are indexed, the first item has index <code>[0]</code>.</li></ul>`,
                examples: [
                    { title: 'Create and access lists', code: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits)\nprint(fruits[0])\nprint(fruits[-1])\nprint(len(fruits))' },
                    { title: 'Modify lists', code: 'fruits = ["apple", "banana", "cherry"]\nfruits[1] = "kiwi"\nfruits.append("orange")\nprint(fruits)\n\nfruits.remove("apple")\nprint(fruits)' },
                    { title: 'List comprehension', code: 'numbers = [1, 2, 3, 4, 5]\nsquares = [x**2 for x in numbers]\nprint(squares)\n\nevens = [x for x in numbers if x % 2 == 0]\nprint(evens)' },
                ],
                exercise: {
                    question: 'How do you access the first item in a list called "mylist"?',
                    options: ['mylist[1]', 'mylist[0]', 'mylist.first()'],
                    answer: 1,
                },
            }],
        },

        /* ────── 10. Python If...Else ────── */
        {
            id: 'conditions', title: 'Python If...Else',
            sections: [{
                id: 'conditions-if', title: 'If Statements',
                content: `<p>Python supports the usual logical conditions from mathematics:</p>
<ul><li>Equals: <code>a == b</code></li><li>Not Equals: <code>a != b</code></li><li>Less than: <code>a &lt; b</code></li><li>Greater than: <code>a &gt; b</code></li></ul>
<p>These conditions can be used in several ways, most commonly in <strong>"if statements"</strong> and <strong>loops</strong>.</p>`,
                examples: [
                    { title: 'If, elif, else', code: 'a = 33\nb = 200\n\nif b > a:\n    print("b is greater than a")\nelif a == b:\n    print("a and b are equal")\nelse:\n    print("a is greater than b")' },
                    { title: 'Nested if', code: 'x = 41\n\nif x > 10:\n    print("Above 10,")\n    if x > 20:\n        print("and also above 20!")\n    else:\n        print("but not above 20.")' },
                ],
                exercise: {
                    question: 'Which keyword is used for "else if" in Python?',
                    options: ['elseif', 'else if', 'elif'],
                    answer: 2,
                },
            }],
        },

        /* ────── 11. Python Loops ────── */
        {
            id: 'loops', title: 'Python Loops',
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

        /* ────── 12. Python Functions ────── */
        {
            id: 'functions', title: 'Python Functions',
            sections: [{
                id: 'functions-def', title: 'Creating Functions',
                content: `<p>A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function. A function can return data as a result.</p>
<p>In Python a function is defined using the <code>def</code> keyword:</p>
<h3>Parameters and Arguments</h3><p>Information can be passed into functions as arguments.</p>
<h3>Return Values</h3><p>To let a function return a value, use the <code>return</code> statement:</p>`,
                examples: [
                    { title: 'Basic function', code: 'def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Alice")\ngreet("Bob")' },
                    { title: 'Return values', code: 'def add(a, b):\n    return a + b\n\nresult = add(3, 5)\nprint(f"3 + 5 = {result}")\n\ndef square(x):\n    return x * x\n\nprint(f"7 squared = {square(7)}")' },
                    { title: 'Default parameters', code: 'def greet(name, greeting="Hello"):\n    print(f"{greeting}, {name}!")\n\ngreet("Alice")\ngreet("Bob", "Hi")\ngreet("Charlie", "Hey")' },
                ],
                exercise: {
                    question: 'Which keyword is used to create a function in Python?',
                    options: ['function', 'func', 'def'],
                    answer: 2,
                },
            }],
        },

        /* ────── 13. Python Dictionaries ────── */
        {
            id: 'dictionaries', title: 'Python Dictionaries',
            sections: [{
                id: 'dict-basics', title: 'Dictionary Basics',
                content: `<p>Dictionaries are used to store data values in <strong>key:value</strong> pairs. A dictionary is a collection which is ordered, changeable, and does not allow duplicates.</p>
<p>Dictionaries are written with curly brackets, and have keys and values:</p>`,
                examples: [
                    { title: 'Create and access', code: 'person = {\n    "name": "John",\n    "age": 36,\n    "country": "Norway"\n}\n\nprint(person)\nprint(person["name"])\nprint(person.get("age"))' },
                    { title: 'Modify dictionary', code: 'car = {\n    "brand": "Ford",\n    "model": "Mustang",\n    "year": 1964\n}\n\ncar["year"] = 2024\ncar["color"] = "red"\nprint(car)\n\nfor key in car:\n    print(f"{key}: {car[key]}")' },
                ],
                exercise: {
                    question: 'How do you access a value in a dictionary?',
                    options: ['dict.value("key")', 'dict["key"]', 'dict(key)'],
                    answer: 1,
                },
            }],
        },
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
    const [pyReady, setPyReady] = useState(!!pyodideInstance);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (!pyodideInstance) getPyodide().then(() => setPyReady(true)).catch(() => { });
    }, []);

    const handleRun = useCallback(async () => {
        setRunning(true); setOutput('');
        const res = await runPython(code);
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
                            <div style={{ display: 'flex', background: '#1e1e1e' }}>
                                <div style={{
                                    width: '40px', padding: '14px 6px 14px 0', textAlign: 'right',
                                    fontFamily: "Consolas, monospace", fontSize: '13px', lineHeight: '1.6',
                                    color: '#555', userSelect: 'none', background: '#1a1a1a',
                                }}>
                                    {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                                </div>
                                <textarea value={code} onChange={e => setCode(e.target.value)} spellCheck={false}
                                    style={{
                                        flex: 1, padding: '14px', border: 'none', outline: 'none',
                                        fontFamily: "Consolas, 'Courier New', monospace",
                                        fontSize: '14px', lineHeight: '1.6', color: '#d4d4d4',
                                        background: '#1e1e1e', resize: 'none', tabSize: 4, minHeight: '80px',
                                    }}
                                    onKeyDown={e => {
                                        if (e.key === 'Tab') {
                                            e.preventDefault();
                                            const s = e.target.selectionStart;
                                            setCode(code.substring(0, s) + '    ' + code.substring(e.target.selectionEnd));
                                            requestAnimationFrame(() => { e.target.selectionStart = e.target.selectionEnd = s + 4; });
                                        }
                                    }}
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
    const [pyReady, setPyReady] = useState(!!pyodideInstance);
    const [checks, setChecks] = useState([]); // Array of passed booleans
    const [hasRuntimeError, setHasRuntimeError] = useState(false);

    useEffect(() => {
        if (!pyodideInstance) getPyodide().then(() => setPyReady(true));
        setChecks(new Array(section.instructions.length).fill(false));
    }, [section.instructions.length]);

    const handleRun = useCallback(async () => {
        setRunning(true); setOutput('');
        const res = await runPython(code);
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
            return isNegative ? !newOutput.includes(expected) : newOutput.includes(expected);
        });
        setChecks(nextChecks);
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
                    <textarea
                        value={activeTab === 'code' ? code : section.solution}
                        onChange={e => activeTab === 'code' && setCode(e.target.value)}
                        readOnly={activeTab === 'solution'}
                        spellCheck={false}
                        style={{
                            flex: 1, background: '#1e1e1e', color: activeTab === 'code' ? '#d4d4d4' : '#6a9955',
                            padding: '20px', border: 'none', outline: 'none', resize: 'none',
                            fontFamily: "Consolas, 'Courier New', monospace", fontSize: '14px', lineHeight: 1.6
                        }}
                    />
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
                <div style={{ fontSize: '15px', fontWeight: 600, color: isCorrect ? '#28a745' : '#dc3545', marginTop: '8px' }}>
                    {isCorrect ? '✅ Correct!' : '❌ Incorrect. The correct answer is highlighted in green.'}
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
    const [currentIdx, setCurrentIdx] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [expandedChapters, setExpandedChapters] = useState(new Set());
    const [completed, setCompleted] = useState(() => {
        try { const s = localStorage.getItem('ziyobook_sections'); return s ? new Set(JSON.parse(s)) : new Set(); }
        catch { return new Set(); }
    });

    const section = allSections[currentIdx];
    const progress = Math.round((completed.size / allSections.length) * 100);

    const markDone = (sid) => {
        setCompleted(prev => {
            const n = new Set(prev); n.add(sid);
            localStorage.setItem('ziyobook_sections', JSON.stringify([...n]));
            return n;
        });
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

                <div style={{ maxWidth: '100%', padding: '40px 48px 80px', width: '100%' }}>
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
                    {section.type === 'challenge' && <CodeChallenge key={section.id} section={section} />}

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
                            {section.exercise && <ExerciseQuiz key={section.id} exercise={section.exercise} />}
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
        .reader-content h3 { font-size: 22px; font-weight: 700; color: #1d1d1f; margin: 28px 0 12px; }
        .reader-content p { margin: 0 0 14px; }
        .reader-content ul { margin: 0 0 16px; padding-left: 24px; }
        .reader-content li { margin-bottom: 6px; }
        .reader-content code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-family: Consolas, 'Courier New', monospace; font-size: 14px; color: crimson; }
        .reader-content table { width: 100%; border-collapse: collapse; margin: 12px 0 20px; font-size: 14px; }
        .reader-content th { background: #f5f5f7; padding: 10px 14px; text-align: left; font-weight: 700; border: 1px solid #e5e5e5; }
        .reader-content td { padding: 8px 14px; border: 1px solid #e5e5e5; }
        .reader-content strong { color: #1d1d1f; }
        .reader-content a { color: #04AA6D; }
        .reader-content .code-block-nonrun { background: #282c34; color: #f7f7f7; padding: 14px 20px; margin: 12px 0 16px; font-family: Consolas, monospace; font-size: 14px; line-height: 1.7; border-left: 3px solid #04AA6D; white-space: pre-wrap; }
        .reader-content .code-filename { color: crimson; font-weight: 600; font-family: Consolas, monospace; font-size: 14px; margin: 12px 0 4px; }
      `}</style>
        </div>
    );
}
