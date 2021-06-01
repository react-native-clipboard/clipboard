'use strict';

import {NativeModules, NativeEventEmitter} from 'react-native';

// Separated file for Native Clipboard to be ready to switch to Turbo Module when it becomes public
// TODO: uncomment when Turbo module is available
// export interface Spec extends TurboModule {
//   +getConstants: () => {||};
//   +getString: () => Promise<string>;
//   +setString: (content: string) => void;
//   +hasString: () => Promise<boolean>;
// }

export default NativeModules.RNCClipboard;

const EVENT_NAME = 'RNCClipboard_TEXT_CHANGED';
const eventEmitter = new NativeEventEmitter(NativeModules.RNCClipboard);

const addListener = (callback: () => void): void => {
  if (!eventEmitter.listeners(EVENT_NAME).length) {
    NativeModules.RNCClipboard.setListener();
  }
  eventEmitter.addListener(EVENT_NAME, callback);
};

const removeListener = (callback: () => void) => {
  if (eventEmitter.listeners(EVENT_NAME).length === 1) {
    NativeModules.RNCClipboard.removeListener();
  }
  eventEmitter.removeListener(EVENT_NAME, callback);
};

const removeAllListeners = () => {
  eventEmitter.removeAllListeners(EVENT_NAME);
  NativeModules.RNCClipboard.removeListener();
};

export {addListener, removeListener, removeAllListeners};
