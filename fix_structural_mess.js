const fs = require('fs');
const filepath = 'client/src/pages/CourseReaderPage.jsx';
let txt = fs.readFileSync(filepath, 'utf-8');

// 1. Identify the mess
const startV = txt.indexOf('/* ────── 36. Python VirtualEnv ────── */');
const endAll = txt.indexOf('allSections =', startV);

if (startV === -1 || endAll === -1) {
    console.error('Markers not found!');
    process.exit(1);
}

// Extract the whole tail and reconstruct it
// We need the VirtualEnv chapter (basics, exercise, challenge)
// and the Classes chapter.

const virtualEnvBasics = `        {
            id: 'virtualenv', title: 'Python VirtualEnv',
            sections: [
                {
                    id: 'virtualenv-basics', title: 'VirtualEnv',
                    content: \`<p>A Virtual Environment is an isolated environment for Python projects. This means that each project can have its own dependencies, regardless of what dependencies every other project has.</p>
<h3>Why use a Virtual Environment?</h3>
<p>Imagine you have two projects. Project A needs version 1.0 of a library, and Project B needs version 2.0. If you install version 2.0 globally, Project A might break. Virtual environments solve this.</p>
<h3>Creating a Virtual Environment</h3>
<p>Python has a built-in module called <code>venv</code>:</p>
<pre>python -m venv myenv</pre>
<h3>Activating the Environment</h3>
<p>Once created, you must "activate" it:</p>
<ul>
  <li><strong>Windows:</strong> <code>myenv\\\\Scripts\\\\activate</code></li>
  <li><strong>Mac/Linux:</strong> <code>source myenv/bin/activate</code></li>
</ul>\`,
                    examples: [
                        { title: 'Create environment', code: '# In your terminal:\\npython -m venv .venv' },
                        { title: 'Deactivate', code: '# To exit the environment, simply type:\\ndeactivate' }
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
                    starterCode: '# Print the command to create the environment\\n',
                    solution: 'print("python -m venv my_project_env")',
                    content: \`<p>Check your knowledge of virtual environment commands!</p>\`
                }
            ]
        },`;

const pythonClasses = `        /* ────── 37. Python Classes ────── */
        {
            id: 'classes', title: 'Python Classes',
            sections: [
                {
                    id: 'classes-oop', title: 'Python OOP',
                    content: '<p>Python Classes</p>',
                    examples: [],
                }
            ]
        }`;

const newTail = `/* ────── 36. Python VirtualEnv ────── */
${virtualEnvBasics}

${pythonClasses}
    ],
};

const `;

txt = txt.substring(0, startV) + newTail + txt.substring(endAll);

fs.writeFileSync(filepath, txt);
console.log('Fixed structural mess and reordered chapters!');
