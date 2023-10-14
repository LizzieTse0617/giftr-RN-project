import React, { useRef, useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useWindowDimensions } from 'react-native';

export default function App() {
  const screen = useWindowDimensions();
  const screenWidth = screen.width;

  const [type, setType] = useState(CameraType.back);
  let camera = useRef();
  const [hasPermission, setHasPermission] = useState(false);
  const [img, setImg] = useState(null);
  const [aspectRatio] = useState(2 / 3); // Aspect ratio of 2:3

  useEffect(() => {
    Camera.requestCameraPermissionsAsync()
      .then(permissions => {
        if (permissions.status === 'granted') {
          setHasPermission(true);
          return Camera.getAvailablePictureSizesAsync();
        } else {
          setHasPermission(false);
        }
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err.message));
  }, []);

  const calculateImageDimensions = () => {
    const widthPercentage = 0.6; // Between 50% and 70% of screen width
    const w = screenWidth * widthPercentage;
    const h = w * aspectRatio;
    return { width: w, height: h };
  };

  function takePhoto() {
    if (!hasPermission) {
      console.log('No permission to take a photo');
      return;
    }

    const opts = {
      zoom: 0.2,
      quality: 0.8,
      imageType: 'jpg',
      skipProcessing: false,
    };

    camera
      .takePictureAsync(opts)
      .then(pic => {
        if (pic) {
          console.log(pic.uri);
          console.log(pic.width);
          console.log(pic.height);

          const { width, height } = calculateImageDimensions();
          setImg({ uri: pic.uri, width, height });
        } else {
          console.log('No photo taken.');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Text style={styles.txt}>Camera view</Text>
        {hasPermission ? (
          <>
            <Text style={styles.txt}>Granted</Text>
            <Camera type={type} ref={r => (camera = r)}>
              <Pressable onPress={takePhoto}>
                <View style={{ backgroundColor: 'black', flex: 1, alignItems: 'center' }}>
                  <MaterialIcons name="camera-alt" size={50} color="white" />
                </View>
              </Pressable>
            </Camera>
          </>
        ) : (
          <Text style={styles.txt}>No camera for you</Text>
        )}
      </View>
      <View>
        <Text style={styles.txt}>Image view</Text>
        {img ? (
          <Image source={{ uri: img.uri }} style={{ width: img.width, height: img.height }} />
        ) : (
          <Text style={styles.txt}>No image currently</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = {
  txt: {
    fontSize: 20,
  },
};
