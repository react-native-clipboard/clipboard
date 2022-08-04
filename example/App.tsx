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
  Image,
} from 'react-native';
import Clipboard, {useClipboard} from '../src';

// Small icon of a plus for demo purposes
const TEST_IMAGE =
  'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

const changeListener = () => {
  console.warn('Clipboard changed!');
};

export const App: React.FC = () => {
  const [text, setText] = useState('');
  const [isURL, setIsURL] = useState(false);
  const [data, setString] = useClipboard();
  const [image, setImage] = useState(null);
  const [imageString, setImageString] = useState<string>('');

  const checkStringType = async () => {
    const checkClipboard = await Clipboard.hasURL();
    setIsURL(checkClipboard);
  };

  const pasteImageAndroid = async () => {
    const base64 = await Clipboard.getImage();
    setImageString(base64);
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

  const writeImageToClipboard = async () => {
    Clipboard.setImage(TEST_IMAGE);
    Alert.alert(`Copied Image to clipboard`);
  };

  const getImage = async () => {
    if (await Clipboard.hasImage()) {
      const image = await Clipboard.getImagePNG();
      setImage(image);
    } else {
      console.warn('No image in clipboard');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Clipboard Module</Text>
      <View style={styles.main}>
        <Text style={styles.boldText}>Clipboard Contents: </Text>
        <Text style={styles.clipboardContent}>{data}</Text>
        <Text style={styles.boldText}>Content is URL: </Text>
        <Text style={styles.clipboardContent}>{JSON.stringify(isURL)}</Text>
        <Text style={styles.boldText}>Content is IMAGE: </Text>
        {image && <Image source={{uri: image}} style={styles.imageContent} />}
        <View style={styles.separator} />
        <TextInput
          selectTextOnFocus={true}
          style={
            Platform.OS === 'macos' ? styles.textInputMacOS : styles.textInput
          }
          onChangeText={(input) => setText(input)}
          value={text}
          placeholder="Type here..."
        />
        <Button onPress={writeToClipboard} title="Write to Clipboard" />
        <Button
          onPress={writeImageToClipboard}
          title="Write Image to Clipboard"
        />
        <Button onPress={getImage} title="Get Image from clipboard" />
        {Platform.OS === 'android' && (
          <View style={styles.imageButtonAndroid}>
            <Button
              onPress={pasteImageAndroid}
              title="Paste image from Android Clipboard"
            />
          </View>
        )}
      </View>
      {imageString === '' ? null : (
        <Image style={styles.imageAndroid} source={{uri: imageString}} />
      )}
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
  separator: {
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
  imageContent: {
    width: 40,
    height: 40,
  },
  imageAndroid: {
    height: 160,
    width: 160,
  },
  imageButtonAndroid: {
    marginTop: 10,
  },
});
