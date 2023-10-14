import React, { useState } from 'react';
import { View,Image, StyleSheet,Keyboard, TouchableWithoutFeedback } from 'react-native';
import CameraComponent from '../components/CameraComponent'; // Import your CameraComponent
import SaveButton from '../components/SaveButton';
import CancelButton from '../components/CancelButton';
import { Text, TextInput} from 'react-native-paper'; 
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
    backgroundColor: '#393939',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'#FFFFFF'
  },
  text: {
    paddingTop: 20,
    fontSize: 16,
    color:'#FFFFFF'
  },
  input: {
    height: 40,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    borderColor: '#FFFFFF',
    padding:5,
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
