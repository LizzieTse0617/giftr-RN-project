// SaveButton.js
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
    borderColor: '#FBE6A2',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
    margin: 10,
  },
  buttonText: {
    color: '#393939',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SaveButton;
