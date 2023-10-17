import React , {useState,useEffect} from 'react';
import { StyleSheet, View, Text, Image, Button,ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalState, useGlobalDispatch } from '../components/GlobalContext';
import ModalComponent from '../components/ModalComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IdeaScreen({ route, navigation }) {
  const { personName, personId, capturedImageData, capturedImage,ideaText } = route.params || {};
  const insets = useSafeAreaInsets();
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const people = globalState.people;

  const [modalVisible, setModalVisible] = useState(false);
  const [deletingIdeaId, setDeletingIdeaId] = useState(null);
  const [currentPerson, setCurrentPerson] = useState(null);
 

  useEffect(() => {
    const person = people.find((person) => person.id === personId);
    setCurrentPerson(person);
  }, [personId, people]);


  const showDeleteModal = (ideaId) => {
    setDeletingIdeaId(ideaId);
    setModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeletingIdeaId(null);
    setModalVisible(false);
  };

  const navigateToAddIdea = () => {
    navigation.navigate('AddIdea', {
      personId,
      personName,
      capturedImageData,
      capturedImage,
      ideaText,
      personData: currentPerson,
    });
  };
  
  const deleteIdea = (ideaId) => {
    if (currentPerson) {
      const updatedPerson = { ...currentPerson };
      updatedPerson.ideas = updatedPerson.ideas.filter((item) => item.id !== ideaId);
      setCurrentPerson(updatedPerson);
      savePersonToAsyncStorage(updatedPerson);
    }
    hideDeleteModal();
  };

  const loadPersonFromAsyncStorage = async (personId) => {
    try {
      const storedPerson = await AsyncStorage.getItem(`person_${personId}`);
      if (storedPerson) {
        const parsedPerson = JSON.parse(storedPerson);
        setCurrentPerson(parsedPerson);
      }
    } catch (error) {
      console.error('Error loading person from AsyncStorage:', error);
    }
  };

  const savePersonToAsyncStorage = async (person) => {
    try {
      await AsyncStorage.setItem(`person_${person.id}`, JSON.stringify(person));
    } catch (error) {
      console.error('Error saving person to AsyncStorage:', error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
    <Text style={styles.title}>Idea for <Text style={styles.personName}>{personName}</Text></Text>
    <Button title="Add Idea" onPress={navigateToAddIdea} />

    <ScrollView>
        {currentPerson && currentPerson.ideas.length > 0 ? (
          currentPerson.ideas.map((idea, index) => (
            <View key={idea.id} style={styles.ideaContainer}>
              <Text style={styles.ideaText}> {idea.text}</Text>
              <Image source={{ uri: idea.img }} style={styles.image} />
              <Button
                title="Delete"
                onPress={() => showDeleteModal(idea.id)}
                color="red"
              />
            </View>
          ))
        ) : (
          <Text style={styles.displayMessage}>Add new idea</Text>
        )}
      </ScrollView>

    <ModalComponent
      isVisible={modalVisible}
      closeModal={hideDeleteModal}
      title="this idea"
      onConfirm={() => deleteIdea(deletingIdeaId)}
      onCancel={hideDeleteModal}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  personName: {
    color: '#7C56FF',
    fontWeight: 'bold',
  },
  text: {
    paddingTop: 10,
    fontSize: 14,
    color: '#393939',
    paddingBottom: 5,
  }, ideaText: {
    fontSize: 18,
    color: '#393939',
    paddingBottom: 10,
  },
  image:{
    width:300,
    height:200
  },
  displayMessage: {
    color: '#393939',
    fontSize: 16,
    paddingTop:40,
  },
});