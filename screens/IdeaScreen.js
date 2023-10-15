import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function IdeaScreen({ route, navigation }) {
  const { personName, personId, capturedImageData, capturedImage,ideaText } = route.params || {};
  const insets = useSafeAreaInsets();

  const navigateToAddIdea = () => {
    navigation.navigate('AddIdea', {
      personId,
      personName,
      capturedImageData,
      capturedImage,
      ideaText
    });
  };
  console.log(capturedImage,ideaText,capturedImage.uri)
  //console.log('capturedImage URI:', capturedImage.uri);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
    <Text style={styles.title}>Idea for <Text style={styles.personName}>{personName}</Text></Text>
    {capturedImage && (
      <View style={{ backgroundColor: 'white' }}>
        <Text>{ideaText}</Text>
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
  },
  image:{
    width:300,
    height:200
  }
});
