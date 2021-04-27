import NativeClipboard, {
  addListener,
  removeListener,
  removeAllListeners,
} from './NativeClipboard';

/**
 * `Clipboard` gives you an interface for setting and getting content from Clipboard on both iOS and Android
 */
export const Clipboard = {
  /**
   * Get content of string type, this method returns a `Promise`, so you can use following code to get clipboard content
   * ```javascript
   * async _getContent() {
   *   var content = await Clipboard.getString();
   * }
   * ```
   */
  getString(): Promise<string> {
    return NativeClipboard.getString();
  },
  /**
   * Set content of string type. You can use following code to set clipboard content
   * ```javascript
   * _setContent() {
   *   Clipboard.setString('hello world');
   * }
   * ```
   * @param the content to be stored in the clipboard.
   */
  setString(content: string) {
    NativeClipboard.setString(content);
  },
  /**
   * Returns whether the clipboard has content or is empty.
   * This method returns a `Promise`, so you can use following code to get clipboard content
   * ```javascript
   * async _hasContent() {
   *   var hasContent = await Clipboard.hasString();
   * }
   * ```
   */
  hasString() {
    return NativeClipboard.hasString();
  },
  /**
   * (IOS Only)
   * Returns whether the clipboard has content or is empty.
   * This method returns a `Promise`, so you can use following code to get clipboard content
   * ```javascript
   * async _hasContent() {
   *   var hasContent = await Clipboard.hasString();
   * }
   * ```
   */
  hasURL() {
    return NativeClipboard.hasURL();
  },
  /**
   * (iOS and Android Only)
   * Adds a listener to get notifications when the clipboard has changed.
   * If this is the first listener, turns on clipboard notifications on the native side.
   * ```javascript
   * const listener = () => console.log("changed!");
   * Clipboard.addListener(listener);
   * ```
   */
  addListener(callback: () => void) {
    addListener(callback);
  },
  /**
   * (iOS and Android Only)
   * Removes a previously added listener.
   * If this is the last listener, turns off clipboard notifications on the native side.
   * ```javascript
   * const listener = () => console.log("changed!");
   * Clipboard.addListener(listener);
   * Clipboard.removeListener(listener);
   * ```
   */
  removeListener(callback: () => void) {
    removeListener(callback);
  },
  /**
   * (iOS and Android Only)
   * Removes all previously registered listeners and turns off notifications on the native side.
   * ```javascript
   * Clipboard.removeAllListeners();
   * ```
   */
  removeAllListeners() {
    removeAllListeners();
  },
};
