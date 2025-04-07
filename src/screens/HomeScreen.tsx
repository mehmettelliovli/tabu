import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  const startGame = async () => {
    if (team1 && team2) {
      await AsyncStorage.setItem('team1', team1);
      await AsyncStorage.setItem('team2', team2);
      navigation.navigate('Game');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabu Oyunu</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="1. Takım Adı"
          value={team1}
          onChangeText={setTeam1}
        />
        <TextInput
          style={styles.input}
          placeholder="2. Takım Adı"
          value={team2}
          onChangeText={setTeam2}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, (!team1 || !team2) && styles.buttonDisabled]}
        onPress={startGame}
        disabled={!team1 || !team2}
      >
        <Text style={styles.buttonText}>Oyuna Başla</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.settingsButtonText}>Ayarlar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 