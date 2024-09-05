import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, Image, ImageBackground, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import topics from '../constants/quiz.js';
import TopicModal from './TopicModal';
import ResultsModal from './ResultsModal';
import OptionsModal from './OptionsModal';
import AboutModal from './AboutModal';
import UserProfile from './UserProfile.jsx';

const MainMenu = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [easyModeResults, setEasyModeResults] = useState(null);
  const [hardModeResults, setHardModeResults] = useState(null);
  const [isResultsModalVisible, setIsResultsModalVisible] = useState(false);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);
  const [isUserProfileVisible, setIsUserProfileVisible] = useState(false);
  const [userName, setUserName] = useState('User');
  const [userAvatar, setUserAvatar] = useState(null);
  console.log('userAvatar==>', userAvatar)
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const loadResults = useCallback(async () => {
    try {
      const easyModeData = await AsyncStorage.getItem('EasyMode');
      const hardModeData = await AsyncStorage.getItem('HardMode');
  
      console.log('Fetched Easy Mode Data:', easyModeData);
      console.log('Fetched Hard Mode Data:', hardModeData);
  
      const currentEasyModeResults = easyModeData ? JSON.parse(easyModeData) : null;
      const currentHardModeResults = hardModeData ? JSON.parse(hardModeData) : null;
  
      console.log('Parsed Easy Mode Results:', currentEasyModeResults);
      console.log('Parsed Hard Mode Results:', currentHardModeResults);
  
      setEasyModeResults(currentEasyModeResults);
      setHardModeResults(currentHardModeResults);
    } catch (error) {
      console.error('Error loading results:', error);
    }
  }, []);
  
  const checkStoredData = async () => {
    try {
      const easyModeData = await AsyncStorage.getItem('EasyMode');
      const hardModeData = await AsyncStorage.getItem('HardMode');

      console.log('Stored Easy Mode Data:', easyModeData);
      console.log('Stored Hard Mode Data:', hardModeData);
    } catch (error) {
      console.error('Error checking stored data:', error);
    }
  };

  checkStoredData();

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userProfile');
        const storedAvatar = await AsyncStorage.getItem('userAvatar');
        if (storedName) {
          setUserName(storedName);
        }
        if (storedAvatar) {
          setUserAvatar(JSON.parse(storedAvatar));
        }
      } catch (error) {
        console.error('Error checking user profile:', error);
      }
    };

    checkUserProfile();
    loadResults();
  }, [loadResults]);

  const handlePress = () => {
    if (selectedDifficulty === 'Hard') {
      startQuiz();
    } else {
      setIsModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    handleModalClose();
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const startQuiz = () => {
    if (selectedDifficulty === 'Hard') {
      navigation.navigate('QuizScreen', {
        topic: null,
        difficulty: selectedDifficulty,
        vibrationEnabled: vibrationEnabled,
      });
    } else if (selectedTopic && selectedDifficulty) {
      navigation.navigate('QuizScreen', {
        topic: selectedTopic,
        difficulty: selectedDifficulty,
        vibrationEnabled: vibrationEnabled,
      });
    } else {
      Alert.alert('Selection Required', 'Please select a topic and difficulty level');
    }
  };

  const handleResultsPress = async () => {
    await loadResults();
    console.log('Easy Mode Results:', easyModeResults);
    console.log('Hard Mode Results:', hardModeResults);
    setIsResultsModalVisible(true);
  };
  

  const handleAboutPress = () => {
    setIsAboutModalVisible(true);
  };

  const handleOptionsPress = () => {
    setIsOptionsModalVisible(true);
  };

  const handleUserProfileClose = async () => {
    setIsUserProfileVisible(false);
    try {
      const updatedName = await AsyncStorage.getItem('userProfile');
      const updatedAvatar = await AsyncStorage.getItem('userAvatar');
      if (updatedName) {
        setUserName(updatedName);
      } else {
        setUserName('User');
      }
      if (updatedAvatar) {
        setUserAvatar(updatedAvatar);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const toggleVibration = () => {
    if (vibrationEnabled) {
      Vibration.vibrate(500);
    }
    setVibrationEnabled(!vibrationEnabled);
  };

  return (
    <ImageBackground
      source={require('../assets/rediz/xxxx.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.userName}>Hi, {userName}</Text>
          <View style={styles.userContainer}>
            <TouchableOpacity onPress={() => setIsUserProfileVisible(true)} style={styles.editProfileBtn}>
              <Image source={userAvatar ?  userAvatar  : require('../avatars/gorilla.png')} style={styles.avatar} />
            </TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.btn} onPress={handlePress}>
              <Text style={styles.btnText}>
                {selectedDifficulty === 'Hard' ? 'Start Quiz' : (selectedTopic ? selectedTopic.name : 'Application Topics')}
              </Text>
            </TouchableOpacity>
            <View style={styles.quizModeContainer}>
              <Text style={styles.quizModeText}>Quiz mode:</Text>
              <View style={styles.quizModeBtnContainer}>
                <TouchableOpacity
                  style={[styles.btnEasy, selectedDifficulty === 'Easy' ? styles.selected : null]}
                  onPress={() => handleDifficultySelect('Easy')}
                >
                  <Text style={styles.btnText}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btnHard, selectedDifficulty === 'Hard' ? styles.selected : null]}
                  onPress={() => handleDifficultySelect('Hard')}
                >
                  <Text style={styles.btnText}>Hard</Text>
                </TouchableOpacity>
              </View>
            </View>
            {selectedDifficulty !== 'Hard' && (
              <TouchableOpacity style={styles.btn} onPress={startQuiz}>
                <Text style={styles.btnText}>Start Quiz</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.btn} onPress={handleResultsPress}>
              <Text style={styles.btnText}>Results</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleOptionsPress}>
              <Text style={styles.btnText}>Options</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleAboutPress}>
              <Text style={styles.btnText}>About</Text>
            </TouchableOpacity>
          </View>
          <Modal isVisible={isModalVisible} onBackdropPress={handleModalClose} style={styles.modal}>
            <TopicModal
              topics={topics}
              onSelect={(topic) => handleTopicSelect(topic)}
              onClose={handleModalClose}
            />
          </Modal>
          <Modal isVisible={isResultsModalVisible} onBackdropPress={() => setIsResultsModalVisible(false)}>
            <ResultsModal
              easyModeResults={easyModeResults}
              hardModeResults={hardModeResults}
              onClose={() => setIsResultsModalVisible(false)}
              loadResults={loadResults}
            />
          </Modal>
          <Modal isVisible={isOptionsModalVisible} onBackdropPress={() => setIsOptionsModalVisible(false)}>
            <OptionsModal
              isVisible={isOptionsModalVisible}
              onBackdropPress={() => setIsOptionsModalVisible(false)}
              onResetPress={loadResults}
              vibrationEnabled={vibrationEnabled}
              toggleVibration={toggleVibration}
              loadResults={loadResults}
              easyModeResults={easyModeResults}
              hardModeResults={hardModeResults}            />
          </Modal>
          <Modal isVisible={isAboutModalVisible} onBackdropPress={() => setIsAboutModalVisible(false)}>
            <AboutModal
              isVisible={isAboutModalVisible}
              onBackdropPress={() => setIsAboutModalVisible(false)}
            />
          </Modal>
          <Modal isVisible={isUserProfileVisible} onBackdropPress={handleUserProfileClose}>
            <UserProfile onClose={handleUserProfileClose} />
          </Modal>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};



const styles = {
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
  innerContainer: {
    padding: 30,
    width: "100%"
  },
  btn: {
    width: "100%",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  quizModeContainer: {
    width: "100%",
    alignItems: "center",
  },
  quizModeText: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: "bold",
    color: "white"
  },
  quizModeBtnContainer: {
    width: "100%",
    flexDirection: "row"
  },
  btnEasy: {
    width: "49%",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 10,
    marginRight: "2%",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  btnHard: {
    width: "49%",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  selected: {
    backgroundColor: "#48bf91",
  },
  btnText: {
    fontSize: 18,
    color: "white"
  },
  userContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 30,
    right: 30
  },
  editProfileBtn: {
    width: "100%",
    height: "100%"
  },
  userName: {
    position: "absolute",
    top: 45,
    right: 100,
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
    overflow: "hidden"
  }
};

export default MainMenu;
