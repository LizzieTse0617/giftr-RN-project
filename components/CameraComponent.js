import React, { useRef, useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View, Pressable, StyleSheet,Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CameraComponent({ onPictureTaken }) {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(2 / 3);

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
        const screenWidth = Dimensions.get('window').width;
        const imageWidth = screenWidth * 0.6;
        const imageHeight = imageWidth * aspectRatio;
        const data = { uri: pic.uri, width: imageWidth, height: imageHeight };
        onPictureTaken(data); // Return the data to the callback
      }
    })
    .catch((err) => console.log(err));
}

  return (
    <Camera
      type={CameraType.back}
      style={{ flex: 1 }}
      ref={cameraRef}
      ratio={'2:3'} 
    >
      {hasPermission && (
        <View style={cameraStyles.buttonContainer}>
          <Pressable onPress={takePhoto} style={cameraStyles.captureButton}>
            <MaterialIcons name="camera-alt" size={30} color="white" />
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
    bottom: -30,
    left: 0,
    right: 0,

  },
  captureButton: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 50,

  },
});
