import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Team } from '../types';

interface ScoreBoardProps {
  teams: Team[];
  currentTeam: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ teams, currentTeam }) => {
  return (
    <View style={styles.container}>
      {teams.map((team, index) => (
        <View 
          key={index} 
          style={[
            styles.teamContainer,
            index === currentTeam && styles.activeTeam
          ]}
        >
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.teamScore}>{team.score}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  activeTeam: {
    backgroundColor: '#E8F5E9',
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  teamScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default ScoreBoard; 