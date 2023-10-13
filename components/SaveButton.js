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
    backgroundColor: '#FBE6A2', 
    borderColor: '#FBE6A2',   // Border color
    borderWidth: 1,         // Border width
    padding: 10,           // Padding around the button content
    alignItems: 'center',  // Center the content horizontally
    borderRadius: 5,  
    flex: 1,
    margin:10,
  
  },
  buttonText: {
    color: '#393939',        // Text color
    fontSize: 16,          // Text font size
    fontWeight:'bold',
  },
});

export default SaveButton;
