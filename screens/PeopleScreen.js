import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList ,TouchableOpacity} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Ionicons component
import ModalComponent from '../components/ModalComponent';

export default function PeopleScreen({ route }) {
  const insets = useSafeAreaInsets();
  const [peopleData, setPeopleData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [personIdToDelete, setPersonIdToDelete] = useState(null);
  const [personNameToDelete, setPersonNameToDelete] = useState('');


  useEffect(() => {
    // Function to retrieve people data from AsyncStorage
    const getPeopleData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('peopleData');
        if (storedData !== null) {
          // Parse the stored data (it should be in JSON format)
          const parsedData = JSON.parse(storedData);
          // Sort the data by 'dob' in ascending order
          const sortedPeopleData = parsedData.sort((a, b) => {
            // Assuming 'dob' is in the format "YYYY-MM-DD"
            return a.dob.localeCompare(b.dob);
          });
          setPeopleData(sortedPeopleData);
        }
      } catch (error) {
        console.error('Error retrieving people data:', error);
        setError('Error retrieving people data: ' + error.message); // Set the error state
      }
    };

    getPeopleData(); // Call the function to retrieve and set the data
    console.log(peopleData)
  }, [route.params]);

  const openModal = (personId, personName) => {
    setPersonIdToDelete(personId);
    setPersonNameToDelete(personName);
    setModalVisible(true);
  };

  const closeModal = () => {
    setPersonIdToDelete(null);
    setPersonNameToDelete('');
    setModalVisible(false);
  };

  const confirmDelete = () => {
    if (personIdToDelete !== null) {
      handleDelete(personIdToDelete);
      closeModal();
    }
  };

  const handleDelete = async (personId) => {
    // Find the index of the person to delete
    const indexToDelete = peopleData.findIndex((person) => person.id === personId);

    if (indexToDelete !== -1) {
      // Create a copy of the peopleData array
      const updatedPeopleData = [...peopleData];
      // Remove the person from the array
      updatedPeopleData.splice(indexToDelete, 1);

      // Update AsyncStorage with the modified array
      try {
        await AsyncStorage.setItem('peopleData', JSON.stringify(updatedPeopleData));
        console.log('Person deleted successfully');
        setPeopleData(updatedPeopleData); // Update the state to reflect the deletion
      } catch (error) {
        console.error('Error deleting person data:', error);
        setError('Error deleting person data: ' + error.message);
      }
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>List of People</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) :peopleData.length === 0 ? (
      <Text style={styles.displayMessage}>No people saved yet</Text>
    ) :
      
      (
        <FlatList
        data={peopleData}
        renderItem={({ item }) => (
          <View style={styles.personContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.dob}</Text>
            <TouchableOpacity onPress={() => openModal(item.id, item.name)}>
              <Icon name="ios-trash" size={30} color="red" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      )}
<ModalComponent
        isVisible={isModalVisible}
        title={`${personNameToDelete}?`}
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start',
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 25,
  },
  personContainer: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 15,
  },
  name: {
    fontSize: 20,
  },
  error: {
    fontSize: 16,
  },
  displayMessage:{
    color:'grey',
    fontSize: 16,

  }
});
