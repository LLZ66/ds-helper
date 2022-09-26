/*
 * @Author: 刘涟洲 1228429427@qq.com
 * @Date: 2022-09-08 10:49:35
 * @LastEditors: 刘涟洲 1228429427@qq.com
 * @LastEditTime: 2022-09-26 10:27:16
 * @FilePath: \ds-helper\src\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const regexp = require('./regexp');
const ast = require("./ast");
const generate = require('./generate')


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("active");

	let disposable = vscode.commands.registerCommand('ds-helper.helloWorld', function () {
    init()
	});

	context.subscriptions.push(disposable);
}

function init() {
  const { start, end } = vscode.window.activeTextEditor.selection;
  const text = vscode.window.activeTextEditor.document.getText(new vscode.Range(start, end))
  console.time("1")
  const dsPart = regexp.getDsPart(text);
  console.timeEnd("1")
  console.time("2")
  const AST = ast.generateDSAst(dsPart);
  console.timeEnd("2")
  console.time("3")
  const fields = ast.parseAST(AST);
  console.timeEnd("3")
  console.time("4")
  generate.generateElements(fields);
  console.timeEnd("4")
}

// this method is called when your extension is deactivated
function deactivate() {
  console.log("object");
}

module.exports = {
	activate,
	deactivate
}
