import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { TrendingRecipe } from '../data/home-content';
import { ImagePlaceholder } from './image-placeholder';

type TrendingRecipeCardProps = {
  recipe: TrendingRecipe;
};

export function TrendingRecipeCard({ recipe }: TrendingRecipeCardProps) {
  return (
    <View style={styles.card}>
      <ImagePlaceholder alt={recipe.imageAlt} />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.subtitle}>{recipe.subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '500',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
});
