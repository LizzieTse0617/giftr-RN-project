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
    backgroundColor: '#FFFFFF', 
    borderColor: '#FFFFFF',   // Border color
    borderWidth: 1,         // Border width
    padding: 10,           // Padding around the button content
    alignItems: 'center',  // Center the content horizontally
    borderRadius: 5,  
    flex: 1,
    margin:10,
  },
  buttonText: {
    color: '#393939',      
    fontSize: 16,         
  },
});




export default CancelButton;
