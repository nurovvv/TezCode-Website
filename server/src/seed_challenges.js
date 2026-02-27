const { Challenge, sequelize } = require('./models');

async function seedChallenges() {
    await sequelize.authenticate();
    await sequelize.sync();

    const challenges = [
        {
            title: "Concatenation of Array",
            description: `<div class="lc-description">
<p>You are given an integer array <code>nums</code> of length <code>n</code>. Create an array <code>ans</code> of length <code>2n</code> where <code>ans[i] == nums[i]</code> and <code>ans[i + n] == nums[i]</code> for <code>0 <= i < n</code> (<strong>0-indexed</strong>).</p>
<p>Specifically, <code>ans</code> is the concatenation of two <code>nums</code> arrays.</p>
<p>Return the array <code>ans</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,1]</p>
<p><strong class="lc-label">Output:</strong> [1,2,1,1,2,1]</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,3,2,1]</p>
<p><strong class="lc-label">Output:</strong> [1,3,2,1,1,3,2,1]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 1000</code></li>
<li><code>1 <= nums[i] <= 1000</code></li>
</ul>
</div>`,
            difficulty: "easy",
            xpReward: 10,
            testCases: [
                { input: "[1,2,1]", expectedOutput: "[1, 2, 1, 1, 2, 1]" },
                { input: "[1,3,2,1]", expectedOutput: "[1, 3, 2, 1, 1, 3, 2, 1]" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Return the concatenation of two nums arrays\n# Example: print(nums + nums)\n",
            tags: ["Array", "Simulation"],
            topics: ["Easy", "Top Interview Questions"]
        },
        {
            title: "Two Sum",
            description: `<div class="lc-description">
<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
<p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
<p>You can return the answer in any order.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [2,7,11,15], target = 9</p>
<p><strong class="lc-label">Output:</strong> [0,1]</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [3,2,4], target = 6</p>
<p><strong class="lc-label">Output:</strong> [1,2]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>2 <= nums.length <= 10^4</code></li>
<li><code>-10^9 <= nums[i] <= 10^9</code></li>
<li><code>-10^9 <= target <= 10^9</code></li>
<li><strong>Only one valid answer exists.</strong></li>
</ul>
</div>`,
            difficulty: "easy",
            xpReward: 20,
            testCases: [
                { input: "[2,7,11,15]\n9", expectedOutput: "[0, 1]" },
                { input: "[3,2,4]\n6", expectedOutput: "[1, 2]" },
                { input: "[3,3]\n6", expectedOutput: "[0, 1]" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\ntarget = int(input())\n\n# Find two indices that sum to target\n# Example: print([0, 1])\n",
            tags: ["Array", "Hash Table"],
            topics: ["Easy", "Top Interview Questions"]
        },
        {
            title: "Reverse String",
            description: `<div class="lc-description">
<p>Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.</p>
<p>You must do this by modifying the input array <strong>in-place</strong> with <code>O(1)</code> extra memory.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = ["h","e","l","l","o"]</p>
<p><strong class="lc-label">Output:</strong> ["o","l","l","e","h"]</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = ["H","a","n","n","a","h"]</p>
<p><strong class="lc-label">Output:</strong> ["h","a","n","n","a","H"]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= s.length <= 10^5</code></li>
<li><code>s[i]</code> is a printable ascii character.</li>
</ul>
</div>`,
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "['h','e','l','l','o']", expectedOutput: "['o', 'l', 'l', 'e', 'h']" },
                { input: "['H','a','n','n','a','h']", expectedOutput: "['h', 'a', 'n', 'n', 'a', 'H']" }
            ],
            starterCode: "import ast\ns = ast.literal_eval(input())\n\n# Reverse the list in place and print it\n# Example: print(s[::-1])\n"
        },
        {
            title: "Fizz Buzz",
            description: `<div class="lc-description">
<p>Given an integer <code>n</code>, return a string array <code>answer</code> (<strong>1-indexed</strong>) where:</p>
<ul>
<li><code>answer[i] == "FizzBuzz"</code> if <code>i</code> is divisible by <code>3</code> and <code>5</code>.</li>
<li><code>answer[i] == "Fizz"</code> if <code>i</code> is divisible by <code>3</code>.</li>
<li><code>answer[i] == "Buzz"</code> if <code>i</code> is divisible by <code>5</code>.</li>
<li><code>answer[i] == i.toString()</code> if none of the above conditions are true.</li>
</ul>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> n = 3</p>
<p><strong class="lc-label">Output:</strong> ["1","2","Fizz"]</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> n = 5</p>
<p><strong class="lc-label">Output:</strong> ["1","2","Fizz","4","Buzz"]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= n <= 10^4</code></li>
</ul>
</div>`,
            difficulty: "easy",
            xpReward: 10,
            testCases: [
                { input: "3", expectedOutput: "['1', '2', 'Fizz']" },
                { input: "5", expectedOutput: "['1', '2', 'Fizz', '4', 'Buzz']" }
            ],
            starterCode: "n = int(input())\n\n# Return the FizzBuzz list\n"
        },
        {
            title: "Longest Substring Without Repeating Characters",
            description: `<div class="lc-description">
<p>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "abcabcbb"</p>
<p><strong class="lc-label">Output:</strong> 3</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "bbbbb"</p>
<p><strong class="lc-label">Output:</strong> 1</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>0 <= s.length <= 5 * 10^4</code></li>
<li><code>s</code> consists of English letters, digits, symbols and spaces.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an integer <code>x</code>, return <code>True</code> if <code>x</code> is a <strong>palindrome</strong>, and <code>False</code> otherwise.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> x = 121</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> x = -121</p>
<p><strong class="lc-label">Output:</strong> False</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>-2^31 <= x <= 2^31 - 1</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
<p>An input string is valid if:</p>
<ul>
<li>Open brackets must be closed by the same type of brackets.</li>
<li>Open brackets must be closed in the correct order.</li>
<li>Every close bracket has a corresponding open bracket of the same type.</li>
</ul>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "()"</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "()[]{}"</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= s.length <= 10^4</code></li>
<li><code>s</code> consists of parentheses only <code>'()[]{}'</code>.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return <em>an array of the non-overlapping intervals that cover all the intervals in the input</em>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> intervals = [[1,3],[2,6],[8,10],[15,18]]</p>
<p><strong class="lc-label">Output:</strong> [[1,6],[8,10],[15,18]]</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> intervals = [[1,4],[4,5]]</p>
<p><strong class="lc-label">Output:</strong> [[1,5]]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= intervals.length <= 10^4</code></li>
<li><code>intervals[i].length == 2</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i</code>th line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>
<p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>
<p>Return <em>the maximum amount of water a container can store</em>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> height = [1,8,6,2,5,4,8,3,7]</p>
<p><strong class="lc-label">Output:</strong> 49</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>n == height.length</code></li>
<li><code>2 <= n <= 10^5</code></li>
<li><code>0 <= height[i] <= 10^4</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> height = [0,1,0,2,1,0,1,3,2,1,2,1]</p>
<p><strong class="lc-label">Output:</strong> 6</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> height = [4,2,0,3,2,5]</p>
<p><strong class="lc-label">Output:</strong> 9</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>n == height.length</code></li>
<li><code>1 <= n <= 2 * 10^4</code></li>
<li><code>0 <= height[i] <= 10^5</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>You are climbing a staircase. It takes <code>n</code> steps to reach the top.</p>
<p>Each time you can either climb <code>1</code> or <code>2</code> steps. In how many distinct ways can you climb to the top?</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> n = 2</p>
<p><strong class="lc-label">Output:</strong> 2</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> n = 3</p>
<p><strong class="lc-label">Output:</strong> 3</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= n <= 45</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i</code>th day.</p>
<p>You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p>
<p>Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> prices = [7,1,5,3,6,4]</p>
<p><strong class="lc-label">Output:</strong> 5</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= prices.length <= 10^5</code></li>
<li><code>0 <= prices[i] <= 10^4</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given a <strong>non-empty</strong> array of integers <code>nums</code>, every element appears twice except for one. Find that single one.</p>
<p>You must implement a solution with a linear runtime complexity and use only constant extra space.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [2,2,1]</p>
<p><strong class="lc-label">Output:</strong> 1</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 3 * 10^4</code></li>
<li><code>-3 * 10^4 <= nums[i] <= 3 * 10^4</code></li>
<li>Each element in the array appears twice except for one element which appears only once.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.</p>
<p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,3,5,6], target = 5</p>
<p><strong class="lc-label">Output:</strong> 2</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,3,5,6], target = 2</p>
<p><strong class="lc-label">Output:</strong> 1</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 10^4</code></li>
<li><code>-10^4 <= nums[i] <= 10^4</code></li>
<li><code>nums</code> contains <strong>distinct</strong> values sorted in <strong>ascending</strong> order.</li>
<li><code>-10^4 <= target <= 10^4</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an array of strings <code>strs</code>, group the <strong>anagrams</strong> together. You can return the answer in <strong>any order</strong>.</p>
<p>An <strong>Anagram</strong> is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> strs = ["eat","tea","tan","ate","nat","bat"]</p>
<p><strong class="lc-label">Output:</strong> [["bat"],["nat","tan"],["ate","eat","tea"]]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= strs.length <= 10^4</code></li>
<li><code>0 <= strs[i].length <= 100</code></li>
<li><code>strs[i]</code> consists of lowercase English letters.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code>, return <code>True</code> if any value appears <strong>at least twice</strong> in the array, and return <code>False</code> if every element is distinct.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,3,1]</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,3,4]</p>
<p><strong class="lc-label">Output:</strong> False</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 10^5</code></li>
<li><code>-10^9 <= nums[i] <= 10^9</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an array <code>nums</code> containing <code>n</code> distinct numbers in the range <code>[0, n]</code>, return <em>the only number in the range that is missing from the array.</em></p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [3,0,1]</p>
<p><strong class="lc-label">Output:</strong> 2</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [0,1]</p>
<p><strong class="lc-label">Output:</strong> 2</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>n == nums.length</code></li>
<li><code>1 <= n <= 10^4</code></li>
<li><code>0 <= nums[i] <= n</code></li>
<li>All the numbers of <code>nums</code> are <strong>unique</strong>.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code>, move all <code>0</code>'s to the end of it while maintaining the relative order of the non-zero elements.</p>
<p><strong>Note</strong> that you must do this in-place without making a copy of the array.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [0,1,0,3,12]</p>
<p><strong class="lc-label">Output:</strong> [1,3,12,0,0]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 10^4</code></li>
<li><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an array <code>nums</code> of size <code>n</code>, return <em>the majority element.</em></p>
<p>The majority element is the element that appears more than <code>⌊n / 2⌋</code> times. You may assume that the majority element always exists in the array.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [3,2,3]</p>
<p><strong class="lc-label">Output:</strong> 3</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [2,2,1,1,1,2,2]</p>
<p><strong class="lc-label">Output:</strong> 2</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>n == nums.length</code></li>
<li><code>1 <= n <= 5 * 10^4</code></li>
<li><code>-10^9 <= nums[i] <= 10^9</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <em>the <code>k</code> most frequent elements</em>. You may return the answer in <strong>any order</strong>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,1,1,2,2,3], k = 2</p>
<p><strong class="lc-label">Output:</strong> [1,2]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 10^5</code></li>
<li><code>k</code> is in the range <code>[1, the number of unique elements in the array]</code>.</li>
<li>It is <strong>guaranteed</strong> that the answer is <strong>unique</strong>.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>There is a robot on an <code>m x n</code> grid. The robot is initially located at the <strong>top-left corner</strong>. The robot tries to move to the <strong>bottom-right corner</strong>. The robot can only move either down or right at any point in time.</p>
<p>Given the two integers <code>m</code> and <code>n</code>, return <em>the number of possible unique paths that the robot can take to reach the bottom-right corner</em>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> m = 3, n = 7</p>
<p><strong class="lc-label">Output:</strong> 28</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= m, n <= 100</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given two strings <code>s</code> and <code>t</code>, return <code>True</code> if <code>t</code> is an anagram of <code>s</code>, and <code>False</code> otherwise.</p>
<p>An <strong>Anagram</strong> is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "anagram", t = "nagaram"</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= s.length, t.length <= 5 * 10^4</code></li>
<li><code>s</code> and <code>t</code> consist of lowercase English letters.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>A phrase is a <strong>palindrome</strong> if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.</p>
<p>Given a string <code>s</code>, return <code>True</code> if it is a <strong>palindrome</strong>, or <code>False</code> otherwise.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "A man, a plan, a canal: Panama"</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= s.length <= 2 * 10^5</code></li>
<li><code>s</code> consists only of printable ASCII characters.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>You are given two integer arrays <code>nums1</code> and <code>nums2</code>, sorted in <strong>non-decreasing order</strong>, and two integers <code>m</code> and <code>n</code>, representing the number of elements in <code>nums1</code> and <code>nums2</code> respectively.</p>
<p><strong>Merge</strong> <code>nums2</code> into <code>nums1</code> as a single array sorted in <strong>non-decreasing order</strong>.</p>
<p>The final sorted array should not be returned by the function, but instead be <strong>stored inside the array <code>nums1</code></strong>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3</p>
<p><strong class="lc-label">Output:</strong> [1,2,2,3,5,6]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>nums1.length == m + n</code></li>
<li><code>nums2.length == n</code></li>
<li><code>0 <= m, n <= 200</code></li>
<li><code>1 <= m + n <= 200</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code>, find the subarray with the largest sum, and return <em>its sum</em>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [-2,1,-3,4,-1,2,1,-5,4]</p>
<p><strong class="lc-label">Output:</strong> 6</p>
<p><strong>Explanation:</strong> The subarray [4,-1,2,1] has the largest sum 6.</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 10^5</code></li>
<li><code>-10^4 <= nums[i] <= 10^4</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Write a function to find the longest common prefix string amongst an array of strings.</p>
<p>If there is no common prefix, return an empty string <code>""</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> strs = ["flower","flow","flight"]</p>
<p><strong class="lc-label">Output:</strong> "fl"</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= strs.length <= 200</code></li>
<li><code>0 <= strs[i].length <= 200</code></li>
<li><code>strs[i]</code> consists of only lowercase English letters.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code> sorted in <strong>non-decreasing</strong> order, return <em>an array of the squares of each number sorted in non-decreasing order</em>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [-4,-1,0,3,10]</p>
<p><strong class="lc-label">Output:</strong> [0,1,9,16,100]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 10^4</code></li>
<li><code>-10^4 <= nums[i] <= 10^4</code></li>
<li><code>nums</code> is sorted in <strong>non-decreasing</strong> order.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an integer array nums, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>
<p>Notice that the solution set must not contain duplicate triplets.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [-1,0,1,2,-1,-4]</p>
<p><strong class="lc-label">Output:</strong> [[-1,-1,2],[-1,0,1]]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>3 <= nums.length <= 3000</code></li>
<li><code>-10^5 <= nums[i] <= 10^5</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is equal to the product of all the elements of <code>nums</code> except <code>nums[i]</code>.</p>
<p>The product of any prefix or suffix of <code>nums</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</p>
<p>You must write an algorithm that runs in <code>O(n)</code> time and without using the division operation.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,3,4]</p>
<p><strong class="lc-label">Output:</strong> [24,12,8,6]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>2 <= nums.length <= 10^5</code></li>
<li><code>-30 <= nums[i] <= 30</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code>, rotate the array to the right by <code>k</code> steps, where <code>k</code> is non-negative.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,3,4,5,6,7], k = 3</p>
<p><strong class="lc-label">Output:</strong> [5,6,7,1,2,3,4]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 10^5</code></li>
<li><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>
<li><code>0 <= k <= 10^5</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code> of <strong>unique</strong> elements, return <em>all possible subsets (the power set)</em>.</p>
<p>The solution set <strong>must not</strong> contain duplicate subsets. Return the solution in <strong>any order</strong>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,3]</p>
<p><strong class="lc-label">Output:</strong> [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 10</code></li>
<li><code>-10 <= nums[i] <= 10</code></li>
<li>All the numbers of <code>nums</code> are <strong>unique</strong>.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>There is an integer array <code>nums</code> sorted in ascending order (with distinct values).</p>
<p>Prior to being passed to your function, <code>nums</code> is <strong>possibly rotated</strong> at an unknown pivot index <code>k</code> (<code>1 <= k < nums.length</code>).</p>
<p>Given the array <code>nums</code> <strong>after</strong> the rotation and an integer <code>target</code>, return <em>the index of <code>target</code> if it is in <code>nums</code>, or <code>-1</code> if it is not in <code>nums</code></em>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [4,5,6,7,0,1,2], target = 0</p>
<p><strong class="lc-label">Output:</strong> 4</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 5000</code></li>
<li><code>-10^4 <= nums[i] <= 10^4</code></li>
<li>All values of <code>nums</code> are <strong>unique</strong>.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <em>the <code>k</code>th largest element in the array</em>.</p>
<p>Note that it is the <code>k</code>th largest element in the sorted order, not the <code>k</code>th distinct element.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [3,2,1,5,6,4], k = 2</p>
<p><strong class="lc-label">Output:</strong> 5</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= k <= nums.length <= 10^5</code></li>
<li><code>-10^4 <= nums[i] <= 10^4</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p>
<p>The overall run time complexity should be <code>O(log (m+n))</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums1 = [1,3], nums2 = [2]</p>
<p><strong class="lc-label">Output:</strong> 2.0</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>nums1.length == m</code></li>
<li><code>nums2.length == n</code></li>
<li><code>0 <= m, n <= 1000</code></li>
<li><code>1 <= m + n <= 2000</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>You are given an array of <code>k</code> linked-lists <code>lists</code>, each linked-list is sorted in ascending order.</p>
<p><em>Merge all the linked-lists into one sorted linked-list and return it.</em></p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> lists = [[1,4,5],[1,3,4],[2,6]]</p>
<p><strong class="lc-label">Output:</strong> [1,1,2,3,4,4,5,6]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>k == lists.length</code></li>
<li><code>0 <= k <= 10^4</code></li>
<li><code>0 <= lists[i].length <= 500</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given an unsorted integer array <code>nums</code>, return the smallest missing positive integer.</p>
<p>You must implement a solution that runs in <code>O(n)</code> time and uses <code>O(1)</code> auxiliary space.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,0]</p>
<p><strong class="lc-label">Output:</strong> 3</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 10^5</code></li>
<li><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>Given a string containing just the characters <code>'('</code> and <code>')'</code>, return <em>the length of the longest valid (well-formed) parentheses 
substring</em>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "(()"</p>
<p><strong class="lc-label">Output:</strong> 2</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>0 <= s.length <= 3 * 10^4</code></li>
<li><code>s[i]</code> is <code>'('</code>, or <code>')'</code>.</li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>The <strong>n-queens</strong> puzzle is the problem of placing <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other.</p>
<p>Given an integer <code>n</code>, return <em>the number of distinct solutions to the <strong>n-queens puzzle</strong></em>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> n = 4</p>
<p><strong class="lc-label">Output:</strong> 2</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= n <= 9</code></li>
</ul>
</div>`,
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
            description: `<div class="lc-description">
<p>You are given an array of integers <code>nums</code>, there is a sliding window of size <code>k</code> which is moving from the very left of the array to the very right. You can only see the <code>k</code> numbers in the window. Each time the sliding window moves right by one position.</p>
<p>Return <em>the max sliding window</em>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,3,-1,-3,5,3,6,7], k = 3</p>
<p><strong class="lc-label">Output:</strong> [3,3,5,5,6,7]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 10^5</code></li>
<li><code>-10^4 <= nums[i] <= 10^4</code></li>
<li><code>1 <= k <= nums.length</code></li>
</ul>
</div>`,
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
