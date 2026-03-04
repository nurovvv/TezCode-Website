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
,
            solution: "<h3>Solution</h3><p>Concatenate the array with itself using the + operator.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nprint(nums + nums)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Use a hash map to store each number and its index. For each number, check if (target - num) exists in the map.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\ntarget = int(input())\nprev_map = {}\nfor i, n in enumerate(nums):\n    diff = target - n\n    if diff in prev_map:\n        print([prev_map[diff], i])\n        break\n    prev_map[n] = i</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Use Python slicing [::-1] to reverse the list.</p><h4>Code</h4><pre><code>import ast\ns = ast.literal_eval(input())\nprint(s[::-1])</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Iterate from 1 to n. Check divisibility by 15, 3, 5 in that order.</p><h4>Code</h4><pre><code>n = int(input())\nresult = []\nfor i in range(1, n + 1):\n    if i % 15 == 0: result.append('FizzBuzz')\n    elif i % 3 == 0: result.append('Fizz')\n    elif i % 5 == 0: result.append('Buzz')\n    else: result.append(str(i))\nprint(result)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Use a sliding window with a set to track unique characters.</p><h4>Code</h4><pre><code>s = input()\nchar_set = set()\nl = 0\nres = 0\nfor r in range(len(s)):\n    while s[r] in char_set:\n        char_set.remove(s[l])\n        l += 1\n    char_set.add(s[r])\n    res = max(res, r - l + 1)\nprint(res)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Convert to string and compare with its reverse.</p><h4>Code</h4><pre><code>x = int(input())\nprint(str(x) == str(x)[::-1])</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Use a stack. Push opening brackets and pop for matching closing brackets.</p><h4>Code</h4><pre><code>s = input()\nstack = []\nm = {')': '(', '}': '{', ']': '['}\nfor c in s:\n    if c in m:\n        if not stack or stack[-1] != m[c]: print(False); exit()\n        stack.pop()\n    else: stack.append(c)\nprint(len(stack) == 0)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Sort by start time, merge overlapping intervals.</p><h4>Code</h4><pre><code>import ast\niv = ast.literal_eval(input())\niv.sort()\nres = [iv[0]]\nfor s, e in iv[1:]:\n    if s &lt;= res[-1][1]: res[-1][1] = max(res[-1][1], e)\n    else: res.append([s, e])\nprint(res)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Two pointers from both ends. Move the shorter line inward.</p><h4>Code</h4><pre><code>import ast\nh = ast.literal_eval(input())\nl, r = 0, len(h)-1\nma = 0\nwhile l &lt; r:\n    ma = max(ma, min(h[l],h[r])*(r-l))\n    if h[l] &lt; h[r]: l+=1\n    else: r-=1\nprint(ma)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Two pointers: track leftMax and rightMax, compute water at each position.</p><h4>Code</h4><pre><code>import ast\nh = ast.literal_eval(input())\nl, r = 0, len(h)-1\nlm = rm = 0; w = 0\nwhile l &lt; r:\n    if h[l] &lt; h[r]: lm = max(lm, h[l]); w += lm - h[l]; l += 1\n    else: rm = max(rm, h[r]); w += rm - h[r]; r -= 1\nprint(w)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Fibonacci-like DP. Ways to reach step n = ways(n-1) + ways(n-2).</p><h4>Code</h4><pre><code>n = int(input())\nif n &lt;= 2: print(n)\nelse:\n    a, b = 1, 2\n    for _ in range(3, n + 1): a, b = b, a + b\n    print(b)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Track the minimum price and calculate max profit at each step.</p><h4>Code</h4><pre><code>import ast\nprices = ast.literal_eval(input())\nmin_p = float('inf')\nmax_profit = 0\nfor p in prices:\n    min_p = min(min_p, p)\n    max_profit = max(max_profit, p - min_p)\nprint(max_profit)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>XOR all numbers. Duplicates cancel, leaving the single number.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nresult = 0\nfor n in nums: result ^= n\nprint(result)</code></pre>"        },
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
,
            solution: "<h3>Solution: Search Insert Position</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
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
,
            solution: "<h3>Solution</h3><p>Sort each string as key, group by sorted key in a dictionary.</p><h4>Code</h4><pre><code>import ast\nfrom collections import defaultdict\nstrs = ast.literal_eval(input())\ngroups = defaultdict(list)\nfor s in strs: groups[tuple(sorted(s))].append(s)\nresult = sorted(groups.values(), key=lambda x: (-len(x), x[0]))\nprint(result)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Use a set. If set size differs from list size, there are duplicates.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nprint(len(nums) != len(set(nums)))</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Expected sum of 0..n minus actual sum = missing number.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nn = len(nums)\nprint(n*(n+1)//2 - sum(nums))</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Move non-zero elements forward using a pointer, fill rest with zeroes.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\npos = 0\nfor i in range(len(nums)):\n    if nums[i] != 0: nums[pos], nums[i] = nums[i], nums[pos]; pos += 1\nprint(nums)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Boyer-Moore Voting: maintain candidate and count.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nc = nums[0]; count = 1\nfor i in range(1, len(nums)):\n    if count == 0: c = nums[i]\n    count += 1 if nums[i] == c else -1\nprint(c)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Use Counter and most_common to get top k elements.</p><h4>Code</h4><pre><code>import ast\nfrom collections import Counter\nnums = ast.literal_eval(input())\nk = int(input())\nprint([x for x,_ in Counter(nums).most_common(k)])</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>DP: dp[i][j] = dp[i-1][j] + dp[i][j-1].</p><h4>Code</h4><pre><code>line = input().split()\nm, n = int(line[0]), int(line[1])\ndp = [[1]*n for _ in range(m)]\nfor i in range(1, m):\n    for j in range(1, n): dp[i][j] = dp[i-1][j] + dp[i][j-1]\nprint(dp[m-1][n-1])</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Sort both strings and compare them.</p><h4>Code</h4><pre><code>s = input()\nt = input()\nprint(sorted(s) == sorted(t))</code></pre>"        },
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
,
            solution: "<h3>Solution: Valid Palindrome</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
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
,
            solution: "<h3>Solution: Merge Sorted Array</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
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
,
            solution: "<h3>Solution</h3><p>Use Kadane's algorithm: track current sum and reset when negative.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nmax_sum = nums[0]\ncur = 0\nfor n in nums:\n    if cur &lt; 0: cur = 0\n    cur += n\n    max_sum = max(max_sum, cur)\nprint(max_sum)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Compare characters at each position across all strings.</p><h4>Code</h4><pre><code>import ast\nstrs = ast.literal_eval(input())\nif not strs: print('')\nelse:\n    prefix = strs[0]\n    for s in strs[1:]:\n        while not s.startswith(prefix): prefix = prefix[:-1]\n        if not prefix: break\n    print(prefix)</code></pre>"        },
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
,
            solution: "<h3>Solution: Squares of a Sorted Array</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
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
,
            solution: "<h3>Solution</h3><p>Sort array, fix one element, use two pointers for the other two.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nnums.sort()\nres = []\nfor i in range(len(nums)-2):\n    if i &gt; 0 and nums[i] == nums[i-1]: continue\n    l, r = i+1, len(nums)-1\n    while l &lt; r:\n        s = nums[i]+nums[l]+nums[r]\n        if s == 0:\n            res.append([nums[i],nums[l],nums[r]])\n            while l &lt; r and nums[l]==nums[l+1]: l+=1\n            while l &lt; r and nums[r]==nums[r-1]: r-=1\n            l+=1; r-=1\n        elif s &lt; 0: l+=1\n        else: r-=1\nprint(res)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Use prefix and suffix products for each element.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nn = len(nums)\nres = [1]*n\np = 1\nfor i in range(n): res[i] = p; p *= nums[i]\np = 1\nfor i in range(n-1,-1,-1): res[i] *= p; p *= nums[i]\nprint(res)</code></pre>"        },
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
,
            solution: "<h3>Solution: Rotate Array</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
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
,
            solution: "<h3>Solution</h3><p>Backtracking: include or exclude each element.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nres = []\ndef bt(start, sub):\n    res.append(sub[:])\n    for i in range(start, len(nums)): sub.append(nums[i]); bt(i+1, sub); sub.pop()\nbt(0, [])\nprint(res)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Modified binary search: determine which half is sorted.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nt = int(input())\nl, r = 0, len(nums)-1\nwhile l &lt;= r:\n    m = (l+r)//2\n    if nums[m] == t: print(m); exit()\n    if nums[l] &lt;= nums[m]:\n        if nums[l] &lt;= t &lt; nums[m]: r = m-1\n        else: l = m+1\n    else:\n        if nums[m] &lt; t &lt;= nums[r]: l = m+1\n        else: r = m-1\nprint(-1)</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Sort descending and return the kth element.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nk = int(input())\nnums.sort(reverse=True)\nprint(nums[k-1])</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Merge and find middle element(s).</p><h4>Code</h4><pre><code>import ast\nn1 = ast.literal_eval(input())\nn2 = ast.literal_eval(input())\nm = sorted(n1+n2)\nn = len(m)\nif n%2==1: print(float(m[n//2]))\nelse: print(float((m[n//2-1]+m[n//2])/2))</code></pre>"        },
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
,
            solution: "<h3>Solution</h3><p>Use a min-heap to get the smallest element across all lists.</p><h4>Code</h4><pre><code>import ast, heapq\nlists = ast.literal_eval(input())\nresult = []\nheap = []\nfor i, lst in enumerate(lists):\n    if lst: heapq.heappush(heap, (lst[0], i, 0))\nwhile heap:\n    val, li, ei = heapq.heappop(heap)\n    result.append(val)\n    if ei+1 &lt; len(lists[li]): heapq.heappush(heap, (lists[li][ei+1], li, ei+1))\nprint(result)</code></pre>"        },
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
,
            solution: "<h3>Solution: First Missing Positive</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
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
,
            solution: "<h3>Solution: Longest Valid Parentheses</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
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
,
            solution: "<h3>Solution: N-Queens</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
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
,
            solution: "<h3>Solution: Sliding Window Maximum</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Defanging an IP Address",
            description: `<div class="lc-description">
<p>Given a valid (IPv4) IP <code>address</code>, return a defanged version of that IP address.</p>
<p>A <em>defanged IP address</em> replaces every period <code>"."</code> with <code>"[.]"</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> address = "1.1.1.1"</p>
<p><strong class="lc-label">Output:</strong> "1[.]1[.]1[.]1"</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> address = "255.100.50.0"</p>
<p><strong class="lc-label">Output:</strong> "255[.]100[.]50[.]0"</p>
</div>
</div>`,
            difficulty: "easy",
            xpReward: 10,
            testCases: [
                { input: "1.1.1.1", expectedOutput: "1[.]1[.]1[.]1" },
                { input: "255.100.50.0", expectedOutput: "255[.]100[.]50[.]0" }
            ],
            starterCode: "address = input()\n\n# Return the defanged IP address\n",
            tags: ["String"],
            topics: ["Easy"]
