import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ModalComponent = ({ isVisible, closeModal, title, onConfirm, onCancel }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>{`Are you sure you want to delete ${title}?`}</Text>
          <View style={styles.buttonContainer}>
    
          <Button
            mode="contained"
            style={styles.buttonStyle}
            onPress={onCancel}
            buttonColor='#EFEFEF'
            textColor='#393939'
          >
            No
          </Button>
          <Button 
            mode="contained"
            style={styles.buttonStyle}
            onPress={onConfirm}
            buttonColor='#F25F4F'
            textColor='#FFFFFF'
          >
            Yes
          </Button>
          </View>
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
    borderRadius:10,
  },
  buttonStyle: {
    marginVertical: 10, // Adjust the margin as needed
    width:'45%',
    borderRadius:10,
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingTop:40,
  }
});

export default ModalComponent;
