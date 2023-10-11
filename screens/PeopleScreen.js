import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PeopleScreen({ route }) {
  const insets = useSafeAreaInsets();
  const [peopleData, setPeopleData] = useState([]);

  // Retrieve updated data when the route parameter changes
  useEffect(() => {
    if (route.params && route.params.peopleData) {
      // Sort peopleData by their dob in ascending order
      const sortedPeopleData = [...route.params.peopleData].sort((a, b) => {
        // Assuming dob is in the format "YYYY-MM-DD"
        return a.dob.localeCompare(b.dob);
      });
      setPeopleData(sortedPeopleData);
    }
  }, [route.params]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>List of People</Text>
      <FlatList
        data={peopleData}
        renderItem={({ item }) => (
          <View style={styles.personContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.dob}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});
