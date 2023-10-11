import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function DeleteButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
