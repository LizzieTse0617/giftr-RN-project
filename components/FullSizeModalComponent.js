import React from 'react';
import { View, Modal, Image, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FullSizeModalComponent = ({ isVisible, closeModal, imageUri }) => {
  const handleModalClose = () => {
    closeModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <Image source={{ uri: imageUri }} style={styles.fullSizedImage} />
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={handleModalClose}>
            <View style={styles.closeButton}>
              <Icon name="close" size={30} color="#FFF" />
            </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  fullSizedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 60,
    right: 60,

  },
  closeButton: {
    backgroundColor: '#7C56FF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});

export default FullSizeModalComponent;
