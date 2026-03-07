import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';

import { weekDays } from '../data/meal-plan-content';
import { DayChip } from './day-chip';

export function WeekStrip() {
  return (
    <View style={styles.container}>
      <View style={styles.rangeRow}>
        <Pressable style={styles.arrowButton}>
          <Feather color={colors.textMuted} name="arrow-left" size={18} />
        </Pressable>
        <Text style={styles.rangeText}>Mar 3 - Mar 9</Text>
        <Pressable style={styles.arrowButton}>
          <Feather color={colors.textMuted} name="arrow-right" size={18} />
        </Pressable>
      </View>

      <View style={styles.daysRow}>
        {weekDays.map((day) => (
          <DayChip day={day} key={day.id} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  arrowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
  },
  container: {
    marginTop: spacing.md,
  },
  daysRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  rangeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeText: {
    color: colors.textPrimary,
    fontSize: 34 / 2,
    fontWeight: '600',
  },
});
