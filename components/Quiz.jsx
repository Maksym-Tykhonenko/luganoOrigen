import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import topics from '../constants/quiz.js';
import QuizIcon from './QuizIcons.jsx';

const Quiz = ({ topic, difficulty, navigation, vibrationEnabled }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState(3);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(difficulty === 'Easy' ? 90 : 60);
  const [score, setScore] = useState(0);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(topic ? topics.findIndex(t => t === topic) : 0);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [selectedManually, setSelectedManually] = useState(!!topic);

  const coin = 'coin';
  const time = 'time';
  const hint = 'hint';
  const heart = 'heart';
  const brokenHeart = 'broken-heart';

  const timerRef = useRef(null);

  useEffect(() => {
    const currentTopic = selectedManually ? topic : topics[currentTopicIndex];
    if (difficulty === 'Hard') {
      const allQuestions = topics.flatMap(t => t.questions.map(q => ({ ...q, topic: t })));
      setQuestions(shuffleArray(allQuestions));
    } else {
      setQuestions(currentTopic ? currentTopic.questions.map(q => ({ ...q, topic: currentTopic })) : []);
    }
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [difficulty, currentTopicIndex, topic, selectedManually]);

  useEffect(() => {
    if (timeLeft <= 0 || finished) {
      finishQuiz();
    }
  }, [timeLeft, finished]);

  const startTimer = () => {
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);
  };

  const finishQuiz = async () => {
    if (finished) return;
  
    clearInterval(timerRef.current);
    const totalTime = difficulty === 'Easy' ? 90 : 60;
    const timeTaken = totalTime - timeLeft;
  
    if (difficulty === 'Hard') {
      if (sessionCount === 0) {
        setTotalTimeTaken(timeTaken);
      } else {
        setTotalTimeTaken(prevTotalTimeTaken => prevTotalTimeTaken + timeTaken);
      }
    } else {
      setTimeTaken(timeTaken);
    }
  
    setFinished(true);
  
    try {
      const key = difficulty === 'Hard' ? 'HardMode' : 'EasyMode';
      const data = await AsyncStorage.getItem(key);
      const parsedData = data ? JSON.parse(data) : { score: 0, timeTaken: Infinity };
  
      parsedData.score = Math.max(parsedData.score, score);
      parsedData.timeTaken = parsedData.timeTaken === 0 || timeTaken < parsedData.timeTaken
        ? timeTaken
        : parsedData.timeTaken;
  
      await AsyncStorage.setItem(key, JSON.stringify(parsedData));
      //console.log(`${difficulty} mode results saved${topic?.name ? ` for ${topic?.name}` : ''}: score ${parsedData.score}, time taken ${parsedData.timeTaken} seconds`);
    } catch (error) {
      console.error('Error saving data to async storage:', error);
    }
  };  
  

  const handleAnswer = (answer) => {
    if (answered || finished) return;

    const currentTimer = timeLeft;
    setAnswered(true);
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestion]?.answer;
    setCorrectAnswer(isCorrect);

    if (isCorrect) {
      const updatedScore = score + 10;
      setScore(updatedScore);

      if (difficulty === 'Hard' && updatedScore > 0 && updatedScore % 100 === 0) {
        setTimeLeft(60);
        setTotalTimeTaken(prevTotalTimeTaken => prevTotalTimeTaken + (currentTimer - 60));
        setSessionCount(prevSessionCount => prevSessionCount + 1);
      }
    } else {
      if (difficulty === 'Hard') {
        setIncorrectAnswers(prev => {
          const newCount = Math.max(prev - 1, 0);
          if (newCount === 0) {
            finishQuiz();
            setTimeout(() => {
              finishQuiz();
            }, 2000);
          }
          return newCount;
        });
      }

      if (vibrationEnabled) {
        Vibration.vibrate(500);
      }
    }

    setTimeout(() => {
      setAnswered(false);
      setSelectedAnswer(null);
      setHintUsed(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        finishQuiz();
      }
    }, 1000);
  };

  const handleHint = () => {
    if (score > 0 && !hintUsed && (difficulty === 'Hard' || hintCount < 2)) {
      setScore(score - 10);
      setHintUsed(true);
      setHintCount(hintCount + 1);

      if (questions[currentQuestion]?.answer === true) {
        setSelectedAnswer(false);
      } else {
        setSelectedAnswer(true);
      }
    }
  };

  const handleTryAgain = () => {
    clearInterval(timerRef.current);
    setFinished(false);
    setCurrentQuestion(0);
    setTimeLeft(difficulty === 'Easy' ? 90 : 60);
    setScore(0);
    setTotalTimeTaken(0);
    setTimeTaken(0);
    setHintUsed(false);
    setHintCount(0);
    setSessionCount(0);
    setIncorrectAnswers(3);
    startTimer();
  };

  const handleNextTopic = () => {
    clearInterval(timerRef.current);

    const nextTopicIndex = (currentTopicIndex + 1) % topics.length;
    setCurrentTopicIndex(nextTopicIndex);
    setSelectedManually(false);

    const nextTopic = topics[nextTopicIndex];
    setQuestions(nextTopic.questions.map(q => ({ ...q, topic: nextTopic })));

    setFinished(false);
    setCurrentQuestion(0);
    setTimeLeft(difficulty === 'Easy' ? 90 : 60);
    setScore(0);
    setTotalTimeTaken(0);
    setTimeTaken(0);
    setHintUsed(false);
    setHintCount(0);
    setSessionCount(0);
    setIncorrectAnswers(3);
    startTimer();
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getAnswerStyle = (answer) => {
    if (answered) {
      if (answer === questions[currentQuestion]?.answer) {
        return styles.correct;
      } else if (answer === selectedAnswer) {
        return styles.incorrect;
      }
    }
    if (hintUsed && selectedAnswer !== null && answer === selectedAnswer) {
      return { ...styles.incorrect, opacity: 0.5 };
    }
    return styles.defaultAnswer;
  };

  const renderHearts = () => {
    const hearts = [];
    const heartCount = Math.min(3, incorrectAnswers);
    const brokenHeartCount = 3 - heartCount;

    for (let i = 0; i < heartCount; i++) {
      hearts.push(<QuizIcon key={`heart-${i}`} type={heart} />);
    }
    for (let i = 0; i < brokenHeartCount; i++) {
      hearts.push(<QuizIcon key={`broken-heart-${i}`} type={brokenHeart} />);
    }
    return hearts;
  };

  const currentTopic = selectedManually ? topic : topics[currentTopicIndex];
  const backgroundImage = difficulty === 'Hard' ? require('../quiz-images/image-hard.jpg') : currentTopic.image;
  const displayTopicName = difficulty === 'Hard' ? 'Quiz' : currentTopic.name;

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>{displayTopicName}</Text>
            {!finished && (
              <View style={{ width: "100%" }}>
                {difficulty === 'Hard' && (
                  <View style={styles.heartsPanel}>
                    {renderHearts()}
                  </View>
                )}
                <View style={styles.resultsPanel}>
                  <Text style={styles.score}><QuizIcon type={coin} />  {score}</Text>
                  <Text style={styles.timer}>
                    <QuizIcon type={time} />  {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.hintButton,
                      (score <= 0 || hintUsed || (difficulty === 'Easy' && hintCount >= 2)) && styles.disabledHint,
                    ]}
                    onPress={handleHint}
                    disabled={score <= 0 || hintUsed || (difficulty === 'Easy' && hintCount >= 2)}
                  >
                    <QuizIcon type={hint} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {finished ? (
              <View style={styles.finish}>
                <Text style={styles.finishText}>Quiz finished!</Text>
                <Text style={styles.score}><QuizIcon type={coin} /> Final Score: {score}</Text>
                <Text style={difficulty === 'Hard' ? styles.timeTakenHard : styles.timeTaken}>{difficulty === 'Hard'  ? ''  : <> <QuizIcon type={time} /> {' '} Time taken: {timeTaken} seconds </>}</Text>
                <TouchableOpacity style={styles.tryAgain} onPress={handleTryAgain}>
                  <Text style={styles.tryAgainText}>Try again</Text>
                </TouchableOpacity>
                {difficulty === 'Easy' && (
                  <View style={styles.easyModeBtns}>
                    <TouchableOpacity style={styles.nextTopic} onPress={handleNextTopic}>
                      <Text style={styles.nextTopicText}>Next Topic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.showFact}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={styles.showFactText}>Topic Fact</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity style={styles.backToMenu} onPress={() => navigation.navigate('MainMenu')}>
                  <Text style={styles.backToMenuText}>Menu</Text>
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  animationType="slide"
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalText}>{topic?.fact || 'No fact available'}</Text>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={styles.modalButtonText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            ) : (
              <>
                {questions.length > 0 ? (
                  <>
                    <Text style={difficulty === 'Easy' ? styles.question : styles.questionHard}>
                      {questions[currentQuestion]?.question}
                    </Text>
                    <View style={styles.answers}>
                      <TouchableOpacity
                        style={[styles.answer, getAnswerStyle(true)]}
                        onPress={() => handleAnswer(true)}
                      >
                        <Text style={styles.answerText}>True</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.answer, getAnswerStyle(false)]}
                        onPress={() => handleAnswer(false)}
                      >
                        <Text style={styles.answerText}>False</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <Text style={difficulty === 'Easy' ? styles.question : styles.questionHard}>No questions available</Text>
                )}
              </>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
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
    height: "100%",
    width: "100%",
    padding: 30,
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "white"
  },
  resultsPanel: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },
  chances: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    color: 'white',
  },
  timer: {
    fontSize: 18,
    color: 'white',
  },
  hintButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
  },
  hintText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledHint: {
    backgroundColor: 'grey',
  },
  question: {
    fontSize: 18,
    color: 'white',
    height: 320
  },
  answers: {
    width: "100%",
    alignItems: "center",
  },
  answer: {
    width: "100%",
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    color: 'white',
  },
  defaultAnswer: {
    borderColor: '#ccc',
    backgroundColor: 'transparent',
  },
  correct: {
    borderColor: '#64c63a',
    backgroundColor: '#64c63a',
  },
  incorrect: {
    borderColor: '#e73a3a',
    backgroundColor: '#e73a3a',
  },
  answerText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  finish: {
    height: "100%",
    width: "100%",
  },
  finishText: {
    fontSize: 20,
    marginBottom: 150,
    color: 'white',
    alignSelf: "center"
  },
  tryAgain: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 20,
    marginTop: 20
  },
  tryAgainText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  easyModeBtns: {
    width: "100%"
  },
  nextTopic: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
  },
  nextTopicText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  backToMenu: {
    backgroundColor: '#E5B1FF',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
  },
  backToMenuText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  showFact: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
  },
  showFactText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: "150%",
    margin: -85,
  },
  modalContent: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: "space-between",
    alignItems: 'center',
    width: 345,
    height: 380,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    width: 150,
    alignItems: "center"
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
  },
  timeTaken: {
    color: "white",
    fontSize: 18,
    marginBottom: 20
  },
  timeTakenHard: {
    color: "white",
    fontSize: 18,
    marginBottom: 170
  },
  questionHard: {
    fontSize: 18,
    color: 'white',
    height: 280
  },
  heartsPanel: {
    flexDirection: "row",
    marginBottom: 10
  }
});

export default Quiz;

