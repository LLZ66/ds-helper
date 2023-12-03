const acorn = require('acorn');
const walk = require('acorn-walk');
const escodegen = require('escodegen');
const fs = require('fs/promises')

const obj = `let code = {
    name: '33',
    test: [
        {
            before: 33,
            afttt: 44
        },
        {
            before: 44
        },
    ]
}`;

const ast = acorn.parse(obj);

walk.full(ast, (node) => {
    const key = 'test'
    if(node.key?.name === key) {
        node.key.name = 'test3'
        node.value.elements.map(ele => {
            console.log(ele.properties.forEach(propertie => propertie.key.name = 'jjj'));
       })
    }
});

const generatedCode = escodegen.generate(ast);

fs.writeFile('./test2.js', generatedCode);



