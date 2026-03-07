import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';

import { useRecipeStore } from '../../../../store';
import { RecipeCardItem } from './recipe-card-item';

type RecipesGridProps = {
  activeFilterId?: string;
  onRecipePress?: (recipeId: string) => void;
};

export function RecipesGrid({ activeFilterId = 'all', onRecipePress }: RecipesGridProps) {
  const { recipes, isLoading } = useRecipeStore();
  const filtered = activeFilterId === 'favorites' ? recipes.filter((r: any) => r.isFavorite) : recipes;

  if (isLoading && recipes.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (filtered.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.empty}>
          {activeFilterId === 'favorites' ? 'No favorites yet.' : 'No recipes yet. Add your first one!'}
        </Text>
      </View>
    );
  }

  const cards = filtered.map((r: any) => ({
    id: r.id,
    title: r.title,
    meta: [
      (r.prepTime || 0) + (r.cookTime || 0) > 0 ? `${(r.prepTime || 0) + (r.cookTime || 0)} min` : null,
      r.difficulty || null,
    ].filter(Boolean).join(' · '),
    imageAlt: r.title,
    placeholderLabel: r.title,
    thumbnailUrl: r.thumbnailUrl || null,
    tint: '#121722',
  }));

  const rows: typeof cards[] = [];
  for (let i = 0; i < cards.length; i += 2) {
    rows.push(cards.slice(i, i + 2));
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
  centered: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  column: {
    flex: 1,
  },
  empty: {
    color: colors.textMuted,
    fontSize: 14,
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
