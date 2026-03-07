import { ScrollView, StyleSheet } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import { recipeFilters } from '../data/recipes-content';
import { RecipeFilterChip } from './recipe-filter-chip';

type RecipeFiltersRowProps = {
  activeFilterId: string;
  onFilterChange: (id: string) => void;
};

export function RecipeFiltersRow({ activeFilterId, onFilterChange }: RecipeFiltersRowProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      {recipeFilters.map((filter) => (
        <RecipeFilterChip
          active={filter.id === activeFilterId}
          key={filter.id}
          label={filter.label}
          onPress={() => onFilterChange(filter.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
  },
  content: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
});
