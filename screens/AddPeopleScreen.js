import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SaveButton from '../components/SaveButton';
import CancelButton from '../components/CancelButton';
import { Text, TextInput} from 'react-native-paper'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import generateUniqueId from '../components/generateUniqueId';

export default function AddPeopleScreen({ route }) {
  const insets = useSafeAreaInsets();
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

    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <Text style={styles.title}>Add a person</Text>

    <Text style={styles.text}>Name</Text>
    <TextInput
  style={styles.input}
  value={newPerson.name}
  onChangeText={(text) => setNewPerson({ ...newPerson, name: text })}
  placeholder="Enter name"
/>


    <Text style={styles.text}>Date of Birth</Text>
    <DatePicker
      style={styles.datePicker}
      onSelectedChange={(date) => setSelectedDate(date)}
      selected={selectedDate}
      mode="calendar"
      minuteInterval={30}
      options={{
        selectedTextColor: '#393939',
        mainColor: '#FBE6A2',
        textSecondaryColor: '#7C56FF',
      }}
    />
    <Text style={styles.text}>Selected date (YYYY / MM / DD)</Text>
    <Text style={styles.selectDate}>{selectedDate}</Text>

    <View style={styles.buttonContainer}>
      <CancelButton title="Cancel" onPress={handleCancel} />
      <SaveButton title="Save" onPress={handleAddPerson} style={styles.btn} />
    </View>
  </KeyboardAvoidingView>

  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor:'#7C56FF',
    paddingTop:20,
  },
  title: {
    fontSize: 25,
    fontWeight:700,
    color:'#FFFFFF'
  },
  text: {
    paddingTop: 10,
    fontSize: 14,
    color:'#FFFFFF',
    paddingBottom:5

  },
  selectDate:{
    padding: 10,
    fontSize: 20,
    color:'#393939',
    fontWeight:'bold',
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    borderColor: '#FFFFFF',
    padding:5,
  },
 
buttonContainer:{
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}
});