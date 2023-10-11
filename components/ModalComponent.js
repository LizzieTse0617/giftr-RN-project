import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ModalComponent = ({ isVisible, closeModal, title, onConfirm, onCancel }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>{`Do you want to delete ${title}?`}</Text>
          <TouchableOpacity onPress={onConfirm}>
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel}>
            <Text>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default ModalComponent;
