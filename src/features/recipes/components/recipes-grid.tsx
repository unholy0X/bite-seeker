import { StyleSheet, View } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import { recipeCards } from '../data/recipes-content';
import { RecipeCardItem } from './recipe-card-item';

type RecipesGridProps = {
  onRecipePress?: (recipeId: string) => void;
};

export function RecipesGrid({ onRecipePress }: RecipesGridProps) {
  const rows = [];
  for (let i = 0; i < recipeCards.length; i += 2) {
    rows.push(recipeCards.slice(i, i + 2));
  }

  return (
    <View style={styles.grid}>
      {rows.map((row, rowIndex) => (
        <View
          key={`row-${rowIndex}`}
          style={[styles.row, rowIndex < rows.length - 1 ? styles.rowSpacing : undefined]}>
          {row.map((recipe, columnIndex) => (
            <View
              key={recipe.id}
              style={[styles.column, columnIndex === 0 ? styles.firstColumnSpacing : undefined]}>
              <RecipeCardItem onPress={onRecipePress} recipe={recipe} />
            </View>
          ))}
          {row.length < 2 ? <View style={styles.column} /> : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  firstColumnSpacing: {
    marginRight: spacing.sm,
  },
  grid: {
    marginTop: spacing.md,
  },
  row: {
    flexDirection: 'row',
  },
  rowSpacing: {
    marginBottom: spacing.sm,
  },
});
