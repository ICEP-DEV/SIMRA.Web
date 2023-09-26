import React from 'react';
import { View, Text, Modal } from 'react-native';

const SuccessPopup = ({ isVisible, message, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{message}</Text>
      </View>
    </Modal>
  );
};

export default SuccessPopup;
