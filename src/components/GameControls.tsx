import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface GameControlsProps {
  onCorrect: () => void;
  onTabu: () => void;
  onPass: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onCorrect, onTabu, onPass }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.correctButton]} onPress={onCorrect}>
        <Text style={styles.buttonText}>Doğru</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.tabuButton]} onPress={onTabu}>
        <Text style={styles.buttonText}>Tabu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.passButton]} onPress={onPass}>
        <Text style={styles.buttonText}>Pas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
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
});

export default GameControls; 