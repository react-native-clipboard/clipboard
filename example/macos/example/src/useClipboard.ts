/**
 * useClipboard.ts
 * This code is inspired from the @react-native-community/hooks package
 * All credit goes to author of the useClipboard custom hooks.
 * https://github.com/react-native-community/hooks
 */

import {useEffect, useState} from 'react';
import {Clipboard} from './Clipboard';

type Listener = (content: string) => void;
const listeners = new Set<Listener>();

function setString(content: string) {
  Clipboard.setString(content);
  listeners.forEach((listener) => listener(content));
}

export const useClipboard = (): [string, (content: string) => void] => {
  const [data, updateClipboardData] = useState('');

  useEffect(() => {
    Clipboard.getString().then(updateClipboardData);
  }, []);

  useEffect(() => {
    listeners.add(updateClipboardData);

    return () => {
      listeners.delete(updateClipboardData);
    };
  }, []);

  return [data, setString];
};
