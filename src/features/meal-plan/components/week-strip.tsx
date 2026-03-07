import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type WeekStripProps = {
  weekStart?: string;
  selectedDay: number;
  onSelectDay: (day: number) => void;
  mealsPerDay: number[];
};

export function WeekStrip({ weekStart, selectedDay, onSelectDay, mealsPerDay }: WeekStripProps) {
  const monday = weekStart ? new Date(weekStart) : new Date();

  return (
    <View style={styles.container}>
      {DAY_LABELS.map((label, i) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        const dayNum = date.getDate();
        const isActive = selectedDay === i;
        const hasMeals = (mealsPerDay[i] || 0) > 0;

        return (
          <Pressable
            key={label}
            onPress={() => onSelectDay(i)}
            style={[styles.pill, isActive && styles.pillActive]}
          >
            <Text style={[styles.dayLabel, isActive && styles.dayLabelActive]}>{label}</Text>
            <Text style={[styles.dayNum, isActive && styles.dayNumActive]}>{dayNum}</Text>
            {hasMeals && <View style={[styles.dot, isActive && styles.dotActive]} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.xxs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  pill: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    flex: 1,
    paddingVertical: spacing.xs,
  },
  pillActive: {
    backgroundColor: colors.accent,
  },
  dayLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  dayLabelActive: {
    color: colors.accentText,
    opacity: 0.65,
  },
  dayNum: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: 1,
  },
  dayNumActive: {
    color: colors.accentText,
  },
  dot: {
    backgroundColor: colors.accent,
    borderRadius: 2,
    height: 4,
    marginTop: 4,
    width: 4,
  },
  dotActive: {
    backgroundColor: colors.accentText,
    opacity: 0.5,
  },
});
