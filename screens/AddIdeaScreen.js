import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera'; // Import the Camera component from expo-camera
import SaveButton from '../components/SaveButton';
import CancelButton from '../components/CancelButton';
import { Text, TextInput } from 'react-native-paper';

export default function AddIdeaScreen({ route, navigation }) {
  const cameraRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
    }
  };

  const saveImage = () => {
    // You can implement the logic to save or use the captured image here
    // For example, you can navigate to another screen with the captured image.
    navigation.navigate('ImagePreviewScreen', { capturedImage });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Add an idea</Text>
        <Text style={styles.text}>Gift</Text>
        <TextInput style={styles.input} />

        <View style={styles.cameraContainer}>
          {capturedImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: capturedImage }} style={styles.imagePreview} />
            </View>
          ) : (
            <Camera ref={cameraRef} style={styles.camera} />
          )}
        </View>

        <View style={styles.buttonContainer}>
          {capturedImage ? (
            <CancelButton title="Cancel" onPress={() => setCapturedImage(null)} />
          ) : (
            <CancelButton title="Cancel" />
          )}
          {capturedImage ? (
            <TouchableOpacity style={styles.captureButton} onPress={saveImage}>
              <Text style={styles.captureButtonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Text style={styles.captureButtonText}>Capture</Text>
            </TouchableOpacity>
          )}
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
    backgroundColor: '#393939',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  text: {
    paddingTop: 20,
    fontSize: 16,
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    borderColor: '#FFFFFF',
    padding: 5,
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
  },
  camera: {
    flex: 1,
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
    justifyContent: 'space-between',
  },
  captureButton: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    margin: 20,
  },
  captureButtonText: {
    fontSize: 16,
    color: 'white',
  },
});
