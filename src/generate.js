const vscode = require('vscode');
const fs = require('fs');
const path = require('path')

const fileType = vscode.window.activeTextEditor.document.fileName.endsWith('js')? 'js':'ts';

function generateElements(fields) {
  vscode.window.showQuickPick(['Form', 'Table'], {
    title: '选择要输出的代码格式'
  }).then((type) => {
    const tempalteContent = fields.map(field => {
      return generateByType(field, type)
    });
    // This strange appearance is for setting the output format 0.0
    const template = `const columns = [${tempalteContent}
]`;
    const filePath = path.join(__dirname, `test.${fileType}`);
    fs.writeFileSync(filePath, template);
    vscode.window.showTextDocument(vscode.Uri.file(filePath), {
      viewColumn: vscode.ViewColumn.One
    })
  })
};

function generateByType(field, type) {
  if(type === "Form") {
    return generateFormElement(field);
  }else if(type === "Table") {
    return generateTableElement(field);
  }
};

function generateFormElement(field) {
  console.log("Form");
};

function generateTableElement(field) {
  return fileType === 'js'?
  `
  {
    name: ${field.name},
    align: 'center'
  }`:
  `
  {
    name: ${field.name},
    align: ColumnAlign.center,
  }`
}


module.exports = {
  generateElements,
}