const { Challenge, sequelize } = require('./models');

async function seedChallenges() {
    await sequelize.authenticate();
    await sequelize.sync();

    const challenges = [
        {
            title: "Two Sum",
            description: "<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indices of the two numbers that add up to <code>target</code>.</p>\n<p><strong>Input format:</strong></p>\n<pre><code>4          ← length of array\n2 7 11 15  ← numbers\n9          ← target</code></pre>\n<p><strong>Example:</strong></p>\n<pre><code>Input:\n4\n2 7 11 15\n9\n\nOutput: [0, 1]</code></pre>",
            difficulty: "easy",
            xpReward: 20,
            testCases: [
                { input: "4\n2 7 11 15\n9", expectedOutput: "[0, 1]" },
                { input: "3\n3 2 4\n6", expectedOutput: "[1, 2]" },
                { input: "2\n3 3\n6", expectedOutput: "[0, 1]" }
            ],
            starterCode: "import sys\ndata = sys.stdin.read().split()\nn = int(data[0])\nnums = [int(x) for x in data[1:n+1]]\ntarget = int(data[n+1])\n\n# Write your solution here and print the result\n# Example: print([0, 1])\n",
            tags: ["Array", "Hash Table"],
            topics: ["Easy", "Top Interview Questions"]
        },
        {
            title: "Reverse String",
            description: "<p>Read a string and print it reversed.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: hello\nOutput: olleh</code></pre>",
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "hello", expectedOutput: "olleh" },
                { input: "Hannah", expectedOutput: "hannaH" },
                { input: "a", expectedOutput: "a" }
            ],
            starterCode: "s = input()\n\n# Write your solution and print the result\n"
        },
        {
            title: "Fizz Buzz",
            description: "<p>Given <code>n</code>, for each number from 1 to n print:</p>\n<ul>\n<li><code>FizzBuzz</code> if divisible by 3 and 5</li>\n<li><code>Fizz</code> if divisible by 3</li>\n<li><code>Buzz</code> if divisible by 5</li>\n<li>Otherwise the number itself</li>\n</ul>\n<p><strong>Example:</strong></p>\n<pre><code>Input: 5\nOutput:\n1\n2\nFizz\n4\nBuzz</code></pre>",
            difficulty: "easy",
            xpReward: 10,
            testCases: [
                { input: "3", expectedOutput: "1\n2\nFizz" },
                { input: "5", expectedOutput: "1\n2\nFizz\n4\nBuzz" },
                { input: "15", expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" }
            ],
            starterCode: "n = int(input())\n\n# Write your solution — print one result per line\n"
        },
        {
            title: "Longest Substring Without Repeating Characters",
            description: "<p>Given a string, find the length of the longest substring without repeating characters.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: abcabcbb\nOutput: 3</code></pre>",
            difficulty: "medium",
            xpReward: 40,
            testCases: [
                { input: "abcabcbb", expectedOutput: "3" },
                { input: "bbbbb", expectedOutput: "1" },
                { input: "pwwkew", expectedOutput: "3" }
            ],
            starterCode: "s = input()\n\n# Write your solution and print the length\n"
        },
        {
            title: "Palindrome Number",
            description: "<p>Given an integer <code>x</code>, print <code>True</code> if it is a palindrome, <code>False</code> otherwise.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: 121\nOutput: True</code></pre>",
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "121", expectedOutput: "True" },
                { input: "-121", expectedOutput: "False" },
                { input: "10", expectedOutput: "False" }
            ],
            starterCode: "x = int(input())\n\n# Write your solution and print True or False\n"
        },
        {
            title: "Valid Parentheses",
            description: "<p>Given a string with only <code>( ) { } [ ]</code>, print <code>True</code> if brackets are valid, <code>False</code> otherwise.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: ()[]{}\nOutput: True</code></pre>",
            difficulty: "easy",
            xpReward: 20,
            testCases: [
                { input: "()", expectedOutput: "True" },
                { input: "()[]{}", expectedOutput: "True" },
                { input: "(]", expectedOutput: "False" }
            ],
            starterCode: "s = input()\n\n# Write your solution and print True or False\n"
        },
        {
            title: "Merge Intervals",
            description: "<p>Given a list of intervals, merge all overlapping ones and print the result.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1, 6], [8, 10], [15, 18]]</code></pre>",
            difficulty: "medium",
            xpReward: 35,
            testCases: [
                { input: "[[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1, 6], [8, 10], [15, 18]]" },
                { input: "[[1,4],[4,5]]", expectedOutput: "[[1, 5]]" },
                { input: "[[1,4],[2,3]]", expectedOutput: "[[1, 4]]" }
            ],
            starterCode: "import ast\nintervals = ast.literal_eval(input())\n\n# Write your solution and print the merged list\n"
        },
        {
            title: "Container With Most Water",
            description: "<p>Given an array of heights, find the maximum water that can be trapped between two vertical lines.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [1,8,6,2,5,4,8,3,7]\nOutput: 49</code></pre>",
            difficulty: "medium",
            xpReward: 30,
            testCases: [
                { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" },
                { input: "[1,1]", expectedOutput: "1" },
                { input: "[4,3,2,1,4]", expectedOutput: "16" }
            ],
            starterCode: "import ast\nheight = ast.literal_eval(input())\n\n# Write your solution and print the max water\n"
        },
        {
            title: "Trapping Rain Water",
            description: "<p>Given an elevation map as a list of heights, compute how much water gets trapped.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6</code></pre>",
            difficulty: "hard",
            xpReward: 60,
            testCases: [
                { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6" },
                { input: "[4,2,0,3,2,5]", expectedOutput: "9" },
                { input: "[2,0,2]", expectedOutput: "2" }
            ],
            starterCode: "import ast\nheight = ast.literal_eval(input())\n\n# Write your solution and print the total trapped water\n"
        },
        {
            title: "Climbing Stairs",
            description: "<p>You can climb 1 or 2 steps at a time. How many distinct ways to reach the top of <code>n</code> stairs?</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: 3\nOutput: 3</code></pre>",
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "2", expectedOutput: "2" },
                { input: "3", expectedOutput: "3" },
                { input: "5", expectedOutput: "8" }
            ],
            starterCode: "n = int(input())\n\n# Write your solution and print the number of ways\n"
        },
        {
            title: "Best Time to Buy and Sell Stock",
            description: "<p>Given daily stock prices, find the max profit from one buy and one sell. Print 0 if no profit is possible.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [7,1,5,3,6,4]\nOutput: 5</code></pre>",
            difficulty: "easy",
            xpReward: 20,
            testCases: [
                { input: "[7,1,5,3,6,4]", expectedOutput: "5" },
                { input: "[7,6,4,3,1]", expectedOutput: "0" },
                { input: "[2,4,1]", expectedOutput: "2" }
            ],
            starterCode: "import ast\nprices = ast.literal_eval(input())\n\n# Write your solution and print the max profit\n"
        },
        {
            title: "Single Number",
            description: "<p>Every element appears twice except one. Find and print the unique element.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [4,1,2,1,2]\nOutput: 4</code></pre>",
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "[2,2,1]", expectedOutput: "1" },
                { input: "[4,1,2,1,2]", expectedOutput: "4" },
                { input: "[1]", expectedOutput: "1" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Write your solution and print the unique number\n"
        },
        {
            title: "Search Insert Position",
            description: "<p>Given a sorted array and a target, return its index if found, or where it should be inserted.</p>\n<p><strong>Input format:</strong> First line: the sorted array. Second line: target.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input:\n[1,3,5,6]\n5\nOutput: 2</code></pre>",
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "[1,3,5,6]\n5", expectedOutput: "2" },
                { input: "[1,3,5,6]\n2", expectedOutput: "1" },
                { input: "[1,3,5,6]\n7", expectedOutput: "4" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\ntarget = int(input())\n\n# Write your solution and print the index\n"
        },
        {
            title: "Group Anagrams",
            description: "<p>Group the anagrams from the given list of strings. Order of groups doesn't matter.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\nOutput: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]</code></pre>",
            difficulty: "medium",
            xpReward: 40,
            testCases: [
                { input: "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", expectedOutput: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]" },
                { input: "[\"\"]", expectedOutput: "[[\"\"]]" },
                { input: "[\"a\"]", expectedOutput: "[[\"a\"]]" }
            ],
            starterCode: "import ast\nstrs = ast.literal_eval(input())\n\n# Write your solution and print the grouped list\n"
        },
        {
            title: "Contains Duplicate",
            description: "<p>Given an integer array <code>nums</code>, return <code>True</code> if any value appears at least twice in the array, and return <code>False</code> if every element is distinct.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [1,2,3,1]\nOutput: True</code></pre>",
            difficulty: "easy",
            xpReward: 10,
            testCases: [
                { input: "[1,2,3,1]", expectedOutput: "True" },
                { input: "[1,2,3,4]", expectedOutput: "False" },
                { input: "[1,1,1,3,3,4,3,2,4,2]", expectedOutput: "True" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Write your solution and print True or False\n"
        },
        {
            title: "Missing Number",
            description: "<p>Given an array <code>nums</code> containing <code>n</code> distinct numbers in the range <code>[0, n]</code>, return the only number in the range that is missing from the array.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [3,0,1]\nOutput: 2</code></pre>",
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "[3,0,1]", expectedOutput: "2" },
                { input: "[0,1]", expectedOutput: "2" },
                { input: "[9,6,4,2,3,5,7,0,1]", expectedOutput: "8" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Write your solution and print the missing number\n"
        },
        {
            title: "Move Zeroes",
            description: "<p>Given an integer array <code>nums</code>, move all <code>0</code>'s to the end of it while maintaining the relative order of the non-zero elements.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [0,1,0,3,12]\nOutput: [1, 3, 12, 0, 0]</code></pre>",
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "[0,1,0,3,12]", expectedOutput: "[1, 3, 12, 0, 0]" },
                { input: "[0]", expectedOutput: "[0]" },
                { input: "[1,0]", expectedOutput: "[1, 0]" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Write your solution and print the modified array\n"
        },
        {
            title: "Majority Element",
            description: "<p>Given an array <code>nums</code> of size <code>n</code>, return the majority element. The majority element is the element that appears more than <code>⌊n / 2⌋</code> times.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [3,2,3]\nOutput: 3</code></pre>",
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "[3,2,3]", expectedOutput: "3" },
                { input: "[2,2,1,1,1,2,2]", expectedOutput: "2" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Write your solution and print the majority element\n"
        },
        {
            title: "Top K Frequent Elements",
            description: "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code> most frequent elements. You may return the answer in any order.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input:\n[1,1,1,2,2,3]\n2\nOutput: [1, 2]</code></pre>",
            difficulty: "medium",
            xpReward: 40,
            testCases: [
                { input: "[1,1,1,2,2,3]\n2", expectedOutput: "[1, 2]" },
                { input: "[1]\n1", expectedOutput: "[1]" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\nk = int(input())\n\n# Write your solution and print the list of k most frequent elements\n"
        },
        {
            title: "Unique Paths",
            description: "<p>A robot is on an <code>m x n</code> grid. The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner. How many possible unique paths are there?</p>\n<p><strong>Input:</strong> Two integers <code>m</code> and <code>n</code> on separate lines.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input:\n3\n7\nOutput: 28</code></pre>",
            difficulty: "medium",
            xpReward: 35,
            testCases: [
                { input: "3\n7", expectedOutput: "28" },
                { input: "3\n2", expectedOutput: "3" }
            ],
            starterCode: "m = int(input())\nn = int(input())\n\n# Write your solution and print the number of unique paths\n"
        },
        {
            title: "Valid Anagram",
            description: "<p>Given two strings <code>s</code> and <code>t</code>, return <code>True</code> if <code>t</code> is an anagram of <code>s</code>, and <code>False</code> otherwise.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input:\nanagram\nnagaram\nOutput: True</code></pre>",
            difficulty: "easy",
            xpReward: 10,
            testCases: [
                { input: "anagram\nnagaram", expectedOutput: "True" },
                { input: "rat\ncar", expectedOutput: "False" }
            ],
            starterCode: "s = input()\nt = input()\n\n# Write your solution and print True or False\n"
        },
        {
            title: "Valid Palindrome",
            description: "<p>A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: \"A man, a plan, a canal: Panama\"\nOutput: True</code></pre>",
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "A man, a plan, a canal: Panama", expectedOutput: "True" },
                { input: "race a car", expectedOutput: "False" },
                { input: " ", expectedOutput: "True" }
            ],
            starterCode: "s = input()\n\n# Write your solution and print True or False\n"
        },
        {
            title: "Merge Sorted Array",
            description: "<p>You are given two integer arrays <code>nums1</code> and <code>nums2</code>, sorted in non-decreasing order, and two integers <code>m</code> and <code>n</code>. Merge <code>nums2</code> into <code>nums1</code> as one sorted array.</p>\n<p><strong>Input format:</strong> First line: <code>nums1</code>. Second line: <code>m</code>. Third line: <code>nums2</code>. Fourth line: <code>n</code>.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input:\n[1,2,3,0,0,0]\n3\n[2,5,6]\n3\nOutput: [1, 2, 2, 3, 5, 6]</code></pre>",
            difficulty: "easy",
            xpReward: 20,
            testCases: [
                { input: "[1,2,3,0,0,0]\n3\n[2,5,6]\n3", expectedOutput: "[1, 2, 2, 3, 5, 6]" },
                { input: "[1]\n1\n[]\n0", expectedOutput: "[1]" },
                { input: "[0]\n0\n[1]\n1", expectedOutput: "[1]" }
            ],
            starterCode: "import ast\nnums1 = ast.literal_eval(input())\nm = int(input())\nnums2 = ast.literal_eval(input())\nn = int(input())\n\n# Write your solution and print the merged array\n"
        },
        {
            title: "Maximum Subarray",
            description: "<p>Given an integer array <code>nums</code>, find the subarray with the largest sum, and return its sum.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6</code></pre>",
            difficulty: "easy",
            xpReward: 20,
            testCases: [
                { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
                { input: "[1]", expectedOutput: "1" },
                { input: "[5,4,-1,7,8]", expectedOutput: "23" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Write your solution and print the maximum sum\n"
        },
        {
            title: "Longest Common Prefix",
            description: "<p>Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string <code>\"\"</code>.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [\"flower\",\"flow\",\"flight\"]\nOutput: \"fl\"</code></pre>",
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "[\"flower\",\"flow\",\"flight\"]", expectedOutput: "\"fl\"" },
                { input: "[\"dog\",\"racecar\",\"car\"]", expectedOutput: "\"\"" }
            ],
            starterCode: "import ast\nstrs = ast.literal_eval(input())\n\n# Write your solution and print the prefix (quoted)\n"
        },
        {
            title: "Squares of a Sorted Array",
            description: "<p>Given an integer array <code>nums</code> sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [-4,-1,0,3,10]\nOutput: [0, 1, 9, 16, 100]</code></pre>",
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "[-4,-1,0,3,10]", expectedOutput: "[0, 1, 9, 16, 100]" },
                { input: "[-7,-3,2,3,11]", expectedOutput: "[4, 9, 9, 49, 121]" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Write your solution and print the sorted squares\n"
        },
        {
            title: "3Sum",
            description: "<p>Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [-1,0,1,2,-1,-4]\nOutput: [[-1, -1, 2], [-1, 0, 1]]</code></pre>",
            difficulty: "medium",
            xpReward: 45,
            testCases: [
                { input: "[-1,0,1,2,-1,-4]", expectedOutput: "[[-1, -1, 2], [-1, 0, 1]]" },
                { input: "[0,1,1]", expectedOutput: "[]" },
                { input: "[0,0,0]", expectedOutput: "[[0, 0, 0]]" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Write your solution and print the list of unique triplets\n"
        },
        {
            title: "Product of Array Except Self",
            description: "<p>Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is equal to the product of all the elements of <code>nums</code> except <code>nums[i]</code>.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [1,2,3,4]\nOutput: [24, 12, 8, 6]</code></pre>",
            difficulty: "medium",
            xpReward: 40,
            testCases: [
                { input: "[1,2,3,4]", expectedOutput: "[24, 12, 8, 6]" },
                { input: "[-1,1,0,-3,3]", expectedOutput: "[0, 0, 9, 0, 0]" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Write your solution and print the product array\n"
        },
        {
            title: "Rotate Array",
            description: "<p>Given an integer array <code>nums</code>, rotate the array to the right by <code>k</code> steps, where <code>k</code> is non-negative.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input:\n[1,2,3,4,5,6,7]\n3\nOutput: [5, 6, 7, 1, 2, 3, 4]</code></pre>",
            difficulty: "medium",
            xpReward: 35,
            testCases: [
                { input: "[1,2,3,4,5,6,7]\n3", expectedOutput: "[5, 6, 7, 1, 2, 3, 4]" },
                { input: "[-1,-100,3,99]\n2", expectedOutput: "[3, 99, -1, -100]" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\nk = int(input())\n\n# Write your solution and print the rotated array\n"
        },
        {
            title: "Subsets",
            description: "<p>Given an integer array <code>nums</code> of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [1,2,3]\nOutput: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]</code></pre>",
            difficulty: "medium",
            xpReward: 40,
            testCases: [
                { input: "[1,2,3]", expectedOutput: "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]" },
                { input: "[0]", expectedOutput: "[[], [0]]" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Write your solution and print the list of semua subsets\n"
        },
        {
            title: "Search in Rotated Sorted Array",
            description: "<p>There is an integer array <code>nums</code> sorted in ascending order (with distinct values) that is rotated at some pivot. Given the array <code>nums</code> after the rotation and an integer <code>target</code>, return the index of <code>target</code> if it is in <code>nums</code>, or <code>-1</code> if it is not in <code>nums</code>.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input:\n[4,5,6,7,0,1,2]\n0\nOutput: 4</code></pre>",
            difficulty: "medium",
            xpReward: 45,
            testCases: [
                { input: "[4,5,6,7,0,1,2]\n0", expectedOutput: "4" },
                { input: "[4,5,6,7,0,1,2]\n3", expectedOutput: "-1" },
                { input: "[1]\n0", expectedOutput: "-1" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\ntarget = int(input())\n\n# Write your solution and print the index\n"
        },
        {
            title: "Kth Largest Element in an Array",
            description: "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code>th largest element in the array.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input:\n[3,2,1,5,6,4]\n2\nOutput: 5</code></pre>",
            difficulty: "medium",
            xpReward: 35,
            testCases: [
                { input: "[3,2,1,5,6,4]\n2", expectedOutput: "5" },
                { input: "[3,2,3,1,2,4,5,5,6]\n4", expectedOutput: "4" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\nk = int(input())\n\n# Write your solution and print the kth largest value\n"
        },
        {
            title: "Median of Two Sorted Arrays",
            description: "<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return the median of the two sorted arrays.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input:\n[1,3]\n[2]\nOutput: 2.0</code></pre>",
            difficulty: "hard",
            xpReward: 60,
            testCases: [
                { input: "[1,3]\n[2]", expectedOutput: "2.0" },
                { input: "[1,2]\n[3,4]", expectedOutput: "2.5" }
            ],
            starterCode: "import ast\nnums1 = ast.literal_eval(input())\nnums2 = ast.literal_eval(input())\n\n# Write your solution and print the median as a float\n"
        },
        {
            title: "Merge k Sorted Lists",
            description: "<p>You are given an array of <code>k</code> linked-lists <code>lists</code>, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [[1,4,5],[1,3,4],[2,6]]\nOutput: [1, 1, 2, 3, 4, 4, 5, 6]</code></pre>",
            difficulty: "hard",
            xpReward: 65,
            testCases: [
                { input: "[[1,4,5],[1,3,4],[2,6]]", expectedOutput: "[1, 1, 2, 3, 4, 4, 5, 6]" },
                { input: "[]", expectedOutput: "[]" },
                { input: "[[]]", expectedOutput: "[]" }
            ],
            starterCode: "import ast\nlists = ast.literal_eval(input())\n\n# Write your solution and print the merged sorted list\n"
        },
        {
            title: "First Missing Positive",
            description: "<p>Given an unsorted integer array <code>nums</code>, return the smallest missing positive integer.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: [1,2,0]\nOutput: 3</code></pre>",
            difficulty: "hard",
            xpReward: 55,
            testCases: [
                { input: "[1,2,0]", expectedOutput: "3" },
                { input: "[3,4,-1,1]", expectedOutput: "2" },
                { input: "[7,8,9,11,12]", expectedOutput: "1" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Write your solution and print the result\n"
        },
        {
            title: "Longest Valid Parentheses",
            description: "<p>Given a string containing just the characters <code>'('</code> and <code>')'</code>, find the length of the longest valid (well-formed) parentheses substring.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: (()) \nOutput: 4</code></pre>",
            difficulty: "hard",
            xpReward: 60,
            testCases: [
                { input: "(()", expectedOutput: "2" },
                { input: ")()())", expectedOutput: "4" },
                { input: "", expectedOutput: "0" }
            ],
            starterCode: "s = input()\n\n# Write your solution and print the length\n"
        },
        {
            title: "N-Queens",
            description: "<p>The n-queens puzzle is the problem of placing <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other. Return the number of distinct solutions.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input: 4\nOutput: 2</code></pre>",
            difficulty: "hard",
            xpReward: 70,
            testCases: [
                { input: "4", expectedOutput: "2" },
                { input: "1", expectedOutput: "1" },
                { input: "8", expectedOutput: "92" }
            ],
            starterCode: "n = int(input())\n\n# Write your solution and print the number of solutions\n"
        },
        {
            title: "Sliding Window Maximum",
            description: "<p>You are given an array of integers <code>nums</code>, there is a sliding window of size <code>k</code> which is moving from the very left of the array to the very right. You can only see the <code>k</code> numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.</p>\n<p><strong>Example:</strong></p>\n<pre><code>Input:\n[1,3,-1,-3,5,3,6,7]\n3\nOutput: [3, 3, 5, 5, 6, 7]</code></pre>",
            difficulty: "hard",
            xpReward: 60,
            testCases: [
                { input: "[1,3,-1,-3,5,3,6,7]\n3", expectedOutput: "[3, 3, 5, 5, 6, 7]" },
                { input: "[1]\n1", expectedOutput: "[1]" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\nk = int(input())\n\n# Write your solution and print the result list\n"
        }
    ];

    try {
        for (const challenge of challenges) {
            const existing = await Challenge.findOne({ where: { title: challenge.title } });
            if (!existing) {
                await Challenge.create(challenge);
                console.log(`✅ Seeded: ${challenge.title}`);
            } else {
                await existing.update(challenge);
                console.log(`🆙 Updated: ${challenge.title}`);
            }
        }
        console.log("Database challenge seeding completed!");
    } catch (err) {
        console.error("Error seeding challenges:", err);
    } finally {
        // Do not close connection here when called from app.js
    }
}

module.exports = seedChallenges;