,
            solution: "<h3>Solution: Defanging an IP Address</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Number of Good Pairs",
            description: `<div class="lc-description">
<p>Given an array of integers <code>nums</code>, return the number of <strong>good pairs</strong>.</p>
<p>A pair <code>(i, j)</code> is called <em>good</em> if <code>nums[i] == nums[j]</code> and <code>i < j</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,3,1,1,3]</p>
<p><strong class="lc-label">Output:</strong> 4</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,1,1,1]</p>
<p><strong class="lc-label">Output:</strong> 6</p>
</div>
</div>`,
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "[1,2,3,1,1,3]", expectedOutput: "4" },
                { input: "[1,1,1,1]", expectedOutput: "6" },
                { input: "[1,2,3]", expectedOutput: "0" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Return the number of good pairs\n",
            tags: ["Array", "Hash Table", "Math", "Counting"],
            topics: ["Easy"]
,
            solution: "<h3>Solution: Number of Good Pairs</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Contains Duplicate II",
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <code>true</code> if there are two <strong>distinct indices</strong> <code>i</code> and <code>j</code> in the array such that <code>nums[i] == nums[j]</code> and <code>abs(i - j) <= k</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,3,1], k = 3</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,0,1,1], k = 1</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Example 3:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,3,1,2,3], k = 2</p>
<p><strong class="lc-label">Output:</strong> False</p>
</div>
</div>`,
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "[1,2,3,1]\n3", expectedOutput: "True" },
                { input: "[1,0,1,1]\n1", expectedOutput: "True" },
                { input: "[1,2,3,1,2,3]\n2", expectedOutput: "False" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\nk = int(input())\n\n# Return True or False\n",
            tags: ["Array", "Hash Table", "Sliding Window"],
            topics: ["Easy"]
,
            solution: "<h3>Solution: Contains Duplicate II</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Two Sum II - Input Array Is Sorted",
            description: `<div class="lc-description">
