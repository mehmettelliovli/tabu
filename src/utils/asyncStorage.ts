import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTeamNames = async (team1: string, team2: string) => {
  try {
    await AsyncStorage.setItem('team1', team1);
    await AsyncStorage.setItem('team2', team2);
    return true;
  } catch (error) {
    console.error('Error saving team names:', error);
    return false;
  }
};

export const loadTeamNames = async () => {
  try {
    const team1 = await AsyncStorage.getItem('team1');
    const team2 = await AsyncStorage.getItem('team2');
    return { team1, team2 };
  } catch (error) {
    console.error('Error loading team names:', error);
    return { team1: null, team2: null };
  }
};

export const saveTimerDuration = async (duration: string) => {
  try {
    await AsyncStorage.setItem('timerDuration', duration);
    return true;
  } catch (error) {
    console.error('Error saving timer duration:', error);
    return false;
  }
};

export const loadTimerDuration = async () => {
  try {
    const duration = await AsyncStorage.getItem('timerDuration');
    return duration || '60';
  } catch (error) {
    console.error('Error loading timer duration:', error);
    return '60';
  }
}; 