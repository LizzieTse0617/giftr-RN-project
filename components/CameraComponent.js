import React, { useRef, useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CameraComponent({ onPictureTaken }) {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // Request camera permissions
    Camera.requestCameraPermissionsAsync()
      .then((permissions) => {
        if (permissions.status === 'granted') {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  function takePhoto() {
    if (!hasPermission) {
      console.log('No permission to take a photo');
      return;
    }

    const opts = {
      quality: 0.8,
      imageType: 'jpg',
      skipProcessing: false,
    };

    cameraRef.current
      .takePictureAsync(opts)
      .then((pic) => {
        if (pic) {
          onPictureTaken(pic);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Camera
      type={CameraType.back}
      style={{ flex: 1 }}
      ref={cameraRef}
    >
      {hasPermission && (
        <View style={cameraStyles.buttonContainer}>
          <Pressable onPress={takePhoto} style={cameraStyles.captureButton}>
            <MaterialIcons name="camera-alt" size={50} color="white" />
          </Pressable>
        </View>
      )}
    </Camera>
  );
}

const cameraStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  captureButton: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 50,
  },
});