<p>Given a <strong>1-indexed</strong> array of integers <code>numbers</code> that is already <strong><em>sorted in non-decreasing order</em></strong>, find two numbers such that they add up to a specific <code>target</code> number. Let these two numbers be <code>numbers[index1]</code> and <code>numbers[index2]</code> where <code>1 <= index1 < index2 <= numbers.length</code>.</p>
<p>Return the indices of the two numbers, <code>index1</code> and <code>index2</code>, <strong>added by one</strong> as an integer array <code>[index1, index2]</code> of length 2.</p>
<p>The tests are generated such that there is <strong>exactly one solution</strong>. You <strong>may not</strong> use the same element twice.</p>
<p>Your solution must use only constant extra space.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> numbers = [2,7,11,15], target = 9</p>
<p><strong class="lc-label">Output:</strong> [1, 2]</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> numbers = [2,3,4], target = 6</p>
<p><strong class="lc-label">Output:</strong> [1, 3]</p>
</div>
</div>`,
            difficulty: "medium",
            xpReward: 35,
            testCases: [
                { input: "[2,7,11,15]\n9", expectedOutput: "[1, 2]" },
                { input: "[2,3,4]\n6", expectedOutput: "[1, 3]" },
                { input: "[-1,0]\n-1", expectedOutput: "[1, 2]" }
            ],
            starterCode: "import ast\nnumbers = ast.literal_eval(input())\ntarget = int(input())\n\n# Return the 1-indexed positions of the two numbers\n",
            tags: ["Array", "Two Pointers", "Binary Search"],
            topics: ["Medium"]
,
            solution: "<h3>Solution: Two Sum II - Input Array Is Sorted</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Product of Array Except Self",
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code>, return <em>an array</em> <code>answer</code> <em>such that</em> <code>answer[i]</code> <em>is equal to the product of all the elements of</em> <code>nums</code> <em>except</em> <code>nums[i]</code>.</p>
<p>The product of any prefix or suffix of <code>nums</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</p>
<p>You must write an algorithm that runs in&nbsp;<code>O(n)</code>&nbsp;time and without using the division operation.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,3,4]</p>
<p><strong class="lc-label">Output:</strong> [24,12,8,6]</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [-1,1,0,-3,3]</p>
<p><strong class="lc-label">Output:</strong> [0,0,9,0,0]</p>
</div>
</div>`,
            difficulty: "medium",
            xpReward: 40,
            testCases: [
                { input: "[1,2,3,4]", expectedOutput: "[24, 12, 8, 6]" },
                { input: "[-1,1,0,-3,3]", expectedOutput: "[0, 0, 9, 0, 0]" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Return the answer array\n",
            tags: ["Array", "Prefix Sum"],
            topics: ["Medium"]
,
            solution: "<h3>Solution</h3><p>Use prefix and suffix products for each element.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nn = len(nums)\nres = [1]*n\np = 1\nfor i in range(n): res[i] = p; p *= nums[i]\np = 1\nfor i in range(n-1,-1,-1): res[i] *= p; p *= nums[i]\nprint(res)</code></pre>"        },
        {
            title: "Length of Last Word",
            description: `<div class="lc-description">
<p>Given a string <code>s</code> consisting of words and spaces, return <em>the length of the <strong>last</strong> word in the string.</em></p>
<p>A <strong>word</strong> is a maximal substring consisting of non-space characters only.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "Hello World"</p>
<p><strong class="lc-label">Output:</strong> 5</p>
<p><strong>Explanation:</strong> The last word is "World" with length 5.</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "   fly me   to   the moon  "</p>
<p><strong class="lc-label">Output:</strong> 4</p>
<p><strong>Explanation:</strong> The last word is "moon" with length 4.</p>
</div>
</div>`,
            difficulty: "easy",
            xpReward: 10,
            testCases: [
                { input: "Hello World", expectedOutput: "5" },
                { input: "   fly me   to   the moon  ", expectedOutput: "4" },
                { input: "luffy is still joyboy", expectedOutput: "6" }
            ],
            starterCode: "s = input()\n\n# Return the length of the last word\n",
            tags: ["String"],
            topics: ["Easy"]
,
            solution: "<h3>Solution: Length of Last Word</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Roman to Integer",
            description: `<div class="lc-description">
<p>Roman numerals are represented by seven different symbols:&nbsp;<code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.</p>
<p>Given a roman numeral, convert it to an integer.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "III"</p>
<p><strong class="lc-label">Output:</strong> 3</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "LVIII"</p>
<p><strong class="lc-label">Output:</strong> 58</p>
</div>

<p><strong>Example 3:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "MCMXCIV"</p>
<p><strong class="lc-label">Output:</strong> 1994</p>
</div>
</div>`,
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "III", expectedOutput: "3" },
                { input: "LVIII", expectedOutput: "58" },
                { input: "MCMXCIV", expectedOutput: "1994" }
            ],
            starterCode: "s = input()\n\n# Return the integer value of the roman numeral\n",
            tags: ["Hash Table", "Math", "String"],
            topics: ["Easy"]
