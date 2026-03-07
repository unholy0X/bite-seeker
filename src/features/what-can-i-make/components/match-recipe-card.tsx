import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { MatchRecipe } from '../data/what-can-i-make-content';
import { MatchBadge } from './match-badge';

type MatchRecipeCardProps = {
  onPress?: (recipeId: string) => void;
  recipe: MatchRecipe;
};

const toneColor = {
  blue: '#022A4A',
  brown: '#3A1F08',
  green: '#153804',
} as const;

export function MatchRecipeCard({ onPress, recipe }: MatchRecipeCardProps) {
  return (
    <Pressable onPress={() => onPress?.(recipe.id)} style={styles.card}>
      <View style={[styles.imageWrap, { backgroundColor: toneColor[recipe.tone] }]}> 
        <MatchBadge value={recipe.matchPercent} />
        <View accessibilityLabel={recipe.imageAlt} accessibilityRole="image" accessible style={styles.imageBadge}>
          <Text style={styles.imageText}>Image</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.meta}>{recipe.meta}</Text>
        <Text style={styles.ingredientsInfo}>{recipe.missingInfo}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    flexDirection: 'row',
    marginTop: spacing.md,
    minHeight: 126,
    paddingHorizontal: spacing.md,
  },
  content: {
    marginLeft: spacing.md,
  },
  imageBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: radii.full,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  imageText: {
    color: colors.textPrimary,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  imageWrap: {
    alignItems: 'center',
    borderRadius: radii.md,
    height: 92 / 2,
    justifyContent: 'center',
    position: 'relative',
    width: 92 / 2,
  },
  ingredientsInfo: {
    color: '#22C091',
    fontSize: 32 / 2,
    marginTop: spacing.xs,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 32 / 2,
    marginTop: 2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 44 / 2,
    fontWeight: '700',
  },
});
