import { StyleSheet, View } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import { pantryCategories } from '../../data/add-item-content';
import { CategoryChip } from './category-chip';

type CategorySelectorProps = {
  activeCategoryId: string;
  onCategoryChange: (id: string) => void;
};

export function CategorySelector({ activeCategoryId, onCategoryChange }: CategorySelectorProps) {
  return (
    <View style={styles.container}>
      {pantryCategories.map((category) => (
        <CategoryChip
          active={activeCategoryId === category.id}
          key={category.id}
          label={category.label}
          onPress={() => onCategoryChange(category.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
