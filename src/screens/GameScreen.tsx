import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import gameWords from '../../game_words.json';

interface Team {
  name: string;
  score: number;
}

const GameScreen = () => {
  const [currentTeam, setCurrentTeam] = useState<number>(0);
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentWord, setCurrentWord] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadTeams();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const loadTeams = async () => {
    const team1Name = await AsyncStorage.getItem('team1');
    const team2Name = await AsyncStorage.getItem('team2');
    if (team1Name && team2Name) {
      setTeams([
        { name: team1Name, score: 0 },
        { name: team2Name, score: 0 },
      ]);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    getNewWord();
    startTimer();
  };

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimeLeft(60);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          nextTurn();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const getNewWord = () => {
    const randomIndex = Math.floor(Math.random() * gameWords.length);
    setCurrentWord(gameWords[randomIndex]);
  };

  const handleCorrect = () => {
    const newTeams = [...teams];
    newTeams[currentTeam].score += 1;
    setTeams(newTeams);
    getNewWord();
  };

  const handleTabu = () => {
    const newTeams = [...teams];
    newTeams[currentTeam].score -= 1;
    setTeams(newTeams);
    getNewWord();
  };

  const handlePass = () => {
    nextTurn();
  };

  const nextTurn = () => {
    setCurrentTeam((prev) => (prev + 1) % 2);
    getNewWord();
    startTimer();
  };

  if (!gameStarted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tabu Oyunu</Text>
        <Text style={styles.teamText}>Sıra: {teams[currentTeam]?.name}</Text>
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Oyuna Başla</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{teams[0].name}: {teams[0].score}</Text>
        <Text style={styles.scoreText}>{teams[1].name}: {teams[1].score}</Text>
      </View>
      <Text style={styles.timerText}>{timeLeft}</Text>
      <View style={styles.wordContainer}>
        <Text style={styles.wordText}>{currentWord?.word}</Text>
        <Text style={styles.forbiddenText}>
          Yasaklı Kelimeler: {currentWord?.forbidden_words.join(', ')}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.correctButton]} onPress={handleCorrect}>
          <Text style={styles.buttonText}>Doğru</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.tabuButton]} onPress={handleTabu}>
          <Text style={styles.buttonText}>Tabu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.passButton]} onPress={handlePass}>
          <Text style={styles.buttonText}>Pas</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  teamText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  wordContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  wordText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  forbiddenText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  correctButton: {
    backgroundColor: '#4CAF50',
  },
  tabuButton: {
    backgroundColor: '#f44336',
  },
  passButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameScreen; 