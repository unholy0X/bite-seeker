import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

function PaginationDots() {
  return (
    <View style={styles.dotsRow}>
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={[styles.dot, styles.activeDot]} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>
  );
}

function MealPlanItem({ mealName, mealTitle }: { mealName: string; mealTitle: string }) {
  return (
    <View style={styles.itemCard}>
      <Text style={styles.itemLabel}>{mealName}</Text>
      <Text style={styles.itemValue}>{mealTitle}</Text>
    </View>
  );
}

type MealPlanCardProps = {
  onViewAllPress: () => void;
};

export function MealPlanCard({ onViewAllPress }: MealPlanCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headingRow}>
        <Text style={styles.title}>Today&apos;s Meal Plan</Text>
        <Pressable onPress={onViewAllPress}>
          <Text style={styles.action}>View all</Text>
        </Pressable>
      </View>
      <PaginationDots />
      <View style={styles.itemsRow}>
        <MealPlanItem mealName="Breakfast" mealTitle="Oatmeal Bowl" />
        <MealPlanItem mealName="Lunch" mealTitle="Not planned" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  activeDot: {
    backgroundColor: colors.accent,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    marginTop: spacing.md,
    padding: spacing.md,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: radii.full,
    height: 8,
    width: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  headingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    flex: 1,
    minHeight: 74,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  itemLabel: {
    color: colors.textMuted,
    fontSize: 14,
  },
  itemValue: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginTop: spacing.xxs,
  },
  itemsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34 / 2,
    fontWeight: '700',
  },
});
