import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CancelButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red', // Background color for the button
    borderColor: 'red',   // Border color
    borderWidth: 1,         // Border width
    padding: 10,           // Padding around the button content
    alignItems: 'center',  // Center the content horizontally
    borderRadius: 5,       // Optional: Add border radius for rounded corners
    marginTop:10,
  },
  buttonText: {
    color: 'white',        // Text color
    fontSize: 16,          // Text font size
  },
});

export default CancelButton;