,
            solution: "<h3>Solution</h3><p>Map Roman numerals to values. Subtract when a smaller value precedes a larger one.</p><h4>Code</h4><pre><code>s = input()\nroman = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}\nres = 0\nfor i in range(len(s)):\n    if i+1 &lt; len(s) and roman[s[i]] &lt; roman[s[i+1]]: res -= roman[s[i]]\n    else: res += roman[s[i]]\nprint(res)</code></pre>"        },
        {
            title: "Is Subsequence",
            description: `<div class="lc-description">
<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>s</code> is a <strong>subsequence</strong> of <code>t</code>, or <code>false</code> otherwise.</p>
<p>A <strong>subsequence</strong> of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., <code>"ace"</code> is a subsequence of <code>"abcde"</code> while <code>"aec"</code> is not).</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "abc", t = "ahbgdc"</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "axc", t = "ahbgdc"</p>
<p><strong class="lc-label">Output:</strong> False</p>
</div>
</div>`,
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "abc\nahbgdc", expectedOutput: "True" },
                { input: "axc\nahbgdc", expectedOutput: "False" }
            ],
            starterCode: "s = input()\nt = input()\n\n# Return True if s is a subsequence of t, else False\n",
            tags: ["Two Pointers", "String", "Dynamic Programming"],
            topics: ["Easy"]
