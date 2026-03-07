import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { RecipeFiltersRow } from '../components/recipe-filters-row';
import { RecipesGrid } from '../components/recipes-grid';
import { RecipesHeader } from '../components/recipes-header';

export function RecipesScreen() {
  const router = useRouter();
  const [activeFilterId, setActiveFilterId] = useState('all');

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <RecipesHeader onAddPress={() => router.push('/recipe-add')} />
        <RecipeFiltersRow activeFilterId={activeFilterId} onFilterChange={setActiveFilterId} />
        <RecipesGrid
          onRecipePress={(recipeId) =>
            router.push({
              params: { id: recipeId },
              pathname: '/recipe/[id]',
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
