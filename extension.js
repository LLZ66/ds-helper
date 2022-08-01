// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	let disposable = vscode.commands.registerCommand('ds-helper.helloWorld', function () {
    const text = vscode.window.activeTextEditor.document.getText();
    // ds 分割后字符串
    const dsList = [];
    // dsReg match搜索字符串
    const dsRegList = [...text.matchAll(/new\s+DataSet/g)];
    dsRegList.reduce((pre, cur, index) => {
      if(pre) {
        dsList.push(text.slice(pre, cur.index));
      }
      if(index === dsRegList.length-1) {
        dsList.push(text.slice(cur.index, text.length));
      }
      return cur.index;
    }, 0);
    for(let i of dsList) {
      console.log(i);
    }
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
