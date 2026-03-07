import { StyleSheet, View } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

type StepProgressTrackProps = {
  progress: number;
};

export function StepProgressTrack({ progress }: StepProgressTrackProps) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.min(100, Math.max(0, progress * 100))}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    backgroundColor: colors.accent,
    borderRadius: radii.full,
    height: 4,
  },
  track: {
    backgroundColor: colors.surface,
    borderRadius: radii.full,
    height: 4,
    marginTop: 14,
    overflow: 'hidden',
  },
});
