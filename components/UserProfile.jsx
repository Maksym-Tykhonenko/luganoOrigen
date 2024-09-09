import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CloseIcon from './CloseBtn';

const AVATAR_IMAGES = [
  { id: '1', uri: require('../avatars/gorilla.png') },
  { id: '2', uri: require('../avatars/chicken.png') },
  { id: '3', uri: require('../avatars/dog-2.png') },
  { id: '4', uri: require('../avatars/dog.png') },
  { id: '5', uri: require('../avatars/bear.png') },
  { id: '6', uri: require('../avatars/rabbit.png') },
  { id: '7', uri: require('../avatars/girl.png') },
  { id: '8', uri: require('../avatars/maya.png') },
  { id: '9', uri: require('../avatars/woman-2.png') },
  { id: '10', uri: require('../avatars/woman.png') },
  { id: '11', uri: require('../avatars/man.png') },
  { id: '12', uri: require('../avatars/man-4.png') },
  { id: '13', uri: require('../avatars/man-3.png') },
  { id: '14', uri: require('../avatars/man-2.png') },
];

const UserProfile = ({ onClose }) => {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_IMAGES[0].uri);
  const [showAvatars, setShowAvatars] = useState(false);
  const [buttonText, setButtonText] = useState("Create account");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userProfile');
        const storedAvatar = await AsyncStorage.getItem('userAvatar');

        if (storedName) {
          setName(storedName);
          setButtonText("Save changes");
        }
        if (storedAvatar) {
          setSelectedAvatar(JSON.parse(storedAvatar));
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    loadProfile();
  }, []);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleReset = async () => {
    try {
      setName("");
      setSelectedAvatar(AVATAR_IMAGES[0].uri);
      setButtonText("Create account");
      await AsyncStorage.removeItem('userProfile');
      await AsyncStorage.removeItem('userAvatar');
    } catch (error) {
      console.error('Error resetting user profile:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem('userProfile', name);
      await AsyncStorage.setItem('userAvatar', JSON.stringify(selectedAvatar));
      //console.log('User profile saved successfully!');
      onClose();
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const toggleAvatarSelection = () => {
    setShowAvatars(!showAvatars);
  };

  const handleAvatarSelect = async (avatarUri) => {
    setSelectedAvatar(avatarUri);
    setShowAvatars(false);
    try {
      await AsyncStorage.setItem('userAvatar', JSON.stringify(avatarUri));
    } catch (error) {
      console.error('Error saving avatar:', error);
    }
  };

  const renderAvatarItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleAvatarSelect(item.uri)} style={styles.avatarOption}>
      <Image source={item.uri} style={styles.avatarImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={{ position: "absolute", top: -5, right: 10 }}>
          <CloseIcon onClose={onClose} />
        </View>
        <Text style={styles.title}>Set up your account</Text>
        <TouchableOpacity onPress={toggleAvatarSelection} style={styles.avatarPlaceholder}>
          <Image source={selectedAvatar} style={styles.avatarImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnChangeAvatar} onPress={toggleAvatarSelection}>
          <Text style={styles.btnText}>Change avatar</Text>
        </TouchableOpacity>
        {showAvatars ? (
          <FlatList
            data={AVATAR_IMAGES}
            renderItem={renderAvatarItem}
            keyExtractor={item => item.id}
            numColumns={4}
            style={styles.avatarList}
          />
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              value={name}
              placeholder="Enter your name"
              placeholderTextColor="#ccc"
              onChangeText={handleNameChange}
              style={styles.input}
            />
            <View style={{width: "100%"}}>
              <TouchableOpacity style={styles.btnCreate} onPress={handleSubmit}>
                <Text style={styles.btnText}>{buttonText}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnReset} onPress={handleReset}>
                <Text style={styles.btnText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = {
    container: {
        padding: 15,
        flexDirection: "column", 
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
        height: "80%",
        backgroundColor: "white",
        borderRadius: 15
    },

    upperContainer: {
      marginTop: 10,
      width: "100%",
      padding: 20,
      alignItems: "center"
    }, 

    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 30
    },

    avatarPlaceholder: {
      width: 130,
      height: 130,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 100,
    },

    inputContainer: {
      width: "100%",
      height: "51%",
      justifyContent: "space-between"
    },

    input: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 30,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      width: "100%",
      fontSize: 17
    },

    btnContainer: {
      width: "100%",
      padding: 40,
      alignItems: "center"
    },

    btnCreate: {
      width: "100%",
      alignItems: "center",
      padding: 12,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
      marginBottom: 10,
    },

    btnReset: {
      width: "100%",
      alignItems: "center",
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
    },
    btnText: {
      fontSize: 16
    },

    avatarImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover'
    },

    avatarList: {
      marginTop: 20,
      height: "49%"
    },

    avatarOption: {
      margin: 5,
      width: 60,
      height: 60,
      borderRadius: 40,
      overflow: 'hidden',
    },
    btnChangeAvatar: {
      marginTop: 10
    }
};

export default UserProfile;