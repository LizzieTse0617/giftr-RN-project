import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList ,TouchableOpacity} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Ionicons component
import ModalComponent from '../components/ModalComponent';
import { useNavigation } from '@react-navigation/native';
import { Text, List, Button, Modal, Provider } from 'react-native-paper';

export default function PeopleScreen({ route }) {
  const insets = useSafeAreaInsets();
  const [peopleData, setPeopleData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [personIdToDelete, setPersonIdToDelete] = useState(null);
  const [personNameToDelete, setPersonNameToDelete] = useState('');
  const navigation = useNavigation();

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
  const navigateToIdeaScreen = (personId, personName) => {
    navigation.navigate('IdeaScreen', {
      personId,
      personName,
    });
  };
  return (
    <Provider>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.title}>Gift Manager</Text>
        <Text style={styles.text}>An app to make gift list to your family & friends!</Text>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : peopleData.length === 0 ? (
          <Text style={styles.displayMessage}>No people saved yet</Text>
        ) : (
          <FlatList
          style={styles.cardContainer}
          data={peopleData}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={item.dob}
              titleStyle={styles.nameText}
              descriptionStyle={styles.dobText}
              style={[styles.card, styles.purpleLeftBorder]}
              right={() => (
                <View style={styles.iconContainer}>
                      {/* Wrap the delete icon with the round box */}
                      <View style={styles.roundBoxDelete}>
                    <Icon
                      name="ios-trash"
                      size={20}
                      color="white" // Customize the icon color
                      onPress={() => openModal(item.id, item.name)}
                    />
                  </View>
                  {/* Wrap the gift icon with the round box */}
                  <View style={styles.roundBox}>
                    <Icon
                      name="gift-outline"
                      size={20}
                      color="white" // Customize the icon color
                      onPress={() => navigateToIdeaScreen(item.id, item.name)}
                    />
                  </View>
        
              
                </View>
              )}
            />
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
    </Provider>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor:'#FFFFFF'
  },
  title: {
    fontSize: 35,
    fontWeight:700,
  },
  cardContainer:{
paddingTop:30,
  },

  text:{
    fontSize: 14,

    fontWeight:300,
    paddingVertical:5,
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  displayMessage: {
    color: '#393939',
    fontSize: 16,
    paddingTop:40,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  card:{
    backgroundColor:'#FAFAFA',
    borderWidth:1,
    borderColor:'#EFEFEF',
    borderRadius:20,
marginTop:10,
marginBottom:10,
paddingVertical:20
  },
  nameText: {
    fontSize: 18, 
    fontWeight: 'bold', 
  },

  dobText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'gray', 
  },
   
   purpleLeftBorder: {
    borderLeftWidth: 20, 
    borderLeftColor: '#7C56FF', 
  },
  roundBox: {
    width: 40,
    height: 40,
    backgroundColor: '#7C56FF',
    borderRadius: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  roundBoxDelete: {
    width: 40,
    height: 40,
    backgroundColor: '#CACACA',

    borderRadius: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});
