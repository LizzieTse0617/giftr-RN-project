import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomTextInput({ value, onChangeText, placeholder, style }) {
  const insets = useSafeAreaInsets();

  return (
    <TextInput
      style={[styles.input, style, { paddingTop: insets.top }]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    borderColor: '#FFFFFF',
    padding: 5,
  },
});
