import {EmitterSubscription, Platform} from 'react-native';
import NativeClipboard, {
  addListener,
  removeAllListeners,
} from './NativeClipboardModule';

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
   * (iOS Only)
   * Get contents of string array type, this method returns a `Promise`, so you can use following code to get clipboard content
   * ```javascript
   * async _getContent() {
   *   var content = await Clipboard.getStrings();
   * }
   * ```
   */
  getStrings(): Promise<string[]> {
    return NativeClipboard.getStrings();
  },
  /**
   * Get clipboard image as PNG in base64, this method returns a `Promise`, so you can use following code to get clipboard content
   * ```javascript
   * async _getContent() {
   *   var content = await Clipboard.getImagePNG();
   * }
   * ```
   */
  getImagePNG(): Promise<string> {
    return NativeClipboard.getImagePNG();
  },
  /**
   * Get clipboard image as JPG in base64, this method returns a `Promise`, so you can use following code to get clipboard content
   * ```javascript
   * async _getContent() {
   *   var content = await Clipboard.getImageJPG();
   * }
   * ```
   */
  getImageJPG(): Promise<string> {
    return NativeClipboard.getImageJPG();
  },
  /**
   * (iOS Only)
   * Set content of base64 image type. You can use following code to set clipboard content
   * ```javascript
   * _setContent() {
   *   Clipboard.setImage(...);
   * }
   * ```
   * @param the content to be stored in the clipboard.
   */
  setImage(content: string) {
    if (Platform.OS !== 'ios') {
      return;
    }

    NativeClipboard.setImage(content);
  },
  /**
   * (Android Only)
   * Get clipboard image in base64, this method returns a `Promise`, so you can use following code to get clipboard content
   * ```javascript
   * async _getContent() {
   *   var content = await Clipboard.getImage();
   * }
   * ```
   */
  getImage(): Promise<string> {
    return NativeClipboard.getImage();
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
   * Set content of string array type. You can use following code to set clipboard content
   * ```javascript
   * _setContent() {
   *   Clipboard.setStrings(['hello world', 'second string']);
   * }
   * ```
   * @param the content to be stored in the clipboard.
   */
  setStrings(content: string[]) {
    NativeClipboard.setStrings(content);
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
   * Returns whether the clipboard has an image or is empty.
   * This method returns a `Promise`, so you can use following code to check clipboard content
   * ```javascript
   * async _hasContent() {
   *   var hasContent = await Clipboard.hasImage();
   * }
   * ```
   */
  hasImage() {
    return NativeClipboard.hasImage();
  },
  /**
   * (iOS Only)
   * Returns whether the clipboard has a URL content. Can check
   * if there is a URL content in clipboard without triggering PasteBoard notification for iOS 14+
   * This method returns a `Promise`, so you can use following code to check for url content in clipboard.
   * ```javascript
   * async _hasURL() {
   *   var hasURL = await Clipboard.hasURL();
   * }
   * ```
   */
  hasURL() {
    if (Platform.OS !== 'ios') {
      return;
    }
    return NativeClipboard.hasURL();
  },
  /**
   * (iOS 14+ Only)
   * Returns whether the clipboard has a Number(UIPasteboardDetectionPatternNumber) content. Can check
   * if there is a Number content in clipboard without triggering PasteBoard notification for iOS 14+
   * This method returns a `Promise`, so you can use following code to check for Number content in clipboard.
   * ```javascript
   * async _hasNumber() {
   *   var hasNumber = await Clipboard.hasNumber();
   * }
   * ```
   */
  hasNumber() {
    if (Platform.OS !== 'ios') {
      return;
    }
    return NativeClipboard.hasNumber();
  },
  /**
   * (iOS 14+ Only)
   * Returns whether the clipboard has a WebURL(UIPasteboardDetectionPatternProbableWebURL) content. Can check
   * if there is a WebURL content in clipboard without triggering PasteBoard notification for iOS 14+
   * This method returns a `Promise`, so you can use following code to check for WebURL content in clipboard.
   * ```javascript
   * async _hasWebURL() {
   *   var hasWebURL = await Clipboard.hasWebURL();
   * }
   * ```
   */
  hasWebURL() {
    if (Platform.OS !== 'ios') {
      return;
    }
    return NativeClipboard.hasWebURL();
  },
  /**
   * (iOS and Android Only)
   * Adds a listener to get notifications when the clipboard has changed.
   * If this is the first listener, turns on clipboard notifications on the native side.
   * It returns EmitterSubscription where you can call "remove" to remove listener
   * ```javascript
   * const listener = () => console.log("changed!");
   * Clipboard.addListener(listener);
   * ```
   */
  addListener(callback: () => void): EmitterSubscription {
    return addListener(callback);
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
