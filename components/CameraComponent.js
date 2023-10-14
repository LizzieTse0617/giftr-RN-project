import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function CameraComponent({ onPictureTaken }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      onPictureTaken(photo);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1, width: '100%' }}
        ref={cameraRef}
        type={Camera.Constants.Type.back}
      >
        {hasPermission && (
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <TouchableOpacity onPress={takePicture} style={{ alignSelf: 'center', marginBottom: 20 }}>
             

             <IconButton
  icon="camera"
  color="white" 
  size={35}
  onPress={takePicture}
  style={{
 
    backgroundColor: '#7C56FF', 
    borderRadius: 50, 

  }}
/>

            </TouchableOpacity>

            


          </View>
        )}
      </Camera>
      {capturedImage && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: capturedImage }} style={{ width: 200, height: 200 }} />
        </View>
      )}
    </View>
  );
}
