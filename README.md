# @react-native-community/clipboard

[![Build Status][build-badge]][build]
[![Version][version-badge]][package]
![Supports macOS, iOS, Android, and Windows][support-badge]
[![MIT License][license-badge]][license]
[![Lean Core Badge][lean-core-badge]][lean-core-issue]

React Native Clipboard API for macOS, iOS, Android, and Windows.

| macOS                                                                                                                        | iOS                                                                                                                           | Android                                                                                                                       | Windows                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| <img src ="https://user-images.githubusercontent.com/717674/90572309-8a381100-e168-11ea-92cb-ecad8e333d8f.png" width="320"/> | <img src ="https://user-images.githubusercontent.com/6936373/73284520-0ce29880-4238-11ea-9d0e-2061b2d6f17a.png" width="320"/> | <img src ="https://user-images.githubusercontent.com/6936373/73284517-0ce29880-4238-11ea-96c7-5a6337c43da5.png" width="320"/> | <img src="https://user-images.githubusercontent.com/22989529/92150676-9bbe2180-edd4-11ea-8ef7-513451a00594.png" width="320" /> |

## Getting started

Install the library using either Yarn:

```
yarn add @react-native-community/clipboard
```

or npm:

```
npm install --save @react-native-community/clipboard
```

## Link

### React Native v0.60+

For iOS, use `cocoapods` to link the package.

run the following command:

```
$ npx pod-install
```

For android, the package will be linked automatically on build.

<details>
  <summary>For React Native version 0.59 or older</summary>

### React Native <= 0.59

run the following command to link the package:

```
$ react-native link @react-native-community/clipboard
```

For iOS, make sure you install the pod file.

```
cd ios && pod install && cd ..
```

or you could follow the instructions to [manually link the project](https://reactnative.dev/docs/linking-libraries-ios#manual-linking)

## Upgrading to React Native 0.60+

New React Native comes with `autolinking` feature, which automatically links Native Modules in your project. In order to get it to work, make sure you unlink `Clipboard` first:

```
$ react-native unlink @react-native-community/clipboard
```

</details>

## Migrating from the core `react-native` module

This module was created when the Clipboard API was split out from the core of React Native. To migrate to this module you need to follow the installation instructions above and then change you imports from:

```javascript
import {Clipboard} from 'react-native';
```

to:

```javascript
import Clipboard from '@react-native-community/clipboard';
```

## Example

```jsx
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

const App = () => {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = () => {
    Clipboard.setString('hello world');
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={copyToClipboard}>
          <Text>Click here to copy to Clipboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={fetchCopiedText}>
          <Text>View copied text</Text>
        </TouchableOpacity>

        <Text style={styles.copiedText}>{copiedText}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copiedText: {
    marginTop: 10,
    color: 'red',
  },
});

export default App;
```

# Reference

## Methods

### Clipboard

#### `getString()`

```jsx
static getString()
```

Get content of string type, this method returns a `Promise`, so you can use following code to get clipboard content

```jsx
async _getContent() {
  var content = await Clipboard.getString();
}
```

---

#### `setString()`

```jsx
static setString(content)
```

Set content of string type. You can use following code to set clipboard content

```jsx
_setContent() {
  Clipboard.setString('hello world');
}
```

#### Parameters

| Name    | Type   | Required | Description                               |
| ------- | ------ | -------- | ----------------------------------------- |
| content | string | Yes      | The content to be stored in the clipboard |

#### `hasString()`

```jsx
static hasString()
```

Returns whether the clipboard has content or is empty.
Can check if there is a content in clipboard without triggering PasteBoard notification for iOS 14+

#### `hasURL()`

```jsx
static hasURL()
```

(iOS only)
Returns whether the clipboard has a URL content.
Can check if there is a URL content in clipboard without triggering PasteBoard notification for iOS 14+

### useClipboard

`useClipboard` is a utility hooks for the `Clipboard` module. `data` contains the content stored in the clipboard.

```jsx
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {useClipboard} from '@react-native-community/clipboard';

export const HooksSample = () => {
  const [data, setString] = useClipboard();

  useEffect(() => {
    setString('hello world');
  }, []);

  return <Text>{data}</Text>;
};
```

## Maintainers

- [M.Haris Baig](https://github.com/harisbaig100)
- [Jesse Katsumata](https://github.com/Naturalclar)

## Contributing

Please see the [`contributing guide`](/CONTRIBUTING.md).

## License

The library is released under the MIT licence. For more information see [`LICENSE`](/LICENSE).

[build-badge]: https://github.com/react-native-community/clipboard/workflows/Build/badge.svg
[build]: https://github.com/react-native-community/clipboard/actions
[version-badge]: https://img.shields.io/npm/v/@react-native-community/clipboard.svg?style=flat-square
[package]: https://www.npmjs.com/package/@react-native-community/clipboard
[support-badge]: https://img.shields.io/badge/platforms-android%20|%20ios%20|%20macos%20|%20windows-lightgrey.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/@react-native-community/clipboard.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[lean-core-badge]: https://img.shields.io/badge/Lean%20Core-Extracted-brightgreen.svg?style=flat-square
[lean-core-issue]: https://github.com/facebook/react-native/issues/23313
