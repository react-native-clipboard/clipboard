# @react-native-clipboard

[![Lean Core Extracted][lean-core-badge]][lean-core-issue]

React Native Clipboard API for both iOS and Android

![alt text](https://github.com/harisbaig100/react-native-clipboard/blob/migrating-Clipboard-from-RN-core-to-community-version/screenshots/Screen%20Shot%202019-02-28%20at%204.32.13%20PM.png)

## Getting started
Install the library using either Yarn:

```
yarn add @react-native-community/react-native-clipboard
```

or npm:

```
npm install --save @react-native-community/react-native-clipboard
```

## Migrating from the core `react-native` module
This module was created when the NetInfo was split out from the core of React Native. To migrate to this module you need to follow the installation instructions above and then change you imports from:

```javascript
import { Clipboard } from "react-native";
```

to:

```javascript
import Clipboard from "@react-native-community/react-native-clipboard";
```

## Usage
Start by importing the library:

```javascript
import Clipboard from "@react-native-community/react-native-clipboard";

type Props = $ReadOnly<{||}>;
type State = {|
  clipboardContent: string,
|};

export default class App extends React.Component<Props, State> {
  state = {
    clipboardContent: 'The state variable which contains Clipboard Content',
  };

  readFromClipboard = async () => {
    const content = await Clipboard.getString();
    this.setState({clipboardContent: content});
  };

  writeToClipboard = async () => {
    Clipboard.setString(this.state.text);
    alert('Copied to clipboard');
  };
}
```

## Maintainers

* [M.Haris Baig](https://github.com/harisbaig100)

## Contributing

Please see the [`contributing guide`](/CONTRIBUTING.md).

## License

The library is released under the MIT licence. For more information see [`LICENSE`](/LICENSE).

[lean-core-badge]: https://img.shields.io/badge/Lean%20Core-Extracted-brightgreen.svg?style=flat-square
[lean-core-issue]: https://github.com/facebook/react-native/issues/23313