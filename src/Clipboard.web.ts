declare var navigator: {
  clipboard: {
    readText(): Promise<string>;
    writeText(data: string): Promise<void>;
  };
};

declare var document: any;

export const Clipboard = {
  getString(): Promise<string> {
    if (navigator && navigator.clipboard) {
      return navigator.clipboard.readText();
    } else {
      const el = document.createElement('textarea');
      document.body.appendChild(el);
      el.select();
      document.execCommand('paste');
      const value = el.innerText;
      document.body.removeChild(el);
      return Promise.resolve(value);
    }
  },

  setString(content: string) {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(content);
    } else {
      const el = document.createElement('textarea');
      el.value = content;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  },
};
