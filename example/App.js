import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native';
import Clipboard from '@react-native-community/react-native-clipboard';

type Props = $ReadOnly<{||}>;
type State = {|
  text: string,
  clipboardContent: string,
|};

export default class App extends React.Component<Props, State> {
  state = {
    text: '',
    clipboardContent: 'Click down to see whats in Clipboard',
  };

  readFromClipboard = async () => {
    const content = await Clipboard.getString();
    this.setState({clipboardContent: content});
  };

  writeToClipboard = async () => {
    Clipboard.setString(this.state.text);
    Alert.alert('Copied to clipboard');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.boldText}>Clipboard Contents: </Text>
        <Text style={styles.clipboardContent}>
          {this.state.clipboardContent}
        </Text>
        <View style={styles.seperator} />
        <Button onPress={this.readFromClipboard} title="Read from Clipboard" />

        <View style={styles.seperator} />

        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({text})}
          value={this.state.text}
          placeholder="Type here..."
        />
        <Button onPress={this.writeToClipboard} title="Write to Clipboard" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: '600',
    marginBottom: 10,
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
    width: '80%',
    marginVertical: 20,
  },
  textInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 80,
  },
  clipboardContent: {
    marginBottom: 20,
  },
});
