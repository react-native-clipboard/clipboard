const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const { makeMetroConfig } = require("@rnx-kit/metro-config");
module.exports = mergeConfig(getDefaultConfig(__dirname), makeMetroConfig({
  projectRoot: path.join(__dirname, 'example'),
  watchFolders: [__dirname],
  resolver: {
    extraNodeModules: {
      '@react-native-clipboard/clipboard': __dirname,
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
}));
