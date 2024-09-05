import React from 'react';
import { Image, StyleSheet } from 'react-native';

const QuizIcon = ({ type }) => {

  let imageSource;

  switch (type) {
    case 'coin':
      imageSource = require('../quiz-images/coin.png');
      break;
    case 'time':
      imageSource = require('../quiz-images/hourglass.png');
      break;
    case 'hint':
      imageSource = require('../quiz-images/hint.png');
      break;
    case 'heart':
      imageSource = require('../quiz-images/heart.png');
      break;
    case 'broken-heart':
      imageSource = require('../quiz-images/broken.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={styles.icon} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default QuizIcon;
