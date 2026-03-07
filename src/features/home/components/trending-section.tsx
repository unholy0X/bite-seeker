import { StyleSheet, View } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import { trendingRecipes } from '../data/home-content';
import { SectionHeader } from './section-header';
import { TrendingRecipeCard } from './trending-recipe-card';

export function TrendingSection() {
  return (
    <View style={styles.container}>
      <SectionHeader actionLabel="See all" title="Trending Now" />
      <View style={styles.cardsRow}>
        {trendingRecipes.map((recipe) => (
          <TrendingRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  container: {
    marginTop: spacing.xl,
  },
});
