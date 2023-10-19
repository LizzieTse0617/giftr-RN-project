import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalComponent from '../components/ModalComponent';
import { useNavigation } from '@react-navigation/native';
import { Text, List, Button, Modal, Provider } from 'react-native-paper';
import { useGlobalState, useGlobalDispatch } from '../components/GlobalContext';

export default function PeopleScreen({ route }) {
  const insets = useSafeAreaInsets();
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [personIdToDelete, setPersonIdToDelete] = useState(null);
  const [personNameToDelete, setPersonNameToDelete] = useState('');
  const navigation = useNavigation();

  const { updatedPeopleData } = route.params;


  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const { people: peopleData } = globalState;
 
  useEffect(() => {
    async function fetchPeopleData() {
      try {
        const storedData = await AsyncStorage.getItem('peopleData');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          globalDispatch({ type: 'SET_PEOPLE', payload: parsedData });
        }
      } catch (error) {
        console.error('Error retrieving people data:', error);
        setError('Error retrieving people data: ' + error.message);
      }
    }
  
    if (updatedPeopleData) {
      globalDispatch({ type: 'SET_PEOPLE', payload: updatedPeopleData });
    } else {
      fetchPeopleData();
    }
  }, [updatedPeopleData]); 

  
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
    const indexToDelete = peopleData.findIndex((person) => person.id === personId);
    if (indexToDelete !== -1) {
      const updatedPeopleData = [...peopleData];
      updatedPeopleData.splice(indexToDelete, 1);

      try {
        await AsyncStorage.setItem('peopleData', JSON.stringify(updatedPeopleData));
        globalDispatch({ type: 'SET_PEOPLE', payload: updatedPeopleData });
      } catch (error) {
        console.error('Error saving people data to AsyncStorage:', error);
      }
    }
  };

  const navigateToIdeaScreen = (personId, personName) => {
    navigation.navigate('IdeaScreen', {
      personId,
      personName,
    });
  };

  function formatDate(inputDate) {
    const dateParts = inputDate.split('/'); 
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);
  
    const date = new Date(year, month - 1, day);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const formattedMonth = monthNames[date.getMonth()];
    const formattedDate = day + ' ' + formattedMonth;
    return formattedDate;
  }
  const sortedPeopleData = peopleData.slice().sort((a, b) => {
    const dateA = new Date(a.dob);
    const dateB = new Date(b.dob);
    return dateA - dateB;
  });

  return (
<Provider>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.title}>Gift Manager</Text>
        <Text style={styles.text}>An app to make gift lists for your family & friends!</Text>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : peopleData.length === 0 ? (
          <Text style={styles.displayMessage}>No people saved yet</Text>
        ) : (
          <FlatList
            style={styles.cardContainer}
            data={sortedPeopleData}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                description={formatDate(item.dob)}
                titleStyle={styles.nameText}
                descriptionStyle={styles.dobText}
                style={[styles.card, styles.purpleLeftBorder]}
                right={() => (
                  <View style={styles.iconContainer}>
           
                    <View style={styles.roundBoxDelete}>
                      <Icon
                        name="ios-trash"
                        size={20}
                        color="white" 
                        onPress={() => openModal(item.id, item.name)}
                      />
                    </View>
   
                    <View style={styles.roundBox}>
                      <Icon
                        name="gift-outline"
                        size={20}
                        color="white" 
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