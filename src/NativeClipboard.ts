'use strict';

import {NativeModules} from 'react-native';

// Separated file for Native Clipboard to be ready to switch to Turbo Module when it becomes public
// TODO: uncomment when Turbo module is available
// export interface Spec extends TurboModule {
//   +getConstants: () => {||};
//   +getString: () => Promise<string>;
//   +setString: (content: string) => void;
// }

export default NativeModules.RNCClipboard;
