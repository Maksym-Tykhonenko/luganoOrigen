import React from 'react';
import { Modal, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import CloseIcon from './CloseBtn';

const TopicModal = ({ topics, onClose, onSelect }) => {

  return (
    <Modal
      onBackdropPress={onClose}
      transparent={true}
      style={styles.modal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <CloseIcon onClose={onClose} />
          <ScrollView style={{marginTop: 30}}>
            {topics.map((topic, index) => (
              <TouchableOpacity key={index} style={styles.btn} onPress={() => onSelect(topic)}>
                <Text style={styles.btnText}>{topic.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxHeight: '80%',
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: 10,
  },
  btnText: {
    fontSize: 18,
  },
};

export default TopicModal;