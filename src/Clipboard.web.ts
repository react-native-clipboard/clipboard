declare let navigator: {
	clipboard: {
		readText(): Promise<string>;
		writeText(data: string): Promise<void>;
	};
};

export const Clipboard = {
	getString(): Promise<string> {
		if (navigator?.clipboard) {
			return navigator.clipboard.readText();
		}
		const el = document.createElement("textarea");
		document.body.appendChild(el);
		el.select();
		document.execCommand("paste");
		const value = el.innerText;
		document.body.removeChild(el);
		return Promise.resolve(value);
	},

	setString(content: string) {
		if (navigator?.clipboard) {
			navigator.clipboard.writeText(content);
		} else {
			const el = document.createElement("textarea");
			el.value = content;
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);
		}
	},

	setHTMLString(htmlContent: string, plainText: string) {
		if (navigator?.clipboard?.write) {
			const clipboardItem = new ClipboardItem({
				["text/plain"]: plainText,
				["text/html"]: htmlContent,
			});
			navigator.clipboard.write([clipboardItem]);
		} else {
			const textToCopy = plainText || htmlContent;
			this.setString(textToCopy);
		}
	},
};
