import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { RecipeFiltersRow } from '../components/recipe-filters-row';
import { RecipesGrid } from '../components/recipes-grid';
import { RecipesHeader } from '../components/recipes-header';

type RecipesScreenProps = {
  onAddPress?: () => void;
  onSearchPress?: () => void;
  onRecipePress?: (id: string) => void;
};

export function RecipesScreen({ onAddPress, onSearchPress, onRecipePress }: RecipesScreenProps) {
  const [activeFilterId, setActiveFilterId] = useState('all');

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <RecipesHeader onAddPress={onAddPress} onSearchPress={onSearchPress} />
        <RecipeFiltersRow activeFilterId={activeFilterId} onFilterChange={setActiveFilterId} />
        <RecipesGrid activeFilterId={activeFilterId} onRecipePress={onRecipePress} />
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
