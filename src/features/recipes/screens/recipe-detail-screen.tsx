import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { getRecipeDetailById } from '../data/recipe-details-content';
import { IngredientsList } from '../components/detail/ingredients-list';
import { NutritionGrid } from '../components/detail/nutrition-grid';
import { RecipeDetailHero } from '../components/detail/recipe-detail-hero';
import { RecipeMetaRow } from '../components/detail/recipe-meta-row';
import { StartCookingButton } from '../components/detail/start-cooking-button';
import { TagPill } from '../components/detail/tag-pill';

type RecipeDetailScreenProps = {
  onBackPress: () => void;
  onStartCookingPress: () => void;
  recipeId: string;
};

export function RecipeDetailScreen({ onBackPress, onStartCookingPress, recipeId }: RecipeDetailScreenProps) {
  const recipe = getRecipeDetailById(recipeId) ?? getRecipeDetailById('spicy-ramen');

  if (!recipe) {
    return null;
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <RecipeDetailHero heroLabel={recipe.heroLabel} heroTint={recipe.heroTint} onBackPress={onBackPress} />

      <View style={styles.contentWrap}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.tagsRow}>
            {recipe.tags.map((tag) => (
              <TagPill key={tag.id} tag={tag} />
            ))}
          </View>

          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.subtitle}>{recipe.description}</Text>

          <RecipeMetaRow rating={recipe.rating} servings={recipe.servings} time={recipe.time} />
          <NutritionGrid items={recipe.nutrition} />

          <Text style={styles.sectionTitle}>Ingredients</Text>
          <IngredientsList ingredients={recipe.ingredients} />
        </ScrollView>

        <StartCookingButton onPress={onStartCookingPress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentWrap: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    flex: 1,
    marginTop: -18,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 35 / 2,
    fontWeight: '700',
    marginTop: spacing.lg,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: spacing.xs,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 52 / 2,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
});
