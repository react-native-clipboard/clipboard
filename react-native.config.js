module.exports = {
  project: {
    android: {sourceDir: './example/android'},
    ios: {project: './example/ios/example.xcworkspace'},
    windows: {
      sourceDir: './example/windows',
      solutionFile: 'ClipboardExample.sln',
      project: {
        projectFile: 'ClipboardExample/ClipboardExample.vcxproj',
      },
    },
  },
};