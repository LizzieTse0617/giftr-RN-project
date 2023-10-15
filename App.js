import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { GlobalProvider } from './components/GlobalContext';
import * as SplashScreen from 'expo-splash-screen';
import PeopleScreen from './screens/PeopleScreen';
import AddPeopleScreen from './screens/AddPeopleScreen';
import IdeaScreen from './screens/IdeaScreen';
import AddIdeaScreen from './screens/AddIdeaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false); // Declare the state variable here

  SplashScreen.preventAutoHideAsync();
  
  const [people, setPeople] = useState([
    {
      id: 'd825796c-4fc1-4879-ad86-048ece61358b',
      name: 'Mr Man',
      dob: '1983-07-22',
      ideas: [],
    },
  ]);

  const updatePeopleList = (newPerson) => {
    setPeople([...people, newPerson]);
  };

  useEffect(() => {
    (async () => {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // For example, load fonts using Font.loadAsync

        // Once fonts are loaded and any other async tasks are done:
        await SplashScreen.hideAsync(); // Hide the splash screen
        setAppIsReady(true); // Set your app as ready
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  if (!appIsReady) {
    // While the app is not ready, display the splash screen
    return null; // This prevents rendering the rest of the component
  }

  return (
    <GlobalProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="People">
              <Stack.Screen
                name="People"
                component={PeopleScreen}
                initialParams={{ people: people }}
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
                      <Text style={styles.heading}>+ Add People</Text>
                    </TouchableOpacity>
                  ),
                })}
              />

              <Stack.Screen
                name="AddPeople"
                component={AddPeopleScreen}
                options={{ title: 'Add People' }}
              />
              <Stack.Screen
                name="IdeaScreen"
                component={IdeaScreen}
               
              />
              <Stack.Screen name="AddIdea" component={AddIdeaScreen} options={{ title: 'Add Idea' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: '#7C56FF',
  },
});