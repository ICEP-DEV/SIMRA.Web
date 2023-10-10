

//const SuccessPopup = ({ isVisible, message, onClose }) => {
  const modalStyle = {
    display: isVisible ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  };

  const contentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <div>
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
import React from 'react';
import { View, Text, Modal } from 'react-native';
import { View, Modal, Button } from 'react-bootstrap';

const SuccessPopup = ({ isVisible, message, onClose }) => {
//   return (
//     <Modal
//       isVisible={isVisible}
//       animationIn="fadeIn"
//       animationOut="fadeOut"
//       onBackdropPress={onClose}
//     >
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>{message}</Text>
//       </View>
//     </Modal>
//   );
};

export default SuccessPopup;
