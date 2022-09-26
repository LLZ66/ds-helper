/*
 * @Author: 刘涟洲 1228429427@qq.com
 * @Date: 2022-09-26 09:05:54
 * @LastEditors: 刘涟洲 1228429427@qq.com
 * @LastEditTime: 2022-09-26 11:26:50
 * @FilePath: \ds-helper\src\generate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    const template = type === 'Table'?`const columns = [${tempalteContent}
]`:`<Form>
  ${tempalteContent.join("\n\t")}
</Form>
`;
    const filePath = path.join(__dirname, `test.${fileType}`);
    fs.writeFileSync(filePath, template);
    vscode.window.showTextDocument(vscode.Uri.file(filePath), {
      viewColumn: vscode.ViewColumn.Beside
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
  if(field.lookupCode) {
    return `<Select name="${field.name}" />`
  }else if(field.lovCode) {
    return `<Lov name="${field.name}" />`
  }else {
    switch(field.type) {
      case "number":
      case "bigNumber":
        return `<NumberField name="${field.name}" />`
      case "dateTime":
      case "date":
      case "mouth":
      case "year":
      case "week":
        return `<DatePicker name="${field.name}" />`
      case "currency":
        return `<Currency name="${field.name}" />`
      case "color":
        return `<ColorPicker name="${field.name}" />`
      case "attachment":
        return `<Attachment name="${field.name}" />`
      case "boolean":
        return `<Switch name="${field.name}" />`
      case "email": 
        return `<EmailField name="${field.name}" />`
      case "intl":
        return `<IntlField name="${field.name}" />`
      case "time":
        return `<TimePicker name="${field.name}" />`
      case "url":
        return `<UrlField name="${field.name}" />`
      case "secret":
        return `<SecretField name="${field.name}" />`
      default:
        return `<TextField name="${field.name}" />`
    }
  }
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