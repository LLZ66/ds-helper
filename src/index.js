/*
 * @Author: 刘涟洲 1228429427@qq.com
 * @Date: 2022-09-08 10:49:35
 * @LastEditors: 刘涟洲 1228429427@qq.com
 * @LastEditTime: 2022-09-23 16:48:55
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
    const { start, end } = vscode.window.activeTextEditor.selection;
    const text = vscode.window.activeTextEditor.document.getText(new vscode.Range(start, end))
    const dsPart = regexp.getDsPart(text);
    const AST = ast.generateDSAst(dsPart);
    const fields = ast.parseAST(AST);
    generate.generateElements(fields);
    // Regexp.getDsPart(text);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {
  console.log("object");
}

module.exports = {
	activate,
	deactivate
}
