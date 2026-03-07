import { StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

type TimerRingProps = {
  time: string;
};

export function TimerRing({ time }: TimerRingProps) {
  return (
    <View style={styles.ring}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.label}>remaining</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: 6,
  },
  ring: {
    alignItems: 'center',
    borderColor: colors.accent,
    borderRadius: radii.full,
    borderWidth: 5,
    height: 290 / 2,
    justifyContent: 'center',
    width: 290 / 2,
  },
  time: {
    color: colors.textPrimary,
    fontSize: 88 / 2,
    fontWeight: '700',
  },
});
