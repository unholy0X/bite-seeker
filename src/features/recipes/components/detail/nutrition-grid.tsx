import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { NutritionItem } from '../../data/recipe-details-content';

type NutritionGridProps = {
  items: NutritionItem[];
};

function NutritionCard({ item }: { item: NutritionItem }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{item.value}</Text>
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );
}

export function NutritionGrid({ items }: NutritionGridProps) {
  return (
    <View style={styles.row}>
      {items.map((item) => (
        <NutritionCard item={item} key={item.id} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    flex: 1,
    minHeight: 76,
    justifyContent: 'center',
  },
  label: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 34 / 2,
    fontWeight: '700',
  },
});
