import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SaveButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green', // Background color for the button
    borderColor: 'green',   // Border color
    borderWidth: 1,         // Border width
    padding: 10,           // Padding around the button content
    alignItems: 'center',  // Center the content horizontally
    borderRadius: 5,  
    marginTop:10,
  },
  buttonText: {
    color: 'white',        // Text color
    fontSize: 16,          // Text font size
  },
});

export default SaveButton;
