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

  console.log(people)
  const [modalVisible, setModalVisible] = useState(false);
  const [deletingIdeaId, setDeletingIdeaId] = useState(null);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [giftItems, setGiftItems] = useState([]); // Initialize an array for gift items

  useEffect(() => {
    // Find the person data using personId and set it to currentPerson
    const person = people.find((person) => person.id === personId);
    setCurrentPerson(person);

    // Load gift items from AsyncStorage
    loadGiftItemsFromAsyncStorage();
  }, [personId, people]);

  useEffect(() => {
    // When giftItems change, save them to AsyncStorage
    saveGiftItemsToAsyncStorage();
  }, [giftItems]);


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
      giftItems: giftItems,
    });
  };
  
 //const currentPerson = people.find((person) => person.id === personId);
 console.log(currentPerson);


 const deleteIdea = (ideaId) => {
  const updatedGiftItems = giftItems.filter((item) => item.id !== ideaId);
  setGiftItems(updatedGiftItems); // Update gift items in state
  hideDeleteModal();
};

const loadGiftItemsFromAsyncStorage = async () => {
  try {
    const storedGiftItems = await AsyncStorage.getItem(`giftItems_${personId}`);
    if (storedGiftItems) {
      const parsedGiftItems = JSON.parse(storedGiftItems);
      setGiftItems(parsedGiftItems);
    }
  } catch (error) {
    console.error('Error loading gift items from AsyncStorage:', error);
  }
};

const saveGiftItemsToAsyncStorage = async () => {
  try {
    await AsyncStorage.setItem(`giftItems_${personId}`, JSON.stringify(giftItems));
  } catch (error) {
    console.error('Error saving gift items to AsyncStorage:', error);
  }
};

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
    <Text style={styles.title}>Idea for <Text style={styles.personName}>{personName}</Text></Text>
    <Button title="Add Idea" onPress={navigateToAddIdea} />

    <ScrollView>
      {currentPerson && currentPerson.ideas.map((idea, index) => (
        <View key={idea.id} style={styles.ideaContainer}>
          <Text style={styles.ideaText}>Idea {index + 1}: {idea.text}</Text>
          <Image source={{ uri: idea.img }} style={styles.image} />
          <Button title="Delete" onPress={() => showDeleteModal(idea.id)} color="red" />
        </View>
      ))}
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
  }
});