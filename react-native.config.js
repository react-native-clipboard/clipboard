module.exports = {
  project: {
    android: {sourceDir: './example/android'},
    ios: {project: './example/ios/example.xcworkspace'},
  },
};

const windowsSwitch = '--use-react-native-windows';

if (process.argv.includes(windowsSwitch)) {
  process.argv = process.argv.filter(arg => arg !== windowsSwitch);
  process.argv.push('--config=example/metro.config.windows.js');
  module.exports.reactNativePath = 'node_modules/react-native-windows';
}