,
            solution: "<h3>Solution: Is Subsequence</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Find Minimum in Rotated Sorted Array",
            description: `<div class="lc-description">
<p>Suppose an array of length <code>n</code> sorted in ascending order is <strong>rotated</strong> between <code>1</code> and <code>n</code> times.</p>
<p>Given the sorted rotated array <code>nums</code> of <strong>unique</strong> elements, return <em>the minimum element of this array</em>.</p>
<p>You must write an algorithm that runs in&nbsp;<code>O(log n) time.</code></p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [3,4,5,1,2]</p>
<p><strong class="lc-label">Output:</strong> 1</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [4,5,6,7,0,1,2]</p>
<p><strong class="lc-label">Output:</strong> 0</p>
</div>
</div>`,
            difficulty: "medium",
            xpReward: 30,
            testCases: [
                { input: "[3,4,5,1,2]", expectedOutput: "1" },
                { input: "[4,5,6,7,0,1,2]", expectedOutput: "0" },
                { input: "[11,13,15,17]", expectedOutput: "11" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Return the minimum element\n",
            tags: ["Array", "Binary Search"],
            topics: ["Medium"]
,
            solution: "<h3>Solution: Find Minimum in Rotated Sorted Array</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Find Peak Element",
            description: `<div class="lc-description">
<p>A peak element is an element that is strictly greater than its neighbors.</p>
<p>Given a <strong>0-indexed</strong> integer array <code>nums</code>, find a peak element, and return its index. If the array contains multiple peaks, return the index to <strong>any of the peaks</strong>.</p>
<p>You may imagine that <code>nums[-1] = nums[n] = -∞</code>. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.</p>
<p>You must write an algorithm that runs in&nbsp;<code>O(log n)</code> time.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,3,1]</p>
<p><strong class="lc-label">Output:</strong> 2</p>
<p><strong>Explanation:</strong> 3 is a peak element and your function should return the index number 2.</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,1,3,5,6,4]</p>
<p><strong class="lc-label">Output:</strong> 5</p>
</div>
</div>`,
            difficulty: "medium",
            xpReward: 35,
            testCases: [
                { input: "[1,2,3,1]", expectedOutput: "2" },
                { input: "[1,2,1,3,5,6,4]", expectedOutput: "5" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Return the index of any peak element\n",
            tags: ["Array", "Binary Search"],
            tags: ["Array", "Binary Search"],
            topics: ["Medium"]
,
            solution: "<h3>Solution: Find Peak Element</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Valid Perfect Square",
            description: `<div class="lc-description">
<p>Given a positive integer <code>num</code>, write a function which returns True if <code>num</code> is a perfect square else False.</p>
<p><strong>Follow up:</strong> <strong>Do not</strong> use any built-in library function such as <code>sqrt</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> num = 16</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> num = 14</p>
<p><strong class="lc-label">Output:</strong> False</p>
</div>
</div>`,
            difficulty: "easy",
            xpReward: 10,
            testCases: [
                { input: "16", expectedOutput: "True" },
                { input: "14", expectedOutput: "False" },
                { input: "1", expectedOutput: "True" }
            ],
            starterCode: "num = int(input())\n\n# Return True if perfect square else False\n",
            tags: ["Math", "Binary Search"],
            topics: ["Easy"]
,
            solution: "<h3>Solution: Valid Perfect Square</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Plus One",
            description: `<div class="lc-description">
<p>You are given a <strong>large integer</strong> represented as an integer array <code>digits</code>, where each <code>digits[i]</code> is the <code>i</code>th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading <code>0</code>'s.</p>
<p>Increment the large integer by one and return <em>the resulting array of digits</em>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> digits = [1,2,3]</p>
<p><strong class="lc-label">Output:</strong> [1,2,4]</p>
<p><strong>Explanation:</strong> The array represents the integer 123.</p>
<p>Incrementing by one gives 123 + 1 = 124.</p>
<p>Thus, the result should be [1,2,4].</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> digits = [4,3,2,1]</p>
<p><strong class="lc-label">Output:</strong> [4,3,2,2]</p>
</div>

<p><strong>Example 3:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> digits = [9]</p>
<p><strong class="lc-label">Output:</strong> [1,0]</p>
</div>
</div>`,
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "[1,2,3]", expectedOutput: "[1, 2, 4]" },
                { input: "[4,3,2,1]", expectedOutput: "[4, 3, 2, 2]" },
                { input: "[9]", expectedOutput: "[1, 0]" }
            ],
            starterCode: "import ast\ndigits = ast.literal_eval(input())\n\n# Return the incremented array\n",
            tags: ["Array", "Math"],
            topics: ["Easy"]
,
            solution: "<h3>Solution</h3><p>Add one from the last digit, handle carry propagation.</p><h4>Code</h4><pre><code>import ast\ndigits = ast.literal_eval(input())\nfor i in range(len(digits)-1, -1, -1):\n    if digits[i] &lt; 9: digits[i] += 1; print(digits); exit()\n    digits[i] = 0\nprint([1] + digits)</code></pre>"        },
        {
            title: "Reverse Integer",
            description: `<div class="lc-description">
<p>Given a signed 32-bit integer <code>x</code>, return <code>x</code> <em>with its digits reversed</em>. If reversing <code>x</code> causes the value to go outside the signed 32-bit integer range <code>[-2^31, 2^31 - 1]</code>, then return <code>0</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> x = 123</p>
<p><strong class="lc-label">Output:</strong> 321</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> x = -123</p>
<p><strong class="lc-label">Output:</strong> -321</p>
</div>

<p><strong>Example 3:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> x = 120</p>
<p><strong class="lc-label">Output:</strong> 21</p>
</div>
</div>`,
            difficulty: "medium",
            xpReward: 30,
            testCases: [
                { input: "123", expectedOutput: "321" },
                { input: "-123", expectedOutput: "-321" },
                { input: "120", expectedOutput: "21" }
            ],
            starterCode: "x = int(input())\n\n# Return the reversed integer\n",
            tags: ["Math"],
            topics: ["Medium"]
,
            solution: "<h3>Solution: Reverse Integer</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Valid Parenthesis String",
            description: `<div class="lc-description">
<p>Given a string <code>s</code> containing only three types of characters: <code>'('</code>, <code>')'</code> and <code>'*'</code>, return <code>true</code> if <code>s</code> is <strong>valid</strong>.</p>
<p>The following rules define a <strong>valid</strong> string:</p>
<ul>
<li>Any left parenthesis <code>'('</code> must have a corresponding right parenthesis <code>')'</code>.</li>
<li>Any right parenthesis <code>')'</code> must have a corresponding left parenthesis <code>'('</code>.</li>
<li>Left parenthesis <code>'('</code> must go before the corresponding right parenthesis <code>')'</code>.</li>
<li><code>'*'</code> could be treated as a single right parenthesis <code>')'</code> or a single left parenthesis <code>'('</code> or an empty string <code>""</code>.</li>
</ul>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "()"</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "(*)"</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Example 3:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "(*))"</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>
</div>`,
            difficulty: "medium",
            xpReward: 35,
            testCases: [
                { input: "()", expectedOutput: "True" },
                { input: "(*)", expectedOutput: "True" },
                { input: "(*))", expectedOutput: "True" }
            ],
            starterCode: "s = input()\n\n# Return True if valid else False\n",
            tags: ["String", "Dynamic Programming", "Stack", "Greedy"],
            topics: ["Medium"]
,
            solution: "<h3>Solution: Valid Parenthesis String</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Search in Rotated Sorted Array",
            description: `<div class="lc-description">
<p>There is an integer array <code>nums</code> sorted in ascending order (with <strong>distinct</strong> values).</p>
<p>Prior to being passed to your function, <code>nums</code> is <strong>possibly rotated</strong> at an unknown pivot index <code>k</code> (<code>1 <= k < nums.length</code>) such that the resulting array is <code>[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]</code> (<strong>0-indexed</strong>). For example, <code>[0,1,2,4,5,6,7]</code> might be rotated at pivot index <code>3</code> and become <code>[4,5,6,7,0,1,2]</code>.</p>
<p>Given the array <code>nums</code> <strong>after</strong> the possible rotation and an integer <code>target</code>, return <em>the index of</em> <code>target</code> <em>if it is in</em> <code>nums</code><em>, or</em> <code>-1</code> <em>if it is not in</em> <code>nums</code>.</p>
<p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [4,5,6,7,0,1,2], target = 0</p>
<p><strong class="lc-label">Output:</strong> 4</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [4,5,6,7,0,1,2], target = 3</p>
<p><strong class="lc-label">Output:</strong> -1</p>
</div>
</div>`,
            difficulty: "medium",
            xpReward: 35,
            testCases: [
                { input: "[4,5,6,7,0,1,2]\n0", expectedOutput: "4" },
                { input: "[4,5,6,7,0,1,2]\n3", expectedOutput: "-1" },
                { input: "[1]\n0", expectedOutput: "-1" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\ntarget = int(input())\n\n# Return the index of target\n",
            tags: ["Array", "Binary Search"],
            topics: ["Medium"]
,
            solution: "<h3>Solution</h3><p>Modified binary search: determine which half is sorted.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nt = int(input())\nl, r = 0, len(nums)-1\nwhile l &lt;= r:\n    m = (l+r)//2\n    if nums[m] == t: print(m); exit()\n    if nums[l] &lt;= nums[m]:\n        if nums[l] &lt;= t &lt; nums[m]: r = m-1\n        else: l = m+1\n    else:\n        if nums[m] &lt; t &lt;= nums[r]: l = m+1\n        else: r = m-1\nprint(-1)</code></pre>"        },
        {
            title: "Maximum Subarray",
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code>, find the subarray with the largest sum, and return <em>its sum</em>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [-2,1,-3,4,-1,2,1,-5,4]</p>
<p><strong class="lc-label">Output:</strong> 6</p>
<p><strong class="lc-label">Explanation:</strong> The subarray [4,-1,2,1] has the largest sum 6.</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [5]</p>
<p><strong class="lc-label">Output:</strong> 5</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 10^5</code></li>
<li><code>-10^4 <= nums[i] <= 10^4</code></li>
</ul>
</div>`,
            difficulty: "medium",
            xpReward: 35,
            testCases: [
                { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
                { input: "[5]", expectedOutput: "5" },
                { input: "[-2,-1]", expectedOutput: "-1" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Return the maximum sum of any subarray\n",
            tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
            topics: ["Medium"]
,
            solution: "<h3>Solution</h3><p>Use Kadane's algorithm: track current sum and reset when negative.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nmax_sum = nums[0]\ncur = 0\nfor n in nums:\n    if cur &lt; 0: cur = 0\n    cur += n\n    max_sum = max(max_sum, cur)\nprint(max_sum)</code></pre>"        },
        {
            title: "Remove Duplicates from Sorted Array",
            description: `<div class="lc-description">
<p>Given an integer array <code>nums</code> sorted in non-decreasing order, remove the duplicates <strong>in-place</strong> such that each unique element appears only once. The relative order of the elements should be kept the same. Then return <em>the number of unique elements in</em> <code>nums</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,1,2]</p>
<p><strong class="lc-label">Output:</strong> 2, nums = [1,2,_]</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [0,0,1,1,1,2,2,3,3,4]</p>
<p><strong class="lc-label">Output:</strong> 5, nums = [0,1,2,3,4,_,_,_,_,_]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 3 * 10^4</code></li>
<li><code>-100 <= nums[i] <= 100</code></li>
<li><code>nums</code> is sorted in non-decreasing order.</li>
</ul>
</div>`,
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "[1, 1, 2]", expectedOutput: "2" },
                { input: "[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]", expectedOutput: "5" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Count and return the number of unique elements\n",
            tags: ["Array", "Two Pointers"],
            topics: ["Easy"]
,
            solution: "<h3>Solution</h3><p>Use two pointers: one for unique position, one to scan.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nif not nums: print(0)\nelse:\n    k = 1\n    for i in range(1, len(nums)):\n        if nums[i] != nums[i-1]: nums[k] = nums[i]; k += 1\n    print(k)</code></pre>"        },
        {
            title: "Trapping Rain Water",
            description: `<div class="lc-description">
<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> height = [0,1,0,2,1,0,1,3,2,1,2,1]</p>
<p><strong class="lc-label">Output:</strong> 6</p>
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
                { input: "[4,2,0,3,2,5]", expectedOutput: "9" }
            ],
            starterCode: "import ast\nheight = ast.literal_eval(input())\n\n# Calculate the trapped water\n",
            tags: ["Array", "Dynamic Programming", "Two Pointers", "Stack"],
            topics: ["Hard"]
,
            solution: "<h3>Solution</h3><p>Two pointers: track leftMax and rightMax, compute water at each position.</p><h4>Code</h4><pre><code>import ast\nh = ast.literal_eval(input())\nl, r = 0, len(h)-1\nlm = rm = 0; w = 0\nwhile l &lt; r:\n    if h[l] &lt; h[r]: lm = max(lm, h[l]); w += lm - h[l]; l += 1\n    else: rm = max(rm, h[r]); w += rm - h[r]; r -= 1\nprint(w)</code></pre>"        },
        {
            title: "Median of Two Sorted Arrays",
            description: `<div class="lc-description">
<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <em>the median of the two sorted arrays</em>.</p>
<p>The overall run time complexity should be <code>O(log (m+n))</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums1 = [1,3], nums2 = [2]</p>
<p><strong class="lc-label">Output:</strong> 2.0</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums1 = [1,2], nums2 = [3,4]</p>
<p><strong class="lc-label">Output:</strong> 2.5</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>nums1.length == m</code></li>
<li><code>nums2.length == n</code></li>
<li><code>0 <= m <= 1000</code></li>
<li><code>0 <= n <= 1000</code></li>
</ul>
</div>`,
            difficulty: "hard",
            xpReward: 65,
            testCases: [
                { input: "[1, 3]\n[2]", expectedOutput: "2.0" },
                { input: "[1, 2]\n[3, 4]", expectedOutput: "2.5" }
            ],
            starterCode: "import ast\nnums1 = ast.literal_eval(input())\nnums2 = ast.literal_eval(input())\n\n# Return the median as a float\n",
            tags: ["Array", "Divide and Conquer", "Binary Search"],
            topics: ["Hard"]
,
            solution: "<h3>Solution</h3><p>Merge and find middle element(s).</p><h4>Code</h4><pre><code>import ast\nn1 = ast.literal_eval(input())\nn2 = ast.literal_eval(input())\nm = sorted(n1+n2)\nn = len(m)\nif n%2==1: print(float(m[n//2]))\nelse: print(float((m[n//2-1]+m[n//2])/2))</code></pre>"        },
        {
            title: "Reverse Integer",
            description: `<div class="lc-description">
<p>Given a signed 32-bit integer <code>x</code>, return <em>x</em> <em>with its digits reversed</em>. If reversing <code>x</code> causes the value to go outside the signed 32-bit integer range <code>[-2^31, 2^31 - 1]</code>, then return <code>0</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> x = 123</p>
<p><strong class="lc-label">Output:</strong> 321</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> x = -123</p>
<p><strong class="lc-label">Output:</strong> -321</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>-2^31 <= x <= 2^31 - 1</code></li>
</ul>
</div>`,
            difficulty: "easy",
            xpReward: 15,
            testCases: [
                { input: "123", expectedOutput: "321" },
                { input: "-123", expectedOutput: "-321" },
                { input: "120", expectedOutput: "21" }
            ],
            starterCode: "x = int(input())\n\n# Return the reversed integer\n",
            tags: ["Math"],
            topics: ["Easy"]
,
            solution: "<h3>Solution: Reverse Integer</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
        {
            title: "Majority Element",
            description: `<div class="lc-description">
<p>Given an array <code>nums</code> of size <code>n</code>, return <em>the majority element</em>.</p>
<p>The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.</p>

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
<li><code>1 <= nums.length <= 5 * 10^4</code></li>
<li><code>-10^9 <= nums[i] <= 10^9</code></li>
</ul>
</div>`,
            difficulty: "easy",
            xpReward: 18,
            testCases: [
                { input: "[3, 2, 3]", expectedOutput: "3" },
                { input: "[2, 2, 1, 1, 1, 2, 2]", expectedOutput: "2" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Return the majority element\n",
            tags: ["Array", "Hash Table", "Divide and Conquer", "Sorting", "Counting"],
            topics: ["Easy"]
,
            solution: "<h3>Solution</h3><p>Boyer-Moore Voting: maintain candidate and count.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nc = nums[0]; count = 1\nfor i in range(1, len(nums)):\n    if count == 0: c = nums[i]\n    count += 1 if nums[i] == c else -1\nprint(c)</code></pre>"        },
        {
            title: "Search for a Range",
            description: `<div class="lc-description">
<p>Given an array of integers <code>nums</code> sorted in non-decreasing order, find the starting and ending position of a given <code>target</code> value.</p>
<p>If <code>target</code> is not found in the array, return <code>[-1, -1]</code>.</p>
<p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [5,7,7,8,8,10], target = 8</p>
<p><strong class="lc-label">Output:</strong> [3,4]</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [5,7,7,8,8,10], target = 6</p>
<p><strong class="lc-label">Output:</strong> [-1,-1]</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>0 <= nums.length <= 10^5</code></li>
<li><code>-10^9 <= nums[i] <= 10^9</code></li>
<li><code>-10^9 <= target <= 10^9</code></li>
</ul>
</div>`,
            difficulty: "medium",
            xpReward: 38,
            testCases: [
                { input: "[5, 7, 7, 8, 8, 10]\n8", expectedOutput: "[3, 4]" },
                { input: "[5, 7, 7, 8, 8, 10]\n6", expectedOutput: "[-1, -1]" },
                { input: "[]\n5", expectedOutput: "[-1, -1]" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\ntarget = int(input())\n\n# Return [first_occurrence, last_occurrence] or [-1, -1]\n",
            tags: ["Array", "Binary Search"],
            topics: ["Medium"]
,
            solution: "<h3>Solution</h3><p>Binary search twice: once for left bound, once for right bound.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nt = int(input())\ndef fl():\n    l,r=0,len(nums)-1; res=-1\n    while l&lt;=r:\n        m=(l+r)//2\n        if nums[m]==t: res=m; r=m-1\n        elif nums[m]&lt;t: l=m+1\n        else: r=m-1\n    return res\ndef fr():\n    l,r=0,len(nums)-1; res=-1\n    while l&lt;=r:\n        m=(l+r)//2\n        if nums[m]==t: res=m; l=m+1\n        elif nums[m]&lt;t: l=m+1\n        else: r=m-1\n    return res\nprint([fl(), fr()])</code></pre>"        },
        {
            title: "First Missing Positive",
            description: `<div class="lc-description">
<p>Given an unsorted integer array <code>nums</code>, return the smallest missing positive integer.</p>
<p>You must implement an algorithm that runs in <code>O(n)</code> time and uses <code>O(1)</code> auxiliary space.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [1,2,0]</p>
<p><strong class="lc-label">Output:</strong> 3</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> nums = [3,4,-1,1]</p>
<p><strong class="lc-label">Output:</strong> 2</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= nums.length <= 10^5</code></li>
<li><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>
</ul>
</div>`,
            difficulty: "hard",
            xpReward: 60,
            testCases: [
                { input: "[1, 2, 0]", expectedOutput: "3" },
                { input: "[3, 4, -1, 1]", expectedOutput: "2" },
                { input: "[7, 8, 9, 11, 12]", expectedOutput: "1" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Return the smallest missing positive integer\n",
            tags: ["Array", "Hash Table"],
            topics: ["Hard"]
,
            solution: "<h3>Solution: First Missing Positive</h3><p>Analyze the problem constraints and implement step by step.</p>"        },
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
            xpReward: 12,
            testCases: [
                { input: "[1, 2, 3, 1]", expectedOutput: "True" },
                { input: "[1, 2, 3, 4]", expectedOutput: "False" }
            ],
            starterCode: "import ast\nnums = ast.literal_eval(input())\n\n# Use set() to find duplicates\n",
            tags: ["Array", "Hash Table"],
            topics: ["Easy"]
,
            solution: "<h3>Solution</h3><p>Use a set. If set size differs from list size, there are duplicates.</p><h4>Code</h4><pre><code>import ast\nnums = ast.literal_eval(input())\nprint(len(nums) != len(set(nums)))</code></pre>"        },
        {
            title: "Best Time to Buy and Sell Stock",
            description: `<div class="lc-description">
<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i</code>th day.</p>
<p>You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and a <strong>different day</strong> in the future to sell that stock. Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> prices = [7,1,5,3,6,4]</p>
<p><strong class="lc-label">Output:</strong> 5</p>
<p><strong class="lc-label">Explanation:</strong> Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> prices = [7,6,4,3,1]</p>
<p><strong class="lc-label">Output:</strong> 0</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= prices.length <= 10^5</code></li>
<li><code>0 <= prices[i] <= 10^4</code></li>
</ul>
</div>`,
            difficulty: "easy",
            xpReward: 18,
            testCases: [
                { input: "[7, 1, 5, 3, 6, 4]", expectedOutput: "5" },
                { input: "[7, 6, 4, 3, 1]", expectedOutput: "0" }
            ],
            starterCode: "import ast\nprices = ast.literal_eval(input())\n\n# Return the maximum profit\n",
            tags: ["Array", "Dynamic Programming"],
            topics: ["Easy"]
,
            solution: "<h3>Solution</h3><p>Track the minimum price and calculate max profit at each step.</p><h4>Code</h4><pre><code>import ast\nprices = ast.literal_eval(input())\nmin_p = float('inf')\nmax_profit = 0\nfor p in prices:\n    min_p = min(min_p, p)\n    max_profit = max(max_profit, p - min_p)\nprint(max_profit)</code></pre>"        },
        {
            title: "Wildcard Matching",
            description: `<div class="lc-description">
<p>Given an input string <code>s</code> and a pattern <code>p</code>, implement wildcard pattern matching with support for <code>'?'</code> and <code>'*'</code> where:</p>
<ul>
<li><code>'?'</code> Matches any single character.</li>
<li><code>'*'</code> Matches any sequence of characters (including the empty sequence).</li>
</ul>
<p>The matching should cover the <strong>entire</strong> input string (not partial).</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "aa", p = "a"</p>
<p><strong class="lc-label">Output:</strong> False</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> s = "aa", p = "*"</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 <= s.length <= 2000</code></li>
<li><code>1 <= p.length <= 2000</code></li>
</ul>
</div>`,
            difficulty: "hard",
            xpReward: 70,
            testCases: [
                { input: "aa\na", expectedOutput: "False" },
                { input: "aa\n*", expectedOutput: "True" },
                { input: "cb\n?a", expectedOutput: "False" }
            ],
            starterCode: "s = input()\np = input()\n\n# Implement wildcard matching and return True or False\n",
            tags: ["String", "Dynamic Programming", "Greedy", "Recursion"],
            topics: ["Hard"]
,
            solution: "<h3>Solution</h3><p>DP: handle ? (any single char) and * (any sequence).</p><h4>Code</h4><pre><code>s = input()\np = input()\nm,n=len(s),len(p)\ndp=[[False]*(n+1) for _ in range(m+1)]\ndp[0][0]=True\nfor j in range(1,n+1):\n    if p[j-1]=='*': dp[0][j]=dp[0][j-1]\nfor i in range(1,m+1):\n    for j in range(1,n+1):\n        if p[j-1]=='*': dp[i][j]=dp[i-1][j] or dp[i][j-1]\n        elif p[j-1]=='?' or s[i-1]==p[j-1]: dp[i][j]=dp[i-1][j-1]\nprint(dp[m][n])</code></pre>"        },
        {
            title: "Word Search",
            description: `<div class="lc-description">
<p>Given an <code>m x n</code> grid of characters <code>board</code> and a string <code>word</code>, return <code>true</code> if <code>word</code> exists in the grid.</p>
<p>The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.</p>

<p><strong>Example 1:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Example 2:</strong></p>
<div class="lc-example">
<p><strong class="lc-label">Input:</strong> board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"</p>
<p><strong class="lc-label">Output:</strong> True</p>
</div>

<p><strong>Constraints:</strong></p>
<ul>
<li><code>m == board.length</code></li>
<li><code>n = board[i].length</code></li>
<li><code>1 <= m, n <= 6</code></li>
<li><code>1 <= word.length <= 15</code></li>
</ul>
</div>`,
            difficulty: "medium",
            xpReward: 42,
            testCases: [
                { input: "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nABCCED", expectedOutput: "True" },
                { input: "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nSEE", expectedOutput: "True" },
                { input: "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nABCB", expectedOutput: "False" }
            ],
            starterCode: "import ast\nboard = ast.literal_eval(input())\nword = input()\n\n# Use DFS/backtracking to find word\n",
            tags: ["Array", "String", "Backtracking", "Matrix"],
            topics: ["Medium"]
,
            solution: "<h3>Solution</h3><p>DFS/backtracking: try to match word from each cell.</p><h4>Code</h4><pre><code>import ast\nboard = ast.literal_eval(input())\nword = input()\nR,C=len(board),len(board[0])\ndef dfs(r,c,i):\n    if i==len(word): return True\n    if r&lt;0 or c&lt;0 or r&gt;=R or c&gt;=C or board[r][c]!=word[i]: return False\n    t=board[r][c]; board[r][c]='#'\n    f=dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or dfs(r,c+1,i+1) or dfs(r,c-1,i+1)\n    board[r][c]=t; return f\nfor i in range(R):\n    for j in range(C):\n        if dfs(i,j,0): print(True); exit()\nprint(False)</code></pre>"        }
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
