import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type StepTimerCardProps = {
  onPlayPress: () => void;
  time: string;
};

export function StepTimerCard({ onPlayPress, time }: StepTimerCardProps) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.label}>Timer for this step</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Pressable onPress={onPlayPress} style={styles.playButton}>
        <Feather color={colors.accentText} name="play" size={22} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    minHeight: 94,
    paddingHorizontal: spacing.md,
  },
  label: {
    color: colors.textMuted,
    fontSize: 14,
  },
  playButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.full,
    height: 54,
    justifyContent: 'center',
    width: 54,
  },
  time: {
    color: colors.textPrimary,
    fontSize: 60 / 2,
    fontWeight: '700',
    marginTop: 2,
  },
});
