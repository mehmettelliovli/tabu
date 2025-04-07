export type RootStackParamList = {
  Home: undefined;
  Game: {
    team1Name: string;
    team2Name: string;
  };
  Settings: undefined;
};

export interface TabuWord {
  word: string;
  forbidden_words: string[];
}

export interface Team {
  name: string;
  score: number;
}

export interface Word {
  word: string;
  forbidden_words: string[];
}

export interface GameState {
  currentTeam: number;
  teams: Team[];
  currentWord: Word | null;
  timeLeft: number;
  gameStarted: boolean;
} 