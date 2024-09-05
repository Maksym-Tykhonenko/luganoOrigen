import React, { useRef, useState, useEffect } from 'react';
import {Animated, Image, View}from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './components/MainMenu';
import QuizScreen from './screens/QuizScreen';

const Stack = createStackNavigator();

const App = () => {

   ////////////////////////Louder

  const [louderIsEnded, setLouderIsEnded] = useState(false);

  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 2500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 4000);
  }, []);
  return (
    <NavigationContainer>
      {!louderIsEnded ? (
        <View
          style={{
            position: 'relative',
            flex: 1,
            backgroundColor: 'rgba(0,0,0)',
          }}>
          <Animated.Image
            source={require('./assets/rediz/loader1.png')} // Special animatable View
            style={{
              //...props.style,
              opacity: appearingAnim,
              width: '100%',
              height: '100%',
              position: 'absolute', // Bind opacity to animated value
            }}
          />
          <Animated.Image
            source={require('./assets/rediz/loader2.png')} // Special animatable View
            style={{
              //...props.style,
              opacity: appearingSecondAnim,
              width: '100%',
              height: '100%',
              position: 'absolute', // Bind opacity to animated value
            }}
          />
        </View>
      ): (
          <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenu} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="QuizScreen" 
          component={QuizScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
      )}
      
    </NavigationContainer>
  );
};

export default App;
