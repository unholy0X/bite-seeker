import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import { MatchBadge } from './match-badge';

type MatchRecipe = {
  id: string;
  imageAlt: string;
  matchPercent: number;
  meta: string;
  missingInfo: string;
  title: string;
  tone: 'brown' | 'green' | 'blue';
  thumbnailUrl?: string | null;
};

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
      <View style={styles.imageContainer}>
        {recipe.thumbnailUrl ? (
          <Image contentFit="cover" source={{ uri: recipe.thumbnailUrl }} style={styles.thumb} />
        ) : (
          <View style={[styles.imageWrap, { backgroundColor: toneColor[recipe.tone] }]}>
            <Text style={styles.imageInitial}>{recipe.title?.charAt(0) ?? '?'}</Text>
          </View>
        )}
        <MatchBadge value={recipe.matchPercent} />
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
  imageContainer: {
    position: 'relative',
  },
  imageInitial: {
    color: colors.accent,
    fontSize: 22,
    fontWeight: '700',
  },
  imageWrap: {
    alignItems: 'center',
    borderRadius: radii.md,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  thumb: {
    borderRadius: radii.md,
    height: 64,
    width: 64,
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
