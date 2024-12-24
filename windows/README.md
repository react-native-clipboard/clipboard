# React Native Clipboard (Windows)

React Native Clipboard is currently maintained for React Native Windows (RNW) >= 0.62.

# Local Development Setup (RNW >= 0.62)

In order to work on _Clipboard_, you'll need to install the [Windows Development Dependencies](https://aka.ms/rnw-deps).

In addition, `clipboard` targets React Native 0.61.5 and doesn't include React Native Windows as a dependency. So in order to build `Clipboard` locally you'll need to temporarily upgrade the development dependencies:

## RNW >= 0.63

```
yarn upgrade react-native@^0.63
yarn add react-native-windows@^0.63 --dev
```

Now you should be able to open `windows.sln` in Visual Studio and build the project.

## RNW 0.62

```
yarn upgrade react-native@^0.62
yarn add react-native-windows@^0.62 --dev
```

Now you should be able to open `windows.sln` in Visual Studio and build the project.
