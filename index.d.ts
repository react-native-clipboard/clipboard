// CREDITS: This types are based on the original work made by all the people who contributed to @types/react-native

declare module "@react-native-community/react-native-clipboard" {
  export interface ClipboardStatic {
    /**
     * Get content of string type
     */
    getString(): Promise<string>;

    /**
     * Set content of string type.
     * @param content Clipboard content
     */
    setString(content: string): void;
  }

  const Clipboard: ClipboardStatic;

  export default Clipboard;
}
