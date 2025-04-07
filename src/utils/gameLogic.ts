import { Word } from '../types';
import gameWords from '../../game_words.json';

export const getRandomWord = (): Word => {
  const randomIndex = Math.floor(Math.random() * gameWords.length);
  return gameWords[randomIndex];
};

export const calculateScore = (currentScore: number, action: 'correct' | 'tabu' | 'pass'): number => {
  switch (action) {
    case 'correct':
      return currentScore + 1;
    case 'tabu':
      return currentScore - 1;
    case 'pass':
      return currentScore;
    default:
      return currentScore;
  }
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const checkForWinner = (teams: { name: string; score: number }[]): string | null => {
  const maxScore = Math.max(...teams.map(team => team.score));
  const winners = teams.filter(team => team.score === maxScore);
  
  if (winners.length === 1) {
    return winners[0].name;
  }
  
  return null;
}; 