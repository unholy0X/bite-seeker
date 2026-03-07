import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { MealSlot } from '../data/meal-plan-content';

type MealSlotCardProps = {
  slot: MealSlot;
};

function MealIcon({ iconStyle }: { iconStyle: MealSlot['iconStyle'] }) {
  if (iconStyle === 'food') {
    return (
      <View accessibilityLabel="Meal image placeholder" accessibilityRole="image" accessible style={[styles.iconWrap, styles.foodIconWrap]}>
        <Text style={styles.foodIconText}>Food</Text>
      </View>
    );
  }

  if (iconStyle === 'add') {
    return (
      <View style={[styles.iconWrap, styles.darkIconWrap]}>
        <Feather color={colors.textMuted} name="plus" size={18} />
      </View>
    );
  }

  return (
    <View style={[styles.iconWrap, styles.darkIconWrap]}>
      <Feather color={colors.textMuted} name="coffee" size={16} />
    </View>
  );
}

export function MealSlotCard({ slot }: MealSlotCardProps) {
  const hasMeta = Boolean(slot.calories && slot.duration);

  return (
    <View style={styles.card}>
      <MealIcon iconStyle={slot.iconStyle} />
      <View style={styles.content}>
        <Text style={styles.mealType}>{slot.mealType}</Text>
        <Text style={[styles.title, hasMeta ? styles.titleStrong : styles.titleMuted]}>{slot.title}</Text>
        {hasMeta ? <Text style={styles.meta}>{`${slot.calories} • ${slot.duration}`}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    flexDirection: 'row',
    marginTop: spacing.md,
    minHeight: 104,
    paddingHorizontal: spacing.md,
  },
  content: {
    marginLeft: spacing.sm,
  },
  darkIconWrap: {
    backgroundColor: colors.surfaceMuted,
  },
  foodIconText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  foodIconWrap: {
    backgroundColor: '#3B2008',
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: radii.md,
    height: 60 / 2,
    justifyContent: 'center',
    width: 60 / 2,
  },
  mealType: {
    color: colors.textMuted,
    fontSize: 14,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 2,
  },
  title: {
    fontSize: 38 / 2,
    marginTop: 2,
  },
  titleMuted: {
    color: colors.textSecondary,
  },
  titleStrong: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
});
