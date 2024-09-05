import React, { useState, useEffect, useCallback } from 'react';
import { Modal, View, ScrollView, TouchableOpacity, Text, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import topics from '../constants/quiz.js';

const OptionsModal = ({
  isVisible,
  onBackdropPress,
  onResetPress,
  vibrationEnabled,
  toggleVibration,
  loadResults,
  easyModeResults,
  hardModeResults
}) => {
  const [isFactsModalVisible, setIsFactsModalVisible] = useState(false);
  const [selectedFactTopic, setSelectedFactTopic] = useState(null);
  const [results, setResults] = useState({ easyMode: null, hardMode: null });
  const [resultsLoaded, setResultsLoaded] = useState(false);

  useEffect(() => {
    if (isVisible && !resultsLoaded) {
      const fetchData = async () => {
        try {
          await loadResults();
          setResults({ easyMode: easyModeResults, hardMode: hardModeResults });
          setResultsLoaded(true);
        } catch (error) {
          console.error('Error loading results:', error);
        }
      };
      fetchData();
    }
  }, [isVisible, resultsLoaded, loadResults, easyModeResults, hardModeResults]);

  const handleResetPress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset your progress? This will delete all your results.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('EasyMode');
              await AsyncStorage.removeItem('HardMode');
              onResetPress();
              Alert.alert('Progress Reset', 'Your progress has been reset.');
            } catch (error) {
              console.error('Error resetting progress:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleFactsPress = () => {
    setIsFactsModalVisible(true);
  };

  const handleClose = () => {
    setIsFactsModalVisible(false);
  };

  const handleSharePress = useCallback(async () => {
    try {
      const shareOptions = {
        title: 'Share Results',
        message: `Easy Mode Results:\nBest Score: ${results.easyMode?.score || 'N/A'} points\nTime Taken: ${results.easyMode?.timeTaken || 'N/A'} seconds\n\nHard Mode Results:\nBest Score: ${results.hardMode?.score || 'N/A'} points\nTime Taken: ${results.hardMode?.timeTaken || 'N/A'} seconds`,
        failOnCancel: false,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing results:', error);
    }
  }, [results]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={styles.modal}
      transparent={true}
    >
      <View style={styles.modalContent}>
        {isFactsModalVisible ? (
          <View style={styles.modalInnerContent}>
            <ScrollView>
              {selectedFactTopic ? (
                <View style={styles.factContainer}>
                  <Text style={styles.factName}>{selectedFactTopic.name}</Text>
                  <ScrollView style={styles.factScrollView} contentContainerStyle={{ alignItems: "center" }}>
                    <Text style={styles.factText}>{selectedFactTopic.fact}</Text>
                  </ScrollView>
                  <TouchableOpacity style={styles.btnCloseFacts} onPress={() => setSelectedFactTopic(null)}>
                    <Text style={styles.btnTextFacts}>Back to topics</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.factContainer}>
                  <ScrollView style={styles.topicScrollView}>
                    {topics.map((topic, index) => (
                      <TouchableOpacity key={index} style={styles.btn} onPress={() => setSelectedFactTopic(topic)}>
                        <Text style={styles.btnText}>{topic.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TouchableOpacity style={styles.btnCloseFacts} onPress={handleClose}>
                    <Text style={styles.btnTextFacts}>Back to options</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.modalInnerContent}>
            <View style={{ width: "100%", justifyContent: "space-around", alignItems: "center", flexDirection: "row" }}>
              <View style={styles.regulatorContainer}>
                <Text style={styles.regulatorText}>Vibration</Text>
                <TouchableOpacity onPress={toggleVibration}>
                  <Image
                    source={require('../options/vibration.png')}
                    style={[
                      styles.regulationIcon,
                      !vibrationEnabled && styles.vibrationOffIcon,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.btnOptions} onPress={handleFactsPress}>
              <Text style={styles.btnText}>Historical facts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOptions} onPress={handleResetPress}>
              <Text style={styles.btnText}>Reset progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOptions} onPress={handleSharePress}>
              <Text style={styles.btnText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOptions} onPress={onBackdropPress}>
              <Text style={styles.btnText}>Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};


const styles = {
  btn: {
    width: "100%",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 10
  },
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
      width: "90%",
      height: "50%",
      marginTop: "45%",
      marginLeft: "5%"
    },
    modalInnerContent: {
      width: "100%",
      height: "100%",
      justifyContent: "space-around",
      alignItems: "center"
    },
    btnClose: {
      width: 200,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 15,
    },
    btnCloseFacts: {
      width: 200,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      backgroundColor: "#f0ad4e",
      marginTop: 10
    },
    btnText: {
      fontSize: 20,
    },
    btnTextFacts: {
      fontSize: 20,
      color: "#fff"
    },
    regulatorContainer: {
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10
    },
    regulatorText: {
      fontSize: 18,
      marginBottom: 20
    },
    regulator: {
      width: 300,
      paddingVertical: 5,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 10
    },
    btnOptions: {
      width: "100%",
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 10
    },
    factContainer: {
      width: "100%",
      height: "100%",
      justifyContent: "space-between",
      alignItems: "center",
    },
    factScrollView: {
      flex: 1,
      height: 190,
    },
    factName: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      marginTop: 10
    },
    factText: {
      fontSize: 20,
      textAlign: 'center',
    },
    regulationIcon: {
      width: 30,
      height: 30
    },
    vibrationOffIcon: {
      tintColor: 'gray',
      position: 'relative',
    },
    vibrationOffIconLine: {
      position: 'absolute',
      width: 50,
      height: 5,
      backgroundColor: 'red',
      transform: [{ rotate: '45deg' }],
    },
    topicScrollView: {
      flex: 1,
      height: 240,
    }
  };

export default OptionsModal;