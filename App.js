import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PeopleScreen from './screens/PeopleScreen.js';
import AddPeopleScreen from './screens/AddPeopleScreen.js';
import IdeaScreen from './screens/IdeaScreen.js';
import AddIdeaScreen from './screens/AddIdeaScreen.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const [people, setPeople] = useState([
    {
      id: 'd825796c-4fc1-4879-ad86-048ece61358b',
      name: 'Mr Man',
      dob: '1983-07-22', // optionally this could be a timestamp
      ideas: [],
    },
  ]);

  const updatePeopleList = (newPerson) => {
    setPeople([...people, newPerson]);
  };

  return (

    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="People">
          <Stack.Screen
            name="People"
            component={PeopleScreen}
            initialParams={{ people:people }}
            options={({ navigation }) => ({
              title: 'People',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AddPeople', {
                      // Pass a callback to update the people list
                      updatePeopleList: updatePeopleList,
                    })
                  }
                >
                  <Text>Add People</Text>
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen name="AddPeople" component={AddPeopleScreen} options={{ title: 'Add People' }} />
          <Stack.Screen name="IdeaScreen" component={IdeaScreen} options={{ title: 'Idea' }} />
          <Stack.Screen name="AddIdea" component={AddIdeaScreen} options={{ title: 'Add Idea' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}