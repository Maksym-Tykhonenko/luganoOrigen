import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CloseIcon from './CloseBtn';

const AboutModal = ({ isVisible, onBackdropPress }) => {

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress} style={styles.modal} transparent={true}>
      <View style={styles.modalContent}>
        <CloseIcon onClose={onBackdropPress} />
        <Text style={styles.aboutModalTitle}>About</Text>
        <ScrollView style={styles.aboutScrollView} contentContainerStyle={{alignItems: "center"}}>
        <Text style={styles.aboutText}>
          Test your knowledge about Lugano with simple true/false statements. This quiz covers a range of interesting facts
          about the city and is divided into ten themes: Geography and Nature, History, Culture and Art, Economy and
          Business, Education and Science, Tourism and Recreation, Transport and Infrastructure, Cuisine and Gastronomy,
          Sports and Outdoor Activities, and Life in Lugano. Answer each statement to see how well you know this beautiful
          Swiss city!
        </Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = {
    modal: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: "center",
      alignItems: "center",
      flex: 1
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 15,
      width: "90%",
      height: "80%",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: "20%",
      marginLeft: "5%"
    },
    aboutModalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom : 20,
      marginTop: 30
    },
    aboutText: {
      fontSize: 20,
      textAlign: 'center',
    },
    btnClose: {
      width: 200,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 15
    },
    btnText: {
      fontSize: 20,
    },
    aboutScrollView: {
      flex: 1,
    }
  };

export default AboutModal;