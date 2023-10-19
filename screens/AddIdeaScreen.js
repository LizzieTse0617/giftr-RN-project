import React, { useState ,useEffect} from 'react';
import { View, Image, StyleSheet, Keyboard,ScrollView, KeyboardAvoidingView,Platform,TouchableWithoutFeedback } from 'react-native';
import SaveButton from '../components/SaveButton';
import CancelButton from '../components/CancelButton';
import { Text, TextInput } from 'react-native-paper';
import CameraComponent from '../components/CameraComponent';
import generateUniqueId from '../components/generateUniqueId';
import { useGlobalState, useGlobalDispatch } from '../components/GlobalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddIdeaScreen({ route, navigation }) {
  const { personId, personName, capturedImageData } = route.params;
  const [capturedImage, setCapturedImage] = useState(null);
  const [ideaText, setIdeaText] = useState('');
  const dispatch = useGlobalDispatch();
  const people = useGlobalState().people;
  
  const [cameraKey, setCameraKey] = useState(generateUniqueId()); 
  const [imageKey, setImageKey] = useState(generateUniqueId()); 


  const onPictureTaken = (photo) => {
    setCapturedImage(photo);
  };

  useEffect(() => {
    // Generate a promise to resolve the cameraKey
    const generateCameraKey = generateUniqueId();
    const generateImageKey = generateUniqueId();
  
    // Wait for both promises to resolve using Promise.all
    Promise.all([generateCameraKey, generateImageKey]).then(([camera, image]) => {
      setCameraKey(camera);
      setImageKey(image);
    });
  }, []);
  
  const savePersonToAsyncStorage = async (personData) => {
    try {
      await AsyncStorage.setItem(`person_${personData.personId}`, JSON.stringify(personData));
    } catch (error) {
      console.error('Error saving person to AsyncStorage:', error);
    }
  };
  const onCancelButtonPress = () => {
    navigation.goBack(); 
  };

  const onSaveButtonPress = async() => {

    const newIdeaId = generateUniqueId();

    dispatch({
      type: 'ADD_IDEA_TO_PERSON',
      payload: {
        personId: personId,
        ideaData: {
          id: newIdeaId,
          text: ideaText,
          img: capturedImage.uri,
          width: capturedImage.width,
          height: capturedImage.height,
        },
      },
    });
    savePersonToAsyncStorage({ personId, ideaText, capturedImage });

    navigation.navigate('IdeaScreen', {
      personId: personId,
      personName: personName,
      capturedImageData: capturedImageData,
      capturedImage: capturedImage,
      ideaText: ideaText,
    });
  };

  const isSaveDisabled = !ideaText.trim() || !capturedImage;
   
  return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add an idea for {personName}</Text>
        <Text style={styles.text}>Gift</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setIdeaText(text)}
        />
        <View key={cameraKey} style={styles.cameraContainer}>
          <CameraComponent onPictureTaken={onPictureTaken} />
        </View>
        {capturedImage && (
          <View key={imageKey} style={styles.imagePreviewContainer}>
            <Image source={{ uri: capturedImage.uri }} style={styles.imagePreview} />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <CancelButton title="Cancel" onPress={onCancelButtonPress} />
          <SaveButton
            title="Save"
            style={styles.btn}
            onPress={onSaveButtonPress}
            disabled={isSaveDisabled}
          />
        </View>
      </ScrollView>
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
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    borderColor: '#FFFFFF',
    padding: 5,
  },
  cameraContainer: {
    flex: 0,
    aspectRatio: 3 / 2, 
    alignSelf: 'center', 
    width:'100%'
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
    width: '100%',
    aspectRatio: 3 / 2, 
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end', 
    flexDirection: 'row',
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