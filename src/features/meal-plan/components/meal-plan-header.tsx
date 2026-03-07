import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

function formatWeekRange(weekStart?: string) {
  if (!weekStart) return '';
  const start = new Date(weekStart);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}`;
}

type MealPlanHeaderProps = {
  onBackPress: () => void;
  weekStart?: string;
  onPrevWeek: () => void;
  onNextWeek: () => void;
};

export function MealPlanHeader({ onBackPress, weekStart, onPrevWeek, onNextWeek }: MealPlanHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable hitSlop={10} onPress={onBackPress} style={styles.backBtn}>
          <Feather color={colors.textSecondary} name="arrow-left" size={20} />
        </Pressable>
        <Text style={styles.title}>Meal Plan</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.weekNav}>
        <Pressable hitSlop={10} onPress={onPrevWeek} style={styles.navBtn}>
          <Feather color={colors.textSecondary} name="chevron-left" size={18} />
        </Pressable>
        <Text style={styles.weekLabel}>{formatWeekRange(weekStart)}</Text>
        <Pressable hitSlop={10} onPress={onNextWeek} style={styles.navBtn}>
          <Feather color={colors.textSecondary} name="chevron-right" size={18} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backBtn: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.full,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  spacer: {
    width: 36,
  },
  weekNav: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  navBtn: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.full,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  weekLabel: {
    color: colors.accent,
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
