// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const Regexp = require('./utils/regexp')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	let disposable = vscode.commands.registerCommand('ds-helper.helloWorld', function () {
    const text = vscode.window.activeTextEditor.document.getText();
    Regexp.getDsPart(text);
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
