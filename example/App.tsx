import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useClipboard} from '../src';

export const App: React.FC = () => {
  const [text, setText] = useState('');
  const [data, setString] = useClipboard();

  const writeToClipboard = () => {
    setString(text);
    Alert.alert(`Copied to clipboard: ${text}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Clipboard Module</Text>
      <View style={styles.main}>
        <Text style={styles.boldText}>Clipboard Contents: </Text>
        <Text style={styles.clipboardContent}>{data}</Text>
        <View style={styles.seperator} />
        <TextInput
          style={styles.textInput}
          onChangeText={(input) => setText(input)}
          value={text}
          placeholder="Type here..."
        />
        <Button onPress={writeToClipboard} title="Write to Clipboard" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: '700',
    fontSize: 30,
    marginBottom: 10,
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
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 80,
    paddingVertical: 8,
    marginBottom: 16,
  },
  clipboardContent: {
    marginBottom: 20,
  },
});
