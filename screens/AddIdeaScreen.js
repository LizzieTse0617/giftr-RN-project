import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import SaveButton from '../components/SaveButton';
import CancelButton from '../components/CancelButton';

export default function AddIdeaScreen({ route, navigation }) {
  const [startCamera, setStartCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef();

  useEffect(() => {
    // Request camera permissions when the component mounts
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Access denied');
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      setCapturedImage(photo.uri);
      setStartCamera(false);
    }
  };

  const startCameraHandler = () => {
    setStartCamera(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add idea</Text>
      <Text style={styles.text}>Gift idea</Text>
      <TextInput style={styles.input} />

      {startCamera ? (
        <Camera
          style={{ flex: 1, width: '100%' }}
          ref={cameraRef}
          type={Camera.Constants.Type.back}
        >
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
              <Text style={styles.captureButtonText}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={startCameraHandler}
            style={styles.startCameraButton}
          >
            <Text style={styles.startCameraButtonText}>Start Camera</Text>
          </TouchableOpacity>
        </View>
      )}

      {capturedImage && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.imagePreview} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <SaveButton title="Save" style={styles.btn} />
        <CancelButton title="Cancel" />
      </View>
    </View>
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
  startCameraButton: {
    width: 130,
    borderRadius: 4,
    backgroundColor: '#14274e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  startCameraButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  captureButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'flex-end',
  },
  captureButton: {
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  captureButtonText: {
    fontSize: 18,
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
});
