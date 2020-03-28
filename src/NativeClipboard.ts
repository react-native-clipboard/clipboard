'use strict';

import {NativeModules, NativeEventEmitter} from 'react-native';

// Separated file for Native Clipboard to be ready to switch to Turbo Module when it becomes public
// TODO: uncomment when Turbo module is available
// export interface Spec extends TurboModule {
//   +getConstants: () => {||};
//   +getString: () => Promise<string>;
//   +setString: (content: string) => void;
// }

const ClipboardEventEmitter = new NativeEventEmitter(
  NativeModules.RNCClipboard,
);
export {ClipboardEventEmitter};
export default NativeModules.RNCClipboard;
