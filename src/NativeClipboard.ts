'use strict';

import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
  TurboModuleRegistry,
} from 'react-native';
import type {TurboModule} from 'react-native';

export interface Spec extends TurboModule {
  getConstants: () => {};
  getString: () => Promise<string>;
  getStrings: () => Promise<string[]>;
  setString: (content: string) => void;
  hasString: () => Promise<boolean>;
  hasNumber: () => Promise<boolean>;
  getImagePNG: () => Promise<string>;
  getImageJPG: () => Promise<string>;
  setImage: (content: string) => void;
  getImage: () => Promise<string>;
  setStrings: (content: string[]) => void;
  hasImage: () => Promise<boolean>;
  hasURL: () => Promise<boolean>;
  hasWebURL: () => Promise<boolean>;
}

export default TurboModuleRegistry.get<Spec>('RNCClipboard') as Spec;

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
} else {
  listenerCount = eventEmitter.listenerCount.bind(eventEmitter);
}

const addListener = (callback: () => void): EmitterSubscription => {
  if (listenerCount(EVENT_NAME) === 0) {
    NativeModules.RNCClipboard.setListener();
  }

  let res = eventEmitter.addListener(EVENT_NAME, callback);

  // Path the remove call to also remove the native listener
  // if we no longer have listeners
  // @ts-ignore
  res._remove = res.remove;
  res.remove = function () {
    // @ts-ignore
    this._remove();
    if (listenerCount(EVENT_NAME) === 0) {
      NativeModules.RNCClipboard.removeListener();
    }
  };

  return res;
};

const removeAllListeners = () => {
  eventEmitter.removeAllListeners(EVENT_NAME);
  NativeModules.RNCClipboard.removeListener();
};

export {addListener, removeAllListeners};
