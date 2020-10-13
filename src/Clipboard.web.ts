declare var navigator: {
  clipboard: {
    readText(): Promise<string>;
    writeText(data: string): Promise<void>;
  };
};

export const Clipboard = {
  getString(): Promise<string> {
    return navigator.clipboard.readText();
  },

  setString(content: string) {
    navigator.clipboard.writeText(content);
  },
};
