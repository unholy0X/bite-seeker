import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { DayEntry } from '../data/meal-plan-content';

type DayChipProps = {
  day: DayEntry;
};

export function DayChip({ day }: DayChipProps) {
  const selected = Boolean(day.selected);

  return (
    <Pressable style={styles.container}>
      <Text style={[styles.dayLabel, selected ? styles.selectedDayLabel : styles.unselectedDayLabel]}>{day.dayLabel}</Text>
      <View style={[styles.circle, selected ? styles.selectedCircle : styles.unselectedCircle]}>
        <Text style={[styles.value, selected ? styles.selectedValue : styles.unselectedValue]}>{day.value}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    borderRadius: radii.full,
    height: 50 / 2,
    justifyContent: 'center',
    marginTop: spacing.xs,
    width: 50 / 2,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: 26 / 2,
    fontWeight: '500',
  },
  selectedCircle: {
    backgroundColor: colors.accent,
  },
  selectedDayLabel: {
    color: colors.accent,
  },
  selectedValue: {
    color: colors.accentText,
  },
  unselectedCircle: {
    backgroundColor: colors.surface,
  },
  unselectedDayLabel: {
    color: colors.textMuted,
  },
  unselectedValue: {
    color: colors.textSecondary,
  },
  value: {
    fontSize: 30 / 2,
    fontWeight: '700',
  },
});
