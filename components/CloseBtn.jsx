import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const CloseIcon = ({ onClose }) => {
  return (
    <TouchableOpacity onPress={onClose} style={styles.iconContainer}>
      <Image 
        source={require('../quiz-images/close.png')} 
        style={styles.icon} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 15,
    position: 'absolute',
    right: 0
  },
  icon: {
    width: 21,
    height: 21,
  },
});

export default CloseIcon;
