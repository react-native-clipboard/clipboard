import NativeClipboard, {ClipboardEventEmitter} from './NativeClipboard';

type Listener = () => void;
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
   * Add a listener for the event `onClipboardContentChanged`
   * ```javascript
   * useEffect(() => {
   *   const clipboardListener = Clipboard.addOnContentChangedListener(() => {
   *     console.log('Clipboard content changed');
   *   });
   *   return () => clipboardListener.remove();
   * }, [])
   * ```
   * @param listener The callback function to be called when clipboard content changed
   */
  addOnContentChangedListener(listener: Listener) {
    return ClipboardEventEmitter.addListener('changedContent', listener);
  },
};
