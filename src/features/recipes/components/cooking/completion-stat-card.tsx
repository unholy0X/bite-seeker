import { StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

import type { CompletionStat } from '../../data/cooking-flow-content';

type CompletionStatCardProps = {
  stat: CompletionStat;
};

export function CompletionStatCard({ stat }: CompletionStatCardProps) {
  const accent = stat.valueTone === 'accent';

  return (
    <View style={styles.card}>
      <Text style={[styles.value, accent ? styles.accentValue : undefined]}>{stat.value}</Text>
      <Text style={styles.label}>{stat.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  accentValue: {
    color: colors.accent,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    flex: 1,
    minHeight: 82,
    justifyContent: 'center',
  },
  label: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 2,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 50 / 2,
    fontWeight: '700',
  },
});
