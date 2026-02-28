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

if (require.main === module) {
    sync().then(() => {
        console.log('Sync process finished.');
        process.exit(0);
    }).catch(err => {
        console.error('Sync failed:', err);
        process.exit(1);
    });
}

