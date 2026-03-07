import { StyleSheet, View } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import { mealCategories } from '../data/home-content';
import { MealCategoryPill } from './meal-category-pill';

type MealCategoriesRowProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export function MealCategoriesRow({ selectedId, onSelect }: MealCategoriesRowProps) {
  return (
    <View style={styles.container}>
      {mealCategories.map((category) => (
        <MealCategoryPill
          category={category}
          key={category.id}
          selected={category.id === selectedId}
          onPress={() => onSelect(category.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: 30,
  },
});
