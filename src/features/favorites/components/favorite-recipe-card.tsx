import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type FavoriteRecipe = {
  id: string;
  imageAlt: string;
  meta: string;
  tint: string;
  title: string;
  thumbnailUrl?: string | null;
};

type FavoriteRecipeCardProps = {
  onPress?: (recipeId: string) => void;
  recipe: FavoriteRecipe;
};

export function FavoriteRecipeCard({ onPress, recipe }: FavoriteRecipeCardProps) {
  return (
    <Pressable onPress={() => onPress?.(recipe.id)} style={styles.card}>
      {recipe.thumbnailUrl ? (
        <Image contentFit="cover" source={{ uri: recipe.thumbnailUrl }} style={styles.thumb} />
      ) : (
        <View style={[styles.imageWrap, { backgroundColor: recipe.tint }]}>
          <Text style={styles.imageInitial}>{recipe.title?.charAt(0) ?? '?'}</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>{recipe.title}</Text>
        {recipe.meta ? <Text style={styles.meta}>{recipe.meta}</Text> : null}
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
  imageInitial: {
    color: colors.accent,
    fontSize: 22,
    fontWeight: '700',
  },
  imageWrap: {
    alignItems: 'center',
    borderRadius: radii.md,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  thumb: {
    borderRadius: radii.md,
    height: 56,
    width: 56,
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
