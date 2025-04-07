import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from './Modal';
import Button from './Button';
import { Team } from '../types';

interface GameOverModalProps {
  visible: boolean;
  onClose: () => void;
  onRestart: () => void;
  teams: Team[];
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  visible,
  onClose,
  onRestart,
  teams,
}) => {
  const getWinner = () => {
    const maxScore = Math.max(...teams.map(team => team.score));
    const winners = teams.filter(team => team.score === maxScore);
    
    if (winners.length === 1) {
      return winners[0];
    }
    
    return null;
  };

  const winner = getWinner();

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Oyun Bitti!"
    >
      <View style={styles.content}>
        {winner ? (
          <Text style={styles.winnerText}>
            Kazanan: {winner.name} ({winner.score} puan)
          </Text>
        ) : (
          <Text style={styles.winnerText}>Berabere!</Text>
        )}
        
        <View style={styles.scoresContainer}>
          {teams.map((team, index) => (
            <Text key={index} style={styles.scoreText}>
              {team.name}: {team.score} puan
            </Text>
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title="Yeniden Başla"
            onPress={onRestart}
            style={styles.button}
          />
          <Button
            title="Ana Sayfa"
            onPress={onClose}
            style={[styles.button, styles.homeButton]}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoresContainer: {
    marginBottom: 30,
  },
  scoreText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 10,
  },
  homeButton: {
    backgroundColor: '#666',
  },
});

export default GameOverModal; 