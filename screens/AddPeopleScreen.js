import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button,ScrollView, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SaveButton from '../components/SaveButton';
import CancelButton from '../components/CancelButton';
import * as Crypto from 'expo-crypto';


export default function AddPeopleScreen({ route }) {
  const [newPerson, setNewPerson] = useState({ name: '', dob: '' });
  const { updatePeopleList } = route.params;
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState('');

// Retrieve existing people data from AsyncStorage
const retrievePeopleData = async () => {
  try {
    const peopleData = await AsyncStorage.getItem('peopleData');
    if (peopleData) {
      return JSON.parse(peopleData);
    }
    return [];
  } catch (error) {
    console.error('Error retrieving people data:', error);
    return [];
  }
};


// Function to generate a unique ID
const generateUniqueId = async () => {
  try {
    // Generate a unique string (e.g., a random UUID-like string)
    const uniqueString = `${Date.now()}-${Math.random()}`;
    
    // Calculate the SHA-256 hash of the unique string
    const id = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      uniqueString
    );

 // Create a shortened ID using the first 16 characters of the hash
 const formattedId = `${id.substring(0, 8)}-${id.substring(8, 12)}-${id.substring(12, 16)}-${id.substring(16, 20)}-${id.substring(20, 32)}`;
  

    return formattedId;
  } catch (error) {
    console.error('Error generating ID:', error);
    return null;
  }
};

const handleAddPerson = async () => {
  // Validate and add the new person to the list
  if (newPerson.name.trim() && selectedDate) {
    // Generate a unique ID for the new person
    generateUniqueId().then((id) => {
      if (id) {
        const person = {
          id: id,
          ideas: [],
          name: newPerson.name,
          dob: selectedDate,
        };

        // Retrieve existing people data
        retrievePeopleData()
          .then((existingPeopleData) => {
            existingPeopleData.push(person);

            // Save the updated array back to AsyncStorage
            AsyncStorage.setItem('peopleData', JSON.stringify(existingPeopleData))
              .then(() => {
                console.log('Person added successfully');
                navigation.navigate('People', { peopleData: existingPeopleData });
                updatePeopleList(person);
                console.log(person)
                console.log(existingPeopleData)
                setNewPerson({ name: '', dob: '' });
                setSelectedDate('');
              })
              .catch((error) => {
                console.error('Error saving person data:', error);
              });
          })
          .catch((error) => {
            console.error('Error retrieving people data:', error);
          });
      } else {
        console.log('Failed to generate ID.');
      }
    });
  }
};


 const handleCancel = () => {
  navigation.goBack();
};

  return (

    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
    <Text style={styles.title}>Add a person</Text>
    
    <KeyboardAvoidingView>
      <KeyboardAvoidingView>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.input}
          value={newPerson.name}
          onChangeText={(text) => setNewPerson({ ...newPerson, name: text })}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView>
          <Text style={styles.text}>Date of Birth</Text>
          <DatePicker
          style={styles.datePicker}
            onSelectedChange={(date) => setSelectedDate(date)}
            selected={selectedDate}
            mode="calendar"
            minuteInterval={30}
          />
          <Text style={styles.selectDate}>Selected date: {selectedDate}</Text>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
  <SaveButton title="Save" onPress={handleAddPerson} style={styles.btn} />
  <CancelButton title="Cancel" onPress={handleCancel} />
</View>
    </KeyboardAvoidingView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 25,
    fontWeight:'bold'
  },
  text: {
    paddingTop: 20,
    fontSize: 16,
    
  },
  selectDate:{
    paddingTop: 10,
    fontSize: 20,
    color:'rebeccapurple',
    fontWeight:'bold'
  },
  input: {
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
  },
  datePicker:{
    borderColor:'black',
borderWidth:1,
},
  buttonContainer: {
    flexDirection: 'column',
  },
});