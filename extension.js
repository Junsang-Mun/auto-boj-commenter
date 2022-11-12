const vscode = require('vscode');

function activate(context) {
	let disposable = vscode.commands.registerCommand('auto-boj-commenter.commentboj', function () {

		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage(`정상적인 editor 창이 아닙니다.`);
			return ;
		}
		let lang = editor.document.languageId;
		let commentBlock;

		switch (true) {
			case /go/.test(lang):
				commentBlock = '//';
				break;
			case /^c$/.test(lang):
				commentBlock = '//';
				break;
			case /cpp/.test(lang):
				commentBlock = '//';
				break;
			case /csharp/.test(lang):
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

		if (commentBlock === '?') {
			vscode.window.showWarningMessage(`langId: ${lang}`);
			vscode.window.showErrorMessage(`지원하지 않는 언어입니다.`);
			editor = null;
		}

		if (editor) {
			vscode.window.showInputBox({"title": "Enter BOJ question number", "placeHolder": "Example. 1234"})
			.then(
				fulfill => { handleFulfilled(fulfill) },
				rejected => { handleRejected(rejected) }
			);
		}

		function handleFulfilled(fulfill) {
			let coolThing = '';
			const config = vscode.workspace.getConfiguration('auto-boj-commenter');
			const creator = config.get('creator');
			const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
			const today = new Date();
			const date = today.getDate();
			const month = today.getMonth() + 1;
			const year = today.getFullYear();
			const day = week[today.getDay()];
			const fullToday = `${year}/${month}/${date} (${day})`;
			if (config.get('enableAsciiArt')) {
				coolThing = `${commentBlock} ██████╗  ██████╗      ██╗\n${commentBlock} ██╔══██╗██╔═══██╗     ██║\n${commentBlock} ██████╔╝██║   ██║     ██║\n${commentBlock} ██╔══██╗██║   ██║██   ██║\n${commentBlock} ██████╔╝╚██████╔╝╚█████╔╝\n${commentBlock} ╚═════╝  ╚═════╝  ╚════╝\n`;
			}

			if (editor) {
				//const doc = editor.document;
				editor.edit(editBuilder => {
					editBuilder.insert(new vscode.Position(0, 0), `${coolThing}${commentBlock} Created by: ${creator}\n${commentBlock} Created at: ${fullToday}\n${commentBlock} BOJ Number: ${fulfill}\n${commentBlock} https://boj.kr/${fulfill}\n\n`);
				})
			}
		}
		function handleRejected(reject) {
			console.error(reject);
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
