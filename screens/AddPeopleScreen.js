import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button,ScrollView, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SaveButton from '../components/SaveButton';
import CancelButton from '../components/CancelButton';
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


// Update people & validation
const handleAddPerson = async () => {
  // Validate and add the new person to the list
  if (newPerson.name.trim() && selectedDate) {
    // The selectedDate is in the format "YYYY-MM-DD" from the DatePicker
    const person = {
      id: Math.random().toString(),
      ideas: [],
      name: newPerson.name,
      dob: selectedDate, // Use the selectedDate as is
    };

    // Retrieve existing people data
    const existingPeopleData = await retrievePeopleData();

    // Add the new person to the array
    existingPeopleData.push(person);

    // Save the updated array back to AsyncStorage
    try {
      await AsyncStorage.setItem('peopleData', JSON.stringify(existingPeopleData));
      console.log('Person added successfully');
    
      // Pass the updated data as a route parameter
      navigation.navigate('People', { peopleData: existingPeopleData });
    } catch (error) {
      console.error('Error saving person data:', error);
    }

    updatePeopleList(person);
    setNewPerson({ name: '', dob: '' });
    console.log(existingPeopleData)
    setSelectedDate(''); // Reset the selected date
  }
};


 // Handle cancel button press
 const handleCancel = () => {
  // Optionally add logic to navigate back without saving
  navigation.goBack();
};



  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
  >
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
  datePicker:{borderColor:'black',
borderWidth:1,


},

  buttonContainer: {
    flexDirection: 'column',
  },


});