const { sequelize, Course, Chapter, Section, Activity } = require('./src/models');

const COURSE_DATA = {
    "title": "Introduction to Python",
    "chapters": [
        {
            "id": "intro",
            "title": "Python Introduction",
            "sections": [
                {
                    "id": "intro-what",
                    "title": "What is Python?"
                }
            ]
        },
        {
            "id": "getstarted",
            "title": "Python Getting Started",
            "sections": [
                {
                    "id": "getstarted-all",
                    "title": "Get Started With Python"
                }
            ]
        },
        {
            "id": "syntax",
            "title": "Python Syntax",
            "sections": [
                {
                    "id": "syntax-main",
                    "title": "Syntax"
                },
                {
                    "id": "syntax-statements",
                    "title": "Statements"
                },
                {
                    "id": "syntax-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "output",
            "title": "Python Output / Print",
            "sections": [
                {
                    "id": "output-text",
                    "title": "Print Text"
                },
                {
                    "id": "output-numbers",
                    "title": "Print Numbers"
                },
                {
                    "id": "output-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "comments",
            "title": "Python Comments",
            "sections": [
                {
                    "id": "comments-main",
                    "title": "Comments"
                },
                {
                    "id": "comments-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "variables",
            "title": "Python Variables",
            "sections": [
                {
                    "id": "variables-intro",
                    "title": "Python Variables"
                },
                {
                    "id": "variables-names",
                    "title": "Variable Names"
                },
                {
                    "id": "variables-multi",
                    "title": "Assign Multiple Values"
                },
                {
                    "id": "variables-output",
                    "title": "Output Variables"
                },
                {
                    "id": "variables-global",
                    "title": "Global Variables"
                },
                {
                    "id": "variables-exercises",
                    "title": "Variable Exercises"
                },
                {
                    "id": "variables-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "datatypes",
            "title": "Python Data Types",
            "sections": [
                {
                    "id": "datatypes-intro",
                    "title": "Data Types"
                },
                {
                    "id": "datatypes-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "numbers",
            "title": "Python Numbers",
            "sections": [
                {
                    "id": "numbers-intro",
                    "title": "Python Numbers"
                },
                {
                    "id": "numbers-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "casting",
            "title": "Python Casting",
            "sections": [
                {
                    "id": "casting-specify",
                    "title": "Specify a Variable Type"
                },
                {
                    "id": "casting-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "operators",
            "title": "Python Operators",
            "sections": [
                {
                    "id": "operators-arithmetic",
                    "title": "Arithmetic Operators"
                },
                {
                    "id": "operators-arithmetic-challenge",
                    "title": "Arithmetic Challenge"
                },
                {
                    "id": "operators-assignment",
                    "title": "Assignment Operators"
                },
                {
                    "id": "operators-comparison",
                    "title": "Comparison Operators"
                },
                {
                    "id": "operators-logical",
                    "title": "Logical Operators"
                },
                {
                    "id": "operators-identity",
                    "title": "Identity Operators"
                },
                {
                    "id": "operators-membership",
                    "title": "Membership Operators"
                },
                {
                    "id": "operators-precedence",
                    "title": "Operator Precedence"
                },
                {
                    "id": "operators-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "strings",
            "title": "Python Strings",
            "sections": [
                {
                    "id": "strings-basics",
                    "title": "String Basics"
                },
                {
                    "id": "strings-slicing",
                    "title": "Slicing Strings"
                },
                {
                    "id": "strings-modify",
                    "title": "Modify Strings"
                },
                {
                    "id": "strings-concat",
                    "title": "String Concatenation"
                },
                {
                    "id": "strings-formatting",
                    "title": "Format Strings"
                },
                {
                    "id": "strings-escape",
                    "title": "Escape Characters"
                },
                {
                    "id": "strings-methods",
                    "title": "String Methods"
                },
                {
                    "id": "strings-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "booleans",
            "title": "Python Booleans",
            "sections": [
                {
                    "id": "booleans-main",
                    "title": "Booleans"
                },
                {
                    "id": "booleans-evaluate",
                    "title": "Evaluate Values"
                }
            ]
        },
        {
            "id": "lists",
            "title": "Python Lists",
            "sections": [
                {
                    "id": "lists-intro",
                    "title": "Python Lists"
                },
                {
                    "id": "lists-access",
                    "title": "Access List Items"
                },
                {
                    "id": "lists-change",
                    "title": "Change List Items"
                },
                {
                    "id": "lists-add",
                    "title": "Add List Items"
                },
                {
                    "id": "lists-remove",
                    "title": "Remove List Items"
                },
                {
                    "id": "lists-loop",
                    "title": "Loop Lists"
                },
                {
                    "id": "lists-comprehension",
                    "title": "List Comprehension"
                },
                {
                    "id": "lists-sort",
                    "title": "Sort Lists"
                },
                {
                    "id": "lists-copy",
                    "title": "Copy Lists"
                },
                {
                    "id": "lists-join",
                    "title": "Join Lists"
                },
                {
                    "id": "lists-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "tuples",
            "title": "Python Tuples",
            "sections": [
                {
                    "id": "tuples-intro",
                    "title": "Python Tuples"
                },
                {
                    "id": "tuples-access",
                    "title": "Access Tuples"
                },
                {
                    "id": "tuples-update",
                    "title": "Update Tuples"
                },
                {
                    "id": "tuples-unpack",
                    "title": "Unpack Tuples"
                },
                {
                    "id": "tuples-loop",
                    "title": "Loop Tuples"
                },
                {
                    "id": "tuples-join",
                    "title": "Join Tuples"
                },
                {
                    "id": "tuples-methods",
                    "title": "Tuple Methods"
                },
                {
                    "id": "tuples-exercises",
                    "title": "Tuple Exercises"
                },
                {
                    "id": "tuples-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "sets",
            "title": "Python Sets",
            "sections": [
                {
                    "id": "sets-intro",
                    "title": "Python Sets"
                },
                {
                    "id": "sets-access",
                    "title": "Access Set Items"
                },
                {
                    "id": "sets-add",
                    "title": "Add Set Items"
                },
                {
                    "id": "sets-remove",
                    "title": "Remove Set Items"
                },
                {
                    "id": "sets-loop",
                    "title": "Loop Sets"
                },
                {
                    "id": "sets-join",
                    "title": "Join Sets"
                },
                {
                    "id": "sets-frozenset",
                    "title": "Frozenset"
                },
                {
                    "id": "sets-methods",
                    "title": "Set Methods"
                },
                {
                    "id": "sets-exercises",
                    "title": "Set Exercises"
                },
                {
                    "id": "sets-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "dictionaries",
            "title": "Python Dictionaries",
            "sections": [
                {
                    "id": "dict-basics",
                    "title": "Python Dictionaries"
                },
                {
                    "id": "dict-access",
                    "title": "Access Items"
                },
                {
                    "id": "dict-change",
                    "title": "Change Items"
                },
                {
                    "id": "dict-add",
                    "title": "Add Items"
                },
                {
                    "id": "dict-remove",
                    "title": "Remove Items"
                },
                {
                    "id": "dict-loop",
                    "title": "Loop Dictionaries"
                },
                {
                    "id": "dict-copy",
                    "title": "Copy Dictionaries"
                },
                {
                    "id": "dict-nested",
                    "title": "Nested Dictionaries"
                },
                {
                    "id": "dict-methods",
                    "title": "Dictionary Methods"
                },
                {
                    "id": "dict-exercises",
                    "title": "Dictionary Exercises"
                },
                {
                    "id": "dict-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "conditions",
            "title": "Python If...Else",
            "sections": [
                {
                    "id": "conditions-if",
                    "title": "If Statements"
                },
                {
                    "id": "conditions-shorthand",
                    "title": "Short Hand If / Else"
                },
                {
                    "id": "conditions-logical",
                    "title": "Logical Conditions"
                },
                {
                    "id": "conditions-nested",
                    "title": "Nested If"
                },
                {
                    "id": "conditions-pass",
                    "title": "The pass Statement"
                },
                {
                    "id": "conditions-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "match",
            "title": "Python Match",
            "sections": [
                {
                    "id": "match-basics",
                    "title": "Python Match"
                },
                {
                    "id": "match-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "while-loops",
            "title": "Python While Loops",
            "sections": [
                {
                    "id": "while-basics",
                    "title": "While Loops"
                },
                {
                    "id": "while-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "loops",
            "title": "Python For Loops",
            "sections": [
                {
                    "id": "loops-for",
                    "title": "For Loops"
                },
                {
                    "id": "loops-while",
                    "title": "While Loops"
                }
            ]
        },

        {
            "id": "functions",
            "title": "Python Functions",
            "sections": [
                {
                    "id": "functions-intro",
                    "title": "Python Functions"
                },
                {
                    "id": "functions-args",
                    "title": "Python Arguments"
                },
                {
                    "id": "functions-kwargs",
                    "title": "Python *args / **kwargs"
                },
                {
                    "id": "functions-scope",
                    "title": "Python Scope"
                },
                {
                    "id": "functions-decorators",
                    "title": "Python Decorators"
                },
                {
                    "id": "functions-lambda",
                    "title": "Python Lambda"
                },
                {
                    "id": "functions-recursion",
                    "title": "Python Recursion"
                },
                {
                    "id": "functions-generators",
                    "title": "Python Generators"
                },
                {
                    "id": "functions-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "range",
            "title": "Python Range",
            "sections": [
                {
                    "id": "range-basics",
                    "title": "Python Range"
                },
                {
                    "id": "range-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "arrays",
            "title": "Python Arrays",
            "sections": [
                {
                    "id": "arrays-basics",
                    "title": "Python Arrays"
                },
                {
                    "id": "arrays-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "iterators",
            "title": "Python Iterators",
            "sections": [
                {
                    "id": "iterators-basics",
                    "title": "Python Iterators"
                },
                {
                    "id": "iterators-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "modules",
            "title": "Python Modules",
            "sections": [
                {
                    "id": "modules-basics",
                    "title": "Python Modules"
                },
                {
                    "id": "modules-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "dates",
            "title": "Python Dates",
            "sections": [
                {
                    "id": "dates-basics",
                    "title": "Python Dates"
                },
                {
                    "id": "dates-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "math",
            "title": "Python Math",
            "sections": [
                {
                    "id": "math-basics",
                    "title": "Python Math"
                },
                {
                    "id": "math-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "json",
            "title": "Python JSON",
            "sections": [
                {
                    "id": "json-basics",
                    "title": "Python JSON"
                },
                {
                    "id": "json-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "regex",
            "title": "Python RegEx",
            "sections": [
                {
                    "id": "regex-basics",
                    "title": "Python RegEx"
                },
                {
                    "id": "regex-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "pip",
            "title": "Python PIP",
            "sections": [
                {
                    "id": "pip-basics",
                    "title": "Python PIP"
                },
                {
                    "id": "pip-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "try_except",
            "title": "Python Try...Except",
            "sections": [
                {
                    "id": "try-except-basics",
                    "title": "Try...Except"
                },
                {
                    "id": "try-except-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "string_formatting",
            "title": "Python String Formatting",
            "sections": [
                {
                    "id": "string-formatting-basics",
                    "title": "String Formatting"
                },
                {
                    "id": "string-formatting-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "none",
            "title": "Python None",
            "sections": [
                {
                    "id": "none-basics",
                    "title": "None"
                },
                {
                    "id": "none-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "user_input",
            "title": "Python User Input",
            "sections": [
                {
                    "id": "user-input-basics",
                    "title": "User Input"
                },
                {
                    "id": "user-input-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "virtualenv",
            "title": "Python VirtualEnv",
            "sections": [
                {
                    "id": "virtualenv-basics",
                    "title": "VirtualEnv"
                },
                {
                    "id": "virtualenv-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "classes",
            "title": "Python Classes",
            "sections": [
                {
                    "id": "classes-oop",
                    "title": "Python OOP"
                }
            ]
        }
    ]
};

async function sync() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Find or create Python course
        let [course] = await Course.findOrCreate({
            where: { id: 1 },
            defaults: {
                titleEn: 'Introduction to Python',
                titleRu: 'Введение в Python',
                titleTj: 'Муқаддима ба Python',
                published: true
            }
        });

        // Delete existing chapters to re-sync
        await Chapter.destroy({ where: { course_id: course.id } });
        console.log('Cleanup complete.');

        for (let i = 0; i < COURSE_DATA.chapters.length; i++) {
            const chData = COURSE_DATA.chapters[i];
            const chapter = await Chapter.create({
                course_id: course.id,
                titleEn: chData.title,
                titleRu: chData.title, // Placeholder
                titleTj: chData.title, // Placeholder
                orderNum: i
            });

            for (let j = 0; j < chData.sections.length; j++) {
                const sData = chData.sections[j];
                const section = await Section.create({
                    chapter_id: chapter.id,
                    titleEn: sData.title,
                    titleRu: sData.title, // Placeholder
                    titleTj: sData.title, // Placeholder
                    orderNum: j
                });

                // In this model, 1 frontend "section" maps to 1 backend "activity"
                await Activity.create({
                    section_id: section.id,
                    slug: sData.id,
                    type: sData.id.includes('challenge') ? 'challenge' : 'lesson',
                    orderNum: 0
                });
            }
        }

        console.log('Sync complete.');
    } catch (err) {
        console.error(err);
    }
}

module.exports = sync;
