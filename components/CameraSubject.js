import React, { useRef, useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View, Text, Image, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useWindowDimensions } from 'react-native';

export default function CameraSubject({ onPictureTaken }) {
  const screen = useWindowDimensions();
  const screenWidth = screen.width;
  let camera = useRef();
  const [hasPermission, setHasPermission] = useState(false);
  const [img, setImg] = useState(null);

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

  const takePhoto = () => {
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
          let w = screenWidth * 0.6;
          let h = (w / pic.width) * pic.height;
          setImg({ uri: pic.uri, width: w, height: h });
          onPictureTaken(pic); // Pass the captured image back to the parent component
        } else {
          // Handle the case where there is no photo
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1, width: '100%' }} type={CameraType.back} ref={r => (camera = r)}>
        {hasPermission ? (
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Pressable onPress={takePhoto} style={{ alignSelf: 'center', marginBottom: 20 }}>
              <MaterialIcons name="camera-alt" size={50} color="white" />
            </Pressable>
          </View>
        ) : (
          <Text style={{ fontSize: 20 }}>No camera for you</Text>
        )}
      </Camera>
      {img && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: img.uri }} style={{ width: img.width, height: img.height }} />
        </View>
      )}
    </View>
  );
}
