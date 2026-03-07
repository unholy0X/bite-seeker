import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';
import { fetchRecommendations } from '../../../../services/recipes';
import { MatchRecipeCard } from './match-recipe-card';

type MatchRecipesListProps = {
  onRecipePress?: (recipeId: string) => void;
};

const TONES = ['brown', 'green', 'blue'] as const;

export function MatchRecipesList({ onRecipePress }: MatchRecipesListProps) {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecommendations({ getToken: undefined, filter: undefined, limit: 20 })
      .then((data: any) => setRecipes(data?.items || []))
      .catch((err: any) => setError(err?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (error || recipes.length === 0) {
    const isNotFound = error?.includes('404') || error?.includes('not found') || error?.includes('Failed to fetch');
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>
          {isNotFound ? 'No matches yet' : 'Something went wrong'}
        </Text>
        <Text style={styles.empty}>
          {isNotFound
            ? 'Add ingredients to your pantry and we\'ll show you what you can cook.'
            : error || 'No matching recipes found. Add items to your pantry first.'}
        </Text>
      </View>
    );
  }

  return (
    <View>
      {recipes.map((recipe: any, index: number) => {
        const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
        const meta = [
          totalTime > 0 ? `${totalTime} min` : null,
          recipe.difficulty || null,
        ].filter(Boolean).join(' · ');

        const matchPercent = recipe.matchScore != null
          ? Math.round(recipe.matchScore * 100)
          : recipe.matchPercent || 0;

        const missing = recipe.missingIngredients;
        const missingInfo = Array.isArray(missing) && missing.length > 0
          ? `Missing: ${missing.slice(0, 2).join(', ')}${missing.length > 2 ? '…' : ''}`
          : 'All ingredients available';

        return (
          <MatchRecipeCard
            key={recipe.id}
            onPress={onRecipePress}
            recipe={{
              id: recipe.id,
              title: recipe.title,
              meta,
              matchPercent,
              missingInfo,
              tone: TONES[index % TONES.length],
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
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  empty: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
