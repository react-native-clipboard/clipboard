'use strict';

import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';

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

let listenerCount = eventEmitter.listenerCount;

// listenerCount is only available from RN 0.64
// Older versions only have `listeners`
if (!listenerCount) {
  listenerCount = (eventType: string) => {
    // @ts-ignore
    return eventEmitter.listeners(eventType).length;
  };
}

const addListener = (callback: () => void): EmitterSubscription => {
  if (listenerCount(EVENT_NAME) === 0) {
    NativeModules.RNCClipboard.setListener();
  }

  return eventEmitter.addListener(EVENT_NAME, callback);
};

const removeAllListeners = () => {
  eventEmitter.removeAllListeners(EVENT_NAME);
  NativeModules.RNCClipboard.removeListener();
};

export {addListener, removeAllListeners};
