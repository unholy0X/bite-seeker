import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { colors, radii, spacing } from '@/src/theme/tokens';
import { useFeaturedStore } from '../../../../store/featuredStore';
import { filterByMealCategory } from '../../../../utils/mealCategories';

type FeaturedCategoryRowProps = {
  selectedCategory: string;
  onRecipePress?: (id: string) => void;
};

export function FeaturedCategoryRow({ selectedCategory, onRecipePress }: FeaturedCategoryRowProps) {
  const { recipes, isLoading } = useFeaturedStore();

  const filtered = filterByMealCategory(recipes, selectedCategory);

  if (isLoading && recipes.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.accent} size="small" />
      </View>
    );
  }

  if (filtered.length === 0) return null;

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.scrollContent}
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      {filtered.map((recipe: any) => {
        const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
        const meta = [
          totalTime > 0 ? `${totalTime} min` : null,
          recipe.difficulty || null,
        ].filter(Boolean).join(' · ');

        return (
          <Pressable
            key={recipe.id}
            onPress={() => onRecipePress?.(recipe.id)}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          >
            {recipe.thumbnailUrl ? (
              <Image
                contentFit="cover"
                source={{ uri: recipe.thumbnailUrl }}
                style={styles.image}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderLabel}>{recipe.title?.charAt(0) ?? '?'}</Text>
              </View>
            )}
            <View style={styles.content}>
              <Text numberOfLines={2} style={styles.title}>{recipe.title}</Text>
              {meta ? <Text style={styles.meta}>{meta}</Text> : null}
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginRight: spacing.sm,
    overflow: 'hidden',
    width: 160,
  },
  cardPressed: {
    opacity: 0.75,
  },
  content: {
    gap: spacing.xxs,
    padding: spacing.sm,
  },
  image: {
    height: 110,
    width: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    backgroundColor: colors.surfaceStrong,
    height: 110,
    justifyContent: 'center',
    width: '100%',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  placeholderLabel: {
    color: colors.accent,
    fontSize: 32,
    fontWeight: '700',
  },
  scroll: {
    marginHorizontal: -spacing.lg,
    marginTop: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});
