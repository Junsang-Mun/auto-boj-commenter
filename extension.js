const vscode = require('vscode');

function activate(context) {
	console.log('Congratulations, your extension "auto-boj-commenter" is now active!');
	let disposable = vscode.commands.registerCommand('auto-boj-commenter.commentboj', function () {

		let editor = vscode.window.activeTextEditor;
		let lang = editor.document.languageId;
		let commentBlock;

		const config = vscode.workspace.getConfiguration('auto-boj-commenter');
		const creator = config.get('creator');

		const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
		const today = new Date();
		const date = today.getDate();
		const month = today.getMonth() + 1;
		const year = today.getFullYear();
		const day = week[today.getDay()];
		console.log(today.getDay());
		const fullToday = `${year}/${month}/${date} (${day})`;

		switch (true) {
			case /go/.test(lang):
				commentBlock = '//';
				break;
			case /^c.*/.test(lang):
				commentBlock = '//';
				break;
			case /^java.*/.test(lang):
				commentBlock = "//";
				break;
			case /ruby/.test(lang):
				commentBlock = "#";
				break;
			case /python/.test(lang):
				commentBlock = "#";
				break;
			default:
				commentBlock = '?';
				break;
		}
		console.log(lang);
		if (commentBlock === '?') {
			vscode.window.showErrorMessage('지원하지 않는 언어입니다.');
			editor = null;
		}
		if (editor) {
			//const doc = editor.document;
			editor.edit(editBuilder => {
				editBuilder.insert(new vscode.Position(0, 0), `${commentBlock} Hello World!\n${commentBlock} Created by: ${creator}\n${commentBlock} Created at: ${fullToday}\n\n`);
			})
		}
		//vscode.window.showInformationMessage('Hello World from Auto BOJ commenter!');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
