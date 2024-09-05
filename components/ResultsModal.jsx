import React, { useEffect } from 'react';
import { Modal, View, ScrollView, Text } from 'react-native';
import CloseIcon from './CloseBtn';

const ResultsModal = ({ isVisible, onClose, easyModeResults, hardModeResults, loadResults }) => {

  useEffect(() => {
    if (isVisible) {
      loadResults();
    }
  }, [isVisible, loadResults]);

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal} transparent={true}>
      <View style={styles.modalContent}>
        <CloseIcon onClose={onClose} />
        <ScrollView>
          <View style={styles.resultsContainer}>
            <View style={styles.column}>
              <Text style={styles.columnHeader}>Easy Mode</Text>
              {easyModeResults ? (
                <View style={styles.results}>
                  <Text style={styles.valueS}>Best Score: {easyModeResults.score} points</Text>
                  <Text style={styles.valueT}>Time Taken: {easyModeResults.timeTaken} seconds</Text>
                </View>
              ) : (
                <Text style={styles.value}>No results yet.</Text>
              )}
            </View>
            <View style={styles.column}>
              <Text style={styles.columnHeader}>Hard Mode</Text>
              {hardModeResults ? (
                <View style={styles.results}>
                  <Text style={styles.valueS}>Best Score: {hardModeResults.score} points</Text>
                  <Text style={styles.valueT}>Time Taken: {hardModeResults.timeTaken} seconds</Text>
                </View>
              ) : (
                <Text style={styles.value}>No results yet.</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};


const styles = {
    modal: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 15,
      width: '90%',
      maxHeight: '80%',
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: "50%",
      marginLeft: "5%"
    },
    resultsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
    },
    column: {
      width: '45%',
    },
    results: {
      width: "100%"
    },
    columnHeader: {
      fontSize: 19,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    valueS: {
      fontSize: 16,
      marginBottom: 10
    },
    valueT: {
      fontSize: 16,
    },
    value: {
      fontSize: 16,
    }
  };

export default ResultsModal;