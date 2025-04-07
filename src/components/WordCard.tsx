import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Word } from '../types';

interface WordCardProps {
  word: Word;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.wordText}>{word.word}</Text>
      <View style={styles.forbiddenContainer}>
        <Text style={styles.forbiddenTitle}>Yasaklı Kelimeler:</Text>
        {word.forbidden_words.map((forbiddenWord, index) => (
          <Text key={index} style={styles.forbiddenWord}>
            {forbiddenWord}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  wordText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  forbiddenContainer: {
    marginTop: 10,
  },
  forbiddenTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  forbiddenWord: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
});

export default WordCard; 