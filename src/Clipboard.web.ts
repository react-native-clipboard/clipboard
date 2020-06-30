export const Clipboard = {
  getString(): Promise<string> {
    return navigator.clipboard.readText();
  },

  setString(content: string) {
    navigator.clipboard.writeText(content);
  },
};
