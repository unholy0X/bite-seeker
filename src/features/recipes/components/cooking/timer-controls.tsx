import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type TimerControlsProps = {
  onPausePress: () => void;
  onPlayPress: () => void;
  onStopPress: () => void;
};

function CircleButton({ accent, icon, onPress }: { accent?: boolean; icon: 'pause' | 'play' | 'square'; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, accent ? styles.accentButton : styles.neutralButton]}>
      <Feather color={accent ? colors.accentText : colors.textPrimary} name={icon} size={23} />
    </Pressable>
  );
}

export function TimerControls({ onPausePress, onPlayPress, onStopPress }: TimerControlsProps) {
  return (
    <View style={styles.row}>
      <CircleButton icon="pause" onPress={onPausePress} />
      <CircleButton accent icon="play" onPress={onPlayPress} />
      <CircleButton icon="square" onPress={onStopPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  accentButton: {
    backgroundColor: colors.accent,
  },
  button: {
    alignItems: 'center',
    borderRadius: radii.full,
    height: 66,
    justifyContent: 'center',
    width: 66,
  },
  neutralButton: {
    backgroundColor: colors.surface,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
  },
});
