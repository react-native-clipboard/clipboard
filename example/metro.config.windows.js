/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const fs = require('fs');
const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const rnPath = fs.realpathSync(
  path.resolve(require.resolve('react-native/package.json'), '..'),
);
const rnwPath = fs.realpathSync(
  path.resolve(require.resolve('react-native-windows/package.json'), '..'),
);

module.exports = {
  resolver: {
    extraNodeModules: {
      // Redirect react-native to react-native-windows
      'react-native': rnwPath,
      'react-native-windows': rnwPath,
      //'@babel/runtime': fs.realpathSync('node_modules/@babel/runtime'),
    },
    // Include the macos platform in addition to the defaults because the fork includes macos, but doesn't declare it
    platforms: ['ios', 'android', 'windesktop', 'windows', 'web', 'macos'],
    // Since there are multiple copies of react-native, we need to ensure that metro only sees one of them
    // This should go in RN 0.61 when haste is removed
//    blacklistRE: blacklist([
//      new RegExp(
//        `${(path.resolve(rnPath) + path.sep).replace(/[/\\]/g, '/')}.*`,
//      ),
//    ]),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};