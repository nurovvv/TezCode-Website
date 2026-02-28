const fs = require('fs');
const acorn = require('acorn');
const jsx = require('acorn-jsx');
const code = fs.readFileSync('client/src/pages/CourseReaderPage.jsx', 'utf8');
const parser = acorn.Parser.extend(jsx());

let cut = code.indexOf("id: 'lists'");
// Replace the cutoff with something valid, like `};`
let snippet = code.substring(0, code.lastIndexOf('{', cut) - 1);
console.log("Parsing up to index", snippet.length);

try {
    let ast = parser.parse(snippet, { sourceType: 'module', ecmaVersion: 2020 });
    console.log("Success! Last node:", ast.body[ast.body.length - 1].type);

    // Find the definition of COURSE
    let courseDecl = ast.body.find(n => n.type === 'VariableDeclaration' && n.declarations[0].id.name === 'COURSE');
    if (courseDecl) {
        let props = courseDecl.declarations[0].init.properties;
        let chapters = props.find(p => p.key.name === 'chapters');
        if (chapters) {
            console.log("chapters is a", chapters.value.type);
            console.log("number of chapters parsed:", chapters.value.elements.length);
        } else {
            console.log("No chapters property found");
        }
    } else {
        console.log("No COURSE declaration found");
    }
} catch (e) {
    console.log("Error still:", e);
}
