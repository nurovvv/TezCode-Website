const normalize = (str) => {
    if (str === null || str === undefined) return "";
    let s = str.toString().trim();

    // First, let's parse elements if it is a list or tuple to normalize brackets
    // e.g. [0, 1] vs (0, 1) -> we can just convert everything to brackets [...] for matching
    s = s.replace(/^\(/, '[').replace(/\)$/, ']');

    // Convert to lowercase
    s = s.toLowerCase();

    // Remove all structural whitespace
    s = s.replace(/\s+/g, '');

    return s;
};

const expected = "[0, 1]";
const actual1 = "[0, 1]";
const actual2 = "(0, 1)";
const actual3 = "0,1";

console.log(normalize(actual1) === normalize(expected));
console.log(normalize(actual2) === normalize(expected));
console.log(normalize(actual3) === normalize(expected)); // false, but what if expected was 0,1

console.log(normalize("[\"1\",\"2\",\"Fizz\"]") === normalize("['1', '2', 'Fizz']"));
