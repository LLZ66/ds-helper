/*
 * @Author: 刘涟洲 1228429427@qq.com
 * @Date: 2022-09-08 10:49:35
 * @LastEditors: 刘涟洲 1228429427@qq.com
 * @LastEditTime: 2022-09-26 11:01:07
 * @FilePath: \ds-helper\src\utils\ast.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const acorn = require('acorn');
const walk = require('acorn-walk');
const escodegen = require('escodegen');
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const tsloader = require('ts-loader')

function generateDSAst(codePart) {
  const prefix = 'let codePart = ';
  const code = prefix + codePart;
  // use jsParse or tsParse
  try {
    const dsAst = acorn.parse(code, {
      ecmaVersion: 10
    });
    return dsAst;
  }catch(err) {
    const tsFilePath = path.join(__dirname, 'tscode.ts');
    fs.writeFileSync(tsFilePath, code);
    try {
      child_process.execSync(`tsc ${tsFilePath} --noCheck`);
    }catch(err) {};
    const fileContent = fs.readFileSync(path.join(__dirname, 'tscode.js'));
    const dsAst = acorn.parse(fileContent, {
      ecmaVersion: 10
    });
    return dsAst;
  }
};

function parseAST(ast) {
  let fields;
  walk.full(ast, function(node){
    if(node.key && node.key.name && node.key.name === 'fields') {
      fields = node.value.elements.map(field => {
        let fieldProperties = field.properties;
        fieldProperties = fieldProperties.map(properties => {
          return {
            [properties.key.name]: properties.value.value || properties.value.property?.name,
          }
        });
        return fieldProperties
      });
    }
  });
  return fields.map((field) => {
    return array2Object(field)
  });
};

function array2Object(array) {
  let object = {};
  array.forEach(element => {
    object = Object.assign(object, element);
  });
  return object;
}

module.exports = {
  generateDSAst,
  parseAST,
}