import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [timerDuration, setTimerDuration] = useState('60');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTeam1 = await AsyncStorage.getItem('team1');
      const savedTeam2 = await AsyncStorage.getItem('team2');
      const savedTimer = await AsyncStorage.getItem('timerDuration');
      
      if (savedTeam1) setTeam1(savedTeam1);
      if (savedTeam2) setTeam2(savedTeam2);
      if (savedTimer) setTimerDuration(savedTimer);
    } catch (error) {
      Alert.alert('Hata', 'Ayarlar yüklenirken bir hata oluştu.');
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('team1', team1);
      await AsyncStorage.setItem('team2', team2);
      await AsyncStorage.setItem('timerDuration', timerDuration);
      Alert.alert('Başarılı', 'Ayarlar kaydedildi.');
    } catch (error) {
      Alert.alert('Hata', 'Ayarlar kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>1. Takım Adı</Text>
        <TextInput
          style={styles.input}
          value={team1}
          onChangeText={setTeam1}
          placeholder="1. Takım adını girin"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>2. Takım Adı</Text>
        <TextInput
          style={styles.input}
          value={team2}
          onChangeText={setTeam2}
          placeholder="2. Takım adını girin"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Süre (saniye)</Text>
        <TextInput
          style={styles.input}
          value={timerDuration}
          onChangeText={setTimerDuration}
          keyboardType="numeric"
          placeholder="Süreyi girin"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen; 