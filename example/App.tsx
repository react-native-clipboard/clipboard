import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import Clipboard, {useClipboard} from '../src';

const changeListener = () => {
  console.warn('Clipboard changed!');
};

export const App: React.FC = () => {
  const [text, setText] = useState('');
  const [isURL, setIsURL] = useState(false);
  const [data, setString] = useClipboard();

  const checkStringType = async () => {
    const checkClipboard = await Clipboard.hasURL();
    setIsURL(checkClipboard);
  };

  useEffect(() => {
    checkStringType();
  }, [data]);

  useEffect(() => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const listener = Clipboard.addListener(changeListener);

      return () => {
        listener.remove();
      };
    }
  }, []);

  const writeToClipboard = async () => {
    setString(text);
    Alert.alert(`Copied to clipboard: ${text}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Clipboard Module</Text>
      <View style={styles.main}>
        <Text style={styles.boldText}>Clipboard Contents: </Text>
        <Text style={styles.clipboardContent}>{data}</Text>
        <Text style={styles.boldText}>Content is URL: </Text>
        <Text style={styles.clipboardContent}>{JSON.stringify(isURL)}</Text>
        <View style={styles.seperator} />
        <TextInput
          style={
            Platform.OS === 'macos' ? styles.textInputMacOS : styles.textInput
          }
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
  textInputMacOS: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    width: 300,
    padding: 4,
    marginBottom: 16,
  },
  clipboardContent: {
    marginBottom: 20,
  },
});
