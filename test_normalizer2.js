const normalize = (str) => {
    if (str === null || str === undefined) return "";
    let s = str.toString().trim();

    // Normalize tuple to list representation for fallback equality
    s = s.replace(/^\(/, '[').replace(/\)$/, ']');

    // Convert everything to lowercase to ignore case
    s = s.toLowerCase();

    // Remove all whitespace, quotes, and even spaces after commas
    s = s.replace(/[\s"']/g, '');

    // Specifically for Two Sum, the user wants order to not matter (e.g. [1,0] == [0,1])
    // If the stripped string matches the pattern of a number-only array [num,num]
    const listMatch = s.match(/^\[([\d,\-]+)\]$/);
    if (listMatch) {
        const nums = listMatch[1].split(',').filter(x => x).sort((a, b) => a - b);
        return `[${nums.join(',')}]`;
    }

    return s;
};

console.log(normalize("[0, 1]") === normalize("[0,1]")); // true
console.log(normalize("(1, 0)") === normalize("[0, 1]")); // true
console.log(normalize("[\"1\",\"2\",\"Fizz\"]") === normalize("['1', '2', 'Fizz']")); // true
console.log(normalize("true") === normalize("True")); // true
console.log(normalize("[[\"bat\"],[\"nat\",\"tan\"]]") === normalize("[['bat'], ['nat', 'tan']]")); // true
