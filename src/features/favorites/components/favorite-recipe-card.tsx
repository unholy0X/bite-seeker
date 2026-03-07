import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { FavoriteRecipe } from '../data/favorites-content';

type FavoriteRecipeCardProps = {
  onPress?: (recipeId: string) => void;
  recipe: FavoriteRecipe;
};

export function FavoriteRecipeCard({ onPress, recipe }: FavoriteRecipeCardProps) {
  return (
    <Pressable onPress={() => onPress?.(recipe.id)} style={styles.card}>
      <View style={[styles.imageWrap, { backgroundColor: recipe.tint }]}> 
        <View accessibilityLabel={recipe.imageAlt} accessibilityRole="image" accessible style={styles.imageBadge}>
          <Text style={styles.imageText}>Image</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.meta}>{recipe.meta}</Text>
        <View style={styles.ratingRow}>
          <Feather color={colors.accent} name="star" size={12} />
          <Text style={styles.ratingText}>{recipe.rating}</Text>
        </View>
      </View>

      <Feather color="#FF6C76" name="heart" size={20} style={styles.heartIcon} />
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
    minHeight: 136 / 2,
    paddingHorizontal: spacing.md,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  heartIcon: {
    marginLeft: spacing.sm,
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
    height: 96 / 2,
    justifyContent: 'center',
    width: 96 / 2,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 32 / 2,
    marginTop: 2,
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginTop: spacing.xs,
  },
  ratingText: {
    color: colors.accent,
    fontSize: 31 / 2,
    fontWeight: '700',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 44 / 2,
    fontWeight: '700',
  },
});
