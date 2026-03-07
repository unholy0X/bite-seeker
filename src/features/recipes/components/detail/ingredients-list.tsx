import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { IngredientItem } from '../../data/recipe-details-content';

type IngredientsListProps = {
  ingredients: IngredientItem[];
};

function IngredientRow({ ingredient }: { ingredient: IngredientItem }) {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{ingredient.name}</Text>
      <Text style={styles.amount}>{ingredient.amount}</Text>
    </View>
  );
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  return (
    <View style={styles.listWrap}>
      {ingredients.map((ingredient) => (
        <IngredientRow ingredient={ingredient} key={ingredient.id} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '500',
  },
  listWrap: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '500',
  },
  row: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingHorizontal: spacing.md,
  },
});
