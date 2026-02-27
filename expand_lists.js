const fs = require('fs');
const file = 'client/src/pages/CourseReaderPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `        /* ────── 9. Python Lists ────── */
        {
            id: 'lists', title: 'Python Lists',
            sections: [
                {
                    id: 'lists-intro', title: 'Python Lists',
                    content: \`<p>Lists are used to store multiple items in a single variable.</p>
<p>Lists are one of 4 built-in data types in Python used to store collections of data. The other 3 are Tuple, Set, and Dictionary.</p>
<p>Lists are created using square brackets <code>[]</code>.</p>
<p>List items are:</p>
<ul>
<li><strong>Ordered</strong> — they have a defined order that will not change.</li>
<li><strong>Changeable</strong> — we can change, add, and remove items after it has been created.</li>
<li><strong>Allow duplicates</strong> — lists can have items with the same value.</li>
</ul>\`,
                    examples: [
                        {
                            title: 'Create a List',
                            code: 'fruits = ["apple", "banana", "cherry"]\\nprint(fruits)\\nprint(type(fruits))  # <class \\'list\\'>\\nprint(len(fruits))   # 3 items',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Create a List</h2>\\n<p>Use square brackets to create a list:</p>\`
                        },
                        {
                            title: 'Allow Duplicates',
                            code: 'fruits = ["apple", "banana", "cherry", "apple", "cherry"]\\nprint(fruits)  # both apples and cherries are kept',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Duplicates Allowed</h2>\\n<p>Because lists are indexed, they can have items with the same value:</p>\`
                        },
                        {
                            title: 'List Data Types',
                            code: 'list1 = ["apple", "banana", "cherry"]    # Strings\\nlist2 = [1, 5, 7, 9, 3]                  # Integers\\nlist3 = [True, False, False]             # Booleans\\n\\n# A list can contain different data types:\\nlist4 = ["abc", 34, True, 40, "male"]\\nprint(list4)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Any Data Type</h2>\\n<p>List items can be of any data type, and a single list can contain different types:</p>\`
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
                    content: \`<p>List items are indexed, which means you can access them by referring to their index number.</p>
<p><strong>Note:</strong> The first item has index <code>0</code>, not <code>1</code>!</p>\`,
                    examples: [
                        {
                            title: 'Access Items',
                            code: 'fruits = ["apple", "banana", "cherry", "orange", "kiwi"]\\nprint(fruits[0])  # apple\\nprint(fruits[1])  # banana',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Access Items</h2>\`
                        },
                        {
                            title: 'Negative Indexing',
                            code: 'fruits = ["apple", "banana", "cherry", "orange", "kiwi"]\\nprint(fruits[-1])  # kiwi (last item)\\nprint(fruits[-2])  # orange (second to last)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Negative Indexing</h2>\\n<p><code>-1</code> refers to the last item, <code>-2</code> refers to the second last item etc.</p>\`
                        },
                        {
                            title: 'Range of Indexes (Slicing)',
                            code: 'fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]\\n\\nprint(fruits[2:5])   # [\\'cherry\\', \\'orange\\', \\'kiwi\\']\\nprint(fruits[:4])    # Starts from beginning: [\\'apple\\', \\'banana\\', \\'cherry\\', \\'orange\\']\\nprint(fruits[4:])    # Goes to the end: [\\'kiwi\\', \\'melon\\', \\'mango\\']\\nprint(fruits[-4:-1]) # Negative slice: [\\'orange\\', \\'kiwi\\', \\'melon\\']',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Range of Indexes</h2>\\n<p>You can specify a range of indexes. The return value will be a <strong>new list</strong>.</p>\`
                        },
                        {
                            title: 'Check if Item Exists',
                            code: 'fruits = ["apple", "banana", "cherry"]\\nif "apple" in fruits:\\n    print("Yes, apple is in the fruits list")\\nelse:\\n    print("No, not found")',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Check If Exists</h2>\\n<p>Use the <code>in</code> keyword to check if an item exists:</p>\`
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
                    content: \`<p>To change the value of a specific item, refer to the index number.</p>\`,
                    examples: [
                        {
                            title: 'Change Item Value',
                            code: 'fruits = ["apple", "banana", "cherry"]\\nfruits[1] = "blackcurrant"\\nprint(fruits)  # [\\'apple\\', \\'blackcurrant\\', \\'cherry\\']',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Change One Item</h2>\`
                        },
                        {
                            title: 'Change a Range of Item Values',
                            code: 'fruits = ["apple", "banana", "cherry", "orange", "kiwi", "mango"]\\nfruits[1:3] = ["blackcurrant", "watermelon"]\\nprint(fruits)  # [\\'apple\\', \\'blackcurrant\\', \\'watermelon\\', \\'orange\\', \\'kiwi\\', \\'mango\\']',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Change Multiple Items</h2>\\n<p>Specify a range and assign a new list of values.</p>\`
                        },
                        {
                            title: 'Insert Items',
                            code: 'fruits = ["apple", "banana", "cherry"]\\nfruits.insert(2, "watermelon")\\nprint(fruits)  # [\\'apple\\', \\'banana\\', \\'watermelon\\', \\'cherry\\']',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Insert Items</h2>\\n<p>To insert a new item without replacing any existing values, use the <code>insert()</code> method.</p>\`
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
                    content: \`<p>Python has several methods to add new items to a list.</p>\`,
                    examples: [
                        {
                            title: 'Append Items',
                            code: 'fruits = ["apple", "banana", "cherry"]\\nfruits.append("orange")\\nprint(fruits)  # [\\'apple\\', \\'banana\\', \\'cherry\\', \\'orange\\']',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Append</h2>\\n<p>To add an item to the <strong>end</strong> of the list, use the <code>append()</code> method:</p>\`
                        },
                        {
                            title: 'Insert Items',
                            code: 'fruits = ["apple", "banana", "cherry"]\\nfruits.insert(1, "orange")\\nprint(fruits)  # [\\'apple\\', \\'orange\\', \\'banana\\', \\'cherry\\']',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Insert</h2>\\n<p>To insert an item at a <strong>specified index</strong>, use <code>insert()</code>:</p>\`
                        },
                        {
                            title: 'Extend List',
                            code: 'fruits = ["apple", "banana", "cherry"]\\ntropical = ["mango", "pineapple", "papaya"]\\nfruits.extend(tropical)\\nprint(fruits)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Extend</h2>\\n<p>To append elements from <strong>another list</strong> to the current list, use <code>extend()</code>:</p>\`
                        },
                        {
                            title: 'Add Any Iterable',
                            code: 'fruits = ["apple", "banana"]\\nmytuple = ("kiwi", "orange")  # A tuple\\nfruits.extend(mytuple)        # Works with tuples, sets, dictionaries!\\nprint(fruits)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Add Any Iterable</h2>\\n<p>The <code>extend()</code> method doesn\\'t have to append lists, you can add any iterable object.</p>\`
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
                    content: \`<p>There are multiple ways to remove items from a list.</p>\`,
                    examples: [
                        {
                            title: 'Remove Specified Item',
                            code: 'fruits = ["apple", "banana", "cherry", "banana"]\\nfruits.remove("banana")\\nprint(fruits)  # Removes the FIRST occurrence of "banana"',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The remove() Method</h2>\\n<p><code>remove()</code> removes the specified item:</p>\`
                        },
                        {
                            title: 'Remove Specified Index',
                            code: 'fruits = ["apple", "banana", "cherry"]\\nfruits.pop(1)\\nprint(fruits)  # [\\'apple\\', \\'cherry\\']\\n\\n# Without index, pop() removes the last item:\\nfruits.pop()\\nprint(fruits)  # [\\'apple\\']',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The pop() Method</h2>\\n<p><code>pop()</code> removes the specified index. If you don\\'t specify an index, it removes the last item.</p>\`
                        },
                        {
                            title: 'The del Keyword',
                            code: 'fruits = ["apple", "banana", "cherry"]\\ndel fruits[0]\\nprint(fruits)  # [\\'banana\\', \\'cherry\\']\\n\\n# You can also delete the entire list\\ndel fruits',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The del Keyword</h2>\\n<p><code>del</code> can remove an index or delete the entire list completely:</p>\`
                        },
                        {
                            title: 'Clear the List',
                            code: 'fruits = ["apple", "banana", "cherry"]\\nfruits.clear()\\nprint(fruits)  # [] — the list still exists, but has no content',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The clear() Method</h2>\\n<p><code>clear()</code> empties the list:</p>\`
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
                    content: \`<p>You can loop through the list items by using a <code>for</code> loop.</p>\`,
                    examples: [
                        {
                            title: 'Loop Through Items',
                            code: 'fruits = ["apple", "banana", "cherry"]\\nfor fruit in fruits:\\n    print(fruit)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Loop Through Items</h2>\`
                        },
                        {
                            title: 'Loop Through Index Numbers',
                            code: 'fruits = ["apple", "banana", "cherry"]\\nfor i in range(len(fruits)):\\n    print(f"Index {i}: {fruits[i]}")',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Loop Through Indexes</h2>\\n<p>Use <code>range()</code> and <code>len()</code> to create a suitable iterable.</p>\`
                        },
                        {
                            title: 'Using a While Loop',
                            code: 'fruits = ["apple", "banana", "cherry"]\\ni = 0\\nwhile i < len(fruits):\\n    print(fruits[i])\\n    i += 1',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Using While Loop</h2>\\n<p>You can loop using a <code>while</code> loop and an index number.</p>\`
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
                    content: \`<p>List comprehension offers a shorter syntax when you want to create a new list based on the values of an existing list.</p>\`,
                    examples: [
                        {
                            title: 'Without List Comprehension',
                            code: 'fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\\nnewlist = []\\n\\nfor fruit in fruits:\\n    if "a" in fruit:\\n        newlist.append(fruit)\\n\\nprint(newlist)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The Long Way</h2>\\n<p>You want a new list with only fruits containing "a":</p>\`
                        },
                        {
                            title: 'With List Comprehension',
                            code: 'fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\\n\\n# One line of code!\\nnewlist = [fruit for fruit in fruits if "a" in fruit]\\n\\nprint(newlist)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The Short Way</h2>\\n<p>You can do it in one line with list comprehension:</p>\`
                        },
                        {
                            title: 'Syntax: [expression for item in iterable if condition == True]',
                            code: '# Condition is optional\\nall_upper = [f.upper() for f in fruits]\\n\\n# Range iterable\\nnumbers = [x for x in range(10)]\\n\\n# With condition\\nevens = [x for x in range(10) if x % 2 == 0]\\n\\nprint(all_upper)\\nprint(numbers)\\nprint(evens)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Syntax</h2>\`
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
                    content: \`<p>List objects have a <code>sort()</code> method that will sort the list alphanumerically, ascending, by default.</p>\`,
                    examples: [
                        {
                            title: 'Sort Alphanumerically',
                            code: 'fruits = ["orange", "mango", "kiwi", "pineapple", "banana"]\\nfruits.sort()\\nprint(fruits)\\n\\nnumbers = [100, 50, 65, 82, 23]\\nnumbers.sort()\\nprint(numbers)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Sort Ascending</h2>\`
                        },
                        {
                            title: 'Sort Descending',
                            code: 'fruits = ["orange", "mango", "kiwi", "pineapple", "banana"]\\nfruits.sort(reverse = True)\\nprint(fruits)\\n\\nnumbers = [100, 50, 65, 82, 23]\\nnumbers.sort(reverse = True)\\nprint(numbers)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Sort Descending</h2>\\n<p>Use the keyword argument <code>reverse = True</code>:</p>\`
                        },
                        {
                            title: 'Case Insensitive Sort',
                            code: 'fruits = ["banana", "Orange", "Kiwi", "cherry"]\\n\\n# By default, capital letters are sorted before lower case!\\nfruits.sort()\\nprint("Default sort:", fruits)\\n\\n# Case-insensitive sort\\nfruits.sort(key = str.lower)\\nprint("Case insensitive:", fruits)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Case Insensitive Sort</h2>\\n<p>By default, capital letters sort before lowercase. To ignore case, use <code>key = str.lower</code></p>\`
                        },
                        {
                            title: 'Reverse Order',
                            code: 'fruits = ["apple", "banana", "cherry"]\\nfruits.reverse()\\nprint(fruits)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Reverse Order</h2>\\n<p>Use the <code>reverse()</code> method reverses the current sorting order of the elements.</p>\`
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
                    content: \`<p>You cannot copy a list simply by typing <code>list2 = list1</code>, because: <code>list2</code> will only be a <em>reference</em> to <code>list1</code>, and changes made in <code>list1</code> will automatically also be made in <code>list2</code>.</p>\`,
                    examples: [
                        {
                            title: 'The Reference Problem (Why we copy)',
                            code: 'list1 = ["apple", "banana"]\\nlist2 = list1   # This is just a reference, NOT a copy!\\n\\nlist1.append("cherry")\\nprint(list2)    # list2 changed too! [\\'apple\\', \\'banana\\', \\'cherry\\']',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">The Reference Problem</h2>\`
                        },
                        {
                            title: 'Alternative 1: Use the copy() method',
                            code: 'thislist = ["apple", "banana", "cherry"]\\nmylist = thislist.copy()\\n\\nthislist.append("orange")\\nprint("Original:", thislist)\\nprint("Copy:", mylist)  # The copy did NOT change!',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Proper Copy with copy()</h2>\`
                        },
                        {
                            title: 'Alternative 2: Use the list() function',
                            code: 'thislist = ["apple", "banana", "cherry"]\\nmylist = list(thislist)\\nprint(mylist)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Proper Copy with list()</h2>\`
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
                    content: \`<p>There are several ways to join, or concatenate, two or more lists in Python.</p>\`,
                    examples: [
                        {
                            title: 'Using the + Operator',
                            code: 'list1 = ["a", "b", "c"]\\nlist2 = [1, 2, 3]\\n\\nlist3 = list1 + list2\\nprint(list3)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Using + Operator</h2>\\n<p>One of the easiest ways is using the <code>+</code> operator.</p>\`
                        },
                        {
                            title: 'Using append() in a loop',
                            code: 'list1 = ["a", "b", "c"]\\nlist2 = [1, 2, 3]\\n\\nfor x in list2:\\n    list1.append(x)\\n\\nprint(list1)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Using append()</h2>\\n<p>You can append items one by one.</p>\`
                        },
                        {
                            title: 'Using the extend() method',
                            code: 'list1 = ["a", "b", "c"]\\nlist2 = [1, 2, 3]\\n\\nlist1.extend(list2)\\nprint(list1)',
                            preContent: \`<h2 style="font-size: 30px; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">Using extend()</h2>\\n<p>The <code>extend()</code> method appends elements from one list to another.</p>\`
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
                    starterCode: '# Create empty list\\n\\n# Append elements\\n\\n# Insert at index 1\\n\\n# Remove an element\\n\\n# Print list and length\\n',
                    solution: 'my_list = []\\nmy_list.append(10)\\nmy_list.append(20)\\nmy_list.append(30)\\nmy_list.insert(1, 15)\\nmy_list.remove(20)\\nprint(f"List: {my_list}, Length: {len(my_list)}")',
                    content: \`<p>Test your knowledge of Python Lists!</p>\`
                }
            ]
        },`;

let startIndex = content.indexOf('        /* ────── 9. Python Lists ────── */');
let endIndex = content.indexOf('        /* ────── 10. Python If...Else ────── */');

if (startIndex !== -1 && endIndex !== -1) {
    let before = content.substring(0, startIndex);
    let after = content.substring(endIndex);
    fs.writeFileSync(file, before + replacement + "\n\n" + after);
    console.log("Success");
} else {
    console.log("Section not found");
}
