import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet,Keyboard, TouchableWithoutFeedback } from 'react-native';
import CameraComponent from '../components/CameraComponent'; // Import your CameraComponent
import SaveButton from '../components/SaveButton';
import CancelButton from '../components/CancelButton';

export default function AddIdeaScreen({ route, navigation }) {
  const [capturedImage, setCapturedImage] = useState(null);

  const onPictureTaken = (photo) => {
    setCapturedImage(photo.uri);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.title}>Add an idea</Text>
      <Text style={styles.text}>Gift</Text>
      <TextInput style={styles.input} />

      {/* Use the CameraComponent */}
      <CameraComponent onPictureTaken={onPictureTaken} />

      {capturedImage && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.imagePreview} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <CancelButton title="Cancel" />
        <SaveButton title="Save" style={styles.btn} />
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    paddingTop: 20,
    fontSize: 16,
  },
  input: {
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
    padding: 10,
  },
  imagePreviewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
