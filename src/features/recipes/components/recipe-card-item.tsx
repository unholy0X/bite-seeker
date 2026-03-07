import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { RecipeCard } from '../data/recipes-content';
import { RecipeImagePlaceholder } from './recipe-image-placeholder';

type RecipeCardItemProps = {
  onPress?: (recipeId: string) => void;
  recipe: RecipeCard;
};

export function RecipeCardItem({ onPress, recipe }: RecipeCardItemProps) {
  return (
    <Pressable onPress={() => onPress?.(recipe.id)} style={styles.card}>
      {recipe.thumbnailUrl ? (
        <Image contentFit="cover" source={{ uri: recipe.thumbnailUrl }} style={styles.image} />
      ) : (
        <RecipeImagePlaceholder alt={recipe.imageAlt} label={recipe.placeholderLabel} tint={recipe.tint} />
      )}
      <View style={styles.body}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.meta}>{recipe.meta}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  image: {
    height: 120,
    width: '100%',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    overflow: 'hidden',
    width: '100%',
  },
  meta: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: 2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34 / 2,
    fontWeight: '700',
  },
});
