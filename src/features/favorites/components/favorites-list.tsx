import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';
import { useRecipeStore } from '../../../../store/recipeStore';
import { FavoriteRecipeCard } from './favorite-recipe-card';

type FavoritesListProps = {
  onRecipePress?: (recipeId: string) => void;
};

const TINTS = ['#1A1000', '#0D1A0D', '#0A1220', '#1A0A15', '#0E1A0E'];

export function FavoritesList({ onRecipePress }: FavoritesListProps) {
  const { recipes, isLoading } = useRecipeStore();
  const favorites = recipes.filter((r: any) => r.isFavorite);

  if (isLoading && recipes.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.empty}>No favourites yet. Heart a recipe to save it here.</Text>
      </View>
    );
  }

  return (
    <View>
      {favorites.map((recipe: any, index: number) => {
        const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
        const meta = [
          totalTime > 0 ? `${totalTime} min` : null,
          recipe.difficulty || null,
        ].filter(Boolean).join(' · ');

        return (
          <FavoriteRecipeCard
            key={recipe.id}
            onPress={onRecipePress}
            recipe={{
              id: recipe.id,
              title: recipe.title,
              meta,
              tint: TINTS[index % TINTS.length],
              imageAlt: recipe.title,
              thumbnailUrl: recipe.thumbnailUrl || null,
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  empty: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
  },
});
