import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from './Modal';
import SettingsInput from './SettingsInput';
import Button from './Button';
import { loadTimerDuration, saveTimerDuration } from '../utils/asyncStorage';

interface GameSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: { timerDuration: string }) => void;
}

const GameSettingsModal: React.FC<GameSettingsModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [timerDuration, setTimerDuration] = useState('60');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const duration = await loadTimerDuration();
    setTimerDuration(duration);
  };

  const handleSave = async () => {
    await saveTimerDuration(timerDuration);
    onSave({ timerDuration });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Oyun Ayarları"
    >
      <View style={styles.content}>
        <SettingsInput
          label="Süre (saniye)"
          value={timerDuration}
          onChangeText={setTimerDuration}
          keyboardType="numeric"
          placeholder="Süreyi girin"
        />

        <View style={styles.buttonsContainer}>
          <Button
            title="Kaydet"
            onPress={handleSave}
            style={styles.button}
          />
          <Button
            title="İptal"
            onPress={onClose}
            style={[styles.button, styles.cancelButton]}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  buttonsContainer: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#666',
  },
});

export default GameSettingsModal; 