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
            "id": "classes_header",
            "title": "Python Classes",
            "sections": []
        },
        {
            "id": "oop_header",
            "title": "Python OOP",
            "sections": []
        },
        {
            "id": "classes_objects",
            "title": "Python Classes/Objects",
            "sections": [
                {
                    "id": "classes-oop-intro",
                    "title": "Python OOP"
                },
                {
                    "id": "classes-objects-basics",
                    "title": "Classes/Objects"
                },
                {
                    "id": "classes-objects-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "init_method",
            "title": "Python __init__ Method",
            "sections": [
                {
                    "id": "init-basics",
                    "title": "__init__ Method"
                },
                {
                    "id": "init-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "self_parameter",
            "title": "Python self Parameter",
            "sections": [
                {
                    "id": "self-basics",
                    "title": "self Parameter"
                },
                {
                    "id": "self-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "class_properties",
            "title": "Python Class Properties",
            "sections": [
                {
                    "id": "class-properties-basics",
                    "title": "Class Properties"
                },
                {
                    "id": "class-properties-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "class_methods",
            "title": "Python Class Methods",
            "sections": [
                {
                    "id": "class-methods-basics",
                    "title": "Class Methods"
                },
                {
                    "id": "class-methods-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "inheritance",
            "title": "Python Inheritance",
            "sections": [
                {
                    "id": "inheritance-basics",
                    "title": "Inheritance"
                },
                {
                    "id": "inheritance-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "polymorphism",
            "title": "Python Polymorphism",
            "sections": [
                {
                    "id": "polymorphism-basics",
                    "title": "Polymorphism"
                },
                {
                    "id": "polymorphism-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "encapsulation",
            "title": "Python Encapsulation",
            "sections": [
                {
                    "id": "encapsulation-basics",
                    "title": "Encapsulation"
                },
                {
                    "id": "encapsulation-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "inner_classes",
            "title": "Python Inner Classes",
            "sections": [
                {
                    "id": "inner-classes-basics",
                    "title": "Inner Classes"
                },
                {
                    "id": "inner-classes-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "file_handling_header",
            "title": "File Handling",
            "sections": []
        },
        {
            "id": "file_handling",
            "title": "Python File Handling",
            "sections": [
                {
                    "id": "file-handling-basics",
                    "title": "File Handling"
                }
            ]
        },
        {
            "id": "file_read",
            "title": "Python Read Files",
            "sections": [
                {
                    "id": "file-read-basics",
                    "title": "Read Files"
                },
                {
                    "id": "file-read-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "file_write",
            "title": "Python Write/Create Files",
            "sections": [
                {
                    "id": "file-write-basics",
                    "title": "Write/Create Files"
                },
                {
                    "id": "file-write-challenge",
                    "title": "Code Challenge"
                }
            ]
        },
        {
            "id": "file_delete",
            "title": "Python Delete Files",
            "sections": [
                {
                    "id": "file-delete-basics",
                    "title": "Delete Files"
                }
            ]
        },
        {
            "id": "python_modules_header",
            "title": "Python Modules",
            "sections": []
        },
        {
            "id": "numpy_tutorial",
            "title": "NumPy Tutorial",
            "sections": [
                {
                    "id": "numpy-basics",
                    "title": "NumPy Tutorial"
                }
            ]
        },
        {
            "id": "pandas_tutorial",
            "title": "Pandas Tutorial",
            "sections": [
                {
                    "id": "pandas-basics",
                    "title": "Pandas Tutorial"
                }
            ]
        },
        {
            "id": "scipy_tutorial",
            "title": "SciPy Tutorial",
            "sections": [
                {
                    "id": "scipy-basics",
                    "title": "SciPy Tutorial"
                }
            ]
        },
        {
            "id": "django_tutorial",
            "title": "Django Tutorial",
            "sections": [
                {
                    "id": "django-basics",
                    "title": "Django Tutorial"
                }
            ]
        },
        {
            "id": "matplotlib_header",
            "title": "Python Matplotlib",
            "sections": []
        },
        {
            "id": "matplotlib_intro",
            "title": "Matplotlib Intro",
            "sections": [
                {
                    "id": "matplotlib-intro-basics",
                    "title": "Matplotlib Intro"
                }
            ]
        },
        {
            "id": "matplotlib_get_started",
            "title": "Matplotlib Get Started",
            "sections": [
                {
                    "id": "matplotlib-get-started-basics",
                    "title": "Matplotlib Get Started"
                }
            ]
        },
        {
            "id": "matplotlib_pyplot",
            "title": "Matplotlib Pyplot",
            "sections": [
                {
                    "id": "matplotlib-pyplot-basics",
                    "title": "Matplotlib Pyplot"
                }
            ]
        },
        {
            "id": "matplotlib_plotting",
            "title": "Matplotlib Plotting",
            "sections": [
                {
                    "id": "matplotlib-plotting-basics",
                    "title": "Matplotlib Plotting"
                }
            ]
        },
        {
            "id": "matplotlib_markers",
            "title": "Matplotlib Markers",
            "sections": [
                {
                    "id": "matplotlib-markers-basics",
                    "title": "Matplotlib Markers"
                }
            ]
        },
        {
            "id": "matplotlib_line",
            "title": "Matplotlib Line",
            "sections": [
                {
                    "id": "matplotlib-line-basics",
                    "title": "Matplotlib Line"
                }
            ]
        },
        {
            "id": "matplotlib_labels",
            "title": "Matplotlib Labels",
            "sections": [
                {
                    "id": "matplotlib-labels-basics",
                    "title": "Matplotlib Labels"
                }
            ]
        },
        {
            "id": "matplotlib_grid",
            "title": "Matplotlib Grid",
            "sections": [
                {
                    "id": "matplotlib-grid-basics",
                    "title": "Matplotlib Grid"
                }
            ]
        },
        {
            "id": "matplotlib_subplot",
            "title": "Matplotlib Subplot",
            "sections": [
                {
                    "id": "matplotlib-subplot-basics",
                    "title": "Matplotlib Subplot"
                }
            ]
        },
        {
            "id": "matplotlib_scatter",
            "title": "Matplotlib Scatter",
            "sections": [
                {
                    "id": "matplotlib-scatter-basics",
                    "title": "Matplotlib Scatter"
                }
            ]
        },
        {
            "id": "matplotlib_bars",
            "title": "Matplotlib Bars",
            "sections": [
                {
                    "id": "matplotlib-bars-basics",
                    "title": "Matplotlib Bars"
                }
            ]
        },
        {
            "id": "matplotlib_histograms",
            "title": "Matplotlib Histograms",
            "sections": [
                {
                    "id": "matplotlib-histograms-basics",
                    "title": "Matplotlib Histograms"
                }
            ]
        },
        {
            "id": "matplotlib_pie_charts",
            "title": "Matplotlib Pie Charts",
            "sections": [
                {
                    "id": "matplotlib-pie-charts-basics",
                    "title": "Matplotlib Pie Charts"
                }
            ]
        },
        {
            "id": "machine_learning_header",
            "title": "Machine Learning",
            "sections": []
        },
        {
            "id": "ml_getting_started",
            "title": "Getting Started",
            "sections": [{ "id": "ml-getting-started-basics", "title": "Getting Started" }]
        },
        {
            "id": "ml_mean_median_mode",
            "title": "Mean Median Mode",
            "sections": [{ "id": "ml-mean-median-mode-basics", "title": "Mean Median Mode" }]
        },
        {
            "id": "ml_standard_deviation",
            "title": "Standard Deviation",
            "sections": [{ "id": "ml-standard-deviation-basics", "title": "Standard Deviation" }]
        },
        {
            "id": "ml_percentile",
            "title": "Percentile",
            "sections": [{ "id": "ml-percentile-basics", "title": "Percentile" }]
        },
        {
            "id": "ml_data_distribution",
            "title": "Data Distribution",
            "sections": [{ "id": "ml-data-distribution-basics", "title": "Data Distribution" }]
        },
        {
            "id": "ml_normal_data_distribution",
            "title": "Normal Data Distribution",
            "sections": [{ "id": "ml-normal-data-distribution-basics", "title": "Normal Data Distribution" }]
        },
        {
            "id": "ml_scatter_plot",
            "title": "Scatter Plot",
            "sections": [{ "id": "ml-scatter-plot-basics", "title": "Scatter Plot" }]
        },
        {
            "id": "ml_linear_regression",
            "title": "Linear Regression",
            "sections": [{ "id": "ml-linear-regression-basics", "title": "Linear Regression" }]
        },
        {
            "id": "ml_polynomial_regression",
            "title": "Polynomial Regression",
            "sections": [{ "id": "ml-polynomial-regression-basics", "title": "Polynomial Regression" }]
        },
        {
            "id": "ml_multiple_regression",
            "title": "Multiple Regression",
            "sections": [{ "id": "ml-multiple-regression-basics", "title": "Multiple Regression" }]
        },
        {
            "id": "ml_scale",
            "title": "Scale",
            "sections": [{ "id": "ml-scale-basics", "title": "Scale" }]
        },
        {
            "id": "ml_train_test",
            "title": "Train/Test",
            "sections": [{ "id": "ml-train-test-basics", "title": "Train/Test" }]
        },
        {
            "id": "ml_decision_tree",
            "title": "Decision Tree",
            "sections": [{ "id": "ml-decision-tree-basics", "title": "Decision Tree" }]
        },
        {
            "id": "ml_confusion_matrix",
            "title": "Confusion Matrix",
            "sections": [{ "id": "ml-confusion-matrix-basics", "title": "Confusion Matrix" }]
        },
        {
            "id": "ml_hierarchical_clustering",
            "title": "Hierarchical Clustering",
            "sections": [{ "id": "ml-hierarchical-clustering-basics", "title": "Hierarchical Clustering" }]
        },
        {
            "id": "ml_logistic_regression",
            "title": "Logistic Regression",
            "sections": [{ "id": "ml-logistic-regression-basics", "title": "Logistic Regression" }]
        },
        {
            "id": "ml_grid_search",
            "title": "Grid Search",
            "sections": [{ "id": "ml-grid-search-basics", "title": "Grid Search" }]
        },
        {
            "id": "ml_categorical_data",
            "title": "Categorical Data",
            "sections": [{ "id": "ml-categorical-data-basics", "title": "Categorical Data" }]
        },
        {
            "id": "ml_k_means",
            "title": "K-means",
            "sections": [{ "id": "ml-k-means-basics", "title": "K-means" }]
        },
        {
            "id": "ml_bootstrap_aggregation",
            "title": "Bootstrap Aggregation",
            "sections": [{ "id": "ml-bootstrap-aggregation-basics", "title": "Bootstrap Aggregation" }]
        },
        {
            "id": "ml_cross_validation",
            "title": "Cross Validation",
            "sections": [{ "id": "ml-cross-validation-basics", "title": "Cross Validation" }]
        },
        {
            "id": "ml_auc_roc_curve",
            "title": "AUC - ROC Curve",
            "sections": [{ "id": "ml-auc-roc-curve-basics", "title": "AUC - ROC Curve" }]
        },
        {
            "id": "ml_k_nearest_neighbors",
            "title": "K-nearest neighbors",
            "sections": [{ "id": "ml-k-nearest-neighbors-basics", "title": "K-nearest neighbors" }]
        },
        { "id": "python_dsa_header", "title": "Python DSA", "sections": [] },
        { "id": "dsa_python_dsa", "title": "Python DSA", "sections": [{ "id": "dsa-python-dsa-basics", "title": "Python DSA" }] },
        { "id": "dsa_lists_and_arrays", "title": "Lists and Arrays", "sections": [{ "id": "dsa-lists-and-arrays-basics", "title": "Lists and Arrays" }] },
        { "id": "dsa_stacks", "title": "Stacks", "sections": [{ "id": "dsa-stacks-basics", "title": "Stacks" }] },
        { "id": "dsa_queues", "title": "Queues", "sections": [{ "id": "dsa-queues-basics", "title": "Queues" }] },
        { "id": "dsa_linked_lists", "title": "Linked Lists", "sections": [{ "id": "dsa-linked-lists-basics", "title": "Linked Lists" }] },
        { "id": "dsa_hash_tables", "title": "Hash Tables", "sections": [{ "id": "dsa-hash-tables-basics", "title": "Hash Tables" }] },
        { "id": "dsa_trees", "title": "Trees", "sections": [{ "id": "dsa-trees-basics", "title": "Trees" }] },
        { "id": "dsa_binary_trees", "title": "Binary Trees", "sections": [{ "id": "dsa-binary-trees-basics", "title": "Binary Trees" }] },
        { "id": "dsa_binary_search_trees", "title": "Binary Search Trees", "sections": [{ "id": "dsa-binary-search-trees-basics", "title": "Binary Search Trees" }] },
        { "id": "dsa_avl_trees", "title": "AVL Trees", "sections": [{ "id": "dsa-avl-trees-basics", "title": "AVL Trees" }] },
        { "id": "dsa_graphs", "title": "Graphs", "sections": [{ "id": "dsa-graphs-basics", "title": "Graphs" }] },
        { "id": "dsa_linear_search", "title": "Linear Search", "sections": [{ "id": "dsa-linear-search-basics", "title": "Linear Search" }] },
        { "id": "dsa_binary_search", "title": "Binary Search", "sections": [{ "id": "dsa-binary-search-basics", "title": "Binary Search" }] },
        { "id": "dsa_bubble_sort", "title": "Bubble Sort", "sections": [{ "id": "dsa-bubble-sort-basics", "title": "Bubble Sort" }] },
        { "id": "dsa_selection_sort", "title": "Selection Sort", "sections": [{ "id": "dsa-selection-sort-basics", "title": "Selection Sort" }] },
        { "id": "dsa_insertion_sort", "title": "Insertion Sort", "sections": [{ "id": "dsa-insertion-sort-basics", "title": "Insertion Sort" }] },
        { "id": "dsa_quick_sort", "title": "Quick Sort", "sections": [{ "id": "dsa-quick-sort-basics", "title": "Quick Sort" }] },
        { "id": "dsa_counting_sort", "title": "Counting Sort", "sections": [{ "id": "dsa-counting-sort-basics", "title": "Counting Sort" }] },
        { "id": "dsa_radix_sort", "title": "Radix Sort", "sections": [{ "id": "dsa-radix-sort-basics", "title": "Radix Sort" }] },
        { "id": "dsa_merge_sort", "title": "Merge Sort", "sections": [{ "id": "dsa-merge-sort-basics", "title": "Merge Sort" }] },
        { "id": "python_mysql_header", "title": "Python MySQL", "sections": [] },
        { "id": "mysql_get_started", "title": "MySQL Get Started", "sections": [{ "id": "mysql-get-started-basics", "title": "MySQL Get Started" }] },
        { "id": "mysql_create_database", "title": "MySQL Create Database", "sections": [{ "id": "mysql-create-database-basics", "title": "MySQL Create Database" }] },
        { "id": "mysql_create_table", "title": "MySQL Create Table", "sections": [{ "id": "mysql-create-table-basics", "title": "MySQL Create Table" }] },
        { "id": "mysql_insert", "title": "MySQL Insert", "sections": [{ "id": "mysql-insert-basics", "title": "MySQL Insert" }] },
        { "id": "mysql_select", "title": "MySQL Select", "sections": [{ "id": "mysql-select-basics", "title": "MySQL Select" }] },
        { "id": "mysql_where", "title": "MySQL Where", "sections": [{ "id": "mysql-where-basics", "title": "MySQL Where" }] },
        { "id": "mysql_order_by", "title": "MySQL Order By", "sections": [{ "id": "mysql-order-by-basics", "title": "MySQL Order By" }] },
        { "id": "mysql_delete", "title": "MySQL Delete", "sections": [{ "id": "mysql-delete-basics", "title": "MySQL Delete" }] },
        { "id": "mysql_drop_table", "title": "MySQL Drop Table", "sections": [{ "id": "mysql-drop-table-basics", "title": "MySQL Drop Table" }] },
        { "id": "mysql_update", "title": "MySQL Update", "sections": [{ "id": "mysql-update-basics", "title": "MySQL Update" }] },
        { "id": "mysql_limit", "title": "MySQL Limit", "sections": [{ "id": "mysql-limit-basics", "title": "MySQL Limit" }] },
        { "id": "mysql_join", "title": "MySQL Join", "sections": [{ "id": "mysql-join-basics", "title": "MySQL Join" }] },
        { "id": "python_mongodb_header", "title": "Python MongoDB", "sections": [] },
        { "id": "mongodb_get_started", "title": "MongoDB Get Started", "sections": [{ "id": "mongodb-get-started-basics", "title": "MongoDB Get Started" }] },
        { "id": "mongodb_create_db", "title": "MongoDB Create DB", "sections": [{ "id": "mongodb-create-db-basics", "title": "MongoDB Create DB" }] },
        { "id": "mongodb_collection", "title": "MongoDB Collection", "sections": [{ "id": "mongodb-collection-basics", "title": "MongoDB Collection" }] },
        { "id": "mongodb_insert", "title": "MongoDB Insert", "sections": [{ "id": "mongodb-insert-basics", "title": "MongoDB Insert" }] },
        { "id": "mongodb_find", "title": "MongoDB Find", "sections": [{ "id": "mongodb-find-basics", "title": "MongoDB Find" }] },
        { "id": "mongodb_query", "title": "MongoDB Query", "sections": [{ "id": "mongodb-query-basics", "title": "MongoDB Query" }] },
        { "id": "mongodb_sort", "title": "MongoDB Sort", "sections": [{ "id": "mongodb-sort-basics", "title": "MongoDB Sort" }] },
        { "id": "mongodb_delete", "title": "MongoDB Delete", "sections": [{ "id": "mongodb-delete-basics", "title": "MongoDB Delete" }] },
        { "id": "mongodb_drop_collection", "title": "MongoDB Drop Collection", "sections": [{ "id": "mongodb-drop-collection-basics", "title": "MongoDB Drop Collection" }] },
        { "id": "mongodb_update", "title": "MongoDB Update", "sections": [{ "id": "mongodb-update-basics", "title": "MongoDB Update" }] },
        { "id": "mongodb_limit", "title": "MongoDB Limit", "sections": [{ "id": "mongodb-limit-basics", "title": "MongoDB Limit" }] },
        { "id": "python_reference_header", "title": "Python Reference", "sections": [] },
        { "id": "python_overview", "title": "Python Overview", "sections": [{ "id": "python-overview-basics", "title": "Python Overview" }] },
        { "id": "python_built_in_functions", "title": "Python Built-in Functions", "sections": [{ "id": "python-built-in-functions-basics", "title": "Python Built-in Functions" }] },
        { "id": "python_string_methods", "title": "Python String Methods", "sections": [{ "id": "python-string-methods-basics", "title": "Python String Methods" }] },
        { "id": "python_list_methods", "title": "Python List Methods", "sections": [{ "id": "python-list-methods-basics", "title": "Python List Methods" }] },
        { "id": "python_dictionary_methods", "title": "Python Dictionary Methods", "sections": [{ "id": "python-dictionary-methods-basics", "title": "Python Dictionary Methods" }] },
        { "id": "python_tuple_methods", "title": "Python Tuple Methods", "sections": [{ "id": "python-tuple-methods-basics", "title": "Python Tuple Methods" }] },
        { "id": "python_set_methods", "title": "Python Set Methods", "sections": [{ "id": "python-set-methods-basics", "title": "Python Set Methods" }] },
        { "id": "python_file_methods", "title": "Python File Methods", "sections": [{ "id": "python-file-methods-basics", "title": "Python File Methods" }] },
        { "id": "python_keywords", "title": "Python Keywords", "sections": [{ "id": "python-keywords-basics", "title": "Python Keywords" }] },
        { "id": "python_exceptions", "title": "Python Exceptions", "sections": [{ "id": "python-exceptions-basics", "title": "Python Exceptions" }] },
        { "id": "python_glossary", "title": "Python Glossary", "sections": [{ "id": "python-glossary-basics", "title": "Python Glossary" }] },
        { "id": "module_reference_header", "title": "Module Reference", "sections": [] },
        { "id": "built_in_modules", "title": "Built-in Modules", "sections": [{ "id": "built-in-modules-basics", "title": "Built-in Modules" }] },
        { "id": "random_module", "title": "Random Module", "sections": [{ "id": "random-module-basics", "title": "Random Module" }] },
        { "id": "requests_module", "title": "Requests Module", "sections": [{ "id": "requests-module-basics", "title": "Requests Module" }] },
        { "id": "statistics_module", "title": "Statistics Module", "sections": [{ "id": "statistics-module-basics", "title": "Statistics Module" }] },
        { "id": "math_module", "title": "Math Module", "sections": [{ "id": "math-module-basics", "title": "Math Module" }] },
        { "id": "cmath_module", "title": "cMath Module", "sections": [{ "id": "cmath-module-basics", "title": "cMath Module" }] },
        { "id": "python_how_to_header", "title": "Python How To", "sections": [] },
        { "id": "remove_list_duplicates", "title": "Remove List Duplicates", "sections": [{ "id": "remove-list-duplicates-basics", "title": "Remove List Duplicates" }] },
        { "id": "reverse_a_string", "title": "Reverse a String", "sections": [{ "id": "reverse-a-string-basics", "title": "Reverse a String" }] },
        { "id": "add_two_numbers", "title": "Add Two Numbers", "sections": [{ "id": "add-two-numbers-basics", "title": "Add Two Numbers" }] },
        { "id": "python_examples_header", "title": "Python Examples", "sections": [] },
        { "id": "python_examples", "title": "Python Examples", "sections": [{ "id": "python-examples-basics", "title": "Python Examples" }] },
        { "id": "python_compiler", "title": "Python Compiler", "sections": [{ "id": "python-compiler-basics", "title": "Python Compiler" }] },
        { "id": "python_exercises", "title": "Python Exercises", "sections": [{ "id": "python-exercises-basics", "title": "Python Exercises" }] },
        { "id": "python_quiz", "title": "Python Quiz", "sections": [{ "id": "python-quiz-basics", "title": "Python Quiz" }] },
        { "id": "python_challenges", "title": "Python Challenges", "sections": [{ "id": "python-challenges-basics", "title": "Python Challenges" }] },
        { "id": "python_server", "title": "Python Server", "sections": [{ "id": "python-server-basics", "title": "Python Server" }] },
        { "id": "python_syllabus", "title": "Python Syllabus", "sections": [{ "id": "python-syllabus-basics", "title": "Python Syllabus" }] },
        { "id": "python_study_plan", "title": "Python Study Plan", "sections": [{ "id": "python-study-plan-basics", "title": "Python Study Plan" }] },
        { "id": "python_interview_qa", "title": "Python Interview Q&A", "sections": [{ "id": "python-interview-qa-basics", "title": "Python Interview Q&A" }] },
        { "id": "python_bootcamp", "title": "Python Bootcamp", "sections": [{ "id": "python-bootcamp-basics", "title": "Python Bootcamp" }] },
        { "id": "python_certificate", "title": "Python Certificate", "sections": [{ "id": "python-certificate-basics", "title": "Python Certificate" }] },
        { "id": "python_training", "title": "Python Training", "sections": [{ "id": "python-training-basics", "title": "Python Training" }] }
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

if (require.main === module) {
    sync().then(() => {
        console.log('Sync process finished.');
        process.exit(0);
    }).catch(err => {
        console.error('Sync failed:', err);
        process.exit(1);
    });
}

