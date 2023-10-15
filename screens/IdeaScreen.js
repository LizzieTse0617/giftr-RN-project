import React from 'react';
import { StyleSheet, View, Text, Image, Button,ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalState } from '../components/GlobalContext'; // Import useGlobalState

export default function IdeaScreen({ route, navigation }) {
  const { personName, personId, capturedImageData, capturedImage,ideaText } = route.params || {};
  const insets = useSafeAreaInsets();
  const globalState = useGlobalState();

  const people = globalState.people;


  const navigateToAddIdea = () => {
    navigation.navigate('AddIdea', {
      personId,
      personName,
      capturedImageData,
      capturedImage,
      ideaText
    });
  };
  
 const currentPerson = people.find((person) => person.id === personId);
 console.log(currentPerson);


  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
    <Text style={styles.title}>Idea for <Text style={styles.personName}>{personName}</Text></Text>
    <Button title="Add Idea" onPress={navigateToAddIdea} />
    
    
    
    <ScrollView>
        {currentPerson.ideas.map((idea, index) => (
          <View key={idea.id} style={styles.ideaContainer}>
            <Text style={styles.ideaText}>Idea {index + 1}: {idea.text}</Text>
            <Image source={{ uri: idea.img }} style={styles.image} />
          </View>
        ))}
      </ScrollView>

      {capturedImage && (
        <View style={styles.ideaContainer}>
          <Text style={styles.ideaText}>Additional Idea Text: {ideaText}</Text>
          <Image source={{ uri: capturedImage.uri }} style={styles.image} />
        </View>
      )}

      <Button title="Add Idea" onPress={navigateToAddIdea} />
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