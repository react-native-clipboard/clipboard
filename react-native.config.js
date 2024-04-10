const project = (() => {
  const fs = require('fs');
  const path = require('path');
  try {
    const { configureProjects } = require('react-native-test-app');

    return configureProjects({
      android: {
        sourceDir: path.join('example', 'android'),
        manifestPath: path.join(__dirname, 'example', 'android'),
      },
      ios: {
        sourceDir: 'example/ios',
      },
      windows: fs.existsSync('example/windows/Example.sln') && {
        sourceDir: path.join('example', 'windows'),
        solutionFile: path.join('example', 'windows', 'Example.sln'),
        project: path.join(__dirname, 'example', 'windows'),
      },
    });
  } catch (e) {
    return undefined;
  }
})();

module.exports = {
  dependencies: {
    // Help rn-cli find and autolink this library
    '@react-native-clipboard/clipboard': {
      root: __dirname,
    },
  },
  dependency: {
    platforms: {
      windows: {
        sourceDir: 'windows',
        solutionFile: 'windows.sln',
        projects: [
          {
            projectFile: 'ReactNativeWebView/Clipboard.vcxproj',
            directDependency: true,
          },
        ],
      },
    },
  },
  ...(project ? { project } : undefined),
};
